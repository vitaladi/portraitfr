"use client"

import NotionForm from "@/components/NotionForm"
import { motion } from "framer-motion"

export default function ParticipantPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Image de fond floue */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/imagePortraitFr/img5.webp)",
          filter: "blur(6px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenu principal */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/90 backdrop-blur-sm border border-gray-800 text-white max-w-xl w-full p-8 rounded-3xl shadow-xl relative z-10"
          style={{ boxShadow: "0 0 30px rgba(220, 120, 53, 0.3)" }}
        >
          <h2 className="text-3xl font-bold text-orange text-center mb-6">
            Formulaire de participation
          </h2>
          <NotionForm />
        </motion.div>
      </div>
    </div>
  )
}
