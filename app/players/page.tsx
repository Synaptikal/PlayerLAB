"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  points: number;
  trend: "up" | "down" | "stable";
  change: number;
  rank: number;
  status: "active" | "injured" | "questionable";
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  ;
  const [selectedPosition] = useState<string>("all");

  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockData: Player[] = [
      {
        id: "1",
        name: "Christian McCaffrey",
        team: "SF",
        position: "RB",
        points: 28.5,
        trend: "up",
        change: 12.3,
        rank: 1,
        status: "active"
      },
      {
        id: "2",
        name: "Tyreek Hill",
        team: "MIA",
        position: "WR",
        points: 26.8,
        trend: "up",
        change: 8.7,
        rank: 2,
        status: "active"
      }
    ];
    
    setPlayers(mockData);
    setLoading(false);
  }, []);

  const filterPlayers = useCallback(() => {
    // logic would go here
    return players;
  }, [players]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  useEffect(() => {
    filterPlayers();
  }, [filterPlayers]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading players...</div>
          </div>
        </div>
      </div>
    );
  }

  const filtered = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedPosition === "all" || player.position === selectedPosition)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Users className="text-blue-400" />
            Players
          </h1>
          <p className="text-gray-300">
            Browse and analyze NFL fantasy football players
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((player) => (
            <Card key={player.id} className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{player.name}</CardTitle>
                    <p className="text-gray-400">{player.team} • {player.position}</p>
                  </div>
                  <Badge className={`${
                    player.status === "active" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                    player.status === "injured" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                    "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  }`}>
                    #{player.rank}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Points:</span>
                    <span className="text-white font-semibold">{player.points}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Change:</span>
                    <div className="flex items-center gap-1">
                      {player.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : player.trend === "down" ? (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      ) : (
                        <BarChart3 className="w-4 h-4 text-blue-400" />
                      )}
                      <span className={`text-sm ${
                        player.change > 0 ? "text-green-400" : "text-red-400"
                      }`}>
                        {player.change > 0 ? "+" : ""}{player.change}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 