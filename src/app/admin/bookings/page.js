"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { FiSearch, FiFilter, FiDownload, FiEdit, FiTrash2, FiEye, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { useToast } from "@/components/ui/toaster"

export default function AdminBookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBookings, setSelectedBookings] = useState([])
  const toast = useToast()

  // Mock data for bookings
  const allBookings = [
    {
      id: "BK001",
      customer: "Priya Sharma",
      service: "Bridal Makeup",
      date: "2023-05-15",
      status: "Confirmed",
      amount: "₹15,000",
      phone: "+91 98765 43210",
      email: "priya@example.com",
    },
    {
      id: "BK002",
      customer: "Ananya Patel",
      service: "Lehenga Rental",
      date: "2023-05-14",
      status: "In Process",
      amount: "₹8,000",
      phone: "+91 87654 32109",
      email: "ananya@example.com",
    },
    {
      id: "BK003",
      customer: "Meera Kapoor",
      service: "Jewellery Rental",
      date: "2023-05-12",
      status: "Completed",
      amount: "₹5,000",
      phone: "+91 76543 21098",
      email: "meera@example.com",
    },
    {
      id: "BK004",
      customer: "Riya Singh",
      service: "Party Makeup",
      date: "2023-05-10",
      status: "Confirmed",
      amount: "₹4,000",
      phone: "+91 65432 10987",
      email: "riya@example.com",
    },
    {
      id: "BK005",
      customer: "Neha Gupta",
      service: "Engagement Makeup",
      date: "2023-05-08",
      status: "Completed",
      amount: "₹7,000",
      phone: "+91 54321 09876",
      email: "neha@example.com",
    },
    {
      id: "BK006",
      customer: "Kavita Reddy",
      service: "Bridal Makeup",
      date: "2023-05-07",
      status: "Cancelled",
      amount: "₹12,000",
      phone: "+91 43210 98765",
      email: "kavita@example.com",
    },
    {
      id: "BK007",
      customer: "Sneha Joshi",
      service: "Jewellery Rental",
      date: "2023-05-05",
      status: "Completed",
      amount: "₹6,000",
      phone: "+91 32109 87654",
      email: "sneha@example.com",
    },
    {
      id: "BK008",
      customer: "Pooja Verma",
      service: "Lehenga Rental",
      date: "2023-05-03",
      status: "In Process",
      amount: "₹9,000",
      phone: "+91 21098 76543",
      email: "pooja@example.com",
    },
    {
      id: "BK009",
      customer: "Divya Sharma",
      service: "Party Makeup",
      date: "2023-05-01",
      status: "Confirmed",
      amount: "₹3,500",
      phone: "+91 10987 65432",
      email: "divya@example.com",
    },
    {
      id: "BK010",
      customer: "Anjali Patel",
      service: "Bridal Makeup",
      date: "2023-04-28",
      status: "Completed",
      amount: "₹14,000",
      phone: "+91 09876 54321",
      email: "anjali@example.com",
    },
  ]

  const itemsPerPage = 5

  // Filter bookings based on search term and status filter
  const filteredBookings = allBookings.filter((booking) => {
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Paginate bookings
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const handleSelectBooking = (id) => {
    setSelectedBookings((prev) => {
      if (prev.includes(id)) {
        return prev.filter((bookingId) => bookingId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedBookings.length === paginatedBookings.length) {
      setSelectedBookings([])
    } else {
      setSelectedBookings(paginatedBookings.map((booking) => booking.id))
    }
  }

  const handleDeleteSelected = () => {
    if (selectedBookings.length === 0) return

    // In a real app, this would be an API call
    toast.success({
      title: "Bookings deleted",
      description: `${selectedBookings.length} booking(s) have been deleted.`,
    })

    setSelectedBookings([])
  }

  const handleExportSelected = () => {
    if (selectedBookings.length === 0) return

    toast.success({
      title: "Export initiated",
      description: `${selectedBookings.length} booking(s) are being exported.`,
    })
  }

  const handleUpdateStatus = (id, newStatus) => {
    // In a real app, this would be an API call
    toast.success({
      title: "Status updated",
      description: `Booking ${id} status changed to ${newStatus}.`,
    })
  }

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

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
        <p className="mt-1 text-sm text-gray-600">Manage all customer bookings</p>
      </motion.div>

      {/* Filters and Actions */}
      <motion.div
        className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search bookings..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="all">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Process">In Process</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 w-full sm:w-auto">
          <button
            onClick={handleExportSelected}
            disabled={selectedBookings.length === 0}
            className={`flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
              selectedBookings.length === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FiDownload className="mr-2" />
            Export
          </button>
          <button
            onClick={handleDeleteSelected}
            disabled={selectedBookings.length === 0}
            className={`flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium ${
              selectedBookings.length === 0
                ? "bg-red-100 text-red-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            <FiTrash2 className="mr-2" />
            Delete
          </button>
        </div>
      </motion.div>

      {/* Bookings Table */}
      <motion.div
        className="mt-6 bg-white shadow overflow-hidden sm:rounded-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBookings.length === paginatedBookings.length && paginatedBookings.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Booking ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Service
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedBookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              paginatedBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBookings.includes(booking.id)}
                        onChange={() => handleSelectBooking(booking.id)}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-pink-600 hover:text-pink-900" title="View Details">
                        <FiEye />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900" title="Edit Booking">
                        <FiEdit />
                      </button>
                      <div className="relative group">
                        <button className="text-gray-600 hover:text-gray-900" title="Change Status">
                          <span className="text-xs">Status</span>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                          <div className="py-1">
                            <button
                              onClick={() => handleUpdateStatus(booking.id, "Confirmed")}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Confirmed
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(booking.id, "In Process")}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              In Process
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(booking.id, "Completed")}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Completed
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(booking.id, "Cancelled")}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Cancelled
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="mt-6 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredBookings.length)}</span> of{" "}
                <span className="font-medium">{filteredBookings.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === i + 1
                        ? "z-10 bg-pink-50 border-pink-500 text-pink-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
