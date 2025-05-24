import Image from "next/image"
import {
  FaStar,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaApple,
  FaGooglePlay,
  FaPlay,
  FaArrowRight,
} from "react-icons/fa"
import { BiShield, BiUser, BiSpa, BiHeart } from "react-icons/bi"
import { HiSparkles, HiLightningBolt } from "react-icons/hi"

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Premium Design */}
      <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 py-10 px-6 overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-rose-200/40 rounded-full blur-lg"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg">
                <HiSparkles className="text-pink-500 mr-2" />
                <span className="text-gray-700 font-medium">Premium Beauty Experience</span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Beauty
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  At Home
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your space into a luxury salon with our certified beauty professionals
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  Book Your Session
                  <FaArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                  <FaPlay className="text-pink-500" />
                  Watch Story
                </button>
              </div>

              {/* Premium Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">200K+</div>
                  <div className="text-gray-600 text-sm">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">4.9★</div>
                  <div className="text-gray-600 text-sm">App Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">50+</div>
                  <div className="text-gray-600 text-sm">Cities</div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center relative">
              {/* Premium Floating Badge */}
              <div className="absolute -top-8 -left-1 z-20">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-3xl p-8 w-72 h-72 flex flex-col items-center justify-center text-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <BiShield className="text-5xl mb-3" />
                  <div className="font-bold text-xl mb-2">Certified</div>
                  <div className="font-bold text-xl mb-2">Professionals</div>
                  <div className="text-sm opacity-90">Hygienic • Safe • Trusted</div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=600&width=300"
                    alt="NARI GLAM Mobile App"
                    width={300}
                    height={600}
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Achievements Section */}
      <section className="py-20 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey So Far</h2>
            <p className="text-xl text-gray-600">Milestones that define our excellence</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { icon: FaUsers, number: "200K+", label: "Happy Customers", color: "pink" },
              { icon: BiUser, number: "5K+", label: "Beauty Experts", color: "purple" },
              { icon: FaCalendarAlt, number: "10L+", label: "Services Delivered", color: "blue" },
              { icon: FaMapMarkerAlt, number: "50+", label: "Cities", color: "green" },
              { icon: FaStar, number: "4.9", label: "App Rating", color: "yellow" },
            ].map((item, index) => (
              <div key={index} className="group text-center">
                <div
                  className={`w-20 h-20 bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <item.icon className={`text-${item.color}-500 text-3xl`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{item.number}</div>
                <div className="text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Luxury Services We Offer</h2>
            <p className="text-xl text-gray-600">Curated experiences for your beauty journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Facial Salon At Home",
                description: "Professional facial treatments with premium products",
                image: "/placeholder.svg?height=300&width=400",
                gradient: "from-pink-400 to-rose-500",
              },
              {
                title: "Premium Spa At Home",
                description: "Luxury spa experience in your comfort zone",
                image: "/placeholder.svg?height=300&width=400",
                gradient: "from-purple-400 to-pink-500",
              },
              {
                title: "Advanced Facials",
                description: "Cutting-edge skincare with latest technology",
                image: "/placeholder.svg?height=300&width=400",
                gradient: "from-blue-400 to-purple-500",
              },
            ].map((service, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <button className="text-pink-500 font-semibold flex items-center group-hover:text-pink-600 transition-colors">
                      Explore Service
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Professionals Grid */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Certified Professionals</h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="text-center group">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl mx-auto mb-3 overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt={`Professional ${i}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="text-sm font-medium text-gray-800">Expert {i}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Corporate Wellness */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <HiLightningBolt className="text-yellow-400 mr-2" />
                <span className="text-white/90">Corporate Wellness</span>
              </div>

              <h2 className="text-4xl font-bold mb-6">Transform Your Workplace Wellness</h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Boost employee morale and productivity with our premium corporate wellness programs designed for modern
                workplaces.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="Corporate Wellness"
                    width={500}
                    height={400}
                    className="rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Brand Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-pink-50 to-purple-50 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 mb-8 shadow-lg">
            <BiSpa className="text-pink-500 text-2xl mr-3" />
            <span className="text-2xl font-bold text-gray-900">NARI GLAM</span>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 ml-2">
              Salon
            </span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-6">Where Beauty Meets Excellence</h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Experience the perfect blend of luxury, convenience, and expertise with our premium beauty services that
            bring the salon experience directly to your doorstep.
          </p>

          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            Book Your Experience
          </button>
        </div>
      </section>

      {/* Premium Media Coverage */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured In Leading Media</h2>
            <p className="text-xl text-gray-600">Recognition from industry leaders</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                  <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-gray-400 font-semibold">Media Logo {i}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Featured Article {i}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Recognized for innovation in beauty services and customer satisfaction
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Celebrities Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Celebrities</h2>
            <p className="text-xl text-gray-600">Stars who choose NARI GLAM</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "SARA BHATIA", role: "Bollywood Actress" },
              { name: "NEHA DHUPIA", role: "TV Personality" },
              { name: "CHAHATT KHANNA", role: "Film Actress" },
              { name: "PRIYA SHARMA", role: "Model" },
            ].map((celebrity, i) => (
              <div key={i} className="text-center group">
                <div className="relative mb-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl mx-auto overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt={celebrity.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <BiHeart className="text-pink-500 text-xl" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{celebrity.name}</h3>
                <p className="text-gray-600 text-xs">{celebrity.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Customer Reviews */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>

              <div className="flex items-center mb-8">
                <div className="text-6xl font-bold text-gray-900 mr-6">4.9</div>
                <div>
                  <div className="flex text-yellow-400 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="text-2xl mr-1" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-lg">Based on 40.6k reviews</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { rating: 5, percentage: 85, count: "34.5k" },
                  { rating: 4, percentage: 12, count: "4.9k" },
                  { rating: 3, percentage: 2, count: "0.8k" },
                  { rating: 2, percentage: 1, count: "0.4k" },
                  { rating: 1, percentage: 0, count: "0.0k" },
                ].map((item) => (
                  <div key={item.rating} className="flex items-center">
                    <span className="w-8 text-gray-600 font-medium">{item.rating}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 mx-4">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-600 font-medium w-12">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl mr-4 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Customer"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Priya Mehta</h4>
                    <div className="flex text-yellow-400 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className="text-sm" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Absolutely amazing experience! The beautician was incredibly professional and skilled. The
                  convenience of having salon-quality services at home is unmatched. NARI GLAM has become my go-to for
                  all beauty needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium App Download Section */}

    </div>
  )
}
