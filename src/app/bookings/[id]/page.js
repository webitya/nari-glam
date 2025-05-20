"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FiArrowLeft } from "react-icons/fi"
import { useToast } from "@/components/ui/toaster"

export default function BookingDetailPage({ params }) {
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();
  const bookingId = params.id;

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (status === 'loading') return;
      
      if (!session) {
        setIsLoading(false);
        router.push('/auth/login');
        return;
      }
      
      try {
        const response = await fetch(`/api/bookings/${bookingId}`);
        if (!response.ok) {
          if (response.status === 404) {
            toast.error({
              title: 'Booking not found',
              description: 'The booking you are looking for does not exist or you do not have permission to view it.',
            });
            router.push('/bookings');
            return;
          }
          throw new Error('Failed to fetch booking details');
        }
        
        const data = await response.json();
        setBooking(data.booking);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        toast.error({
          title: 'Error',
          description: 'Failed to load booking details. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingDetails();
  }, [session, status, bookingId, router, toast]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'In Process':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/bookings">
            <button className="flex items-center text-pink-600 mb-8">
              <FiArrowLeft className="mr-2" />
              Back to Bookings
            </button>
          </Link>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-16 sm:px-6 text-center">
              <h3 className="text-lg font-medium text-gray-900">Booking not found</h3>
              <p className="mt-1 text-sm text-gray-500">
                The booking you are looking for does not exist or you do not have permission to view it.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/bookings">
          <motion.button 
            className="flex items-center text-pink-600 mb-8"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft className="mr-2" />
            Back to Bookings
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow overflow-hidden sm:rounded-lg"
        >
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Booking Details</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Booking ID: {booking.id}</p>
            </div>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>
          <div\
