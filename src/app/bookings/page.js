"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { FiDownload, FiChevronRight, FiAlertCircle } from "react-icons/fi"
import { useToast } from "@/components/ui/toaster"

export default function BookingsPage() {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession()
  const toast = useToast()

  useEffect(() => {
    const fetchBookings = async () => {
      if (status === "loading") return

      if (!session) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch("/api/bookings")
        if (!response.ok) {
          throw new Error("Failed to fetch bookings")
        }

        const data = await response.json()
        setBookings(data.bookings || [])
      } catch (error) {
        console.error("Error fetching bookings:", error)
        toast.error({
          title: "Error",
          description: "Failed to load your bookings. Please try again later.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [session, status, toast])

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-100 text-blue-800"
      case "In Process":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">My Bookings</h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">Please sign in to view your bookings</p>
            <div className="mt-10 flex justify-center">
              <Link href="/auth/login">
                <motion.button
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">My Bookings</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">View and manage your bookings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          {bookings.length === 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-16 sm:px-6 text-center">
                <FiAlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings found</h3>
                <p className="mt-1 text-sm text-gray-500">You haven t made any bookings yet.</p>
                <div className="mt-6">
                  <Link href="/services/makeup">
                    <motion.button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Browse Services
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <li key={booking.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-pink-600 truncate">{booking.service}</p>
                          <p className="ml-2 flex-shrink-0 font-normal text-sm text-gray-500">{booking.id}</p>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}
                          >
                            {booking.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {booking.date} at {booking.time}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p className="mr-4">₹{booking.amount.toLocaleString()}</p>
                          <a
                            href={`/api/receipt/${booking.receiptId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-pink-600 hover:text-pink-900"
                          >
                            <FiDownload className="mr-1" />
                            Receipt
                          </a>
                          <Link href={`/bookings/${booking.id}`}>
                            <div className="ml-4 flex items-center text-pink-600 hover:text-pink-900">
                              Details
                              <FiChevronRight className="ml-1" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
