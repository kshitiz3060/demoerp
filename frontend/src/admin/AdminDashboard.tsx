import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users, GraduationCap, IndianRupeeIcon, BookOpen, TrendingUp, UserCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { UserManagement } from "./UserManagement";
import { CourseManagement } from "./CourseManagement";
import { SalaryManagement } from "./SalaryManagement";
import { LeaveApprovals } from "./LeaveApprovals";
import { FeeManagement } from "./FeeManagement";
import { Reports } from "./Reports";

export function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, color: "text-primary", change: "+5.2%" },
    { label: "Active Students", value: "1,189", icon: GraduationCap, color: "text-secondary", change: "+3.1%" },
    { label: "Faculty", value: "45", icon: UserCheck, color: "text-chart-3", change: "+2" },
    { label: "Total Courses", value: "56", icon: BookOpen, color: "text-chart-5", change: "+4" },
    { label: "Monthly Revenue", value: "₹12.5L", icon: IndianRupeeIcon, color: "text-chart-2", change: "+8.4%" },
    { label: "Pending Approvals", value: "18", icon: TrendingUp, color: "text-chart-4", change: "-3" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage and monitor your institution</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-xs text-muted-foreground">{stat.change}</span>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="salaries">Salaries</TabsTrigger>
          <TabsTrigger value="leaves">Leaves</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="courses">
          <CourseManagement />
        </TabsContent>

        <TabsContent value="salaries">
          <SalaryManagement />
        </TabsContent>

        <TabsContent value="leaves">
          <LeaveApprovals />
        </TabsContent>

        <TabsContent value="fees">
          <FeeManagement />
        </TabsContent>

        <TabsContent value="reports">
          <Reports />
        </TabsContent>
      </Tabs>
    </div>
  );
}
