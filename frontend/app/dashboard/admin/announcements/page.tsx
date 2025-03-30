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
import { Search, Plus, Eye, Trash2, Edit } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

// Mock data
const mockAnnouncements = [
  {
    id: 1,
    title: "Fall Semester Registration",
    type: "Academic",
    target: "All",
    author: "Admin User",
    date: "2023-08-15",
    status: "published",
  },
  {
    id: 2,
    title: "Campus Maintenance Notice",
    type: "Facility",
    target: "All",
    author: "Admin User",
    date: "2023-08-20",
    status: "published",
  },
  {
    id: 3,
    title: "New Library Resources",
    type: "Resource",
    target: "Students",
    author: "Dr. Jane Smith",
    date: "2023-08-22",
    status: "published",
  },
  {
    id: 4,
    title: "Faculty Meeting",
    type: "Meeting",
    target: "Teachers",
    author: "Admin User",
    date: "2023-08-25",
    status: "draft",
  },
  {
    id: 5,
    title: "Scholarship Opportunities",
    type: "Financial",
    target: "Students",
    author: "Admin User",
    date: "2023-08-28",
    status: "published",
  },
]

export default function AdminAnnouncements() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false)
  const [isViewAnnouncementOpen, setIsViewAnnouncementOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)

  // Filter function for search
  const filteredAnnouncements = mockAnnouncements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.target.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement)
    setIsViewAnnouncementOpen(true)
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search announcements..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddAnnouncementOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
          <CardDescription>Manage announcements for students and teachers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell className="font-medium">{announcement.title}</TableCell>
                  <TableCell>{announcement.type}</TableCell>
                  <TableCell>{announcement.target}</TableCell>
                  <TableCell>{announcement.date}</TableCell>
                  <TableCell>
                    <Badge variant={announcement.status === "published" ? "default" : "secondary"}>
                      {announcement.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewAnnouncement(announcement)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Announcement Dialog */}
      <Dialog open={isAddAnnouncementOpen} onOpenChange={setIsAddAnnouncementOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Announcement</DialogTitle>
            <DialogDescription>
              Create an announcement to notify students and teachers about important information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="announcementTitle">Title</Label>
              <Input id="announcementTitle" placeholder="Enter announcement title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="announcementType">Type</Label>
                <Select>
                  <SelectTrigger id="announcementType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="facility">Facility</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="resource">Resource</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target">Target Audience</Label>
                <Select>
                  <SelectTrigger id="target">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="teachers">Teachers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="announcementContent">Content</Label>
              <Textarea id="announcementContent" placeholder="Enter announcement details" rows={5} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="draft">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Publish Now</SelectItem>
                  <SelectItem value="draft">Save as Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddAnnouncementOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddAnnouncementOpen(false)}>Create Announcement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Announcement Dialog */}
      <Dialog open={isViewAnnouncementOpen} onOpenChange={setIsViewAnnouncementOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{selectedAnnouncement?.title}</DialogTitle>
            <DialogDescription>
              Posted on {selectedAnnouncement?.date} by {selectedAnnouncement?.author}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge>{selectedAnnouncement?.type}</Badge>
              <Badge variant="outline">{selectedAnnouncement?.target}</Badge>
            </div>
            <p className="text-muted-foreground">
              This is a sample announcement content. In a real application, this would contain the full text of the
              announcement. It might include important information about academic schedules, campus events, or
              administrative notices.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewAnnouncementOpen(false)}>
              Close
            </Button>
            <Button>Edit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}

