import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { DollarSign, Download, TrendingUp, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export function Salary() {
  const currentSalary = {
    basic: 50000,
    hra: 15000,
    ta: 5000,
    allowances: 8000,
    deductions: 3500,
    net: 74500,
    month: "October 2025",
    status: "Paid",
    paidDate: "Oct 28, 2025",
  };

  const salaryHistory = [
    { month: "September 2025", gross: 78000, deductions: 3500, net: 74500, status: "Paid", date: "Sep 28, 2025" },
    { month: "August 2025", gross: 78000, deductions: 3500, net: 74500, status: "Paid", date: "Aug 28, 2025" },
    { month: "July 2025", gross: 78000, deductions: 3200, net: 74800, status: "Paid", date: "Jul 28, 2025" },
    { month: "June 2025", gross: 78000, deductions: 3500, net: 74500, status: "Paid", date: "Jun 28, 2025" },
  ];

  const ytdSummary = {
    totalGross: 936000,
    totalDeductions: 40500,
    totalNet: 895500,
    avgMonthly: 74625,
  };

  const handleDownloadSlip = (month: string) => {
    toast.success(`Downloading salary slip for ${month}...`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Salary & Payouts</h1>
        <p className="text-muted-foreground text-sm mt-1">View your salary details and payment history</p>
      </div>

      {/* Current Month Salary */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Current Month - {currentSalary.month}</CardTitle>
            <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
              {currentSalary.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground">Earnings</h4>
              <div className="space-y-3">
                <SalaryItem label="Basic Salary" amount={currentSalary.basic} />
                <SalaryItem label="House Rent Allowance" amount={currentSalary.hra} />
                <SalaryItem label="Transport Allowance" amount={currentSalary.ta} />
                <SalaryItem label="Other Allowances" amount={currentSalary.allowances} />
              </div>
              <div className="pt-3 border-t border-border">
                <SalaryItem label="Gross Salary" amount={currentSalary.basic + currentSalary.hra + currentSalary.ta + currentSalary.allowances} className="font-semibold" />
              </div>
            </div>

            {/* Deductions & Net */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground">Deductions</h4>
              <div className="space-y-3">
                <SalaryItem label="Income Tax (TDS)" amount={2500} />
                <SalaryItem label="Professional Tax" amount={200} />
                <SalaryItem label="Provident Fund" amount={800} />
              </div>
              <div className="pt-3 border-t border-border">
                <SalaryItem label="Total Deductions" amount={currentSalary.deductions} className="font-semibold text-destructive" />
              </div>
              <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground">Net Salary</p>
                <p className="text-3xl font-semibold text-primary mt-1">₹{currentSalary.net.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">Paid on {currentSalary.paidDate}</p>
              </div>
              <Button onClick={() => handleDownloadSlip(currentSalary.month)} className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download Salary Slip
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* YTD Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Year-to-Date Summary (2025)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border border-border bg-card text-center">
              <p className="text-xs text-muted-foreground">Total Gross</p>
              <p className="text-xl font-semibold mt-1">₹{(ytdSummary.totalGross / 1000).toFixed(0)}K</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card text-center">
              <p className="text-xs text-muted-foreground">Total Deductions</p>
              <p className="text-xl font-semibold mt-1 text-destructive">₹{(ytdSummary.totalDeductions / 1000).toFixed(0)}K</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card text-center">
              <p className="text-xs text-muted-foreground">Total Net</p>
              <p className="text-xl font-semibold mt-1 text-secondary">₹{(ytdSummary.totalNet / 1000).toFixed(0)}K</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card text-center">
              <p className="text-xs text-muted-foreground">Avg. Monthly</p>
              <p className="text-xl font-semibold mt-1">₹{(ytdSummary.avgMonthly / 1000).toFixed(1)}K</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Salary History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {salaryHistory.map((salary, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{salary.month}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Paid on {salary.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-muted-foreground">Gross: ₹{salary.gross.toLocaleString()}</p>
                    <p className="text-sm text-destructive">- ₹{salary.deductions.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">₹{salary.net.toLocaleString()}</p>
                    <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 text-xs">
                      {salary.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDownloadSlip(salary.month)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SalaryItem({ label, amount, className = "" }: { label: string; amount: number; className?: string }) {
  return (
    <div className={`flex items-center justify-between text-sm ${className}`}>
      <span className="text-muted-foreground">{label}</span>
      <span>₹{amount.toLocaleString()}</span>
    </div>
  );
}
