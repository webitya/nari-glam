"use client"
import { motion } from "framer-motion"
import Hero from "@/components/Hero"
import ServiceSection from "@/components/ServiceSection"
import TestimonialSection from "@/components/TestimonialSection"
import AboutSection from "@/components/AboutSection"
import ContactSection from "@/components/ContactSection"

export default function Home() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  }

  return (
    <div className="overflow-hidden">
      <Hero />

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
        <ServiceSection />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
        <AboutSection />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
        <TestimonialSection />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
        <ContactSection />
      </motion.div>
    </div>
  )
}
