"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { convertToCSV, convertToExcel } from "@/lib/csv-utils";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface ViewOption {
  label: string;
  value: string;
}

interface NavHeaderProps {
  currentView: "reports" | "trends";
  onViewChange: (view: "reports" | "trends") => void;
  data?: any; // Add this prop for the data to be downloaded
}

export function Header({ currentView, onViewChange, data }: NavHeaderProps) {
  const navItems: NavItem[] = [
    { label: "College Reports", href: "#", active: true },
    { label: "Leaderboard", href: "#" },
    { label: "Company Reports", href: "#" },
  ];

  const viewOptions: ViewOption[] = [
    { label: "Reports", value: "reports" },
    // { label: "Trends", value: "trends" },
  ];

  const handleDownload = () => {
    if (!data) return;

    const blob = convertToExcel(data);
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `placement-stats-${new Date().toISOString().split('T')[0]}.xlsx`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border-b mb-2">
      <div className="flex items-center justify-between px-6 pb-4">
        <div className="flex items-center space-x-4">
          <div className="flex rounded-lg bg-muted p-1">
            {viewOptions.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  onViewChange(option.value as "reports" | "trends")
                }
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-md transition-colors",
                  currentView === option.value
                    ? "bg-background shadow-sm border"
                    : "hover:text-primary",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleDownload}
              disabled={!data}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
