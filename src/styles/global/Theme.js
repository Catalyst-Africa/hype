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
};

export const dark = {
  breakpoints: breakpoints,
};
