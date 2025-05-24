"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi"

export default function LehengaRentalsPage() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([5000, 100000])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [sortBy, setSortBy] = useState("popular")

  const categories = ["Bridal", "Party", "Reception", "Engagement", "Festival", "Designer"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
  const colors = ["Red", "Pink", "Blue", "Green", "Yellow", "Purple", "Gold", "Silver", "Maroon", "Orange"]

  const lehengaItems = [
    {
      id: 1,
      name: "Royal Bridal Lehenga",
      description: "Stunning red bridal lehenga with heavy embroidery and zardozi work.",
      price: 25000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Bridal",
      size: "M",
      color: "Red",
      popular: true,
      rentalDays: "3 days",
      designer: "Sabyasachi",
    },
    {
      id: 2,
      name: "Pink Party Lehenga",
      description: "Beautiful pink lehenga perfect for parties and celebrations.",
      price: 12000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Party",
      size: "S",
      color: "Pink",
      popular: true,
      rentalDays: "2 days",
      designer: "Manish Malhotra",
    },
    {
      id: 3,
      name: "Blue Reception Lehenga",
      description: "Elegant blue lehenga with mirror work and sequins.",
      price: 18000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Reception",
      size: "L",
      color: "Blue",
      popular: false,
      rentalDays: "2 days",
      designer: "Anita Dongre",
    },
    {
      id: 4,
      name: "Green Engagement Lehenga",
      description: "Traditional green lehenga with gold embroidery.",
      price: 15000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Engagement",
      size: "M",
      color: "Green",
      popular: true,
      rentalDays: "2 days",
      designer: "Ritu Kumar",
    },
    {
      id: 5,
      name: "Yellow Festival Lehenga",
      description: "Vibrant yellow lehenga perfect for festivals and celebrations.",
      price: 10000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Festival",
      size: "S",
      color: "Yellow",
      popular: false,
      rentalDays: "1 day",
      designer: "Tarun Tahiliani",
    },
    {
      id: 6,
      name: "Purple Designer Lehenga",
      description: "Contemporary purple lehenga with modern cuts and designs.",
      price: 22000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Designer",
      size: "L",
      color: "Purple",
      popular: true,
      rentalDays: "3 days",
      designer: "Rohit Bal",
    },
  ]

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleSize = (size) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const toggleColor = (color) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange]
    newRange[index] = Number.parseInt(e.target.value)
    setPriceRange(newRange)
  }

  const filteredItems = lehengaItems
    .filter(
      (item) =>
        (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
        (selectedSizes.length === 0 || selectedSizes.includes(item.size)) &&
        (selectedColors.length === 0 || selectedColors.includes(item.color)) &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1],
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
            Lehenga Rentals
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Rent designer lehengas for your special occasions. From bridal to party wear, find the perfect lehenga that
            makes you look stunning without the hefty price tag.
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
                  min="5000"
                  max="100000"
                  step="5000"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full accent-pink-600"
                />
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
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

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Sizes</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`py-2 px-3 text-sm font-medium rounded-md border ${
                      selectedSizes.includes(size)
                        ? "bg-pink-600 text-white border-pink-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Colors</h3>
              <div className="grid grid-cols-3 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`py-2 px-3 text-sm font-medium rounded-md border ${
                      selectedColors.includes(color)
                        ? "bg-pink-600 text-white border-pink-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {color}
                  </button>
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

          {/* Items Grid */}
          <div className="lg:w-3/4">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No lehengas found</h3>
                <p className="text-gray-600">Try adjusting your filters to find what you are looking for.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="relative h-64">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      {item.popular && (
                        <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
                          Popular
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        Size: {item.size}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-2">{item.description}</p>
                      <p className="text-sm text-gray-500 mb-2">Designer: {item.designer}</p>
                      <p className="text-sm text-gray-500 mb-4">Rental: {item.rentalDays}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-pink-600">₹{item.price.toLocaleString()}</span>
                        <Link href={`/services/lehengas/${item.id}`}>
                          <motion.button
                            className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Rent Now
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
