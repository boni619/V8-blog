/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        surface: "#FFFFFF",
        text: "#111827",
        "text-secondary": "#6B7280",
        border: "#E5E7EB",
        primary: "#2563EB",
        "primary-hover": "#1D4ED8",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        "dark-background": "#09090B",
        "dark-surface": "#18181B",
        "dark-border": "#27272A",
        "dark-text": "#FAFAFA",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "h1": ["48px", { lineHeight: "1.1", fontWeight: "700" }],
        "h2": ["36px", { lineHeight: "1.2", fontWeight: "700" }],
        "h3": ["28px", { lineHeight: "1.3", fontWeight: "600" }],
        "body": ["18px", { lineHeight: "1.8" }],
        "btn": ["15px", { lineHeight: "1", fontWeight: "600" }],
      },
      borderRadius: {
        "card": "20px",
        "article": "20px",
      },
      spacing: {
        "section": "120px",
      },
      maxWidth: {
        "container": "1280px",
        "reading": "760px",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
