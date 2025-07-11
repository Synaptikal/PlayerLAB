"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { GlassContainer } from "@/components/ui/glass-container"
import { GlowButton } from "@/components/ui/glow-button"
import { Mail, Twitter, MapPin, Send, CheckCircle } from "lucide-react"

const contactDetails = [
  {
    icon: Mail,
    title: "Email",
    value: "support@playerlab.app",
    delay: 0.2,
    teamColor: "cyan" as const,
  },
  {
    icon: Twitter,
    title: "Twitter",
    value: "@PlayerLAB",
    delay: 0.4,
    teamColor: "blue" as const,
  },
  {
    icon: MapPin,
    title: "Address",
    value: "123 Fantasy Blvd, Sports City",
    delay: 0.6,
    teamColor: "green" as const,
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitted(true)
        setIsSubmitting(false)
        setFormData({ name: "", email: "", subject: "", message: "" })
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-orbitron font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in touch with our team. We're here to help you dominate your fantasy leagues.
          </motion.p>
        </div>
      </section>

      {/* Contact Form and Details */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <GlassContainer className="p-8" animated teamColor="cyan">
              <h2 className="text-2xl font-orbitron font-bold mb-6 neon-text">Send us a Message</h2>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-neon-green" />
                  <h3 className="text-xl font-bold mb-2 text-neon-green">Message Sent!</h3>
                  <p className="text-text-secondary">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`glass-input w-full ${
                        errors.name ? "border-neon-red shadow-glow" : "focus:border-neon-cyan"
                      }`}
                    />
                    {errors.name && <p className="text-neon-red text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`glass-input w-full ${
                        errors.email ? "border-neon-red shadow-glow" : "focus:border-neon-cyan"
                      }`}
                    />
                    {errors.email && <p className="text-neon-red text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`glass-input w-full ${
                        errors.subject ? "border-neon-red shadow-glow" : "focus:border-neon-cyan"
                      }`}
                    />
                    {errors.subject && <p className="text-neon-red text-sm mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`glass-input w-full resize-none ${
                        errors.message ? "border-neon-red shadow-glow" : "focus:border-neon-cyan"
                      }`}
                    />
                    {errors.message && <p className="text-neon-red text-sm mt-1">{errors.message}</p>}
                  </div>

                  <GlowButton size="lg" teamColor="cyan" disabled={isSubmitting} className="w-full animate-hover-pulse">
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </GlowButton>
                </form>
              )}
            </GlassContainer>

            {/* Contact Details */}
            <div className="space-y-6">
              <motion.h2
                className="text-2xl font-orbitron font-bold neon-text"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Get in Touch
              </motion.h2>

              {contactDetails.map((detail, index) => (
                <GlassContainer key={index} delay={detail.delay} hover teamColor={detail.teamColor}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 glass-container rounded-full flex items-center justify-center neon-glow">
                      <detail.icon className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-text-primary">{detail.title}</h3>
                      <p className="text-text-secondary">{detail.value}</p>
                    </div>
                  </div>
                </GlassContainer>
              ))}

              {/* Map Placeholder */}
              <GlassContainer className="h-64 flex items-center justify-center" animated delay={0.8} teamColor="purple">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-neon-purple opacity-50" />
                  <p className="text-text-secondary">Interactive Map Coming Soon</p>
                  <p className="text-text-secondary text-sm mt-2">Phase 3 Integration</p>
                </div>
              </GlassContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
