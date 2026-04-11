import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export default function SignupPage() {
  return <div><AuthForm mode="signup" /><p className="mt-4 text-center text-sm">Already registered? <Link className="text-accent" href="/login">Login</Link></p></div>;
}
