"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, RefreshCw } from "lucide-react"

interface Order {
  id: string
  tableNumber: number
  items: string[]
  timePlaced: string
  specialNotes?: string
  status: "new" | "preparing" | "ready"
}

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    tableNumber: 5,
    items: ["Grilled Salmon", "Caesar Salad", "Garlic Bread"],
    timePlaced: "2:15 PM",
    specialNotes: "No onions in salad",
    status: "new",
  },
  {
    id: "ORD-002",
    tableNumber: 12,
    items: ["Beef Burger", "French Fries", "Coke"],
    timePlaced: "2:18 PM",
    status: "preparing",
  },
  {
    id: "ORD-003",
    tableNumber: 8,
    items: ["Margherita Pizza", "Tiramisu"],
    timePlaced: "2:20 PM",
    specialNotes: "Extra cheese on pizza",
    status: "new",
  },
  {
    id: "ORD-004",
    tableNumber: 3,
    items: ["Chicken Alfredo", "House Wine"],
    timePlaced: "2:10 PM",
    status: "ready",
  },
]

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const refreshOrders = () => {
    setLastRefresh(new Date())
    // In a real app, this would fetch new orders from the server
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return "bg-red-500"
      case "preparing":
        return "bg-yellow-500"
      case "ready":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return "New"
      case "preparing":
        return "Preparing"
      case "ready":
        return "Ready"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kitchen Orders</h1>
          <p className="text-muted-foreground">Manage incoming orders and update their status</p>
        </div>
        <Button onClick={refreshOrders} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">Last updated: {lastRefresh.toLocaleTimeString()}</div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <Card key={order.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Table {order.tableNumber}</CardTitle>
                <Badge className={`${getStatusColor(order.status)} text-white`}>{getStatusText(order.status)}</Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {order.timePlaced}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Items:</h4>
                <ul className="space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {order.specialNotes && (
                <div>
                  <h4 className="font-medium mb-1">Special Notes:</h4>
                  <p className="text-sm text-orange-600 bg-orange-50 dark:bg-orange-950 p-2 rounded">
                    {order.specialNotes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {order.status === "new" && (
                  <Button
                    onClick={() => updateOrderStatus(order.id, "preparing")}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600"
                    size="sm"
                  >
                    Start Preparing
                  </Button>
                )}
                {order.status === "preparing" && (
                  <Button
                    onClick={() => updateOrderStatus(order.id, "ready")}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                    size="sm"
                  >
                    Mark Ready
                  </Button>
                )}
                {order.status === "ready" && (
                  <div className="flex-1 text-center text-sm text-green-600 font-medium py-2">Ready for Pickup</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
