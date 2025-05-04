import "./globals.css"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Script from "next/script"
import { GA_TRACKING_ID } from "@/lib/gtag"

export const metadata: Metadata = {
  title: "PortraitFr",
  description: "Participe aux PortraitFr Awards",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Google Analytics - uniquement si ID présent */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-black text-white">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}
