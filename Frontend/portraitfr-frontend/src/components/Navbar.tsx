"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const publicNavItems = [
  { label: "Accueil", href: "/" },
  { label: "Inscription", href: "/participer" },
  { label: "Focus", href: "/focus" },
  { label: "Billeterie", href: "/billet" },
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
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${pathname === item.href ? "text-orange" : "text-white hover:text-orange/80"}`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-orange rounded-full" />
                )}
              </Link>
            ))}

            {/* Menu déroulant Infos */}
            <div className="relative group">
              <button
                onClick={() => setInfosOpen(!infosOpen)}
                className="relative px-3 py-2 text-sm font-medium text-white hover:text-orange/80 transition"
              >
                Infos
              </button>
              <div className="absolute hidden group-hover:block mt-2 bg-black border border-gray-700 rounded-md shadow-lg min-w-[150px]">
                {infosDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {showAdminItems && adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-orange transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {publicNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition ${pathname === item.href ? "bg-orange/10 text-orange border-l-4 border-orange" : "text-white hover:bg-gray-800/50"}`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-700 pt-2">
                {infosDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="block px-3 py-3 rounded-lg text-base font-medium text-white hover:bg-gray-800/50 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              {showAdminItems && adminNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="block px-3 py-3 rounded-lg text-base font-medium text-gray-400 hover:bg-gray-800/50 transition"
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
