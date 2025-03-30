"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, BookOpen, FileText, ClipboardList } from "lucide-react"
import StudentLayout from "@/components/student-layout"

// Mock data
const mockCourses = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    teacher: "Dr. Jane Smith",
    schedule: "Mon, Wed 10:00 - 11:30 AM",
    room: "Tech Building 305",
    progress: 65,
    materials: 12,
    assignments: 5,
    announcements: 8,
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    teacher: "Prof. John Doe",
    schedule: "Tue, Thu 1:00 - 2:30 PM",
    room: "Math Building 201",
    progress: 72,
    materials: 8,
    assignments: 6,
    announcements: 4,
  },
  {
    id: 3,
    code: "PHYS101",
    name: "Physics for Engineers",
    teacher: "Dr. Emily Johnson",
    schedule: "Wed, Fri 3:00 - 4:30 PM",
    room: "Science Building 105",
    progress: 58,
    materials: 15,
    assignments: 4,
    announcements: 6,
  },
]

export default function StudentCourses() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter function for search
  const filteredCourses = mockCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <StudentLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Courses</h1>
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

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="bg-primary h-2"></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{course.name}</CardTitle>
                      <CardDescription>{course.code}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Teacher:</span>
                        <span>{course.teacher}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Schedule:</span>
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Room:</span>
                        <span>{course.room}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Course Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="flex flex-col items-center p-2 rounded-lg bg-muted">
                        <FileText className="h-4 w-4 mb-1 text-muted-foreground" />
                        <span className="text-xs font-medium">{course.materials}</span>
                        <span className="text-xs text-muted-foreground">Materials</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-lg bg-muted">
                        <ClipboardList className="h-4 w-4 mb-1 text-muted-foreground" />
                        <span className="text-xs font-medium">{course.assignments}</span>
                        <span className="text-xs text-muted-foreground">Assignments</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-lg bg-muted">
                        <BookOpen className="h-4 w-4 mb-1 text-muted-foreground" />
                        <span className="text-xs font-medium">{course.announcements}</span>
                        <span className="text-xs text-muted-foreground">Updates</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Course
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="bg-primary h-2"></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{course.name}</CardTitle>
                      <CardDescription>{course.code}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Teacher:</span>
                        <span>{course.teacher}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Schedule:</span>
                        <span>{course.schedule}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Course Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Course
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No completed courses yet</h3>
            <p className="text-muted-foreground max-w-md">
              You haven't completed any courses yet. Your completed courses will appear here once you finish them.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </StudentLayout>
  )
}

