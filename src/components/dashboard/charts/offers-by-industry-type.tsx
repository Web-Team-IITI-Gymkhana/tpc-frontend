'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface OffersByIndustryTypeProps {
  viewType: 'chart' | 'pie' | 'table'
  data: { industry: string, offers: number }[]
}

export function OffersByIndustryType({ viewType, data = [] }: OffersByIndustryTypeProps) {
  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : []

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
          {safeData.map((item) => (
            <TableRow key={item.industry}>
              <TableCell>{item.industry}</TableCell>
              <TableCell>{item.offers}</TableCell>
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
      <BarChart data={safeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="industry" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="offers" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

