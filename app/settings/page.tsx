"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HolographicBackground } from "@/components/ui/holographic-background"
import { GlassContainer } from "@/components/ui/glass-container"
import { GlowButton } from "@/components/ui/glow-button"
import { Input } from "@/components/ui/input"
import { 
  Settings, 
  User, 
  Bell, 
  Palette, 
  Shield, 
  Database,
  Moon,
  Sun,
  Monitor,
  Save,
  Trash2
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [theme, setTheme] = useState("dark")

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
    { id: "data", label: "Data", icon: Database },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Holographic Background */}
      <HolographicBackground />

      {/* Header */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="holographic-projection w-16 h-16 mx-auto mb-6">
              <Settings className="w-8 h-8 neon-cyan" />
            </div>
            <h1 className="title-lg font-orbitron font-bold mb-4 neon-cyan">SETTINGS</h1>
            <div className="flex items-center justify-center gap-2 text-compact text-purple-400 font-mono">
              <Shield className="w-4 h-4 animate-pulse" />
              <span>&gt; CONFIGURE YOUR PLAYERLAB EXPERIENCE</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Settings Layout */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <GlassContainer className="p-6">
                <h2 className="text-lg font-orbitron font-bold mb-6 text-neon-cyan">Settings</h2>
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                          activeTab === tab.id
                            ? "bg-neon-cyan text-deep-black shadow-glow"
                            : "text-text-secondary hover:bg-glass-dark"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-orbitron text-sm">{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </GlassContainer>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <GlassContainer className="p-8">
                {activeTab === "profile" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-orbitron font-bold mb-6 text-neon-cyan">Profile Settings</h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-orbitron text-text-secondary mb-2">First Name</label>
                          <Input placeholder="Enter your first name" />
                        </div>
                        <div>
                          <label className="block text-sm font-orbitron text-text-secondary mb-2">Last Name</label>
                          <Input placeholder="Enter your last name" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-orbitron text-text-secondary mb-2">Email</label>
                        <Input placeholder="your.email@example.com" type="email" />
                      </div>
                      <div>
                        <label className="block text-sm font-orbitron text-text-secondary mb-2">Username</label>
                        <Input placeholder="Choose a username" />
                      </div>
                      <div>
                        <label className="block text-sm font-orbitron text-text-secondary mb-2">Bio</label>
                        <textarea
                          placeholder="Tell us about yourself..."
                          className="glass-input w-full h-24 resize-none"
                        />
                      </div>
                      <GlowButton teamColor="cyan">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </GlowButton>
                    </div>
                  </motion.div>
                )}

                {activeTab === "notifications" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-orbitron font-bold mb-6 text-neon-cyan">Notification Preferences</h2>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 glass-container rounded-lg">
                          <div>
                            <h3 className="font-orbitron font-semibold text-primary-dark">Player Updates</h3>
                            <p className="text-sm text-text-secondary">Get notified when your tracked players have news</p>
                          </div>
                          <input type="checkbox" className="w-4 h-4 text-neon-cyan" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 glass-container rounded-lg">
                          <div>
                            <h3 className="font-orbitron font-semibold text-primary-dark">Trade Alerts</h3>
                            <p className="text-sm text-text-secondary">Receive notifications about trade opportunities</p>
                          </div>
                          <input type="checkbox" className="w-4 h-4 text-neon-cyan" />
                        </div>
                        <div className="flex items-center justify-between p-4 glass-container rounded-lg">
                          <div>
                            <h3 className="font-orbitron font-semibold text-primary-dark">Weekly Reports</h3>
                            <p className="text-sm text-text-secondary">Get weekly performance summaries</p>
                          </div>
                          <input type="checkbox" className="w-4 h-4 text-neon-cyan" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "appearance" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-orbitron font-bold mb-6 text-neon-cyan">Appearance Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-orbitron font-semibold mb-4 text-primary-dark">Theme</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <button
                            onClick={() => setTheme("light")}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              theme === "light"
                                ? "border-neon-cyan shadow-glow"
                                : "border-white/20 hover:border-white/40"
                            }`}
                          >
                            <Sun className="w-6 h-6 mx-auto mb-2" />
                            <span className="font-orbitron text-sm">Light</span>
                          </button>
                          <button
                            onClick={() => setTheme("dark")}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              theme === "dark"
                                ? "border-neon-cyan shadow-glow"
                                : "border-white/20 hover:border-white/40"
                            }`}
                          >
                            <Moon className="w-6 h-6 mx-auto mb-2" />
                            <span className="font-orbitron text-sm">Dark</span>
                          </button>
                          <button
                            onClick={() => setTheme("auto")}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              theme === "auto"
                                ? "border-neon-cyan shadow-glow"
                                : "border-white/20 hover:border-white/40"
                            }`}
                          >
                            <Monitor className="w-6 h-6 mx-auto mb-2" />
                            <span className="font-orbitron text-sm">Auto</span>
                          </button>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-orbitron font-semibold mb-4 text-primary-dark">Holographic Effects</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 glass-container rounded-lg">
                            <div>
                              <h4 className="font-orbitron font-semibold text-primary-dark">Enable Animations</h4>
                              <p className="text-sm text-text-secondary">Show holographic background animations</p>
                            </div>
                            <input type="checkbox" className="w-4 h-4 text-neon-cyan" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-4 glass-container rounded-lg">
                            <div>
                              <h4 className="font-orbitron font-semibold text-primary-dark">Glow Effects</h4>
                              <p className="text-sm text-text-secondary">Enable neon glow on interactive elements</p>
                            </div>
                            <input type="checkbox" className="w-4 h-4 text-neon-cyan" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "security" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-orbitron font-bold mb-6 text-neon-cyan">Security Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-orbitron text-text-secondary mb-2">Current Password</label>
                        <Input type="password" placeholder="Enter current password" />
                      </div>
                      <div>
                        <label className="block text-sm font-orbitron text-text-secondary mb-2">New Password</label>
                        <Input type="password" placeholder="Enter new password" />
                      </div>
                      <div>
                        <label className="block text-sm font-orbitron text-text-secondary mb-2">Confirm Password</label>
                        <Input type="password" placeholder="Confirm new password" />
                      </div>
                      <GlowButton teamColor="cyan">
                        Update Password
                      </GlowButton>
                    </div>
                  </motion.div>
                )}

                {activeTab === "data" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-orbitron font-bold mb-6 text-neon-cyan">Data Management</h2>
                    <div className="space-y-6">
                      <div className="p-6 glass-container rounded-lg">
                        <h3 className="text-lg font-orbitron font-semibold mb-2 text-primary-dark">Export Data</h3>
                        <p className="text-sm text-text-secondary mb-4">Download all your PlayerLAB data including vault players, settings, and preferences.</p>
                        <GlowButton teamColor="blue" size="sm">
                          Export Data
                        </GlowButton>
                      </div>
                      <div className="p-6 glass-container rounded-lg border border-neon-red/30">
                        <h3 className="text-lg font-orbitron font-semibold mb-2 text-neon-red">Danger Zone</h3>
                        <p className="text-sm text-text-secondary mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                        <button className="px-4 py-2 bg-neon-red text-white rounded-lg font-orbitron text-sm hover:bg-neon-red/80 transition-colors">
                          <Trash2 className="w-4 h-4 mr-2 inline" />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </GlassContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 