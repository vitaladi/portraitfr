// app/infos/partenaires/page.tsx
'use client'
import { motion } from 'framer-motion'

export default function PartenairesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan flou (modifie ici l’image si besoin) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/imagePortraitFr/img5.webp)',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-orange mb-6"
        >
          Nos Partenaires
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-gray-300 max-w-xl"
        >
          Découvrez nos partenaires, sponsors, ambassadeurs qui soutiennent l'événement PortraitFr Awards 2025.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-orange text-xl"
        >
          Bientôt disponible.
        </motion.p>
      </div>
    </div>
  )
}
