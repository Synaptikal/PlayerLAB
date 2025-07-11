"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, User, Shield, Bell, Palette, Database, Globe, Key } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [autoSync, setAutoSync] = useState(true)
  const [leagueType, setLeagueType] = useState("ppr")

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 pt-32 pb-16 px-6">
        {/* Header */}
        <motion.div
          className="max-w-7xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Settings
          </h1>
          <p className="text-slate-300 text-lg">
            Customize your PlayerLAB experience and manage your preferences
          </p>
        </motion.div>

        {/* Settings Sections */}
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Profile Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-orbitron font-semibold text-white mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-cyan-400" />
              Profile Settings
            </h2>
            <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-orbitron text-slate-400 mb-2 block">Display Name</label>
                  <Input
                    placeholder="Your display name"
                    defaultValue="FantasyChamp"
                    className="backdrop-blur-xl bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-orbitron text-slate-400 mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    defaultValue="user@playerlab.net"
                    className="backdrop-blur-xl bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-orbitron text-slate-400 mb-2 block">League Type</label>
                  <Select value={leagueType} onValueChange={setLeagueType}>
                    <SelectTrigger className="backdrop-blur-xl bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="League Type" />
                    </SelectTrigger>
                    <SelectContent className="backdrop-blur-xl bg-slate-900 border-cyan-400/30">
                      <SelectItem value="ppr">PPR</SelectItem>
                      <SelectItem value="half-ppr">Half PPR</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-orbitron text-slate-400 mb-2 block">Team Name</label>
                  <Input
                    placeholder="Your team name"
                    defaultValue="The Champions"
                    className="backdrop-blur-xl bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Notification Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-orbitron font-semibold text-white mb-6 flex items-center gap-2">
              <Bell className="w-6 h-6 text-cyan-400" />
              Notifications
            </h2>
            <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-white">Push Notifications</h3>
                    <p className="text-sm text-slate-300">Receive alerts for important updates</p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    className="data-[state=checked]:bg-cyan-400"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-white">Trade Alerts</h3>
                    <p className="text-sm text-slate-300">Get notified when trades are proposed</p>
                  </div>
                  <Switch
                    checked={true}
                    className="data-[state=checked]:bg-cyan-400"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-white">Waiver Updates</h3>
                    <p className="text-sm text-slate-300">Stay informed about waiver wire activity</p>
                  </div>
                  <Switch
                    checked={true}
                    className="data-[state=checked]:bg-cyan-400"
                  />
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Appearance Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-orbitron font-semibold text-white mb-6 flex items-center gap-2">
              <Palette className="w-6 h-6 text-cyan-400" />
              Appearance
            </h2>
            <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-white">Dark Mode</h3>
                    <p className="text-sm text-slate-300">Use dark theme for better visibility</p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    className="data-[state=checked]:bg-cyan-400"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-white">Holographic Effects</h3>
                    <p className="text-sm text-slate-300">Enable advanced visual effects</p>
                  </div>
                  <Switch
                    checked={true}
                    className="data-[state=checked]:bg-cyan-400"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-white">Animations</h3>
                    <p className="text-sm text-slate-300">Show smooth transitions and animations</p>
                  </div>
                  <Switch
                    checked={true}
                    className="data-[state=checked]:bg-cyan-400"
                  />
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Data & Sync Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-2xl font-orbitron font-semibold text-white mb-6 flex items-center gap-2">
              <Database className="w-6 h-6 text-cyan-400" />
              Data & Sync
            </h2>
            <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-white">Auto Sync</h3>
                    <p className="text-sm text-slate-300">Automatically sync with Sleeper API</p>
                  </div>
                  <Switch
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                    className="data-[state=checked]:bg-cyan-400"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-white">Cache Data</h3>
                    <p className="text-sm text-slate-300">Store data locally for offline access</p>
                  </div>
                  <Switch
                    checked={true}
                    className="data-[state=checked]:bg-cyan-400"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold text-white">Analytics</h3>
                    <p className="text-sm text-slate-300">Share usage data to improve the app</p>
                  </div>
                  <Switch
                    checked={false}
                    className="data-[state=checked]:bg-cyan-400"
                  />
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Security Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2 className="text-2xl font-orbitron font-semibold text-white mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-cyan-400" />
              Security
            </h2>
            <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-orbitron font-semibold text-white mb-4">API Keys</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Globe className="w-5 h-5 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-300">Sleeper API</p>
                        <p className="text-xs text-slate-500">Connected • Last sync: 2 hours ago</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-cyan-400/20"
                      >
                        Reconnect
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <Key className="w-5 h-5 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-300">Custom API</p>
                        <p className="text-xs text-slate-500">Not configured</p>
                      </div>
                      <Button
                        size="sm"
                        className="backdrop-blur-xl bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30"
                      >
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button
              className="backdrop-blur-xl bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-red-400/20 hover:border-red-400/50"
            >
              Reset to Defaults
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 