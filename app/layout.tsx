import "@/styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import { AppToaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/server";
import { BottomNav } from "@/components/layout/bottom-nav";

export const metadata = {
  title: "Codhub | BO7 Tracker",
  description: "Track Black Ops 7 camo progress with Codhub's BO7 Tracker"
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
              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-[#1e1914] px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#2a231b] p-1.5">
                  <Image
                    src="/codhub-logo.png"
                    alt="Codhub logo"
                    width={38}
                    height={38}
                    className="h-9 w-9 object-contain"
                    priority
                  />
                </div>
                <div className="leading-tight">
                  <p className="text-base font-semibold text-white">Codhub</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">BO7 Tracker</p>
                </div>
              </Link>
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
