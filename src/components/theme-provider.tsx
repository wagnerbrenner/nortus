"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/store/theme.store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.remove("light");
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
      }
    };

    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches);
    } else {
      applyTheme(theme === "dark");
    }
  }, [theme]);

  return <>{children}</>;
}
