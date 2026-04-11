"use client";

import { useState, useTransition } from "react";
import { loginAction, signupAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Mode = "login" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string>();
  const router = useRouter();

  return (
    <form
      className="card mx-auto max-w-md space-y-3"
      action={(formData) => {
        setError(undefined);
        start(async () => {
          const result = mode === "login" ? await loginAction(formData) : await signupAction(formData);
          if (result?.error) return setError(result.error);
          toast.success(mode === "login" ? "Welcome back" : "Account created. Check your email if confirmation is enabled.");
          router.push("/dashboard");
          router.refresh();
        });
      }}
    >
      <h1 className="text-2xl font-bold">{mode === "login" ? "Login" : "Create account"}</h1>
      <input name="email" type="email" required className="input" placeholder="Email" />
      <input name="password" type="password" required minLength={8} className="input" placeholder="Password" />
      {mode === "signup" && (
        <>
          <input name="username" required minLength={3} maxLength={20} className="input" placeholder="Username" />
          <select name="platform" required className="input">
            <option value="">Platform</option><option>PC</option><option>PlayStation</option><option>Xbox</option>
          </select>
        </>
      )}
      {error && <p className="text-sm text-danger">{error}</p>}
      <button disabled={pending} className="btn w-full">{pending ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}</button>
    </form>
  );
}
