import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "mobile-bg1": "url('/bg/bg-mobile1.png')",
                bg1: "url('/bg/bg1.png')",
                "launch-bg": "url('/bg/launch-bg.png')",
                // "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                // "gradient-conic":
                //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            borderRadius: {
                md: "5px",
            },
            animation: {
                marquee: "marquee 25s linear infinite",
                marquee2: "marquee2 25s linear infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
                marquee2: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
