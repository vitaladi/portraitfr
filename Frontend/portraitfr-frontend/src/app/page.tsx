/* src/app/page.tsx */
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const images = Array.from({ length: 21 }, (_, i) => `/fontanime/img${i + 1}.jpg`)

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const [showButton, setShowButton] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState(images[0])

  function getTimeLeft() {
    const deadline = new Date("2025-03-10T00:00:00").getTime()
    const now = new Date().getTime()
    const diff = deadline - now

    return diff > 0 ? {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    } : null
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getTimeLeft()
      if (updated) setTimeLeft(updated)
      else {
        setTimeLeft(null)
        setShowButton(true)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const changeBackground = () => {
      const randomIndex = Math.floor(Math.random() * images.length)
      setBackgroundImage(images[randomIndex])
    }

    const interval = setInterval(changeBackground, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan animé */}
      <AnimatePresence mode="wait">
        <motion.div
          key={backgroundImage}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.6 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenu principal */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 min-h-screen text-white">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image 
            src="/fontanime/logo.PNG" 
            alt="PortraitFr Logo" 
            width={150} 
            height={150} 
            className="mb-8 mx-auto"
          />
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Bienvenue sur <span className="text-orange">Portrait Fr</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Découvrez les <span className="text-orange font-medium">PortraitFr Awards 2025</span><br />
          L'événement qui célèbre les talents de la photographie.
        </motion.p>

        {/* Compte à rebours */}
        <div className="mt-8 mb-16">
          {timeLeft ? (
            <motion.div 
              className="grid grid-cols-4 gap-4 md:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CountdownBlock label="Jours" value={timeLeft.days} />
              <CountdownBlock label="Heures" value={timeLeft.hours} />
              <CountdownBlock label="Minutes" value={timeLeft.minutes} />
              <CountdownBlock label="Secondes" value={timeLeft.seconds} />
            </motion.div>
          ) : (
            <AnimatePresence>
              {showButton && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href="/participer">
                    <button className="border-2 border-orange text-white text-lg px-8 py-4 rounded-full hover:bg-orange/20 transition-all duration-300 shadow-lg">
                      Participer aux PortraitFr Awards 2025
                    </button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Call-to-action secondaire */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="/focus">
            <button className="border border-orange text-orange px-6 py-2 rounded-full hover:bg-orange hover:text-white transition-all duration-300">
              Découvrez notre podcast
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

function CountdownBlock({ label, value }: { label: string, value: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-black/50 border border-orange/30 rounded-lg p-4 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
        <span className="text-3xl md:text-4xl font-bold text-orange">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-sm uppercase tracking-widest text-gray-300 mt-2">
        {label}
      </span>
    </div>
  )
}