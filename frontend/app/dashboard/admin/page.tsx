"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, UserPlus } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

// Mock data
const mockTeachers = [
  { id: 1, name: "Dr. Jane Smith", email: "jane.smith@college.edu", department: "Computer Science", status: "Active" },
  { id: 2, name: "Prof. John Doe", email: "john.doe@college.edu", department: "Mathematics", status: "Active" },
  { id: 3, name: "Dr. Emily Johnson", email: "emily.johnson@college.edu", department: "Physics", status: "Active" },
]

const mockStudents = [
  {
    id: 1,
    name: "Alice Brown",
    email: "alice.brown@college.edu",
    course: "Computer Science",
    year: "3rd Year",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Wilson",
    email: "bob.wilson@college.edu",
    course: "Mathematics",
    year: "2nd Year",
    status: "Active",
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie.davis@college.edu",
    course: "Physics",
    year: "1st Year",
    status: "Active",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter function for search
  const filterItems = (items) => {
    if (!searchQuery) return items
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockTeachers.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Across all departments</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStudents.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Across all courses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground mt-1">New announcements this week</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your college resources</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button onClick={() => setIsAddTeacherOpen(true)} variant="outline" className="h-24 flex flex-col gap-1">
                <UserPlus className="h-5 w-5" />
                <span>Add Teacher</span>
              </Button>
              <Button onClick={() => setIsAddStudentOpen(true)} variant="outline" className="h-24 flex flex-col gap-1">
                <UserPlus className="h-5 w-5" />
                <span>Add Student</span>
              </Button>
              <Link href="/dashboard/admin/announcements" className="w-full">
                <Button variant="outline" className="h-24 w-full flex flex-col gap-1">
                  <PlusCircle className="h-5 w-5" />
                  <span>Create Announcement</span>
                </Button>
              </Link>
              <Link href="/dashboard/admin/settings" className="w-full">
                <Button variant="outline" className="h-24 w-full flex flex-col gap-1">
                  <PlusCircle className="h-5 w-5" />
                  <span>College Settings</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Teachers</h2>
            <Button onClick={() => setIsAddTeacherOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterItems(mockTeachers).map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">{teacher.name}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>{teacher.status}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Students</h2>
            <Button onClick={() => setIsAddStudentOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterItems(mockStudents).map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{student.status}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Teacher Dialog */}
      <Dialog open={isAddTeacherOpen} onOpenChange={setIsAddTeacherOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>
              Enter the details of the new teacher. They will receive an email to set up their account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="teacherName">Full Name</Label>
              <Input id="teacherName" placeholder="Dr. Jane Smith" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="teacherEmail">Email</Label>
              <Input id="teacherEmail" type="email" placeholder="jane.smith@college.edu" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTeacherOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddTeacherOpen(false)}>Add Teacher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the details of the new student. They will receive an email to set up their account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="studentName">Full Name</Label>
              <Input id="studentName" placeholder="Alice Brown" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="studentEmail">Email</Label>
              <Input id="studentEmail" type="email" placeholder="alice.brown@college.edu" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="course">Course</Label>
              <Select>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Select>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddStudentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddStudentOpen(false)}>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}

