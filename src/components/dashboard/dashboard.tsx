import { useState, useEffect } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { DataRibbon } from "./data-ribbon";
import { ChartSection } from "./chart-section";
import { DataRibbonStatsFC, ChartDataFC } from "@/helpers/analytics-dashboard/types";
import { getRibbonStats } from "@/helpers/analytics-dashboard/api";
import Loading from "../common/loading";

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<"reports" | "trends">("reports");
  const [seasonYear, setSeasonYear] = useState<number>(new Date().getFullYear());
  const [seasonType, setSeasonType] = useState<"placement" | "internship">("placement");
  const [yearRange, setYearRange] = useState<[number, number]>([new Date().getFullYear() - 5, new Date().getFullYear()]);
  const [ribbonStats, setRibbonStats] = useState<DataRibbonStatsFC | null>(null)
  const [chartData, setChartData] = useState<ChartDataFC | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSeasonData() {
      setIsLoading(true)
      try {
        const { ribbonStats, chartData } = await getRibbonStats({
          year: seasonYear,
          type: seasonType
        })
        
        setRibbonStats(ribbonStats)
        setError(null)
      } catch (err) {
        setError('Failed to load season data')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSeasonData()
  }, [seasonYear, seasonType])

  if (isLoading) {
    return Loading();
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex h-screen overflow-y-auto bg-background">
        <main className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <DataRibbon stats={ribbonStats} />
          <ChartSection chartData={chartData} />
        </main>
        <Sidebar 
          view={currentView} 
          setSeasonType={setSeasonType} 
          setSeasonYear={setSeasonYear}
          setYearRange={setYearRange}
          seasonYear={seasonYear}
          seasonType={seasonType}
          yearRange={yearRange}
        />
      </div>
    </div>
  )
}
