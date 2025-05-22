
import { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PackageCard from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { usePackages } from "@/hooks/usePackages";
import { TherapyPackage, TherapySession } from "@/utils/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminApproval = () => {
  const { toast } = useToast();
  const { packages, loading, updatePackageStatus } = usePackages();
  const [selectedPackage, setSelectedPackage] = useState<TherapyPackage | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  
  const pendingPackages = packages.filter(pkg => pkg.status === "pending");
  const approvedPackages = packages.filter(pkg => pkg.status === "approved");
  const rejectedPackages = packages.filter(pkg => pkg.status === "rejected");
  
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
      <div className="fade-in space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Package Approval</h1>
          <p className="text-muted-foreground">Review and approve therapist packages</p>
        </div>
        
        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">Pending Approval ({pendingPackages.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedPackages.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedPackages.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Packages Requiring Review</h2>
                
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
                    
                    {/* Session details */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Session Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Session</TableHead>
                              <TableHead>Duration</TableHead>
                              <TableHead>Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedPackage.sessionDetails?.map((session: TherapySession, index: number) => (
                              <TableRow key={index}>
                                <TableCell>{session.title || `Session ${index + 1}`}</TableCell>
                                <TableCell>{session.duration} min</TableCell>
                                <TableCell>{session.description || "-"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    
                    {/* Documents */}
                    {selectedPackage.documents && selectedPackage.documents.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Included Documents</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedPackage.documents.map((doc, index) => (
                              <li key={index}>
                                <a 
                                  href={doc.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  {doc.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Terms and conditions */}
                    {selectedPackage.termsAndConditions && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Terms and Conditions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm whitespace-pre-line">
                            {selectedPackage.termsAndConditions}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                    
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
          </TabsContent>
          
          <TabsContent value="approved">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Loading packages...</p>
              ) : approvedPackages.length > 0 ? (
                approvedPackages.map(pkg => (
                  <PackageCard 
                    key={pkg.id} 
                    pkg={pkg} 
                    showStatus
                    onAction={handlePackageSelect}
                    actionText="View Details"
                  />
                ))
              ) : (
                <div className="col-span-3 py-8 text-center">
                  <p className="text-muted-foreground">No approved packages yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Loading packages...</p>
              ) : rejectedPackages.length > 0 ? (
                rejectedPackages.map(pkg => (
                  <PackageCard 
                    key={pkg.id} 
                    pkg={pkg} 
                    showStatus
                    onAction={handlePackageSelect}
                    actionText="View Details" 
                  />
                ))
              ) : (
                <div className="col-span-3 py-8 text-center">
                  <p className="text-muted-foreground">No rejected packages.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
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
