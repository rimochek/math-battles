"use client"
import { useTranslations } from "next-intl"

export default function RegistrationPage() {
  const t = useTranslations("registration")

  return (
    <div>
      <div className="mx-auto max-w-4xl items-center justify-between p-6 lg:px-8 pt-12 pb-16">
        <p className="font-bold text-4xl mb-5">{t("registration")}</p>
        <p className="text-xl">{t("registrationContext")}</p>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd-QGpFGTRCJIAeHA8qB8U59wbEGivFqgq1rHeZOXnt0-de3Q/viewform?embedded=true" width="640" height="5917" frameborder="0" marginheight="0" marginwidth="0">Загрузка…</iframe>
      </div>
    </div>
  )
}
