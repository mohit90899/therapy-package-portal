
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PackageCard from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { currentUser } from "@/utils/dummyData";
import { usePackages } from "@/hooks/usePackages";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TherapistPackages = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loading, getTherapistPackages, deletePackage } = usePackages();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const packages = getTherapistPackages(currentUser.id);
  
  const handleView = (id: string) => {
    navigate(`/therapist/packages/edit/${id}`);
  };
  
  const handleDelete = () => {
    if (deleteId) {
      deletePackage(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Packages</h1>
            <p className="text-muted-foreground">Manage your therapy package offerings</p>
          </div>
          
          <Link to="/therapist/packages/new">
            <Button className="mt-4 sm:mt-0">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Package
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({packages.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({packages.filter(p => p.status === 'approved').length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({packages.filter(p => p.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({packages.filter(p => p.status === 'rejected').length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Loading packages...</p>
              ) : packages.length > 0 ? (
                packages.map(pkg => (
                  <div key={pkg.id} className="relative">
                    <PackageCard
                      pkg={pkg}
                      actionText="Edit Package"
                      onAction={handleView}
                      showStatus
                    />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setDeleteId(pkg.id)}
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            package and remove it from our system.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No packages found</h3>
                  <p className="text-muted-foreground mb-4">You haven't created any packages yet.</p>
                  <Link to="/therapist/packages/new">
                    <Button>Create Your First Package</Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="approved">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Loading packages...</p>
              ) : packages.filter(p => p.status === 'approved').length > 0 ? (
                packages.filter(p => p.status === 'approved').map(pkg => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    actionText="Edit Package"
                    onAction={handleView}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No approved packages</h3>
                  <p className="text-muted-foreground">Submit packages for approval.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            {/* Similar structure as "approved" tab */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Loading packages...</p>
              ) : packages.filter(p => p.status === 'pending').length > 0 ? (
                packages.filter(p => p.status === 'pending').map(pkg => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    actionText="View Package"
                    onAction={handleView}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No pending packages</h3>
                  <p className="text-muted-foreground">All your packages have been reviewed.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected">
            {/* Similar structure as "approved" tab */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Loading packages...</p>
              ) : packages.filter(p => p.status === 'rejected').length > 0 ? (
                packages.filter(p => p.status === 'rejected').map(pkg => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    actionText="Edit & Resubmit"
                    onAction={handleView}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No rejected packages</h3>
                  <p className="text-muted-foreground">All your submitted packages are in good standing.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TherapistPackages;
