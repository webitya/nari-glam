"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { FiCheck, FiAward, FiUsers, FiHeart } from "react-icons/fi"

export default function AboutPage() {
  const features = [
    "Professional makeup artists with years of experience",
    "Premium quality makeup products and tools",
    "Extensive collection of designer jewellery for rent",
    "Curated selection of lehengas for all occasions",
    "Personalized service tailored to your needs",
    "Flexible booking options to suit your schedule",
    "Doorstep delivery and pickup services",
    "Insurance coverage for all rental items",
  ]

  const stats = [
    { icon: <FiUsers size={32} />, number: "1000+", label: "Happy Customers" },
    { icon: <FiAward size={32} />, number: "500+", label: "Successful Events" },
    { icon: <FiHeart size={32} />, number: "5", label: "Years of Excellence" },
  ]

  const team = [
    {
      name: "Priya Sharma",
      role: "Founder & Lead Makeup Artist",
      image: "/placeholder.svg?height=300&width=300",
      description: "With over 8 years of experience in bridal makeup and styling.",
    },
    {
      name: "Anita Verma",
      role: "Senior Makeup Artist",
      image: "/placeholder.svg?height=300&width=300",
      description: "Specializes in contemporary and traditional makeup styles.",
    },
    {
      name: "Meera Patel",
      role: "Styling Consultant",
      image: "/placeholder.svg?height=300&width=300",
      description: "Expert in jewellery and outfit coordination for special occasions.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Glamour Rentals
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We believe that every woman deserves to look and feel her best on special occasions. Our mission is to
            provide premium makeup services and high-quality rental options that make you shine without breaking the
            bank.
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 2018 by Priya Sharma, Glamour Rentals started as a small makeup studio with a vision to make
              luxury beauty services accessible to everyone. What began as a passion project has now grown into a
              comprehensive beauty and rental service that has served over 1,000 clients.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our journey has been driven by the belief that every special occasion deserves to be celebrated in style.
              We ve expanded our services to include not just professional makeup artistry, but also an extensive
              collection of designer jewellery and lehengas for rent, making luxury fashion accessible to all.
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
                  <span className="text-gray-700 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            To empower every woman to feel confident and beautiful on her special day by providing accessible luxury
            beauty services and rental options. We strive to make premium fashion and professional makeup artistry
            available to everyone, regardless of budget, while maintaining the highest standards of quality and service.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
