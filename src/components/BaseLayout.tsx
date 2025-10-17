import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { ReactNode } from "react"
import Navigation from "@/components/Navigation"
import Footer from "./Footer"
import Script from "next/script"

type Props = {
  children: ReactNode
  locale: string
}

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages()

  return (
    <html className="h-full" lang={locale}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZS8CNS2LJZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZS8CNS2LJZ');
          `}
        </Script>
      </head>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <div id="transition">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}