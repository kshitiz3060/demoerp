import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Plus, Clock, CheckCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";

export function Leave() {
  const [showDialog, setShowDialog] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const leaveBalance = {
    casual: { total: 12, used: 3, available: 9 },
    sick: { total: 10, used: 2, available: 8 },
    earned: { total: 15, used: 5, available: 10 },
  };

  const leaveHistory = [
    { id: 1, type: "Sick Leave", from: "Oct 5, 2025", to: "Oct 6, 2025", days: 2, status: "Approved", reason: "Medical checkup" },
    { id: 2, type: "Casual Leave", from: "Sep 15, 2025", to: "Sep 15, 2025", days: 1, status: "Approved", reason: "Personal work" },
    { id: 3, type: "Earned Leave", from: "Aug 20, 2025", to: "Aug 23, 2025", days: 4, status: "Approved", reason: "Vacation" },
    { id: 4, type: "Casual Leave", from: "Jul 10, 2025", to: "Jul 11, 2025", days: 2, status: "Rejected", reason: "Family function" },
  ];

  const handleApplyLeave = () => {
    if (!leaveType || !fromDate || !toDate || !reason) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Leave application submitted successfully!");
    setShowDialog(false);
    setLeaveType("");
    setFromDate("");
    setToDate("");
    setReason("");
  };

  const getStatusBadge = (status: string) => {
    if (status === "Approved") {
      return <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>;
    }
    if (status === "Pending") {
      return <Badge className="bg-chart-3/10 text-chart-3 hover:bg-chart-3/20"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
    }
    return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Leave Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your leave applications and balance</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Apply Leave
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for Leave</DialogTitle>
              <DialogDescription>Submit a new leave application</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="leave-type">Leave Type</Label>
                <Select value={leaveType} onValueChange={setLeaveType}>
                  <SelectTrigger id="leave-type">
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual Leave ({leaveBalance.casual.available} available)</SelectItem>
                    <SelectItem value="sick">Sick Leave ({leaveBalance.sick.available} available)</SelectItem>
                    <SelectItem value="earned">Earned Leave ({leaveBalance.earned.available} available)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from-date">From Date</Label>
                  <input
                    id="from-date"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to-date">To Date</Label>
                  <input
                    id="to-date"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Enter reason for leave..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleApplyLeave}>
                Submit Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Casual Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-primary">{leaveBalance.casual.available}</span>
                <span className="text-sm text-muted-foreground">/ {leaveBalance.casual.total}</span>
              </div>
              <p className="text-xs text-muted-foreground">{leaveBalance.casual.used} used</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Sick Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-primary">{leaveBalance.sick.available}</span>
                <span className="text-sm text-muted-foreground">/ {leaveBalance.sick.total}</span>
              </div>
              <p className="text-xs text-muted-foreground">{leaveBalance.sick.used} used</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Earned Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-primary">{leaveBalance.earned.available}</span>
                <span className="text-sm text-muted-foreground">/ {leaveBalance.earned.total}</span>
              </div>
              <p className="text-xs text-muted-foreground">{leaveBalance.earned.used} used</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Leave History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaveHistory.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-4 flex-1">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium">{leave.type}</p>
                      <Badge variant="outline" className="text-xs">{leave.days} day{leave.days > 1 ? 's' : ''}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{leave.from} → {leave.to}</p>
                    <p className="text-xs text-muted-foreground mt-1">{leave.reason}</p>
                  </div>
                </div>
                <div>
                  {getStatusBadge(leave.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
