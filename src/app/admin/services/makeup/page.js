"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter } from "react-icons/fi"
import { useToast } from "@/components/ui/toaster"

export default function AdminMakeupServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const toast = useToast()

  // Mock data for makeup services
  const makeupServices = [
    {
      id: 1,
      name: "Bridal Makeup",
      description: "Complete bridal makeup with hairstyling for your special day.",
      price: 15000,
      image: "/placeholder.svg?height=100&width=100",
      category: "Bridal",
      popular: true,
    },
    {
      id: 2,
      name: "Party Makeup",
      description: "Glamorous makeup for parties and special events.",
      price: 5000,
      image: "/placeholder.svg?height=100&width=100",
      category: "Party",
      popular: true,
    },
    {
      id: 3,
      name: "Engagement Makeup",
      description: "Elegant makeup for engagement ceremonies.",
      price: 8000,
      image: "/placeholder.svg?height=100&width=100",
      category: "Engagement",
      popular: false,
    },
    {
      id: 4,
      name: "Reception Makeup",
      description: "Stunning makeup for wedding receptions.",
      price: 10000,
      image: "/placeholder.svg?height=100&width=100",
      category: "Reception",
      popular: true,
    },
    {
      id: 5,
      name: "Pre-wedding Photoshoot Makeup",
      description: "Perfect makeup for pre-wedding photoshoots.",
      price: 7000,
      image: "/placeholder.svg?height=100&width=100",
      category: "Pre-wedding",
      popular: false,
    },
  ]

  // Filter services based on search term and category filter
  const filteredServices = makeupServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleDeleteService = (id) => {
    // In a real app, this would be an API call
    toast.success({
      title: "Service deleted",
      description: `Service ID ${id} has been deleted.`,
    })
  }

  const categories = ["Bridal", "Party", "Engagement", "Reception", "Pre-wedding"]

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Makeup Services</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your makeup service offerings</p>
        </div>
        <Link href="/admin/services/makeup/add">
          <motion.button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus className="mr-2 -ml-1 h-5 w-5" />
            Add Service
          </motion.button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2 sm:w-64">
          <FiFilter className="h-5 w-5 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Services List */}
      <motion.div
        className="mt-6 bg-white shadow overflow-hidden sm:rounded-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ul className="divide-y divide-gray-200">
          {filteredServices.length === 0 ? (
            <li className="px-6 py-4 text-center text-sm text-gray-500">No services found</li>
          ) : (
            filteredServices.map((service) => (
              <li key={service.id}>
                <div className="px-6 py-4 flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 relative">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      fill
                      className="rounded-md object-cover"
                    />
                    {service.popular && (
                      <div className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-bold px-1 py-0.5 rounded-bl">
                        Popular
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.description}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <p className="text-lg font-bold text-pink-600">₹{service.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{service.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <Link href={`/admin/services/makeup/edit/${service.id}`}>
                      <motion.button
                        className="p-2 text-blue-600 hover:text-blue-900"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiEdit className="h-5 w-5" />
                      </motion.button>
                    </Link>
                    <motion.button
                      onClick={() => handleDeleteService(service.id)}
                      className="p-2 text-red-600 hover:text-red-900"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </motion.div>
    </div>
  )
}
