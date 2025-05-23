'use client'
import { motion } from 'framer-motion'
import { Mail, Instagram, Users } from 'lucide-react'
import { FloatingImagesContainer, FloatingImage } from '@/components/FloatingImages/FloatingImages'
import { GradientOverlay } from '@/components/GradientOverlay/GradientOverlay'

const CONTACT_IMAGES = Array.from({ length: 10 }, (_, i) => ({
  url: `/siteimages/img${i + 1}.webp`,
  size: ['small', 'medium'][Math.floor(Math.random() * 2)] as 'small' | 'medium',
  depth: [0.5, 1][Math.floor(Math.random() * 2)],
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`
}))

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animation des images flottantes */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-0">
        <FloatingImagesContainer sensitivity={-0.6} className="overflow-hidden">
          {CONTACT_IMAGES.map((img, index) => (
            <FloatingImage
              key={index}
              src={img.url}
              size={img.size}
              depth={img.depth}
              top={img.top}
              left={img.left}
              className="opacity-50 hover:opacity-90"
            />
          ))}
        </FloatingImagesContainer>
      </div>

      {/* Overlay de dégradé */}
      <GradientOverlay 
        fromColor="from-orange-500/30" 
        toColor="to-black/80"
        direction="bg-gradient-to-tr"
      />

      <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-orange-500 mb-4">Contactez-nous</h1>
          <p className="text-xl text-[#EAE2B7] max-w-2xl mx-auto">
            Vous avez des questions ou souhaitez rejoindre notre association ? Nous sommes à votre écoute.
          </p>
        </motion.div>

        {/* Bouton d'adhésion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <a
            href="https://www.helloasso.com/associations/portrait-fr/adhesions/formulaire-d-adhesion-a-portraitfr-2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-orange-500 via-amber-300 to-orange-500 text-white text-lg font-bold py-4 px-8 rounded-full hover:bg-orange-600 transition-all shadow-lg relative overflow-hidden group"
            style={{
              backgroundSize: '200% 100%',
              animation: 'gradientMove 3s ease infinite',
            }}
          >
            <div className="flex items-center justify-center">
              <Users className="w-5 h-5 mr-2" />
              <span className="relative z-10">Rejoindre notre association</span>
            </div>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Option Instagram */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-black/70 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-8 hover:border-orange-500/50 transition-all"
          >
            <div className="flex flex-col items-center text-center h-full">
              <a 
                href="https://www.instagram.com/portrait.fr/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500/10 p-4 rounded-full mb-6 hover:bg-orange-500/20 transition-all"
              >
                <Instagram className="w-8 h-8 text-orange-500" />
              </a>
              <h2 className="text-2xl font-bold mb-4 text-orange-500">Via Instagram</h2>
              <p className="text-[#EAE2B7] mb-6 flex-grow">
                Suivez-nous et envoyez-nous un message direct sur notre page Instagram.
              </p>
              <a
                href="https://www.instagram.com/portrait.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-300 text-xl break-all font-medium"
              >
                @portrait.fr
              </a>
            </div>
          </motion.div>

          {/* Section Email */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-black/70 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-8 hover:border-orange-500/50 transition-all"
          >
            <div className="flex flex-col items-center text-center h-full">
              <a 
                href="mailto:contact@portraitfr.fr"
                className="bg-orange-500/10 p-4 rounded-full mb-6 hover:bg-orange-500/20 transition-all"
              >
                <Mail className="w-8 h-8 text-orange-500" />
              </a>
              <h2 className="text-2xl font-bold mb-4 text-orange-500">Par Email</h2>
              <p className="text-[#EAE2B7] mb-6 flex-grow">
                Contactez-nous directement par email à l'adresse :
              </p>
              <a
                href="mailto:contact@portraitfr.fr"
                className="text-orange-500 hover:text-orange-300 text-xl break-all font-medium"
              >
                contact@portraitfr.fr
              </a>
            </div>
          </motion.div>
        </div>

        {/* Styles globaux pour l'animation */}
        <style jsx global>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </div>
  )
}