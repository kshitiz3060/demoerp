import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Settings, UserPlus, DollarSign, FileUp, Lock, Unlock } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { Alert, AlertDescription } from "./ui/alert";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Student" | "Teacher" | "Admin";
  status: "Active" | "Blocked";
}

interface Salary {
  id: number;
  name: string;
  role: string;
  amount: number;
  month: string;
  status: "Paid" | "Pending";
}

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Alice Johnson", email: "alice.j@college.edu.in", role: "Student", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob.s@college.edu.in", role: "Teacher", status: "Active" },
    { id: 3, name: "Carol White", email: "carol.w@college.edu.in", role: "Student", status: "Blocked" },
    { id: 4, name: "David Brown", email: "david.b@college.edu.in", role: "Admin", status: "Active" },
  ]);

  const [salaries, setSalaries] = useState<Salary[]>([
    { id: 1, name: "Bob Smith", role: "Teacher", amount: 5000, month: "October 2025", status: "Paid" },
    { id: 2, name: "Emma Davis", role: "Teacher", amount: 5500, month: "October 2025", status: "Pending" },
    { id: 3, name: "Frank Wilson", role: "Staff", amount: 3500, month: "October 2025", status: "Paid" },
  ]);

  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showSalaryDialog, setShowSalaryDialog] = useState(false);
  const [showDocumentDialog, setShowDocumentDialog] = useState(false);

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<"Student" | "Teacher" | "Admin">("Student");

  const [newSalaryName, setNewSalaryName] = useState("");
  const [newSalaryRole, setNewSalaryRole] = useState("");
  const [newSalaryAmount, setNewSalaryAmount] = useState("");

  const toggleUserStatus = (id: number) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" as "Active" | "Blocked" } : u
    ));
    toast.success("User status updated!");
  };

  const addUser = () => {
    if (!newUserName || !newUserEmail) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const newUser: User = {
      id: users.length + 1,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "Active",
    };
    
    setUsers([...users, newUser]);
    setShowUserDialog(false);
    setNewUserName("");
    setNewUserEmail("");
    toast.success("User added successfully!");
  };

  const addSalary = () => {
    if (!newSalaryName || !newSalaryRole || !newSalaryAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    const newSalary: Salary = {
      id: salaries.length + 1,
      name: newSalaryName,
      role: newSalaryRole,
      amount: parseFloat(newSalaryAmount),
      month: "October 2025",
      status: "Pending",
    };

    setSalaries([...salaries, newSalary]);
    setShowSalaryDialog(false);
    setNewSalaryName("");
    setNewSalaryRole("");
    setNewSalaryAmount("");
    toast.success("Salary record added!");
  };

  const processSalary = (id: number) => {
    setSalaries(salaries.map(s => 
      s.id === id ? { ...s, status: "Paid" as "Paid" | "Pending" } : s
    ));
    toast.success("Salary processed successfully!");
  };

  const uploadDocument = () => {
    setShowDocumentDialog(false);
    toast.success("Document uploaded successfully!");
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1>Admin Control</h1>
        <p className="text-muted-foreground mt-1">
          Manage users, salaries, and system documents
        </p>
      </div>

      <Alert className="bg-primary/10 border-primary">
        <Settings className="h-4 w-4 text-primary" />
        <AlertDescription>
          You have administrative access to all system features. Use these controls carefully.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="salaries">Salaries</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage system users and their roles</CardDescription>
                </div>
                <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full bg-gradient-to-r from-primary to-primary/80">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>Create a new user account in the system</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-name">Full Name</Label>
                        <Input
                          id="user-name"
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-email">Email</Label>
                        <Input
                          id="user-email"
                          type="email"
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                          placeholder="name@college.edu.in"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-role">Role</Label>
                        <Select value={newUserRole} onValueChange={(value: "Student" | "Teacher" | "Admin") => setNewUserRole(value)}>
                          <SelectTrigger id="user-role">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Student">Student</SelectItem>
                            <SelectItem value="Teacher">Teacher</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowUserDialog(false)} className="rounded-full">
                        Cancel
                      </Button>
                      <Button onClick={addUser} className="rounded-full bg-gradient-to-r from-primary to-primary/80">
                        Add User
                      </Button>
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
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-primary text-primary-foreground">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={user.status === "Active" ? "bg-secondary text-white" : "bg-destructive text-white"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleUserStatus(user.id)}
                            className="rounded-full"
                          >
                            {user.status === "Active" ? (
                              <Lock className="h-4 w-4 text-destructive" />
                            ) : (
                              <Unlock className="h-4 w-4 text-secondary" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salaries Tab */}
        <TabsContent value="salaries" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Salary Management</CardTitle>
                  <CardDescription>Process and track salary payments</CardDescription>
                </div>
                <Dialog open={showSalaryDialog} onOpenChange={setShowSalaryDialog}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full bg-gradient-to-r from-secondary to-secondary/80">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Add Salary
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Salary Record</DialogTitle>
                      <DialogDescription>Create a new salary payment record</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="salary-name">Employee Name</Label>
                        <Input
                          id="salary-name"
                          value={newSalaryName}
                          onChange={(e) => setNewSalaryName(e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary-role">Role</Label>
                        <Input
                          id="salary-role"
                          value={newSalaryRole}
                          onChange={(e) => setNewSalaryRole(e.target.value)}
                          placeholder="Teacher/Staff"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary-amount">Amount ($)</Label>
                        <Input
                          id="salary-amount"
                          type="number"
                          value={newSalaryAmount}
                          onChange={(e) => setNewSalaryAmount(e.target.value)}
                          placeholder="5000"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowSalaryDialog(false)} className="rounded-full">
                        Cancel
                      </Button>
                      <Button onClick={addSalary} className="rounded-full bg-gradient-to-r from-secondary to-secondary/80">
                        Add Record
                      </Button>
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
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden md:table-cell">Month</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaries.map((salary) => (
                      <TableRow key={salary.id}>
                        <TableCell>{salary.name}</TableCell>
                        <TableCell className="text-muted-foreground">{salary.role}</TableCell>
                        <TableCell>${salary.amount.toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {salary.month}
                        </TableCell>
                        <TableCell>
                          <Badge className={salary.status === "Paid" ? "bg-secondary text-white" : "bg-chart-3 text-white"}>
                            {salary.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {salary.status === "Pending" && (
                            <Button
                              size="sm"
                              onClick={() => processSalary(salary.id)}
                              className="rounded-full bg-gradient-to-r from-secondary to-secondary/80"
                            >
                              Process
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

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Document Management</CardTitle>
                  <CardDescription>Upload and manage system documents</CardDescription>
                </div>
                <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full bg-gradient-to-r from-chart-3 to-chart-3/80">
                      <FileUp className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Document</DialogTitle>
                      <DialogDescription>Upload a document to the system</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="doc-title">Document Title</Label>
                        <Input
                          id="doc-title"
                          placeholder="Course Syllabus - Fall 2025"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doc-category">Category</Label>
                        <Select>
                          <SelectTrigger id="doc-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="syllabus">Syllabus</SelectItem>
                            <SelectItem value="policy">Policy</SelectItem>
                            <SelectItem value="form">Form</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doc-file">File</Label>
                        <Input
                          id="doc-file"
                          type="file"
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowDocumentDialog(false)} className="rounded-full">
                        Cancel
                      </Button>
                      <Button onClick={uploadDocument} className="rounded-full bg-gradient-to-r from-chart-3 to-chart-3/80">
                        Upload
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h4>Academic Policies</h4>
                    <p className="text-sm text-muted-foreground mt-2">12 documents</p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h4>Course Syllabi</h4>
                    <p className="text-sm text-muted-foreground mt-2">45 documents</p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h4>Administrative Forms</h4>
                    <p className="text-sm text-muted-foreground mt-2">23 documents</p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h4>Student Handbooks</h4>
                    <p className="text-sm text-muted-foreground mt-2">8 documents</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
