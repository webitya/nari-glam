"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi"

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Bride",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The makeup was absolutely stunning! I received so many compliments on my wedding day. The team was professional, punctual, and made me feel beautiful.",
      rating: 5,
    },
    {
      id: 2,
      name: "Ananya Patel",
      role: "Customer",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "I rented a lehenga for my sister's wedding and it was perfect! The quality was excellent and the fit was just right. Will definitely use their services again.",
      rating: 5,
    },
    {
      id: 3,
      name: "Meera Kapoor",
      role: "Engagement Client",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The jewellery I rented for my engagement was exquisite. Everyone asked where I got it from! The rental process was smooth and hassle-free.",
      rating: 4,
    },
  ]

  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    let interval
    if (autoplay) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section className="py-20 bg-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied customers about their experience with our services.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`${i < testimonials[current].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} w-5 h-5`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 text-lg">"{testimonials[current].quote}"</p>
                  <h4 className="font-bold text-gray-800 text-xl">{testimonials[current].name}</h4>
                  <p className="text-pink-600">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg text-pink-600 hover:text-pink-700 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-lg text-pink-600 hover:text-pink-700 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <FiChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false)
                  setCurrent(index)
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === current ? "bg-pink-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
