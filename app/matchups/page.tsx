"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from 'lucide-react';interface Matchup {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  week: number;
  status: "completed" | "live" | "upcoming";
  players: Array<{
    name: string;
    team: string;
    position: string;
    points: number;
  }>;
}

export default function MatchupsPage() {
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [loading, setLoading] = useState(true);
  // const [selectedWeek, setSelectedWeek] = useState<number>(1);

  // Mock data
  const mockMatchups: Matchup[] = [
    {
      id: "1",
      homeTeam: "Team Alpha",
      awayTeam: "Team Beta",
      homeScore: 125.4,
      awayScore: 118.7,
      week: 1,
      status: "completed",
      players: [
        { name: "Christian McCaffrey", team: "SF", position: "RB", points: 28.5 },
        { name: "Tyreek Hill", team: "MIA", position: "WR", points: 24.2 }
      ]
    },
    {
      id: "2",
      homeTeam: "Team Gamma",
      awayTeam: "Team Delta",
      homeScore: 0,
      awayScore: 0,
      week: 1,
      status: "upcoming",
      players: []
    }
  ];

  // Simulate loading
  useState(() => {
    setTimeout(() => {
      setMatchups(mockMatchups);
      setLoading(false);
    }, 1000);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading matchups...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Trophy className="text-yellow-400" />
            Matchups
          </h1>
          <p className="text-gray-300">
            Track your fantasy football matchups and results
          </p>
        </div>

        {/* Matchups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {matchups.map((matchup) => (
            <Card key={matchup.id} className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Week {matchup.week}</CardTitle>
                    <p className="text-gray-400">{matchup.homeTeam} vs {matchup.awayTeam}</p>
                  </div>
                  <Badge className={`${
                    matchup.status === "completed" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                    matchup.status === "live" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                    "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  }`}>
                    {matchup.status.charAt(0).toUpperCase() + matchup.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{matchup.homeTeam}</span>
                    <span className="text-white font-bold">{matchup.homeScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{matchup.awayTeam}</span>
                    <span className="text-white font-bold">{matchup.awayScore}</span>
                  </div>
                  {matchup.players.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Top Performers:</p>
                      <div className="space-y-1">
                        {matchup.players.map((player, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">{player.name} ({player.position})</span>
                            <span className="text-white">{player.points} pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 