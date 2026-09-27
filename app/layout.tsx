import "@/styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import { AppToaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/server";
import { BottomNav } from "@/components/layout/bottom-nav";

export const metadata = {
  title: "Codhub | MW4 Camo Tracker",
  description: "Track Modern Warfare 4 weapon and camo progress with Codhub"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070b0a]/90 backdrop-blur-2xl">
            <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-3 px-4 py-3 sm:max-w-6xl sm:px-6">
              <Link href="/" className="group inline-flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/35 bg-[#111712] p-1.5 shadow-[0_0_24px_rgba(168,185,107,0.08)]">
                  <Image src="/codhub-logo.png" alt="Codhub logo" width={38} height={38} className="h-8 w-8 object-contain" priority />
                </div>
                <div className="leading-tight">
                  <p className="text-base font-black uppercase tracking-[0.08em] text-white">Codhub</p>
                  <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.24em] text-accent">MW4 Camo Tracker</p>
                </div>
              </Link>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Live Tracker
                </span>
                <Link href={user ? "/profile" : "/login"} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-300 hover:border-accent/40 hover:text-accent">
                  {user ? "Profile" : "Sign In"}
                </Link>
              </div>
            </div>
          </header>
          <main className="mx-auto min-h-screen w-full max-w-xl px-4 pb-28 pt-5 sm:max-w-6xl sm:px-6 sm:pb-32 sm:pt-7">{children}</main>
          <BottomNav isLoggedIn={Boolean(user)} />
        </div>
        <AppToaster />
      </body>
    </html>
  );
}
