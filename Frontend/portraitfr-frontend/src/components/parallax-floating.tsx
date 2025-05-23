'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useCallback, useContext, createContext } from 'react'
import { useAnimationFrame } from 'framer-motion'
import { cn } from '@/lib/utils'

// Configuration des images locales
const LOCAL_IMAGES: Array<{
  url: string;
  size: keyof typeof sizeClasses;
  depth: number;
  position: { top: string; left: string };
}> = [
  {
    url: "/siteimages/img1.webp",
    size: "small",
    depth: 0.5,
    position: { top: "8%", left: "11%" }
  },
  {
    url: "/siteimages/img2.webp",
    size: "medium",
    depth: 1,
    position: { top: "10%", left: "32%" }
  },
  {
    url: "/siteimages/img3.webp", 
    size: "large",
    depth: 2,
    position: { top: "2%", left: "53%" }
  },
  {
    url: "/siteimages/img4.webp",
    size: "medium",
    depth: 1,
    position: { top: "0%", left: "83%" }
  },
  {
    url: "/siteimages/img5.webp",
    size: "large",
    depth: 1,
    position: { top: "40%", left: "2%" }
  },
  {
    url: "/siteimages/img6.webp",
    size: "xlarge",
    depth: 4,
    position: { top: "73%", left: "15%" }
  },
  {
    url: "/siteimages/img7.webp",
    size: "medium", 
    depth: 2,
    position: { top: "70%", left: "77%" }
  },
  {
    url: "/siteimages/img8.webp",
    size: "medium",
    depth: 1,
    position: { top: "80%", left: "50%" }
  }
]

const sizeClasses = {
  small: "w-16 h-16 md:w-24 md:h-24",
  medium: "w-20 h-20 md:w-28 md:h-28",
  large: "w-28 h-40 md:w-40 md:h-52",
  xlarge: "w-40 md:w-52 h-full"
}

// Système de parallaxe
const FloatingContext = createContext<any>(null)

function useMousePositionRef(containerRef: React.RefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = {
          x: x - rect.left,
          y: y - rect.top
        }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX, e.touches[0].clientY)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [containerRef])

  return positionRef
}

function Floating({ children, className = '', sensitivity = 1, easingFactor = 0.05 }: {
  children: React.ReactNode
  className?: string
  sensitivity?: number
  easingFactor?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsMap = useRef(new Map<string, {
    element: HTMLDivElement
    depth: number
    currentPosition: { x: number; y: number }
  }>())
  const mousePositionRef = useMousePositionRef(containerRef)

  const registerElement = useCallback((id: string, element: HTMLDivElement, depth: number) => {
    elementsMap.current.set(id, { element, depth, currentPosition: { x: 0, y: 0 } })
  }, [])

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id)
  }, [])

  useAnimationFrame(() => {
    if (!containerRef.current) return

    elementsMap.current.forEach(data => {
      const strength = (data.depth * sensitivity) / 20
      const newTargetX = mousePositionRef.current.x * strength
      const newTargetY = mousePositionRef.current.y * strength
      const dx = newTargetX - data.currentPosition.x
      const dy = newTargetY - data.currentPosition.y

      data.currentPosition.x += dx * easingFactor
      data.currentPosition.y += dy * easingFactor

      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
    })
  })

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div ref={containerRef} className={cn('absolute inset-0 w-full h-full', className)}>
        {children}
      </div>
    </FloatingContext.Provider>
  )
}

function FloatingElement({ children, className = '', depth = 1 }: {
  children: React.ReactNode
  className?: string
  depth?: number
}) {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(FloatingContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    context.registerElement(idRef.current, elementRef.current, depth)
    return () => context.unregisterElement(idRef.current)
  }, [depth, context])

  return (
    <div ref={elementRef} className={cn('absolute will-change-transform', className)}>
      {children}
    </div>
  )
}

export default function AwardsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan avec effet parallaxe */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
        <Floating sensitivity={-1} className="overflow-hidden">
          {LOCAL_IMAGES.map((img, index) => (
            <FloatingElement 
              key={index}
              depth={img.depth}
              className={`top-[${img.position.top}] left-[${img.position.left}]`}
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Image
                  src={img.url}
                  width={400}
                  height={400}
                  className={`${sizeClasses[img.size]} object-cover hover:scale-105 duration-200 cursor-pointer transition-transform`}
                  alt=""
                  role="presentation"
                />
              </motion.div>
            </FloatingElement>
          ))}
        </Floating>
      </div>

      {/* Overlay de dégradé */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/30 to-transparent" />

      {/* Contenu principal */}
      <div className="relative max-w-4xl mx-auto px-4 py-20 z-10 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-orange-400 mb-10"
        >
          PortraitFr Awards 2025
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 text-lg text-gray-200"
        >
          <p>
            Le <span className="font-semibold text-orange-400">PortraitFr Awards 2025</span> est la cérémonie dédiée aux talents de la photographie en France. Cet événement met en lumière les artistes et récompense leur travail.
          </p>

          <h2 className="font-bold text-orange-400">Date</h2>
          <p>Fin d'année 2025.</p>

          <h2 className="font-bold text-orange-400">Lieu</h2>
          <p>Paris (adresse à venir).</p>

          <h2 className="font-bold text-orange-400">Les catégories récompensées</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Photographe de l'année</strong> : Celui ou celle qui a su capturer l'essence de l'émotion à travers ses œuvres.</li>
            <li><strong>Modèle de l'année</strong> : Celui ou celle qui a marqué l'année par sa présence, son charisme et son engagement artistique.</li>
            <li><strong>Make-up Artist (MUA) de l'année</strong> : L'artiste qui sublime les images par son talent en maquillage et en mise en beauté.</li>
            <li><strong>Projet de l'année</strong> : La réalisation photographique collective ou individuelle la plus marquante.</li>
          </ul>

          <h2 className="font-bold text-orange-400">Comment participer ?</h2>
          <p>
            Candidatures ouvertes du <strong>1<sup>er</sup> juin au 31 août 2025</strong>.<br />
            Inscription via le <Link href="/participer" className="underline text-orange-400 hover:text-orange-300 transition-colors">formulaire en ligne</Link>.
          </p>
          <p>Sélection des nominés et vote du public sur Instagram.</p>

          <h2 className="font-bold text-orange-400">Sélection des nominés et gagnants</h2>
          <p>
            Sélection des 10 nominés par catégorie par l'équipe PortraitFr, puis des 5 nominés finalistes par un jury professionnel.<br />
            Le public vote ensuite pour élire les gagnants de chaque catégorie.
          </p>

          <h2 className="font-bold text-orange-400">Accès et contact</h2>
          <p>
            Événement sur billetterie.<br />
            Contactez-nous via notre <Link href="/contact" className="underline text-orange-400 hover:text-orange-300 transition-colors">formulaire</Link> ou à l'adresse mail <span className="underline">contact@portraitfr.fr</span>.
          </p>

          <p className="italic text-gray-300">Plus de détails à venir prochainement.</p>
        </motion.div>
      </div>
    </div>
  )
}