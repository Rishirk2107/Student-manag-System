"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the role selection page
    router.push("/login/select")
  }, [router])

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Redirecting...</CardTitle>
          <CardDescription>Please wait while we redirect you to the login page.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    </div>
  )
}

