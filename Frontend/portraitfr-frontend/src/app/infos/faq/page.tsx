'use client'

import { motion } from 'framer-motion'

export default function FAQPage() {
  const faqs = [
    {
      question: "Quand aura lieu la cérémonie des PortraitFr Awards 2025 ?",
      answer:
        "La cérémonie se tiendra en fin d’année 2025. La date exacte et le lieu seront annoncés prochainement sur nos réseaux sociaux et notre site internet. Restez connectés !",
    },
    {
      question: "Où se déroulera l’événement ?",
      answer:
        "Le lieu sera communiqué dans les mois à venir. Nous travaillons à organiser une soirée prestigieuse dans un cadre idéal pour célébrer les talents de la photographie.",
    },
    {
      question: "Qui peut participer aux PortraitFr Awards ?",
      answer:
        "Le concours est ouvert à tous les passionnés de photographie : Photographes, Modèles, Make-up artists (MUA), ainsi que le Projet de l'année",
    },
    {
      question: "Quelles sont les catégories récompensées ?",
      answer:
        "Les catégories de cette édition :\n1️⃣ Photographe de l’année 📷\n2️⃣ Modèle de l’année 💃🕺\n3️⃣ Make-up Artist de l’année 💄\n4️⃣ Projet de l'année",
    },
    {
      question: "Comment s’inscrire et candidater ?",
      answer:
        "Les candidatures ouvriront le 01 juin 2025. Vous pourrez soumettre votre participation via notre formulaire en ligne sur le site officiel.",
    },
    {
      question: "Comment sont sélectionnés les nominés et les gagnants ?",
      answer:
        "1️⃣ Sélection par les membres de PortraitFr.\n2️⃣ Un jury professionnel désigne 5 nominés par catégorie.",
    },
    {
      question: "Comment voter pour ses artistes préférés ?",
      answer:
        "Le vote du public pour la catégorie Projet de l'année se fera directement sur Instagram. Des sondages seront disponibles pour vous permettre de soutenir vos artistes favoris.",
    },
    {
      question: "Est-ce que l’événement est ouvert au public ?",
      answer: "Oui, l’événement sera accessible via une billetterie.",
    },
    {
      question: "Où suivre l’actualité des PortraitFr Awards 2025 ?",
      answer:
        "Restez informé en nous suivant sur Instagram et notre site officiel. Toutes les annonces seront postées régulièrement.",
    },
    {
      question:
        "Comment contacter l’équipe PortraitFr pour des questions, collaborations ou partenariats?",
      answer:
        "Pour toute question ou partenariat, contactez-nous via notre formulaire sur le site ou envoyez un mail à contact@portraitfr.fr.",
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan flou */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/imagePortraitFr/img17.jpg)',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/60" />

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-orange mb-12"
        >
          FAQ - PortraitFr Awards 2025
        </motion.h1>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/50 border border-orange/30 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold text-orange mb-2">{faq.question}</h3>
              <p className="text-gray-300 whitespace-pre-line">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
