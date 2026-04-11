import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/layout/logout-button";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (
    <div className="card max-w-2xl">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="mt-2">Username: <b>{profile?.username}</b></p>
      <p>Platform: {profile?.platform}</p>
      <p>Joined: {new Date(profile?.created_at).toLocaleDateString()}</p>
      <div className="mt-4 flex gap-3"><LogoutButton /><Link href={`/u/${profile?.username}`} className="btn-secondary">Public Profile</Link></div>
    </div>
  );
}
