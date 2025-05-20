"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { FiCheck } from "react-icons/fi"

export default function AboutSection() {
  const features = [
    "Professional makeup artists with years of experience",
    "Premium quality makeup products and tools",
    "Extensive collection of designer jewellery for rent",
    "Curated selection of lehengas for all occasions",
    "Personalized service tailored to your needs",
    "Flexible booking options to suit your schedule",
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="About Glamour Rentals"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Glamour Rentals</h2>
            <p className="text-gray-600 mb-8">
              At Glamour Rentals, we believe that every woman deserves to look and feel her best on special occasions.
              Our mission is to provide premium makeup services and high-quality rental options for jewellery and
              lehengas that make you shine without breaking the bank.
            </p>
            <p className="text-gray-600 mb-8">
              Founded in 2018, we have served over 1,000 clients including brides, bridesmaids, and party-goers. Our
              team of professional makeup artists and style consultants are dedicated to helping you achieve the perfect
              look for your special day.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <FiCheck className="text-pink-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
