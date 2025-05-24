"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import { useToast } from "@/components/ui/toaster"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Registration, 2: OTP Verification
  const [otp, setOtp] = useState(["", "", "", ""])
  const router = useRouter()
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call to register user
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Move to OTP verification step
      setStep(2)
      toast.info({
        title: "OTP Sent",
        description: "A verification code has been sent to your email.",
      })
    } catch (error) {
      toast.error({
        title: "Registration failed",
        description: "Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      })

      // Redirect to login page
      router.push("/auth/login")
    } catch (error) {
      toast.error({
        title: "OTP verification failed",
        description: "Invalid OTP. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      toast.error({
        title: "Google Sign-In failed",
        description: "Please try again later.",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold text-pink-600"
            >
              Glamour Rentals
            </motion.div>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {step === 1 ? "Create your account" : "Verify your email"}
          </h2>
          {step === 1 && (
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-pink-600 hover:text-pink-500">
                Sign in
              </Link>
            </p>
          )}
        </div>

        {step === 1 ? (
          <>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
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
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </motion.button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FcGoogle className="h-5 w-5 mr-2" />
                  Sign up with Google
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                We have sent a verification code to <span className="font-medium">{formData.email}</span>. Please enter
                the code below to verify your email.
              </p>

              <div className="flex justify-center space-x-3 my-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                ))}
              </div>

              <p className="text-sm text-gray-600 text-center">
                Did not receive the code?{" "}
                <button
                  type="button"
                  className="text-pink-600 hover:text-pink-500 font-medium"
                  onClick={() => {
                    toast.info({
                      title: "OTP Resent",
                      description: "A new verification code has been sent to your email.",
                    })
                  }}
                >
                  Resend
                </button>
              </p>
            </div>

            <div>
              <motion.button
                type="submit"
                disabled={isLoading || otp.some((digit) => !digit)}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                  isLoading || otp.some((digit) => !digit) ? "opacity-70 cursor-not-allowed" : ""
                }`}
                whileHover={!isLoading && !otp.some((digit) => !digit) ? { scale: 1.02 } : {}}
                whileTap={!isLoading && !otp.some((digit) => !digit) ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
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
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </motion.button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-500"
              >
                <FiArrowLeft className="mr-1" />
                Back to registration
              </button>
            </div>
          </form>
        )}

        {step === 1 && (
          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-500">
              <FiArrowLeft className="mr-1" />
              Back to home
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  )
}
