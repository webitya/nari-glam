import { Inter } from "next/font/google"
import { ToastProvider } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import { AuthProvider } from "@/components/AuthProvider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Glamour Rentals | Makeup & Rental Services",
  description: "Premium makeup services and rental options for jewellery and lehengas",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <WhatsAppButton />
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
