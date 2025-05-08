"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function NotionForm() {
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [fileError, setFileError] = useState("")
  const [fileName, setFileName] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
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
        return
      }
      setFormData(prev => ({ ...prev, photo: file }))
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsSubmitting(true)

    try {
      // Convertir l'image en base64 si elle existe
      let photoBase64 = null
      if (formData.photo) {
        photoBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(formData.photo!)
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = error => reject(error)
        })
      }

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          photoBase64
        }),
      })

      if (response.ok) {
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
        const error = await response.json()
        setMessage(`❌ ${error.error || "Erreur lors de l'envoi"}`)
      }
    } catch (err) {
      console.error(err)
      setMessage("❌ Erreur réseau, veuillez réessayer")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <input
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Nom complet"
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
          placeholder="Compte Instagram"
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
        📸 {fileName || "Soumettre une photo"}
        <input
          name="photo"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {fileError && (
        <div className="text-red-400 text-sm mt-2 text-center">
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
                  Je certifie être l'auteur ou avoir les droits nécessaires pour cette photo et autorise son utilisation dans le cadre des PortraitFr Awards.
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
          "Envoyer ma candidature"
        )}
      </button>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-center mt-4 p-3 rounded-lg ${
              message.includes("❌") ? "bg-red-900/50 border border-red-700" : "bg-green-900/50 border border-green-700"
            }`}
          >
            <p>{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/90 border border-orange/30 rounded-xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-orange mb-4">Candidature envoyée !</h3>
                <p className="text-gray-300 mb-6">
                  Merci pour votre participation aux PortraitFr Awards 2025.
                </p>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="border border-orange text-orange py-2 px-6 rounded-full font-medium hover:bg-orange/10 transition"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </form>
  )
}