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
      className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors"
    >
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{value}</span>
        {onClick && <ChevronRight className="h-4 w-4 text-gray-400" />}
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
      <aside className="w-72 bg-white border-l overflow-y-auto no-scrollbar">
        <div className="p-4 space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Year Range</label>
            <div className="space-y-4">
              <Slider
                min={2013}
                max={2024}
                step={1}
                value={yearRange}
                onValueChange={setYearRange}
                className="mt-2"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{yearRange[0]}</span>
                <span>{yearRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Type</label>
            <Select
              value={season}
              // value={selectedTypes.join(',')}
              // onValueChange={(value) => setSelectedTypes(value.split(','))}
              onValueChange={(value) =>
                setSeason(value as "placement" | "internship")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placement">Placements</SelectItem>
                <SelectItem value="internship">Internships</SelectItem>
                {/* <SelectItem value="placements,internships">Both</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="max-w-sm bg-white border-l overflow-y-auto no-scrollbar p-2">
      <div className="p-4 space-y-4">
        <div className="space-y-2 border rounded-lg p-4">
          <p className="text-gray-500">Select Season :</p>
            <Select
            value={season}
            onValueChange={(value) => {
              const selectedOption = options.find((option) => option.value === value);
              setSeason(value);
              if (selectedOption) {
              setSeasonType(selectedOption.type);
              }
            }}
            >
            <SelectTrigger>
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

          {/* <Select
            value={selectedTypes.join(",")}
            onValueChange={(value) => setSelectedTypes(value.split(","))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="placements">Placements</SelectItem>
              <SelectItem value="internships">Internships</SelectItem>
              <SelectItem value="placements,internships">Both</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        {/* <div>
          <h1 className="text-lg font-bold">Statistics</h1>
        </div> */}

        {/* <div className="text-sm text-gray-500">
          From 24 Nov 2024 to 24 Dec 2024
        </div> */}

        {/* <div className="space-y-4">
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-medium mb-2">Offer Details</h3>
            <div className="space-y-1">
              <StatItem label="Total Offers" value="54" onClick={() => {}} />
              <StatItem
                label="Published Offers"
                value="43"
                onClick={() => {}}
              />
              <StatItem label="Accepted" value="14" onClick={() => {}} />
              <StatItem label="Declined" value="3" onClick={() => {}} />
              <StatItem label="Pending" value="28" onClick={() => {}} />
              <StatItem
                label="Offer Letters Uploaded"
                value="0"
                onClick={() => {}}
              />
              <StatItem
                label="Number Of Companies"
                value="3"
                onClick={() => {}}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-medium mb-2">Process Stats</h3>
            <div className="space-y-1">
              <StatItem label="Total Drives" value="0" />
              <StatItem label="Rounds Defined" value="0" />
              <StatItem label="Students Round Details Updated" value="0" />
              <StatItem label="Attendance Updated" value="0" />
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-medium mb-2">Ongoing Drives</h3>
            <div className="space-y-1">
              <StatItem label="Applied" value="0" onClick={() => {}} />
              <StatItem label="Published" value="0" onClick={() => {}} />
              <StatItem
                label="Publish Requested"
                value="0"
                onClick={() => {}}
              />
              <StatItem label="Results Awaited" value="0" onClick={() => {}} />
              <StatItem label="Shortlisted" value="0" onClick={() => {}} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-600">Eligible</div>
                <div className="font-medium">0</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-600">Registered</div>
                <div className="font-medium">0</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-600">Shortlisted</div>
                <div className="font-medium">0</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-600">Attended</div>
                <div className="font-medium">0</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-medium mb-2">Non Closure Drives</h3>
            <div className="space-y-1">
              <StatItem label="Suspended" value="0" onClick={() => {}} />
              <StatItem label="No Offers" value="0" onClick={() => {}} />
            </div>
          </div>
        </div> */}
      </div>
    </aside>
  );
}
