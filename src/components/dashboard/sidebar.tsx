"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface StatItemProps {
  label: string;
  value: string | number;
  onClick?: () => void;
}

function StatItem({ label, value, onClick }: StatItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-2 hover:bg-slate-600/50 rounded-md transition-colors"
    >
      <span className="text-sm text-slate-300">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-white">{value}</span>
        {onClick && <ChevronRight className="h-4 w-4 text-slate-400" />}
      </div>
    </button>
  );
}

interface SidebarProps {
  view: "reports" | "trends";
  season: string;
  seasonType: string;
  setSeason: (season: string) => void;
  setSeasonType: (seasonType: string) => void;
  options: any[];
  setYearRange: (range: [number, number]) => void;
  yearRange: [number, number];
}

export function Sidebar({
  view,
  season,
  seasonType,
  setSeason,
  setSeasonType,
  options,
  setYearRange,
  yearRange,
}: SidebarProps) {
  const [batch, setBatch] = useState("2025");
  const [department, setDepartment] = useState("placements");
  const [selectedTypes, setSelectedTypes] = useState(["placements"]);

  if (view === "trends") {
    return (
      <aside className="w-full lg:w-72 bg-slate-800 border-l overflow-y-auto no-scrollbar">
        <div className="p-3 md:p-4 space-y-4 md:space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block text-white">
              Year Range
            </label>
            <div className="space-y-3 md:space-y-4">
              <Slider
                min={2013}
                max={2024}
                step={1}
                value={yearRange}
                onValueChange={setYearRange}
                className="mt-2"
              />
              <div className="flex justify-between text-xs md:text-sm text-slate-300">
                <span>{yearRange[0]}</span>
                <span>{yearRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block text-white">
              Type
            </label>
            <Select
              value={season}
              onValueChange={(value) =>
                setSeason(value as "placement" | "internship")
              }
            >
              <SelectTrigger className="h-10 md:h-11">
                <SelectValue placeholder="Select types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placement">Placements</SelectItem>
                <SelectItem value="internship">Internships</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full lg:w-72 lg:max-w-sm bg-slate-800 border-l overflow-y-auto no-scrollbar p-2">
      <div className="p-3 md:p-4 space-y-4">
        <div className="space-y-2 border border-slate-600 rounded-lg p-3 md:p-4">
          <p className="text-slate-300 text-sm md:text-base">Select Season :</p>
          <Select
            value={season}
            onValueChange={(value) => {
              const selectedOption = options.find(
                (option) => option.value === value,
              );
              setSeason(value);
              if (selectedOption) {
                setSeasonType(selectedOption.type);
              }
            }}
          >
            <SelectTrigger className="h-10 md:h-11">
              <SelectValue placeholder="Select Season" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </aside>
  );
}
