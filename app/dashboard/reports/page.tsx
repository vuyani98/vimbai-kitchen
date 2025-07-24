"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Filter } from "lucide-react"

const salesData = [
  {
    orderId: "ORD-001",
    table: 5,
    amount: 45.5,
    time: "12:30 PM",
    paymentMethod: "Card",
    waiter: "John Smith",
  },
  {
    orderId: "ORD-002",
    table: 12,
    amount: 28.75,
    time: "12:45 PM",
    paymentMethod: "Cash",
    waiter: "Sarah Johnson",
  },
  {
    orderId: "ORD-003",
    table: 8,
    amount: 67.2,
    time: "1:15 PM",
    paymentMethod: "Digital",
    waiter: "Mike Davis",
  },
  {
    orderId: "ORD-004",
    table: 3,
    amount: 34.9,
    time: "1:30 PM",
    paymentMethod: "Card",
    waiter: "Emily Wilson",
  },
  {
    orderId: "ORD-005",
    table: 15,
    amount: 89.4,
    time: "2:00 PM",
    paymentMethod: "Card",
    waiter: "John Smith",
  },
]

export default function ReportsPage() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedStaff, setSelectedStaff] = useState("")

  const exportToExcel = () => {
    // In a real app, this would generate and download an Excel file
    alert("Exporting to Excel... (Feature would be implemented with a library like xlsx)")
  }

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case "Cash":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Card":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Digital":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">View and analyze your restaurant's sales data</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="staff">Staff Member</Label>
              <select
                id="staff"
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
              >
                <option value="">All Staff</option>
                <option value="john">John Smith</option>
                <option value="sarah">Sarah Johnson</option>
                <option value="mike">Mike Davis</option>
                <option value="emily">Emily Wilson</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={exportToExcel} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export to Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Waiter</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((record) => (
                <TableRow key={record.orderId}>
                  <TableCell className="font-medium">{record.orderId}</TableCell>
                  <TableCell>{record.table}</TableCell>
                  <TableCell>${record.amount.toFixed(2)}</TableCell>
                  <TableCell>{record.time}</TableCell>
                  <TableCell>
                    <Badge className={getPaymentMethodColor(record.paymentMethod)}>{record.paymentMethod}</Badge>
                  </TableCell>
                  <TableCell>{record.waiter}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
