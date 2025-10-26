import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Edit, Trash2, BookOpen, Users, Award } from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: number;
  code: string;
  name: string;
  department: string;
  credits: number;
  students: number;
  faculty: string;
}

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, code: "CS101", name: "Data Structures", department: "CSE", credits: 4, students: 45, faculty: "Dr. Smith" },
    { id: 2, code: "CS201", name: "Database Systems", department: "CSE", credits: 4, students: 38, faculty: "Dr. Johnson" },
    { id: 3, code: "EC101", name: "Digital Electronics", department: "ECE", credits: 3, students: 52, faculty: "Dr. White" },
    { id: 4, code: "IT301", name: "Cloud Computing", department: "IT", credits: 3, students: 40, faculty: "Dr. Brown" },
  ]);

  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    department: "",
    credits: "",
    faculty: ""
  });

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name || !newCourse.department || !newCourse.credits || !newCourse.faculty) {
      toast.error("Please fill all fields");
      return;
    }

    const course: Course = {
      id: courses.length + 1,
      code: newCourse.code,
      name: newCourse.name,
      department: newCourse.department,
      credits: parseInt(newCourse.credits),
      students: 0,
      faculty: newCourse.faculty
    };

    setCourses([...courses, course]);
    setNewCourse({ code: "", name: "", department: "", credits: "", faculty: "" });
    toast.success("Course added successfully!");
  };

  const handleEditCourse = () => {
    if (!editingCourse) return;
    
    setCourses(prev => prev.map(c => c.id === editingCourse.id ? editingCourse : c));
    setEditingCourse(null);
    toast.success("Course updated successfully!");
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    toast.success("Course deleted successfully!");
  };

  const totalCourses = courses.length;
  const totalStudents = courses.reduce((acc, c) => acc + c.students, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-indigo-200 dark:border-indigo-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">Total Courses</p>
                <p className="text-2xl font-semibold text-indigo-900 dark:text-indigo-100">
                  {totalCourses}
                </p>
              </div>
              <BookOpen className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">Total Students</p>
                <p className="text-2xl font-semibold text-emerald-900 dark:text-emerald-100">
                  {totalStudents}
                </p>
              </div>
              <Users className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl font-semibold">
                  {new Set(courses.map(c => c.department)).size}
                </p>
              </div>
              <Award className="h-10 w-10 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Courses</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Course
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Course Code</Label>
                    <Input
                      id="code"
                      value={newCourse.code}
                      onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                      placeholder="e.g., CS101"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Course Name</Label>
                    <Input
                      id="name"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      placeholder="Enter course name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={newCourse.department} onValueChange={(value) => setNewCourse({ ...newCourse, department: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CSE">Computer Science</SelectItem>
                        <SelectItem value="IT">Information Technology</SelectItem>
                        <SelectItem value="ECE">Electronics</SelectItem>
                        <SelectItem value="ME">Mechanical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Input
                      id="credits"
                      type="number"
                      value={newCourse.credits}
                      onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
                      placeholder="Enter credits"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faculty">Faculty</Label>
                    <Input
                      id="faculty"
                      value={newCourse.faculty}
                      onChange={(e) => setNewCourse({ ...newCourse, faculty: e.target.value })}
                      placeholder="Enter faculty name"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddCourse}>Add Course</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{course.code}</Badge>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">{course.department}</Badge>
                    </div>
                    <h4 className="font-semibold mt-2">{course.name}</h4>
                  </div>
                  <div className="flex gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => setEditingCourse(course)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Course</DialogTitle>
                        </DialogHeader>
                        {editingCourse && (
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Course Code</Label>
                              <Input
                                value={editingCourse.code}
                                onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Course Name</Label>
                              <Input
                                value={editingCourse.name}
                                onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Credits</Label>
                              <Input
                                type="number"
                                value={editingCourse.credits}
                                onChange={(e) => setEditingCourse({ ...editingCourse, credits: parseInt(e.target.value) })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Faculty</Label>
                              <Input
                                value={editingCourse.faculty}
                                onChange={(e) => setEditingCourse({ ...editingCourse, faculty: e.target.value })}
                              />
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button onClick={handleEditCourse}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground">{course.credits}</p>
                    <p>Credits</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{course.students}</p>
                    <p>Students</p>
                  </div>
                  <div className="col-span-1">
                    <p className="font-medium text-foreground truncate">{course.faculty}</p>
                    <p>Faculty</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
