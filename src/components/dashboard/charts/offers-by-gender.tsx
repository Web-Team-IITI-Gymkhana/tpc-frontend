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
  viewType: 'chart' | 'pie' | 'table'
  data: GenderWiseStats
  seasonType: string
}

const CustomTooltip = ({ active, payload, seasonType }: any) => {
  const packageLabel = seasonType === "PLACEMENT" ? "Package" : "Stipend";
  const typeLabel = seasonType === "PLACEMENT" ? "Placement" : "Internship";

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <p className="font-bold">{`Gender: ${data.gender}`}</p>
        <p>{`Total Registered Students: ${data.totalRegisteredStudentsCount}`}</p>
        <p>{`Placed Students: ${data.placedStudentsCount}`}</p>
        <p>{`${typeLabel} %: ${data.placementPercentage.toFixed(2)}%`}</p>
        <p>{`Un${typeLabel.toLowerCase()} %: ${data.unplacedPercentage.toFixed(2)}%`}</p>
        <p>{`Highest ${packageLabel}: ₹${data.highestPackage.toFixed(2)}`}</p>
        <p>{`Lowest ${packageLabel}: ₹${data.lowestPackage.toFixed(2)}`}</p>
        <p>{`Mean ${packageLabel}: ₹${data.meanPackage.toFixed(2)}`}</p>
        <p>{`Median ${packageLabel}: ₹${data.medianPackage.toFixed(2)}`}</p>
        <p>{`Mode ${packageLabel}: ₹${data.modePackage.toFixed(2)}`}</p>
        <p>{`Total Offers: ${data.totalOffers}`}</p>
        <p>{`Total Companies Offering: ${data.totalCompaniesOffering}`}</p>
      </div>
    );
  }
  return null;
};

export function OffersByGender({ viewType, data = {}, seasonType }: OffersByGenderProps) {
  const packageLabel = seasonType === "PLACEMENT" ? "Package" : "Stipend";
  const typeLabel = seasonType === "PLACEMENT" ? "Placement" : "Internship";

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

    // Pie Chart View

    else if (viewType === 'pie') {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Pie chart view is not implemented yet.</p>
        </div>
      )
    }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="gender" />
        <YAxis label={{ value: `${typeLabel} %`, angle: -90, position: 'insideLeft' }} />
        <Tooltip content={<CustomTooltip seasonType={seasonType} />} />
        <Bar dataKey="placementPercentage" fill="#82ca9d" name={`${typeLabel} %`} />
      </BarChart>
    </ResponsiveContainer>
  )
}

