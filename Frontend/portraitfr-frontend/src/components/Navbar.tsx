"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const publicNavItems = [
  { label: "Accueil", href: "/" },
  { label: "Inscription", href: "/participer" },
  { label: "Awards", href: "/infos/awards" }, 
  { label: "Podcast Focus", href: "/focus" },
  { label: "Billetterie", href: "/billet" },
  
]

const infosDropdownItems = [
  { label: "Partenaires & Jury", href: "/infos/partenaires" },
  { label: "Contact", href: "/contact" },
  { label: "CGU", href: "/infos/cgu" },

]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [infosOpen, setInfosOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
<nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10 shadow-lg">
      {/* Texture de grain */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/siteimages/grain.png')] mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20"> {/* Hauteur augmentée */}
          {/* Logo fixe avec espacement */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="relative h-12 w-12 block">
              <Image
                src="/fontanime/logo.PNG"
                alt="Logo PortraitFr"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Version desktop - Espacement augmenté */}
          <div className="hidden md:flex items-center space-x-6"> {/* Espacement passé à space-x-6 */}
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-4 text-sm font-medium transition-all duration-300 ${
                  pathname === item.href 
                    ? "text-orange" 
                    : "text-[#EAE2B7]  hover:text-orange"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.span 
                    layoutId="navIndicator"
                    className="absolute bottom-3 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-orange rounded-full"
                  />
                )}
              </Link>
            ))}

            {/* Menu déroulant Infos - Desktop */}
            <div className="relative">
              <button
                onMouseEnter={() => setInfosOpen(true)}
                onMouseLeave={() => setInfosOpen(false)}
                onClick={() => setInfosOpen(!infosOpen)}
                className={`flex items-center px-3 py-4 text-sm font-medium transition-all duration-300 ${
                  infosOpen || infosDropdownItems.some(item => pathname === item.href) 
                    ? "text-orange" 
                    : "text-[#EAE2B7]  hover:text-orange"
                }`}
              >
                Infos
                <ChevronDown 
                  size={16} 
                  className={`ml-1 transition-transform duration-200 ${
                    infosOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {infosOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setInfosOpen(true)}
                    onMouseLeave={() => setInfosOpen(false)}
                    className="absolute left-0 mt-1 w-48 bg-black/95 backdrop-blur-sm border border-orange/20 rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    {infosDropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-3 text-sm transition ${
                          pathname === item.href 
                            ? "bg-orange/10 text-orange" 
                            : "text-[#EAE2B7]  hover:bg-gray-800/50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bouton menu mobile */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-[#EAE2B7]  hover:text-orange focus:outline-none transition"
            aria-label="Menu"
          >
            {isOpen ? (
              <X size={24} className="text-orange" />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Version mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 space-y-2"> {/* Espacement augmenté */}
              {publicNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`block px-4 py-4 rounded-lg text-base font-medium transition ${
                    pathname === item.href 
                      ? "bg-orange/10 text-orange border-l-4 border-orange" 
                      : "text-[#EAE2B7]  hover:bg-gray-800/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Menu déroulant Infos - Mobile */}
              <div className="pt-2">
                <button
                  onClick={() => setInfosOpen(!infosOpen)}
                  className={`flex items-center justify-between w-full px-4 py-4 rounded-lg text-base font-medium transition ${
                    infosOpen || infosDropdownItems.some(item => pathname === item.href) 
                      ? "bg-orange/10 text-orange" 
                      : "text-[#EAE2B7]  hover:bg-gray-800/50"
                  }`}
                >
                  Infos
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-200 ${
                      infosOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {infosOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-6 mt-2 space-y-2 overflow-hidden"
                    >
                      {infosDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition ${
                            pathname === item.href 
                              ? "bg-orange/10 text-orange" 
                              : "text-[#EAE2B7]  hover:bg-gray-800/50"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}