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
    },
  },
});
