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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Mail } from "lucide-react"
import TeacherLayout from "@/components/teacher-layout"
import { toast } from "@/components/ui/use-toast"

// Mock data
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
  {
    id: 4,
    name: "Diana Evans",
    email: "diana.evans@college.edu",
    course: "Computer Science",
    year: "3rd Year",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Edward Foster",
    email: "edward.foster@college.edu",
    course: "Mathematics",
    year: "4th Year",
    status: "Active",
  },
]

export default function TeacherStudents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [isInviteStudentOpen, setIsInviteStudentOpen] = useState(false)

  // Filter function for search
  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddStudent = () => {
    setIsAddStudentOpen(false)
    toast({
      title: "Student added successfully",
      description: "The student has been added to your class.",
    })
  }

  const handleInviteStudent = () => {
    setIsInviteStudentOpen(false)
    toast({
      title: "Invitation sent",
      description: "An invitation email has been sent to the student.",
    })
  }

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddStudentOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
          <Button variant="outline" onClick={() => setIsInviteStudentOpen(true)}>
            <Mail className="mr-2 h-4 w-4" />
            Invite
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>Manage students in your classes</CardDescription>
        </CardHeader>
        <CardContent>
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
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
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
            <Button onClick={handleAddStudent}>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Student Dialog */}
      <Dialog open={isInviteStudentOpen} onOpenChange={setIsInviteStudentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite Student</DialogTitle>
            <DialogDescription>Send an invitation email to a student to join your class.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="inviteEmail">Email</Label>
              <Input id="inviteEmail" type="email" placeholder="student@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="inviteCourse">Course</Label>
              <Select>
                <SelectTrigger id="inviteCourse">
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
              <Label htmlFor="message">Message (Optional)</Label>
              <Input id="message" placeholder="Add a personal message to the invitation" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteStudentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteStudent}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TeacherLayout>
  )
}

