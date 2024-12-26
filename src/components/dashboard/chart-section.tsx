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

const chartComponents = {
  course: OffersByCourse,
  workExperience: OffersByWorkExperience,
  gender: OffersByGender,
  academics: OffersByAcademics,
  courseCategory: OffersByCourseCategory,
  industryType: OffersByIndustryType,
}

const chartTitles = {
  course: 'Offers by Course',
  workExperience: 'Offers by Work Experience',
  gender: 'Offers by Gender',
  academics: 'Offers by College Academics',
  courseCategory: 'Offers by Course Category',
  industryType: 'Offers by Industry Type',
}

export function ChartSection() {
  const [viewType, setViewType] = useState<'chart' | 'table'>('chart')

  return (
    <div className="space-y-6">
      {(Object.entries(chartComponents) as [ChartType, React.ComponentType<{ viewType: 'chart' | 'table' }>][]).map(([key, ChartComponent]) => (
        <Card key={key} className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{chartTitles[key]}</CardTitle>
            <Button variant="outline" size="icon" onClick={() => setViewType(viewType === 'chart' ? 'table' : 'chart')}>
              {viewType === 'chart' ? <TableIcon className="h-4 w-4" /> : <BarChartIcon className="h-4 w-4" />}
            </Button>
          </CardHeader>
          <CardContent>
            <ChartComponent viewType={viewType} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

