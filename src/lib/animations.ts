import type { Variants, Transition } from 'motion/react';

// ─── Shared Easing & Timing Tiers ──────────────────────────────────────────────
// Fast interactions: 120–180ms — buttons, taps, icons
// Standard transitions: 220–320ms — cards, dropdowns, toggles
// Large transitions: 350–450ms — pages, sections, modals
// Cinematic: 500–700ms — hero reveals, card flips, parallax

const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_BOUNCE: [number, number, number, number] = [0.34, 1.56, 0.64, 1];
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Fast: 120–180ms
const tFast: Transition = { duration: 0.15, ease: EASE_PREMIUM };
const tFastSpring: Transition = { type: 'spring', stiffness: 500, damping: 35 };

// Standard: 220–320ms
const tMed: Transition = { duration: 0.28, ease: EASE_PREMIUM };
const tMedSpring: Transition = { type: 'spring', stiffness: 350, damping: 28 };

// Large: 350–450ms
const tSlow: Transition = { duration: 0.4, ease: EASE_PREMIUM };

// Cinematic: 500–700ms
const tCinematic: Transition = { duration: 0.6, ease: EASE_CINEMATIC };

// Springs
const springSnappy: Transition = { type: 'spring', stiffness: 400, damping: 30 };
const springGentle: Transition = { type: 'spring', stiffness: 220, damping: 24 };
const springBouncy: Transition = { type: 'spring', stiffness: 340, damping: 22 };
const springCinematic: Transition = { type: 'spring', stiffness: 180, damping: 20, mass: 1.2 };

// ═══════════════════════════════════════════════════════════════════════════════
// 1. FADE
// ═══════════════════════════════════════════════════════════════════════════════

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: tMed },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

export const fadeInSlow: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: tSlow },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const fadeInCinematic: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: tCinematic },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. SLIDE + FADE
// ═══════════════════════════════════════════════════════════════════════════════

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: tMed },
  exit: { opacity: 0, y: -10, transition: { duration: 0.12 } },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: tMed },
  exit: { opacity: 0, y: 10, transition: { duration: 0.12 } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: tMed },
  exit: { opacity: 0, x: -16, transition: { duration: 0.12 } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: tMed },
  exit: { opacity: 0, x: 16, transition: { duration: 0.12 } },
};

export const slideUpLarge: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: tSlow },
  exit: { opacity: 0, y: -20, transition: { duration: 0.15 } },
};

export const slideUpCinematic: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_CINEMATIC },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: { duration: 0.25 },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. SCALE + FADE
// ═══════════════════════════════════════════════════════════════════════════════

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: springGentle },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.12 } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: springSnappy },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.12 } },
};

export const popInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: springBouncy },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.12 } },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. BLUR FADE (premium page/section transitions)
// ═══════════════════════════════════════════════════════════════════════════════

export const blurFadeIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', scale: 0.97 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.5, ease: EASE_CINEMATIC },
  },
  exit: {
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.98,
    transition: { duration: 0.25, ease: EASE_SMOOTH },
  },
};

export const blurSlideUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: EASE_CINEMATIC },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(4px)',
    transition: { duration: 0.2 },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. VIEWPORT ENTER (scroll reveal)
// ═══════════════════════════════════════════════════════════════════════════════

export const viewportFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_CINEMATIC },
  },
};

export const viewportFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_PREMIUM },
  },
};

export const viewportScaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_PREMIUM },
  },
};

export const viewportBlurUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE_CINEMATIC },
  },
};

export const viewportSlideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_CINEMATIC },
  },
};

export const viewportSlideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_CINEMATIC },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. STAGGER CONTAINERS
// ═══════════════════════════════════════════════════════════════════════════════

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.06,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerCinematic: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: tMed },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: springGentle },
};

export const staggerItemBlur: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: EASE_CINEMATIC },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 7. PAGE TRANSITIONS (premium blur-fade-scale)
// ═══════════════════════════════════════════════════════════════════════════════

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8, scale: 0.998, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: EASE_CINEMATIC },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.998,
    filter: 'blur(4px)',
    transition: { duration: 0.2, ease: EASE_SMOOTH },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 8. HOVER / TAP (micro-interactions)
// ═══════════════════════════════════════════════════════════════════════════════

export const hoverLift = {
  whileHover: {
    y: -3,
    transition: { duration: 0.22, ease: EASE_PREMIUM },
  },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
};

export const hoverScale = {
  whileHover: { scale: 1.025, transition: { duration: 0.22, ease: EASE_PREMIUM } },
  whileTap: { scale: 0.975, transition: { duration: 0.1 } },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 24px rgba(195, 244, 0, 0.18)',
    transition: { duration: 0.25 },
  },
};

export const hoverIconBounce = {
  whileHover: {
    scale: 1.15,
    rotate: -5,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
  whileTap: { scale: 0.9, transition: { duration: 0.08 } },
};

export const hoverCardLift: Variants = {
  rest: { y: 0, scale: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.3)' },
  hover: {
    y: -6,
    scale: 1.015,
    boxShadow: '0 12px 40px rgba(0,0,0,0.35), 0 0 20px rgba(195,244,0,0.08)',
    transition: { duration: 0.3, ease: EASE_CINEMATIC },
  },
};

export const cardHover = {
  whileHover: {
    y: -2,
    transition: { duration: 0.2, ease: EASE_PREMIUM },
  },
  whileTap: { scale: 0.99, transition: { duration: 0.08 } },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 9. BUTTON PRESS FEEDBACK
// ═══════════════════════════════════════════════════════════════════════════════

export const buttonPress = {
  whileHover: { scale: 1.02, transition: { duration: 0.15, ease: EASE_PREMIUM } },
  whileTap: { scale: 0.97, transition: { duration: 0.08, ease: EASE_SMOOTH } },
};

export const buttonIconSpin = {
  whileHover: { rotate: 12, transition: { duration: 0.2 } },
  whileTap: { scale: 0.85, rotate: -8, transition: { duration: 0.1 } },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 10. DROPDOWN / POPOVER
// ═══════════════════════════════════════════════════════════════════════════════

export const dropdown: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.96, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.2, ease: EASE_PREMIUM },
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.97,
    filter: 'blur(2px)',
    transition: { duration: 0.12, ease: EASE_PREMIUM },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 11. ACCORDION
// ═══════════════════════════════════════════════════════════════════════════════

export const accordionContent: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { height: { duration: 0.3, ease: EASE_PREMIUM }, opacity: { duration: 0.2, delay: 0.05 } },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 12. PROGRESS BAR
// ═══════════════════════════════════════════════════════════════════════════════

export const progressBarFill: Variants = {
  hidden: { scaleX: 0 },
  visible: (width: number) => ({
    scaleX: width,
    transition: { duration: 0.8, ease: EASE_PREMIUM, delay: 0.2 },
  }),
};

export const progressBarGlow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (width: number) => ({
    scaleX: width,
    opacity: 1,
    transition: { duration: 1, ease: EASE_CINEMATIC, delay: 0.3 },
  }),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 13. NUMBER / COUNTER
// ═══════════════════════════════════════════════════════════════════════════════

export const countUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_CINEMATIC } },
};

export const numberTicker: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_CINEMATIC } },
};

export const counterRoll: Variants = {
  initial: { opacity: 0, y: 20, rotateX: -40 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: EASE_CINEMATIC },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 14. IMAGE
// ═══════════════════════════════════════════════════════════════════════════════

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.06, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE_CINEMATIC },
  },
};

export const imageFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_PREMIUM },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 15. BEFORE/AFTER SLIDER
// ═══════════════════════════════════════════════════════════════════════════════

export const sliderClip: Variants = {
  hidden: { clipPath: 'inset(0 50% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 16. CARD FLIP (3D perspective)
// ═══════════════════════════════════════════════════════════════════════════════

export const cardFlip: Variants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.65, ease: EASE_CINEMATIC },
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.65, ease: EASE_CINEMATIC },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 17. ICON SPIN / BOUNCE
// ═══════════════════════════════════════════════════════════════════════════════

export const iconSpin: Variants = {
  hidden: { opacity: 0, rotate: -90, scale: 0.5 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: springSnappy,
  },
};

export const iconBounce: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springBouncy,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 18. CAROUSEL
// ═══════════════════════════════════════════════════════════════════════════════

export const carouselSlide = (direction: number) => ({
  enter: { x: direction > 0 ? 80 : -80, opacity: 0, scale: 0.98 },
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_PREMIUM } },
  exit: { x: direction > 0 ? -80 : 80, opacity: 0, scale: 0.98, transition: { duration: 0.25, ease: EASE_PREMIUM } },
});

// ═══════════════════════════════════════════════════════════════════════════════
// 19. CHART BAR
// ═══════════════════════════════════════════════════════════════════════════════

export const chartBar: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: EASE_CINEMATIC,
      delay: i * 0.06,
    },
  }),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 20. TOAST
// ═══════════════════════════════════════════════════════════════════════════════

export const toastSlide: Variants = {
  hidden: { opacity: 0, y: -20, x: 0, scale: 0.92, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.3, ease: EASE_BOUNCE },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    filter: 'blur(2px)',
    transition: { duration: 0.15, ease: EASE_PREMIUM },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 21. HERO TEXT (cinematic line-by-line reveal)
// ═══════════════════════════════════════════════════════════════════════════════

export const heroTextLine: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE_CINEMATIC },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 22. MODAL
// ═══════════════════════════════════════════════════════════════════════════════

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.3, ease: EASE_CINEMATIC },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    filter: 'blur(2px)',
    transition: { duration: 0.2, ease: EASE_SMOOTH },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 23. SIDEBAR
// ═══════════════════════════════════════════════════════════════════════════════

export const sidebarExpand: Variants = {
  collapsed: { opacity: 0, x: -8 },
  expanded: { opacity: 1, x: 0, transition: { duration: 0.2, ease: EASE_PREMIUM } },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 24. HEADER SCROLL ELEVATION (used inline)
// ═══════════════════════════════════════════════════════════════════════════════

// Handled via CSS transition classes in Header component

// ═══════════════════════════════════════════════════════════════════════════════
// 25. STATISTIC COUNTER
// ═══════════════════════════════════════════════════════════════════════════════

export const statCountUp: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_CINEMATIC },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 26. PRICING CARD
// ═══════════════════════════════════════════════════════════════════════════════

export const pricingCard: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_CINEMATIC },
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    transition: { duration: 0.3, ease: EASE_CINEMATIC },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 27. TESTIMONIAL
// ═══════════════════════════════════════════════════════════════════════════════

export const testimonialCard: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -5 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: EASE_CINEMATIC },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 28. FLOATING ANIMATION (for WhatsApp button, etc.)
// ═══════════════════════════════════════════════════════════════════════════════

export const floating: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 29. SECTION DIVIDER REVEAL
// ═══════════════════════════════════════════════════════════════════════════════

export const sectionReveal: Variants = {
  hidden: { opacity: 0, scaleY: 0.6, transformOrigin: 'top' },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.5, ease: EASE_CINEMATIC },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 30. GLOW PULSE (for active states)
// ═══════════════════════════════════════════════════════════════════════════════

export const glowPulse: Variants = {
  idle: {
    boxShadow: '0 0 15px rgba(195, 244, 0, 0.2)',
  },
  pulse: {
    boxShadow: [
      '0 0 15px rgba(195, 244, 0, 0.2)',
      '0 0 30px rgba(195, 244, 0, 0.4)',
      '0 0 15px rgba(195, 244, 0, 0.2)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ─── Exports ───────────────────────────────────────────────────────────────────

export const PREMIUM_EASE = EASE_PREMIUM;
export const CINEMATIC_EASE = EASE_CINEMATIC;
export const SPRING_SNAPPY = springSnappy;
export const SPRING_GENTLE = springGentle;
export const SPRING_CINEMATIC = springCinematic;
