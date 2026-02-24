import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { resources, type SupportedLocale } from "./resources"

const STORAGE_KEY = "vite-portfolio-locale"

const savedLng = (): SupportedLocale | null => {
  const l = localStorage.getItem(STORAGE_KEY)
  if (l === "en" || l === "tl") return l
  return null
}

i18n.use(initReactI18next).init({
  resources,
  lng: savedLng() ?? "en",
  fallbackLng: "en",
  defaultNS: "translation",
  interpolation: {
    escapeValue: false,
  },
})

i18n.on("languageChanged", (lng: string) => {
  if (lng === "en" || lng === "tl") {
    localStorage.setItem(STORAGE_KEY, lng)
  }
})

export default i18n
