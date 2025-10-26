import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Home, User, MapPin, Wifi, Zap, Coffee, Shield, Calendar } from "lucide-react";
import { toast } from "sonner";

export function Hostel() {
  const hostelDetails = {
    block: "Block A",
    room: "204",
    floor: "2nd Floor",
    roomType: "Double Sharing",
    status: "Allocated",
  };

  const roommates = [
    { name: "Alex Kumar", course: "CSE", year: "3rd Year" },
  ];

  const facilities = [
    { icon: Wifi, label: "High-Speed WiFi", available: true },
    { icon: Zap, label: "24/7 Power Backup", available: true },
    { icon: Coffee, label: "Common Room", available: true },
    { icon: Shield, label: "24/7 Security", available: true },
  ];

  const complaints = [
    { id: "HC001", subject: "AC not working", date: "Oct 10, 2025", status: "Resolved" },
    { id: "HC002", subject: "Water leakage", date: "Oct 5, 2025", status: "In Progress" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Hostel Management</h1>
        <p className="text-muted-foreground text-sm mt-1">View your hostel details and manage requests</p>
      </div>

      {/* Hostel Allocation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Room Allocation</CardTitle>
            <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
              {hostelDetails.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard icon={Home} label="Block" value={hostelDetails.block} />
            <InfoCard icon={MapPin} label="Room Number" value={hostelDetails.room} />
            <InfoCard icon={User} label="Room Type" value={hostelDetails.roomType} />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Roommate(s)</h4>
            {roommates.map((roommate, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{roommate.name}</p>
                  <p className="text-xs text-muted-foreground">{roommate.course} • {roommate.year}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hostel Facilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{facility.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {facility.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Hostel Fee */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hostel Fee</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium">Annual Hostel Fee</p>
                <p className="text-xs text-muted-foreground mt-1">Academic Year 2024-2025</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold">₹45,000</p>
                <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 text-xs mt-1">
                  Paid
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Room Rent</p>
                <p className="text-sm font-semibold mt-1">₹30,000</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Mess Advance</p>
                <p className="text-sm font-semibold mt-1">₹12,000</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Caution Deposit</p>
                <p className="text-sm font-semibold mt-1">₹3,000</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complaints & Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Complaints & Requests</CardTitle>
            <Button size="sm" onClick={() => toast.success("Opening complaint form...")}>
              New Complaint
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {complaints.map((complaint, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{complaint.id}</Badge>
                    <p className="text-sm font-medium">{complaint.subject}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {complaint.date}
                  </p>
                </div>
                <Badge className={
                  complaint.status === "Resolved"
                    ? "bg-secondary/10 text-secondary hover:bg-secondary/20"
                    : "bg-chart-3/10 text-chart-3 hover:bg-chart-3/20"
                }>
                  {complaint.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card text-center space-y-2">
      <Icon className="h-5 w-5 text-primary mx-auto" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold mt-1">{value}</p>
      </div>
    </div>
  );
}
