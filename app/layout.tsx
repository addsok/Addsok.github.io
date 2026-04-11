import "@/styles/globals.css";
import Link from "next/link";
import { AppToaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "BO7 Camo Tracker",
  description: "Track Black Ops 7 camo progress with live leaderboard rankings"
};

const navLinkClass = "rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-white/10 hover:bg-white/5 hover:text-white";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/90 backdrop-blur-2xl">
          <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-panel/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-accent" />
              BO7 Ops Hub
            </Link>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <Link className={navLinkClass} href="/dashboard">Dashboard</Link>
              <Link className={navLinkClass} href="/weapons">Weapons</Link>
              <Link className={navLinkClass} href="/leaderboard">Leaderboard</Link>
              {user ? (
                <Link className={navLinkClass} href="/profile">Profile</Link>
              ) : (
                <Link className={navLinkClass} href="/login">Login</Link>
              )}
            </div>
          </nav>
        </header>
        <main className="mx-auto min-h-[calc(100vh-164px)] w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">{children}</main>
        <footer className="border-t border-white/10 bg-black/20">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p className="font-medium tracking-wide">BO7 Camo Tracker · Premium progression workspace</p>
            <div className="flex items-center gap-4">
              <Link href="/leaderboard" className="hover:text-slate-200">Leaderboard</Link>
              <Link href="/dashboard" className="hover:text-slate-200">Progress</Link>
              <Link href="/profile" className="hover:text-slate-200">Account</Link>
            </div>
          </div>
        </footer>
        <AppToaster />
      </body>
    </html>
  );
}
