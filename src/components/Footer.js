"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiMail, FiPhone, FiMapPin } from "react-icons/fi"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <motion.h3
              className="text-2xl font-bold mb-4 text-pink-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Glamour Rentals
            </motion.h3>
            <motion.p
              className="text-gray-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Elevating your beauty and style with premium makeup services and exquisite rental collection for your
              special occasions.
            </motion.p>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <FiYoutube size={20} />
              </a>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3
              className="text-lg font-semibold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Quick Links
            </motion.h3>
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <li>
                <Link href="/" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-pink-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services/makeup" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Makeup Services
                </Link>
              </li>
              <li>
                <Link href="/services/jewellery" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Jewellery Rentals
                </Link>
              </li>
              <li>
                <Link href="/services/lehengas" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Lehenga Rentals
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </motion.ul>
          </div>

          {/* Services */}
          <div>
            <motion.h3
              className="text-lg font-semibold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Services
            </motion.h3>
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <li>
                <Link href="/services/makeup/bridal" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Bridal Makeup
                </Link>
              </li>
              <li>
                <Link href="/services/makeup/party" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Party Makeup
                </Link>
              </li>
              <li>
                <Link
                  href="/services/makeup/engagement"
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                >
                  Engagement Makeup
                </Link>
              </li>
              <li>
                <Link
                  href="/services/jewellery/necklaces"
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                >
                  Necklace Sets
                </Link>
              </li>
              <li>
                <Link href="/services/lehengas/bridal" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Bridal Lehengas
                </Link>
              </li>
              <li>
                <Link href="/services/lehengas/party" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Party Lehengas
                </Link>
              </li>
            </motion.ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h3
              className="text-lg font-semibold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Contact Us
            </motion.h3>
            <motion.ul
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <li className="flex items-start space-x-3">
                <FiMapPin className="text-pink-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Beauty Lane, Fashion District, Mumbai, India 400001</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-pink-400 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-pink-400 flex-shrink-0" />
                <span className="text-gray-400">info@glamourrentals.com</span>
              </li>
            </motion.ul>
          </div>
        </div>

        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} Glamour Rentals. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
