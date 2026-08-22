import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        void: "#08060f",
        deep: "#120d1e",
        panel: "#171122",
        "bg-primary": "#08060f",
        "bg-secondary": "#120d1e",
        gold: {
          DEFAULT: "#d4af6a",
          bright: "#f0cd8a",
          dim: "#a8894e",
        },
        arcane: {
          DEFAULT: "#9b7fe0",
          dim: "#5c4a8c",
        },
        ember: "#c15b4a",
        parchment: "#ece3d0",
        slate: {
          DEFAULT: "#a99bc2",
          dim: "#6b5c86",
        },
        "line": {
          DEFAULT: "#3a2c4a",
          bright: "#5c4470",
        },
        /* legacy tokens kept for compatibility — remapped to arcane palette */
        "accent-cyan": "#d4af6a",
        "accent-violet": "#9b7fe0",
        "accent-amber": "#f0cd8a",
        "accent-emerald": "#f0cd8a",
        "accent-rose": "#c15b4a",
        "text-primary": "#ece3d0",
        "text-secondary": "#a99bc2",
        "text-muted": "#6b5c86",
      },
      fontFamily: {
        sans: ["var(--font-garamond)", "EB Garamond", "serif"],
        serif: ["var(--font-garamond)", "EB Garamond", "serif"],
        display: ["var(--font-cinzel)", "Cinzel", "serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "glow-pulse": "pulseGlow 3.6s ease-in-out infinite",
        "gradient-shift": "gradientShift 15s ease infinite",
        "spin-slow": "spin 40s linear infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        shine: "shine 7s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(212, 175, 106, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(212, 175, 106, 0.45), 0 0 40px rgba(155, 127, 224, 0.15)",
          },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shine: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "220% center" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "3xl": "64px",
      },
    },
  },
  plugins: [],
} satisfies Config;
