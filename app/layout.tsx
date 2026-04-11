import "@/styles/globals.css";
import Link from "next/link";
import { Swords } from "lucide-react";
import { AppToaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/server";
import { BottomNav } from "@/components/layout/bottom-nav";

export const metadata = {
  title: "BO7 Camo Tracker",
  description: "Track Black Ops 7 camo progress with live leaderboard rankings"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0d0b08]/90 backdrop-blur-2xl">
            <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-3 px-4 py-4 sm:max-w-5xl sm:px-6">
              <Link href="/" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-[#1e1914] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-accent/20 text-accent">
                  <Swords className="h-3.5 w-3.5" />
                </span>
                BO7 Ops Hub
              </Link>
              <p className="text-right text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                Premium Companion Dashboard
              </p>
            </div>
          </header>

          <main className="mx-auto min-h-screen w-full max-w-xl px-4 pb-28 pt-6 sm:max-w-5xl sm:px-6 sm:pb-32 sm:pt-8">
            {children}
          </main>

          <BottomNav isLoggedIn={Boolean(user)} />
        </div>
        <AppToaster />
      </body>
    </html>
  );
}
