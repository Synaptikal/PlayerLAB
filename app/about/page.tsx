"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, Mail, X } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former data scientist with 10+ years in football analytics. Led analytics teams at ESPN and Yahoo Sports before founding PlayerLAB to democratize fantasy football insights.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Sarah Johnson",
    role: "Head of Product",
    bio: "Fantasy football enthusiast and UX design expert. Previously designed user experiences at DraftKings and FanDuel, bringing deep understanding of fantasy football player needs.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Mike Rodriguez",
    role: "Lead Developer",
    bio: "Full-stack engineer specializing in real-time data systems. Built scalable infrastructure at major tech companies, now focused on delivering lightning-fast fantasy insights.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="title-lg font-orbitron font-bold mb-3 neon-blue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ABOUT PLAYERLAB
          </motion.h1>
          <motion.p
            className="text-compact text-dark-grey max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Building the future of fantasy football analytics with AI-driven insights and cutting-edge tools.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="fantasy-panel p-8 text-center glow-cyan">
            <Target className="w-12 h-12 mx-auto mb-4 neon-cyan" />
            <h2 className="title-md font-orbitron font-bold mb-4 neon-blue">OUR MISSION</h2>
            <p className="text-compact text-dark-grey leading-relaxed max-w-2xl mx-auto">
              PlayerLAB exists to revolutionize fantasy football through advanced analytics, real-time insights, and
              AI-powered decision-making tools. We believe every fantasy player deserves access to{" "}
              <span className="neon-cyan font-semibold">professional-grade analytics</span>
              that were once exclusive to industry insiders.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="title-md font-orbitron font-bold text-center mb-8 neon-blue"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            MEET OUR TEAM
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="fantasy-panel text-center group cursor-pointer"
                  onClick={() => setSelectedMember(index)}
                >
                  <div className="relative mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="w-20 h-20 mx-auto rounded-full object-cover"
                    />
                  </div>
                  <h3 className="title-sm font-orbitron font-semibold mb-1 text-primary-dark">{member.name}</h3>
                  <p className="text-compact neon-cyan font-medium mb-2">{member.role}</p>
                  <p className="text-micro text-medium-grey opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to read bio
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Modal */}
      <AnimatePresence>
        {selectedMember !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              className="relative max-w-lg w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="fantasy-panel p-6">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-3 right-3 text-medium-grey hover:neon-cyan transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <Image
                    src={teamMembers[selectedMember].image || "/placeholder.svg"}
                    alt={teamMembers[selectedMember].name}
                    width={80}
                    height={80}
                    className="w-16 h-16 mx-auto rounded-full object-cover mb-3"
                  />
                  <h3 className="title-sm font-orbitron font-bold mb-1 text-primary-dark">
                    {teamMembers[selectedMember].name}
                  </h3>
                  <p className="text-compact neon-cyan font-medium mb-4">{teamMembers[selectedMember].role}</p>
                  <p className="text-compact text-dark-grey leading-relaxed">{teamMembers[selectedMember].bio}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact CTA */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="fantasy-panel p-8 text-center glow-blue">
            <Mail className="w-12 h-12 mx-auto mb-4 neon-cyan" />
            <h2 className="title-md font-orbitron font-bold mb-4 neon-blue">READY TO CONNECT?</h2>
            <p className="text-compact text-dark-grey mb-6">
              Have questions about PlayerLAB or want to join our mission? We&apos;d love to hear from you.
            </p>
            <button className="btn-compact glow-blue">GET IN TOUCH</button>
          </div>
        </div>
      </section>
    </div>
  )
}
