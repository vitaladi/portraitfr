"use client"

import { motion } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import { preloadImages } from '../lib/utils'
import { useEffect, useState } from "react"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [imagePositions, setImagePositions] = useState<Array<{top: string, left: string, rotate: number, imgIndex: number}>>([])

  useEffect(() => {
    // Générer des positions aléatoires pour 12 images (mais avec seulement 8 images différentes en boucle)
    const positions = Array.from({length: 20}).map((_, i) => {
      // Définir la zone sûre (éviter le centre)
      let top, left
      const avoidCenter = Math.random() > 0.5 // 50% de chance d'être en haut/bas ou gauche/droite
      
      if (avoidCenter) {
        top = `${Math.random() * 40 + 10}%` // 10-50% du haut
        left = `${Math.random() * 100}%` // 0-100% de largeur
      } else {
        top = `${Math.random() * 100}%` // 0-100% de hauteur
        left = `${Math.random() * 40 + 10}%` // 10-50% de gauche
      }
      
      // S'assurer qu'aucune image n'est trop proche du centre (30-70%)
      if (parseFloat(top) > 30 && parseFloat(top) < 70) {
        top = Math.random() > 0.5 ? `${Math.random() * 30}%` : `${Math.random() * 30 + 70}%`
      }
      if (parseFloat(left) > 30 && parseFloat(left) < 70) {
        left = Math.random() > 0.5 ? `${Math.random() * 30}%` : `${Math.random() * 30 + 70}%`
      }
      
      return {
        top,
        left,
        rotate: Math.random() * 40 - 20, // rotation aléatoire entre -20 et 20 degrés
        imgIndex: (i % 20) + 1 // Boucle sur les images 1 à 8
      }
    })
    
    setImagePositions(positions)
    
    // Précharger seulement les 8 images nécessaires
    const imageSelectors = Array.from({length: 20}, (_, i) => `img[src*="img${i+1}.webp"]`).join(', ')
    preloadImages(imageSelectors).then(() => {
      setIsLoading(false)
    })
  }, [])

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Arrière-plan avec dégradé orange */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F9D423] to-[#FF4E50]">
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
      </div>

      {/* 12 instances des 8 images positionnées aléatoirement */}
      <div className="absolute inset-0 overflow-hidden">
        {imagePositions.map((pos, i) => (
          <motion.div
            key={`img-${pos.imgIndex}-${i}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
            className="absolute"
            style={{
              top: pos.top,
              left: pos.left,
              rotate: `${pos.rotate}deg`,
              width: 'clamp(80px, 10vw, 150px)',
              height: 'clamp(120px, 15vw, 225px)'
            }}
          >
            <div className="w-full h-full relative rounded-sm overflow-hidden shadow-lg">
              <Image 
                src={`/siteimages/img${pos.imgIndex}.webp`}
                alt={`Portrait ${pos.imgIndex}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80px, 10vw"
                priority={i < 4} // Priorité aux premières images
              />
            </div>
          </motion.div>
        ))}
      </div>
      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 md:mb-8"
          >
            <span className="text-sm text-white/60 tracking-wide">
              Cérémonie organisée par PortraitFr
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight font-gloock">
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'gradientMove 3s ease infinite'
                }}
              >
                PORTRAITFR AWARDS
              </span>
              <br />
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white/90 to-blue-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  backgroundSize: '200% 100%',
                  animation: 'gradientMove 3s ease infinite'
                }}
              >
                2025
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 md:mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Les PortraitFr Awards célèbrent les talents de la photographie. 
              Pour cette première édition, six prix seront remis à des artistes d'exception.
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            <Link href="/participer">
              <button className="bg-orange-500 text-white text-sm sm:text-base md:text-lg px-4 py-1 md:px-6 md:py-2 rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg">
                Participer aux Awards
              </button>
            </Link>
            <Link href="/billet">
              <button className="border-2 border-orange-500 text-white text-sm sm:text-base md:text-lg px-4 py-1 md:px-6 md:py-2 rounded-full hover:bg-orange-500/20 transition-all duration-300">
                Billetterie
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

      {/* Styles globaux pour l'animation */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}