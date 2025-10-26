import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Bus, MapPin, Clock, Calendar, DollarSign, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { useState } from "react";

export function Transport() {
  const [selectedRoute, setSelectedRoute] = useState("");

  const assignedTransport = {
    route: "Route 5 - Hitech City",
    busNumber: "TN 09 BZ 5432",
    pickupPoint: "KPHB Main Road",
    pickupTime: "7:45 AM",
    dropTime: "6:30 PM",
    status: "Active",
    fee: 12000,
    feePaid: true,
  };

  const availableRoutes = [
    { id: "1", name: "Route 1 - Ameerpet", stops: 8, fee: 10000, seats: "5 available" },
    { id: "2", name: "Route 2 - Kukatpally", stops: 6, fee: 11000, seats: "3 available" },
    { id: "3", name: "Route 3 - Miyapur", stops: 7, fee: 11500, seats: "Full" },
    { id: "4", name: "Route 4 - SR Nagar", stops: 5, fee: 9500, seats: "8 available" },
    { id: "5", name: "Route 5 - Hitech City", stops: 9, fee: 12000, seats: "2 available" },
  ];

  const schedules = [
    { day: "Monday - Friday", pickup: "7:45 AM", drop: "6:30 PM" },
    { day: "Saturday", pickup: "8:30 AM", drop: "2:00 PM" },
  ];

  const handlePayment = () => {
    toast.success("Redirecting to payment gateway...");
  };

  const handleRequest = () => {
    if (!selectedRoute) {
      toast.error("Please select a route");
      return;
    }
    toast.success("Transport request submitted successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Transport</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your college transport details</p>
      </div>

      {assignedTransport.status === "Active" ? (
        <>
          {/* Current Transport */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">My Transport</CardTitle>
                <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                  {assignedTransport.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
                  <Bus className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Route</p>
                    <p className="text-sm font-semibold mt-1">{assignedTransport.route}</p>
                    <p className="text-xs text-muted-foreground mt-1">Bus: {assignedTransport.busNumber}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup Point</p>
                    <p className="text-sm font-semibold mt-1">{assignedTransport.pickupPoint}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup Time</p>
                    <p className="text-sm font-semibold mt-1">{assignedTransport.pickupTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Drop Time</p>
                    <p className="text-sm font-semibold mt-1">{assignedTransport.dropTime}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedules.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <p className="text-sm font-medium">{schedule.day}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {schedule.pickup} → {schedule.drop}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transport Fee</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  {assignedTransport.feePaid ? (
                    <CheckCircle className="h-6 w-6 text-secondary" />
                  ) : (
                    <DollarSign className="h-6 w-6 text-chart-3" />
                  )}
                  <div>
                    <p className="text-sm font-medium">Annual Transport Fee</p>
                    <p className="text-xs text-muted-foreground mt-1">Academic Year 2024-2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold">₹{assignedTransport.fee.toLocaleString()}</p>
                  {assignedTransport.feePaid ? (
                    <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 text-xs mt-1">
                      Paid
                    </Badge>
                  ) : (
                    <Button size="sm" onClick={handlePayment} className="mt-2">
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Request Transport */
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Request Transport</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Route</label>
                <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a route" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoutes.map((route) => (
                      <SelectItem key={route.id} value={route.id} disabled={route.seats === "Full"}>
                        <div className="flex items-center justify-between w-full">
                          <span>{route.name}</span>
                          <span className="text-xs text-muted-foreground ml-4">
                            ₹{route.fee.toLocaleString()} • {route.seats}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {availableRoutes.map((route) => (
                  <div 
                    key={route.id} 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedRoute === route.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:bg-muted/30"
                    }`}
                    onClick={() => route.seats !== "Full" && setSelectedRoute(route.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{route.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{route.stops} stops</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">₹{route.fee.toLocaleString()}/year</p>
                        <Badge 
                          className={`text-xs mt-1 ${
                            route.seats === "Full" 
                              ? "bg-destructive/10 text-destructive hover:bg-destructive/20" 
                              : "bg-secondary/10 text-secondary hover:bg-secondary/20"
                          }`}
                        >
                          {route.seats}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleRequest} className="w-full">
                Submit Request
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
