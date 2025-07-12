"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Calendar, 
  TrendingUp, 
  Target, 
  CheckCircle 
} from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  progress: number;
  maxProgress: number;
  reward: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
}

interface AchievementCategory {
  name: string;
  icon: string;
  achievements: Achievement[];
  totalProgress: number;
  totalAchievements: number;
}

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"progress" | "rarity" | "name">("progress");

  // Mock achievement data
  const achievementCategories: AchievementCategory[] = [
    {
      name: "League Master",
      icon: "🏆",
      totalProgress: 75,
      totalAchievements: 12,
      achievements: [
        {
          id: "1",
          name: "First Victory",
          description: "Win your first fantasy football matchup",
          category: "League Master",
          progress: 100,
          maxProgress: 100,
          reward: "100 XP",
          icon: "🎯",
          rarity: "common",
          unlocked: true,
          unlockedAt: "2024-01-15",
          xpReward: 100
        },
        {
          id: "2",
          name: "Perfect Week",
          description: "Score the highest points in your league for a week",
          category: "League Master",
          progress: 0,
          maxProgress: 1,
          reward: "500 XP",
          icon: "⭐",
          rarity: "rare",
          unlocked: false,
          xpReward: 500
        }
      ]
    },
    {
      name: "Analytics Expert",
      icon: "📊",
      totalProgress: 40,
      totalAchievements: 8,
      achievements: [
        {
          id: "3",
          name: "Data Explorer",
          description: "Use analytics tools 10 times",
          category: "Analytics Expert",
          progress: 7,
          maxProgress: 10,
          reward: "200 XP",
          icon: "📈",
          rarity: "common",
          unlocked: false,
          xpReward: 200
        }
      ]
    }
  ];

  const allAchievements = achievementCategories.flatMap(cat => cat.achievements);
  
  const filteredAchievements = selectedCategory === "all" 
    ? allAchievements 
    : allAchievements.filter(achievement => achievement.category === selectedCategory);

  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    switch (sortBy) {
      case "progress":
        return (b.progress / b.maxProgress) - (a.progress / a.maxProgress);
      case "rarity":
        const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "epic": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "rare": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "common": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "💎";
      case "epic": return "💜";
      case "rare": return "🔷";
      case "common": return "⚪";
      default: return "⚪";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Trophy className="text-yellow-400" />
            Achievements
          </h1>
          <p className="text-gray-300">
            Track your progress and unlock rewards as you master fantasy football
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Achievements</p>
                  <p className="text-2xl font-bold text-white">20</p>
                </div>
                <Trophy className="text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Unlocked</p>
                  <p className="text-2xl font-bold text-green-400">8</p>
                </div>
                <Star className="text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total XP Earned</p>
                  <p className="text-2xl font-bold text-blue-400">2,450</p>
                </div>
                <TrendingUp className="text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completion Rate</p>
                  <p className="text-2xl font-bold text-purple-400">40%</p>
                </div>
                <Target className="text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className="bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            All Categories
          </Button>
          {achievementCategories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-gray-300">Sort by:</span>
          <div className="flex gap-2">
            {(["progress", "rarity", "name"] as const).map((sort) => (
              <Button
                key={sort}
                variant={sortBy === sort ? "default" : "outline"}
                onClick={() => setSortBy(sort)}
                size="sm"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAchievements.map((achievement) => (
            <Card 
              key={achievement.id}
              className={`bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 ${
                achievement.unlocked ? 'ring-2 ring-green-500/50' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <CardTitle className="text-white text-lg">{achievement.name}</CardTitle>
                      <Badge className={`mt-1 ${getRarityColor(achievement.rarity)}`}>
                        {getRarityIcon(achievement.rarity)} {achievement.rarity}
                      </Badge>
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <div className="text-green-400">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Reward:</span>
                    <span className="text-yellow-400 font-semibold">{achievement.reward}</span>
                  </div>
                  
                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
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