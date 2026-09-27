import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070b0a",
        panel: "#101614",
        accent: "#a8b96b",
        accentMuted: "#536039",
        success: "#a8b96b",
        warning: "#d6b85c",
        danger: "#e26d6d"
      },
      boxShadow: {
        glow: "0 24px 65px rgba(0, 0, 0, 0.68)",
        inset: "inset 0 1px 0 rgba(255, 255, 255, 0.045)"
      }
    }
  },
  plugins: []
} satisfies Config;
