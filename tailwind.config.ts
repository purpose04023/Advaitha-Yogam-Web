import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sage: {
          50: "#F8F9F8",
          100: "#F0F2EE",
          200: "#E1E6DF",
          300: "#CED6CA",
          400: "#94A38E",
          500: "#7D907E",
          600: "#657666",
          700: "#4D594E",
          800: "#353D36",
          900: "#1D211D",
        },
        terracotta: {
          50: "#FEF7F6",
          100: "#FDF0EE",
          200: "#FBE1DC",
          300: "#F8CFC8",
          400: "#F2AB9F",
          500: "#E8873A", // Reusing the saffron/orange as primary accent but calling it terracotta/saffron contextually
          600: "#C2410C", // Real terracotta
          700: "#9A3412",
          800: "#7C2D12",
          900: "#451A03",
        },
        cream: "#FDFCF8",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        telugu: ["var(--font-telugu)"],
      },
    },
  },
  plugins: [],
};
export default config;
