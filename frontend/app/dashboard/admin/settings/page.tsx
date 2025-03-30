"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import AdminLayout from "@/components/admin-layout"

export default function AdminSettings() {
  const [collegeInfo, setCollegeInfo] = useState({
    name: "Sample College",
    address: "123 Education St, Academic City, AC 12345",
    phone: "(123) 456-7890",
    email: "info@samplecollege.edu",
    website: "www.samplecollege.edu",
    description: "A leading institution dedicated to academic excellence and student success.",
  })

  const [emailSettings, setEmailSettings] = useState({
    sendWelcomeEmails: true,
    sendAnnouncementEmails: true,
    sendAssignmentNotifications: true,
    emailFooter: "This is an automated message from Sample College. Please do not reply to this email.",
  })

  const handleCollegeInfoChange = (e) => {
    const { name, value } = e.target
    setCollegeInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmailSettingChange = (name, value) => {
    setEmailSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveCollegeInfo = () => {
    // In a real app, this would save to a database
    toast({
      title: "College information updated",
      description: "Your changes have been saved successfully.",
    })
  }

  const handleSaveEmailSettings = () => {
    // In a real app, this would save to a database
    toast({
      title: "Email settings updated",
      description: "Your changes have been saved successfully.",
    })
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="college" className="space-y-4">
        <TabsList>
          <TabsTrigger value="college">College Information</TabsTrigger>
          <TabsTrigger value="email">Email Settings</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="college">
          <Card>
            <CardHeader>
              <CardTitle>College Information</CardTitle>
              <CardDescription>
                Update your college's basic information that will be displayed throughout the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="collegeName">College Name</Label>
                  <Input id="collegeName" name="name" value={collegeInfo.name} onChange={handleCollegeInfoChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" value={collegeInfo.website} onChange={handleCollegeInfoChange} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={collegeInfo.address} onChange={handleCollegeInfoChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={collegeInfo.phone} onChange={handleCollegeInfoChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={collegeInfo.email}
                    onChange={handleCollegeInfoChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={collegeInfo.description}
                  onChange={handleCollegeInfoChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logo">College Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-md bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Logo</span>
                  </div>
                  <Button variant="outline">Upload New Logo</Button>
                </div>
                <p className="text-sm text-muted-foreground">Recommended size: 200x200 pixels. Max file size: 2MB.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveCollegeInfo}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure how and when emails are sent from the system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="welcome-emails">Welcome Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Send welcome emails to new users when they are added to the system.
                    </p>
                  </div>
                  <Switch
                    id="welcome-emails"
                    checked={emailSettings.sendWelcomeEmails}
                    onCheckedChange={(checked) => handleEmailSettingChange("sendWelcomeEmails", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="announcement-emails">Announcement Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications when new announcements are published.
                    </p>
                  </div>
                  <Switch
                    id="announcement-emails"
                    checked={emailSettings.sendAnnouncementEmails}
                    onCheckedChange={(checked) => handleEmailSettingChange("sendAnnouncementEmails", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="assignment-emails">Assignment Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications when new assignments are created.
                    </p>
                  </div>
                  <Switch
                    id="assignment-emails"
                    checked={emailSettings.sendAssignmentNotifications}
                    onCheckedChange={(checked) => handleEmailSettingChange("sendAssignmentNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="grid gap-2">
                  <Label htmlFor="emailFooter">Email Footer</Label>
                  <Textarea
                    id="emailFooter"
                    rows={3}
                    value={emailSettings.emailFooter}
                    onChange={(e) => handleEmailSettingChange("emailFooter", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    This text will appear at the bottom of all emails sent from the system.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveEmailSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your college portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="theme">Default Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Users can override this setting in their personal preferences.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary"></div>
                  <div className="w-10 h-10 rounded-full bg-blue-500"></div>
                  <div className="w-10 h-10 rounded-full bg-green-500"></div>
                  <div className="w-10 h-10 rounded-full bg-purple-500"></div>
                  <div className="w-10 h-10 rounded-full bg-orange-500"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="allow-theme-toggle" defaultChecked />
                <Label htmlFor="allow-theme-toggle">Allow users to change theme</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security settings for your college portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="two-factor" />
                <Label htmlFor="two-factor">Require two-factor authentication for admins</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Select policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ chars, 1 number, 1 uppercase)</SelectItem>
                    <SelectItem value="strong">Strong (8+ chars, 1 number, 1 uppercase, 1 special)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="session-timeout">Session Timeout</Label>
                <Select defaultValue="60">
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}

