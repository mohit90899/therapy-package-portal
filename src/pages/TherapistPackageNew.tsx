
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PackageForm from "@/components/PackageForm";
import { usePackages } from "@/hooks/usePackages";
import { TherapyPackage } from "@/utils/types";

const TherapistPackageNew = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createPackage } = usePackages();
  
  const handleSubmit = (data: Omit<TherapyPackage, "id" | "status" | "createdAt" | "updatedAt">) => {
    setIsSubmitting(true);
    
    try {
      createPackage(data);
      navigate("/therapist/packages");
    } catch (error) {
      console.error("Error creating package:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="fade-in space-y-4">
        <h1 className="text-3xl font-bold">Create New Package</h1>
        <p className="text-muted-foreground">
          Create a therapy package with multiple sessions that clients can purchase
        </p>
        
        <div className="mt-6">
          <PackageForm
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
            submitText="Submit for Approval"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TherapistPackageNew;
