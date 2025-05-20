"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FiArrowLeft, FiCalendar, FiClock, FiCheck, FiInfo } from "react-icons/fi"
import { useToast } from "@/components/ui/toaster"

export default function MakeupServiceDetailPage({ params }) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("online")
  const [isBooking, setIsBooking] = useState(false)
  const id = Number.parseInt(params.id)
  const router = useRouter()
  const toast = useToast()

  // Mock data - in a real app, this would come from an API
  const makeupServices = [
    {
      id: 1,
      name: "Bridal Makeup",
      description: "Complete bridal makeup with hairstyling for your special day.",
      longDescription:
        "Our bridal makeup service is designed to make you look and feel your best on your wedding day. Our expert makeup artists use premium products to create a flawless look that will last all day and night. The service includes skin preparation, makeup application, and hairstyling to create a complete bridal look.",
      price: 15000,
      image: "/placeholder.svg?height=500&width=800",
      gallery: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
      ],
      duration: "3-4 hours",
      includes: [
        "Skin preparation and primer",
        "Foundation and concealer",
        "Eye makeup with false lashes",
        "Lipstick and blush",
        "Hairstyling",
        "Touch-up kit",
      ],
      category: "Bridal",
      occasion: "Wedding",
    },
    {
      id: 2,
      name: "Party Makeup",
      description: "Glamorous makeup for parties and special events.",
      longDescription:
        "Our party makeup service is perfect for any special event or celebration. Our makeup artists will create a glamorous look that suits your style and the occasion. The service includes skin preparation, makeup application, and basic hairstyling to complete your party-ready look.",
      price: 5000,
      image: "/placeholder.svg?height=500&width=800",
      gallery: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
      ],
      duration: "1-2 hours",
      includes: [
        "Skin preparation and primer",
        "Foundation and concealer",
        "Eye makeup",
        "Lipstick and blush",
        "Basic hairstyling",
      ],
      category: "Party",
      occasion: "Festival",
    },
    {
      id: 3,
      name: "Engagement Makeup",
      description: "Elegant makeup for engagement ceremonies.",
      longDescription:
        "Our engagement makeup service is designed to create an elegant and sophisticated look for your engagement ceremony. Our makeup artists will work with you to create a look that complements your outfit and style. The service includes skin preparation, makeup application, and hairstyling.",
      price: 8000,
      image: "/placeholder.svg?height=500&width=800",
      gallery: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
      ],
      duration: "2-3 hours",
      includes: [
        "Skin preparation and primer",
        "Foundation and concealer",
        "Eye makeup with false lashes",
        "Lipstick and blush",
        "Hairstyling",
      ],
      category: "Engagement",
      occasion: "Wedding",
    },
  ]

  const service = makeupServices.find((s) => s.id === id)

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Service not found</h1>
          <Link href="/services/makeup">
            <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors">
              Back to Services
            </button>
          </Link>
        </div>
      </div>
    )
  }

  // Generate available dates (next 14 days)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return date.toISOString().split("T")[0]
  })

  // Generate available time slots
  const availableTimeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error({
        title: "Incomplete booking",
        description: "Please select both date and time for your appointment.",
      })
      return
    }

    setIsBooking(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success({
        title: "Booking successful",
        description: `Your ${service.name} appointment has been booked for ${selectedDate} at ${selectedTime}.`,
      })

      // Redirect to bookings page
      router.push("/bookings")
    } catch (error) {
      toast.error({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
      })
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/services/makeup">
          <motion.button
            className="flex items-center text-pink-600 mb-8"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft className="mr-2" />
            Back to Makeup Services
          </motion.button>
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-80 md:h-96 w-full">
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.name}
              fill
              className="object-cover"
              priority
            />
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
                  {service.name}
                </motion.h1>

                <motion.div
                  className="flex items-center text-gray-600 mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center mr-6">
                    <FiClock className="mr-2 text-pink-600" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
                      {service.category}
                    </span>
                  </div>
                </motion.div>

                <motion.p
                  className="text-gray-700 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {service.longDescription}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">What's Included</h2>
                  <ul className="space-y-2 mb-8">
                    {service.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
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
                    {service.gallery.map((image, index) => (
                      <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${service.name} - Image ${index + 1}`}
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
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">₹{service.price.toLocaleString()}</h2>
                  <p className="text-gray-600 mb-6">Book your appointment now</p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="text-gray-400" />
                      </div>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      >
                        <option value="">Select a date</option>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-3 text-sm font-medium rounded-md ${
                            selectedTime === time
                              ? "bg-pink-600 text-white"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
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

                  <motion.button
                    onClick={handleBooking}
                    disabled={isBooking || !selectedDate || !selectedTime}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                      isBooking || !selectedDate || !selectedTime ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    whileHover={!isBooking && selectedDate && selectedTime ? { scale: 1.02 } : {}}
                    whileTap={!isBooking && selectedDate && selectedTime ? { scale: 0.98 } : {}}
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
                      "Book Appointment"
                    )}
                  </motion.button>

                  <div className="mt-4 flex items-start text-sm text-gray-500">
                    <FiInfo className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p>You can cancel or reschedule your appointment up to 24 hours before the scheduled time.</p>
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
