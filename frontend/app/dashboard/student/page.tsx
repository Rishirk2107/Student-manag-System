"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { FileText, Download } from "lucide-react"
import StudentLayout from "@/components/student-layout"

// Mock data
const mockAnnouncements = [
  { id: 1, title: "Midterm Exam Schedule", date: "2023-10-15", teacher: "Dr. Jane Smith", course: "Database Systems" },
  { id: 2, title: "Assignment #3 Due Date", date: "2023-10-10", teacher: "Prof. John Doe", course: "Data Structures" },
  {
    id: 3,
    title: "Guest Lecture: AI Ethics",
    date: "2023-10-20",
    teacher: "Dr. Emily Johnson",
    course: "AI Fundamentals",
  },
]

const mockAssignments = [
  {
    id: 1,
    title: "Database Design Project",
    dueDate: "2023-10-25",
    course: "Database Systems",
    status: "pending",
    description: "Design a normalized database schema for a library management system.",
  },
  {
    id: 2,
    title: "Algorithm Analysis",
    dueDate: "2023-11-05",
    course: "Data Structures",
    status: "pending",
    description: "Analyze the time and space complexity of the provided sorting algorithms.",
  },
  {
    id: 3,
    title: "UI/UX Case Study",
    dueDate: "2023-10-18",
    course: "Human-Computer Interaction",
    status: "submitted",
    description: "Evaluate the user interface of a mobile application and suggest improvements.",
  },
]

const mockMaterials = [
  { id: 1, title: "Database Normalization", type: "PDF", course: "Database Systems", date: "2023-09-15" },
  { id: 2, title: "Sorting Algorithms", type: "PPTX", course: "Data Structures", date: "2023-09-20" },
  { id: 3, title: "UI Design Principles", type: "PDF", course: "Human-Computer Interaction", date: "2023-09-25" },
]

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [date, setDate] = useState(new Date())

  return (
    <StudentLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
      </div>

      <Tabs defaultValue="overview" className="mt-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground mt-1">Current semester</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground mt-1">Due this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground mt-1">Posted this week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Your pending assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAssignments
                    .filter((assignment) => assignment.status === "pending")
                    .map((assignment) => (
                      <div key={assignment.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Due: {assignment.dueDate}</p>
                          <Badge variant={new Date(assignment.dueDate) < new Date() ? "destructive" : "outline"}>
                            {new Date(assignment.dueDate) < new Date() ? "Overdue" : "Upcoming"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Important dates and events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
              <CardDescription>Stay updated with the latest information</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAnnouncements.map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell className="font-medium">{announcement.title}</TableCell>
                      <TableCell>{announcement.date}</TableCell>
                      <TableCell>{announcement.teacher}</TableCell>
                      <TableCell>{announcement.course}</TableCell>
                      <TableCell className="text-right">
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
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Assignments</CardTitle>
              <CardDescription>Track and submit your assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>
                        <Badge variant={assignment.status === "submitted" ? "outline" : "default"}>
                          {assignment.status === "submitted" ? "Submitted" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          {assignment.status === "submitted" ? "View" : "Submit"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Study Materials</CardTitle>
              <CardDescription>Access course materials and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMaterials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {material.title}
                        </div>
                      </TableCell>
                      <TableCell>{material.type}</TableCell>
                      <TableCell>{material.course}</TableCell>
                      <TableCell>{material.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
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
    </StudentLayout>
  )
}

