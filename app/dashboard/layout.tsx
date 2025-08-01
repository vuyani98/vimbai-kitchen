"use client"

import type React from "react"

import { useEffect, useState } from "react";
import  useAuthStore  from '@/store/auth.store'
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { DbUser } from "@/type";
import { getCurrentUser } from "@/lib/appwrite";

interface userData {
    name: string,
    email: string,
    role: any
}

export default function DashboardLayout ({
  children,
}: {
  children: React.ReactNode
}) {

  const {setUser, isAuthenticated, fetchAuthenticatedUser } = useAuthStore()
  const router = useRouter()

  const isLoggedIn = localStorage.getItem("user") ? true : false;
  const userJson = isLoggedIn ? JSON.parse(localStorage.getItem("user")!) : null;
  const user  = userJson;

  useEffect(() => {

    const userData: userData = {
      name: user?.name ||  '',
      email: user?.email || '',
      role: user?.role || ''
    };
    
    //localStorage.getItem("user")

    if (!userData) {
      router.push("/login")
    } 
  }, [router])


  if(!isLoggedIn) {
    router.replace('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {user && (
          <Header
            user={{
              name: user.name|| '',
              email: user.email || '',
              role: user.role || ''
            }}
          />
        )}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
