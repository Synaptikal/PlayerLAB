"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from 'lucide-react';interface HypePlayer {
  id: string;
  name: string;
  team: string;
  position: string;
  hypeScore: number;
  sentiment: "positive" | "negative" | "neutral";
  mentions: number;
  platforms: string[];
  trendingTopics: string[];
  lastUpdated: string;
}

export default function HypePage() {
  const [hypePlayers, setHypePlayers] = useState<HypePlayer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHypePlayers = useCallback(async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockData: HypePlayer[] = [
      {
        id: "1",
        name: "Christian McCaffrey",
        team: "SF",
        position: "RB",
        hypeScore: 95,
        sentiment: "positive",
        mentions: 15420,
        platforms: ["Twitter", "Reddit", "Instagram"],
        trendingTopics: ["#CMC", "#FantasyFootball", "#NFL"],
        lastUpdated: "2 hours ago"
      },
      {
        id: "2",
        name: "Tyreek Hill",
        team: "MIA",
        position: "WR",
        hypeScore: 87,
        sentiment: "positive",
        mentions: 12340,
        platforms: ["Twitter", "Reddit"],
        trendingTopics: ["#Cheetah", "#FantasyFootball"],
        lastUpdated: "1 hour ago"
      }
    ];
    
    setHypePlayers(mockData);
    setLoading(false);
  }, []);

  const filterPlayers = useCallback(() => {
    // logic would go here
    return hypePlayers;
  }, [hypePlayers]);

  useEffect(() => {
    fetchHypePlayers();
  }, [fetchHypePlayers]);

  useEffect(() => {
    filterPlayers();
  }, [filterPlayers]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading hype data...</div>
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
            <Zap className="text-pink-400" />
            Social Hype
          </h1>
          <p className="text-gray-300">
            Monitor NFL social media buzz and community sentiment
          </p>
        </div>

        {/* Hype Players Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hypePlayers.map((player) => (
            <Card key={player.id} className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{player.name}</CardTitle>
                    <p className="text-gray-400">{player.team} • {player.position}</p>
                  </div>
                  <Badge className={`${
                    player.sentiment === "positive" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                    player.sentiment === "negative" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                    "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  }`}>
                    {player.hypeScore} Hype Score
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Mentions:</span>
                    <span className="text-white font-semibold">{player.mentions.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Platforms:</span>
                    <div className="flex gap-2 mt-1">
                      {player.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Trending Topics:</span>
                    <div className="flex gap-2 mt-1">
                      {player.trendingTopics.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Updated: {player.lastUpdated}
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