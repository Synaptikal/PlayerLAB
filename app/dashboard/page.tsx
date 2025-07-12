"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  Target, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Clock
} from "lucide-react";

interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  conversionRate: number;
  avgSessionDuration: number;
  topPlayers: Array<{
    name: string;
    team: string;
    position: string;
    points: number;
    change: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: string;
    user: string;
  }>;
  systemStatus: {
    servers: "online" | "offline" | "maintenance";
    database: "online" | "offline" | "maintenance";
    api: "online" | "offline" | "maintenance";
    cdn: "online" | "offline" | "maintenance";
  };
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<"1h" | "24h" | "7d" | "30d">("24h");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: DashboardData = {
        totalUsers: 15420,
        activeUsers: 3240,
        conversionRate: 8.7,
        avgSessionDuration: 4.2,
        topPlayers: [
          { name: "Christian McCaffrey", team: "SF", position: "RB", points: 28.5, change: 12.3 },
          { name: "Tyreek Hill", team: "MIA", position: "WR", points: 26.8, change: 8.7 },
          { name: "Josh Allen", team: "BUF", position: "QB", points: 24.2, change: -2.1 },
          { name: "Travis Kelce", team: "KC", position: "TE", points: 22.1, change: 5.4 }
        ],
        recentActivity: [
          { id: "1", type: "trade", message: "Trade completed: McCaffrey for Hill", timestamp: "2 min ago", user: "user123" },
          { id: "2", type: "waiver", message: "Waiver claim processed", timestamp: "5 min ago", user: "user456" },
          { id: "3", type: "analysis", message: "Player analysis completed", timestamp: "8 min ago", user: "user789" }
        ],
        systemStatus: {
          servers: "online",
          database: "online", 
          api: "online",
          cdn: "online"
        }
      };
      
      setDashboardData(mockData);
      setLoading(false);
    };

    fetchDashboardData();
  }, [selectedTimeframe]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "text-green-400";
      case "offline": return "text-red-400";
      case "maintenance": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "offline": return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case "maintenance": return <Clock className="w-4 h-4 text-yellow-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-white text-xl">No dashboard data available</div>
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
            <BarChart3 className="text-blue-400" />
            Dashboard
          </h1>
          <p className="text-gray-300">
            Monitor your fantasy football platform performance and user activity
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-6">
          {(["1h", "24h", "7d", "30d"] as const).map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? "default" : "outline"}
              onClick={() => setSelectedTimeframe(timeframe)}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              {timeframe === "1h" ? "1 Hour" : timeframe === "24h" ? "24 Hours" : timeframe === "7d" ? "7 Days" : "30 Days"}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-white">
                    {dashboardData.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    +12.5%
                  </p>
                </div>
                <Users className="text-blue-400 w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-white">
                    {dashboardData.activeUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    +8.2%
                  </p>
                </div>
                <Activity className="text-green-400 w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Conversion Rate</p>
                  <p className="text-2xl font-bold text-white">
                    {dashboardData.conversionRate}%
                  </p>
                  <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    +2.1%
                  </p>
                </div>
                <Target className="text-purple-400 w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg Session</p>
                  <p className="text-2xl font-bold text-white">
                    {dashboardData.avgSessionDuration}m
                  </p>
                  <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    +18s
                  </p>
                </div>
                <Clock className="text-yellow-400 w-8 h-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-white">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(dashboardData.systemStatus).map(([service, status]) => (
                <div key={service} className="flex items-center gap-3">
                  {getStatusIcon(status)}
                  <div>
                    <p className="text-white font-medium capitalize">{service}</p>
                    <p className={`text-sm ${getStatusColor(status)}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Players */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Top Performing Players</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.topPlayers.map((player, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium">{player.name}</p>
                        <p className="text-sm text-gray-400">{player.team} • {player.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{player.points} pts</p>
                      <p className={`text-sm ${player.change > 0 ? "text-green-400" : "text-red-400"}`}>
                        {player.change > 0 ? "+" : ""}{player.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-400">{activity.user}</p>
                        <span className="text-xs text-gray-500">•</span>
                        <p className="text-xs text-gray-400">{activity.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 