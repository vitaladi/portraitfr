'use client'
import { motion } from 'framer-motion'
import { FloatingImagesContainer, FloatingImage } from '@/components/FloatingImages/FloatingImages'
import { GradientOverlay } from '@/components/GradientOverlay/GradientOverlay'
import { cn } from "@/lib/utils"
import { useRef } from "react"

const PARTENAIRES_IMAGES = Array.from({ length: 8 }, (_, i) => ({
  url: `/siteimages/img${i + 1}.webp`,
  size: ['small', 'medium'][Math.floor(Math.random() * 2)] as 'small' | 'medium',
  depth: [0.5, 1][Math.floor(Math.random() * 2)],
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`
}))

const partenaires = [
  {
    nom: "DreamZ Production",
    description: "Studio de production spécialisé en photographie et vidéo",
    image: "/autresphotos/dreamz.jpg",
    lien: "https://www.instagram.com/dreamzproduction.fr/"
  }
]

const GlareCard = ({
  children,
  className,
  imageUrl
}: {
  children: React.ReactNode;
  className?: string;
  imageUrl: string;
}) => {
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  });

  const containerStyle = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--bg-x": "50%",
    "--bg-y": "50%",
    "--duration": "300ms",
    "--foil-size": "100%",
    "--opacity": "0",
    "--radius": "12px",
    "--easing": "ease",
    "--transition": "var(--duration) var(--easing)",
  } as any;

  const updateStyles = () => {
    if (refElement.current) {
      const { background, rotate, glare } = state.current;
      refElement.current?.style.setProperty("--m-x", `${glare.x}%`);
      refElement.current?.style.setProperty("--m-y", `${glare.y}%`);
      refElement.current?.style.setProperty("--r-x", `${rotate.x}deg`);
      refElement.current?.style.setProperty("--r-y", `${rotate.y}deg`);
      refElement.current?.style.setProperty("--bg-x", `${background.x}%`);
      refElement.current?.style.setProperty("--bg-y", `${background.y}%`);
    }
  };

  return (
    <div
      style={containerStyle}
      className="relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform w-full max-w-sm aspect-[4/5]"
      ref={refElement}
      onPointerMove={(event) => {
        const rotateFactor = 0.4;
        const rect = event.currentTarget.getBoundingClientRect();
        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        const percentage = {
          x: (100 / rect.width) * position.x,
          y: (100 / rect.height) * position.y,
        };
        const delta = {
          x: percentage.x - 50,
          y: percentage.y - 50,
        };

        const { background, rotate, glare } = state.current;
        background.x = 50 + percentage.x / 4 - 12.5;
        background.y = 50 + percentage.y / 3 - 16.67;
        rotate.x = -(delta.x / 3.5);
        rotate.y = delta.y / 2;
        rotate.x *= rotateFactor;
        rotate.y *= rotateFactor;
        glare.x = percentage.x;
        glare.y = percentage.y;

        updateStyles();
      }}
      onPointerEnter={() => {
        isPointerInside.current = true;
        if (refElement.current) {
          setTimeout(() => {
            if (isPointerInside.current) {
              refElement.current?.style.setProperty("--duration", "0s");
            }
          }, 300);
        }
      }}
      onPointerLeave={() => {
        isPointerInside.current = false;
        if (refElement.current) {
          refElement.current.style.removeProperty("--duration");
          refElement.current?.style.setProperty("--r-x", `0deg`);
          refElement.current?.style.setProperty("--r-y", `0deg`);
        }
      }}
    >
      <div className="h-full grid will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] border-2 border-orange-500/30 hover:[--opacity:0.6] hover:[--duration:200ms] hover:[--easing:linear] hover:filter-none overflow-hidden">
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))]">
          <div className={cn("h-full w-full bg-black relative", className)}>
            <img 
              src={imageUrl} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            {children}
          </div>
        </div>
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_1px_0_round_var(--radius))] opacity-[var(--opacity)] transition-opacity transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,0.8)_10%,_rgba(255,255,255,0.65)_20%,_rgba(255,255,255,0)_90%)]" />
      </div>
    </div>
  );
};

export default function PartenairesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animation des images flottantes */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-0">
        <FloatingImagesContainer sensitivity={-0.5} className="overflow-hidden">
          {PARTENAIRES_IMAGES.map((img, index) => (
            <FloatingImage
              key={index}
              src={img.url}
              size={img.size}
              depth={img.depth}
              top={img.top}
              left={img.left}
              className="opacity-50 hover:opacity-90"
            />
          ))}
        </FloatingImagesContainer>
      </div>

      {/* Overlay de dégradé */}
      <GradientOverlay 
        fromColor="from-orange-500/30" 
        toColor="to-black/80"
        direction="bg-gradient-to-b"
      />

      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
            Le jury et nos partenaires
          </h1>
          <p className="text-xl text-[#EAE2B7] max-w-2xl mx-auto">
            Découvrez le jury et les partenaires qui soutiennent PortraitFr Awards 2025
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {partenaires.map((partenaire, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="w-full"
            >
              <a href={partenaire.lien} target="_blank" rel="noopener noreferrer">
                <GlareCard imageUrl={partenaire.image}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h3 className="text-2xl font-bold text-orange-500 mb-2">{partenaire.nom}</h3>
                    <p className="text-[#EAE2B7]">{partenaire.description}</p>
                  </div>
                </GlareCard>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-[#EAE2B7] mb-6">
            Vous souhaitez devenir partenaire ?
          </p>
          <a 
            href="mailto:partenariats@portraitfr.fr" 
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors"
          >
            Contactez-nous
          </a>
        </motion.div>
      </div>
    </div>
  )
}