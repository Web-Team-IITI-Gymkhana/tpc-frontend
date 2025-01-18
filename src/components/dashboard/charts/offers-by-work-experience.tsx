'use client'

import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const data = [
  { experience: 'Fresher', offers: 300 },
  { experience: '0-2 years', offers: 150 },
  { experience: '2-5 years', offers: 50 },
  { experience: '5+ years', offers: 20 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function OffersByWorkExperience({ viewType }: { viewType: 'chart' | 'table' }) {
  if (viewType === 'table') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Work Experience</TableHead>
            <TableHead>Offers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.experience}>
              <TableCell>{item.experience}</TableCell>
              <TableCell>{item.offers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="offers"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

