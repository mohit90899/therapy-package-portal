
import { useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import PackageCard from "@/components/PackageCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { usePackages } from "@/hooks/usePackages";
import { TherapyPackage } from "@/utils/types";

const ClientPackages = () => {
  const { toast } = useToast();
  const { packages, loading, getApprovedPackages } = usePackages();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<TherapyPackage | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  
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
    }
  };
  
  const handleBookPackage = () => {
    toast({
      title: "Package Booked Successfully",
      description: "You have successfully booked this package. Check your email for details.",
    });
    setBookingDialogOpen(false);
  };

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
            <Input 
              placeholder="Search packages by name, description, or therapist..."
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="ghost"
              className="absolute right-0 top-0 h-full"
              onClick={() => setSearchTerm("")}
              disabled={!searchTerm}
            >
              {searchTerm && "Clear"}
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p>Loading packages...</p>
          </div>
        ) : filteredPackages.length > 0 ? (
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
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No packages found</h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? "Try adjusting your search criteria." 
                : "There are currently no packages available."}
            </p>
          </div>
        )}
      </div>
      
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedPackage?.title}</DialogTitle>
            <DialogDescription>
              Book this package to get started with your therapy sessions.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPackage && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Package Details</h4>
                <p className="text-sm text-muted-foreground">{selectedPackage.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Price</h4>
                  <p>${selectedPackage.price}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Sessions</h4>
                  <p>{selectedPackage.sessions} sessions</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Duration</h4>
                  <p>{selectedPackage.duration} minutes each</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Therapist</h4>
                  <p>{selectedPackage.therapistName}</p>
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
