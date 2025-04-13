import "./globals.css"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "PortraitFr",
  description: "Plateforme créative pour les artistes photo",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-black text-white">
        <Navbar />
        <main className="pt-20">{children}</main> {/* Décalé pour ne pas passer sous la navbar */}
      </body>
    </html>
  )
}
