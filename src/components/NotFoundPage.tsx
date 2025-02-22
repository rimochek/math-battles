import { useTranslations } from "next-intl"

export default function NotFoundPage() {
  const t = useTranslations("notFound")

  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1
            className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500"
            style={{ color: "#1D3AAC" }}
          >
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            {t("missing")}
          </p>
          <p className="mb-4 text-lg font-light text-black">
            {t("missingContext")}
          </p>
        </div>
      </div>
    </section>
  )
}
