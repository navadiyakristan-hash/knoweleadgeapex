
/** @type {import('tailwindcss').Config} */




  



export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // Main theme color (blue)
        secondary: "#64748B", // Gray for UI elements
        background: "#F3F4F6", // Light background color
        dark: "#1E293B", // Dark navbar/footer
        textPrimary: "#111827",
        textSecondary: "#4B5563",
      },
      spacing: {
        section: "6rem", // Default spacing for sections
      },
        screens: {
          xs: "480px", // Extra small screens
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
    
      }
    },
  
  plugins: [ ],
  
};
