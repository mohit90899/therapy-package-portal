
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import PackageCard from "@/components/PackageCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { usePackages } from "@/hooks/usePackages";
import { TherapyPackage, TherapySession } from "@/utils/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, FileUp, Search, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ClientPackages = () => {
  const { toast } = useToast();
  const { packages, loading, getApprovedPackages } = usePackages();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<TherapyPackage | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  const approvedPackages = getApprovedPackages();
  
  const filteredPackages = approvedPackages.filter(pkg => 
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.therapistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleViewPackage = (id: string) => {
    const pkg = packages.find(p => p.id === id);
    if (pkg) {
      setSelectedPackage(pkg);
      setBookingDialogOpen(true);
    } else {
      toast({
        title: "Error",
        description: "Package not found. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const applyVoucher = () => {
    if (!voucherCode) return;
    
    // Mock voucher code validation
    if (voucherCode.toLowerCase() === "discount20") {
      setVoucherApplied(true);
      setDiscountAmount(20);
      toast({
        title: "Voucher Applied!",
        description: "You received a 20% discount.",
      });
    } else if (voucherCode.toLowerCase() === "discount10") {
      setVoucherApplied(true);
      setDiscountAmount(10);
      toast({
        title: "Voucher Applied!",
        description: "You received a 10% discount.",
      });
    } else {
      toast({
        title: "Invalid Voucher",
        description: "This voucher code is invalid or expired.",
        variant: "destructive"
      });
    }
  };
  
  const handleBookPackage = () => {
    toast({
      title: "Package Booked Successfully",
      description: "You have successfully booked this package. Check your email for details.",
    });
    setBookingDialogOpen(false);
    setVoucherCode("");
    setVoucherApplied(false);
    setDiscountAmount(0);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/3 bg-gray-200 rounded mx-auto"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-100 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-12 fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Therapy Packages</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our selection of therapeutic packages designed to support your mental wellbeing and personal growth.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <div className="flex">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search packages by name, therapist or tags..."
                  className="pl-10 pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map(pkg => (
              <PackageCard 
                key={pkg.id} 
                pkg={pkg} 
                actionText="Book Now" 
                onAction={handleViewPackage}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            {searchTerm ? (
              <>
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No packages found</h3>
                <p className="text-muted-foreground mb-4">
                  No results match "{searchTerm}". Try adjusting your search.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              </>
            ) : (
              <>
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No packages available</h3>
                <p className="text-muted-foreground">
                  There are currently no therapy packages available. Please check back later.
                </p>
              </>
            )}
          </div>
        )}
      </div>
      
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedPackage?.title}</DialogTitle>
            <DialogDescription>
              Book this package to get started with your therapy sessions.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPackage && (
            <div className="space-y-6">
              {selectedPackage.image && (
                <div className="w-full h-40 overflow-hidden rounded-md">
                  <img 
                    src={selectedPackage.image} 
                    alt={selectedPackage.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div>
                <h4 className="font-medium mb-2">Package Details</h4>
                <p className="text-sm text-muted-foreground">{selectedPackage.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Price</h4>
                  <p className="text-lg font-semibold">${selectedPackage.price}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Sessions</h4>
                  <p>{selectedPackage.sessions} sessions</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Total Duration</h4>
                  <p>
                    {Math.round(
                      selectedPackage.sessionDetails?.reduce(
                        (total, session) => total + (session.duration || 0), 0
                      ) / 60
                    )} hours
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Therapist</h4>
                  <p>{selectedPackage.therapistName}</p>
                </div>
              </div>
              
              {/* Session details */}
              <div>
                <h4 className="font-medium mb-2">Session Breakdown</h4>
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
                        <TableCell className="max-w-[200px] truncate">
                          {session.description || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Resource documents if any */}
              {selectedPackage.documents && selectedPackage.documents.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Included Resources</h4>
                  <ul className="space-y-1">
                    {selectedPackage.documents.map((doc, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <FileUp className="h-4 w-4 mr-2 text-primary" />
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
                </div>
              )}
              
              {/* Terms and conditions */}
              {selectedPackage.termsAndConditions && (
                <div>
                  <h4 className="font-medium mb-2">Terms and Conditions</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {selectedPackage.termsAndConditions}
                  </p>
                </div>
              )}
              
              {/* Voucher code */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter voucher code"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  disabled={voucherApplied}
                />
                <Button 
                  variant="outline" 
                  onClick={applyVoucher}
                  disabled={!voucherCode || voucherApplied}
                >
                  Apply
                </Button>
              </div>
              
              {/* Price calculation */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Package Price:</span>
                  <span>${selectedPackage.price}</span>
                </div>
                
                {voucherApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discountAmount}%):</span>
                    <span>-${(selectedPackage.price * discountAmount / 100).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>
                    ${voucherApplied 
                      ? (selectedPackage.price * (1 - discountAmount / 100)).toFixed(2)
                      : selectedPackage.price}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBookPackage}>
              Book Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default ClientPackages;
