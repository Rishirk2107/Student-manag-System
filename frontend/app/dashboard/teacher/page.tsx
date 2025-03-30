"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, PlusCircle } from "lucide-react"
import TeacherLayout from "@/components/teacher-layout"

// Mock data
const mockAnnouncements = [
  { id: 1, title: "Midterm Exam Schedule", date: "2023-10-15", type: "Exam" },
  { id: 2, title: "Assignment #3 Due Date", date: "2023-10-10", type: "Assignment" },
  { id: 3, title: "Guest Lecture: AI Ethics", date: "2023-10-20", type: "Event" },
]

const mockAssignments = [
  { id: 1, title: "Database Design Project", dueDate: "2023-10-25", course: "Database Systems", submissions: 15 },
  { id: 2, title: "Algorithm Analysis", dueDate: "2023-11-05", course: "Data Structures", submissions: 12 },
  { id: 3, title: "UI/UX Case Study", dueDate: "2023-10-18", course: "Human-Computer Interaction", submissions: 8 },
]

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false)
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false)

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
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
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground mt-1">For current semester</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockAssignments.length}</div>
                <p className="text-xs text-muted-foreground mt-1">To be graded</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockAnnouncements.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Posted this month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your teaching resources</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button
                onClick={() => setIsAddAnnouncementOpen(true)}
                variant="outline"
                className="h-24 flex flex-col gap-1"
              >
                <PlusCircle className="h-5 w-5" />
                <span>New Announcement</span>
              </Button>
              <Button
                onClick={() => setIsAddAssignmentOpen(true)}
                variant="outline"
                className="h-24 flex flex-col gap-1"
              >
                <PlusCircle className="h-5 w-5" />
                <span>New Assignment</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-1">
                <FileUp className="h-5 w-5" />
                <span>Upload Materials</span>
              </Button>
              <Link href="/dashboard/teacher/grades" className="w-full">
                <Button variant="outline" className="h-24 w-full flex flex-col gap-1">
                  <PlusCircle className="h-5 w-5" />
                  <span>Manage Grades</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Announcements</h2>
            <Button onClick={() => setIsAddAnnouncementOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAnnouncements.map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell className="font-medium">{announcement.title}</TableCell>
                      <TableCell>{announcement.date}</TableCell>
                      <TableCell>{announcement.type}</TableCell>
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

        <TabsContent value="assignments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Assignments</h2>
            <Button onClick={() => setIsAddAssignmentOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Assignment
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>{assignment.submissions}</TableCell>
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

        <TabsContent value="materials" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Study Materials</h2>
            <Button>
              <FileUp className="mr-2 h-4 w-4" />
              Upload Materials
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-10 text-muted-foreground">
                <FileUp className="mx-auto h-10 w-10 mb-3" />
                <p>No materials uploaded yet</p>
                <p className="text-sm">Upload lecture notes, slides, or other resources for your students</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Announcement Dialog */}
      <Dialog open={isAddAnnouncementOpen} onOpenChange={setIsAddAnnouncementOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Announcement</DialogTitle>
            <DialogDescription>
              Create an announcement to notify students about important information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="announcementTitle">Title</Label>
              <Input id="announcementTitle" placeholder="Enter announcement title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="announcementType">Type</Label>
              <Select>
                <SelectTrigger id="announcementType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="announcementContent">Content</Label>
              <Textarea id="announcementContent" placeholder="Enter announcement details" rows={5} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddAnnouncementOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddAnnouncementOpen(false)}>Post Announcement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Assignment Dialog */}
      <Dialog open={isAddAssignmentOpen} onOpenChange={setIsAddAssignmentOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
            <DialogDescription>Create an assignment for your students to complete.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="assignmentTitle">Title</Label>
              <Input id="assignmentTitle" placeholder="Enter assignment title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="course">Course</Label>
              <Select>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="db">Database Systems</SelectItem>
                  <SelectItem value="ds">Data Structures</SelectItem>
                  <SelectItem value="hci">Human-Computer Interaction</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignmentDescription">Description</Label>
              <Textarea id="assignmentDescription" placeholder="Enter assignment details" rows={5} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddAssignmentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddAssignmentOpen(false)}>Create Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TeacherLayout>
  )
}

