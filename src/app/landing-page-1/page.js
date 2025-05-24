import Image from "next/image"
import { FaStar, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaApple, FaGooglePlay } from "react-icons/fa"
import { BiShield, BiUser } from "react-icons/bi"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">Beauty At Home</h1>
              <p className="text-xl text-gray-600 mb-8">Professional beauty services delivered to your doorstep</p>

              {/* Circular Badge */}
              <div className="relative mb-8">
                <div className="bg-pink-500 text-white rounded-full p-8 w-64 h-64 flex flex-col items-center justify-center text-center">
                  <BiShield className="text-4xl mb-2" />
                  <div className="font-bold text-lg">Trained</div>
                  <div className="font-bold text-lg">Professionals</div>
                  <div className="text-sm mt-2">One-time Use</div>
                  <div className="text-sm">Hygienic & Safe</div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=300"
                  alt="NARI GLAM Mobile App"
                  width={300}
                  height={600}
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Achievements so far</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-pink-500 text-2xl" />
              </div>
              <div className="text-2xl font-bold text-gray-800">200K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiUser className="text-blue-500 text-2xl" />
              </div>
              <div className="text-2xl font-bold text-gray-800">5K+</div>
              <div className="text-gray-600">Beauty Experts</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-green-500 text-2xl" />
              </div>
              <div className="text-2xl font-bold text-gray-800">10L+</div>
              <div className="text-gray-600">Services Delivered</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-purple-500 text-2xl" />
              </div>
              <div className="text-2xl font-bold text-gray-800">50+</div>
              <div className="text-gray-600">Cities</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-red-500 text-2xl" />
              </div>
              <div className="text-2xl font-bold text-gray-800">4.8+</div>
              <div className="text-gray-600">App Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Services we offer</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Facial Salon At Home"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Facial Salon At Home</h3>
              <p className="text-gray-600 mb-4">Professional facial treatments in the comfort of your home</p>
              <button className="text-pink-500 font-semibold">Learn More →</button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Premium Spa At Home"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Spa At Home</h3>
              <p className="text-gray-600 mb-4">Luxury spa experience delivered to your doorstep</p>
              <button className="text-pink-500 font-semibold">Learn More →</button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Advance Facials"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Advance Facials</h3>
              <p className="text-gray-600 mb-4">Advanced skincare treatments with latest technology</p>
              <button className="text-pink-500 font-semibold">Learn More →</button>
            </div>
          </div>

          {/* Beauty Professionals */}
          <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt={`Professional ${i}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm font-medium text-gray-800">Expert {i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Wellness */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold mb-4">Corporate Wellness Program</h2>
              <p className="text-gray-300 mb-6">
                Bringing relaxation to your office with our corporate wellness services
              </p>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold">
                Learn More
              </button>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Corporate Wellness"
                width={500}
                height={300}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NARI GLAM Salon Section */}
      <section className="py-16 px-6 bg-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-pink-500 mb-6">NARI GLAM Salon</h2>
          <p className="text-gray-600 text-lg mb-8">
            Experience premium beauty services with our trained professionals who bring salon-quality treatments to your
            home.
          </p>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold">
            Book Now
          </button>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">MEDIA COVERAGES</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                <h3 className="font-bold text-gray-800 mb-2">Media Coverage {i}</h3>
                <p className="text-gray-600 text-sm">
                  Featured in leading publications for our innovative beauty services
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Celebrities Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Celebrities love us</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "SARA BHATIA", role: "Actress" },
              { name: "NEHA DHUPIA", role: "Actress" },
              { name: "CHAHATT KHANNA", role: "Actress" },
              { name: "Celebrity 4", role: "Model" },
            ].map((celebrity, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt={celebrity.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-800">{celebrity.name}</h3>
                <p className="text-gray-600 text-sm">{celebrity.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Love from our customers</h2>
              <div className="flex items-center mb-4">
                <span className="text-5xl font-bold text-gray-800">4.5</span>
                <div className="ml-4">
                  <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="text-xl" />
                    ))}
                  </div>
                  <p className="text-gray-600">40.6k reviews</p>
                </div>
              </div>

              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <span className="w-8 text-sm text-gray-600">{rating}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 3}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {rating === 5 ? "32.5k" : rating === 4 ? "6.1k" : "1.2k"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Satisfied Customer</h4>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className="text-sm" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Amazing service! The beautician was professional and the results were fantastic. Highly recommend
                  NARI GLAM for at-home beauty services
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16 px-6 bg-pink-500">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center text-white">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold mb-4">Get the NARI GLAM App</h2>
              <p className="text-pink-100 mb-6">Download our app for easy booking and exclusive offers</p>
              <div className="flex gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
                  <FaApple className="text-xl" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
                  <FaGooglePlay className="text-xl" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="Woman with NARI GLAM App"
                width={300}
                height={400}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">NARI GLAM</h3>
              <p className="text-gray-400">Premium beauty services at your doorstep</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Facial Treatments</li>
                <li>Spa Services</li>
                <li>Hair Care</li>
                <li>Makeup</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Download App</h4>
              <div className="flex gap-2">
                <button className="bg-gray-800 p-2 rounded">
                  <FaApple className="text-xl" />
                </button>
                <button className="bg-gray-800 p-2 rounded">
                  <FaGooglePlay className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NARI GLAM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
