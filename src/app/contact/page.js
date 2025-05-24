"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { FiSend, FiMapPin, FiPhone, FiMail, FiClock, FiMessageCircle } from "react-icons/fi"
import { useToast } from "@/components/ui/toaster"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      toast.success({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      })
    } catch (error) {
      toast.error({
        title: "Something went wrong",
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppContact = () => {
    const message = "Hi! I'd like to know more about your services."
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get In Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or want to book our services? We'd love to hear from you. Reach out to us and we'll get back
            to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Contact Information</h2>

            <div className="space-y-8 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Our Location</h3>
                  <p className="text-gray-600 mt-1">123 Beauty Lane, Fashion District</p>
                  <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
                  <p className="text-gray-600">India</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                  <FiPhone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Phone Number</h3>
                  <p className="text-gray-600 mt-1">+91 98765 43210</p>
                  <p className="text-gray-600">+91 87654 32109</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                  <FiMail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Email Address</h3>
                  <p className="text-gray-600 mt-1">info@glamourrentals.com</p>
                  <p className="text-gray-600">bookings@glamourrentals.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                  <FiClock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Business Hours</h3>
                  <p className="text-gray-600 mt-1">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Sunday: 11:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Emergency bookings: By appointment</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 mb-3">Book an Appointment</h3>
                <p className="text-gray-600 mb-4">
                  For makeup services and consultations, we recommend booking an appointment in advance to ensure
                  availability.
                </p>
                <a
                  href="tel:+919876543210"
                  className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-700 transition-colors"
                >
                  Call Now
                </a>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 mb-3">Chat with Us</h3>
                <p className="text-gray-600 mb-4">
                  Get instant answers to your questions and quick assistance with bookings through WhatsApp.
                </p>
                <motion.button
                  onClick={handleWhatsAppContact}
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMessageCircle className="mr-2" />
                  WhatsApp Us
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

              {submitSuccess ? (
                <motion.div
                  className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="font-semibold text-lg mb-2">Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="makeup-booking">Makeup Service Booking</option>
                        <option value="jewellery-rental">Jewellery Rental Inquiry</option>
                        <option value="lehenga-rental">Lehenga Rental Inquiry</option>
                        <option value="general-inquiry">General Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors resize-none"
                      placeholder="Tell us about your requirements or questions"
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-700 transition-colors flex items-center justify-center ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <FiSend className="ml-2" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Us</h2>
            <p className="text-gray-600 mb-6">
              Visit our studio for consultations and to view our rental collection in person.
            </p>
          </div>
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Interactive Map would be embedded here</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
