"use client"

import type React from "react"
import { Alert } from "@/components/ui/alert"
import { createUser } from "@/lib/appwrite"


import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat } from "lucide-react"
import logo from '@/public/logo.png'

export default function registerPage() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleRegister = (e: React.FormEvent) => {

    console.log(isSubmitting);
    e.preventDefault()
    // Simulate login - in real app, validate credentials
    if (name && email && password) {
      localStorage.setItem("user", JSON.stringify({name, email, role: "manager" }))
      submit();
      //router.push("/dashboard")
    }
  }

    //calls appwrite signup functions
    const submit  = async () => {

        if (!name || !email || !password) return console.log('Please enter valid email address');

        setIsSubmitting(true);

        try {
            // call the Appwrite sign-up function here
            console.log(email)
            await createUser({ name: name, email: email, password: password});
            router.replace('/');
        }

        catch (error) {
            console.error('Sign-up error:', error);
            throw error as string; 
        }

        finally {
            setIsSubmitting(false);
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full">
              <img src={logo.src} style={{height: 80}}/>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Vimbai's Kitchen</CardTitle>
          <CardDescription>Add user to your restaurant management system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="manager@restaurant.com"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="manager@restaurant.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
