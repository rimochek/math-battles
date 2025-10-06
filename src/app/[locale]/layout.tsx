/* eslint-disable */
import { NextIntlClientProvider } from "next-intl"; 
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ReactNode } from "react"
import BaseLayout from "@/components/BaseLayout"
import { routing } from "@/i18n/routing"
import { Montserrat } from "next/font/google"
const montserrat = Montserrat({ subsets: ["latin"] })

type Props = {
  children: ReactNode
  params:{ locale: string }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "LocaleLayout" })

  return {
    title: t("title"),
  }
}

const MESSAGES_TO_LOAD = [
  'locale',
  'team',
  'apply'      
];

// Функция для динамической загрузки и ОБЪЕДИНЕНИЯ файлов перевода
async function getMessages(locale: string) {
  const messages: Record<string, any> = {};

  for (const namespace of MESSAGES_TO_LOAD) {
      try {
          const module = await import(`@/messages/${locale}/${namespace}.json`);
          messages[namespace] = module.default;
      } catch (error) {
          console.error(`Missing translation file for locale ${locale} and namespace ${namespace}`, error);
          notFound();
      }
  }
  
  return messages;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  const messages = await getMessages(locale);

  //Enable static rendering
  setRequestLocale(locale)

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
        <BaseLayout locale={locale}>
            <main className={montserrat.className}>{children}</main>
        </BaseLayout>
    </NextIntlClientProvider>
  )
}
