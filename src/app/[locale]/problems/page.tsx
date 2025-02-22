"use client"

import { useTranslations } from "next-intl"

export const dynamic = "force-dynamic" // Forces the page to be rendered dynamically

export default function NotFoundPage() {
  const t = useTranslations("problems")

  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1
          className="mb-4 text-3xl tracking-tight font-extrabold lg:text-7xl text-primary-600 dark:text-primary-500"
          style={{ color: "#1D3AAC" }}
        >
          {t("inDevelopment")}
        </h1>
        <p className="mb-4 text-xl tracking-tight font-bold text-gray-900 md:text-3xl">
          {t("notReady")}
        </p>
        <p className="mb-4 text-lg font-light text-black">{t("iSwear")}</p>
      </div>
    </div>
  )
}
