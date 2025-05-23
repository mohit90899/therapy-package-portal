
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import PackageCard from "@/components/PackageCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePackages } from "@/hooks/usePackages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TherapyPackage } from "@/utils/types";

const ClientPackages = () => {
  const navigate = useNavigate();
  const { getApprovedPackages, loading } = usePackages();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const allPackages = getApprovedPackages();
  
  // Get all unique tags from packages
  const allTags = Array.from(
    new Set(
      allPackages.flatMap(pkg => pkg.tags || [])
    )
  );
  
  const filteredPackages = allPackages.filter(pkg => {
    const matchesSearch = searchQuery === "" || 
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.therapistName.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTag = !selectedTag || (pkg.tags && pkg.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });
  
  const handlePurchase = (pkg: TherapyPackage) => {
    // Navigate to the payment page with the selected package ID
    navigate(`/payment?packageId=${pkg.id}`);
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Therapy Packages</h1>
          <p className="text-xl text-muted-foreground">
            Find the perfect therapy package tailored to your needs. Purchase once and schedule sessions at your convenience.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search packages by name, description, or therapist..."
              className="max-w-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <div className="flex-grow flex justify-end">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all" onClick={() => setSelectedTag(null)}>
                    All Packages
                  </TabsTrigger>
                  {allTags.map(tag => (
                    <TabsTrigger 
                      key={tag} 
                      value={tag}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p>Loading packages...</p>
          </div>
        ) : filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                actionText="Purchase Package"
                onAction={() => handlePurchase(pkg)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No packages found</h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedTag
                ? "Try adjusting your search filters"
                : "No packages are currently available"}
            </p>
            
            {(searchQuery || selectedTag) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ClientPackages;
