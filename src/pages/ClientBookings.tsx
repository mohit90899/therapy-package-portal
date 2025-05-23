
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Video, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { dummyBookings } from "@/utils/dummyData";
import { TherapySession, Booking } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";

const ClientBookings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState(dummyBookings);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const handleBookSession = (bookingId: string, sessionIndex: number) => {
    navigate(`/calendar/booking?bookingId=${bookingId}&sessionIndex=${sessionIndex}`);
  };
  
  const handleJoinSession = (zoomLink: string) => {
    // Check if the session is starting within 15 minutes
    const now = new Date();
    const sessionTime = new Date(); // This would ideally come from the session object
    sessionTime.setMinutes(sessionTime.getMinutes() + 10); // Mock session starting in 10 minutes
    
    if (sessionTime > now) {
      // Open Zoom link in new tab
      window.open(zoomLink, '_blank');
      
      toast({
        title: "Session Joined",
        description: "You've successfully joined the therapy session.",
      });
    } else {
      toast({
        title: "Session Not Available Yet",
        description: "This session is not currently active or has already ended.",
        variant: "destructive"
      });
    }
  };
  
  // Helper function to determine if a session can be joined based on schedule
  const canJoinSession = (session: TherapySession) => {
    if (!session.scheduled || !session.scheduledDate) return false;
    
    const sessionTime = new Date(session.scheduledDate);
    const now = new Date();
    
    // Allow joining 15 minutes before and until 1 hour after the scheduled time
    const earliestJoinTime = new Date(sessionTime);
    earliestJoinTime.setMinutes(earliestJoinTime.getMinutes() - 15);
    
    const latestJoinTime = new Date(sessionTime);
    latestJoinTime.setMinutes(latestJoinTime.getMinutes() + 60);
    
    return now >= earliestJoinTime && now <= latestJoinTime;
  };
  
  // Helper to calculate percentage of used sessions
  const calculateProgress = (booking: Booking) => {
    const totalSessions = booking.sessions?.length || 0;
    const completedSessions = booking.sessions?.filter(s => s.completed).length || 0;
    
    return totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">
            Manage your therapy packages and schedule sessions
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
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <CardTitle>{booking.sessions?.[0]?.title || "Therapy Package"}</CardTitle>
                      <CardDescription>
                        {booking.sessionsRemaining} of {booking.sessions?.length} sessions remaining
                      </CardDescription>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Active until {new Date(booking.expiryDate).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2" 
                        style={{ width: `${calculateProgress(booking)}%` }}
                      ></div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Your Sessions</h3>
                      <div className="space-y-2">
                        {booking.sessions?.map((session, index) => (
                          <div key={index} className="border rounded-md p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                  session.completed ? 'bg-green-100 text-green-600' : 
                                  session.scheduled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {session.completed ? (
                                    <CheckCircle className="h-5 w-5" />
                                  ) : session.scheduled ? (
                                    <Calendar className="h-5 w-5" />
                                  ) : (
                                    <span className="font-medium">{index + 1}</span>
                                  )}
                                </div>
                                
                                <div>
                                  <div className="font-medium">{session.title || `Session ${index + 1}`}</div>
                                  <div className="text-sm text-muted-foreground">{session.duration} minutes</div>
                                  {session.scheduledDate && (
                                    <div className="text-sm mt-1">{formatDate(session.scheduledDate)}</div>
                                  )}
                                  {session.description && (
                                    <div className="text-sm mt-1">{session.description}</div>
                                  )}
                                </div>
                              </div>
                              
                              <div>
                                {session.completed ? (
                                  <div className="space-y-2">
                                    <Badge className="bg-green-500">Completed</Badge>
                                    {session.recordingUrl && (
                                      <div>
                                        <Button variant="outline" size="sm" className="w-full">
                                          View Recording
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                ) : session.scheduled ? (
                                  <div className="space-y-2">
                                    <Badge>Scheduled</Badge>
                                    {session.zoomLink && canJoinSession(session) ? (
                                      <Button 
                                        variant="default" 
                                        size="sm"
                                        className="w-full"
                                        onClick={() => handleJoinSession(session.zoomLink!)}
                                      >
                                        <Video className="h-4 w-4 mr-2" />
                                        Join Session
                                      </Button>
                                    ) : (
                                      <div className="text-xs text-muted-foreground">
                                        Available to join 15 minutes before start time
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <Button onClick={() => handleBookSession(booking.id, index)}>
                                    Book Now
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
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
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {bookings.filter(booking => booking.status === 'active').length === 0 && (
              <div className="text-center py-12">
                <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No active bookings</h3>
                  <p className="text-muted-foreground mt-1 mb-6">You don't have any active therapy packages</p>
                  <Button onClick={() => navigate("/packages")}>Browse Packages</Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="space-y-6">
              {bookings.filter(booking => booking.status === 'completed').length > 0 ? (
                bookings.filter(booking => booking.status === 'completed').map(booking => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <CardTitle>Completed Package</CardTitle>
                      <CardDescription>
                        All sessions completed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium mb-2">Session Recordings</h4>
                          {booking.sessions?.filter(s => s.recordingUrl).map((session, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                              <span>{session.title || `Session ${idx + 1}`}</span>
                              <Button variant="outline" size="sm">View Recording</Button>
                            </div>
                          ))}
                          
                          {!booking.sessions?.some(s => s.recordingUrl) && (
                            <p className="text-sm text-muted-foreground">No recordings available for this package</p>
                          )}
                        </div>
                        
                        <Button variant="outline" asChild>
                          <Link to="/packages">Book Another Package</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
                    <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No completed packages</h3>
                    <p className="text-muted-foreground">You haven't completed any packages yet</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="expired">
            <div className="space-y-6">
              {bookings.filter(booking => booking.status === 'expired').length > 0 ? (
                bookings.filter(booking => booking.status === 'expired').map(booking => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <CardTitle>Expired Package</CardTitle>
                      <CardDescription>
                        This package has expired
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Alert variant="destructive">
                          <AlertTitle>Package Expired</AlertTitle>
                          <AlertDescription>
                            This package expired on {new Date(booking.expiryDate).toLocaleDateString()}.
                            {booking.sessionsRemaining > 0 && ` You had ${booking.sessionsRemaining} unused sessions.`}
                          </AlertDescription>
                        </Alert>
                        
                        <Button asChild>
                          <Link to="/packages">Browse New Packages</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
                    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No expired packages</h3>
                    <p className="text-muted-foreground">You don't have any expired packages</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientBookings;
