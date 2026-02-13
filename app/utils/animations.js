// Framer Motion Animation Variants and Utilities

// Fade In Animations
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Stagger Container for Grid Items
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Product Card Animation
export const productCard = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Scale on Hover
export const scaleOnHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Slide In from Side
export const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Cart Badge Bump
export const cartBadgeBump = {
  scale: [1, 1.3, 1],
  transition: { duration: 0.3, ease: "easeInOut" }
};

// Dropdown Menu
export const dropdownMenu = {
  hidden: { 
    opacity: 0, 
    y: -10,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.2, 
      ease: "easeOut" 
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    scale: 0.95,
    transition: { 
      duration: 0.15 
    }
  }
};

// Mobile Menu Slide
export const mobileMenu = {
  hidden: { x: "-100%" },
  visible: { 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    }
  },
  exit: { 
    x: "-100%",
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    }
  }
};

// Skeleton Shimmer
export const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity
    }
  }
};

// Page Transition
export const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: "easeOut" 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.3 
    }
  }
};

// Modal Overlay
export const modalOverlay = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Modal Content
export const modalContent = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    y: 20,
    transition: { 
      duration: 0.2 
    }
  }
};

// Hover Lift Effect
export const hoverLift = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.12)" },
  hover: { 
    y: -4,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Spring Animation Config
export const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 25
};

// Smooth Spring Config
export const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 15
};
