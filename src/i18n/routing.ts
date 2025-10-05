import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "ru", "kz"],
  defaultLocale: "ru",
  pathnames: {
    "/": "/",
    "/our-team": {
      en: "/our-team",
      ru: "/наша-команда",
      kz: "/біздің-команда",
    },
    "/problems": {
      en: "/problems",
      ru: "/материалы",
      kz: "/материалдар",
    },
    "/gallery": {
      en: "/gallery",
      ru: "/галерея",
      kz: "/галерея",
    },
    "/registration": {
      en: "/registration",
      ru: "/регистрация",
      kz: "/тіркеу",
    },
  },
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing)
