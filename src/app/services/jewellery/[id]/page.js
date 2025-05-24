"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FiArrowLeft, FiCalendar, FiClock, FiCheck, FiInfo, FiMessageCircle } from "react-icons/fi"
import { useToast } from "@/components/ui/toaster"

export default function JewelleryDetailPage({ params }) {
  const [selectedStartDate, setSelectedStartDate] = useState("")
  const [selectedEndDate, setSelectedEndDate] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("online")
  const [isBooking, setIsBooking] = useState(false)
  const id = Number.parseInt(params.id)
  const router = useRouter()
  const toast = useToast()

  // Mock data - in a real app, this would come from an API
  const jewelleryItems = [
    {
      id: 1,
      name: "Royal Kundan Necklace Set",
      description: "Exquisite kundan necklace set with matching earrings and maang tikka.",
      longDescription:
        "This stunning Royal Kundan Necklace Set is perfect for weddings and special occasions. The set includes a beautiful necklace, matching earrings, and maang tikka, all crafted with high-quality kundan stones and gold plating. The intricate design and traditional craftsmanship make this set a perfect choice for brides and special events.",
      price: 8000,
      image: "/placeholder.svg?height=500&width=800",
      gallery: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
      ],
      rentalDays: "3 days",
      includes: [
        "Kundan necklace",
        "Matching earrings",
        "Maang tikka",
        "Jewelry box",
        "Care instructions",
        "Insurance coverage",
      ],
      category: "Necklace Sets",
      occasion: "Wedding",
    },
    {
      id: 2,
      name: "Pearl Drop Earrings",
      description: "Elegant pearl drop earrings perfect for any occasion.",
      longDescription:
        "These elegant Pearl Drop Earrings are crafted with genuine pearls and feature a timeless design that complements any outfit. Perfect for parties, formal events, or everyday elegance. The earrings are lightweight and comfortable to wear for extended periods.",
      price: 3000,
      image: "/placeholder.svg?height=500&width=800",
      gallery: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
      ],
      rentalDays: "2 days",
      includes: ["Pearl drop earrings", "Earring backs", "Jewelry pouch", "Care instructions"],
      category: "Earrings",
      occasion: "Party",
    },
  ]

  const item = jewelleryItems.find((i) => i.id === id)

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Item not found</h1>
          <Link href="/services/jewellery">
            <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors">
              Back to Jewellery
            </button>
          </Link>
        </div>
      </div>
    )
  }

  // Generate available dates (next 30 days)
  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return date.toISOString().split("T")[0]
  })

  const handleBooking = async () => {
    if (!selectedStartDate || !selectedEndDate) {
      toast.error({
        title: "Incomplete booking",
        description: "Please select both start and end dates for your rental.",
      })
      return
    }

    if (new Date(selectedEndDate) <= new Date(selectedStartDate)) {
      toast.error({
        title: "Invalid dates",
        description: "End date must be after start date.",
      })
      return
    }

    setIsBooking(true)

    try {
      if (paymentMethod === "online") {
        // Initialize Razorpay payment
        const response = await fetch("/api/razorpay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: item.price,
            currency: "INR",
            receipt: `jewellery_${item.id}_${Date.now()}`,
            notes: {
              itemId: item.id,
              itemName: item.name,
              startDate: selectedStartDate,
              endDate: selectedEndDate,
            },
          }),
        })

        const { order } = await response.json()

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "Glamour Rentals",
          description: `Rental for ${item.name}`,
          order_id: order.id,
          handler: async (response) => {
            // Verify payment
            const verifyResponse = await fetch("/api/razorpay", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            if (verifyResponse.ok) {
              // Create booking
              await createBooking("online", response.razorpay_payment_id)
            } else {
              toast.error({
                title: "Payment verification failed",
                description: "Please contact support.",
              })
            }
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#db2777",
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      } else {
        // Cash on Delivery
        await createBooking("cod")
      }
    } catch (error) {
      toast.error({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
      })
    } finally {
      setIsBooking(false)
    }
  }

  const createBooking = async (paymentType, paymentId = null) => {
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: item.id,
          serviceName: item.name,
          serviceType: "jewellery",
          startDate: selectedStartDate,
          endDate: selectedEndDate,
          amount: item.price,
          paymentMethod: paymentType,
          paymentId: paymentId,
        }),
      })

      if (response.ok) {
        toast.success({
          title: "Booking successful",
          description: `Your ${item.name} rental has been booked from ${selectedStartDate} to ${selectedEndDate}.`,
        })
        router.push("/bookings")
      } else {
        throw new Error("Booking failed")
      }
    } catch (error) {
      toast.error({
        title: "Booking failed",
        description: "There was an error creating your booking. Please try again.",
      })
    }
  }

  const handleWhatsAppChat = () => {
    const message = `Hi! I'm interested in renting the ${item.name} from ${selectedStartDate} to ${selectedEndDate}. Can you help me with the booking?`
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/services/jewellery">
          <motion.button
            className="flex items-center text-pink-600 mb-8"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft className="mr-2" />
            Back to Jewellery Rentals
          </motion.button>
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-80 md:h-96 w-full">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" priority />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3">
                <motion.h1
                  className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.name}
                </motion.h1>

                <motion.div
                  className="flex items-center text-gray-600 mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center mr-6">
                    <FiClock className="mr-2 text-pink-600" />
                    <span>Rental: {item.rentalDays}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </motion.div>

                <motion.p
                  className="text-gray-700 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {item.longDescription}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">What s Included</h2>
                  <ul className="space-y-2 mb-8">
                    {item.includes.map((include, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{include}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {item.gallery.map((image, index) => (
                      <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${item.name} - Image ${index + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="lg:w-1/3">
                <motion.div
                  className="bg-gray-50 rounded-xl p-6 sticky top-24"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">₹{item.price.toLocaleString()}</h2>
                  <p className="text-gray-600 mb-6">Rent this beautiful piece</p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="text-gray-400" />
                      </div>
                      <select
                        value={selectedStartDate}
                        onChange={(e) => setSelectedStartDate(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      >
                        <option value="">Select start date</option>
                        {availableDates.map((date) => (
                          <option key={date} value={date}>
                            {new Date(date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="text-gray-400" />
                      </div>
                      <select
                        value={selectedEndDate}
                        onChange={(e) => setSelectedEndDate(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      >
                        <option value="">Select end date</option>
                        {availableDates.map((date) => (
                          <option key={date} value={date}>
                            {new Date(date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="payment-online"
                          name="payment-method"
                          type="radio"
                          value="online"
                          checked={paymentMethod === "online"}
                          onChange={() => setPaymentMethod("online")}
                          className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                        />
                        <label htmlFor="payment-online" className="ml-2 text-gray-700">
                          Pay Online (Razorpay)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="payment-cod"
                          name="payment-method"
                          type="radio"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                        />
                        <label htmlFor="payment-cod" className="ml-2 text-gray-700">
                          Cash on Delivery
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      onClick={handleBooking}
                      disabled={isBooking || !selectedStartDate || !selectedEndDate}
                      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                        isBooking || !selectedStartDate || !selectedEndDate ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      whileHover={!isBooking && selectedStartDate && selectedEndDate ? { scale: 1.02 } : {}}
                      whileTap={!isBooking && selectedStartDate && selectedEndDate ? { scale: 0.98 } : {}}
                    >
                      {isBooking ? (
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
                          Processing...
                        </>
                      ) : (
                        "Rent Now"
                      )}
                    </motion.button>

                    <motion.button
                      onClick={handleWhatsAppChat}
                      className="w-full flex justify-center items-center py-3 px-4 border border-green-500 rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiMessageCircle className="mr-2" />
                      Chat on WhatsApp
                    </motion.button>
                  </div>

                  <div className="mt-4 flex items-start text-sm text-gray-500">
                    <FiInfo className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p>You can cancel or reschedule your rental up to 24 hours before the start date.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
