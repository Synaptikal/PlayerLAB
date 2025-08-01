import { NextResponse } from "next/server"

export async function GET() {
  const mockOverviewData = {
    mostAdded: [
      { id: "1", name: "Josh Jacobs", team: "LV", position: "RB", trend: "up" },
      { id: "2", name: "Tua Tagovailoa", team: "MIA", position: "QB", trend: "up" },
      { id: "3", name: "DeVonta Smith", team: "PHI", position: "WR", trend: "up" },
      { id: "4", name: "Tyler Higbee", team: "LAR", position: "TE", trend: "up" },
      { id: "5", name: "Gus Edwards", team: "BAL", position: "RB", trend: "up" },
    ],
    mostDropped: [
      { id: "6", name: "Leonard Fournette", team: "TB", position: "RB", trend: "down" },
      { id: "7", name: "Allen Robinson", team: "LAR", position: "WR", trend: "down" },
      { id: "8", name: "Matt Ryan", team: "IND", position: "QB", trend: "down" },
      { id: "9", name: "Cole Kmet", team: "CHI", position: "TE", trend: "down" },
      { id: "10", name: "Elijah Moore", team: "NYJ", position: "WR", trend: "down" },
    ],
    topPoints: [
      { id: "11", name: "Josh Allen", team: "BUF", position: "QB", points: 28.4 },
      { id: "12", name: "Christian McCaffrey", team: "SF", position: "RB", points: 26.8 },
      { id: "13", name: "Tyreek Hill", team: "MIA", position: "WR", points: 24.2 },
      { id: "14", name: "Travis Kelce", team: "KC", position: "TE", points: 22.6 },
      { id: "15", name: "Lamar Jackson", team: "BAL", position: "QB", points: 21.8 },
    ],
    injuryWatch: [
      { id: "16", name: "Keenan Allen", team: "LAC", position: "WR", trend: "stable" },
      { id: "17", name: "Dalvin Cook", team: "MIN", position: "RB", trend: "stable" },
      { id: "18", name: "Mike Williams", team: "LAC", position: "WR", trend: "stable" },
      { id: "19", name: "George Kittle", team: "SF", position: "TE", trend: "stable" },
      { id: "20", name: "Dak Prescott", team: "DAL", position: "QB", trend: "stable" },
    ],
  }

  return NextResponse.json(mockOverviewData)
}
