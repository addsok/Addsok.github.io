"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/).optional(),
  platform: z.enum(["PC", "PlayStation", "Xbox"]).optional()
});

export async function signupAction(input: FormData) {
  const payload = authSchema.parse({
    email: input.get("email"),
    password: input.get("password"),
    username: input.get("username"),
    platform: input.get("platform")
  });

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email: payload.email, password: payload.password });
  if (error) return { error: error.message };

  if (data.user && payload.username && payload.platform) {
    const { error: profileErr } = await supabase.from("profiles").insert({
      id: data.user.id,
      username: payload.username,
      platform: payload.platform
    });
    if (profileErr) return { error: profileErr.message };
  }
  revalidatePath("/");
  return { success: true };
}

export async function loginAction(input: FormData) {
  const payload = authSchema.omit({ username: true, platform: true }).parse({
    email: input.get("email"),
    password: input.get("password")
  });
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(payload);
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
}

export async function setProgressAction(camoId: string, status: "locked" | "in_progress" | "completed") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  const { error } = await supabase.from("user_camo_progress").upsert({
    user_id: user.id,
    camo_id: camoId,
    status,
    updated_at: new Date().toISOString()
  }, { onConflict: "user_id,camo_id" });
  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  revalidatePath("/weapons");
  revalidatePath("/leaderboard");
  return { success: true };
}
