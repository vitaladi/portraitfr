'use client'
import { motion } from 'framer-motion'
import { Youtube, Instagram } from 'lucide-react'
import Image from 'next/image'
import Head from 'next/head'
import { FloatingImagesContainer, FloatingImage } from '@/components/FloatingImages/FloatingImages'
import { GradientOverlay } from '@/components/GradientOverlay/GradientOverlay'

// Configuration des images pour cette page
const FOCUS_IMAGES = Array.from({ length: 14 }, (_, i) => ({
  url: `/siteimages/img${i + 1}.webp`,
  size: ['small', 'medium'][Math.floor(Math.random() * 2)] as 'small' | 'medium',
  depth: [0.5, 1][Math.floor(Math.random() * 2)],
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`
}))

export default function FocusPage() {
  const guests = [
    {
      name: "DreamZ Production",
      role: "Studio de production",
      bio: "Dreamz Production est un studio basé à Paris, cofondé par deux passionnés d'image. Spécialisé dans la photo et la vidéo, Dreamz accueille régulièrement pour leurs shootings, tout en réalisant ses propres projets artistiques et commerciaux. Avec une vision moderne et accessible.",
      image: "/autresphotos/dreamz.jpg",
      instagram: "https://www.instagram.com/dreamzproduction.fr/"
    },
    {
      name: "Ornella Frosi",
      role: "Maquilleuse professionnelle",
      bio: "Ornella est une maquilleuse professionnelle reconnue pour son style à la fois artistique et maîtrisé. Passionnée par la mise en valeur des visages et l'expression à travers le maquillage, elle collabore avec des photographes, modèles et créateurs à travers la France. Elle incarne une vision inclusive et élégante de la beauté dans l'univers visuel.",
      image: "/autresphotos/ornella_frosy.jpg",
      instagram: "https://www.instagram.com/ornellafrosi/"
    }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Head>
        <title>Podcast Focus | PortraitFr Awards 2025</title>
        <meta name="description" content="Découvrez notre podcast vidéo sur l'univers de la photographie avec des invités exceptionnels" />
      </Head>

      {/* Animation des images flottantes */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-0">
        <FloatingImagesContainer sensitivity={-0.7} className="overflow-hidden">
          {FOCUS_IMAGES.map((img, index) => (
            <FloatingImage
              key={index}
              src={img.url}
              size={img.size}
              depth={img.depth}
              top={img.top}
              left={img.left}
              className="opacity-60 hover:opacity-90"
            />
          ))}
        </FloatingImagesContainer>
      </div>

      {/* Overlay de dégradé personnalisé */}
      <GradientOverlay 
        fromColor="from-orange-500/20" 
        toColor="to-black/80"
        direction="bg-gradient-to-t"
      />

      {/* Section Titre */}
      <section className="py-16 text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-orange-500 mb-4"
        >
          Podcast Focus
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl text-[#EAE2B7] max-w-2xl mx-auto"
        >
          Plongez dans notre podcast vidéo sur l'univers de la photographie avec nos invités.
        </motion.p>
      </section>

      {/* Description du concept */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#EAE2B7] text-center mb-8 bg-black/50 p-6 rounded-xl border border-orange-500/30"
        >
          <p className="mb-4">
            Focus est le podcast vidéo initié par PortraitFr. Pensé comme un espace d'échange, il réunit des invités issus de l'univers de la photographie (photographes, modèles, maquilleurs, stylistes, studios) pour discuter de leur parcours, partager des conseils et croiser les regards entre disciplines.
          </p>
          <p>
            À travers une ambiance chaleureuse et sans filtres, Focus met en lumière les coulisses de la création visuelle et crée du lien entre les passionnés du portrait.
          </p>
        </motion.div>
      </section>

      {/* Section Vidéo */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black border border-orange-500/30">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/6uZ15nN_lzU?si=ICaDs151r9a4-dE8&amp;start=15"
              title="Podcast Focus - Épisode 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-center text-[#EAE2B7] mt-4">
            Épisode 1 - Rencontre avec DreamZ Production et Ornella Frosi à Paris
          </p>
        </motion.div>
      </section>

      {/* Section Invités */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-orange-500 mb-8 text-center"
        >
          Nos invité·e·s
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guests.map((guest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-black/70 p-6 rounded-xl border border-orange-500/30 flex flex-col items-center text-center backdrop-blur-sm"
            >
              <div className="mb-4">
                <Image
                  src={guest.image}
                  alt={guest.name}
                  width={200}
                  height={200}
                  className="rounded-full object-cover aspect-square border-2 border-orange-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-orange-500">{guest.name}</h3>
              <p className="text-[#EAE2B7] text-sm mb-4">{guest.role}</p>
              <p className="text-[#EAE2B7] mb-4">{guest.bio}</p>
              <a
                href={guest.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-300 flex items-center"
              >
                <Instagram className="w-5 h-5 mr-1" />
                Voir le profil Instagram
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Boutons d'action */}
      <section className="py-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href="https://www.youtube.com/@PortraitFr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-[#EAE2B7] px-8 py-3 rounded-full font-medium hover:bg-orange-600 transition flex items-center"
          >
            <Youtube className="w-5 h-5 mr-2" />
            S'abonner à la chaîne
          </a>
          <a
            href="https://www.instagram.com/portrait.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border border-orange-500 text-orange-500 px-8 py-3 rounded-full font-medium hover:bg-orange-500/10 transition flex items-center"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Proposer un·e invité·e
          </a>
        </motion.div>
      </section>
    </div>
  )
}