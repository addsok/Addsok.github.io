"use client";
import { logoutAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return <button className="btn-secondary" onClick={async () => { await logoutAction(); router.push('/'); router.refresh(); }}>Logout</button>;
}
