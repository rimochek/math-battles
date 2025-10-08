import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

export default function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="bg-white dark:bg-black mt-auto">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://mathbattles.org" className="flex items-center">
              <Image
                alt="our logo"
                width="64"
                height="64"
                className=""
                src="/images/logo128.png"
                priority={true}
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-2">
                Math Battles Community
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("resources")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/problems" className="hover:underline">
                    {t("materials")}
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="https://docs.google.com/file/d/1eFbF1bPgfzFCjJ0pf3ikvh6BYluwSojt/edit"
                    className="hover:underline"
                  >
                    {t("rules")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("socials")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    href="https://www.instagram.com/maths.battles/"
                    className="hover:underline "
                  >
                    Instagram
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="https://t.me/almatymathbattle"
                    className="hover:underline "
                  >
                    Telegram
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("about")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/gallery" className="hover:underline">
                    {t("gallery")}
                  </Link>
                </li>
                <li>
                  <Link href="/our-team" className="hover:underline">
                    {t("ourTeam")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
