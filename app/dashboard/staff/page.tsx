"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { UserPlus, Mail, Edit } from "lucide-react"

interface StaffMember {
  id: string
  name: string
  email: string
  role: "waiter" | "kitchen" | "manager"
  status: "active" | "inactive"
  joinDate: string
}

const initialStaff: StaffMember[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@restaurant.com",
    role: "waiter",
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@restaurant.com",
    role: "waiter",
    status: "active",
    joinDate: "2023-02-20",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike@restaurant.com",
    role: "kitchen",
    status: "active",
    joinDate: "2023-01-10",
  },
  {
    id: "4",
    name: "Emily Wilson",
    email: "emily@restaurant.com",
    role: "manager",
    status: "active",
    joinDate: "2022-12-01",
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tom@restaurant.com",
    role: "kitchen",
    status: "inactive",
    joinDate: "2023-03-01",
  },
]

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<StaffMember["role"]>("waiter")

  const updateRole = (id: string, newRole: StaffMember["role"]) => {
    setStaff(staff.map((member) => (member.id === id ? { ...member, role: newRole } : member)))
  }

  const sendInvite = () => {
    if (inviteEmail) {
      // In a real app, this would send an email invitation
      alert(`Invitation sent to ${inviteEmail} for ${inviteRole} role`)
      setInviteEmail("")
      setInviteRole("waiter")
      setIsInviteDialogOpen(false)
    }
  }

  const getRoleColor = (role: StaffMember["role"]) => {
    switch (role) {
      case "waiter":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "kitchen":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "manager":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusColor = (status: StaffMember["status"]) => {
    return status === "active"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">Manage your restaurant staff and their roles</p>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Staff Member</DialogTitle>
              <DialogDescription>Send an email invitation to a new team member</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="staff@restaurant.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as StaffMember["role"])}
                >
                  <option value="waiter">Waiter</option>
                  <option value="kitchen">Kitchen Staff</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={sendInvite}>
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <select
                      className={`px-2 py-1 rounded text-sm border-0 ${getRoleColor(member.role)}`}
                      value={member.role}
                      onChange={(e) => updateRole(member.id, e.target.value as StaffMember["role"])}
                    >
                      <option value="waiter">Waiter</option>
                      <option value="kitchen">Kitchen</option>
                      <option value="manager">Manager</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
