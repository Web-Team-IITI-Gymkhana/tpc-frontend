'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CourseStats {
  totalRegisteredStudentsCount: number
  placedStudentsCount: number
  placementPercentage: number
  unplacedPercentage: number
  highestPackage: number
  lowestPackage: number
  meanPackage: number
  medianPackage: number
  modePackage: number
  totalOffers: number
  totalCompaniesOffering: number
}

interface CourseWiseStats {
  [key: string]: CourseStats
}

interface OffersByCourseProps {
  viewType: 'chart' | 'table'
  data: CourseWiseStats
  seasonType: string
}

const CustomTooltip = ({ active, payload, label, seasonType }: any) => {
  const packageLabel = seasonType === "PLACEMENT" ? "Package" : "Stipend";
  const typeLabel = seasonType === "PLACEMENT" ? "Placement" : "Internship";

  if (active && payload && payload.length) {
    const stats = payload[0].payload.stats;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <h3 className="font-bold">{label}</h3>
        <p>Total Registered Students: {stats.totalRegisteredStudentsCount}</p>
        <p>Placed Students: {stats.placedStudentsCount}</p>
        <p>{`${typeLabel} %: ${stats.placementPercentage.toFixed(2)}%`}</p>
        <p>{`Un${typeLabel.toLowerCase()} %: ${stats.unplacedPercentage.toFixed(2)}%`}</p>
        <p>{`Highest ${packageLabel}: ₹${stats.highestPackage.toFixed(2)}`}</p>
        <p>{`Lowest ${packageLabel}: ₹${stats.lowestPackage.toFixed(2)}`}</p>
        <p>{`Mean ${packageLabel}: ₹${stats.meanPackage.toFixed(2)}`}</p>
        <p>{`Median ${packageLabel}: ₹${stats.medianPackage.toFixed(2)}`}</p>
        <p>{`Mode ${packageLabel}: ₹${stats.modePackage.toFixed(2)}`}</p>
        <p>Total Offers: {stats.totalOffers}</p>
        <p>Total Companies Offering: {stats.totalCompaniesOffering}</p>
      </div>
    );
  }
  return null;
};

export function OffersByCourse({ viewType, data = {}, seasonType }: OffersByCourseProps) {
  const packageLabel = seasonType === "PLACEMENT" ? "Package" : "Stipend";
  const typeLabel = seasonType === "PLACEMENT" ? "Placement" : "Internship";

  const transformedData = Object.entries(data).map(([course, stats]) => ({
    course,
    placementPercentage: stats.placementPercentage,
    stats
  }));

  if (viewType === 'table') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Total Students</TableHead>
            <TableHead>Placed Students</TableHead>
            <TableHead>{`${typeLabel} %`}</TableHead>
            <TableHead>{`Un${typeLabel.toLowerCase()} %`}</TableHead>
            <TableHead>{`Highest ${packageLabel}`}</TableHead>
            <TableHead>{`Lowest ${packageLabel}`}</TableHead>
            <TableHead>{`Mean ${packageLabel}`}</TableHead>
            <TableHead>{`Median ${packageLabel}`}</TableHead>
            <TableHead>{`Mode ${packageLabel}`}</TableHead>
            <TableHead>Total Offers</TableHead>
            <TableHead>Companies Offering</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(data).map(([course, stats]) => (
            <TableRow key={course}>
              <TableCell>{course}</TableCell>
              <TableCell>{stats.totalRegisteredStudentsCount}</TableCell>
              <TableCell>{stats.placedStudentsCount}</TableCell>
              <TableCell>{stats.placementPercentage.toFixed(2)}%</TableCell>
              <TableCell>{stats.unplacedPercentage.toFixed(2)}%</TableCell>
              <TableCell>{stats.highestPackage.toFixed(2)}</TableCell>
              <TableCell>{stats.lowestPackage.toFixed(2)}</TableCell>
              <TableCell>{stats.meanPackage.toFixed(2)}</TableCell>
              <TableCell>{stats.medianPackage.toFixed(2)}</TableCell>
              <TableCell>{stats.modePackage.toFixed(2)}</TableCell>
              <TableCell>{stats.totalOffers}</TableCell>
              <TableCell>{stats.totalCompaniesOffering}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart 
        data={transformedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 15
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="course" 
          interval={0}
          angle={-45}
          textAnchor="end"
          height={100}
          tick={{
            dx: -8,
            dy: 10,
            fontSize: 12
          }}
        />
        <YAxis 
          label={{ 
            value: `${typeLabel} %`, 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle' }
          }}
        />
        <Tooltip content={<CustomTooltip seasonType={seasonType} />} />
        <Bar 
          dataKey="placementPercentage" 
          fill="#82ca9d" 
          name={`${typeLabel} %`}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

