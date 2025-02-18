import { useState, useEffect } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { DataRibbon } from "./data-ribbon";
import { ChartSection } from "./chart-section";
import { DataRibbonStatsFC, ChartDataFC } from "@/helpers/analytics-dashboard/types";
import { getRibbonStats } from "@/helpers/analytics-dashboard/api";
import Loading from "../common/loading";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<"reports" | "trends">("reports");
  const [season, setSeason] = useState<string>("");
  const [yearRange, setYearRange] = useState<[number, number]>([new Date().getFullYear() - 5, new Date().getFullYear()]);
  const [ribbonStats, setRibbonStats] = useState<DataRibbonStatsFC | null>(null)
  const [chartData, setChartData] = useState<ChartDataFC | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [optionsx, setOptionsx] = useState([]);
  let options: any = [];
  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/jaf`).then((res) => {
      res.data.seasons.map((season: any) => {
        const seasonString = `${season.type} ${season.year}`
        options.push({ value: season.id, label: seasonString });
      });
      setOptionsx(options);
      if(options.length > 0){
      setSeason(options[0].value);
    }
    })
    .catch((err) => {
      console.log(err);
    }
    );
  }, []);

  // useEffect(() => {
  //   async function fetchSeasonData() {
  //     setIsLoading(true)
  //     try {
  //       const { ribbonStats, chartData } = await getRibbonStats({
  //         year: seasonYear,
  //         type: seasonType
  //       })
        
  //       setRibbonStats(ribbonStats)
  //       setError(null)
  //     } catch (err) {
  //       setError('Failed to load season data')
  //       console.error(err)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchSeasonData()
  // }, [seasonYear, seasonType])

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
          {/* <DataRibbon stats={ribbonStats} /> */}
          <ChartSection />
        </main>
        <Sidebar 
          view={currentView} 
          season={season}
          setSeason={setSeason}
          options={optionsx}
          setYearRange={setYearRange}
          yearRange={yearRange}
        />
      </div>
    </div>
  )
}
