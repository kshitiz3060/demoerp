import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Download, FileText, Edit, Award, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner";

export function ExamsGrading() {
  const results = [
    { semester: "Semester 6", sgpa: "8.9", subjects: [
      { name: "Data Structures", credits: 4, grade: "A", score: 92 },
      { name: "Database Systems", credits: 4, grade: "A-", score: 88 },
      { name: "Web Development", credits: 3, grade: "A", score: 90 },
      { name: "Computer Networks", credits: 4, grade: "B+", score: 85 },
    ]},
    { semester: "Semester 5", sgpa: "8.5", subjects: [
      { name: "Operating Systems", credits: 4, grade: "A-", score: 88 },
      { name: "Software Engineering", credits: 3, grade: "A", score: 91 },
      { name: "Algorithm Design", credits: 4, grade: "B+", score: 84 },
    ]},
  ];

  const upcomingExams = [
    { subject: "Machine Learning", date: "Nov 15, 2025", time: "10:00 AM", room: "Hall A" },
    { subject: "Cloud Computing", date: "Nov 18, 2025", time: "2:00 PM", room: "Hall B" },
    { subject: "Big Data Analytics", date: "Nov 22, 2025", time: "10:00 AM", room: "Hall A" },
  ];

  const availableCourses = [
    { code: "CS701", name: "Machine Learning", credits: 4, faculty: "Dr. Sarah Johnson", seats: "12/40" },
    { code: "CS702", name: "Cloud Computing", credits: 3, faculty: "Dr. Michael Brown", seats: "8/35" },
    { code: "CS703", name: "Blockchain Technology", credits: 3, faculty: "Dr. Emily Davis", seats: "15/30" },
    { code: "CS704", name: "IoT Systems", credits: 4, faculty: "Dr. James Wilson", seats: "20/40" },
  ];

  const handleDownload = (type: string) => {
    toast.success(`${type} download started`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Exams & Grading</h1>
        <p className="text-muted-foreground text-sm mt-1">View results, hall tickets, and manage course registrations</p>
      </div>

      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="hallticket">Hall Ticket</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="rtrv">RT-RV Form</TabsTrigger>
        </TabsList>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Academic Results</CardTitle>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Overall CGPA</p>
                  <p className="text-2xl font-semibold text-primary">8.7</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {results.map((semester, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{semester.semester}</h4>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      SGPA: {semester.sgpa}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {semester.subjects.map((subject, subIndex) => (
                      <div key={subIndex} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{subject.name}</p>
                          <p className="text-xs text-muted-foreground">{subject.credits} Credits</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{subject.score}%</span>
                          <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 min-w-[50px] justify-center">
                            {subject.grade}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hall Ticket Tab */}
        <TabsContent value="hallticket" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Examination Hall Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border-2 border-dashed border-border">
                <div className="text-center space-y-3">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h4>Semester 7 End Examinations</h4>
                    <p className="text-sm text-muted-foreground mt-1">November 2025</p>
                  </div>
                  <Button onClick={() => handleDownload("Hall Ticket")} className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Hall Ticket
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Upcoming Examinations</h4>
                {upcomingExams.map((exam, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">{exam.subject}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {exam.date}
                        </span>
                        <span>{exam.time}</span>
                        <span>{exam.room}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Course Registration Tab */}
        <TabsContent value="registration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Registration - Semester 8</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableCourses.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{course.code}</Badge>
                      <p className="font-medium">{course.name}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1.5">
                      {course.faculty} • {course.credits} Credits • Seats: {course.seats}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">Register</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* RT-RV Form Tab */}
        <TabsContent value="rtrv" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recounting & Revaluation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/30 space-y-3">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">Apply for RT/RV</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Request recounting or revaluation for your exam papers. Last date: Nov 30, 2025
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3.5 w-3.5 mr-2" />
                    Apply for Recounting
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3.5 w-3.5 mr-2" />
                    Apply for Revaluation
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Application History</h4>
                <div className="text-sm text-muted-foreground text-center py-8 border border-dashed rounded-lg">
                  No previous applications
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
