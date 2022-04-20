import { PaletteMode, createTheme } from "@mui/material";

export const getDesignToken = (mode: PaletteMode) => ({
  palette: {
    mode,
    custom: {
      background: mode === "light" ? "#F6F6F6" : "#212124",
      text: mode === "light" ? "#212124" : "#F6F6F6",
      brown: "#C1A089",
      softBrown: "#D9C3B0",
      yellow: "#F4BB6C",
      white: "#FFFFFF",
      gray: "#868B94",
      lightGreen: "#27c255",
      iconSize: {
        large: {
          width: "3.625rem",
          height: "3.625rem",
        },
        medium: {
          width: "2.625rem",
          height: "2.625rem",
        },
        small: {
          width: "1.625rem",
          height: "1.625rem",
        },
      },
      fontSize: {
        large: "3rem",
        medium: "2rem",
        small: "1rem",
      },
    },
  },
});
