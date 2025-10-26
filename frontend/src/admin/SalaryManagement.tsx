import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { IndianRupeeIcon, Plus, Download, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Salary {
  id: number;
  name: string;
  role: string;
  department: string;
  amount: number;
  month: string;
  status: "Paid" | "Pending";
}

export function SalaryManagement() {
  const [salaries, setSalaries] = useState<Salary[]>([
    { id: 1, name: "Dr. Bob Smith", role: "Professor", department: "CSE", amount: 75000, month: "October 2025", status: "Paid" },
    { id: 2, name: "Dr. Emma Davis", role: "Assistant Prof", department: "IT", amount: 65000, month: "October 2025", status: "Pending" },
    { id: 3, name: "John Wilson", role: "Lab Assistant", department: "CSE", amount: 35000, month: "October 2025", status: "Paid" },
    { id: 4, name: "Dr. Sarah Johnson", role: "Associate Prof", department: "ECE", amount: 70000, month: "October 2025", status: "Pending" },
  ]);

  const [newSalary, setNewSalary] = useState({
    name: "",
    role: "",
    department: "",
    amount: "",
    month: "October 2025"
  });

  const processSalary = (id: number) => {
    setSalaries(prev => prev.map(sal => 
      sal.id === id ? { ...sal, status: "Paid" as const } : sal
    ));
    toast.success("Salary processed successfully!");
  };

  const handleAddSalary = () => {
    if (!newSalary.name || !newSalary.role || !newSalary.department || !newSalary.amount) {
      toast.error("Please fill all fields");
      return;
    }

    const salary: Salary = {
      id: salaries.length + 1,
      name: newSalary.name,
      role: newSalary.role,
      department: newSalary.department,
      amount: parseFloat(newSalary.amount),
      month: newSalary.month,
      status: "Pending"
    };

    setSalaries([...salaries, salary]);
    setNewSalary({ name: "", role: "", department: "", amount: "", month: "October 2025" });
    toast.success("Salary entry added successfully!");
  };

  const totalPending = salaries.filter(s => s.status === "Pending").reduce((acc, s) => acc + s.amount, 0);
  const totalPaid = salaries.filter(s => s.status === "Paid").reduce((acc, s) => acc + s.amount, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">Total Paid</p>
                <p className="text-2xl font-semibold text-emerald-900 dark:text-emerald-100">
                  ₹{totalPaid.toLocaleString()}
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
                  ₹{totalPending.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-amber-600 dark:text-amber-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-semibold">{salaries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Salary Records</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Entry
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Salary Entry</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Employee Name</Label>
                      <Input
                        id="name"
                        value={newSalary.name}
                        onChange={(e) => setNewSalary({ ...newSalary, name: e.target.value })}
                        placeholder="Enter employee name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select value={newSalary.role} onValueChange={(value) => setNewSalary({ ...newSalary, role: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Professor">Professor</SelectItem>
                          <SelectItem value="Assistant Prof">Assistant Professor</SelectItem>
                          <SelectItem value="Associate Prof">Associate Professor</SelectItem>
                          <SelectItem value="Lab Assistant">Lab Assistant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={newSalary.department} onValueChange={(value) => setNewSalary({ ...newSalary, department: value })}>
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
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={newSalary.amount}
                        onChange={(e) => setNewSalary({ ...newSalary, amount: e.target.value })}
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddSalary}>Add Entry</Button>
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
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden lg:table-cell">Department</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salaries.map((salary) => (
                  <TableRow key={salary.id}>
                    <TableCell className="font-medium">{salary.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{salary.role}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{salary.department}</TableCell>
                    <TableCell className="font-semibold">₹{salary.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{salary.month}</TableCell>
                    <TableCell>
                      <Badge className={salary.status === "Paid" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"}>
                        {salary.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {salary.status === "Pending" && (
                        <Button size="sm" onClick={() => processSalary(salary.id)}>
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
    </div>
  );
}
