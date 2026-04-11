import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return <div><AuthForm mode="login" /><p className="mt-4 text-center text-sm">No account? <Link className="text-accent" href="/signup">Sign up</Link></p></div>;
}
