"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import { FiMenu, FiX, FiUser, FiShoppingBag, FiHome, FiInfo, FiPhone, FiLogOut } from "react-icons/fi"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
  }`

  const navLinks = [
    { name: "Home", href: "/", icon: <FiHome /> },
    { name: "Makeup", href: "/services/makeup", icon: <FiShoppingBag /> },
    { name: "Jewellery", href: "/services/jewellery", icon: <FiShoppingBag /> },
    { name: "Lehengas", href: "/services/lehengas", icon: <FiShoppingBag /> },
    { name: "About", href: "/about", icon: <FiInfo /> },
    { name: "Contact", href: "/contact", icon: <FiPhone /> },
  ]

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="text-2xl font-bold text-pink-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              NARI GLAM
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <motion.span
                  className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="relative group">
                <motion.button
                  className="flex items-center space-x-2 bg-pink-50 hover:bg-pink-100 text-pink-600 px-4 py-2 rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiUser />
                  <span>{session.user.name?.split(" ")[0] || "User"}</span>
                </motion.button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                  <Link href="/profile">
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50">Profile</div>
                  </Link>
                  <Link href="/bookings">
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50">My Bookings</div>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <motion.button
                    className="text-pink-600 hover:text-pink-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/auth/register">
                  <motion.button
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full transition-colors shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={closeMenu}>
                  <motion.div
                    className="flex items-center space-x-2 py-3 border-b border-gray-100 text-gray-700 hover:text-pink-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </motion.div>
                </Link>
              ))}

              {session ? (
                <>
                  <Link href="/profile" onClick={closeMenu}>
                    <motion.div
                      className="flex items-center space-x-2 py-3 border-b border-gray-100 text-gray-700 hover:text-pink-600 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <FiUser />
                      <span>Profile</span>
                    </motion.div>
                  </Link>
                  <Link href="/bookings" onClick={closeMenu}>
                    <motion.div
                      className="flex items-center space-x-2 py-3 border-b border-gray-100 text-gray-700 hover:text-pink-600 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <FiShoppingBag />
                      <span>My Bookings</span>
                    </motion.div>
                  </Link>
                  <motion.button
                    onClick={() => {
                      signOut()
                      closeMenu()
                    }}
                    className="flex items-center space-x-2 py-3 w-full text-left text-gray-700 hover:text-pink-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <FiLogOut />
                    <span>Sign Out</span>
                  </motion.button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 mt-4">
                  <Link href="/auth/login" onClick={closeMenu}>
                    <motion.button
                      className="w-full bg-white border border-pink-600 text-pink-600 py-2 rounded-full transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link href="/auth/register" onClick={closeMenu}>
                    <motion.button
                      className="w-full bg-pink-600 text-white py-2 rounded-full transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Register
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
