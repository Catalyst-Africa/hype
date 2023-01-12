// Nospacing method was created, however, spacing happen in ${4} according to the figma design.
// What I mean is, 4 x 1 = 4px, 4 x 2 = 8px, 4 x 4 = 16px and so on

export const breakpoints = {
  xs: 480,
  sm: 767,
  md: 959,
  lg: 1023,
  touch: 1199,
  xl: 1439,
  up: function (screen) {
    switch (screen) {
      case "xs":
        return `@media (min-width: ${this.xs + 1}px)`;
      case "sm":
        return `@media (min-width: ${this.sm + 1}px)`;
      case "md":
        return `@media (min-width: ${this.md + 1}px)`;
      case "lg":
        return `@media (min-width: ${this.lg + 1}px)`;
      case "touch":
        return `@media (min-width: ${this.touch + 1}px)`;
      case "xl":
        return `@media (min-width: ${this.xl + 1}px)`;
      default:
        return ``;
    }
  },
  down: function (screen) {
    switch (screen) {
      case "xs":
        return `@media (max-width: ${this.xs}px)`;
      case "sm":
        return `@media (max-width: ${this.sm}px)`;
      case "md":
        return `@media (max-width: ${this.md}px)`;
      case "lg":
        return `@media (max-width: ${this.lg}px)`;
      case "touch":
        return `@media (max-width: ${this.touch}px)`;
      case "xl":
        return `@media (max-width: ${this.xl}px)`;
      default:
        return ``;
    }
  },
};

export const light = {
  breakpoints: breakpoints,
  color: {
    black: "#020202",
    white: "#FBFFFD",
    error: "#FF0000",
    success: "#2A8F27",
    main: {
      default: "#F69D00",
      900: "#672700",
      800: "#7C3900",
      700: "#934C00",
      600: "#AB6000",
      500: "#C37400",
      400: "#DC8800",
      300: "#F69D00",
      200: "#FFB328",
      100: "#FFC942",
      50: "#FFDF59",
    },
    secondary: {
      default: "#D6313D",
      900: "#8A000A",
      800: "#A3001B",
      700: "#BC0F2C",
      600: "#D6313D",
      500: "#EF4A50",
      400: "#FF6263",
      300: "#FF7977",
      200: "#FF908C",
      100: "#FFA7A1",
      50: "#FFBEB6",
    },
    tertiary: {
      default: "#4ADCD3",
      900: "#004742",
      800: "#005A55",
      700: "#006E68",
      600: "#00837C",
      500: "#009891",
      400: "#00AEA6",
      300: "#26C4BB",
      200: "#49DBD2",
      100: "#65F2E8",
      50: "#7EFFFF",
    },
  },
};

export const dark = {
  breakpoints: breakpoints,
  color: {
    main: {},
    secondary: {},
    tertiary: {},
  },
};
