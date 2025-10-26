import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export function LeaveApprovals() {
  const leaveApplications = [
    { id: 1, name: "Dr. Bob Smith", type: "Casual Leave", from: "Nov 5, 2025", to: "Nov 6, 2025", days: 2, reason: "Personal work", status: "Pending" },
    { id: 2, name: "Dr. Emma Davis", type: "Sick Leave", from: "Nov 3, 2025", to: "Nov 4, 2025", days: 2, reason: "Medical checkup", status: "Pending" },
    { id: 3, name: "John Wilson", type: "Earned Leave", from: "Oct 28, 2025", to: "Oct 30, 2025", days: 3, reason: "Family function", status: "Approved" },
  ];

  const handleApprove = (id: number) => {
    toast.success("Leave application approved!");
  };

  const handleReject = (id: number) => {
    toast.error("Leave application rejected!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leave Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaveApplications.map((leave) => (
            <div key={leave.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-start gap-4 flex-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{leave.name}</p>
                    <Badge variant="outline" className="text-xs">{leave.type}</Badge>
                    <Badge variant="outline" className="text-xs">{leave.days} day{leave.days > 1 ? 's' : ''}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{leave.from} → {leave.to}</p>
                  <p className="text-sm text-muted-foreground mt-1">Reason: {leave.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {leave.status === "Pending" ? (
                  <>
                    <Button size="sm" variant="outline" className="text-secondary hover:bg-secondary/10 gap-1" onClick={() => handleApprove(leave.id)}>
                      <CheckCircle className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10 gap-1" onClick={() => handleReject(leave.id)}>
                      <XCircle className="h-3.5 w-3.5" />
                      Reject
                    </Button>
                  </>
                ) : (
                  <Badge className={leave.status === "Approved" ? "bg-secondary/10 text-secondary hover:bg-secondary/20" : "bg-destructive/10 text-destructive hover:bg-destructive/20"}>
                    {leave.status}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
