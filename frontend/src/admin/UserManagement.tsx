import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { UserPlus, Lock, Unlock, Edit, Search } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Student" | "Teacher" | "Admin";
  status: "Active" | "Blocked";
  department?: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Alice Johnson", email: "alice.j@college.edu.in", role: "Student", status: "Active", department: "CSE" },
    { id: 2, name: "Bob Smith", email: "bob.s@college.edu.in", role: "Teacher", status: "Active", department: "CSE" },
    { id: 3, name: "Carol White", email: "carol.w@college.edu.in", role: "Student", status: "Blocked", department: "ECE" },
    { id: 4, name: "David Brown", email: "david.b@college.edu.in", role: "Admin", status: "Active", department: "Admin" },
    { id: 5, name: "Emma Davis", email: "emma.d@college.edu.in", role: "Teacher", status: "Active", department: "IT" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<"Student" | "Teacher" | "Admin">("Student");
  const [newUserDepartment, setNewUserDepartment] = useState("");

  const toggleUserStatus = (id: number) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" as "Active" | "Blocked" } : u
    ));
    toast.success("User status updated!");
  };

  const addUser = () => {
    if (!newUserName || !newUserEmail || !newUserDepartment) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const newUser: User = {
      id: users.length + 1,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "Active",
      department: newUserDepartment,
    };
    
    setUsers([...users, newUser]);
    setShowDialog(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserDepartment("");
    toast.success("User added successfully!");
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">User Management</CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Create a new user account</DialogDescription>
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
                  <div className="space-y-2">
                    <Label htmlFor="user-department">Department</Label>
                    <Select value={newUserDepartment} onValueChange={setNewUserDepartment}>
                      <SelectTrigger id="user-department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CSE">Computer Science</SelectItem>
                        <SelectItem value="ECE">Electronics</SelectItem>
                        <SelectItem value="IT">Information Technology</SelectItem>
                        <SelectItem value="MECH">Mechanical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addUser}>
                    Add User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
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
                <TableHead className="hidden lg:table-cell">Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {user.department}
                  </TableCell>
                  <TableCell>
                    <Badge className={user.status === "Active" ? "bg-secondary/10 text-secondary hover:bg-secondary/20" : "bg-destructive/10 text-destructive hover:bg-destructive/20"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleUserStatus(user.id)}
                        className="h-8 w-8 p-0"
                      >
                        {user.status === "Active" ? (
                          <Lock className="h-4 w-4 text-destructive" />
                        ) : (
                          <Unlock className="h-4 w-4 text-secondary" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
