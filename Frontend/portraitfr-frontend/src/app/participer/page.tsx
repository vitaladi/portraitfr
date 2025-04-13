"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ParticipantForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    instagram: "",
    ville: "",
    categorie: "",
    autorisationParticipation: false,
    photo: null as File | null,
  })

  const [message, setMessage] = useState("")
  const [participantCount, setParticipantCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [fileError, setFileError] = useState("")
  const [fileName, setFileName] = useState("")

  useEffect(() => {
    const fetchCount = async () => {
      const res = await fetch("http://localhost:5010/api/participants")
      const data = await res.json()
      setParticipantCount(data.length)
    }
    fetchCount()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("")
    setFileName("")
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      if (file.size > 25 * 1024 * 1024) {
        setFileError("La taille de l'image ne doit pas dépasser 25 Mo")
        e.target.value = ""
        return
      }
      setFormData((prev) => ({ ...prev, photo: file }))
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsSubmitting(true)

    if (formData.photo && formData.photo.size > 25 * 1024 * 1024) {
      setFileError("La taille de l'image ne doit pas dépasser 25 Mo")
      setIsSubmitting(false)
      return
    }

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "photo" && value) {
        data.append("photo", value as File)
      } else {
        data.append(key, String(value))
      }
    })

    try {
      const res = await fetch("http://localhost:5010/api/participants", {
        method: "POST",
        body: data,
      })

      if (res.ok) {
        setShowSuccessModal(true)
        setFormData({
          nom: "",
          email: "",
          instagram: "",
          ville: "",
          categorie: "",
          autorisationParticipation: false,
          photo: null,
        })
        setFileName("")
      } else {
        const error = await res.text()
        setMessage(`❌ Erreur lors de l'envoi : ${error}`)
      }
    } catch (err) {
      console.error("Erreur réseau :", err)
      setMessage("❌ Une erreur est survenue, vérifie ta connexion.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowSuccessModal(false)
    window.location.reload()
  }

  function Instagram(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/imagePortraitFr/img5.jpg)",
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />
      
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-black/90 backdrop-blur-sm border border-gray-800 text-white max-w-xl w-full p-8 rounded-3xl shadow-xl space-y-4 relative z-10"
          style={{
            boxShadow: "0 0 30px rgba(220, 120, 53, 0.3)",
          }}
        >
          <h2 className="text-3xl font-bold text-orange text-center mb-6">Formulaire de participation</h2>

          <div className="space-y-4">
            <input
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom"
              required
              className="w-full p-3 rounded bg-gray-900/80 border border-gray-700 focus:border-orange focus:ring-1 focus:ring-orange text-white placeholder-gray-400 transition"
            />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 rounded bg-gray-900/80 border border-gray-700 focus:border-orange focus:ring-1 focus:ring-orange text-white placeholder-gray-400 transition"
            />

            <input
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="Instagram"
              required
              className="w-full p-3 rounded bg-gray-900/80 border border-gray-700 focus:border-orange focus:ring-1 focus:ring-orange text-white placeholder-gray-400 transition"
            />

            <input
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              placeholder="Ville"
              required
              className="w-full p-3 rounded bg-gray-900/80 border border-gray-700 focus:border-orange focus:ring-1 focus:ring-orange text-white placeholder-gray-400 transition"
            />

            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-900/80 border border-gray-700 focus:border-orange focus:ring-1 focus:ring-orange text-white placeholder-gray-400 transition"
            >
              <option value="">Choisir une catégorie</option>
              <option value="Photographe">Photographe</option>
              <option value="Modèle">Modèle</option>
              <option value="MUA">MUA</option>
              <option value="Projet de l'année">Projet de l'année</option>
            </select>
          </div>

          <label className="block w-full bg-gray-900/80 border border-gray-700 text-orange rounded-lg p-4 text-center cursor-pointer hover:bg-gray-800 transition">
            📸 Soumettre une photo
            <input
              name="photo"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {fileName && (
            <div className="text-sm text-gray-400 mt-2 text-center">
              Fichier sélectionné : <span className="text-orange-300">{fileName}</span>
            </div>
          )}

          {fileError && (
            <div className="text-red-400 text-sm mt-2">
              {fileError}
            </div>
          )}

          <AnimatePresence>
            {formData.photo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-900/80 border border-gray-700 p-4 rounded-lg mt-4">
                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      name="autorisationParticipation"
                      checked={formData.autorisationParticipation}
                      onChange={handleChange}
                      required
                      className="mt-1 accent-orange"
                    />
                    <span className="text-sm text-gray-300">
                      Je certifie être l'auteur, le/la modèle ou une personne ayant contribué à la réalisation de la photo soumise. J'atteste également avoir obtenu les autorisations nécessaires ou informé les autres acteurs de la photo pour sa participation au concours et sa diffusion dans le cadre des PortraitFr Awards 2025.
                    </span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-orange text-white py-3 px-6 rounded-full hover:bg-orange-600 transition w-full mt-4 flex items-center justify-center ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </>
            ) : (
              "Envoyer"
            )}
          </button>

          <AnimatePresence>
            {message && !showSuccessModal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`text-center mt-4 p-4 rounded-lg ${
                  message.includes("❌") ? "bg-red-900/50 border border-red-700" : "bg-green-900/50 border border-green-700"
                }`}
              >
                <p className="font-medium">{message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-sm mt-6 text-gray-400">
            {participantCount} participant{participantCount > 1 ? "s" : ""} déjà inscrit{participantCount > 1 ? "s" : ""}
          </p>
        </motion.form>
      </div>

      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-black/90 border border-orange/30 rounded-xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-orange mb-4">Inscription validée !</h3>
                <p className="text-gray-300 mb-6">
                  Merci pour votre participation aux PortraitFr Awards 2025.
                </p>
                
                <div className="flex flex-col space-y-4">
                  <a
                    href="https://www.instagram.com/portrait.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange text-white py-3 px-6 rounded-full font-medium hover:bg-orange-600 transition flex items-center justify-center"
                  >
                    <Instagram className="w-5 h-5 mr-2" />
                    Nous suivre sur Instagram
                  </a>
                  
                  <button
                    onClick={closeModal}
                    className="border border-orange text-orange py-3 px-6 rounded-full font-medium hover:bg-orange/10 transition"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}