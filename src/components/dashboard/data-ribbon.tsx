'use client'

import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SeasonDataFC } from '@/helpers/analytics-dashboard/types'

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

export function DataRibbon({ stats }: { stats: SeasonDataFC }) {
  const overallStats = stats.overallStats;

  return (
    <div className="mb-6 space-y-4  max-w-full overflow-x-scroll no-scrollbar">
      <div className="flex space-x-4 pb-4 md:pb-0">
        <StatCard
          value={`${overallStats.placementPercentage}%`}
          label="Placement Percentage"
          subtext={`${overallStats.placedStudentsCount} students placed out of ${overallStats.totalRegisteredStudentsCount} students`}
          info="Current placement rate for eligible students"
        />
        <StatCard
          value={overallStats.totalOffers}
          label="Total Offers"
          subtext={`${overallStats.totalOffers} offers were given by ${overallStats.totalCompaniesOffering} companies`}
          info="Total number of offers made to students"
        />
        <StatCard
          value={overallStats.highestPackage}
          label="Highest Package"
          info="Highest annual package offered this season"
        />
        <StatCard
          value={overallStats.meanPackage}
          label="Average Package"
          info="Mean annual package across all offers"
        />
        <StatCard
          value={overallStats.totalRegisteredStudentsCount}
          label="Eligible"
          info="Number of students eligible for placements"
        />
        <StatCard
          value={overallStats.unplacedPercentage}
          label="Total Unplaced Students"
          info="Percentage of eligible students yet to be placed"
        />
        <StatCard
          value={overallStats.lowestPackage}
          label="Lowest Package"
          info="Lowest annual package offered this season"
        />
        <StatCard
          value={overallStats.medianPackage}
          label="Median"
          info="Middle value of all packages offered"
        />
        <StatCard
          value={overallStats.modePackage}
          label="Mode"
          info="Most frequently offered package"
        />
      </div>
    </div>
  )
}

