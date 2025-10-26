import { Home, User, Users, Settings, X, FileText, BookOpen, IndianRupeeIcon, Calendar, Award, Clock, Briefcase, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: "Student" | "Teacher" | "Admin" | null;
}

export function Sidebar({ isOpen, onClose, currentPage, onNavigate, userRole }: SidebarProps) {
  const getMenuItems = () => {
    const common = [
      { id: "dashboard", label: "Dashboard", icon: Home },
    ];

    if (userRole === "Student") {
      return [
        ...common,
        { id: "profile", label: "My Profile", icon: User },
        { id: "timetable", label: "Timetable", icon: Clock },
        { id: "attendance", label: "Attendance", icon: Calendar },
        { id: "exams", label: "Exams & Grading", icon: Award },
        { id: "fees", label: "Fees", icon: IndianRupeeIcon },
        { id: "hostel", label: "Hostel", icon: Home }, 
        { id: "transport", label: "Transport", icon: Briefcase }, 
      ];
    }

    if (userRole === "Teacher") {
      return [
        ...common,
        { id: "classes", label: "My Classes", icon: BookOpen },
        { id: "salary", label: "Salary & Payouts", icon: IndianRupeeIcon },
        { id: "leave", label: "Leave Management", icon: Calendar },
      ];
    }

    if (userRole === "Admin") {
      return [
        ...common,
        { id: "users", label: "Users", icon: Users },
        { id: "courses", label: "Courses", icon: BookOpen },
        { id: "salaries", label: "Salaries", icon: IndianRupeeIcon },
        { id: "leaves", label: "Leave Approvals", icon: Calendar },
        { id: "fees-admin", label: "Fee Management", icon: FileText },
        { id: "reports", label: "Reports", icon: Settings },
      ];
    }

    return common;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border z-50 transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-16 border-b border-border flex items-center justify-between px-4 md:hidden">
          <span className="font-semibold">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start rounded-lg",
                  isActive && "bg-accent text-accent-foreground"
                )}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            © 2025 EduERP System
          </div>
        </div>
      </aside>
    </>
  );
}
