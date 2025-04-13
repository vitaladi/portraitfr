'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, Users } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /* Temporairement désactivé
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }
  */

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan flou avec img7 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/imagePortraitFr/img7.jpg)',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
        }}
      />
      
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-orange mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Vous avez des questions ou souhaitez rejoindre notre association ? Nous sommes à votre écoute.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Option Instagram */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/50 border border-gray-800 rounded-2xl p-8 hover:border-orange/50 transition-all"
          >
            <div className="flex flex-col items-center text-center h-full">
              <div className="bg-orange/10 p-4 rounded-full mb-6">
                <Instagram className="w-8 h-8 text-orange" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Via Instagram</h2>
              <p className="text-gray-300 mb-6 flex-grow">
                Suivez-nous et envoyez-nous un message direct sur notre page Instagram.
              </p>
              <a
                href="https://www.instagram.com/portrait.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-orange to-orange-500 text-white py-3 px-6 rounded-full font-medium hover:opacity-90 transition flex items-center justify-center"
              >
                <Instagram className="w-5 h-5 mr-2" />
                @portrait.fr
              </a>
            </div>
          </motion.div>

          {/* Section Email (simplifiée) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-black/50 border border-gray-800 rounded-2xl p-8 hover:border-orange/50 transition-all lg:col-span-2"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="bg-orange/10 p-3 rounded-full mr-4">
                  <Mail className="w-6 h-6 text-orange" />
                </div>
                <h2 className="text-2xl font-bold">Par email</h2>
              </div>

              <div className="flex-grow flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-300 mb-6">
                    Contactez-nous directement par email à l'adresse :
                  </p>
                  <a 
                    href="mailto:contact@portraitfr.fr" 
                    className="text-orange text-xl hover:underline break-all"
                  >
                    contact@portraitfr.fr
                  </a>
                </div>
              </div>

              {/* 
              Ancien formulaire temporairement désactivé
              {submitStatus === 'success' ? (
                <div className="bg-green-900/30 border border-green-800 text-green-400 p-4 rounded-lg mb-6">
                  Merci ! Votre message a bien été envoyé.
                </div>
              ) : submitStatus === 'error' ? (
                <div className="bg-red-900/30 border border-red-800 text-red-400 p-4 rounded-lg mb-6">
                  Une erreur est survenue. Contactez-nous directement.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
                  ...
                </form>
              )}
              */}
            </div>
          </motion.div>

          {/* Adhésion HelloAsso */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-black/50 border border-gray-800 rounded-2xl p-8 hover:border-orange/50 transition-all lg:col-span-3"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-6">
                <div className="bg-orange/10 p-4 rounded-full mr-4">
                  <Users className="w-8 h-8 text-orange" />
                </div>
                <h2 className="text-2xl font-bold">Rejoindre notre association</h2>
              </div>
              
              <p className="text-gray-300 mb-8 text-center max-w-2xl">
                Devenez membre de PortraitFr et soutenez notre initiative pour promouvoir la photographie artistique.
              </p>

              <div className="w-full flex justify-center">
                <iframe 
                  id="haWidget" 
                  allowTransparency={true} 
                  src="https://www.helloasso.com/associations/portrait-fr/adhesions/formulaire-d-adhesion-a-portraitfr-2/widget-vignette" 
                  className="w-full max-w-[350px] h-[450px] border-none"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}