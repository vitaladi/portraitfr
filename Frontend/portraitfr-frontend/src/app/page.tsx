/* src/app/page.tsx */
"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Vérifie au chargement
    checkMobile()
    
    // Écoute les changements de taille
    window.addEventListener('resize', checkMobile)
    
    // Nettoyage
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan conditionnel */}
      <div className="absolute inset-0 opacity-80">
        <Image
          src={isMobile ? "/backgroundmobile.webp" : "/background.webp"}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenu principal centré */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-12 text-white">
        {/* Titre centré */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-[84px] font-bold leading-tight">
            PORTRAITFR AWARDS <span className="text-orange">2025</span>
          </h1>
          <p className="text-lg md:text-[20px] mt-2">
            Cérémonie organisée par PortraitFr
          </p>
        </div>

        {/* Texte descriptif centré */}
        <div className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl leading-relaxed mb-8">
            6 trophées seront remis lors de la première édition de la cérémonie PortraitFr Awards. 
            Les gagnant·e·s de la majorité d'entre eux/elles sont élu·e·s par un vote mêlant les 
            membres de PortraitFr, un jury de professionnels et le grand public.
          </p>

          {/* Boutons d'action centrés */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/participer">
              <button className="bg-orange text-white text-lg px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-orange/80 transition-all duration-300 shadow-lg">
                Participer aux Awards
              </button>
            </Link>
            <Link href="/billet">
              <button className="border-2 border-orange text-white text-lg px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-orange/20 transition-all duration-300">
                Billetterie
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}