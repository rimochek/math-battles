"use client"
import { useTranslations } from "next-intl"

export default function RegistrationPage() {
  const t = useTranslations("registration")

  return (
    <div>
      <div className="mx-auto max-w-4xl items-center justify-between p-6 lg:px-8 pt-12 pb-16">
        <p className="font-bold text-4xl mb-5">{t("registration")}</p>
        <p className="text-xl">{t("registrationContext")}</p>
      </div>
    </div>
  )
}
