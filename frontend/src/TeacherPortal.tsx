import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Users, Edit, Save, X } from "lucide-react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

interface Student {
  id: number;
  name: string;
  email: string;
  grade: string;
  attendance: number;
}

export function TeacherPortal() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Alice Johnson", email: "alice.j@college.edu.in", grade: "A", attendance: 95 },
    { id: 2, name: "Bob Smith", email: "bob.s@college.edu.in", grade: "B+", attendance: 88 },
    { id: 3, name: "Carol White", email: "carol.w@college.edu.in", grade: "A-", attendance: 92 },
    { id: 4, name: "David Brown", email: "david.b@college.edu.in", grade: "B", attendance: 85 },
    { id: 5, name: "Emma Davis", email: "emma.d@college.edu.in", grade: "A", attendance: 98 },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editGrade, setEditGrade] = useState("");

  const handleEditClick = (student: Student) => {
    setEditingId(student.id);
    setEditGrade(student.grade);
  };

  const handleSaveClick = (id: number) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, grade: editGrade } : s
    ));
    setEditingId(null);
    toast.success("Grade updated successfully!");
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditGrade("");
  };

  const getAttendanceBadge = (attendance: number) => {
    if (attendance >= 90) return "bg-secondary text-white";
    if (attendance >= 75) return "bg-chart-3 text-white";
    return "bg-destructive text-white";
  };

  const classStats = [
    { label: "Total Students", value: "156" },
    { label: "Average Grade", value: "B+" },
    { label: "Avg. Attendance", value: "89%" },
    { label: "Assignments Pending", value: "12" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1>Teacher Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage your classes and student performance
        </p>
      </div>

      {/* Class Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {classStats.map((stat, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Roster */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Class Roster - CS101</CardTitle>
          </div>
          <CardDescription>View and manage student grades and attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {student.email}
                    </TableCell>
                    <TableCell>
                      {editingId === student.id ? (
                        <Input
                          value={editGrade}
                          onChange={(e) => setEditGrade(e.target.value)}
                          className="w-20 h-8"
                          placeholder="Grade"
                        />
                      ) : (
                        <Badge className="bg-primary text-primary-foreground">
                          {student.grade}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getAttendanceBadge(student.attendance)}>
                        {student.attendance}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === student.id ? (
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSaveClick(student.id)}
                            className="h-8 w-8 p-0 rounded-full text-secondary hover:text-secondary"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancelClick}
                            className="h-8 w-8 p-0 rounded-full text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditClick(student)}
                          className="h-8 w-8 p-0 rounded-full"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <h3>Mark Attendance</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Record attendance for today's class
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <h3>Upload Materials</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Share course documents with students
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <h3>Create Assignment</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Create and distribute new assignments
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
