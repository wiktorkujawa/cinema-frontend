import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#030303',
        'dark-bg-window': '#1A1A1B',
        'dark-font-primary': '#D7DADC',
        'dark-font-secondary':'#818384',
        'dark-border': '#343536',
        
        'theme-bg': '#DAE0E6',
        'theme-bg-window': '#FFFFFF',
        'theme-font-primary': '#222222',
        'theme-font-secondary':'#878A8C',
        'theme-border': '#ccc',

        menu: '#fdfdfd',
        'eerie-black': '#212121',
        'mine-shaft': '#303030',
        'white-smoke': '#f0f0f0',
        'accent-dark': '#ffffff1f',
        'accent-light': '#000001f',
        'linkedin': '#0e76a8',
        'pink-hover': '#d63384',
        'red-hover': '#dc3545'
      },
      borderWidth: {
        1: '1px'
      },
      maxWidth: {
        'wasm-app': 'calc(100% - 15px)'
      },
      fontSize: {
        h1: [`${40 / 16}rem`, {
          lineHeight: '1.5'
        }],
        h2: [`${36 / 16}rem`, {
          lineHeight: '1.5'
        }],
        h3: [`${32 / 16}rem`, {
          lineHeight: '1.5'
        }],
        h4: [`${28 / 16}rem`, {
          lineHeight: '1.5'
        }],
        h5: [`${24 / 16}rem`, {
          lineHeight: '1.5'
        }],
        h6: [`${20 / 16}rem`, {
          lineHeight: '1.5'
        }],
        h7: [`${16 / 16}rem`, {
          lineHeight: '1.5'
        }],
        p1: [`${16 / 16}rem`, {
          lineHeight: '2'
        }],
        p2: [`${14 / 16}rem`, {
          lineHeight: '2'
        }],
        p3: [`${12 / 16}rem`, {
          lineHeight: '2'
        }],
      },
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
