/* src/app/page.tsx */
"use client"

import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan fixe */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url(/background.png)",
          opacity: 0.7 
        }}
      />
      
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenu principal */}
      <main className="relative z-10 min-h-screen text-white px-6 py-12">
        {/* Titre en haut à gauche */}
        <div className="mb-16">
          <h1 className="text-[84px] font-bold leading-tight">
            PORTRAITFR AWARDS <span className="text-orange">2025</span>
          </h1>
          <p className="text-[20px] text-white">
            Cérémonie organisée par PortraitFr
          </p>
        </div>

        {/* Texte descriptif */}
        <div className="max-w-3xl space-y-8">
          <p className="text-2xl leading-relaxed">
            6 Trophées seront remis lors de la première édition de la Cérémonie Portrait Fr Awards. 
            Les gagnant.e.s de la majorité d'entres elles sont élu.e.s par un vote qui mêle les 
            membres de PortraitFr, d'un jury de professionnel et du grand public.
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-wrap gap-4 pt-8">
            <Link href="/participer">
              <button className="bg-orange text-white text-lg px-8 py-3 rounded-full hover:bg-orange/80 transition-all duration-300 shadow-lg">
                Participer aux Awards
              </button>
            </Link>
            <Link href="/billet">
              <button className="border-2 border-orange text-white text-lg px-8 py-3 rounded-full hover:bg-orange/20 transition-all duration-300">
                Billetterie
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}