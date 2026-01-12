/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public.html",
    "./portal.html",
    "./admin.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midu-blue': '#007BFF',
        'midu-green': '#28A745',
        'midu-orange': '#FD7E14',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        midu: {
          "primary": "#007BFF",
          "secondary": "#28A745",
          "accent": "#FD7E14",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
}
