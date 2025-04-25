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
  { label: "Focus", href: "/focus" },
  { label: "Billetterie", href: "/billet" },
  { label: "Contact", href: "/contact" },
]

const infosDropdownItems = [
  { label: "FAQ", href: "/infos/faq" },
  { label: "Awards", href: "/infos/awards" },
  { label: "Partenaires", href: "/infos/partenaires" },
]

const adminNavItems = [
  { label: "Participants", href: "/participants" }
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [infosOpen, setInfosOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const showAdminItems = process.env.NODE_ENV === 'development'

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-orange/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            onClick={closeMenu}
          >
            <div className="relative w-10 h-10">
              <Image 
                src="/fontanime/logo.PNG" 
                alt="Logo PortraitFr" 
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
          </Link>

          {/* Version desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${pathname === item.href ? "text-orange" : "text-white hover:text-orange/80"}`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.span 
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-orange rounded-full"
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
                className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 ${infosOpen || infosDropdownItems.some(item => pathname === item.href) ? "text-orange" : "text-white hover:text-orange/80"}`}
              >
                Infos
                <ChevronDown 
                  size={16} 
                  className={`ml-1 transition-transform duration-200 ${infosOpen ? 'rotate-180' : ''}`}
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
                    className="absolute left-0 mt-2 w-48 bg-black/95 backdrop-blur-sm border border-orange/20 rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    {infosDropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-3 text-sm transition ${pathname === item.href ? "bg-orange/10 text-orange" : "text-white hover:bg-gray-800/50"}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {showAdminItems && adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium ${pathname === item.href ? "text-orange" : "text-gray-400 hover:text-orange transition"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Bouton menu mobile */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-white hover:text-orange focus:outline-none transition"
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
            <div className="px-4 pt-2 pb-6 space-y-1">
              {publicNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition ${pathname === item.href ? "bg-orange/10 text-orange border-l-4 border-orange" : "text-white hover:bg-gray-800/50"}`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Menu déroulant Infos - Mobile */}
              <div className="pt-1">
                <button
                  onClick={() => setInfosOpen(!infosOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition ${infosOpen || infosDropdownItems.some(item => pathname === item.href) ? "bg-orange/10 text-orange" : "text-white hover:bg-gray-800/50"}`}
                >
                  Infos
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-200 ${infosOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                <AnimatePresence>
                  {infosOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 mt-1 space-y-1 overflow-hidden"
                    >
                      {infosDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition ${pathname === item.href ? "bg-orange/10 text-orange" : "text-white hover:bg-gray-800/50"}`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {showAdminItems && adminNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition ${pathname === item.href ? "bg-orange/10 text-orange" : "text-gray-400 hover:bg-gray-800/50"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}