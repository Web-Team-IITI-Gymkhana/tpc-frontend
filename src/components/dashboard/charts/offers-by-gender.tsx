'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const COLORS = [
  '#FF8042', // For unplaced students
  '#0088FE', // Male
  '#00C49F', // Female
  '#FFBB28'  // Other
];

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
      const totalStudents = Object.values(data).reduce(
        (sum, stats) => sum + stats.totalRegisteredStudentsCount, 0
      );
    
      const pieData = Object.entries(data).map(([gender, stats]) => ({
        name: gender,
        value: stats.placedStudentsCount,
        stats
      }));
    
      // Add unplaced students as first segment
      const totalPlaced = Object.values(data).reduce(
        (sum, stats) => sum + stats.placedStudentsCount, 0
      );
      const unplacedCount = totalStudents - totalPlaced;
      pieData.unshift({
        name: 'Unplaced',
        value: unplacedCount,
        stats: {
          totalRegisteredStudentsCount: totalStudents,
          placedStudentsCount: unplacedCount,
          placementPercentage: 0,
          unplacedPercentage: 100,
          highestPackage: 0,
          lowestPackage: 0,
          meanPackage: 0,
          medianPackage: 0,
          modePackage: 0,
          totalOffers: 0,
          totalCompaniesOffering: 0
        }
      });
    
      const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        return percent > 0.0 ? (
          <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
          >
            {`${name} (${(percent * 100).toFixed(1)}%)`}
          </text>
        ) : null;
      };
    
      return (
        <div className="w-full h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={200}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 rounded-lg shadow-lg border">
                        <p className="font-bold">{data.name}</p>
                        <p>Students: {data.value}</p>
                        <p>Percentage: {((data.value / totalStudents) * 100).toFixed(2)}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
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

