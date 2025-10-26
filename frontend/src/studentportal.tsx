import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { FileText, Calendar, Award, BookOpen, Download, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

export function StudentPortal() {
  const documents = [
    { name: "Course Syllabus - Web Dev", size: "2.4 MB", date: "Oct 15, 2025" },
    { name: "Assignment 3 - Database", size: "1.1 MB", date: "Oct 12, 2025" },
    { name: "Lecture Notes - Chapter 5", size: "3.2 MB", date: "Oct 10, 2025" },
  ];

  const grades = [
    { course: "Web Development", grade: "A", score: 92, color: "bg-secondary" },
    { course: "Database Systems", grade: "A-", score: 88, color: "bg-primary" },
    { course: "Data Structures", grade: "B+", score: 85, color: "bg-chart-3" },
    { course: "Computer Networks", grade: "A", score: 90, color: "bg-chart-2" },
  ];

  const attendance = [
    { subject: "Web Development", percentage: 95, total: 40, attended: 38 },
    { subject: "Database Systems", percentage: 92, total: 38, attended: 35 },
    { subject: "Data Structures", percentage: 88, total: 42, attended: 37 },
    { subject: "Computer Networks", percentage: 90, total: 36, attended: 32 },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1>Student Portal</h1>
        <p className="text-muted-foreground mt-1">
          Access your academic information and resources
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="pb-2">
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-sm">Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">6</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardHeader className="pb-2">
            <Calendar className="h-8 w-8 text-secondary mb-2" />
            <CardTitle className="text-sm">Avg. Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">92%</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-gradient-to-br from-chart-3/10 to-chart-3/5">
          <CardHeader className="pb-2">
            <Award className="h-8 w-8 text-chart-3 mb-2" />
            <CardTitle className="text-sm">GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">3.7</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-gradient-to-br from-chart-4/10 to-chart-4/5">
          <CardHeader className="pb-2">
            <TrendingUp className="h-8 w-8 text-chart-4 mb-2" />
            <CardTitle className="text-sm">Class Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">12/156</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documents */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Documents</CardTitle>
            </div>
            <CardDescription>Download course materials and assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {doc.size} • {doc.date}
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" className="rounded-full">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grades */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle>Grades</CardTitle>
            </div>
            <CardDescription>Your current academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {grades.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{item.course}</p>
                    <Badge className={`${item.color} text-white`}>
                      {item.grade}
                    </Badge>
                  </div>
                  <Progress value={item.score} className="h-2" />
                  <p className="text-xs text-muted-foreground">{item.score}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Attendance Overview</CardTitle>
            </div>
            <CardDescription>Track your class attendance across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendance.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.attended} / {item.total} classes attended
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{item.percentage}%</p>
                    </div>
                  </div>
                  <Progress 
                    value={item.percentage} 
                    className={`h-2 ${item.percentage >= 90 ? '[&>div]:bg-secondary' : item.percentage >= 75 ? '[&>div]:bg-chart-3' : '[&>div]:bg-destructive'}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
