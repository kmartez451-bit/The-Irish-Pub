/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Neutral grey scale (user-provided) ──
        g97:  "#F5F6F7",
        g95:  "#F2F3F5",
        g93:  "#EBEDF0",
        g86:  "#DADDE1",
        g80:  "#CCD0D5",
        g75:  "#BEC3C9",
        g56:  "#8D949E",
        g38:  "#606770",
        g27:  "#444950",
        g19:  "#303338",
        g12:  "#1C1E21",
        // ── Irish greens (user-provided) ──
        "g-dark":  "#00A400",
        "g-mid":   "#31A73B",
        "g-light": "#51CE70",
        // ── Warm accent (CTA) ──
        amber: "#C9891A",
      },
      fontFamily: {
        sans:  ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono:  ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Bump all text sizes +1 step from Tailwind default
        xs:   ["0.8125rem",  { lineHeight: "1.25rem" }],
        sm:   ["0.9375rem",  { lineHeight: "1.5rem" }],
        base: ["1.0625rem",  { lineHeight: "1.75rem" }],
        lg:   ["1.1875rem",  { lineHeight: "1.875rem" }],
        xl:   ["1.3125rem",  { lineHeight: "2rem" }],
        "2xl":["1.5625rem",  { lineHeight: "2.125rem" }],
        "3xl":["1.9375rem",  { lineHeight: "2.375rem" }],
        "4xl":["2.375rem",   { lineHeight: "2.75rem" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      animation: {
        "marquee":    "marquee 30s linear infinite",
        "marquee2":   "marquee2 30s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ken-burns":  "kenBurns 20s ease-in-out infinite alternate",
      },
      keyframes: {
        marquee:   { "0%": { transform: "translateX(0%)" },  "100%": { transform: "translateX(-50%)" } },
        marquee2:  { "0%": { transform: "translateX(50%)" }, "100%": { transform: "translateX(0%)" } },
        kenBurns:  { "0%": { transform: "scale(1) translate(0%, 0%)" }, "100%": { transform: "scale(1.1) translate(-2%, -1%)" } },
      },
    },
  },
  plugins: [],
}
