/* src/app/page.tsx */
"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadedImages, setLoadedImages] = useState<number>(0)
  const totalImages = 24 // Nombre total d'images à charger

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleImageLoad = () => {
    setLoadedImages(prev => prev + 1)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan orange avec vignettage et grain */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-orange-700 to-orange-600">
        {/* Effet de vignettage */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.7)]" />
        
        {/* Texture de grain artistique */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/siteimages/grain.png')] mix-blend-overlay" />
        </div>
      </div>

      {/* Conteneur pour l'animation des images */}
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-hidden opacity-80"
      >
        {Array.from({ length: totalImages }).map((_, index) => (
          <Image
            key={index}
            src={`/siteimages/img${index + 1}.webp`}
            alt={`Portrait ${index + 1}`}
            fill
            className="object-cover absolute opacity-0 transition-opacity duration-1000"
            style={{
              objectPosition: `${(index % 5) * 25}% ${Math.floor(index / 5) * 25}%`
            }}
            onLoadingComplete={handleImageLoad}
            priority={index < 5} // Priorise le chargement des premières images
          />
        ))}
      </div>

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenu principal centré */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-12 text-white">
        {/* Titre centré avec animation */}
        <div className="mb-8 md:mb-12 transform transition-all duration-700 ease-out opacity-0 translate-y-10 animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl md:text-[84px] font-bold leading-tight">
            PORTRAITFR AWARDS <span className="text-orange">2025</span>
          </h1>
          <p className="text-lg md:text-[20px] mt-2">
            Cérémonie organisée par PortraitFr
          </p>
        </div>

        {/* Texte descriptif centré avec animation */}
        <div className="max-w-3xl mx-auto transform transition-all duration-700 ease-out opacity-0 translate-y-10 animate-fade-in-up animation-delay-200">
          <p className="text-xl md:text-2xl leading-relaxed mb-8">
            Les PortraitFr Awards célèbrent les talents de la photographie. 
            Pour cette première édition, six prix seront remis à des artistes d'exception, élu·e·s par les membres de l'association, un jury de professionnel·le·s et le grand public.
          </p>

          {/* Boutons d'action centrés avec animation */}
          <div className="flex flex-wrap justify-center gap-4 transform transition-all duration-700 ease-out opacity-0 translate-y-10 animate-fade-in-up animation-delay-400">
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