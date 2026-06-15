import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Nunito", "sans-serif"],
        body: ["Lexend", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#4A90D9",  // Calm blue — English audio
          light: "#7BB8F0",
          dark: "#2D6BA8",
        },
        secondary: {
          DEFAULT: "#F5A623",  // Warm orange — Malayalam audio
          light: "#FFCC70",
          dark: "#C07D00",
        },
        success: {
          DEFAULT: "#5CB85C",
          light: "#A8E6A8",
        },
        bg: {
          DEFAULT: "#FAFBFF",
          card: "#FFFFFF",
          soft: "#EEF4FF",
        },
        module: {
          alphabet: "#7C6FE0",  // Purple
          numbers: "#4A90D9",   // Blue
          animals: "#E85D75",   // Coral
          plants: "#52C07C",    // Green
          routine: "#F5A623",   // Orange
          manners: "#9B59B6",   // Violet
        },
      },
      fontSize: {
        "hero": ["5rem", { lineHeight: "1", fontWeight: "800" }],
        "lesson": ["3rem", { lineHeight: "1.2", fontWeight: "700" }],
        "label": ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
      },
      borderRadius: {
        "xl2": "1.5rem",
        "xl3": "2rem",
      },
      animation: {
        "star-pop": "starPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "bounce-in": "bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "wiggle": "wiggle 0.5s ease-in-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        starPop: {
          "0%": { transform: "scale(0) rotate(-45deg)", opacity: "0" },
          "80%": { transform: "scale(1.2) rotate(5deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(92, 184, 92, 0.4)" },
          "50%": { boxShadow: "0 0 0 20px rgba(92, 184, 92, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
