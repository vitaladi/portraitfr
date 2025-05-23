'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FloatingImagesContainer, FloatingImage } from '@/components/FloatingImages/FloatingImages'
import Image from 'next/image'
import { GradientOverlay } from '@/components/GradientOverlay/GradientOverlay'

// Configuration des images locales
const LOCAL_IMAGES = Array.from({ length: 20 }, (_, i) => ({
  url: `/siteimages/img${i + 1}.webp`,
  size: ['small', 'medium', 'large', 'xlarge'][Math.floor(Math.random() * 4)] as 'small' | 'medium' | 'large' | 'xlarge',
  depth: [0.5, 1, 1.5, 2][Math.floor(Math.random() * 4)],
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`
}))
export default function AwardsPage() {
  const faqs = [
    {
      question: "Quand aura lieu la cérémonie des PortraitFr Awards 2025 ?",
      answer: "La cérémonie se tiendra en fin d'année 2025. La date exacte et le lieu seront annoncés prochainement sur nos réseaux sociaux et notre site internet. Restez connecté·e·s.",
    },
    {
      question: "Où se déroulera l'événement ?",
      answer: "Le lieu sera communiqué dans les mois à venir. Nous travaillons à organiser une soirée prestigieuse dans un cadre idéal pour célébrer les talents de la photographie.",
    },
    {
      question: "Qui peut participer aux PortraitFr Awards ?",
      answer: "Le concours est ouvert à toutes les personnes passionnées de photographie : photographes, modèles, maquilleuses et maquilleurs (MUA) ainsi que les projets de l'année.",
    },
    {
      question: "Quelles sont les catégories récompensées ?",
      answer: "Photographe de l'année\nModèle de l'année\nMaquilleuse ou maquilleur de l'année\nProjet de l'année.",
    },
    {
      question: "Comment s'inscrire et candidater ?",
      answer: "Les candidatures ouvriront le 1er juin 2025. Vous pourrez soumettre votre participation via notre formulaire en ligne sur le site officiel.",
    },
    {
      question: "Comment sont sélectionné·e·s les nominé·e·s et les gagnant·e·s ?",
      answer: "Sélection par les membres de PortraitFr\nUn jury professionnel désignera cinq nominé·e·s par catégorie.",
    },
    {
      question: "Comment voter pour ses artistes préféré·e·s ?",
      answer: "Le vote du public pour la catégorie Projet de l'année se fera directement sur Instagram. Des sondages seront disponibles pour permettre de soutenir les artistes favori·te·s.",
    },
    {
      question: "L'événement est-il ouvert au public ?",
      answer: "Oui, l'événement sera accessible via une billetterie.",
    },
    {
      question: "Où suivre l'actualité des PortraitFr Awards 2025 ?",
      answer: "Restez informé·e en nous suivant sur Instagram et notre site officiel. Toutes les annonces seront postées régulièrement.",
    },
    {
      question: "Comment contacter l'équipe PortraitFr pour des questions, collaborations ou partenariats ?",
      answer: "Pour toute question ou partenariat, contactez-nous via Instagram ou à l'adresse mail contact@portraitfr.fr",
    },
  ]
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan avec effet parallaxe */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-0">
        <FloatingImagesContainer sensitivity={-1} className="overflow-hidden">
          {LOCAL_IMAGES.map((img, index) => (
            <FloatingImage
              key={index}
              src={img.url}
              size={img.size}
              depth={img.depth}
              top={img.top}
              left={img.left}
            />
          ))}
        </FloatingImagesContainer>
      </div>

      {/* Overlay de dégradé */}
      <GradientOverlay fromColor="from-orange-500/30" toColor="to-transparent" />
    {/* Overlay de dégradé */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/30 to-transparent z-1" />

      {/* Contenu principal - Structure alignée comme dans l'exemple HTML */}
      <div className="relative z-10 space-y-12 pb-20">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-12 py-12 md:py-16 bg-black/70 backdrop-blur-sm shadow-sm rounded-lg mx-auto mt-8 max-w-6xl">
          <div className="w-full md:w-1/2">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-orange-500"
            >
              PortraitFr Awards 2025
            </motion.h1>
            <p className="text-lg md:text-xl mb-4">
              Le PortraitFr Awards 2025 est la cérémonie dédiée aux talents de la photographie en France.
            </p>
            <ul className="text-base md:text-lg space-y-2 mb-4">
              <li><span className="font-semibold">Date :</span> Fin d'année 2025</li>
              <li><span className="font-semibold">Lieu :</span> Paris (Adresse à venir)</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Image
                src="/fontanime/logo.PNG" 
                width={400}
                height={400}
                className="rounded-lg shadow-lg w-full max-w-xs md:max-w-md object-cover"
                alt="Logo PortraitFr Awards"
              />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Photographe de l'année",
              description: "Celui ou celle qui a su capturer l'essence de l'émotion à travers ses œuvres.",
              icon: "📷"
            },
            {
              title: "Modèle de l'année",
              description: "Celui ou celle qui a marqué l'année par sa présence et son charisme.",
              icon: "🌟"
            },
            {
              title: "Projet de l'année",
              description: "La réalisation photographique collective la plus marquante.",
              icon: "🏆"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/70 backdrop-blur-sm rounded-lg shadow-md p-6 flex flex-col items-center text-center h-full"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-orange-500">{item.title}</h3>
              <p className="text-[#EAE2B7]">{item.description}</p>
            </motion.div>
          ))}
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-8 text-center text-orange-500"
          >
            Questions fréquentes
          </motion.h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-black/70 backdrop-blur-sm border border-orange-400/30 p-6 rounded-xl shadow-lg"
              >
                <h3 className="font-semibold text-lg mb-2 text-orange-500">{faq.question}</h3>
                <p className="text-[#EAE2B7] whitespace-pre-line">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center bg-black/70 backdrop-blur-sm shadow-md rounded-lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-500">
              Prêt·e à participer ?
            </h2>
            <p className="mb-6 text-lg">
              Candidatures ouvertes du 1<sup>er</sup> juin au 31 août 2025
            </p>
            <Link 
              href="/participer" 
              className="inline-block px-8 py-3 bg-orange-500 text-[#EAE2B7] font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition-colors"
            >
              S'inscrire maintenant
            </Link>
            <div className="mt-6 text-gray-600">
              <p>Contact : <a href="mailto:contact@portraitfr.fr" className="text-orange-500 underline">contact@portraitfr.fr</a></p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}