"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi"

export default function MakeupServicesPage() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([1000, 20000])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedOccasions, setSelectedOccasions] = useState([])
  const [sortBy, setSortBy] = useState("popular")

  const categories = ["Bridal", "Party", "Engagement", "Reception", "Pre-wedding"]
  const occasions = ["Wedding", "Festival", "Corporate", "Casual", "Photoshoot"]

  const makeupServices = [
    {
      id: 1,
      name: "Bridal Makeup",
      description: "Complete bridal makeup with hairstyling for your special day.",
      price: 15000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Bridal",
      occasion: "Wedding",
      popular: true,
    },
    {
      id: 2,
      name: "Party Makeup",
      description: "Glamorous makeup for parties and special events.",
      price: 5000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Party",
      occasion: "Festival",
      popular: true,
    },
    {
      id: 3,
      name: "Engagement Makeup",
      description: "Elegant makeup for engagement ceremonies.",
      price: 8000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Engagement",
      occasion: "Wedding",
      popular: false,
    },
    {
      id: 4,
      name: "Reception Makeup",
      description: "Stunning makeup for wedding receptions.",
      price: 10000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Reception",
      occasion: "Wedding",
      popular: true,
    },
    {
      id: 5,
      name: "Pre-wedding Photoshoot Makeup",
      description: "Perfect makeup for pre-wedding photoshoots.",
      price: 7000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Pre-wedding",
      occasion: "Photoshoot",
      popular: false,
    },
    {
      id: 6,
      name: "Corporate Event Makeup",
      description: "Professional makeup for corporate events and meetings.",
      price: 4000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Party",
      occasion: "Corporate",
      popular: false,
    },
  ]

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleOccasion = (occasion) => {
    setSelectedOccasions((prev) => (prev.includes(occasion) ? prev.filter((o) => o !== occasion) : [...prev, occasion]))
  }

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange]
    newRange[index] = Number.parseInt(e.target.value)
    setPriceRange(newRange)
  }

  const filteredServices = makeupServices
    .filter(
      (service) =>
        (selectedCategories.length === 0 || selectedCategories.includes(service.category)) &&
        (selectedOccasions.length === 0 || selectedOccasions.includes(service.occasion)) &&
        service.price >= priceRange[0] &&
        service.price <= priceRange[1],
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "popular") return b.popular - a.popular
      return 0
    })

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
            Makeup Services
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Professional makeup services for all occasions. Our expert makeup artists use premium products to create
            stunning looks tailored to your style.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700"
            >
              <FiFilter />
              <span>Filters</span>
              {filterOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>

          {/* Filters Sidebar */}
          <motion.div
            className={`lg:w-1/4 bg-white rounded-lg shadow-md p-6 ${filterOpen ? "block" : "hidden lg:block"}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              <button onClick={() => setFilterOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
                <FiX />
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="1000"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full accent-pink-600"
                />
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full accent-pink-600"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Occasions */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Occasions</h3>
              <div className="space-y-2">
                {occasions.map((occasion) => (
                  <div key={occasion} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`occasion-${occasion}`}
                      checked={selectedOccasions.includes(occasion)}
                      onChange={() => toggleOccasion(occasion)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`occasion-${occasion}`} className="ml-2 text-gray-700">
                      {occasion}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="popular">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="lg:w-3/4">
            {filteredServices.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
                <p className="text-gray-600">Try adjusting your filters to find what you re looking for.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="relative h-48">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />
                      {service.popular && (
                        <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
                          Popular
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-pink-600">₹{service.price.toLocaleString()}</span>
                        <Link href={`/services/makeup/${service.id}`}>
                          <motion.button
                            className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Book Now
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
