"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function Register() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    collegeId: "",  // Added collegeId field
    collegeName: "",
    adminName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast({
      title: "Passwords don't match",
      description: "Please make sure your passwords match.",
      variant: "destructive",
    });
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.adminName,  // Adjusted key name
        email: formData.email,
        password: formData.password,
        collegeId: parseInt(formData.collegeId, 10),  // Ensure it's an integer
        collegeName: formData.collegeName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    toast({
      title: "Registration successful!",
      description: "Your college has been registered. You can now log in as an admin.",
    });

    router.push("/login/admin");
  } catch (error) {
    toast({
      title: "Registration failed",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Register Your College</CardTitle>
          <CardDescription>Create an admin account to manage your college on EduManage</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
            <div className="space-y-2">
            <Label htmlFor="collegeId">College ID</Label>
            <Input
              id="collegeId"
              name="collegeId"
              placeholder="Enter your college ID"
              required
              value={formData.collegeId}
              onChange={handleChange}
            />
          </div>

              <Label htmlFor="collegeName">College Name</Label>
              <Input
                id="collegeName"
                name="collegeName"
                placeholder="Enter your college name"
                required
                value={formData.collegeName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminName">Admin Name</Label>
              <Input
                id="adminName"
                name="adminName"
                placeholder="Enter admin name"
                required
                value={formData.adminName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@college.edu"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register as Admin"}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login/admin" className="text-primary underline-offset-4 hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

