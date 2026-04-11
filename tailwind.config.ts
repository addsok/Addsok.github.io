import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#06090f",
        panel: "#0f1622",
        accent: "#7cf7d5",
        accentMuted: "#24423d",
        success: "#55f4ad",
        warning: "#f5c96c",
        danger: "#ff6f88"
      },
      boxShadow: {
        glow: "0 12px 36px rgba(3, 8, 18, 0.55)",
        inset: "inset 0 1px 0 rgba(124, 247, 213, 0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;
