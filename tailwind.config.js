/** @type {import('tailwindcss').Config} */
export default {
  // make sure Tailwind scans your app files so classes in Vue components are included
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

