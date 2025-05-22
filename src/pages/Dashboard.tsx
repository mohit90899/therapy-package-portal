
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { currentUser } from "@/utils/dummyData";
import { usePackages } from "@/hooks/usePackages";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const { packages, loading, getTherapistPackages, getPendingPackages } = usePackages();
  const [dashboardData, setDashboardData] = useState({
    totalPackages: 0,
    pendingPackages: 0,
    approvedPackages: 0,
    rejectedPackages: 0,
  });

  useEffect(() => {
    if (!loading) {
      if (currentUser.role === "therapist") {
        const therapistPackages = getTherapistPackages(currentUser.id);
        setDashboardData({
          totalPackages: therapistPackages.length,
          pendingPackages: therapistPackages.filter(p => p.status === "pending").length,
          approvedPackages: therapistPackages.filter(p => p.status === "approved").length,
          rejectedPackages: therapistPackages.filter(p => p.status === "rejected").length,
        });
      } else if (currentUser.role === "admin") {
        const pendingPackages = getPendingPackages();
        setDashboardData({
          totalPackages: packages.length,
          pendingPackages: pendingPackages.length,
          approvedPackages: packages.filter(p => p.status === "approved").length,
          rejectedPackages: packages.filter(p => p.status === "rejected").length,
        });
      }
    }
  }, [loading, packages, currentUser.id, currentUser.role, getTherapistPackages, getPendingPackages]);

  return (
    <DashboardLayout>
      <div className="fade-in">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Packages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData.totalPackages}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Approval
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData.pendingPackages}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData.approvedPackages}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData.rejectedPackages}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          
          <div className="flex flex-wrap gap-4">
            {currentUser.role === "therapist" && (
              <>
                <Link to="/therapist/packages/new">
                  <Button>
                    Create New Package
                  </Button>
                </Link>
                <Link to="/therapist/packages">
                  <Button variant="outline">
                    View My Packages
                  </Button>
                </Link>
              </>
            )}
            
            {currentUser.role === "admin" && (
              <>
                <Link to="/admin/approval">
                  <Button>
                    Review Pending Packages
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => {
                  toast({
                    title: "Reports Generated",
                    description: "Monthly reports have been generated and sent to your email.",
                  });
                }}>
                  Generate Reports
                </Button>
              </>
            )}
            
            {currentUser.role === "client" && (
              <>
                <Link to="/client/packages">
                  <Button>
                    Browse Packages
                  </Button>
                </Link>
                <Link to="/client/bookings">
                  <Button variant="outline">
                    View My Bookings
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="text-sm font-medium">Package status updated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm font-medium">New client booking</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm font-medium">Profile updated</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="text-sm font-medium">Stress Relief Session</p>
                  <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm font-medium">Couples Therapy</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm font-medium">Anxiety Management</p>
                  <p className="text-xs text-muted-foreground">May 25, 3:30 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
