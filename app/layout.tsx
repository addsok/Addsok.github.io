import "@/styles/globals.css";
import Link from "next/link";
import { AppToaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "BO7 Camo Tracker",
  description: "Track Black Ops 7 camo progress with live leaderboard rankings"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-bg/95 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-black tracking-wider text-accent">BO7 CAMO TRACKER</Link>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/weapons">Weapons</Link>
              <Link href="/leaderboard">Leaderboard</Link>
              {user ? <Link href="/profile">Profile</Link> : <Link href="/login">Login</Link>}
            </div>
          </nav>
        </header>
        <main className="mx-auto min-h-[calc(100vh-70px)] max-w-7xl px-4 py-6">{children}</main>
        <AppToaster />
      </body>
    </html>
  );
}
