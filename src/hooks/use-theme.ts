import { useEffect } from "react";
import { useThemeStore } from "@/store/theme.store";

type Theme = "light" | "dark" | "auto";

export function useTheme() {
  const { theme, setTheme, resolvedTheme, setResolvedTheme } = useThemeStore();

  useEffect(() => {
    const applyTheme = (isDark: boolean) => {
      const root = document.documentElement;
      if (isDark) {
        root.classList.remove("light");
        root.classList.add("dark");
        setResolvedTheme("dark");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        setResolvedTheme("light");
      }
    };

    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      applyTheme(theme === "dark");
    }
  }, [theme, setResolvedTheme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    resolvedTheme,
    changeTheme,
  };
}
