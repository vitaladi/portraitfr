"use client"
import { useState } from "react"
import { motion } from "framer-motion"

export default function NotionForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    instagram: "",
    ville: "",
    categorie: "",
    autorisationParticipation: false,
    photo: null as File | null
  })

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const form = new FormData()
      form.append("nom", formData.nom)
      form.append("email", formData.email)
      form.append("instagram", formData.instagram)
      form.append("ville", formData.ville)
      form.append("categorie", formData.categorie)
      form.append("autorisationParticipation", String(formData.autorisationParticipation))
      if (formData.photo) {
        form.append("photo", formData.photo)
      }

      const response = await fetch("/api/notion", {
        method: "POST",
        body: form
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue")
      }

      setStatus("success")
      setMessage("✅ Candidature envoyée avec succès !")

      // Réinitialisation
      setFormData({
        nom: "",
        email: "",
        instagram: "",
        ville: "",
        categorie: "",
        autorisationParticipation: false,
        photo: null
      })
    } catch (error) {
      setStatus("error")
      setMessage(`❌ Erreur : ${error instanceof Error ? error.message : "Erreur inconnue"}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      <input name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom complet" required className="w-full p-3 rounded bg-gray-900/80 border border-gray-700 focus:border-orange text-white" />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-3 rounded bg-gray-900/80 border border-gray-700 focus:border-orange text-white" />
      <input name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@instagram" required className="w-full p-3 rounded bg-gray-900/80 border border-gray-700 focus:border-orange text-white" />
      <input name="ville" value={formData.ville} onChange={handleChange} placeholder="Ville" required className="w-full p-3 rounded bg-gray-900/80 border border-gray-700 focus:border-orange text-white" />

      <select name="categorie" value={formData.categorie} onChange={handleChange} required className="w-full p-3 rounded bg-gray-900/80 border border-gray-700 focus:border-orange text-white">
        <option value="">Choisir une catégorie</option>
        <option value="Photographe">Photographe</option>
        <option value="Modèle">Modèle</option>
        <option value="MUA">Maquilleur(se)</option>
        <option value="Styliste">Projet photo de l'année</option>
      </select>

      <label className="block border border-dashed border-orange/50 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-800/30 transition">
        {formData.photo ? (
          <span className="text-orange">📸 Photo sélectionnée : {formData.photo.name}</span>
        ) : (
          <span>📸 Télécharger une photo (max 25MB)</span>
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>

      {formData.photo && (
        <div className="flex items-start space-x-2 p-4 bg-gray-900/50 rounded-lg">
          <input type="checkbox" name="autorisationParticipation" checked={formData.autorisationParticipation} onChange={handleChange} required className="mt-1 accent-orange" />
          <span className="text-sm">Je certifie être l'auteur de cette photo et autorise son utilisation.</span>
        </div>
      )}

      <button type="submit" disabled={status === "loading"} className={`w-full py-3 px-6 rounded-full ${status === "loading" ? "bg-orange/50" : "bg-orange hover:bg-orange/80"} text-white transition`}>
        {status === "loading" ? "Envoi en cours..." : "Soumettre ma candidature"}
      </button>

      {message && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-3 rounded-lg text-center ${status === "error" ? "bg-red-900/50" : "bg-green-900/50"}`}>
          {message}
        </motion.div>
      )}
    </form>
  )
}
