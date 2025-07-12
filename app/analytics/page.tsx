"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Zap
} from "lucide-react";

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
  topPages: Array<{
    name: string;
    views: number;
    change: number;
  }>;
  userEngagement: Array<{
    metric: string;
    value: number;
    change: number;
    trend: "up" | "down" | "stable";
  }>;
  deviceBreakdown: Array<{
    device: string;
    percentage: number;
    users: number;
  }>;
  geographicData: Array<{
    country: string;
    users: number;
    percentage: number;
  }>;
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  useEffect(() => {
    // Simulate API call
    const fetchAnalytics = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: AnalyticsData = {
        pageViews: 15420,
        uniqueVisitors: 3240,
        bounceRate: 42.3,
        avgSessionDuration: 4.2,
        conversionRate: 8.7,
        topPages: [
          { name: "Dashboard", views: 5420, change: 12.5 },
          { name: "Player Analysis", views: 3240, change: 8.2 },
          { name: "Trade Analyzer", views: 2180, change: -3.1 },
          { name: "News Feed", views: 1890, change: 15.7 },
          { name: "League Settings", views: 1560, change: 2.4 }
        ],
        userEngagement: [
          { metric: "Active Users", value: 2840, change: 15.2, trend: "up" },
          { metric: "Session Duration", value: 4.2, change: 8.7, trend: "up" },
          { metric: "Pages per Session", value: 3.8, change: -2.1, trend: "down" },
          { metric: "Bounce Rate", value: 42.3, change: -5.6, trend: "down" }
        ],
        deviceBreakdown: [
          { device: "Desktop", percentage: 58, users: 1879 },
          { device: "Mobile", percentage: 35, users: 1134 },
          { device: "Tablet", percentage: 7, users: 227 }
        ],
        geographicData: [
          { country: "United States", users: 1890, percentage: 58.3 },
          { country: "Canada", users: 420, percentage: 13.0 },
          { country: "United Kingdom", users: 324, percentage: 10.0 },
          { country: "Australia", users: 216, percentage: 6.7 },
          { country: "Germany", users: 162, percentage: 5.0 }
        ]
      };
      
      setAnalyticsData(mockData);
      setLoading(false);
    };

    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading analytics...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-white text-xl">No analytics data available</div>
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-400" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-400" />;
      case "stable": return <BarChart3 className="w-4 h-4 text-blue-400" />;
    }
  };

  const getTrendColor = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up": return "text-green-400";
      case "down": return "text-red-400";
      case "stable": return "text-blue-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <BarChart3 className="text-blue-400" />
            Analytics Dashboard
          </h1>
          <p className="text-gray-300">
            Track your platform performance and user engagement metrics
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-6">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              onClick={() => setTimeRange(range)}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Page Views</p>
                  <p className="text-2xl font-bold text-white">
                    {analyticsData.pageViews.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    +12.5%
                  </p>
                </div>
                <BarChart3 className="text-blue-400 w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Unique Visitors</p>
                  <p className="text-2xl font-bold text-white">
                    {analyticsData.uniqueVisitors.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    +8.2%
                  </p>
                </div>
                <Users className="text-green-400 w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg Session</p>
                  <p className="text-2xl font-bold text-white">
                    {analyticsData.avgSessionDuration}m
                  </p>
                  <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    +4.7%
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
                  <p className="text-sm text-gray-400">Conversion Rate</p>
                  <p className="text-2xl font-bold text-white">
                    {analyticsData.conversionRate}%
                  </p>
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <TrendingDown className="w-4 h-4" />
                    -1.2%
                  </p>
                </div>
                <Zap className="text-yellow-400 w-8 h-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">User Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.userEngagement.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTrendIcon(metric.trend)}
                      <span className="text-gray-300">{metric.metric}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        {typeof metric.value === "number" && metric.value % 1 === 0 
                          ? metric.value.toLocaleString() 
                          : metric.value}
                        {metric.metric === "Session Duration" && "m"}
                        {metric.metric === "Pages per Session" && ""}
                        {metric.metric === "Bounce Rate" && "%"}
                      </div>
                      <div className={`text-sm ${getTrendColor(metric.trend)}`}>
                        {metric.change > 0 ? "+" : ""}{metric.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Device Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.deviceBreakdown.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                      <span className="text-gray-300">{device.device}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{device.percentage}%</div>
                      <div className="text-sm text-gray-400">{device.users.toLocaleString()} users</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Pages */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-gray-300">{page.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{page.views.toLocaleString()}</div>
                    <div className={`text-sm ${page.change > 0 ? "text-green-400" : "text-red-400"}`}>
                      {page.change > 0 ? "+" : ""}{page.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Data */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.geographicData.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-gray-300">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{country.percentage}%</div>
                    <div className="text-sm text-gray-400">{country.users.toLocaleString()} users</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
