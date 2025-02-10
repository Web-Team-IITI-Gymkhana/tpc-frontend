'use client'

import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface StatCardProps {
  value: string | number
  label: string
  subtext?: string | string[]
  info?: string
  className?: string
}

function StatCard({ value, label, subtext, info, className }: StatCardProps) {
  return (
    <div className={`relative p-4 rounded-lg ${'bg-white'} border ${className} min-w-[200px] transition-colors duration-200 ease-in-out hover:bg-gray-50`}>
      <div className="flex justify-between items-start">
        <span className="text-2xl font-bold">{value}</span>
        {info && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground " />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{info}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="mt-1">
        <p className="text-sm font-medium">{label}</p>
        {Array.isArray(subtext) ? (
          <div className="space-y-0.5 mt-0.5">
            {subtext.map((text, index) => (
              <div key={index} className="text-sm text-muted-foreground">{text}</div>
            ))}
          </div>
        ) : (
          subtext && <div className="text-sm text-muted-foreground mt-0.5">{subtext}</div>
        )}
      </div>
    </div>
  )
}

export function DataRibbon() {
  return (
    <div className="mb-6 space-y-4  max-w-full overflow-x-scroll no-scrollbar">
      <div className="flex space-x-4 pb-4 md:pb-0">
        <StatCard
          value="6.92%"
          label="Placement Percentage"
          subtext="69 students placed out of 997 students"
          info="Current placement rate for eligible students"
        />
        <StatCard
          value="74"
          label="Total Offers"
          subtext={[
            "5 students received multiple offers",
            "64 students received a single offer"
          ]}
          info="Total number of offers made to students"
        />
        <StatCard
          value="₹54 LPA"
          label="Highest Package"
          subtext="18 students received this package"
          info="Highest annual package offered this season"
        />
        <StatCard
          value="₹24.11 LPA"
          label="Average Package"
          subtext="26 students received more than average"
          info="Mean annual package across all offers"
        />
        <StatCard
          value="997"
          label="Eligible"
          info="Number of students eligible for placements"
        />
        <StatCard
          value="12"
          label="Not Eligible"
          info="Number of students not eligible for placements"
        />
        <StatCard
          value="3"
          label="Companies Offered"
          subtext="11 companies visited"
          info="Number of companies that have made offers"
        />
        <StatCard
          value="93.08%"
          label="Total Unplaced Students"
          info="Percentage of eligible students yet to be placed"
        />
        <StatCard
          value="₹7 LPA"
          label="Lowest Package"
          info="Lowest annual package offered this season"
        />
        <StatCard
          value="₹12 LPA"
          label="Median"
          info="Middle value of all packages offered"
        />
        <StatCard
          value="₹9 LPA"
          label="Mode"
          info="Most frequently offered package"
        />
      </div>
    </div>
  )
}

