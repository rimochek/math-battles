"use client"
import { useTranslations } from "next-intl"

export default function RegistrationPage() {
  const t = useTranslations("registration")

  return (
    <div>
      <div className="mx-auto max-w-4xl items-center justify-between p-6 lg:px-8 pt-12 pb-16">
        <p className="font-bold text-4xl mb-5">{t("registration")}</p>
        <p className="text-xl">
          {t.rich("registrationContext", {
            link: (chunks) => (
              <a
                href="https://docs.google.com/document/d/1muSZNWbnnNeYpfidLVcud6p1oHAix0i2NwERt-fIyuQ/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800 transition-colors"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
      <div className="w-full flex justify-center">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSd-QGpFGTRCJIAeHA8qB8U59wbEGivFqgq1rHeZOXnt0-de3Q/viewform?embedded=true"
          width="100%"
          height="500"
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
