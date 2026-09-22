 const theme = {
  colors: {
    primary: {
      main: "#000000",
      light: "#ffffff",
      dark: "#DB4444",
      yellow: "#FFFF00",
      customBlack: "#191919",
    },
    secondary: {
      main: "#f5f5f5", // Replace this with the actual value for "background.paper"
    },
  },
  breakpoints: {
    xs: "0px",
    sm: "600px",
    md: "900px",
    lg: "1200px",
    xl: "1536px",
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontSize: "6rem",
      "@media (max-width:960px)": {
        fontSize: "5rem",
      },
      "@media (max-width:600px)": {
        fontSize: "4rem",
      },
      "@media (max-width:414px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontSize: "3.75rem",
      "@media (max-width:960px)": {
        fontSize: "3rem",
      },
      "@media (max-width:662px)": {
        fontSize: "2.3rem",
      },
      "@media (max-width:414px)": {
        fontSize: "2.2rem",
      },
    },
    h3: {
      fontSize: "3rem",
      "@media (max-width:960px)": {
        fontSize: "2.4rem",
      },
      "@media (max-width:662px)": {
        fontSize: "2rem",
      },
      "@media (max-width:414px)": {
        fontSize: "1.7rem",
      },
    },
    h4: {
      fontSize: "2.125rem",
      "@media (max-width:960px)": {
        fontSize: "1.5rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h5: {
      fontSize: "1.5rem",
      "@media (max-width:960px)": {
        fontSize: "1.25rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.1rem",
      },
    },
    h6: {
      fontSize: "1.25rem",
      "@media (max-width:960px)": {
        fontSize: "1.1rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    body1: {
      fontSize: "1rem",
      "@media (max-width:960px)": {
        fontSize: "1rem",
      },
      "@media (max-width:600px)": {
        fontSize: ".9rem",
      },
    },
    body2: {
      fontSize: "1rem",
      "@media (max-width:960px)": {
        fontSize: "1rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
      "@media (max-width:480px)": {
        fontSize: ".97rem",
      },
    },
  },
};


export { theme };