'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DepartmentStats {
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

interface DepartmentWiseStats {
  [key: string]: DepartmentStats
}

interface OffersByDepartmentProps {
  viewType: 'chart' | 'table'
  data: DepartmentWiseStats
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const stats = payload[0].payload.stats;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <h3 className="font-bold">{label}</h3>
        <p>Total Registered Students: {stats.totalRegisteredStudentsCount}</p>
        <p>Placed Students: {stats.placedStudentsCount}</p>
        <p>Placement %: {stats.placementPercentage.toFixed(2)}%</p>
        <p>Unplaced %: {stats.unplacedPercentage.toFixed(2)}%</p>
        <p>Highest Package: ₹{stats.highestPackage.toFixed(2)}L</p>
        <p>Lowest Package: ₹{stats.lowestPackage.toFixed(2)}L</p>
        <p>Mean Package: ₹{stats.meanPackage.toFixed(2)}L</p>
        <p>Median Package: ₹{stats.medianPackage.toFixed(2)}L</p>
        <p>Mode Package: ₹{stats.modePackage.toFixed(2)}L</p>
        <p>Total Offers: {stats.totalOffers}</p>
        <p>Total Companies Offering: {stats.totalCompaniesOffering}</p>
      </div>
    );
  }
  return null;
};

export function OffersByDepartment({ viewType, data = {} }: OffersByDepartmentProps) {
  const transformedData = Object.entries(data).map(([department, stats]) => ({
    department,
    placementPercentage: stats.placementPercentage,
    stats
  }));

  if (viewType === 'table') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead>Total Students</TableHead>
            <TableHead>Placed Students</TableHead>
            <TableHead>Placement %</TableHead>
            <TableHead>Unplaced %</TableHead>
            <TableHead>Highest Package (₹L)</TableHead>
            <TableHead>Lowest Package (₹L)</TableHead>
            <TableHead>Mean Package (₹L)</TableHead>
            <TableHead>Median Package (₹L)</TableHead>
            <TableHead>Mode Package (₹L)</TableHead>
            <TableHead>Total Offers</TableHead>
            <TableHead>Companies Offering</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(data).map(([department, stats]) => (
            <TableRow key={department}>
              <TableCell>{department}</TableCell>
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
          bottom: 100
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="department" 
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
            value: 'Placement %', 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle' }
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="placementPercentage" 
          fill="#82ca9d" 
          name="Placement %"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

