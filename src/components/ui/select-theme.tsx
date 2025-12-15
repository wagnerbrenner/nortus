"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Monitor, Moon, Sun } from "lucide-react";
import * as React from "react";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "next-i18next";

const themes = [
  { value: "light", labelKey: "theme.light", Icon: Sun },
  { value: "dark", labelKey: "theme.dark", Icon: Moon },
  { value: "auto", labelKey: "theme.auto", Icon: Monitor },
];

export function SelectTheme() {
  const { t } = useTranslation("common");
  const { theme, changeTheme } = useTheme();
  const [selected, setSelected] = React.useState(theme);

  React.useEffect(() => {
    setSelected(theme);
  }, [theme]);

  const current = themes.find((t) => t.value === selected)!;

  const handleThemeChange = (newTheme: string) => {
    setSelected(newTheme as "light" | "dark" | "auto");
    changeTheme(newTheme as "light" | "dark" | "auto");
  };

  return (
    <Select value={selected} onValueChange={handleThemeChange}>
      <SelectTrigger
        className="cursor-pointer
          w-full h-10 rounded-full bg-secondary/80 text-foreground 
          border-none shadow-sm px-4 flex items-center justify-between 
          hover:bg-secondary transition-all 
        "
      >
        <div className="flex items-center gap-2">
          <SelectValue placeholder={t(current.labelKey)} />
        </div>
      </SelectTrigger>

      <SelectContent
        className="
          bg-secondary text-foreground rounded-lg border border-border 
          shadow-md animate-in fade-in-0 zoom-in-95
        "
      >
        {themes.map(({ value, labelKey, Icon }) => (
          <SelectItem
            key={value}
            value={value}
            className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span>{t(labelKey)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
