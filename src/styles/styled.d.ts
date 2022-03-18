import "@emotion/react";

import { Theme as EmotionTheme } from "./styles/theme";

declare module "@emotion/react" {
  export interface Theme extends EmotionTheme {
    colors: {
      background: string;
      brown: string;
      softBrown: string;
      yellow: string;
      white: string;
      black: string;
      gray: string;
    };
  }
}
