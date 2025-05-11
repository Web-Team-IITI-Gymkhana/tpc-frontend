'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableIcon, BarChartIcon, PieChartIcon } from 'lucide-react'
import { OffersByCourse } from './charts/offers-by-course'
import { OffersByDepartment } from './charts/offers-by-department'
import { OffersByGender } from './charts/offers-by-gender'
import { OffersByAcademics } from './charts/offers-by-academics'
import { OffersByCategory } from './charts/offers-by-category'
import { OffersByIndustryType } from './charts/offers-by-industry-type'

import { SeasonDataFC } from '@/helpers/analytics-dashboard/types'

type ChartType = 'course' | 'department' | 'gender' | 'academics' | 'category' | 'industryType'
type ViewType = 'chart' | 'pie' | 'table'

interface ChartConfig {
  type: ChartType
  title: string
  component: React.ComponentType<{ viewType: ViewType, data: any, seasonType: string }>
  data: any
}

interface ChartProps {
  stats: SeasonDataFC;
  seasonType: string;
}

export function ChartSection({ stats, seasonType }: ChartProps) {
  // Individual view state for each chart
  const [viewTypes, setViewTypes] = useState<Record<ChartType, ViewType>>({
    course: 'chart',
    department: 'chart',
    gender: 'chart',
    academics: 'chart',
    category: 'chart',
    industryType: 'chart'
  })

  const charts: ChartConfig[] = [
    { type: 'course', title: 'Offers by Courses', component: OffersByCourse, data: stats.courseWiseStats },
    { type: 'department', title: 'Offers by Departments', component: OffersByDepartment, data: stats.departmentWiseStats },
    { type: 'gender', title: 'Offers by Gender', component: OffersByGender, data: stats.genderWiseStats },
    { type: 'academics', title: 'Offers by Academics', component: OffersByAcademics, data: stats.academicWiseStats},
    { type: 'category', title: 'Offers by Category', component: OffersByCategory, data: stats.categoryWiseStats },
    // { type: 'industryType', title: 'Offers by Industry Type', component: OffersByIndustryType, data: stats.overallStats }
  ]

  return (
    <div className="space-y-6">
      {charts.map(({ type, title, component: ChartComponent, data }) => (
        <Card key={type} className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={viewTypes[type] === 'chart' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewTypes(prev => ({
                  ...prev,
                  [type]: 'chart'
                }))}
              >
                <BarChartIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewTypes[type] === 'pie' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewTypes(prev => ({
                  ...prev,
                  [type]: 'pie'
                }))}
              >
                <PieChartIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewTypes[type] === 'table' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewTypes(prev => ({
                  ...prev,
                  [type]: 'table'
                }))}
              >
                <TableIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ChartComponent viewType={viewTypes[type]} data={data} seasonType={seasonType}/>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

