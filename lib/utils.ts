import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);
