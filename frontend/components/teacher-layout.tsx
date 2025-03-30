"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  BookOpen,
  Bell,
  ClipboardList,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function TeacherLayout({ children }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard/teacher", icon: LayoutDashboard },
    { name: "Courses", href: "/dashboard/teacher/courses", icon: BookOpen },
    { name: "Students", href: "/dashboard/teacher/students", icon: Users },
    { name: "Announcements", href: "/dashboard/teacher/announcements", icon: Bell },
    { name: "Assignments", href: "/dashboard/teacher/assignments", icon: ClipboardList },
    { name: "Materials", href: "/dashboard/teacher/materials", icon: FileText },
    { name: "Settings", href: "/dashboard/teacher/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-card shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b px-6">
            <Link href="/dashboard/teacher" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-lg font-bold">EduManage</span>
            </Link>
            <ThemeToggle />
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Teacher" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">Dr. Jane Smith</p>
                  <p className="text-xs text-muted-foreground">jane.smith@college.edu</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

