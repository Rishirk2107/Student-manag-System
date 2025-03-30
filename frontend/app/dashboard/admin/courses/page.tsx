"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Users } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

// Mock data
const mockCourses = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    credits: 3,
    students: 45,
    teachers: ["Dr. Jane Smith"],
    status: "active",
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    credits: 4,
    students: 38,
    teachers: ["Prof. John Doe"],
    status: "active",
  },
  {
    id: 3,
    code: "PHYS101",
    name: "Physics for Engineers",
    department: "Physics",
    credits: 4,
    students: 52,
    teachers: ["Dr. Emily Johnson"],
    status: "active",
  },
  {
    id: 4,
    code: "ENG205",
    name: "Technical Writing",
    department: "English",
    credits: 3,
    students: 30,
    teachers: ["Prof. Michael Brown"],
    status: "inactive",
  },
  {
    id: 5,
    code: "CHEM101",
    name: "General Chemistry",
    department: "Chemistry",
    credits: 4,
    students: 48,
    teachers: ["Dr. Sarah Wilson"],
    status: "active",
  },
]

export default function AdminCourses() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)

  // Filter function for search
  const filteredCourses = mockCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddCourseOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>Manage your college courses and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.department}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{course.students}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={course.status === "active" ? "default" : "secondary"}>
                      {course.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Course Dialog */}
      <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>Enter the details for the new course. You can assign teachers later.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="courseCode">Course Code</Label>
                <Input id="courseCode" placeholder="e.g., CS101" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="credits">Credits</Label>
                <Input id="credits" type="number" min="1" max="6" placeholder="3" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="courseName">Course Name</Label>
              <Input id="courseName" placeholder="Introduction to Computer Science" />
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
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="courseDescription">Description</Label>
              <Textarea id="courseDescription" placeholder="Enter course description" rows={3} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="active">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCourseOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddCourseOpen(false)}>Add Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}

