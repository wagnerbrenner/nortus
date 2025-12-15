import { useRouter } from "next/router";
import { useLanguageStore } from "@/store/language.store";
import { useEffect } from "react";

export function useLanguage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguageStore();

  useEffect(() => {
    // Sincroniza o idioma do router com o store
    if (router.locale && router.locale !== language) {
      setLanguage(router.locale as "pt" | "en" | "es");
    }
  }, [router.locale, language, setLanguage]);

  const changeLanguage = (newLocale: string) => {
    setLanguage(newLocale as "pt" | "en" | "es");
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return {
    language: router.locale || language,
    changeLanguage,
  };
}
