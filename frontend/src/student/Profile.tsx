import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Mail, Phone, MapPin, Calendar, GraduationCap, Hash } from "lucide-react";

interface ProfileProps {
  user: {
    name: string;
    email: string;
  };
}

export function Profile({ user }: ProfileProps) {
  const getAvatarUrl = (email: string) => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=6366F1`;
  };

  const studentData = {
    rollNo: "CSE2021045",
    department: "Computer Science",
    semester: "5th Semester",
    batch: "2022-2026",
    phone: "+91 98765 43210",
    address: "Room 204, Hostel Block A",
    dateOfBirth: "15 Aug 2003",
    bloodGroup: "A+",
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1>My Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">View and manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarImage src={getAvatarUrl(user.email)} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3>{user.name}</h3>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{studentData.rollNo}</Badge>
              <p className="text-sm text-muted-foreground">{studentData.department}</p>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={Hash} label="Roll Number" value={studentData.rollNo} />
              <InfoItem icon={GraduationCap} label="Department" value={studentData.department} />
              <InfoItem icon={Calendar} label="Semester" value={studentData.semester} />
              <InfoItem icon={Calendar} label="Batch" value={studentData.batch} />
              <InfoItem icon={Mail} label="Email" value={user.email} />
              <InfoItem icon={Phone} label="Phone" value={studentData.phone} />
              <InfoItem icon={MapPin} label="Address" value={studentData.address} />
              <InfoItem icon={Calendar} label="Date of Birth" value={studentData.dateOfBirth} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Academic Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="CGPA" value="8.7" />
            <StatCard label="Attendance" value="92%" />
            <StatCard label="Credits Earned" value="156" />
            <StatCard label="Rank" value="12/156" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5" />
      <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card text-center">
      <p className="text-2xl font-semibold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
