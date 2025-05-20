"use client"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiBarChart2,
} from "react-icons/fi"
import { useToast } from "@/components/ui/toaster"

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const toast = useToast()

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
    }
    setIsAuthenticating(false)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()

    // Hardcoded credentials as per requirements
    if (username === "aditya" && password === "12345") {
      setIsAuthenticated(true)
      localStorage.setItem("adminAuth", "true")
      toast.success({
        title: "Login successful",
        description: "Welcome to the admin panel.",
      })
    } else {
      toast.error({
        title: "Login failed",
        description: "Invalid username or password.",
      })
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminAuth")
    setSidebarOpen(false)
    toast.info({
      title: "Logged out",
      description: "You have been logged out of the admin panel.",
    })
    router.push("/admin")
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <FiHome size={20} /> },
    { name: "Bookings", href: "/admin/bookings", icon: <FiCalendar size={20} /> },
    { name: "Makeup Services", href: "/admin/services/makeup", icon: <FiShoppingBag size={20} /> },
    { name: "Jewellery Rentals", href: "/admin/services/jewellery", icon: <FiShoppingBag size={20} /> },
    { name: "Lehenga Rentals", href: "/admin/services/lehengas", icon: <FiShoppingBag size={20} /> },
    { name: "Customers", href: "/admin/customers", icon: <FiUsers size={20} /> },
    { name: "Analytics", href: "/admin/analytics", icon: <FiBarChart2 size={20} /> },
    { name: "Settings", href: "/admin/settings", icon: <FiSettings size={20} /> },
  ]

  if (isAuthenticating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-pink-600 hover:text-pink-700 text-sm">
              Return to Website
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-700"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center justify-between px-4">
                  <div className="text-xl font-bold text-pink-600">Admin Panel</div>
                  <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <FiX size={24} />
                  </button>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}>
                      <div
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          pathname === item.href
                            ? "bg-pink-100 text-pink-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <div className="mr-4">{item.icon}</div>
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-gray-900">
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="text-xl font-bold text-pink-600">Admin Panel</div>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      pathname === item.href
                        ? "bg-pink-100 text-pink-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="mr-3">{item.icon}</div>
                    {item.name}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-gray-900 text-sm">
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1 pb-8">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
