"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from 'lucide-react';interface AnalysisData {
  playerName: string;
  team: string;
  position: string;
  analysis: string;
  confidence: number;
  trend: "up" | "down" | "stable";
  sources: string[];
  lastUpdated: string;
}

export default function AnalysisPage() {
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalysis = useCallback(async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockData: AnalysisData[] = [
      {
        playerName: "Christian McCaffrey",
        team: "SF",
        position: "RB",
        analysis: "Strong performance with high volume. Excellent ROS outlook.",
        confidence: 85,
        trend: "up",
        sources: ["Sleeper", "ESPN", "FantasyPros"],
        lastUpdated: "2 hours ago"
      },
      {
        playerName: "Tyreek Hill",
        team: "MIA",
        position: "WR",
        analysis: "Consistent production with high target share. WR1 potential.",
        confidence: 78,
        trend: "up",
        sources: ["Sleeper", "ESPN", "FantasyPros"],
        lastUpdated: "1 hour ago"
      }
    ];
    
    setAnalysisData(mockData);
    setLoading(false);
  }, []);

  const filterAnalysis = useCallback(() => {
    // logic would go here
    return analysisData;
  }, [analysisData]);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  useEffect(() => {
    filterAnalysis();
  }, [filterAnalysis]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading analysis...</div>
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
            <Brain className="text-purple-400" />
            Player Analysis
          </h1>
          <p className="text-gray-300">
            AI-powered insights and analysis for NFL fantasy football players
          </p>
        </div>

        {/* Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {analysisData.map((analysis, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{analysis.playerName}</CardTitle>
                    <p className="text-gray-400">{analysis.team} • {analysis.position}</p>
                  </div>
                  <Badge className={`${
                    analysis.trend === "up" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                    analysis.trend === "down" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                    "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  }`}>
                    {analysis.confidence}% Confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{analysis.analysis}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Sources: {analysis.sources.join(", ")}</span>
                  <span className="text-gray-400">{analysis.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 