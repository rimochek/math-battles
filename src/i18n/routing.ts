import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "ru"],
  defaultLocale: "ru",
  pathnames: {
    "/": "/",
    "/our-team": {
      en: "/our-team",
      ru: "/наша-команда",
    },
    "/problems": {
      en: "/problems",
      ru: "/материалы",
    },
    "/gallery": {
      en: "/gallery",
      ru: "/галерея",
    },
    "/registration": {
      en: "/registration",
      ru: "/регистрация",
    },
  },
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing)
