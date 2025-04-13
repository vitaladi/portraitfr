'use client'
import { motion } from 'framer-motion'
import { Youtube, Instagram } from 'lucide-react'
import Image from 'next/image'

export default function FocusPage() {
  const guests = [
    {
      name: "DreamZ Production",
      role: "Studio de production",
      bio: "Dreamz Production est un studio basé à Paris, cofondé par deux passionnés d’image. Spécialisé dans la photo et la vidéo, Dreamz accueille régulièrement pour leurs shootings, tout en réalisant ses propres projets artistiques et commerciaux. Avec une vision moderne et accessible.",
      image: "/autresphotos/logo_dreamZ.png",
      instagram: "https://www.instagram.com/dreamzproduction.fr/"
    },
    {
      name: "Ornella Frosi",
      role: "Maquilleuse professionnelle (MUA)",
      bio: "Ornella est une maquilleuse professionnelle reconnue pour son style à la fois artistique et maîtrisé. Passionnée par la mise en valeur des visages et l’expression à travers le maquillage, elle collabore avec des photographes, modèles et créateurs à travers la France. Elle incarne une vision inclusive et élégante de la beauté dans l’univers visuel.",
      image: "/autresphotos/ornella_frosy.jpg",
      instagram: "https://www.instagram.com/ornellafrosi/"
    }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan flou avec img20 */}
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

      {/* Section Titre */}
      <section className="py-12 text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-orange mb-4"
        >
          Focus
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Plongez dans notre Podcast vidéo sur les sujets de la photo avec nos invités
        </motion.p>
      </section>

      {/* Section Vidéo pleine largeur */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/6uZ15nN_lzU?si=ICaDs151r9a4-dE8&amp;controls=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-center text-gray-400 mt-2">
            Épisode #1 - Rencontre avec DreamZ Production et Ornella Frosi MUA sur Paris
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
          className="text-2xl font-bold text-orange mb-8 text-center"
        >
          Nos invités
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guests.map((guest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-black/50 p-6 rounded-xl border border-gray-800 flex flex-col items-center text-center"
            >
              <div className="mb-4">
                <Image
                  src={guest.image}
                  alt={guest.name}
                  width={200}
                  height={200}
                  className="rounded-full object-cover aspect-square border-2 border-orange"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{guest.name}</h3>
              <p className="text-orange text-sm mb-4">{guest.role}</p>
              <p className="text-gray-300 mb-4">{guest.bio}</p>
              <a
                href={guest.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:text-orange-300 flex items-center"
              >
                <Instagram className="w-5 h-5 mr-1" />
                Voir le profil Instagram
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Concept */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-black/50 p-8 rounded-xl border border-orange/20"
        >
          <h2 className="text-2xl font-bold text-orange mb-6">Le concept FOCUS</h2>
          <div className="space-y-4 text-gray-300">
            <p>
            Focus est le podcast vidéo initié par PortraitFr en janvier 2025. Pensé comme un espace d’échange, il réunit des invités issus de l’univers de la photographie 
            </p>
            <p>
            (photographes, modèles, MUA, stylistes, studios…) pour discuter de leur parcours, partager des conseils et croiser les regards entre disciplines. 
            </p>
            <p>
            À travers une ambiance chaleureuse et sans filtres, Focus met en lumière les coulisses de la création visuelle et crée du lien entre les passionnés du portrait.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Boutons d'action */}
      <section className="py-12 text-center relative z-10">
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
            className="bg-orange text-white px-8 py-3 rounded-full font-medium hover:bg-orange-600 transition flex items-center"
          >
            <Youtube className="w-5 h-5 mr-2" />
            ABONNEZ-VOUS
          </a>
          <a
            href="https://www.instagram.com/portrait.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border border-orange text-orange px-8 py-3 rounded-full font-medium hover:bg-orange/10 transition flex items-center"
          >
            <Instagram className="w-5 h-5 mr-2" />
            ÊTRE INVITÉ
          </a>
        </motion.div>
      </section>
    </div>
  )
}