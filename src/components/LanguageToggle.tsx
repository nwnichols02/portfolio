import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { SupportedLocale } from "@/i18n/resources"

const labels: Record<SupportedLocale, string> = {
  en: "EN",
  tl: "Tagalog",
}

export function LanguageToggle() {
  const { i18n } = useTranslation()

  const locale = (i18n.language === "tl" ? "tl" : "en") as SupportedLocale

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center rounded-full border border-[#363636] bg-[#252525] p-1 gap-0.5"
    >
      {(["en", "tl"] as const).map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => i18n.changeLanguage(loc)}
          className={cn(
            "min-h-[36px] min-w-[44px] px-3 md:px-4 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]",
            locale === loc
              ? "bg-white text-black"
              : "text-[#a0a0a0] hover:text-[#e0e0e0]"
          )}
          aria-pressed={locale === loc}
          aria-label={loc === "en" ? "English" : "Tagalog"}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  )
}
