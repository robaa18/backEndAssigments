/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core 5 Brand Swatches from Style Guide
        "brand-blue": "#2C64AC",
        "brand-pink": "#ED7CA5",
        "brand-yellow": "#EDCE4B",
        "brand-coral": "#EE523F",
        "brand-navy": "#1E1B2E",
        "brand-grey": "#E2E2E2",
        "brand-canvas": "#D8D8DC",

        // Semantic Role Aliases
        "primary": "#2C64AC",
        "on-primary": "#ffffff",
        "primary-container": "#DCE7F7",
        "on-primary-container": "#1B3F73",

        "secondary": "#EE523F",
        "on-secondary": "#ffffff",
        "secondary-container": "#FDE5E2",
        "on-secondary-container": "#8C2216",

        "accent": "#EDCE4B",
        "on-accent": "#1E1B2E",
        "accent-container": "#FCF6D6",

        "pink": "#ED7CA5",
        "on-pink": "#ffffff",
        "pink-container": "#FCE9F0",

        "surface": "#ffffff",
        "surface-dim": "#F3F3F5",
        "surface-container": "#F7F7F9",
        "surface-container-high": "#ECECED",
        "on-surface": "#1E1B2E",
        "on-surface-variant": "#595667",
        "outline": "#D1D1D6",
        "outline-variant": "#E2E2E2",

        "error": "#EE523F",
        "on-error": "#ffffff",
        "error-container": "#FDE5E2",
        "on-error-container": "#8C2216",
      },
      fontFamily: {
        showcard: ["'Showcard Gothic'", "'ShowcardGothic'", "'Lilita One'", "'Titan One'", "'DynaPuff'", "cursive", "sans-serif"],
        papabear: ["'Papa Bear'", "'PapaBear'", "'Patrick Hand'", "'Sniglet'", "'Mali'", "cursive", "sans-serif"],
        headline: ["'Showcard Gothic'", "'ShowcardGothic'", "'Lilita One'", "'Titan One'", "cursive", "sans-serif"],
        body: ["'Papa Bear'", "'PapaBear'", "'Patrick Hand'", "'Sniglet'", "cursive", "sans-serif"],
        clean: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      borderRadius: {
        "sm": "0.5rem",
        "DEFAULT": "1rem",
        "md": "1.5rem",
        "lg": "2rem",
        "xl": "2.5rem",
        "2xl": "3rem",
        "full": "9999px"
      },
      boxShadow: {
        "notebook": "0 24px 60px -15px rgba(30, 27, 46, 0.28), 0 10px 24px -5px rgba(0, 0, 0, 0.12)",
        "tab-active": "0 -6px 14px rgba(30, 27, 46, 0.08)",
        "book-spine": "inset 10px 0 18px -4px rgba(0, 0, 0, 0.35), inset -3px 0 6px rgba(255, 255, 255, 0.25)",
        "sketch": "0 2px 10px rgba(238, 82, 63, 0.28)",
        "pop": "4px 4px 0px 0px #1E1B2E",
        "pop-blue": "4px 4px 0px 0px #1B3F73",
        "pop-yellow": "4px 4px 0px 0px #B5981E",
        "pop-pink": "4px 4px 0px 0px #B04970",
      }
    },
  },
  plugins: [],
}
