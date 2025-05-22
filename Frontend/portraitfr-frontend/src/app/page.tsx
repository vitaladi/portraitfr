// app/page.tsx
"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { preloadImages } from './animations'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const loadAnimations = async () => {
      // Précharger les images
      await preloadImages('.card__img')
      
      // Animation des cartes
      gsap.set('.card', { opacity: 0 })
      
      cardsRef.current.forEach((card, index) => {
        const x = (Math.random() - 0.5) * 200
        const y = (Math.random() - 0.5) * 200
        const rotation = (Math.random() - 0.5) * 30
        
        gsap.fromTo(card, 
          { x, y, rotation, opacity: 0 },
          { 
            x: 0, 
            y: 0, 
            rotation: 0, 
            opacity: 0.8,
            duration: 1.5,
            delay: index * 0.1,
            ease: "power3.out"
          }
        )
      })

      // Animation du texte
      gsap.fromTo(headingsRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1.5,
          delay: 1,
          ease: "expo.out"
        }
      )
    }

    loadAnimations()
  }, [])

  return (
    <div className="demo-1 min-h-screen overflow-hidden relative">
      {/* Background avec texture */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-900 via-orange-700 to-orange-600">
        <div className="absolute inset-0 opacity-20 bg-[url('/siteimages/grain.png')] mix-blend-overlay" />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.7)]" />
      </div>

      {/* Conteneur des images animées */}
      <div className="scene" ref={containerRef}>
        <div className="group">
          {[...Array(24)].map((_, i) => (
            <div 
              key={i} 
              className="card"
              ref={el => {
                if (el) {
                  cardsRef.current[i] = el;
                }
              }}
            >
              <div 
                className="card__img"
                style={{ backgroundImage: `url(/siteimages/img${i+1}.webp)` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Contenu texte */}
      <div className="content">
        <div className="headings" ref={headingsRef}>
          <h1 className="headings__main gloock-regular text-white">
            PORTRAITFR AWARDS <span className="text-orange">2025</span>
          </h1>
          <p className="text-lg md:text-[20px] mt-2 text-white">
            Cérémonie organisée par PortraitFr
          </p>
          
          <div className="max-w-3xl mx-auto mt-8">
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white">
              Les PortraitFr Awards célèbrent les talents de la photographie. 
              Pour cette première édition, six prix seront remis à des artistes d'exception.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/participer">
                <button className="bg-orange text-white text-lg px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-orange/80 transition-all duration-300 shadow-lg">
                  Participer aux Awards
                </button>
              </Link>
              <Link href="/billet">
                <button className="border-2 border-orange text-white text-lg px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-orange/20 transition-all duration-300">
                  Billetterie
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}