"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { FiArrowRight } from "react-icons/fi"

export default function RentalsPage() {
  const rentalCategories = [
    {
      id: 1,
      title: "Jewellery Rentals",
      description: "Exquisite jewellery pieces to complement your outfit and style.",
      image: "/placeholder.svg?height=300&width=400",
      link: "/services/jewellery",
      items: ["Necklace Sets", "Earrings", "Bangles", "Maang Tikka", "Nose Rings", "Anklets"],
    },
    {
      id: 2,
      title: "Lehenga Rentals",
      description: "Premium lehengas for weddings, engagements, and festive occasions.",
      image: "/placeholder.svg?height=300&width=400",
      link: "/services/lehengas",
      items: ["Bridal Lehengas", "Party Lehengas", "Designer Lehengas", "Festival Wear", "Reception Outfits"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Rental Services
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover our premium rental collection featuring exquisite jewellery and designer lehengas. Perfect for
            weddings, parties, and special occasions.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {rentalCategories.map((category) => (
            <motion.div
              key={category.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              <div className="relative h-64 w-full">
                <Image src={category.image || "/placeholder.svg"} alt={category.title} fill className="object-cover" />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{category.title}</h2>
                <p className="text-gray-600 mb-6">{category.description}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Available Items:</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href={category.link}>
                  <motion.div
                    className="inline-flex items-center text-pink-600 font-medium hover:text-pink-700 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Explore Collection <FiArrowRight className="ml-2" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mt-16 bg-white rounded-xl shadow-lg p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose Our Rentals?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                All our rental items are carefully curated and maintained to ensure the highest quality for your special
                occasions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Affordable Luxury</h3>
              <p className="text-gray-600">
                Experience designer pieces and premium jewellery at a fraction of the purchase price through our rental
                service.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Convenient Delivery</h3>
              <p className="text-gray-600">
                We provide doorstep delivery and pickup services, making your rental experience hassle-free and
                convenient.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
