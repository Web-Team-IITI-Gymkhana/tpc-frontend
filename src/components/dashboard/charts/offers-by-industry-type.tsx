'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface OffersByIndustryTypeProps {
  viewType: 'chart' | 'table'
  data: { industry: string, offers: number }[]
}

export function OffersByIndustryType({ viewType, data }: OffersByIndustryTypeProps) {
  if (viewType === 'table') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Industry Type</TableHead>
            <TableHead>Offers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.industry}>
              <TableCell>{item.industry}</TableCell>
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
        <XAxis dataKey="industry" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="offers" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

