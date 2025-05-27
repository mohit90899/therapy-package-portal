
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
import { CheckCircle, XCircle, Clock, Eye, FileText, Calendar, DollarSign, User, AlertTriangle, MessageSquare } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="fade-in space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/5 via-accent/10 to-secondary/20 rounded-lg p-6 border border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-primary">Package Approval Center</h1>
          </div>
          <p className="text-muted-foreground">Review and manage therapist package submissions</p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-primary/10">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Pending Review</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600 mt-1">{pendingPackages.length}</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-primary/10">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">Approved</span>
              </div>
              <div className="text-2xl font-bold text-green-600 mt-1">{approvedPackages.length}</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-primary/10">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="font-medium">Rejected</span>
              </div>
              <div className="text-2xl font-bold text-red-600 mt-1">{rejectedPackages.length}</div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="pending">
          <TabsList className="mb-6 bg-white/80 backdrop-blur-sm border border-primary/20">
            <TabsTrigger value="pending" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Clock className="h-4 w-4 mr-2" />
              Pending Review ({pendingPackages.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approved ({approvedPackages.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <XCircle className="h-4 w-4 mr-2" />
              Rejected ({rejectedPackages.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <h2 className="text-xl font-semibold">Packages Requiring Review</h2>
                </div>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
                    <p>Loading packages...</p>
                  </div>
                ) : pendingPackages.length > 0 ? (
                  <div className="space-y-4">
                    {pendingPackages.map(pkg => (
                      <Card 
                        key={pkg.id} 
                        className={`cursor-pointer hover:border-primary transition-all duration-200 ${selectedPackage?.id === pkg.id ? 'border-primary bg-primary/5' : 'bg-white/80 backdrop-blur-sm border-primary/10'}`}
                        onClick={() => handlePackageSelect(pkg.id)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{pkg.title}</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <User className="h-4 w-4" />
                                By {pkg.therapistName}
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{pkg.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium">${pkg.price}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span>{pkg.sessions} sessions</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <div className="text-xs text-muted-foreground">
                            Submitted: {new Date(pkg.createdAt).toLocaleDateString()}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-white/60 backdrop-blur-sm border-primary/10">
                    <CardContent className="py-12 text-center">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <p className="text-muted-foreground">No packages pending approval</p>
                      <p className="text-sm text-muted-foreground mt-2">All submissions have been reviewed!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Package Review Details</h2>
                </div>
                
                {selectedPackage ? (
                  <div className="space-y-6">
                    {/* Package Overview */}
                    <Card className="bg-white/80 backdrop-blur-sm border-primary/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Package Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <PackageCard pkg={selectedPackage} showStatus />
                      </CardContent>
                    </Card>
                    
                    {/* Session Details */}
                    <Card className="bg-white/80 backdrop-blur-sm border-primary/10">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Session Structure
                        </CardTitle>
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
                                <TableCell className="font-medium">{session.title || `Session ${index + 1}`}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{session.duration} min</Badge>
                                </TableCell>
                                <TableCell className="text-sm">{session.description || "-"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    
                    {/* Additional Information */}
                    {(selectedPackage.documents?.length || selectedPackage.termsAndConditions) && (
                      <Card className="bg-white/80 backdrop-blur-sm border-primary/10">
                        <CardHeader>
                          <CardTitle className="text-lg">Additional Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {selectedPackage.documents && selectedPackage.documents.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Included Documents
                              </h4>
                              <ul className="space-y-2">
                                {selectedPackage.documents.map((doc, index) => (
                                  <li key={index}>
                                    <a 
                                      href={doc.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline text-sm flex items-center gap-2"
                                    >
                                      <FileText className="h-3 w-3" />
                                      {doc.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {selectedPackage.termsAndConditions && (
                            <div>
                              <h4 className="font-medium mb-2">Terms and Conditions</h4>
                              <div className="bg-muted/50 rounded-lg p-3">
                                <p className="text-sm whitespace-pre-line">
                                  {selectedPackage.termsAndConditions}
                                </p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        onClick={handleApprove}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        size="lg"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Package
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={openRejectDialog}
                        className="flex-1"
                        size="lg"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Package
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Card className="bg-white/60 backdrop-blur-sm border-primary/10">
                    <CardContent className="py-16 text-center">
                      <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select a package to view details</p>
                      <p className="text-sm text-muted-foreground mt-2">Click on any package from the list to review</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="approved">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-3 text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
                  <p>Loading packages...</p>
                </div>
              ) : approvedPackages.length > 0 ? (
                approvedPackages.map(pkg => (
                  <PackageCard 
                    key={pkg.id} 
                    pkg={pkg} 
                    showStatus
                    onAction={handlePackageSelect}
                    actionText="View Details"
                    className="bg-white/80 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-200"
                  />
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No approved packages yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">Approved packages will appear here</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-3 text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
                  <p>Loading packages...</p>
                </div>
              ) : rejectedPackages.length > 0 ? (
                rejectedPackages.map(pkg => (
                  <PackageCard 
                    key={pkg.id} 
                    pkg={pkg} 
                    showStatus
                    onAction={handlePackageSelect}
                    actionText="View Details"
                    className="bg-white/80 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-200"
                  />
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <XCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No rejected packages.</p>
                  <p className="text-sm text-muted-foreground mt-2">Great! All submissions meet our standards</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-red-600" />
              Reject Package
            </DialogTitle>
            <DialogDescription>
              Please provide a detailed reason for rejecting this package. This feedback will be sent to the therapist to help them improve their submission.
            </DialogDescription>
          </DialogHeader>
          
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Be specific and constructive in your feedback to help the therapist understand what needs to be improved.
            </AlertDescription>
          </Alert>
          
          <Textarea
            placeholder="Explain why this package is being rejected and what improvements are needed..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="min-h-[120px] bg-white/80"
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={!rejectReason.trim()}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminApproval;
