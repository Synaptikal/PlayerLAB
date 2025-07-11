import { NextResponse } from "next/server"

export async function GET() {
  const mockChartData = {
    weeklyTrends: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
      datasets: [
        {
          label: "Waiver Adds",
          data: [120, 145, 180, 165, 200, 175, 190, 210],
          borderColor: "#00FFFF",
          backgroundColor: "rgba(0, 255, 255, 0.1)",
          tension: 0.4,
        },
        {
          label: "Drops",
          data: [100, 130, 160, 140, 180, 155, 170, 185],
          borderColor: "#FF4C4C",
          backgroundColor: "rgba(255, 76, 76, 0.1)",
          tension: 0.4,
        },
      ],
    },
    positionBreakdown: {
      labels: ["QB", "RB", "WR", "TE", "K", "DEF"],
      datasets: [
        {
          data: [15, 35, 30, 12, 4, 4],
          backgroundColor: ["#00FFFF", "#FF00FF", "#00FF6A", "#FF4C4C", "#FFFF00", "#FF8C00"],
          borderWidth: 2,
          borderColor: "#FFFFFF",
        },
      ],
    },
  }

  return NextResponse.json(mockChartData)
}
