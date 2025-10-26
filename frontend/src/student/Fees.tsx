import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { IndianRupeeIcon, Download, CreditCard, Clock, CheckCircle } from "lucide-react";
import { Progress } from "../ui/progress";
import { toast } from "sonner";

export function Fees() {
  const feeStructure = [
    { item: "Tuition Fee", amount: 50000, paid: 50000, status: "paid" },
    { item: "Lab Fee", amount: 5000, paid: 5000, status: "paid" },
    { item: "Library Fee", amount: 2000, paid: 2000, status: "paid" },
    { item: "Sports Fee", amount: 1500, paid: 0, status: "pending" },
    { item: "Development Fee", amount: 3000, paid: 0, status: "pending" },
  ];

  const paymentHistory = [
    { date: "Oct 15, 2025", description: "Semester 7 Fees", amount: 57000, method: "Online", status: "Success" },
    { date: "Apr 10, 2025", description: "Semester 6 Fees", amount: 57000, method: "Online", status: "Success" },
    { date: "Oct 12, 2024", description: "Semester 5 Fees", amount: 55000, method: "Bank Transfer", status: "Success" },
  ];

  const totalAmount = feeStructure.reduce((sum, item) => sum + item.amount, 0);
  const paidAmount = feeStructure.reduce((sum, item) => sum + item.paid, 0);
  const pendingAmount = totalAmount - paidAmount;
  const paidPercentage = (paidAmount / totalAmount) * 100;

  const handlePayment = () => {
    toast.success("Redirecting to payment gateway...");
  };

  const handleDownloadReceipt = () => {
    toast.success("Downloading receipt...");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Fee Management</h1>
        <p className="text-muted-foreground text-sm mt-1">View and manage your fee payments</p>
      </div>

      {/* Fee Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Fee</p>
              <p className="text-2xl font-semibold">₹{totalAmount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Paid</p>
              <p className="text-2xl font-semibold text-secondary">₹{paidAmount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold text-chart-3">₹{pendingAmount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>₹{paidAmount.toLocaleString()} paid</span>
              <span className="text-muted-foreground">{paidPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={paidPercentage} className="h-2" />
          </div>
          {pendingAmount > 0 && (
            <div className="flex items-center justify-between p-4 rounded-lg bg-chart-3/10 border border-chart-3/20">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-chart-3" />
                <div>
                  <p className="text-sm font-medium">Pending Payment</p>
                  <p className="text-xs text-muted-foreground">Due by Nov 30, 2025</p>
                </div>
              </div>
              <Button onClick={handlePayment} className="gap-2">
                <CreditCard className="h-4 w-4" />
                Pay ₹{pendingAmount.toLocaleString()}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fee Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fee Structure - Semester 7</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {feeStructure.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.item}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    ₹{item.paid.toLocaleString()} / ₹{item.amount.toLocaleString()}
                  </p>
                </div>
                <Badge className={
                  item.status === "paid" 
                    ? "bg-secondary/10 text-secondary hover:bg-secondary/20" 
                    : "bg-chart-3/10 text-chart-3 hover:bg-chart-3/20"
                }>
                  {item.status === "paid" ? (
                    <><CheckCircle className="h-3 w-3 mr-1" /> Paid</>
                  ) : (
                    <><Clock className="h-3 w-3 mr-1" /> Pending</>
                  )}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <IndianRupeeIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{payment.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {payment.date} • {payment.method}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="text-sm font-semibold">₹{payment.amount.toLocaleString()}</p>
                    <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 text-xs mt-1">
                      {payment.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleDownloadReceipt}>
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
