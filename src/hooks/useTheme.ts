import { useLayoutEffect } from "react";

export const DEFAULT_THEME = {
  "danmu-text-color": "#fff",
  "danmu-username-color": "#fff",
};

const useTheme = (theme: any = DEFAULT_THEME) => {
  useLayoutEffect(
    () => {
      // Iterate through each value in theme object
      for (const key in theme) {
        // Update css variables in document's root element
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    },
    [theme] // Only call again if theme object reference changes
  );
};

export default useTheme;
