import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BookOpen, Users, Calendar, TrendingUp, Award, Clock } from "lucide-react";

interface DashboardProps {
  user: {
    name: string;
    role: "Student" | "Teacher" | "Admin";
  };
}

export function Dashboard({ user }: DashboardProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getStatsForRole = () => {
    if (user.role === "Student") {
      return [
        { label: "Courses Enrolled", value: "6", icon: BookOpen, color: "text-primary" },
        { label: "Attendance", value: "92%", icon: Calendar, color: "text-secondary" },
        { label: "Average Grade", value: "A-", icon: Award, color: "text-chart-3" },
        { label: "Pending Tasks", value: "4", icon: Clock, color: "text-chart-4" },
      ];
    }

    if (user.role === "Teacher") {
      return [
        { label: "Total Students", value: "156", icon: Users, color: "text-primary" },
        { label: "Classes Today", value: "3", icon: Calendar, color: "text-secondary" },
        { label: "Assignments Pending", value: "12", icon: Clock, color: "text-chart-3" },
        { label: "Average Performance", value: "B+", icon: TrendingUp, color: "text-chart-2" },
      ];
    }

    return [
      { label: "Total Users", value: "1,234", icon: Users, color: "text-primary" },
      { label: "Active Teachers", value: "45", icon: BookOpen, color: "text-secondary" },
      { label: "Total Students", value: "1,189", icon: Users, color: "text-chart-3" },
      { label: "System Health", value: "98%", icon: TrendingUp, color: "text-chart-2" },
    ];
  };

  const stats = getStatsForRole();

  const getRoleBadgeColor = () => {
    if (user.role === "Admin") return "bg-chart-4 text-white";
    if (user.role === "Teacher") return "bg-primary text-primary-foreground";
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Greeting Header */}
      <div className="space-y-2">
        <h1 className="text-3xl">
          {getGreeting()}, {user.name}! 👋
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground">
            Welcome to your dashboard
          </p>
          <Badge className={getRoleBadgeColor()}>
            {user.role}
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const gradients = [
            "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-indigo-200 dark:border-indigo-800",
            "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800",
            "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800",
            "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800",
          ];
          return (
            <Card key={index} className={`${gradients[index % 4]} shadow-sm hover:shadow-md transition-all duration-200`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm opacity-70">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color} opacity-70`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-sm border-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.role === "Student" && (
              <>
                <QuickActionCard title="View Attendance" description="Check your attendance records" />
                <QuickActionCard title="Download Documents" description="Access course materials" />
                <QuickActionCard title="View Grades" description="See your academic performance" />
              </>
            )}
            {user.role === "Teacher" && (
              <>
                <QuickActionCard title="Mark Attendance" description="Record student attendance" />
                <QuickActionCard title="Grade Assignments" description="Review and grade submissions" />
                <QuickActionCard title="Manage Classes" description="View class schedules" />
              </>
            )}
            {user.role === "Admin" && (
              <>
                <QuickActionCard title="Manage Users" description="Add or modify user accounts" />
                <QuickActionCard title="Process Salaries" description="Handle salary payments" />
                <QuickActionCard title="System Reports" description="View analytics and reports" />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-sm border-border/50">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {user.role === "Student" && (
              <>
                <ActivityItem time="2 hours ago" text="Submitted assignment: Database Design" />
                <ActivityItem time="1 day ago" text="Attended lecture: Web Development" />
                <ActivityItem time="2 days ago" text="Downloaded: Course Material - Chapter 5" />
              </>
            )}
            {user.role === "Teacher" && (
              <>
                <ActivityItem time="1 hour ago" text="Graded 15 assignments for CS101" />
                <ActivityItem time="3 hours ago" text="Updated course syllabus" />
                <ActivityItem time="1 day ago" text="Marked attendance for morning class" />
              </>
            )}
            {user.role === "Admin" && (
              <>
                <ActivityItem time="30 mins ago" text="Added new user: jane.doe@college.edu.in" />
                <ActivityItem time="2 hours ago" text="Processed monthly salaries" />
                <ActivityItem time="1 day ago" text="Updated system permissions" />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function QuickActionCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-border/50 hover:bg-accent/50 hover:border-primary/30 transition-all duration-200 cursor-pointer group">
      <h4 className="group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

function ActivityItem({ time, text }: { time: string; text: string }) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
      <div className="h-2 w-2 rounded-full bg-primary mt-2" />
      <div className="flex-1">
        <p className="text-sm">{text}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
}
