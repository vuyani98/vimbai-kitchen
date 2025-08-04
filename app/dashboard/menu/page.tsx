"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { getImageUrl } from "@/lib/appwrite"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, ImageIcon } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  description: string
  available: boolean
  image: string
}

const initialMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Grilled Salmon",
    category: "Main Course",
    price: 24.99,
    description: "Fresh Atlantic salmon with herbs and lemon",
    available: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Caesar Salad",
    category: "Appetizer",
    price: 12.99,
    description: "Crisp romaine lettuce with parmesan and croutons",
    available: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Beef Burger",
    category: "Main Course",
    price: 16.99,
    description: "Juicy beef patty with cheese and vegetables",
    available: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Tiramisu",
    category: "Dessert",
    price: 8.99,
    description: "Classic Italian dessert with coffee and mascarpone",
    available: true,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    category: "",
    price: 0,
    description: "",
    available: true,
  })

  getImageUrl();

  const toggleAvailability = (id: string) => {
    setMenuItems((items) => items.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  const deleteItem = (id: string) => {
    setMenuItems((items) => items.filter((item) => item.id !== id))
  }

  const addItem = () => {
    if (newItem.name && newItem.category && newItem.price) {
      const item: MenuItem = {
        id: Date.now().toString(),
        name: newItem.name,
        category: newItem.category,
        price: newItem.price,
        description: newItem.description || "",
        available: newItem.available || true,
        image: `/placeholder.svg?height=100&width=100&query=${newItem.name}`,
      }
      setMenuItems([...menuItems, item])
      setNewItem({ name: "", category: "", price: 0, description: "", available: true })
      setIsAddDialogOpen(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Appetizer":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Main Course":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Dessert":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
          <p className="text-muted-foreground">Manage your restaurant's menu items and availability</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>Create a new item for your restaurant menu</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Card key={item.id} className={`relative ${!item.available ? "opacity-60" : ""}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">${item.price}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Switch checked={item.available} onCheckedChange={() => toggleAvailability(item.id)} />
                  <span className="text-sm">{item.available ? "Available" : "Unavailable"}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
