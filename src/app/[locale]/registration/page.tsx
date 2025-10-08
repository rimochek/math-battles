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
      <div className="w-full flex justify-center">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSd-QGpFGTRCJIAeHA8qB8U59wbEGivFqgq1rHeZOXnt0-de3Q/viewform?embedded=true"
          width="640"
          height="5917"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          loading="lazy">
          {t("loading")}
          </iframe>
        </div>
    </div>
  )
}
