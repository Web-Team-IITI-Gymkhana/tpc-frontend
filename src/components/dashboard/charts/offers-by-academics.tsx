'use client'

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface OffersByAcademicsProps {
  viewType: 'chart' | 'table'
  data: { cgpa: string, offers: number }[]
}

export function OffersByAcademics({ viewType, data }: OffersByAcademicsProps) {
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

