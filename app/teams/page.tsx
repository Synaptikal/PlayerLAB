"use client"

import { useState } from 'react';import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, TrendingUp, BarChart3, Shield,  Star } from 'lucide-react';interface Team {
  id: string
  name: string
  abbreviation: string
  city: string
  conference: string
  division: string
  logoUrl: string
  primaryColor: string
  secondaryColor: string
  record: string
  wins: number
  losses: number
  ties: number
  pointsFor: number
  pointsAgainst: number
  fantasyPlayers: Player[]
  depthChart: DepthChart
  teamStats: TeamStats
}

interface Player {
  id: string
  name: string
  position: string
  fantasyPoints: number
  projectedPoints: number
  ownership: number
  status: string
}

interface DepthChart {
  QB: Player[]
  RB: Player[]
  WR: Player[]
  TE: Player[]
  K: Player[]
  DEF: Player[]
}

interface TeamStats {
  totalYards: number
  passingYards: number
  rushingYards: number
  pointsPerGame: number
  fantasyPointsPerGame: number
  strengthOfSchedule: number
  playoffChance: number
}

// Mock teams data
const teams: Team[] = [
  {
    id: "1",
    name: "Chiefs",
    abbreviation: "KC",
    city: "Kansas City",
    conference: "AFC",
    division: "West",
    logoUrl: "/teams/chiefs.png",
    primaryColor: "#E31837",
    secondaryColor: "#FFB81C",
    record: "11-6",
    wins: 11,
    losses: 6,
    ties: 0,
    pointsFor: 371,
    pointsAgainst: 294,
    fantasyPlayers: [],
    depthChart: { QB: [], RB: [], WR: [], TE: [], K: [], DEF: [] },
    teamStats: {
      totalYards: 5856,
      passingYards: 4250,
      rushingYards: 1606,
      pointsPerGame: 21.8,
      fantasyPointsPerGame: 145.2,
      strengthOfSchedule: 0.512,
      playoffChance: 0.85
    }
  },
  {
    id: "2",
    name: "Bills",
    abbreviation: "BUF",
    city: "Buffalo",
    conference: "AFC",
    division: "East",
    logoUrl: "/teams/bills.png",
    primaryColor: "#00338D",
    secondaryColor: "#C60C30",
    record: "11-6",
    wins: 11,
    losses: 6,
    ties: 0,
    pointsFor: 451,
    pointsAgainst: 311,
    fantasyPlayers: [],
    depthChart: { QB: [], RB: [], WR: [], TE: [], K: [], DEF: [] },
    teamStats: {
      totalYards: 6213,
      passingYards: 4283,
      rushingYards: 1930,
      pointsPerGame: 26.5,
      fantasyPointsPerGame: 158.7,
      strengthOfSchedule: 0.498,
      playoffChance: 0.78
    }
  }
  // Add more teams as needed
]

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [conferenceFilter, setConferenceFilter] = useState("all")
  const [divisionFilter, setDivisionFilter] = useState("all")

  const filteredTeams = teams.filter(team => {
    const matchesConference = conferenceFilter === "all" || team.conference === conferenceFilter
    const matchesDivision = divisionFilter === "all" || team.division === divisionFilter
    return matchesConference && matchesDivision
  })

  const getTeamColor = (team: Team) => {
    return team.primaryColor
  }

  const getRecordColor = (wins: number, losses: number) => {
    const winPercentage = wins / (wins + losses)
    if (winPercentage >= 0.6) return "text-green-500"
    if (winPercentage >= 0.4) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.h1 
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          NFL Team Analysis
        </motion.h1>
        <p className="text-gray-600 max-w-2xl">
          Comprehensive analysis of all 32 NFL teams with depth charts, fantasy insights, and team statistics.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Team Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <select 
              value={conferenceFilter}
              onChange={(e) => setConferenceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Conferences</option>
              <option value="AFC">AFC</option>
              <option value="NFC">NFC</option>
            </select>
            <select 
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Divisions</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredTeams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedTeam(team)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: getTeamColor(team) }}
                    >
                      {team.abbreviation}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                        {team.city} {team.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{team.conference}</Badge>
                        <Badge variant="outline">{team.division}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Record</span>
                    <span className={`font-semibold ${getRecordColor(team.wins, team.losses)}`}>
                      {team.record}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Points For</span>
                    <span className="font-medium">{team.pointsFor}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Points Against</span>
                    <span className="font-medium">{team.pointsAgainst}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fantasy PPG</span>
                    <span className="font-medium">{team.teamStats.fantasyPointsPerGame.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Team Details Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: getTeamColor(selectedTeam) }}
                >
                  {selectedTeam.abbreviation}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedTeam.city} {selectedTeam.name}</h2>
                  <p className="text-gray-600">{selectedTeam.conference} {selectedTeam.division}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedTeam(null)}>
                Close
              </Button>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="depth-chart">Depth Chart</TabsTrigger>
                <TabsTrigger value="fantasy">Fantasy</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        Season Record
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Record:</span>
                          <span className={`font-semibold ${getRecordColor(selectedTeam.wins, selectedTeam.losses)}`}>
                            {selectedTeam.record}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Wins:</span>
                          <span className="font-medium">{selectedTeam.wins}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Losses:</span>
                          <span className="font-medium">{selectedTeam.losses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Points For:</span>
                          <span className="font-medium">{selectedTeam.pointsFor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Points Against:</span>
                          <span className="font-medium">{selectedTeam.pointsAgainst}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Team Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Yards:</span>
                          <span className="font-medium">{selectedTeam.teamStats.totalYards.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Passing Yards:</span>
                          <span className="font-medium">{selectedTeam.teamStats.passingYards.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rushing Yards:</span>
                          <span className="font-medium">{selectedTeam.teamStats.rushingYards.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Points Per Game:</span>
                          <span className="font-medium">{selectedTeam.teamStats.pointsPerGame.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fantasy PPG:</span>
                          <span className="font-medium">{selectedTeam.teamStats.fantasyPointsPerGame.toFixed(1)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="depth-chart" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(selectedTeam.depthChart).map(([position, players]) => (
                    <Card key={position}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {position}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {players.length > 0 ? (
                          <div className="space-y-2">
                            {players.map((player, index) => (
                              <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{index + 1}.</span>
                                  <span>{player.name}</span>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">{player.fantasyPoints.toFixed(1)} pts</div>
                                  <div className="text-xs text-gray-500">{player.ownership}% owned</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-4">No players available</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="fantasy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Fantasy Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedTeam.teamStats.fantasyPointsPerGame.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600">Fantasy PPG</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {(selectedTeam.teamStats.playoffChance * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">Playoff Chance</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {selectedTeam.teamStats.strengthOfSchedule.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">SOS Rating</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Advanced Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Offensive Stats</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Total Yards:</span>
                              <span>{selectedTeam.teamStats.totalYards.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Passing Yards:</span>
                              <span>{selectedTeam.teamStats.passingYards.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Rushing Yards:</span>
                              <span>{selectedTeam.teamStats.rushingYards.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Points Per Game:</span>
                              <span>{selectedTeam.teamStats.pointsPerGame.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Fantasy Impact</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Fantasy PPG:</span>
                              <span>{selectedTeam.teamStats.fantasyPointsPerGame.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Strength of Schedule:</span>
                              <span>{selectedTeam.teamStats.strengthOfSchedule.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Playoff Chance:</span>
                              <span>{(selectedTeam.teamStats.playoffChance * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
} 