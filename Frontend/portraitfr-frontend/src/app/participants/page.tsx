/* eslint-disable react/no-unescaped-entities */
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type Participant = {
  id: number
  nom: string
  instagram: string
  ville: string
  categorie: string
  photoUrl: string
}

const ITEMS_PER_PAGE = 9

export default function ParticipantsPage() {
  const [allParticipants, setAllParticipants] = useState<Participant[]>([])
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<{url: string, name: string} | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    categorie: '',
    ville: '',
    search: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('http://localhost:5010/api/participants')
        const data = await res.json()
        setAllParticipants(data)
        setFilteredParticipants(data)
      } catch (error) {
        console.error('Erreur chargement participants', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Appliquer les filtres
  useEffect(() => {
    let result = [...allParticipants]
    
    if (filters.categorie) {
      result = result.filter(p => p.categorie === filters.categorie)
    }
    
    if (filters.ville) {
      result = result.filter(p => p.ville.toLowerCase().includes(filters.ville.toLowerCase()))
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter(p => 
        p.nom.toLowerCase().includes(searchTerm) || 
        p.instagram.toLowerCase().includes(searchTerm))
    }

    setFilteredParticipants(result)
    setCurrentPage(1)
  }, [filters, allParticipants])

  // Télécharger une photo
  const downloadPhoto = async (photoUrl: string, participantName: string) => {
    try {
      const response = await fetch(`http://localhost:5010${photoUrl}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      // Créer un nom de fichier propre
      const cleanName = participantName.replace(/\s+/g, '_').toLowerCase()
      const extension = photoUrl.split('.').pop() || 'jpg'
      const fileName = `portraitfr_${cleanName}.${extension}`
      
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
    }
  }

  // Ouvrir le profil Instagram
  const openInstagramProfile = (instagramHandle: string) => {
    // Supprimer le @ s'il est présent
    const cleanHandle = instagramHandle.replace('@', '')
    window.open(`https://www.instagram.com/${cleanHandle}`, '_blank')
  }

  // Données paginées
  const totalPages = Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE)
  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Options uniques pour les filtres
  const categories = [...new Set(allParticipants.map(p => p.categorie))]
  const villes = [...new Set(allParticipants.map(p => p.ville))].sort()

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan flou */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/imagePortraitFr/img3.jpg)',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
        }}
      />
      
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Contenu principal */}
      <div className="relative min-h-screen px-4 py-12">
        <div className="max-w-6xl mx-auto bg-black/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl">
          <motion.h1 
            className="text-3xl md:text-4xl text-orange font-bold text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Participants
          </motion.h1>

          {/* Barre de filtres */}
          <motion.div 
            className="mb-8 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filtre par catégorie */}
              <div>
                <label htmlFor="categorie" className="block text-sm font-medium text-gray-300 mb-1">
                  Catégorie
                </label>
                <select
                  id="categorie"
                  value={filters.categorie}
                  onChange={(e) => setFilters({...filters, categorie: e.target.value})}
                  className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                >
                  <option value="">Toutes catégories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Filtre par ville */}
              <div>
                <label htmlFor="ville" className="block text-sm font-medium text-gray-300 mb-1">
                  Ville
                </label>
                <select
                  id="ville"
                  value={filters.ville}
                  onChange={(e) => setFilters({...filters, ville: e.target.value})}
                  className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                >
                  <option value="">Toutes les villes</option>
                  {villes.map(ville => (
                    <option key={ville} value={ville}>{ville}</option>
                  ))}
                </select>
              </div>

              {/* Recherche */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">
                  Recherche
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Nom ou Instagram..."
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                />
              </div>
            </div>

            {/* Résumé des filtres */}
            {(filters.categorie || filters.ville || filters.search) && (
              <div className="flex items-center flex-wrap gap-2 text-sm text-gray-300">
                <span>Filtres :</span>
                {filters.categorie && (
                  <span className="bg-gray-800 px-2 py-1 rounded-full flex items-center">
                    {filters.categorie}
                    <button 
                      onClick={() => setFilters({...filters, categorie: ''})}
                      className="ml-1 text-orange hover:text-orange-300"
                    >
                      &times;
                    </button>
                  </span>
                )}
                {filters.ville && (
                  <span className="bg-gray-800 px-2 py-1 rounded-full flex items-center">
                    {filters.ville}
                    <button 
                      onClick={() => setFilters({...filters, ville: ''})}
                      className="ml-1 text-orange hover:text-orange-300"
                    >
                      &times;
                    </button>
                  </span>
                )}
                {filters.search && (
                  <span className="bg-gray-800 px-2 py-1 rounded-full flex items-center">
                    "{filters.search}"
                    <button 
                      onClick={() => setFilters({...filters, search: ''})}
                      className="ml-1 text-orange hover:text-orange-300"
                    >
                      &times;
                    </button>
                  </span>
                )}
                <button 
                  onClick={() => setFilters({categorie: '', ville: '', search: ''})}
                  className="text-orange hover:text-orange-300 ml-2"
                >
                  Tout effacer
                </button>
              </div>
            )}
          </motion.div>

          {/* Résultats et compteur */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-300">
              {filteredParticipants.length} participant{filteredParticipants.length !== 1 ? 's' : ''} trouvé{filteredParticipants.length !== 1 ? 's' : ''}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
            </div>
          ) : filteredParticipants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-300 mb-4">Aucun participant ne correspond à vos critères</p>
              <button 
                onClick={() => setFilters({categorie: '', ville: '', search: ''})}
                className="text-orange hover:text-orange-300 underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedParticipants.map((p) => (
                  <motion.div
                    key={p.id}
                    className="bg-gray-900/80 border border-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all hover:border-orange/50"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div
                      className="w-full h-60 relative cursor-pointer group overflow-hidden rounded-xl"
                      onClick={() => setSelectedPhoto({
                        url: `http://localhost:5010${p.photoUrl}`,
                        name: p.nom
                      })}
                    >
                      <Image
                        src={p.photoUrl ? `http://localhost:5010${p.photoUrl}` : "/images/default-avatar.png"}
                        alt={p.nom}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 rounded-xl" />
                    </div>

                    <div className="mt-4 space-y-1">
                      <h2 className="text-xl font-bold text-white">{p.nom}</h2>
                      <button 
                        onClick={() => openInstagramProfile(p.instagram)}
                        className="text-sm text-orange hover:text-orange-300 transition"
                      >
                        @{p.instagram}
                      </button>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-300">{p.ville}</p>
                        <span className="text-xs bg-gray-800 text-orange px-2 py-1 rounded-full">
                          {p.categorie}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div 
                  className="flex justify-center mt-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-md bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700 transition"
                    >
                      &lt;
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-md flex items-center justify-center ${
                          currentPage === page
                            ? 'bg-orange text-white'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        } transition`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-md bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700 transition"
                    >
                      &gt;
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>

        {/* Modal zoom avec option de téléchargement */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="relative max-w-4xl w-full"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <img
                  src={selectedPhoto.url}
                  alt="Aperçu"
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <button
                    onClick={() => downloadPhoto(selectedPhoto.url.split('http://localhost:5010')[1], selectedPhoto.name)}
                    className="bg-orange text-white px-4 py-2 rounded-full hover:bg-orange-600 transition flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Télécharger
                  </button>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
                  >
                    Fermer
                  </button>
                </div>
                <button
                  className="absolute -top-12 right-0 text-white text-3xl hover:text-orange transition"
                  onClick={() => setSelectedPhoto(null)}
                >
                  &times;
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}