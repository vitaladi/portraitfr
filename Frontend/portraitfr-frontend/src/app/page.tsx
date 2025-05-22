/* src/app/page.tsx */
"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { preloadImages } from '../lib/utils'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initAnimations = () => {
      const debug = false;
      if (debug) {
        document.querySelector("[data-debug]")?.classList.add("debug");
      }

      const breakPoint = "53em";
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: `(min-width: ${breakPoint})`,
          isMobile: `(max-width: ${breakPoint})`,
        },
        (context) => {
          let { isDesktop } = context.conditions || {};

          const image = document.querySelector(".card__img");
          const cardList = gsap.utils.toArray(".card") as HTMLElement[];
          const count = cardList.length;
          const sliceAngle = (2 * Math.PI) / count;

          // Distance calculations
          const radius1 = 50 + (image?.clientHeight || 0) / 2;
          const radius2 = isDesktop ? 250 - radius1 : 180 - radius1;

          gsap
            .timeline()
            .from(cardList, {
              y: window.innerHeight / 2 + (image?.clientHeight || 0) * 1.5,
              rotateX: -180,
              stagger: 0.1,
              duration: 0.5,
              opacity: 0.8,
              scale: 3,
            })
            .set(cardList, {
              transformOrigin: `center ${radius1 + (image?.clientHeight || 0) / 2}px`,
            })
            .set(".group", {
              transformStyle: "preserve-3d",
            })
            .to(cardList, {
              y: -radius1,
              duration: 0.5,
              ease: "power1.out",
            })
            .to(
              cardList,
              {
                rotation: (index: number) => (index * 360) / count,
                rotateY: 15,
                duration: 1,
                ease: "power1.out",
              },
              "<"
            )
            .to(cardList, {
              x: (index: number) => Math.round(radius2 * Math.cos(sliceAngle * index - Math.PI / 4)),
              y: (index: number) => Math.round(radius2 * Math.sin(sliceAngle * index - Math.PI / 4)) - radius1,
              rotation: (index: number) => (index + 1) * (360 / count),
            })
            .to(
              cardList,
              {
                rotateY: 180,
                opacity: 0.8,
                duration: 1,
              },
              "<"
            )
            .from(
              ".headings",
              {
                opacity: 0,
                filter: "blur(60px)",
                duration: 1,
              },
              "<"
            )
            .to(cardList, {
              repeat: -1,
              duration: 2,
              onRepeat: () => {
                const cards = gsap.utils.toArray(".card") as HTMLElement[];
                gsap.to(cards[Math.floor(Math.random() * count)], {
                  rotateY: "+=180",
                });
              },
            })
            .to(
              ".group",
              {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "none",
              },
              "<-=2"
            );

          return () => mm.revert();
        }
      );
    };

    preloadImages(".card__img").then(() => {
      document.body.classList.remove("loading");
      initAnimations();
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Debug element (hidden by default) */}
      <div data-debug className="hidden">
        <div></div>
      </div>

      {/* Arrière-plan orange avec vignettage et grain */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-900 via-orange-700 to-orange-600">
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.7)]" />
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/siteimages/grain.png')] mix-blend-overlay" />
        </div>
      </div>

      {/* Conteneur des images animées */}
      <div ref={containerRef} className="scene absolute inset-0 overflow-hidden opacity-80">
        <div className="group">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="card absolute">
              <div 
                className="card__img w-20 aspect-[2/3] rounded-sm bg-cover bg-center absolute"
                style={{ backgroundImage: `url(/siteimages/img${i+1}.webp)` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenu principal */}
      <div className="content relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-12">
        <div ref={headingsRef} className="headings">
          <h1 className="headings__main text-5xl sm:text-6xl md:text-[84px] font-bold leading-tight text-white">
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