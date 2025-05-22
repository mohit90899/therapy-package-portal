
import { Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { dummyPackages } from "@/utils/dummyData";

const Index = () => {
  const featuredPackages = dummyPackages.filter(pkg => pkg.status === "approved").slice(0, 3);

  return (
    <MainLayout>
      <div className="fade-in">
        {/* Hero Section */}
        <section className="relative bg-primary py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Professional Therapy Services
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              Connect with professional therapists to improve your mental wellbeing through our curated therapy packages.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/packages">
                <Button size="lg" variant="secondary">
                  Browse Packages
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Register as Therapist
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Packages Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Packages</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our most popular therapy packages designed to address various needs and goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredPackages.map(pkg => (
                <Card key={pkg.id} className="package-card-hover">
                  {pkg.image && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{pkg.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">${pkg.price}</span>
                      <span className="text-sm text-muted-foreground">{pkg.sessions} sessions</span>
                    </div>
                    <Link to={`/packages/${pkg.id}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/packages">
                <Button variant="outline" size="lg">
                  View All Packages
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-accent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started with our therapy services in just a few simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Browse Packages</h3>
                <p className="text-muted-foreground">
                  Explore our range of therapy packages designed to address different needs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Book a Package</h3>
                <p className="text-muted-foreground">
                  Select a package that suits your needs and make a booking.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Start Sessions</h3>
                <p className="text-muted-foreground">
                  Begin your therapy journey with professional support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Therapists Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">For Therapists</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Are you a qualified therapist? Join our platform to reach more clients and grow your practice.
                  </p>
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Create and manage your own therapy packages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Get your services approved and promoted</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Connect with clients looking for your expertise</span>
                    </li>
                  </ul>
                  <Link to="/register">
                    <Button>Register as Therapist</Button>
                  </Link>
                </div>
                
                <div className="bg-accent p-8 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Therapist Dashboard Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded mr-3">
                        <div className="w-4 h-4 bg-primary rounded-full"></div>
                      </div>
                      <span>Package management</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded mr-3">
                        <div className="w-4 h-4 bg-primary rounded-full"></div>
                      </div>
                      <span>Session scheduling</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded mr-3">
                        <div className="w-4 h-4 bg-primary rounded-full"></div>
                      </div>
                      <span>Client management</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded mr-3">
                        <div className="w-4 h-4 bg-primary rounded-full"></div>
                      </div>
                      <span>Performance analytics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Browse our therapy packages or register as a therapist to begin your journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/packages">
                <Button size="lg" variant="secondary">
                  Browse Packages
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
