
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PackageForm from "@/components/PackageForm";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { usePackages } from "@/hooks/usePackages";
import { TherapyPackage } from "@/utils/types";
import { currentUser } from "@/utils/dummyData";

const TherapistPackageEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [package_, setPackage] = useState<TherapyPackage | null>(null);
  const { packages, updatePackage, loading } = usePackages();
  
  useEffect(() => {
    if (!loading && id) {
      const foundPackage = packages.find(pkg => pkg.id === id);
      
      if (!foundPackage) {
        setNotFound(true);
        return;
      }
      
      if (foundPackage.therapistId !== currentUser.id) {
        setUnauthorized(true);
        return;
      }
      
      setPackage(foundPackage);
    }
  }, [id, packages, loading]);
  
  const handleSubmit = (data: Omit<TherapyPackage, "id" | "status" | "createdAt" | "updatedAt">) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      updatePackage(id, {
        ...data,
        status: package_?.status === 'rejected' ? 'pending' : package_?.status,
      });
      navigate("/therapist/packages");
    } catch (error) {
      console.error("Error updating package:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }
  
  if (notFound) {
    return (
      <DashboardLayout>
        <Alert variant="destructive">
          <AlertTitle>Package not found</AlertTitle>
          <AlertDescription>
            The package you're trying to edit does not exist.
            <div className="mt-4">
              <Button onClick={() => navigate("/therapist/packages")}>
                Return to My Packages
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }
  
  if (unauthorized) {
    return (
      <DashboardLayout>
        <Alert variant="destructive">
          <AlertTitle>Unauthorized</AlertTitle>
          <AlertDescription>
            You don't have permission to edit this package.
            <div className="mt-4">
              <Button onClick={() => navigate("/therapist/packages")}>
                Return to My Packages
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="fade-in space-y-4">
        <h1 className="text-3xl font-bold">Edit Package</h1>
        
        {package_?.status === 'rejected' && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>This package was rejected</AlertTitle>
            <AlertDescription>
              Make the necessary changes and resubmit for approval.
            </AlertDescription>
          </Alert>
        )}
        
        {package_ && (
          <div className="mt-6">
            <PackageForm
              initialData={package_}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              submitText={package_.status === 'rejected' ? 'Update and Resubmit' : 'Update Package'}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TherapistPackageEdit;
