'use client'
import { FloatingImagesContainer, FloatingImage } from "@/components/FloatingImages/FloatingImages"
import { GradientOverlay } from "@/components/GradientOverlay/GradientOverlay"
import { motion } from "framer-motion"

const CGU_IMAGES = Array.from({ length: 8 }, (_, i) => ({
  url: `/siteimages/img${i + 1}.webp`,
  size: ['small', 'medium'][Math.floor(Math.random() * 2)] as 'small' | 'medium',
  depth: [0.5, 1][Math.floor(Math.random() * 2)],
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`
}))

export default function CGUPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animation des images flottantes */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        <FloatingImagesContainer sensitivity={-0.5} className="overflow-hidden">
          {CGU_IMAGES.map((img, index) => (
            <FloatingImage
              key={index}
              src={img.url}
              size={img.size}
              depth={img.depth}
              top={img.top}
              left={img.left}
              className="opacity-40 hover:opacity-70"
            />
          ))}
        </FloatingImagesContainer>
      </div>

      {/* Overlay de dégradé */}
      <GradientOverlay 
        fromColor="from-orange-500/20" 
        toColor="to-black/90"
        direction="bg-gradient-to-b"
      />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-[#EAE2B7]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-black/70 backdrop-blur-sm border border-orange-500/30 rounded-xl shadow-lg p-6 md:p-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 text-center">
            CONDITIONS GÉNÉRALES D'UTILISATION
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="mb-6">
              <strong>PortraitFr</strong> (ci-après « PortraitFr »), est une association loi 1901 qui édite un site internet (ci-après le « Site ») dédié à la promotion, l'organisation et la diffusion de la cérémonie annuelle PortraitFr Awards (ci-après la « Cérémonie »). Ce site permet un accès à diverses informations relatives à la Cérémonie ainsi qu'à la plateforme de participation et de vote (ci-après la « Plateforme »), nécessitant la création d'un compte utilisateur.
            </p>

            <p className="mb-8">
              Les présentes conditions générales d'utilisation (ci-après « CGU ») ont pour objet de définir les modalités d'utilisation du Site et des différents services (ci-après les « Services »). La navigation sur le Site et/ou l'inscription à un Service emporte l'acceptation pleine et entière des CGU par l'utilisateur.
            </p>

            <h2 className="text-2xl font-bold text-orange-500 mt-8 mb-4">ARTICLE 1 - PRÉAMBULE</h2>
            <p className="mb-6">
              En cas de non-respect des CGU, PortraitFr se réserve le droit de prendre toutes les mesures nécessaires à la protection de ses intérêts.
            </p>

            <h2 className="text-2xl font-bold text-orange-500 mt-8 mb-4">ARTICLE 2 - PRÉSENTATION DU SITE</h2>
            <p className="mb-4">
              Le Site permet notamment à l'Utilisateur :
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>La consultation des contenus informatifs concernant PortraitFr et la Cérémonie PortraitFr Awards</li>
              <li>L'accès à une plateforme de candidature et de vote</li>
              <li>La diffusion gratuite de la Cérémonie PortraitFr Awards</li>
            </ul>
            <p>
              Le Site est également un outil de mise en relation entre la communauté artistique (photographes, modèles, maquilleurs, etc.) et l'association PortraitFr.
            </p>

            <h2 className="text-2xl font-bold text-orange-500 mt-8 mb-4">ARTICLE 3 - ACCÈS AUX SERVICES</h2>
            <p className="mb-6">
              L'accès aux Services est réservé aux personnes majeures. PortraitFr se réserve le droit de demander une preuve d'identité pour vérifier l'âge des participants.
            </p>

            <h2 className="text-2xl font-bold text-orange-500 mt-8 mb-4">ARTICLE 4 - LOI APPLICABLE ET JURIDICTION COMPÉTENTE</h2>
            <p className="mb-6">
              Les présentes CGU sont régies par la loi française. En cas de litige, les tribunaux français seront seuls compétents.
            </p>

            <h2 className="text-2xl font-bold text-orange-500 mt-8 mb-4">ARTICLE 5 - MODIFICATION DES CGU</h2>
            <p className="mb-6">
              PortraitFr se réserve le droit de modifier les présentes CGU à tout moment. Toute modification prendra effet immédiatement dès sa publication en ligne sur le Site.
            </p>

            <div className="mt-12 pt-6 border-t border-orange-500/30">
              <p className="text-sm text-gray-400">
                Dernière mise à jour : 01 juin 2025
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}