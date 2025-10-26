import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { IndianRupeeIcon, TrendingUp, Award, Plus, Search } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: number;
  name: string;
  roll: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  semester: string;
  scholarship?: number;
}

interface Scholarship {
  id: number;
  name: string;
  roll: string;
  type: string;
  amount: number;
  status: "Active" | "Pending" | "Expired";
}

export function FeeManagement() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Alice Johnson", roll: "CSE2021001", amount: 57000, status: "Paid", semester: "Fall 2025" },
    { id: 2, name: "Bob Smith", roll: "CSE2021002", amount: 57000, status: "Pending", semester: "Fall 2025", scholarship: 20000 },
    { id: 3, name: "Carol White", roll: "ECE2021045", amount: 55000, status: "Paid", semester: "Fall 2025" },
    { id: 4, name: "David Brown", roll: "IT2021089", amount: 56000, status: "Overdue", semester: "Fall 2025" },
  ]);

  const [scholarships, setScholarships] = useState<Scholarship[]>([
    { id: 1, name: "Bob Smith", roll: "CSE2021002", type: "Merit Scholarship", amount: 20000, status: "Active" },
    { id: 2, name: "Emma Wilson", roll: "ECE2021023", type: "Sports Scholarship", amount: 15000, status: "Active" },
    { id: 3, name: "Frank Davis", roll: "ME2021056", type: "Need-based", amount: 25000, status: "Pending" },
  ]);

  const [newScholarship, setNewScholarship] = useState({
    name: "",
    roll: "",
    type: "",
    amount: ""
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleAddScholarship = () => {
    if (!newScholarship.name || !newScholarship.roll || !newScholarship.type || !newScholarship.amount) {
      toast.error("Please fill all fields");
      return;
    }

    const scholarship: Scholarship = {
      id: scholarships.length + 1,
      name: newScholarship.name,
      roll: newScholarship.roll,
      type: newScholarship.type,
      amount: parseFloat(newScholarship.amount),
      status: "Pending"
    };

    setScholarships([...scholarships, scholarship]);
    setNewScholarship({ name: "", roll: "", type: "", amount: "" });
    toast.success("Scholarship application submitted!");
  };

  const handleApproveScholarship = (id: number) => {
    setScholarships(prev => prev.map(s =>
      s.id === id ? { ...s, status: "Active" as const } : s
    ));
    toast.success("Scholarship approved!");
  };

  const handleUpdateFeeStatus = (id: number, status: "Paid" | "Pending" | "Overdue") => {
    setStudents(prev => prev.map(s =>
      s.id === id ? { ...s, status } : s
    ));
    toast.success(`Fee status updated to ${status}`);
  };

  const feeStats = {
    totalCollected: students.filter(s => s.status === "Paid").reduce((acc, s) => acc + s.amount, 0),
    pending: students.filter(s => s.status === "Pending").reduce((acc, s) => acc + s.amount, 0),
    overdue: students.filter(s => s.status === "Overdue").reduce((acc, s) => acc + s.amount, 0),
    scholarships: scholarships.filter(s => s.status === "Active").reduce((acc, s) => acc + s.amount, 0)
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.roll.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">Total Collected</p>
                <p className="text-2xl font-semibold text-emerald-900 dark:text-emerald-100">
                  ₹{(feeStats.totalCollected / 100000).toFixed(1)}L
                </p>
              </div>
              <IndianRupeeIcon className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700 dark:text-amber-300">Pending</p>
                <p className="text-2xl font-semibold text-amber-900 dark:text-amber-100">
                  ₹{(feeStats.pending / 100000).toFixed(1)}L
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-amber-600 dark:text-amber-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 dark:text-red-300">Overdue</p>
                <p className="text-2xl font-semibold text-red-900 dark:text-red-100">
                  ₹{(feeStats.overdue / 100000).toFixed(1)}L
                </p>
              </div>
              <IndianRupeeIcon className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-indigo-200 dark:border-indigo-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">Scholarships</p>
                <p className="text-2xl font-semibold text-indigo-900 dark:text-indigo-100">
                  ₹{(feeStats.scholarships / 100000).toFixed(1)}L
                </p>
              </div>
              <Award className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fees" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="fees">Fee Records</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
        </TabsList>

        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Student Fee Records</CardTitle>
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Scholarship</TableHead>
                      <TableHead>Net Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.roll}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{student.semester}</TableCell>
                        <TableCell className="font-semibold">₹{student.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-sm">
                          {student.scholarship ? (
                            <span className="text-emerald-600">-₹{student.scholarship.toLocaleString()}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ₹{(student.amount - (student.scholarship || 0)).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              student.status === "Paid"
                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                : student.status === "Pending"
                                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                            }
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {student.status !== "Paid" && (
                            <Button size="sm" onClick={() => handleUpdateFeeStatus(student.id, "Paid")}>
                              Mark Paid
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
        </TabsContent>

        <TabsContent value="scholarships" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Scholarship Management</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Scholarship
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Scholarship</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="s-name">Student Name</Label>
                        <Input
                          id="s-name"
                          value={newScholarship.name}
                          onChange={(e) => setNewScholarship({ ...newScholarship, name: e.target.value })}
                          placeholder="Enter student name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="s-roll">Roll Number</Label>
                        <Input
                          id="s-roll"
                          value={newScholarship.roll}
                          onChange={(e) => setNewScholarship({ ...newScholarship, roll: e.target.value })}
                          placeholder="Enter roll number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="s-type">Scholarship Type</Label>
                        <Select value={newScholarship.type} onValueChange={(value: any) => setNewScholarship({ ...newScholarship, type: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Merit Scholarship">Merit Scholarship</SelectItem>
                            <SelectItem value="Sports Scholarship">Sports Scholarship</SelectItem>
                            <SelectItem value="Need-based">Need-based Scholarship</SelectItem>
                            <SelectItem value="Minority">Minority Scholarship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="s-amount">Amount (₹)</Label>
                        <Input
                          id="s-amount"
                          type="number"
                          value={newScholarship.amount}
                          onChange={(e) => setNewScholarship({ ...newScholarship, amount: e.target.value })}
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddScholarship}>Add Scholarship</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scholarships.map((scholarship) => (
                      <TableRow key={scholarship.id}>
                        <TableCell className="font-medium">{scholarship.roll}</TableCell>
                        <TableCell>{scholarship.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{scholarship.type}</TableCell>
                        <TableCell className="font-semibold">₹{scholarship.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              scholarship.status === "Active"
                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                : scholarship.status === "Pending"
                                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400"
                            }
                          >
                            {scholarship.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {scholarship.status === "Pending" && (
                            <Button size="sm" onClick={() => handleApproveScholarship(scholarship.id)}>
                              Approve
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
