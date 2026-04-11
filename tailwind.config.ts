import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#090806",
        panel: "#1b1612",
        accent: "#d89f37",
        accentMuted: "#4d3920",
        success: "#58d68d",
        warning: "#f5c96c",
        danger: "#ff6f88"
      },
      boxShadow: {
        glow: "0 24px 65px rgba(0, 0, 0, 0.6)",
        inset: "inset 0 1px 0 rgba(255, 255, 255, 0.04)"
      }
    }
  },
  plugins: []
} satisfies Config;
