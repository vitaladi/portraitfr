'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function AwardsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan flou */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/imagePortraitFr/img20.jpg)',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Contenu principal */}
      <div className="relative max-w-4xl mx-auto px-4 py-20 z-10 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-orange mb-10"
        >
          PortraitFr Awards 2025
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 text-lg text-gray-200"
        >
          <p>
            Le <span className="font-semibold text-orange">PortraitFr Awards 2025</span> est la cérémonie dédiée aux talents de la photographie en France. Cet événement met en lumière les artistes et récompense leur travail.
          </p>

          <p>📅 <span className="text-orange">Date</span> : Fin d’année 2025</p>
          <p>📍 <span className="text-orange">Lieu</span> : Paris (Adresse à venir)</p>

          <p className="font-bold text-orange">🏆 Les catégories récompensées</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Photographe de l’année</strong> – Celui ou celle qui a su capturer l’essence de l’émotion à travers ses œuvres.</li>
            <li><strong>Modèle de l’année</strong> – Celui ou celle qui a marqué l’année par sa présence, son charisme et son engagement artistique.</li>
            <li><strong>Make-up Artist (MUA) de l’année</strong> – L’artiste qui sublime les images par son talent en maquillage et en mise en beauté.</li>
            <li><strong>Projet de l’année</strong> – La réalisation photographique collective ou individuelle la plus marquante.</li>
          </ul>

          <p className="font-bold text-orange">📝 Comment participer ?</p>
          <p>
            Candidatures ouvertes du <strong>01 Juin au 31 août 2025</strong>. <br />
            Inscription via le <Link href="/participer" className="underline text-orange">formulaire en ligne</Link>.
          </p>

          <p>📲 Sélection des nominés et vote du public sur Instagram.</p>

          <p className="font-bold text-orange">👥 Sélection des nominés et gagnants</p>
          <p>
            Sélection des 10 nominés par catégorie par l’équipe PortraitFr, puis des 5 nominés finalistes par un jury professionnel. <br />
            Le public vote ensuite pour élire les gagnants de chaque catégorie.
          </p>

          <p className="font-bold text-orange">🎟️ Accès et Contact</p>
          <p>
            🎫 Événement sur billetterie. <br />
            📩 Contactez-nous via notre <Link href="/contact" className="underline text-orange">formulaire</Link> ou à l’adresse mail <span className="underline">contact@portraitfr.fr</span>.
          </p>

          <p className="italic text-gray-400">📢 Plus de détails bientôt !</p>
        </motion.div>
      </div>
    </div>
  )
}