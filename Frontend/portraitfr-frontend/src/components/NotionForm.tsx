// components/NotionForm.tsx
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
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState("")
  const [fileError, setFileError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target
    const { name, value, type } = target
    const checked = type === "checkbox" && (target as HTMLInputElement).checked
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
    setIsLoading(true)

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value as any)
      }
    })

    try {
      const res = await fetch("/api/notion", {
        method: "POST",
        body: data,
      })
      if (res.ok) {
        setMessage("✅ Participation envoyée avec succès !")
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
        setMessage(`❌ Erreur : ${error}`)
      }
    } catch (error) {
      setMessage("❌ Erreur lors de l’envoi du formulaire")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-black/90 backdrop-blur-sm border border-gray-800 text-white max-w-xl w-full p-8 rounded-3xl shadow-xl space-y-4 relative z-10"
      style={{ boxShadow: "0 0 30px rgba(220, 120, 53, 0.3)" }}
    >
      <h2 className="text-3xl font-bold text-orange text-center mb-6">Formulaire de participation</h2>

      <input name="nom" type="text" placeholder="Nom" value={formData.nom} onChange={handleChange} required className="input" />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="input" />
      <input name="instagram" type="text" placeholder="Instagram" value={formData.instagram} onChange={handleChange} required className="input" />
      <input name="ville" type="text" placeholder="Ville" value={formData.ville} onChange={handleChange} required className="input" />

      <select name="categorie" value={formData.categorie} onChange={handleChange} required className="input">
        <option value="">Choisir une catégorie</option>
        <option value="Photographe">Photographe</option>
        <option value="Modèle">Modèle</option>
        <option value="MUA">Make-Up Artist</option>
        <option value="Projet">Projet de l'année</option>
      </select>

      <label className="block w-full bg-gray-900/80 border border-gray-700 text-orange rounded-lg p-4 text-center cursor-pointer hover:bg-gray-800 transition">
        📸 Soumettre une photo
        <input name="photo" type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />
      </label>

      {fileName && (
        <div className="text-sm text-gray-400 mt-2 text-center">
          Fichier sélectionné : <span className="text-orange-300">{fileName}</span>
        </div>
      )}

      {fileError && (
        <div className="text-red-400 text-sm mt-2 text-center">{fileError}</div>
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
        disabled={isLoading}
        className={`bg-orange text-white py-3 px-6 rounded-full hover:bg-orange-600 transition w-full mt-4 flex items-center justify-center ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {isLoading ? (
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
        {message && (
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
    </motion.form>
  )
}
