
import { Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dummyPackages } from "@/utils/dummyData";
import { ArrowDown, ArrowUp, Heart, Users, Star, Clock } from "lucide-react";

const Index = () => {
  const featuredPackages = dummyPackages.filter(pkg => pkg.status === "approved").slice(0, 3);

  return (
    <MainLayout>
      <div className="fade-in">
        {/* Hero Section - Redesigned */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#836054" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(#grid)"/></svg>')}")`
            }}
          ></div>

          <div className="container relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium text-primary mb-8 shadow-xl border border-primary/20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Trusted by 1000+ Clients Worldwide
              </div>
              
              {/* Main Headline */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                  Transform Your
                </span>
                <br />
                <span className="text-primary">Mental Wellness</span>
              </h1>
              
              {/* Subheading */}
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
                Connect with certified therapists through our innovative package-based approach. 
                <span className="text-primary font-medium"> Purchase once, schedule flexibly, heal progressively.</span>
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                <Link to="/packages">
                  <Button size="lg" className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <Heart className="mr-2 h-5 w-5" />
                    Explore Packages
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <Users className="mr-2 h-5 w-5" />
                    Join as Therapist
                  </Button>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Expert Therapists</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10">
                  <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-primary" />
          </div>
        </section>

        {/* Featured Packages Section - Enhanced */}
        <section className="py-24 bg-gradient-to-b from-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/30">
                Most Popular
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Featured Therapy Packages</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover our most sought-after therapy packages, carefully curated by mental health professionals 
                to address diverse needs and goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {featuredPackages.map((pkg, index) => (
                <div key={pkg.id} className="relative group">
                  {index === 0 && (
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold z-10 shadow-lg">
                      <Star className="h-4 w-4 inline mr-1" />
                      #1 Choice
                    </div>
                  )}
                  
                  <Card className="h-full bg-white/90 backdrop-blur-sm border-primary/10 hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                    {pkg.image && (
                      <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
                        <img 
                          src={pkg.image} 
                          alt={pkg.title} 
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    )}
                    <CardContent className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="text-xs">
                          {pkg.sessions} Sessions
                        </Badge>
                        <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                          Certified
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 text-primary">{pkg.title}</h3>
                      <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">{pkg.description}</p>
                      
                      <div className="flex justify-between items-center mb-6">
                        <div className="text-3xl font-bold text-primary">${pkg.price}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {pkg.sessions} sessions
                        </div>
                      </div>
                      
                      <Link to={`/packages`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/packages">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-white">
                  Explore All Packages
                  <ArrowUp className="ml-2 h-5 w-5 rotate-45" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section - Redesigned */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Simple. Effective. Flexible.</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our innovative approach makes mental health support accessible and convenient for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="bg-gradient-to-br from-primary to-accent text-white rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Choose Your Package</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Browse our curated selection of therapy packages designed by certified professionals for specific needs and goals.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="bg-gradient-to-br from-primary to-accent text-white rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Purchase & Schedule</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Make a one-time purchase and schedule your sessions at your own pace. No recurring fees or commitments.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="bg-gradient-to-br from-primary to-accent text-white rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Begin Your Journey</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Start your personalized therapy sessions with professional support and track your progress along the way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Therapists Section - Enhanced */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Badge variant="outline" className="mb-6 px-4 py-2 text-primary border-primary/30">
                    For Mental Health Professionals
                  </Badge>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Grow Your Practice With Us</h2>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Join our platform and reach more clients while maintaining the flexibility and autonomy you need to provide excellent care.
                  </p>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-lg mt-1">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Package-Based Revenue</h4>
                        <p className="text-muted-foreground">Create comprehensive therapy packages and receive payment upfront for multiple sessions.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-2 rounded-lg mt-1">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Flexible Scheduling</h4>
                        <p className="text-muted-foreground">Manage your calendar and client sessions with our intuitive scheduling system.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-2 rounded-lg mt-1">
                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Professional Growth</h4>
                        <p className="text-muted-foreground">Access resources, connect with peers, and expand your professional network.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/register">
                    <Button size="lg" className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <Users className="mr-2 h-5 w-5" />
                      Join Our Network
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-primary/10">
                  <h3 className="text-2xl font-bold mb-8 text-primary">Platform Benefits</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-medium">Comprehensive package management</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-medium">Integrated session scheduling</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-medium">Client relationship management</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl">
                        <ArrowUp className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-medium">Performance analytics & insights</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action - Final */}
        <section className="py-24 bg-gradient-to-r from-primary via-primary/90 to-accent relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Mental Health?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Take the first step towards a healthier, happier you. Browse our therapy packages 
              or join our community of mental health professionals today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/packages">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <Heart className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transition-all duration-300">
                  <Users className="mr-2 h-5 w-5" />
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
