
import { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PackageCard from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { usePackages } from "@/hooks/usePackages";
import { TherapyPackage } from "@/utils/types";

const AdminApproval = () => {
  const { toast } = useToast();
  const { packages, loading, updatePackageStatus } = usePackages();
  const [selectedPackage, setSelectedPackage] = useState<TherapyPackage | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  
  const pendingPackages = packages.filter(pkg => pkg.status === "pending");
  
  const handlePackageSelect = (id: string) => {
    const pkg = packages.find(p => p.id === id);
    if (pkg) {
      setSelectedPackage(pkg);
    }
  };
  
  const handleApprove = () => {
    if (selectedPackage) {
      updatePackageStatus(selectedPackage.id, "approved");
      toast({
        title: "Package Approved",
        description: "The package has been approved and published.",
        variant: "default",
      });
      setSelectedPackage(null);
    }
  };
  
  const openRejectDialog = () => {
    setRejectDialogOpen(true);
  };
  
  const handleReject = () => {
    if (selectedPackage) {
      updatePackageStatus(selectedPackage.id, "rejected");
      toast({
        title: "Package Rejected",
        description: "The therapist has been notified about the rejection.",
        variant: "destructive",
      });
      setRejectDialogOpen(false);
      setRejectReason("");
      setSelectedPackage(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Package Approval</h1>
          <p className="text-muted-foreground">Review and approve therapist packages</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Pending Approval ({pendingPackages.length})</h2>
            
            {loading ? (
              <p>Loading packages...</p>
            ) : pendingPackages.length > 0 ? (
              <div className="space-y-4">
                {pendingPackages.map(pkg => (
                  <Card 
                    key={pkg.id} 
                    className={`cursor-pointer hover:border-primary ${selectedPackage?.id === pkg.id ? 'border-primary' : ''}`}
                    onClick={() => handlePackageSelect(pkg.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle>{pkg.title}</CardTitle>
                      <CardDescription>By {pkg.therapistName}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">{pkg.description}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex justify-between w-full">
                        <div className="text-sm font-medium">${pkg.price}</div>
                        <div className="text-sm text-muted-foreground">{pkg.sessions} sessions</div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No packages pending approval</p>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Package Details</h2>
            
            {selectedPackage ? (
              <div className="space-y-6">
                <PackageCard pkg={selectedPackage} showStatus />
                
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleApprove}
                    className="flex-1"
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={openRejectDialog}
                    className="flex-1"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="bg-muted">
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">Select a package to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Package</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this package. This feedback will be sent to the therapist.
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            placeholder="Explain why this package is being rejected..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="min-h-[100px]"
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminApproval;
