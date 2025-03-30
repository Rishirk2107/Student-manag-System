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
import { Search, FileUp, Download, Trash2, FileText, FileImage, FileArchive } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

// Mock data
const mockMaterials = [
  {
    id: 1,
    title: "Introduction to Programming Syllabus",
    type: "PDF",
    course: "CS101",
    uploadedBy: "Dr. Jane Smith",
    date: "2023-08-15",
    size: "1.2 MB",
    downloads: 45,
  },
  {
    id: 2,
    title: "Calculus II Formula Sheet",
    type: "PDF",
    course: "MATH201",
    uploadedBy: "Prof. John Doe",
    date: "2023-08-20",
    size: "0.8 MB",
    downloads: 38,
  },
  {
    id: 3,
    title: "Physics Lab Manual",
    type: "PDF",
    course: "PHYS101",
    uploadedBy: "Dr. Emily Johnson",
    date: "2023-08-22",
    size: "2.5 MB",
    downloads: 52,
  },
  {
    id: 4,
    title: "Technical Writing Guidelines",
    type: "DOCX",
    course: "ENG205",
    uploadedBy: "Prof. Michael Brown",
    date: "2023-08-25",
    size: "1.5 MB",
    downloads: 30,
  },
  {
    id: 5,
    title: "Chemistry Experiment Images",
    type: "ZIP",
    course: "CHEM101",
    uploadedBy: "Dr. Sarah Wilson",
    date: "2023-08-28",
    size: "15.2 MB",
    downloads: 27,
  },
]

export default function AdminMaterials() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploadMaterialOpen, setIsUploadMaterialOpen] = useState(false)

  // Filter function for search
  const filteredMaterials = mockMaterials.filter(
    (material) =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Function to get the appropriate icon based on file type
  const getFileIcon = (type) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4" />
      case "DOCX":
        return <FileText className="h-4 w-4" />
      case "ZIP":
        return <FileArchive className="h-4 w-4" />
      case "JPG":
      case "PNG":
        return <FileImage className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Study Materials</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search materials..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsUploadMaterialOpen(true)}>
            <FileUp className="mr-2 h-4 w-4" />
            Upload Material
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Study Materials</CardTitle>
          <CardDescription>Manage study materials for all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getFileIcon(material.type)}
                      {material.title}
                    </div>
                  </TableCell>
                  <TableCell>{material.course}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{material.type}</Badge>
                  </TableCell>
                  <TableCell>{material.uploadedBy}</TableCell>
                  <TableCell>{material.date}</TableCell>
                  <TableCell>{material.size}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
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

      {/* Upload Material Dialog */}
      <Dialog open={isUploadMaterialOpen} onOpenChange={setIsUploadMaterialOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Upload Study Material</DialogTitle>
            <DialogDescription>Upload study materials for students and teachers to access.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="materialTitle">Title</Label>
              <Input id="materialTitle" placeholder="Enter material title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="course">Course</Label>
              <Select>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs101">CS101 - Introduction to Computer Science</SelectItem>
                  <SelectItem value="math201">MATH201 - Calculus II</SelectItem>
                  <SelectItem value="phys101">PHYS101 - Physics for Engineers</SelectItem>
                  <SelectItem value="eng205">ENG205 - Technical Writing</SelectItem>
                  <SelectItem value="chem101">CHEM101 - General Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter material description" rows={3} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">File</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileUp className="w-8 h-8 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, ZIP, JPG, PNG (MAX. 50MB)</p>
                  </div>
                  <input id="file-upload" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadMaterialOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsUploadMaterialOpen(false)}>Upload Material</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}

