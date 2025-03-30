import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">EduManage</h1>
          <nav className="space-x-4">
            <Link href="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-muted">
          <div className="container text-center space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">College Management System</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform for college administrators, teachers, and students to manage academic activities
              efficiently.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-3">Admin Dashboard</h3>
                <p className="text-muted-foreground">
                  Register your college and manage students and teachers with ease. Control access and monitor
                  activities.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-3">Teacher Portal</h3>
                <p className="text-muted-foreground">
                  Post announcements, assignments, and share study materials with students. Track submissions and
                  progress.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-3">Student Access</h3>
                <p className="text-muted-foreground">
                  Access course materials, view announcements, submit assignments, and stay updated with academic
                  activities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8">Access Your Portal</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-background p-6 rounded-lg shadow text-center">
                <h3 className="text-xl font-bold mb-3">Admin</h3>
                <p className="text-muted-foreground mb-4">
                  College administrators can manage the entire system, add teachers, and oversee all activities.
                </p>
                <Link href="/login/admin">
                  <Button className="w-full">Admin Login</Button>
                </Link>
              </div>
              <div className="bg-background p-6 rounded-lg shadow text-center">
                <h3 className="text-xl font-bold mb-3">Teacher</h3>
                <p className="text-muted-foreground mb-4">
                  Teachers can manage courses, create assignments, and add students to their classes.
                </p>
                <Link href="/login/teacher">
                  <Button className="w-full">Teacher Login</Button>
                </Link>
              </div>
              <div className="bg-background p-6 rounded-lg shadow text-center">
                <h3 className="text-xl font-bold mb-3">Student</h3>
                <p className="text-muted-foreground mb-4">
                  Students can access course materials, submit assignments, and track their academic progress.
                </p>
                <Link href="/login/student">
                  <Button className="w-full">Student Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-6">
        <div className="container text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EduManage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

