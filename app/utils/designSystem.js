// Amazon-inspired Design System

export const colors = {
  // Primary Amazon Colors
  primary: {
    orange: "#FF9900",
    darkOrange: "#F08804",
    navy: "#232F3E",
    lightNavy: "#37475A",
  },
  
  // Background Colors
  background: {
    white: "#FFFFFF",
    light: "#F3F3F3",
    grey: "#EAEDED",
    dark: "#232F3E",
  },
  
  // Text Colors
  text: {
    primary: "#0F1111",
    secondary: "#565959",
    light: "#6F7780",
    white: "#FFFFFF",
  },
  
  // Border Colors
  border: {
    light: "#D5D9D9",
    medium: "#888C8C",
    dark: "#565959",
  },
  
  // Status Colors
  status: {
    success: "#067D62",
    error: "#C40000",
    warning: "#F08804",
    info: "#007185",
  },
  
  // Rating Star
  star: "#FFA41C",
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
};

export const typography = {
  fontFamily: {
    primary: "var(--font-source-sans)",
    amazon: "'Amazon Ember', Arial, sans-serif",
  },
  
  fontSize: {
    xs: "12px",
    sm: "13px",
    base: "14px",
    md: "15px",
    lg: "18px",
    xl: "21px",
    "2xl": "24px",
    "3xl": "28px",
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.05)",
  base: "0 1px 3px rgba(0,0,0,0.12)",
  md: "0 4px 6px rgba(0,0,0,0.1)",
  lg: "0 10px 25px rgba(0,0,0,0.15)",
  xl: "0 20px 40px rgba(0,0,0,0.2)",
  card: "0 2px 5px rgba(15,17,17,0.15)",
  cardHover: "0 4px 12px rgba(15,17,17,0.2)",
};

export const borderRadius = {
  none: "0",
  sm: "2px",
  base: "4px",
  md: "8px",
  lg: "12px",
  full: "9999px",
};

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

export const transitions = {
  fast: "150ms ease-in-out",
  base: "200ms ease-in-out",
  slow: "300ms ease-in-out",
  slower: "500ms ease-in-out",
};

// Grid System
export const grid = {
  container: {
    maxWidth: "1500px",
    padding: "0 16px",
  },
  
  columns: {
    mobile: 1,
    tablet: 2,
    desktop: 4,
    wide: 5,
  },
  
  gap: {
    mobile: "12px",
    tablet: "16px",
    desktop: "20px",
  },
};

// Component Specific Styles
export const components = {
  navbar: {
    height: "60px",
    secondaryHeight: "39px",
    background: colors.primary.navy,
    zIndex: zIndex.sticky,
  },
  
  productCard: {
    aspectRatio: "3/4",
    borderRadius: borderRadius.base,
    shadow: shadows.card,
    hoverShadow: shadows.cardHover,
  },
  
  button: {
    height: {
      sm: "29px",
      md: "37px",
      lg: "45px",
    },
    borderRadius: borderRadius.base,
  },
  
  input: {
    height: "39px",
    borderRadius: borderRadius.base,
    borderColor: colors.border.medium,
  },
};
