"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { FiUsers, FiShoppingBag, FiCalendar, FiTrendingUp, FiArrowUp, FiArrowDown } from "react-icons/fi"

export default function AdminDashboard() {
  // Mock data for dashboard
  const stats = [
    { name: "Total Bookings", value: "124", icon: <FiCalendar size={24} />, change: "+12%", isUp: true },
    { name: "Total Customers", value: "85", icon: <FiUsers size={24} />, change: "+8%", isUp: true },
    { name: "Active Rentals", value: "32", icon: <FiShoppingBag size={24} />, change: "-3%", isUp: false },
    { name: "Revenue", value: "₹1.2L", icon: <FiTrendingUp size={24} />, change: "+15%", isUp: true },
  ]

  const recentBookings = [
    {
      id: "BK001",
      customer: "Priya Sharma",
      service: "Bridal Makeup",
      date: "2023-05-15",
      status: "Confirmed",
      amount: "₹15,000",
    },
    {
      id: "BK002",
      customer: "Ananya Patel",
      service: "Lehenga Rental",
      date: "2023-05-14",
      status: "In Process",
      amount: "₹8,000",
    },
    {
      id: "BK003",
      customer: "Meera Kapoor",
      service: "Jewellery Rental",
      date: "2023-05-12",
      status: "Completed",
      amount: "₹5,000",
    },
    {
      id: "BK004",
      customer: "Riya Singh",
      service: "Party Makeup",
      date: "2023-05-10",
      status: "Confirmed",
      amount: "₹4,000",
    },
    {
      id: "BK005",
      customer: "Neha Gupta",
      service: "Engagement Makeup",
      date: "2023-05-08",
      status: "Completed",
      amount: "₹7,000",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-100 text-blue-800"
      case "In Process":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">Welcome to your admin dashboard</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-pink-100 rounded-md p-3 text-pink-600">{stat.icon}</div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm flex items-center">
                {stat.isUp ? (
                  <FiArrowUp className="mr-1 text-green-500" />
                ) : (
                  <FiArrowDown className="mr-1 text-red-500" />
                )}
                <span className={stat.isUp ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span className="ml-2 text-gray-500">from last month</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Bookings */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
          <Link href="/admin/bookings">
            <div className="text-sm font-medium text-pink-600 hover:text-pink-500">View all</div>
          </Link>
        </div>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {recentBookings.map((booking) => (
              <li key={booking.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-pink-600 truncate">{booking.customer}</p>
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
                      <p className="flex items-center text-sm text-gray-500">{booking.service}</p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>{booking.date}</p>
                      <p className="ml-4 font-medium">{booking.amount}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link href="/admin/services/makeup/add">
                <div className="bg-pink-50 hover:bg-pink-100 rounded-md p-4 cursor-pointer transition-colors">
                  <h4 className="text-sm font-medium text-pink-700">Add Makeup Service</h4>
                </div>
              </Link>
              <Link href="/admin/services/jewellery/add">
                <div className="bg-pink-50 hover:bg-pink-100 rounded-md p-4 cursor-pointer transition-colors">
                  <h4 className="text-sm font-medium text-pink-700">Add Jewellery Item</h4>
                </div>
              </Link>
              <Link href="/admin/services/lehengas/add">
                <div className="bg-pink-50 hover:bg-pink-100 rounded-md p-4 cursor-pointer transition-colors">
                  <h4 className="text-sm font-medium text-pink-700">Add Lehenga Item</h4>
                </div>
              </Link>
              <Link href="/admin/bookings/new">
                <div className="bg-pink-50 hover:bg-pink-100 rounded-md p-4 cursor-pointer transition-colors">
                  <h4 className="text-sm font-medium text-pink-700">Create Booking</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">System Status</h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Database</div>
                <div className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Healthy
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Storage</div>
                <div className="text-sm text-gray-900">65% used (1.3GB/2GB)</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Last Backup</div>
                <div className="text-sm text-gray-900">Today, 03:45 AM</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">System Version</div>
                <div className="text-sm text-gray-900">v1.2.0</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
