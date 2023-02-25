/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ShareTechMono: ["'Share Tech Mono', monospace"],
      },
      aspectRatio: {
        'din': '1 / 1.41',
      },
    },
  },
  plugins: [],
}
