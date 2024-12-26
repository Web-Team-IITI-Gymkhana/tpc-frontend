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

type ChartType = 'course' | 'workExperience' | 'gender' | 'academics' | 'courseCategory' | 'industryType'
type ViewType = 'chart' | 'table'

interface ChartConfig {
  type: ChartType
  title: string
  component: React.ComponentType<{ viewType: ViewType }>
}

export function ChartSection() {
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
    { type: 'course', title: 'Offers by Course', component: OffersByCourse },
    { type: 'workExperience', title: 'Offers by Work Experience', component: OffersByWorkExperience },
    { type: 'gender', title: 'Offers by Gender', component: OffersByGender },
    { type: 'academics', title: 'Offers by College Academics', component: OffersByAcademics },
    { type: 'courseCategory', title: 'Offers by Course Category', component: OffersByCourseCategory },
    { type: 'industryType', title: 'Offers by Industry Type', component: OffersByIndustryType }
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
      {charts.map(({ type, title, component: ChartComponent }) => (
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
            <ChartComponent viewType={viewTypes[type]} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

