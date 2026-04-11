import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070a0f",
        panel: "#131a25",
        accent: "#34cfff",
        accentMuted: "#1a3650",
        success: "#58d68d",
        warning: "#f5c96c",
        danger: "#ff6f88"
      },
      boxShadow: {
        glow: "0 20px 55px rgba(1, 8, 20, 0.45)",
        inset: "inset 0 1px 0 rgba(255, 255, 255, 0.04)"
      }
    }
  },
  plugins: []
} satisfies Config;
