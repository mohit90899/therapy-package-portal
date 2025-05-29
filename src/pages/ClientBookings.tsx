import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Video, CheckCircle, Clock, AlertCircle, Package } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SessionCreditsTracker from "@/components/SessionCreditsTracker";
import { Booking, SessionCredit } from "@/utils/types";

const ClientBookings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Enhanced dummy bookings with session credits and commission tracking
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "booking1",
      packageId: "pkg1",
      packageTitle: "Pre-Wedding Therapy Package",
      clientId: "client1",
      therapistId: "therapist1",
      therapistName: "Dr. Sarah Johnson",
      purchaseDate: "2024-01-15",
      totalSessions: 6,
      usedSessions: 2,
      remainingSessions: 4,
      expiryDate: "2024-07-15",
      status: "active",
      totalAmount: 499,
      finalAmount: 449,
      voucherCode: "FIRST10",
      voucherDiscount: 10,
      platformFee: 157.15, // 35% of 449
      therapistEarnings: 291.85, // 65% of 449
      platformEarnings: 157.15, // Same as platform fee
      sessionCredits: [
        {
          id: "credit1",
          bookingId: "booking1",
          packageId: "pkg1",
          sessionIndex: 0,
          status: "completed",
          therapistId: "therapist1",
          duration: 60,
          title: "Initial Assessment",
          description: "Understanding your needs and goals",
          scheduledDate: "2024-01-20T10:00:00Z",
          recordingUrl: "https://example.com/recording1",
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-20T11:00:00Z"
        },
        {
          id: "credit2",
          bookingId: "booking1",
          packageId: "pkg1",
          sessionIndex: 1,
          status: "completed",
          therapistId: "therapist1",
          duration: 60,
          title: "Communication Strategies",
          description: "Building effective communication skills",
          scheduledDate: "2024-01-27T14:00:00Z",
          recordingUrl: "https://example.com/recording2",
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-27T15:00:00Z"
        },
        {
          id: "credit3",
          bookingId: "booking1",
          packageId: "pkg1",
          sessionIndex: 2,
          status: "scheduled",
          therapistId: "therapist1",
          duration: 60,
          title: "Conflict Resolution",
          description: "Managing disagreements constructively",
          scheduledDate: "2024-02-03T11:00:00Z",
          zoomLink: "https://zoom.us/j/123456789",
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-30T10:00:00Z"
        },
        {
          id: "credit4",
          bookingId: "booking1",
          packageId: "pkg1",
          sessionIndex: 3,
          status: "available",
          therapistId: "therapist1",
          duration: 60,
          title: "Stress Management",
          description: "Techniques for managing wedding stress",
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z"
        },
        {
          id: "credit5",
          bookingId: "booking1",
          packageId: "pkg1",
          sessionIndex: 4,
          status: "available",
          therapistId: "therapist1",
          duration: 60,
          title: "Future Planning",
          description: "Setting goals for your marriage",
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z"
        },
        {
          id: "credit6",
          bookingId: "booking1",
          packageId: "pkg1",
          sessionIndex: 5,
          status: "available",
          therapistId: "therapist1",
          duration: 60,
          title: "Final Session",
          description: "Review and continued support planning",
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z"
        }
      ]
    }
  ]);
  
  const handleBookSession = (creditId: string) => {
    const booking = bookings.find(b => 
      b.sessionCredits.some(c => c.id === creditId)
    );
    const credit = booking?.sessionCredits.find(c => c.id === creditId);
    
    if (booking && credit) {
      navigate(`/calendar/booking?bookingId=${booking.id}&creditId=${creditId}`);
    }
  };
  
  const handleRescheduleSession = (creditId: string) => {
    toast({
      title: "Reschedule Session",
      description: "Redirecting to reschedule your session...",
    });
    
    // In a real app, this would navigate to a reschedule page
    const booking = bookings.find(b => 
      b.sessionCredits.some(c => c.id === creditId)
    );
    const credit = booking?.sessionCredits.find(c => c.id === creditId);
    
    if (booking && credit) {
      navigate(`/calendar/booking?bookingId=${booking.id}&creditId=${creditId}&reschedule=true`);
    }
  };
  
  const handleJoinSession = (creditId: string) => {
    const booking = bookings.find(b => 
      b.sessionCredits.some(c => c.id === creditId)
    );
    const credit = booking?.sessionCredits.find(c => c.id === creditId);
    
    if (credit?.zoomLink) {
      window.open(credit.zoomLink, '_blank');
      toast({
        title: "Session Joined",
        description: "You've successfully joined the therapy session.",
      });
    }
  };
  
  const handleViewRecording = (creditId: string) => {
    const booking = bookings.find(b => 
      b.sessionCredits.some(c => c.id === creditId)
    );
    const credit = booking?.sessionCredits.find(c => c.id === creditId);
    
    if (credit?.recordingUrl) {
      window.open(credit.recordingUrl, '_blank');
      toast({
        title: "Opening Recording",
        description: "Opening session recording in a new tab.",
      });
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">
            Manage your therapy packages and session credits
          </p>
        </div>
        
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Packages</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            {bookings.filter(booking => booking.status === 'active').map(booking => (
              <div key={booking.id} className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          {booking.packageTitle}
                        </CardTitle>
                        <CardDescription>
                          By {booking.therapistName} • Purchased on {new Date(booking.purchaseDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="mt-2 md:mt-0 flex gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Expires {new Date(booking.expiryDate).toLocaleDateString()}
                        </Badge>
                        {booking.voucherCode && (
                          <Badge variant="secondary">
                            {booking.voucherCode} Applied
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{booking.totalSessions}</div>
                        <div className="text-sm text-muted-foreground">Total Sessions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{booking.usedSessions}</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{booking.remainingSessions}</div>
                        <div className="text-sm text-muted-foreground">Remaining</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">${booking.finalAmount}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.voucherDiscount ? (
                            <>Paid <span className="line-through text-muted-foreground">${booking.totalAmount}</span></>
                          ) : (
                            'Paid'
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Alert className="flex gap-2 items-start">
                      <AlertCircle className="h-5 w-5 mt-0.5" />
                      <div>
                        <AlertTitle>Package Information</AlertTitle>
                        <AlertDescription>
                          This package is valid until {new Date(booking.expiryDate).toLocaleDateString()}. 
                          Please schedule all sessions before the expiry date.
                        </AlertDescription>
                      </div>
                    </Alert>
                  </CardContent>
                </Card>

                <SessionCreditsTracker
                  booking={booking}
                  onBookSession={handleBookSession}
                  onRescheduleSession={handleRescheduleSession}
                  onJoinSession={handleJoinSession}
                  onViewRecording={handleViewRecording}
                />
              </div>
            ))}
            
            {bookings.filter(booking => booking.status === 'active').length === 0 && (
              <div className="text-center py-12">
                <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No active packages</h3>
                  <p className="text-muted-foreground mt-1 mb-6">You don't have any active therapy packages</p>
                  <Button onClick={() => navigate("/packages")}>Browse Packages</Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="text-center py-12">
              <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
                <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No completed packages</h3>
                <p className="text-muted-foreground">You haven't completed any packages yet</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="expired">
            <div className="text-center py-12">
              <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No expired packages</h3>
                <p className="text-muted-foreground">You don't have any expired packages</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientBookings;
