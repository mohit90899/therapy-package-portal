
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PackageTemplateSelector from "@/components/PackageTemplateSelector";
import EnhancedPackageForm from "@/components/EnhancedPackageForm";
import { usePackages } from "@/hooks/usePackages";
import { TherapyPackage, PackageTemplate } from "@/utils/types";
import { currentUser } from "@/utils/dummyData";

const TherapistPackageCreate = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTemplates, setShowTemplates] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<PackageTemplate | null>(null);
  const { createPackage } = usePackages();
  
  const handleSelectTemplate = (template: PackageTemplate) => {
    setSelectedTemplate(template);
    setShowTemplates(false);
  };

  const handleSkipTemplates = () => {
    setSelectedTemplate(null);
    setShowTemplates(false);
  };

  const handleBackToTemplates = () => {
    setShowTemplates(true);
    setSelectedTemplate(null);
  };
  
  const handleSubmit = (data: Omit<TherapyPackage, "id" | "status" | "createdAt" | "updatedAt" | "therapistId" | "therapistName">) => {
    setIsSubmitting(true);
    
    try {
      createPackage({
        ...data,
        therapistId: currentUser.id,
        therapistName: currentUser.name
      });
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
        {showTemplates ? (
          <>
            <h1 className="text-3xl font-bold">Create New Package</h1>
            <p className="text-muted-foreground">
              Start with a template or create your own custom therapy package
            </p>
            
            <PackageTemplateSelector
              onSelectTemplate={handleSelectTemplate}
              onSkip={handleSkipTemplates}
            />
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  {selectedTemplate ? `Customize: ${selectedTemplate.name}` : "Create Custom Package"}
                </h1>
                <p className="text-muted-foreground">
                  {selectedTemplate 
                    ? "Modify this template to match your practice"
                    : "Design your therapy package from scratch"
                  }
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleBackToTemplates}
                  className="text-sm text-muted-foreground hover:text-primary underline"
                >
                  ← Back to Templates
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <EnhancedPackageForm
                onSubmit={handleSubmit}
                onCancel={() => navigate("/therapist/packages")}
                selectedTemplate={selectedTemplate}
                therapistName={currentUser.name}
              />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TherapistPackageCreate;
