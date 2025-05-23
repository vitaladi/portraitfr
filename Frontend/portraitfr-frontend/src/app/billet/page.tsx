"use client"
import { motion } from "framer-motion"
import { FloatingImagesContainer, FloatingImage } from "@/components/FloatingImages/FloatingImages"
import { GradientOverlay } from "@/components/GradientOverlay/GradientOverlay"
import { Instagram } from "lucide-react"

const BILETTERIE_IMAGES = Array.from({ length: 10 }, (_, i) => ({
  url: `/siteimages/img${i + 1}.webp`,
  size: ['small', 'medium'][Math.floor(Math.random() * 2)] as 'small' | 'medium',
  depth: [0.5, 1][Math.floor(Math.random() * 2)],
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`
}))

export default function BilletPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animation des images flottantes */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-0">
        <FloatingImagesContainer sensitivity={-0.6} className="overflow-hidden">
          {BILETTERIE_IMAGES.map((img, index) => (
            <FloatingImage
              key={index}
              src={img.url}
              size={img.size}
              depth={img.depth}
              top={img.top}
              left={img.left}
              className="opacity-50 hover:opacity-80"
            />
          ))}
        </FloatingImagesContainer>
      </div>

      {/* Overlay de dégradé */}
      <GradientOverlay 
        fromColor="from-orange-500/30" 
        toColor="to-black/80"
        direction="bg-gradient-to-bl"
      />

      {/* Contenu principal */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/80 backdrop-blur-sm border border-orange-500/30 text-white max-w-2xl w-full p-8 rounded-3xl shadow-xl text-center"
          style={{ boxShadow: "0 0 30px rgba(220, 120, 53, 0.3)" }}
        >
          <h2 className="text-4xl font-bold text-orange-500 mb-6">Billetterie</h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-xl text-[#EAE2B7]">
              La billetterie pour les PortraitFr Awards 2025 sera disponible prochainement.
            </p>
            
            <p className="text-lg text-orange-500 font-medium">
              Restez connecté·e·s sur nos réseaux sociaux pour ne pas manquer l'ouverture !
            </p>
            
            <div className="flex justify-center pt-4">
              <a
                href="https://www.instagram.com/portrait.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 text-[#EAE2B7] py-3 px-6 rounded-full font-medium hover:bg-orange-600 transition flex items-center"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Nous suivre sur Instagram
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}