import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /^bg-/,
      variants: ["sm", "md", "lg", "hover", "focus"], // Optional: specify variants
    },
    {
      pattern: /^text-/,
      variants: ["hover", "focus"], // Optional: specify variants
    },
    {
      pattern: /^p-/,
      variants: ["sm", "md", "lg"], // Optional: specify variants
    },
    // Add other patterns as needed
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
