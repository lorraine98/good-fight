import { PaletteMode } from "@mui/material";

export const getDesignToken = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: "#F6F6F6",
          text: "#212124",
          brown: "#C1A089",
          softBrown: "#D9C3B0",
          yellow: "#F4BB6C",
          white: "#FFFFFF",
          gray: "#868B94",
        }
      : {
          background: "#212124",
          text: "#F6F6F6",
          brown: "#C1A089",
          softBrown: "#D9C3B0",
          yellow: "#F4BB6C",
          white: "#FFFFFF",
          gray: "#868B94",
        }),
  },
});
