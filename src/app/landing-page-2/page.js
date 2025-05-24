"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  FaUserTie,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaCertificate,
  FaCamera,
  FaInstagram,
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaEye,
  FaHeart,
  FaAward,
  FaStar,
  FaCrown,
  FaGem,
  FaSun,
  FaMoon,
   FaWineGlass,

  FaRing,
  FaGraduationCap,
} from "react-icons/fa"
import { BiDiamond, BiUser } from "react-icons/bi"
import { BsFlower1 } from "react-icons/bs";

import { HiSparkles } from "react-icons/hi2";

export default function LuxuryCourse() {
  const curriculumItems = [
    { title: "Day Party Makeup", icon: FaSun, gradient: "from-amber-100 to-orange-100" },
    { title: "Night Party Glam Look", icon: FaMoon, gradient: "from-slate-100 to-gray-100" },
    { title: "Cocktail Makeup", icon:  FaWineGlass, gradient: "from-rose-100 to-pink-100" },
    { title: "Haldi Ceremony Makeup", icon: BsFlower1, gradient: "from-yellow-100 to-amber-100" },
    { title: "Engagement Look", icon: FaRing, gradient: "from-pink-100 to-rose-100" },
    { title: "Reception Makeup", icon: HiSparkles, gradient: "from-purple-100 to-violet-100" },
    { title: "Bridal Makeup (Basic + HD)", icon: FaCrown, gradient: "from-red-100 to-rose-100" },
    { title: "Groom Makeup", icon: FaUserTie, gradient: "from-blue-100 to-indigo-100" },
  ]

  const learningOutcomes = [
    "Advanced skin analysis & premium prep techniques",
    "Luxury product selection & professional application",
    "Flawless foundation & airbrush techniques",
    "Sculptural contouring & luminous highlighting",
    "Artistic eye makeup: Smokey, Cut Crease, Glitter artistry",
    "Premium lash application & extension techniques",
    "Sophisticated bridal hair styling",
    "Elegant draping: Saree, Dupatta, Lehenga styling",
    "Elite client consultation & luxury service standards",
    "High-fashion photography makeup mastery",
  ]

  const basicBrands = ["Forever 52", "Maybelline", "Lakmé", "Kryolan", "Recode"]
  const hdBrands = ["HUDA Beauty", "NARS", "Too Faced", "Charlotte Tilbury", "Pat McGrath Labs"]

  const courseIncludes = [
    {
      icon: FaCertificate,
      title: "Elite Certification",
      desc: "Prestigious industry-recognized certificate with gold seal",
      gradient: "from-emerald-50 to-teal-50",
    },
    {
      icon: FaCamera,
      title: "Luxury Portfolio",
      desc: "Professional photoshoot with premium styling",
      gradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: FaGem,
      title: "Premium Product Kit",
      desc: "Exclusive access to high-end makeup collection",
      gradient: "from-purple-50 to-violet-50",
    },
    {
      icon: FaInstagram,
      title: "Digital Mastery",
      desc: "Instagram growth strategy & personal branding",
      gradient: "from-pink-50 to-rose-50",
    },
    {
      icon: FaUsers,
      title: "VIP Model Sessions",
      desc: "Exclusive practice with professional models",
      gradient: "from-orange-50 to-red-50",
    },
    {
      icon: FaGraduationCap,
      title: "Masterclass Access",
      desc: "Lifetime access to advanced technique workshops",
      gradient: "from-yellow-50 to-orange-50",
    },
  ]

  const stats = [
    {
      icon: FaUsers,
      number: "500+",
      label: "Elite Students",
      gradient: "from-pink-50 to-rose-50",
    },
    {
      icon: BiUser,
      number: "3+",
      label: "Years Mastery",
      gradient: "from-purple-50 to-violet-50",
    },
    {
      icon: FaAward,
      number: "100+",
      label: "Luxury Bridal Looks",
      gradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: FaHeart,
      number: "4.9",
      label: "Excellence Rating",
      gradient: "from-yellow-50 to-orange-50",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-stone-50">
      {/* Compact Hero Section */}
      <section className="py-7 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div
              className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-4 shadow-sm border border-gray-100"
              variants={itemVariants}
            >
              <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full mr-3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <HiSparkles className="text-gray-500 mr-2 text-xs" />
              <span className="text-gray-600 font-medium text-sm">LUXURY CERTIFICATION PROGRAM</span>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-6xl font-light text-gray-900 leading-tight mb-4"
              variants={itemVariants}
            >
              Artistry Beyond
              <motion.span
                className="block font-normal text-gray-700 mt-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Imagination
              </motion.span>
            </motion.h1>

            <motion.p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-2xl mx-auto" variants={itemVariants}>
              Elevate your passion into a prestigious career with our exclusive makeup artistry mastery program
            </motion.p>

            {/* Compact Stats */}
            <motion.div className="grid grid-cols-4 gap-4 mb-8" variants={containerVariants}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:shadow-md transition-all duration-300`}
                    whileHover={{ rotate: 3 }}
                  >
                    <stat.icon className="text-gray-600 text-lg" />
                  </motion.div>
                  <div className="text-2xl font-semibold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-gray-500 text-xs font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-3 justify-center" variants={itemVariants}>
              <motion.button
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Begin Your Journey
              </motion.button>
              <motion.button
                className="bg-white text-gray-700 px-8 py-3 rounded-xl font-medium border border-gray-200 hover:border-gray-300 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Curriculum
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Compact Trainer Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <motion.div
                className="lg:w-1/3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <motion.div
                    className="w-48 h-48 bg-gradient-to-br from-gray-100 to-stone-100 rounded-2xl overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/placeholder.svg?height=192&width=192"
                      alt="Manisha Goswami"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 -right-2 bg-white rounded-xl p-2 shadow-md border border-gray-100"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">3+</div>
                      <div className="text-xs text-gray-500">Years</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="lg:w-2/3"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center bg-gray-50 rounded-full px-4 py-2 mb-4">
                  <FaUserTie className="text-gray-600 mr-2 text-sm" />
                  <span className="text-gray-700 font-medium text-sm">MASTER ARTISAN</span>
                </div>

                <h3 className="text-3xl font-light text-gray-900 mb-2">Manisha Goswami</h3>
                <p className="text-lg text-gray-600 mb-4">Luxury Makeup Artist & Elite Trainer</p>

                <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                  With over 3 years of prestigious experience in the luxury beauty industry, Manisha brings unparalleled
                  expertise in haute couture bridal makeup, high-fashion styling, and avant-garde makeup techniques.
                </p>

                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-900">500+</div>
                    <div className="text-gray-500 text-xs">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-900">100+</div>
                    <div className="text-gray-500 text-xs">Bridal Looks</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <span className="text-xl font-semibold text-gray-900">4.9</span>
                      <FaStar className="text-yellow-500 ml-1 text-sm" />
                    </div>
                    <div className="text-gray-500 text-xs">Rating</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compact Curriculum Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3" />
              <FaGem className="text-gray-500 mr-2 text-xs" />
              <span className="text-gray-600 font-medium text-sm">LUXURY CURRICULUM</span>
            </div>
            <h2 className="text-4xl font-light text-gray-900 mb-3">Mastery Modules</h2>
            <p className="text-gray-500">Comprehensive training in the art of luxury makeup</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {curriculumItems.map((item, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-all duration-300`}
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <item.icon className="text-gray-600 text-lg" />
                  </motion.div>
                  <h3 className="text-sm font-medium text-gray-900 text-center leading-tight">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Learning Outcomes */}
          <motion.div
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-light text-gray-900 text-center mb-8">Elite Learning Outcomes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningOutcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  className="flex items-center group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md transition-all duration-300"
                    whileHover={{ scale: 1.05, rotate: 3 }}
                  >
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </motion.div>
                  <span className="text-gray-700 text-sm">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compact Product Knowledge Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3" />
              <BiDiamond className="text-gray-500 mr-2" />
              <span className="text-gray-600 font-medium text-sm">LUXURY BRANDS</span>
            </div>
            <h2 className="text-4xl font-light text-gray-900 mb-3">Premium Brand Mastery</h2>
            <p className="text-gray-500">Train with the world s most prestigious makeup brands</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Brands */}
            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-6">
                <motion.div
                  className="w-14 h-14 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <FaEye className="text-blue-600 text-lg" />
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Foundation Brands</h3>
                <p className="text-gray-500 text-sm">Professional-grade products for everyday artistry</p>
              </div>
              <div className="space-y-2">
                {basicBrands.map((brand, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 rounded-xl p-3 hover:shadow-sm transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <span className="text-gray-700 font-medium text-sm">{brand}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* HD Brands */}
            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-6">
                <motion.div
                  className="w-14 h-14 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
                  whileHover={{ scale: 1.05, rotate: -3 }}
                >
                  <BiDiamond className="text-purple-600 text-lg" />
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Luxury HD Collection</h3>
                <p className="text-gray-500 text-sm">Ultra-premium products for haute couture artistry</p>
              </div>
              <div className="space-y-2">
                {hdBrands.map((brand, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 rounded-xl p-3 hover:shadow-sm transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <span className="text-gray-700 font-medium text-sm">{brand}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compact Course Includes Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3" />
              <HiSparkles className="text-gray-500 mr-2 text-xs" />
              <span className="text-gray-600 font-medium text-sm">EXCLUSIVE BENEFITS</span>
            </div>
            <h2 className="text-4xl font-light text-gray-900 mb-3">Luxury Experience</h2>
            <p className="text-gray-500">Everything you need for your elite transformation</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {courseIncludes.map((item, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-all duration-300`}
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <item.icon className="text-gray-600 text-lg" />
                  </motion.div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 text-center">{item.title}</h3>
                  <p className="text-gray-500 text-center text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Compact Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-sm border border-gray-100 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center bg-yellow-50 rounded-full px-6 py-2 mb-8"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
              <FaCrown className="text-yellow-600 mr-2 text-sm" />
              <span className="text-yellow-700 font-medium text-sm">EXCLUSIVE LIMITED SEATS</span>
            </motion.div>

            <h2 className="text-4xl font-light text-gray-900 mb-8">Begin Your Legacy</h2>

            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-light text-gray-900 mb-4">₹14,999</div>
              <div className="text-lg text-gray-600 mb-2">Complete Luxury Experience</div>
              <div className="text-gray-500 text-sm">Includes premium products, certification & lifetime support</div>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-6 mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <FaClock className="text-blue-600 text-lg" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">10-15 Days</div>
                <div className="text-gray-500 text-xs">Flexible Schedule</div>
              </motion.div>
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <FaUsers className="text-green-600 text-lg" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">Elite Batches</div>
                <div className="text-gray-500 text-xs">Personal Attention</div>
              </motion.div>
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <FaCertificate className="text-purple-600 text-lg" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">Gold Certification</div>
                <div className="text-gray-500 text-xs">Industry Prestigious</div>
              </motion.div>
            </motion.div>

            <motion.button
              className="bg-gray-900 text-white px-12 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Secure Your Elite Spot
            </motion.button>

            <p className="text-gray-500 text-sm mt-8">
              No experience required • Premium practice kits available • Early enrollment benefits
            </p>
          </motion.div>
        </div>
      </section>

      {/* Compact Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-gray-900 mb-3">Connect With Excellence</h2>
            <p className="text-gray-500">Ready to embark on your luxury artistry journey?</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-gray-100 text-center group hover:shadow-md transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-14 h-14 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-all duration-300"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <FaPhone className="text-blue-600 text-lg" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Call Us</h3>
              <p className="text-blue-600 font-semibold">+91 7903510585</p>
            </motion.div>

            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-gray-100 text-center group hover:shadow-md transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-14 h-14 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-all duration-300"
                whileHover={{ rotate: -5, scale: 1.05 }}
              >
                <FaEnvelope className="text-pink-600 text-lg" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Email Us</h3>
              <p className="text-pink-600 font-semibold">officialnariglam@gmail.com</p>
            </motion.div>

            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-gray-100 text-center group hover:shadow-md transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-14 h-14 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-all duration-300"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <FaGlobe className="text-green-600 text-lg" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Visit Website</h3>
              <p className="text-green-600 font-semibold">www.nariglam.com</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
