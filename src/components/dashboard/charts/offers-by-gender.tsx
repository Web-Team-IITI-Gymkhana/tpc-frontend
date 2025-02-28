'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface OffersByGenderProps {
  viewType: 'chart' | 'table'
  data: { gender: string, offers: number }[]
}

export function OffersByGender({ viewType, data }: OffersByGenderProps) {
  if (viewType === 'table') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gender</TableHead>
            <TableHead>Offers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.gender}>
              <TableCell>{item.gender}</TableCell>
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
        <XAxis dataKey="gender" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="offers" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

