import { useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { DataRibbon } from "./data-ribbon";
import { ChartSection } from "./chart-section";

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<"reports" | "trends">(
    "reports",
  );
  return (
    <div>
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex h-screen overflow-y-auto bg-background">
        <main className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <DataRibbon />
          <ChartSection />
        </main>
        <Sidebar view={currentView} />
      </div>
    </div>
  );
}
