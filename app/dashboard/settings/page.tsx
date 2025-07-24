"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Upload, Printer, Wifi, Save } from "lucide-react"

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("RestaurantOS Demo")
  const [printerIP, setPrinterIP] = useState("192.168.1.100")
  const [autoSync, setAutoSync] = useState(true)
  const [notifications, setNotifications] = useState(true)

  const testPrinter = () => {
    alert("Testing printer connection... (This would test the actual printer in a real app)")
  }

  const saveSettings = () => {
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure your restaurant management system</p>
      </div>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Update your restaurant's basic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business-name">Business Name</Label>
            <Input id="business-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Printer Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Printer Configuration</CardTitle>
          <CardDescription>Set up your kitchen and receipt printers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="printer-ip">Printer IP Address</Label>
            <Input
              id="printer-ip"
              placeholder="192.168.1.100"
              value={printerIP}
              onChange={(e) => setPrinterIP(e.target.value)}
            />
          </div>
          <Button onClick={testPrinter} variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Test Printer Connection
          </Button>
        </CardContent>
      </Card>

      {/* System Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>System Preferences</CardTitle>
          <CardDescription>Configure system behavior and notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Sync</Label>
              <p className="text-sm text-muted-foreground">Automatically sync data with cloud servers</p>
            </div>
            <Switch checked={autoSync} onCheckedChange={setAutoSync} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications for new orders and updates</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </CardContent>
      </Card>

      {/* Network Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Network Settings</CardTitle>
          <CardDescription>Configure network and connectivity options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Wifi className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">WiFi Connected</p>
                <p className="text-sm text-muted-foreground">RestaurantWiFi</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveSettings} className="bg-orange-500 hover:bg-orange-600">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
