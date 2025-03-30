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
import { Search, Plus, Eye, FileUp } from "lucide-react"
import TeacherLayout from "@/components/teacher-layout"

// Mock data
const mockAssignments = [
  {
    id: 1,
    title: "Database Design Project",
    course: "CS205 - Database Systems",
    dueDate: "2023-10-25",
    status: "active",
    submissions: 15,
    totalStudents: 38,
  },
  {
    id: 2,
    title: "Algorithm Analysis",
    course: "CS101 - Introduction to Computer Science",
    dueDate: "2023-11-05",
    status: "active",
    submissions: 12,
    totalStudents: 45,
  },
  {
    id: 3,
    title: "UI/UX Case Study",
    course: "CS310 - Human-Computer Interaction",
    dueDate: "2023-10-18",
    status: "active",
    submissions: 8,
    totalStudents: 32,
  },
  {
    id: 4,
    title: "Midterm Review Questions",
    course: "CS101 - Introduction to Computer Science",
    dueDate: "2023-09-30",
    status: "expired",
    submissions: 40,
    totalStudents: 45,
  },
]

export default function TeacherAssignments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false)
  const [isViewSubmissionsOpen, setIsViewSubmissionsOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  // Filter function for search
  const filteredAssignments = mockAssignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewSubmissions = (assignment) => {
    setSelectedAssignment(assignment)
    setIsViewSubmissionsOpen(true)
  }

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Assignments</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assignments..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddAssignmentOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Assignment
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Assignments</CardTitle>
          <CardDescription>Manage assignments for your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.title}</TableCell>
                  <TableCell>{assignment.course}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell>
                    {assignment.submissions} / {assignment.totalStudents}
                  </TableCell>
                  <TableCell>
                    <Badge variant={assignment.status === "active" ? "default" : "secondary"}>
                      {assignment.status === "active" ? "Active" : "Expired"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewSubmissions(assignment)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
                  <SelectItem value="cs101">CS101 - Introduction to Computer Science</SelectItem>
                  <SelectItem value="cs205">CS205 - Database Systems</SelectItem>
                  <SelectItem value="cs310">CS310 - Human-Computer Interaction</SelectItem>
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
            <div className="grid gap-2">
              <Label htmlFor="file">Attachment (Optional)</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileUp className="w-6 h-6 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <input id="file-upload" type="file" className="hidden" />
                </label>
              </div>
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

      {/* View Submissions Dialog */}
      <Dialog open={isViewSubmissionsOpen} onOpenChange={setIsViewSubmissionsOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>{selectedAssignment?.title} - Submissions</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.course} • Due: {selectedAssignment?.dueDate}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Student Submissions</h3>
              <Badge variant="outline">
                {selectedAssignment?.submissions} / {selectedAssignment?.totalStudents} Submitted
              </Badge>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Alice Brown</TableCell>
                  <TableCell>2023-10-20</TableCell>
                  <TableCell>
                    <Badge variant="default">Submitted</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Bob Wilson</TableCell>
                  <TableCell>2023-10-19</TableCell>
                  <TableCell>
                    <Badge variant="default">Submitted</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Charlie Davis</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Not Submitted</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" disabled>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewSubmissionsOpen(false)}>
              Close
            </Button>
            <Button>Download All</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TeacherLayout>
  )
}

