import { locales, type Locale } from "./ui";

export function localeParams() {
  return (Object.keys(locales) as Locale[]).map((locale) => ({
    params: { locale },
    props: { locale },
  }));
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "it" ? "en" : "it";
}
