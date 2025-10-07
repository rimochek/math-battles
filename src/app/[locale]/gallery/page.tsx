import Gallery from "@/components/Gallery"
import { getTranslations } from "next-intl/server"
import fs from 'fs'
import path from 'path'

export default async function GalleryPage() {
  
  const galleryPath = path.join(process.cwd(), 'public', 'gallery.json')
  const galleryContent = fs.readFileSync(galleryPath, 'utf8')
  const data = JSON.parse(galleryContent)
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
