"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { BR, ES, US } from "country-flag-icons/react/3x2";
import * as React from "react";
import { useRouter } from "next/router";
import { useLanguageStore } from "@/store/language.store";

const languages = [
  { value: "pt", label: "PT-BR", Flag: BR },
  { value: "en", label: "EN-US", Flag: US },
  { value: "es", label: "ES-ES", Flag: ES },
];

export function SelectLanguage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguageStore();
  const [selected, setSelected] = React.useState(language);
  const current = languages.find((l) => l.value === selected)!;

  const handleLanguageChange = (newLang: string) => {
    const lang = newLang as "pt" | "en" | "es";
    setSelected(lang);
    setLanguage(lang);
    router.push(router.pathname, router.asPath, { locale: newLang });
  };

  return (
    <Select value={selected} onValueChange={handleLanguageChange}>
      <SelectTrigger
        className="cursor-pointer
          w-[130px] h-10 rounded-full bg-secondary/80 text-foreground 
          border-none shadow-sm px-4 flex items-center justify-between 
          hover:bg-secondary transition-all 
        "
      >
        <div className="flex items-center gap-2">
          <SelectValue placeholder={current.label} />
        </div>
      </SelectTrigger>

      <SelectContent
        className="
          bg-secondary text-foreground rounded-lg border border-border 
          shadow-md animate-in fade-in-0 zoom-in-95
        "
      >
        {languages.map(({ value, label, Flag }) => (
          <SelectItem
            key={value}
            value={value}
            className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2">
              <Flag title={label} className="w-5 h-4 rounded-sm" />
              <span>{label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
