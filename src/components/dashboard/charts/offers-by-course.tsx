'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface OffersByCourseProps {
  viewType: 'chart' | 'table'
  data: { course: string, offers: number }[]
}

export function OffersByCourse({ viewType, data }: OffersByCourseProps) {
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

