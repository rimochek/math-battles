import Gallery from "@/components/Gallery"
import fs from "fs/promises"
import { getTranslations } from "next-intl/server"

export default async function GalleryPage() {
  const file = await fs.readFile(process.cwd() + "public/gallery.json", "utf8")
  const data = JSON.parse(file)
  const t = await getTranslations("gallery")

  return (
    <div className="mx-auto max-w-7xl p-6 py-12 lg:px-8">
      <div className="lg:flex">
        <div className="mb-6 lg:mr-10 lg:w-52">
          <p className="text-2xl font-bold">{t("gallery")}</p>
          <p className="text-base">{t("selection")}</p>
        </div>
        <Gallery gallery={data} />
      </div>
    </div>
  )
}
