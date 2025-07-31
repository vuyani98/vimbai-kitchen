"use client"

import type React from "react"

import { useEffect, useState } from "react";
import  useAuthStore  from '@/store/auth.store'
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { DbUser } from "@/type";

interface userData {
    name: string,
    email: string,
    role: any
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //const [user, setUser] = useState<any>(null)
  const { user, setUser, fetchAuthenticatedUser } = useAuthStore()
  const router = useRouter()

  fetchAuthenticatedUser();

  console.log('Now in dashboard');


  useEffect(() => {

    const userData: userData = {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.$permissions
    };
    
    //localStorage.getItem("user")

    if (!userData) {
      router.push("/login")
    } else {
      setUser(user)
    }
  }, [router])

  if (!user) {
    //console.log(user)
    return (<div>Loading...</div>)
    //router.push("/login")
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {user && (
          <Header
            user={{
              name: user.name,
              email: user.email,
              role: user.$permissions
            }}
          />
        )}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
