"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { FiArrowRight } from "react-icons/fi"

export default function ServiceSection() {
  const services = [
    {
      id: 1,
      title: "Makeup Services",
      description: "Professional makeup for weddings, parties, and special occasions.",
      image: "/makeyoservice.jpeg?height=300&width=400",
      link: "/services/makeup",
    },
    {
      id: 2,
      title: "Jewellery Rentals",
      description: "Exquisite jewellery pieces to complement your outfit and style.",
      image: "/jewellery.jpeg?height=300&width=400",
      link: "/services/jewellery",
    },
    {
      id: 3,
      title: "Lehenga Rentals",
      description: "Premium lehengas for weddings, engagements, and festive occasions.",
      image: "/lehenga.jpg?height=300&width=400",
      link: "/services/lehengas",
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Premium Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our range of high-quality services designed to make your special occasions truly memorable.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              <div className="relative h-64 w-full">
                <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link href={service.link}>
                  <motion.div className="inline-flex items-center text-pink-600 font-medium" whileHover={{ x: 5 }}>
                    Explore <FiArrowRight className="ml-2" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
