import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Download, FileText, Users, IndianRupeeIcon, Calendar } from "lucide-react";
import { toast } from "sonner";

export function Reports() {
  const reports = [
    { icon: Users, title: "Student Enrollment Report", description: "Complete student enrollment data", color: "text-primary" },
    { icon: IndianRupeeIcon, title: "Fee Collection Report", description: "Monthly and yearly fee collection stats", color: "text-secondary" },
    { icon: Calendar, title: "Attendance Report", description: "Department-wise attendance statistics", color: "text-chart-3" },
    { icon: FileText, title: "Academic Performance", description: "Student grades and CGPA analysis", color: "text-chart-5" },
    { icon: Users, title: "Faculty Report", description: "Faculty allocation and workload", color: "text-chart-4" },
    { icon: IndianRupeeIcon, title: "Salary Disbursement", description: "Monthly salary processing report", color: "text-chart-2" },
  ];

  const handleDownload = (title: string) => {
    toast.success(`Downloading ${title}...`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Reports & Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report, index) => {
            const Icon = report.icon;
            return (
              <div key={index} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-5 w-5 ${report.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{report.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                    <Button size="sm" variant="outline" className="mt-3 gap-2" onClick={() => handleDownload(report.title)}>
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
