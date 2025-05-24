"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-r from-rose-50 to-pink-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pink-200"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-rose-200"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-pink-100"></div>
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between relative z-10">
        <motion.div
          className="md:w-1/2 pt-20 md:pt-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Elevate Your <span className="text-pink-600">Beauty</span> & <span className="text-pink-600">Style</span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Premium makeup services and exquisite rental collection for your special occasions. Make every moment
            unforgettable.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/services/makeup">
              <motion.button
                className="px-8 py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition-all shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Makeup
              </motion.button>
            </Link>
            <Link href="/services/rentals">
              <motion.button
                className="px-8 py-3 bg-white text-pink-600 border border-pink-600 rounded-full font-medium hover:bg-pink-50 transition-all shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Rentals
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:w-1/2 mt-12 md:mt-0 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative h-[400px] md:h-[500px] w-full">
            <Image
              src="/indianbride.jpeg?height=500&width=500"
              alt="Bridal Makeup and Jewelry"
              fill
              className="object-cover rounded-lg shadow-2xl"
              priority
            />
          </div>

          <motion.div
            className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="text-sm font-medium text-gray-800">Trusted by</p>
            <p className="text-2xl font-bold text-pink-600">500+ Brides</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
