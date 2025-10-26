import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";

export function Attendance() {
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [leaveReason, setLeaveReason] = useState("");

  const timetable = [
    { day: "Monday", slots: [
      { time: "9:00 AM", course: "Data Structures", room: "CS-301", status: "present" as const },
      { time: "11:00 AM", course: "Database Systems", room: "CS-205", status: "present" as const },
      { time: "2:00 PM", course: "Web Development", room: "CS-Lab-1", status: "present" as const },
    ]},
    { day: "Tuesday", slots: [
      { time: "10:00 AM", course: "Computer Networks", room: "CS-402", status: "present" as const },
      { time: "1:00 PM", course: "Data Structures Lab", room: "CS-Lab-2", status: "absent" as const },
    ]},
    { day: "Wednesday", slots: [
      { time: "9:00 AM", course: "Web Development", room: "CS-301", status: "leave" as const },
      { time: "11:00 AM", course: "Database Systems", room: "CS-205", status: "present" as const },
    ]},
  ];

  const courseAttendance = [
    { course: "Data Structures", attended: 38, leave: 2, total: 42, percentage: 90 },
    { course: "Database Systems", attended: 35, leave: 1, total: 38, percentage: 92 },
    { course: "Web Development", attended: 39, leave: 1, total: 40, percentage: 98 },
    { course: "Computer Networks", attended: 32, leave: 1, total: 36, percentage: 89 },
  ];

  const leaveRequests = [
    { id: 1, date: "Oct 13, 2025", reason: "Medical appointment", status: "Approved" as const },
    { id: 2, date: "Oct 10, 2025", reason: "Family emergency", status: "Approved" as const },
    { id: 3, date: "Oct 8, 2025", reason: "Personal work", status: "Pending" as const },
  ];

  const handleLeaveRequest = () => {
    if (!leaveReason.trim()) {
      toast.error("Please provide a reason for leave");
      return;
    }
    toast.success("Leave request submitted successfully!");
    setLeaveReason("");
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-secondary";
    if (percentage >= 75) return "text-chart-3";
    return "text-destructive";
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1>Attendance</h1>
          <p className="text-muted-foreground text-sm mt-1">Track your attendance and manage leave requests</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Request Leave
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Leave Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Leave</Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide a detailed reason for your leave request..."
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  rows={4}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Note: Leave requests will be reviewed by the admin and approved if valid.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={handleLeaveRequest}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-indigo-200 dark:border-indigo-800">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">Overall Attendance</p>
                  <p className="text-3xl font-semibold text-indigo-900 dark:text-indigo-100">92%</p>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Classes Attended</p>
                  <p className="text-3xl font-semibold">144/156</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">On Leave</p>
                  <p className="text-3xl font-semibold text-amber-600">5</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-3xl font-semibold">12/14</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course-wise Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course-wise Attendance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {courseAttendance.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{course.course}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.attended} Present • {course.leave} Leave • {course.total - course.attended - course.leave} Absent
                      </p>
                    </div>
                    <span className={`text-lg font-semibold ${getAttendanceColor(course.percentage)}`}>
                      {course.percentage}%
                    </span>
                  </div>
                  <Progress 
                    value={course.percentage} 
                    className={`h-2 ${
                      course.percentage >= 90 ? '[&>div]:bg-secondary' : 
                      course.percentage >= 75 ? '[&>div]:bg-chart-3' : 
                      '[&>div]:bg-destructive'
                    }`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timetable" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Timetable & Attendance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {timetable.map((day, dayIndex) => (
                <div key={dayIndex} className="space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    {day.day}
                  </h4>
                  <div className="space-y-2 pl-6">
                    {day.slots.map((slot, slotIndex) => (
                      <div 
                        key={slotIndex} 
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{slot.time}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{slot.course}</p>
                          <p className="text-xs text-muted-foreground">{slot.room}</p>
                        </div>
                        <Badge 
                          className={
                            slot.status === "present" 
                              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200" 
                              : slot.status === "leave"
                              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200"
                          }
                        >
                          {slot.status === "present" ? (
                            <><CheckCircle className="h-3 w-3 mr-1" /> Present</>
                          ) : slot.status === "leave" ? (
                            <><AlertCircle className="h-3 w-3 mr-1" /> Leave</>
                          ) : (
                            <><XCircle className="h-3 w-3 mr-1" /> Absent</>
                          )}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaves" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaveRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{request.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.reason}</p>
                    </div>
                    <Badge 
                      className={
                        request.status === "Approved" 
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" 
                          : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
