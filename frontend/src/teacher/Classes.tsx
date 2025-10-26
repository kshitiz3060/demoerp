import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { BookOpen, Users, Calendar, Edit, Save, X, CheckCircle, XCircle } from "lucide-react";
import { Input } from "../ui/input";
import { toast } from "sonner";

export function Classes() {
  const [selectedClass, setSelectedClass] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editGrade, setEditGrade] = useState("");

  const myClasses = [
    { id: "cs101", name: "Data Structures - CS101", section: "Section A", students: 45, schedule: "Mon, Wed, Fri 9:00 AM" },
    { id: "cs201", name: "Database Systems - CS201", section: "Section B", students: 38, schedule: "Tue, Thu 11:00 AM" },
    { id: "cs301", name: "Web Development - CS301", section: "Section A", students: 40, schedule: "Mon, Wed 2:00 PM" },
  ];

  const [students, setStudents] = useState([
    { id: 1, roll: "CSE2021001", name: "Alice Johnson", email: "alice.j@college.edu.in", grade: "A", attendance: 95 },
    { id: 2, roll: "CSE2021002", name: "Bob Smith", email: "bob.s@college.edu.in", grade: "B+", attendance: 88 },
    { id: 3, roll: "CSE2021003", name: "Carol White", email: "carol.w@college.edu.in", grade: "A-", attendance: 92 },
    { id: 4, roll: "CSE2021004", name: "David Brown", email: "david.b@college.edu.in", grade: "B", attendance: 85 },
    { id: 5, roll: "CSE2021005", name: "Emma Davis", email: "emma.d@college.edu.in", grade: "A", attendance: 98 },
  ]);

  const handleEditClick = (student: typeof students[0]) => {
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

  const selectedClassData = myClasses.find(c => c.id === selectedClass);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>My Classes</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your courses and students</p>
      </div>

      {/* My Courses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {myClasses.map((course) => (
          <Card 
            key={course.id} 
            className={`cursor-pointer transition-all ${
              selectedClass === course.id ? "ring-2 ring-primary" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedClass(course.id)}
          >
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-start justify-between">
                <BookOpen className="h-5 w-5 text-primary" />
                <Badge variant="outline" className="text-xs">{course.section}</Badge>
              </div>
              <div>
                <h4 className="text-sm font-semibold">{course.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{course.schedule}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span>{course.students} students</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedClass ? (
        <>
          {/* Class Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{selectedClassData?.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Mark Attendance
                  </Button>
                  <Button size="sm">
                    Upload Materials
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-xs text-muted-foreground">Total Students</p>
                  <p className="text-xl font-semibold mt-1">{selectedClassData?.students}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-xs text-muted-foreground">Avg. Attendance</p>
                  <p className="text-xl font-semibold mt-1">91%</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-xs text-muted-foreground">Avg. Grade</p>
                  <p className="text-xl font-semibold mt-1">B+</p>
                </div>
              </div>

              {/* Student List */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No</TableHead>
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
                        <TableCell className="font-mono text-xs">{student.roll}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
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
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                              {student.grade}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {student.attendance >= 90 ? (
                              <CheckCircle className="h-4 w-4 text-secondary" />
                            ) : (
                              <XCircle className="h-4 w-4 text-chart-3" />
                            )}
                            <span className="text-sm">{student.attendance}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {editingId === student.id ? (
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleSaveClick(student.id)}
                                className="h-8 w-8 p-0 text-secondary hover:text-secondary"
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCancelClick}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditClick(student)}
                              className="h-8 w-8 p-0"
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
        </>
      ) : (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Select a class to view students</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
