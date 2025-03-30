import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, UserCog, Users } from "lucide-react"

export default function LoginSelect() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login to EduManage</CardTitle>
          <CardDescription>Select your role to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/login/admin" className="block">
            <Button variant="outline" className="w-full justify-start h-16">
              <UserCog className="mr-4 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Admin</div>
                <div className="text-xs text-muted-foreground">College administrators</div>
              </div>
            </Button>
          </Link>

          <Link href="/login/teacher" className="block">
            <Button variant="outline" className="w-full justify-start h-16">
              <Users className="mr-4 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Teacher</div>
                <div className="text-xs text-muted-foreground">Faculty members</div>
              </div>
            </Button>
          </Link>

          <Link href="/login/student" className="block">
            <Button variant="outline" className="w-full justify-start h-16">
              <GraduationCap className="mr-4 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Student</div>
                <div className="text-xs text-muted-foreground">Enrolled students</div>
              </div>
            </Button>
          </Link>

          <div className="text-center pt-4">
            <Link href="/" className="text-sm text-primary underline-offset-4 hover:underline">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

