
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import PackageCard from "@/components/PackageCard";
import PackageDetailsModal from "@/components/PackageDetailsModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePackages } from "@/hooks/usePackages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TherapyPackage, Voucher } from "@/utils/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Heart, Star, Clock, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ClientPackages = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getApprovedPackages, loading } = usePackages();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TherapyPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
  
  const handleViewPackage = (pkg: TherapyPackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };
  
  const handlePurchase = (packageId: string, voucher?: Voucher | null) => {
    const params = new URLSearchParams({
      packageId: packageId
    });
    
    if (voucher) {
      params.append('voucherCode', voucher.code);
      params.append('discount', voucher.discount.toString());
    }
    
    toast({
      title: "Package Selected",
      description: "Navigating to payment page...",
    });
    
    navigate(`/payment?${params.toString()}`);
  };
  
  const featuredPackages = allPackages.slice(0, 3);
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-accent/10">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-accent/10 to-secondary/20 py-20">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#836054" fill-opacity="0.03"><path d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>')}")`
            }}
          ></div>
          
          <div className="container relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-primary mb-6 shadow-lg">
                <Heart className="h-4 w-4" />
                Professional Therapy Services
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                Find Your Perfect
                <br />
                Therapy Package
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Discover personalized therapy packages designed by certified professionals. 
                Purchase once, schedule sessions at your convenience, and embark on your wellness journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by package, therapist, or specialty..."
                    className="pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border-primary/20 focus:border-primary shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-12">
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-primary/10 shadow-lg">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-primary mb-2">{allPackages.length}+</div>
                <div className="text-sm text-muted-foreground">Therapy Packages</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-primary/10 shadow-lg">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Certified Therapists</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-primary/10 shadow-lg">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-primary/10 shadow-lg">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Packages */}
          {featuredPackages.length > 0 && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-primary">Featured Packages</h2>
                <p className="text-muted-foreground">Our most popular and highly-rated therapy packages</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPackages.map((pkg, index) => (
                  <div key={pkg.id} className="relative">
                    {index === 0 && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-xs font-medium z-10 shadow-lg">
                        <Star className="h-3 w-3 inline mr-1" />
                        Most Popular
                      </div>
                    )}
                    <PackageCard
                      pkg={pkg}
                      actionText="View Details"
                      onAction={() => handleViewPackage(pkg)}
                      className="hover:shadow-2xl transition-all duration-300 border-primary/10 bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Filters Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                <span className="font-medium text-primary">Filter by Category</span>
              </div>
              
              {allTags.length > 0 && (
                <Tabs defaultValue="all" className="w-full lg:w-auto">
                  <TabsList className="bg-white/80 backdrop-blur-sm border border-primary/20 shadow-lg">
                    <TabsTrigger 
                      value="all" 
                      onClick={() => setSelectedTag(null)}
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      All Packages ({allPackages.length})
                    </TabsTrigger>
                    {allTags.map(tag => (
                      <TabsTrigger 
                        key={tag} 
                        value={tag}
                        onClick={() => setSelectedTag(tag)}
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                      >
                        {tag} ({allPackages.filter(p => p.tags?.includes(tag)).length})
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              )}
            </div>
          </div>
          
          {/* Packages Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
              <p className="text-lg text-muted-foreground">Discovering amazing packages for you...</p>
            </div>
          ) : filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  actionText="View Details"
                  onAction={() => handleViewPackage(pkg)}
                  className="hover:shadow-2xl transition-all duration-300 border-primary/10 bg-white/80 backdrop-blur-sm"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Card className="bg-white/60 backdrop-blur-sm border-primary/10 shadow-lg p-12 max-w-md mx-auto">
                <CardContent className="p-0">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">No packages found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || selectedTag
                      ? "Try adjusting your search filters to find more packages"
                      : "No packages are currently available"}
                  </p>
                  
                  {(searchQuery || selectedTag) && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedTag(null);
                      }}
                      className="border-primary/30 text-primary hover:bg-primary hover:text-white"
                    >
                      Clear Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Trust Section */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-primary/5 via-accent/10 to-secondary/20 border-primary/20 shadow-lg">
              <CardContent className="p-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                  <Clock className="h-6 w-6 text-primary" />
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Why Choose Our Therapy Packages?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Our certified therapists create personalized packages tailored to your specific needs. 
                  Purchase once and schedule sessions at your convenience. Get professional support 
                  whenever you need it most.
                </p>
              </CardContent>
            </Card>
          </div>

          {selectedPackage && (
            <PackageDetailsModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedPackage(null);
              }}
              package={selectedPackage}
              onPurchase={handlePurchase}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ClientPackages;
