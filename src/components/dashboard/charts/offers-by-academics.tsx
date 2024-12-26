'use client'

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const data = [
  { cgpa: '6.0-6.5', offers: 20 },
  { cgpa: '6.5-7.0', offers: 40 },
  { cgpa: '7.0-7.5', offers: 80 },
  { cgpa: '7.5-8.0', offers: 120 },
  { cgpa: '8.0-8.5', offers: 160 },
  { cgpa: '8.5-9.0', offers: 80 },
  { cgpa: '9.0-10.0', offers: 20 },
]

export function OffersByAcademics({ viewType }: { viewType: 'chart' | 'table' }) {
  if (viewType === 'table') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>CGPA Range</TableHead>
            <TableHead>Offers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.cgpa}>
              <TableCell>{item.cgpa}</TableCell>
              <TableCell>{item.offers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="cgpa" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="offers" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

