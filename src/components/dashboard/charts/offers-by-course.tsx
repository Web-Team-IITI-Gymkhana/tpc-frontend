'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const data = [
  { course: 'Computer Science', offers: 150 },
  { course: 'Electrical Engineering', offers: 100 },
  { course: 'Mechanical Engineering', offers: 80 },
  { course: 'Civil Engineering', offers: 60 },
  { course: 'Chemical Engineering', offers: 40 },
]

export function OffersByCourse({ viewType }: { viewType: 'chart' | 'table' }) {
  if (viewType === 'table') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Offers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.course}>
              <TableCell>{item.course}</TableCell>
              <TableCell>{item.offers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="course" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="offers" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

