
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Video, CheckCircle } from "lucide-react";
import { dummyBookings } from "@/utils/dummyData";
import { TherapySession } from "@/utils/types";
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
    // Open Zoom link in new tab
    window.open(zoomLink, '_blank');
    
    toast({
      title: "Session Joined",
      description: "You've successfully joined the therapy session.",
    });
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
                      <CardTitle>{dummyBookings.find(b => b.id === booking.id)?.sessions?.[0]?.title.split(' ')[0]}'s Package</CardTitle>
                      <CardDescription>
                        {booking.sessionsRemaining} of {booking.sessions?.length} sessions remaining
                      </CardDescription>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <Badge variant="outline">Active until {new Date(booking.expiryDate).toLocaleDateString()}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2" 
                        style={{ 
                          width: `${100 - ((booking.sessionsRemaining / (booking.sessions?.length || 1)) * 100)}%` 
                        }}
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
                                  <div className="font-medium">{session.title}</div>
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
                                    {session.zoomLink && (
                                      <Button 
                                        variant="default" 
                                        size="sm"
                                        className="w-full"
                                        onClick={() => handleJoinSession(session.zoomLink!)}
                                      >
                                        <Video className="h-4 w-4 mr-2" />
                                        Join Session
                                      </Button>
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
                    
                    <Alert>
                      <AlertTitle>Package Information</AlertTitle>
                      <AlertDescription>
                        This package is valid until {new Date(booking.expiryDate).toLocaleDateString()}. 
                        Please schedule all sessions before the expiry date.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {bookings.filter(booking => booking.status === 'active').length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No active bookings</h3>
                <p className="text-muted-foreground mt-1 mb-6">You don't have any active therapy packages</p>
                <Button onClick={() => navigate("/packages")}>Browse Packages</Button>
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
                      <p>View session details and recordings here</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No completed packages</h3>
                  <p className="text-muted-foreground">You haven't completed any packages yet</p>
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
                      <p>Package expired on {new Date(booking.expiryDate).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No expired packages</h3>
                  <p className="text-muted-foreground">You don't have any expired packages</p>
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
