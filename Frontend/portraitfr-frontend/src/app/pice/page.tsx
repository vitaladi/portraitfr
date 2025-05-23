'use client'
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FloatingImagesContainer, FloatingImage } from "@/components/FloatingImages/FloatingImages"
import { GradientOverlay } from "@/components/GradientOverlay/GradientOverlay"

const PARTICIPANTS_IMAGES = Array.from({ length: 12 }, (_, i) => ({
  url: `/siteimages/img${i + 1}.webp`,
  size: ['small', 'medium'][Math.floor(Math.random() * 2)] as 'small' | 'medium',
  depth: [0.5, 1][Math.floor(Math.random() * 2)],
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`
}))

interface Participant {
  nom: string
  email: string
  instagram: string
  ville: string
  categorie: string
}

export default function Participants2() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/participant2")
      .then((res) => res.json())
      .then((data) => {
        setParticipants(data.participants)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des participants:", err)
        setLoading(false)
      })
  }, [])

  const filtered = participants.filter((p) =>
    [p.nom, p.email, p.instagram, p.ville, p.categorie]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animation des images flottantes */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-0">
        <FloatingImagesContainer sensitivity={-0.5} className="overflow-hidden">
          {PARTICIPANTS_IMAGES.map((img, index) => (
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
        fromColor="from-orange-500/20" 
        toColor="to-black/80"
        direction="bg-gradient-to-b"
      />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black/70 backdrop-blur-sm border border-orange-500/30 rounded-xl p-6 md:p-8 mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 text-center">
            Liste des participants
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 text-center"
          >
            <input
              type="text"
              placeholder="Rechercher par nom, email, ville..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded bg-black/50 border border-orange-500/30 text-[#EAE2B7] w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </motion.div>

          {loading ? (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-[#EAE2B7]"
            >
              Chargement en cours...
            </motion.p>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center text-[#EAE2B7] mb-6"
              >
                Nombre total de participants : <span className="text-orange-500 font-semibold">{filtered.length}</span>
              </motion.p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((p, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-black/50 backdrop-blur-sm border border-orange-500/30 rounded-lg p-4 hover:border-orange-500/50 transition-colors"
                  >
                    <div className="space-y-2">
                      <p className="text-orange-500 font-semibold">{p.nom}</p>
                      <p><span className="text-[#EAE2B7]">Email :</span> {p.email}</p>
                      <p><span className="text-[#EAE2B7]">Instagram :</span> {p.instagram}</p>
                      <p><span className="text-[#EAE2B7]">Ville :</span> {p.ville}</p>
                      <p><span className="text-[#EAE2B7]">Catégorie :</span> {p.categorie}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}