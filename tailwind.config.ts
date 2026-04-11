import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0d12",
        panel: "#111822",
        accent: "#30e9ff",
        success: "#35f3a3",
        warning: "#ffcc4d",
        danger: "#ff5f7a"
      },
      boxShadow: { glow: "0 0 24px rgba(48,233,255,0.2)" }
    }
  },
  plugins: []
} satisfies Config;
