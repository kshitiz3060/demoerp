import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar, Clock, User, Book, FlaskConical } from "lucide-react";

interface ClassData {
  id: string;
  courseName: string;
  courseCode: string;
  teacherName: string;
  lectureType: "Theory" | "Practical";
  time: string;
  room: string;
  status: "P" | "A" | "L";
}

export function Timetable() {
  const [activeDay, setActiveDay] = useState("monday");

  // Timetable data organized by day
  const timetableData: Record<string, ClassData[]> = {
    monday: [
      {
        id: "mon-1",
        courseName: "Data Structures & Algorithms",
        courseCode: "CS301",
        teacherName: "Dr. Robert Chen",
        lectureType: "Theory",
        time: "9:00 AM - 10:30 AM",
        room: "CS-301",
        status: "P",
      },
      {
        id: "mon-2",
        courseName: "Database Management Systems",
        courseCode: "CS305",
        teacherName: "Prof. Sarah Miller",
        lectureType: "Theory",
        time: "11:00 AM - 12:30 PM",
        room: "CS-205",
        status: "P",
      },
      {
        id: "mon-3",
        courseName: "Web Development Lab",
        courseCode: "CS307L",
        teacherName: "Dr. Michael Brown",
        lectureType: "Practical",
        time: "2:00 PM - 4:00 PM",
        room: "CS-Lab-1",
        status: "P",
      },
    ],
    tuesday: [
      {
        id: "tue-1",
        courseName: "Computer Networks",
        courseCode: "CS401",
        teacherName: "Dr. Emily Davis",
        lectureType: "Theory",
        time: "9:00 AM - 10:30 AM",
        room: "CS-402",
        status: "P",
      },
      {
        id: "tue-2",
        courseName: "Operating Systems",
        courseCode: "CS403",
        teacherName: "Prof. James Wilson",
        lectureType: "Theory",
        time: "11:00 AM - 12:30 PM",
        room: "CS-301",
        status: "A",
      },
      {
        id: "tue-3",
        courseName: "Software Engineering",
        courseCode: "CS405",
        teacherName: "Dr. Lisa Anderson",
        lectureType: "Theory",
        time: "2:00 PM - 3:30 PM",
        room: "CS-203",
        status: "P",
      },
    ],
    wednesday: [
      {
        id: "wed-1",
        courseName: "Data Structures Lab",
        courseCode: "CS301L",
        teacherName: "Dr. Robert Chen",
        lectureType: "Practical",
        time: "9:00 AM - 11:00 AM",
        room: "CS-Lab-2",
        status: "P",
      },
      {
        id: "wed-2",
        courseName: "Database Management Systems",
        courseCode: "CS305",
        teacherName: "Prof. Sarah Miller",
        lectureType: "Theory",
        time: "11:30 AM - 1:00 PM",
        room: "CS-205",
        status: "P",
      },
      {
        id: "wed-3",
        courseName: "Computer Networks Lab",
        courseCode: "CS401L",
        teacherName: "Dr. Emily Davis",
        lectureType: "Practical",
        time: "2:00 PM - 4:00 PM",
        room: "CS-Lab-3",
        status: "L",
      },
    ],
    thursday: [
      {
        id: "thu-1",
        courseName: "Web Development",
        courseCode: "CS307",
        teacherName: "Dr. Michael Brown",
        lectureType: "Theory",
        time: "9:00 AM - 10:30 AM",
        room: "CS-301",
        status: "P",
      },
      {
        id: "thu-2",
        courseName: "Operating Systems",
        courseCode: "CS403",
        teacherName: "Prof. James Wilson",
        lectureType: "Theory",
        time: "11:00 AM - 12:30 PM",
        room: "CS-301",
        status: "P",
      },
      {
        id: "thu-3",
        courseName: "Software Engineering Lab",
        courseCode: "CS405L",
        teacherName: "Dr. Lisa Anderson",
        lectureType: "Practical",
        time: "2:00 PM - 4:00 PM",
        room: "CS-Lab-4",
        status: "P",
      },
    ],
    friday: [
      {
        id: "fri-1",
        courseName: "Data Structures & Algorithms",
        courseCode: "CS301",
        teacherName: "Dr. Robert Chen",
        lectureType: "Theory",
        time: "9:00 AM - 10:30 AM",
        room: "CS-301",
        status: "P",
      },
      {
        id: "fri-2",
        courseName: "Computer Networks",
        courseCode: "CS401",
        teacherName: "Dr. Emily Davis",
        lectureType: "Theory",
        time: "11:00 AM - 12:30 PM",
        room: "CS-402",
        status: "P",
      },
      {
        id: "fri-3",
        courseName: "Operating Systems Lab",
        courseCode: "CS403L",
        teacherName: "Prof. James Wilson",
        lectureType: "Practical",
        time: "2:00 PM - 4:00 PM",
        room: "CS-Lab-1",
        status: "P",
      },
    ],
    saturday: [
      {
        id: "sat-1",
        courseName: "Web Development",
        courseCode: "CS307",
        teacherName: "Dr. Michael Brown",
        lectureType: "Theory",
        time: "9:00 AM - 10:30 AM",
        room: "CS-301",
        status: "P",
      },
      {
        id: "sat-2",
        courseName: "Software Engineering",
        courseCode: "CS405",
        teacherName: "Dr. Lisa Anderson",
        lectureType: "Theory",
        time: "11:00 AM - 12:30 PM",
        room: "CS-203",
        status: "P",
      },
    ],
  };

  const getStatusBadge = (status: "P" | "A" | "L") => {
    const styles = {
      P: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50",
      A: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50",
      L: "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50"
    };

    const labels = {
      P: "Present",
      A: "Absent",
      L: "Leave"
    };

    return (
      <Badge className={`${styles[status]} border`} variant="outline">
        {labels[status]}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const getDayLabel = (day: string) => {
    const labels: Record<string, string> = {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
    };
    return labels[day] || day;
  };

  const ClassCard = ({ classData }: { classData: ClassData }) => (
    <Card className="overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 border-border/50 bg-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{classData.courseName}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{classData.courseCode}</p>
          </div>
          {getStatusBadge(classData.status)}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border/50">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${classData.teacherName}`} />
              <AvatarFallback>{getInitials(classData.teacherName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <p className="text-sm font-medium truncate">{classData.teacherName}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground truncate">{classData.time}</span>
            </div>
            <div className="flex items-center gap-2">
              {classData.lectureType === "Theory" ? (
                <Book className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              ) : (
                <FlaskConical className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              )}
              <span className="text-sm text-muted-foreground">{classData.lectureType}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground">Room: {classData.room}</span>
            <Badge variant="outline" className="text-xs bg-accent/30 border-border/50">
              {classData.lectureType === "Practical" ? "2 hrs" : "1.5 hrs"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1>Class Timetable</h1>
          <p className="text-muted-foreground text-sm mt-0.5">View your weekly class schedule</p>
        </div>
      </div>

      <Tabs value={activeDay} onValueChange={setActiveDay} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-muted/50 p-1">
          <TabsTrigger value="monday" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Mon</TabsTrigger>
          <TabsTrigger value="tuesday" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Tue</TabsTrigger>
          <TabsTrigger value="wednesday" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Wed</TabsTrigger>
          <TabsTrigger value="thursday" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Thu</TabsTrigger>
          <TabsTrigger value="friday" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Fri</TabsTrigger>
          <TabsTrigger value="saturday" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Sat</TabsTrigger>
        </TabsList>

        {Object.keys(timetableData).map((day) => (
          <TabsContent key={day} value={day} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">{getDayLabel(day)}</h2>
              <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                {timetableData[day].length} {timetableData[day].length === 1 ? "Class" : "Classes"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timetableData[day].map((classData) => (
                <ClassCard key={classData.id} classData={classData} />
              ))}
            </div>

            {timetableData[day].length === 0 && (
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No classes scheduled for {getDayLabel(day)}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
