'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface GenderStats {
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

interface GenderWiseStats {
  [key: string]: GenderStats
}

interface OffersByGenderProps {
  viewType: 'chart' | 'table'
  data: GenderWiseStats
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <p className="font-bold">{`Gender: ${data.gender}`}</p>
        <p>{`Total Registered Students: ${data.totalRegisteredStudentsCount}`}</p>
        <p>{`Placed Students: ${data.placedStudentsCount}`}</p>
        <p>{`Placement %: ${data.placementPercentage.toFixed(2)}%`}</p>
        <p>{`Unplaced %: ${data.unplacedPercentage.toFixed(2)}%`}</p>
        <p>{`Highest Package: ₹${data.highestPackage.toFixed(2)}L`}</p>
        <p>{`Lowest Package: ₹${data.lowestPackage.toFixed(2)}L`}</p>
        <p>{`Mean Package: ₹${data.meanPackage.toFixed(2)}L`}</p>
        <p>{`Median Package: ₹${data.medianPackage.toFixed(2)}L`}</p>
        <p>{`Mode Package: ₹${data.modePackage.toFixed(2)}L`}</p>
        <p>{`Total Offers: ${data.totalOffers}`}</p>
        <p>{`Total Companies Offering: ${data.totalCompaniesOffering}`}</p>
      </div>
    );
  }
  return null;
};

export function OffersByGender({ viewType, data = {} }: OffersByGenderProps) {
  const transformedData = Object.entries(data).map(([gender, stats]) => ({
    gender,
    placementPercentage: stats.placementPercentage,
    ...stats
  }));

  if (viewType === 'table') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gender</TableHead>
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
          {transformedData.map((item) => (
            <TableRow key={item.gender}>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.totalRegisteredStudentsCount}</TableCell>
              <TableCell>{item.placedStudentsCount}</TableCell>
              <TableCell>{item.placementPercentage.toFixed(2)}%</TableCell>
              <TableCell>{item.unplacedPercentage.toFixed(2)}%</TableCell>
              <TableCell>{item.highestPackage.toFixed(2)}</TableCell>
              <TableCell>{item.lowestPackage.toFixed(2)}</TableCell>
              <TableCell>{item.meanPackage.toFixed(2)}</TableCell>
              <TableCell>{item.medianPackage.toFixed(2)}</TableCell>
              <TableCell>{item.modePackage.toFixed(2)}</TableCell>
              <TableCell>{item.totalOffers}</TableCell>
              <TableCell>{item.totalCompaniesOffering}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="gender" />
        <YAxis label={{ value: 'Placement %', angle: -90, position: 'insideLeft' }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="placementPercentage" fill="#82ca9d" name="Placement %" />
      </BarChart>
    </ResponsiveContainer>
  )
}

