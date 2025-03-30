"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Users, BookOpen } from "lucide-react"
import TeacherLayout from "@/components/teacher-layout"

// Mock data
const mockCourses = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    schedule: "Mon, Wed 10:00 - 11:30 AM",
    room: "Tech Building 305",
    students: 45,
    status: "active",
  },
  {
    id: 2,
    code: "CS205",
    name: "Database Systems",
    schedule: "Tue, Thu 1:00 - 2:30 PM",
    room: "Tech Building 201",
    students: 38,
    status: "active",
  },
  {
    id: 3,
    code: "CS310",
    name: "Human-Computer Interaction",
    schedule: "Wed, Fri 3:00 - 4:30 PM",
    room: "Tech Building 105",
    students: 32,
    status: "active",
  },
]

export default function TeacherCourses() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isViewCourseOpen, setIsViewCourseOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Filter function for search
  const filteredCourses = mockCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewCourse = (course) => {
    setSelectedCourse(course)
    setIsViewCourseOpen(true)
  }

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Courses</h1>
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
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="bg-primary h-2"></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>{course.code}</CardDescription>
                </div>
                <Badge variant={course.status === "active" ? "default" : "secondary"}>
                  {course.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Schedule:</span>
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Room:</span>
                  <span>{course.room}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Students:</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => handleViewCourse(course)}>
                View Course
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Course Dialog */}
      <Dialog open={isViewCourseOpen} onOpenChange={setIsViewCourseOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedCourse?.name}</DialogTitle>
            <DialogDescription>
              {selectedCourse?.code} • {selectedCourse?.schedule}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Course Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Room</p>
                <p className="text-sm text-muted-foreground">{selectedCourse?.room}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Students</p>
                <p className="text-sm text-muted-foreground">{selectedCourse?.students}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant={selectedCourse?.status === "active" ? "default" : "secondary"}>
                  {selectedCourse?.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  Create Announcement
                </Button>
                <Button variant="outline" size="sm">
                  Add Assignment
                </Button>
                <Button variant="outline" size="sm">
                  Upload Materials
                </Button>
                <Button variant="outline" size="sm">
                  View Students
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewCourseOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TeacherLayout>
  )
}

