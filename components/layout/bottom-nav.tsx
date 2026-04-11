"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crosshair, House, LayoutDashboard, Trophy, UserRound } from "lucide-react";
import { clsx } from "clsx";

type BottomNavProps = {
  isLoggedIn: boolean;
};

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function BottomNav({ isLoggedIn }: BottomNavProps) {
  const pathname = usePathname();

  const items: NavItem[] = [
    { href: "/", label: "Home", icon: House },
    ...(isLoggedIn ? [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] : []),
    { href: "/weapons", label: "Weapons", icon: Crosshair },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: isLoggedIn ? "/profile" : "/login", label: "Profile", icon: UserRound }
  ];

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="pointer-events-auto w-full max-w-xl rounded-3xl border border-white/10 bg-[#12100d]/95 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
        <ul className="grid gap-1" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
          {items.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

            return (
              <li key={label}>
                <Link
                  href={href}
                  className={clsx(
                    "flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-medium tracking-wide transition",
                    isActive
                      ? "bg-accent/20 text-accent"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  )}
                >
                  <Icon className="mb-1 h-4 w-4" />
                  <span className="truncate">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
