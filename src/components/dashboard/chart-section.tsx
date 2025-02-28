'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableIcon, BarChartIcon } from 'lucide-react'
import { OffersByCourse } from './charts/offers-by-course'
import { OffersByWorkExperience } from './charts/offers-by-work-experience'
import { OffersByGender } from './charts/offers-by-gender'
import { OffersByAcademics } from './charts/offers-by-academics'
import { OffersByCourseCategory } from './charts/offers-by-course-category'
import { OffersByIndustryType } from './charts/offers-by-industry-type'

import { SeasonDataFC } from '@/helpers/analytics-dashboard/types'

type ChartType = 'course' | 'workExperience' | 'gender' | 'academics' | 'courseCategory' | 'industryType'
type ViewType = 'chart' | 'table'

interface ChartConfig {
  type: ChartType
  title: string
  component: React.ComponentType<{ viewType: ViewType, data: any }>
  data: any
}

export function ChartSection({ stats }: { stats: SeasonDataFC }) {
  // Individual view state for each chart
  const [viewTypes, setViewTypes] = useState<Record<ChartType, ViewType>>({
    course: 'chart',
    workExperience: 'chart',
    gender: 'chart',
    academics: 'chart',
    courseCategory: 'chart',
    industryType: 'chart'
  })

  const charts: ChartConfig[] = [
    { type: 'course', title: 'Offers by Course', component: OffersByCourse, data: stats.courseWiseStats },
    { type: 'workExperience', title: 'Offers by Work Experience', component: OffersByWorkExperience, data: stats.departmentWiseStats },
    { type: 'gender', title: 'Offers by Gender', component: OffersByGender, data: stats.genderWiseStats },
    { type: 'academics', title: 'Offers by Academics', component: OffersByAcademics, data: stats.overallStats },
    { type: 'courseCategory', title: 'Offers by Course Category', component: OffersByCourseCategory, data: stats.categoryWiseStats },
    { type: 'industryType', title: 'Offers by Industry Type', component: OffersByIndustryType, data: stats.overallStats }
  ]

  // Toggle view for a specific chart
  const toggleView = (chartType: ChartType) => {
    setViewTypes(prev => ({
      ...prev,
      [chartType]: prev[chartType] === 'chart' ? 'table' : 'chart'
    }))
  }

  return (
    <div className="space-y-6">
      {charts.map(({ type, title, component: ChartComponent, data }) => (
        <Card key={type} className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => toggleView(type)}
            >
              {viewTypes[type] === 'chart' ? (
                <TableIcon className="h-4 w-4" />
              ) : (
                <BarChartIcon className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <ChartComponent viewType={viewTypes[type]} data={data} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

