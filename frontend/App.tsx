import { useState, useEffect } from "react";
import { Navbar } from "./src/Navbar";
import { Sidebar } from "./src/Sidebar";
import { LoginPage } from "./src/LoginPage";
import { Dashboard } from "./src/Dashboard";
import { Toaster } from "./src/ui/sonner";

// Student Components
import { Profile } from "./src/student/Profile";
import { Timetable } from "./src/student/Timetable";
import { Attendance } from "./src/student/Attendance";
import { ExamsGrading } from "./src/student/ExamsGrading";
import { Fees } from "./src/student/Fees";
import { Hostel } from "./src/student/Hostel";
import { Transport } from "./src/student/Transport";

// Teacher Components
import { Classes } from "./src/teacher/Classes";
import { Salary } from "./src/teacher/Salary";
import { Leave } from "./src/teacher/Leave";

// Admin Components
import { AdminDashboard } from "./src/admin/AdminDashboard";
import { toast } from "sonner";

interface User {
  id: number;
  username: string;
  role: "Student" | "Teacher" | "Admin";
  token: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

const API_BASE = "http://localhost:8000";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // 🌗 Theme setup
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) setTheme(savedTheme);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // 🔐 Restore user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    setLoadingUser(false);
  }, []);

  const handleLogin = async ({ username, password }: LoginPayload) => {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.detail || "Login failed");
        return;
      }

      const user: User = {
        id: data.user.id,
        username: data.user.username,
        role:
          data.user.role === "student"
            ? "Student"
            : data.user.role === "teacher"
            ? "Teacher"
            : "Admin",
        token: data.access_token,
      };

      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      setCurrentPage("dashboard");
      toast.success(`Welcome, ${user.username} (${user.role})`);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Network error");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    setCurrentPage("dashboard");
    setIsSidebarOpen(false);
  };

  const handleNavigate = (page: string) => setCurrentPage(page);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderPage = () => {
    if (!currentUser) return <LoginPage onLogin={handleLogin} />;

    switch (currentPage) {
      // Student
      case "profile": return <Profile user={currentUser} />;
      case "timetable": return <Timetable />;
      case "attendance": return <Attendance />;
      case "exams": return <ExamsGrading />;
      case "fees": return <Fees />;
      case "hostel": return <Hostel />;
      case "transport": return <Transport />;

      // Teacher
      case "classes": return <Classes />;
      case "salary": return <Salary />;
      case "leave": return <Leave />;

      // Admin
      case "users":
      case "courses":
      case "salaries":
      case "leaves":
      case "fees-admin":
      case "reports":
        return <AdminDashboard />;

      // Default
      default:
        return <Dashboard user={currentUser} />;
    }
  };

  if (loadingUser) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {!currentUser ? (
        <>
          <LoginPage onLogin={handleLogin} />
          <Toaster position="top-right" richColors />
        </>
      ) : (
        <>
          <Navbar
            theme={theme}
            setTheme={setTheme}
            onMenuClick={toggleSidebar}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
          <div className="flex-1 flex overflow-hidden">
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              currentPage={currentPage}
              onNavigate={handleNavigate}
              userRole={currentUser.role}
            />
            <main className="flex-1 overflow-y-auto bg-background">
              {renderPage()}
            </main>
          </div>
          <Toaster position="top-right" richColors />
        </>
      )}
    </div>
  );
}
