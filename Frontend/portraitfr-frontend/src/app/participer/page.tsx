"use client"

import NotionForm from "@/components/NotionForm"
import ParticipantCount from "@/components/ParticipantCount"
import { motion } from "framer-motion"
import Head from "next/head"
import { ParticipantCountProvider } from "@/context/ParticipantCountContext"
import { useEffect, useState } from "react"
import { FloatingImagesContainer, FloatingImage } from "@/components/FloatingImages/FloatingImages"
import { GradientOverlay } from "@/components/GradientOverlay/GradientOverlay"

// Configuration des images pour cette page
const PARTICIPANT_IMAGES = Array.from({ length: 15 }, (_, i) => ({
  url: `/siteimages/img${i + 1}.webp`,
  size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large',
  depth: [0.5, 1, 1.5][Math.floor(Math.random() * 3)],
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`
}))

export default function ParticipantPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <Head>
        <title>Participer aux PortraitFr Awards 2025</title>
        <meta name="description" content="Formulaire de participation aux PortraitFr Awards 2025" />
      </Head>
      
      <ParticipantCountProvider>
        <div className="relative min-h-screen overflow-hidden">
          {/* Animation des images flottantes */}
          <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-0">
            <FloatingImagesContainer sensitivity={-0.8} className="overflow-hidden">
              {PARTICIPANT_IMAGES.map((img, index) => (
                <FloatingImage
                  key={index}
                  src={img.url}
                  size={img.size}
                  depth={img.depth}
                  top={img.top}
                  left={img.left}
                  className="opacity-70 hover:opacity-100"
                />
              ))}
            </FloatingImagesContainer>
          </div>

          {/* Overlay de dégradé personnalisé */}
          <GradientOverlay 
            fromColor="from-orange-500/20" 
            toColor="to-black/80"
            direction="bg-gradient-to-br"
          />

          {/* Contenu principal */}
          <div className="relative min-h-screen flex items-center justify-center px-4 py-12 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`bg-black/80 backdrop-blur-sm border border-orange-500/30 text-white max-w-xl w-full p-6 md:p-8 rounded-3xl shadow-xl ${
                isMobile ? 'overflow-y-auto max-h-[90vh]' : ''
              }`}
              style={{ boxShadow: "0 0 30px rgba(220, 120, 53, 0.3)" }}
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-orange-500 text-center mb-4 md:mb-6"
              >
                Formulaire de participation
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#EAE2B7] text-center mb-4 md:mb-6"
              >
                Remplissez ce formulaire pour participer aux PortraitFr Awards 2025
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[#EAE2B7] text-center mb-4 md:mb-6"
              >
                Les inscriptions sont ouvertes jusqu'au 31 août 2025
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <NotionForm />
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-orange-400 text-center mt-4 md:mt-6 text-sm md:text-base"
              >
                Une seule participation possible par artiste
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <ParticipantCount />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </ParticipantCountProvider>
    </>
  )
}