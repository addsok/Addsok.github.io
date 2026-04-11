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
        <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/90 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
            <Link href="/" className="text-sm font-black uppercase tracking-[0.22em] text-accent sm:text-base">BO7 CAMO TRACKER</Link>
            <div className="flex flex-wrap items-center gap-1.5 text-sm text-slate-200 sm:gap-2">
              <Link className="rounded-lg px-2.5 py-1.5 hover:bg-white/5" href="/dashboard">Dashboard</Link>
              <Link className="rounded-lg px-2.5 py-1.5 hover:bg-white/5" href="/weapons">Weapons</Link>
              <Link className="rounded-lg px-2.5 py-1.5 hover:bg-white/5" href="/leaderboard">Leaderboard</Link>
              {user ? (
                <Link className="rounded-lg px-2.5 py-1.5 hover:bg-white/5" href="/profile">Profile</Link>
              ) : (
                <Link className="rounded-lg px-2.5 py-1.5 hover:bg-white/5" href="/login">Login</Link>
              )}
            </div>
          </nav>
        </header>
        <main className="mx-auto min-h-[calc(100vh-76px)] max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        <AppToaster />
      </body>
    </html>
  );
}
