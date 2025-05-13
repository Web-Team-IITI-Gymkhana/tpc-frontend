'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CategoryStats {
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

interface CategoryWiseStats {
  [key: string]: CategoryStats
}

interface OffersByCategoryProps {
  viewType: 'chart' | 'pie' | 'table'
  data: CategoryWiseStats
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

const COLORS = [
  '#FF8042', // For unplaced students
  '#0088FE', '#00C49F', '#FFBB28', '#FF66B2', 
  '#9F88FF', '#00B3E6', '#FF99E6', '#99FF99', '#B34D4D'
];

export function OffersByCategory({ viewType, data = {}, seasonType }: OffersByCategoryProps) {
  const packageLabel = seasonType === "PLACEMENT" ? "Package" : "Stipend";
  const typeLabel = seasonType === "PLACEMENT" ? "Placement" : "Internship";

  const transformedData = Object.entries(data).map(([category, stats]) => ({
    category,
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

    // Pie Chart View

    else if (viewType === 'pie') {
      const totalStudents = Object.values(data).reduce(
        (sum, stats) => sum + stats.totalRegisteredStudentsCount, 0
      );
    
      const pieData = Object.entries(data).map(([category, stats]) => ({
        name: category,
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
          totalRegisteredStudentsCount: unplacedCount,
          placedStudentsCount: 0,
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
    <ResponsiveContainer width="100%" height={400}>
      <BarChart 
        data={transformedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="category" 
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

