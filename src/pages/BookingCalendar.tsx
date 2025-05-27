
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CalendarIcon, Clock, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const BookingCalendar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const bookingId = searchParams.get("bookingId");
  const creditId = searchParams.get("creditId");
  const isReschedule = searchParams.get("reschedule") === "true";
  
  // Mock data - in real app, this would come from API
  const mockBooking = {
    id: bookingId,
    packageTitle: "Pre-Wedding Therapy Package",
    therapistName: "Dr. Sarah Johnson",
    therapistId: "therapist1"
  };
  
  const mockCredit = {
    id: creditId,
    title: "Conflict Resolution",
    description: "Managing disagreements constructively",
    duration: 60,
    sessionIndex: 2
  };
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Generate available time slots for the selected date
  const getAvailableTimeSlots = () => {
    // Simulated available slots - in a real application, these would come from the therapist's availability
    const slots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
    return slots;
  };
  
  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleConfirmBooking = () => {
    if (!date || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select both a date and time for your session.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, this would call an API to schedule the session
    toast({
      title: isReschedule ? "Session Rescheduled!" : "Session Scheduled!",
      description: `Your session has been ${isReschedule ? 'rescheduled' : 'scheduled'} for ${date.toLocaleDateString()} at ${selectedTime}.`,
    });
    
    navigate("/client/bookings");
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  if (!bookingId || !creditId) {
    return (
      <MainLayout>
        <div className="container py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              The booking or session credit information was not found.
              <div className="mt-4">
                <Button onClick={() => navigate("/client/bookings")}>
                  Return to My Bookings
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">
          {isReschedule ? 'Reschedule Your Session' : 'Schedule Your Session'}
        </h1>
        <p className="text-muted-foreground mb-8">
          Choose a date and time that works for you
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
                <CardDescription>Information about the session you're {isReschedule ? 'rescheduling' : 'booking'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Package</h3>
                  <p>{mockBooking.packageTitle}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Therapist</h3>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{mockBooking.therapistName}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium">Session</h3>
                  <p>{mockCredit.title}</p>
                  <p className="text-sm text-muted-foreground">Session {mockCredit.sessionIndex + 1}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Duration</h3>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{mockCredit.duration} minutes</span>
                  </div>
                </div>
                
                {mockCredit.description && (
                  <div>
                    <h3 className="font-medium">Description</h3>
                    <p className="text-sm">{mockCredit.description}</p>
                  </div>
                )}
                
                {isReschedule && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      You are rescheduling this session. Your previous time slot will be released.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose a date for your session</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => {
                    // Disable dates in the past and weekend days
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const day = date.getDay();
                    
                    return date < today || day === 0 || day === 6;
                  }}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Select Time Slot</CardTitle>
                <CardDescription>
                  {date ? (
                    <>Available times for {formatDate(date)}</>
                  ) : (
                    <>Please select a date first</>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {date ? (
                  <div className="grid grid-cols-3 gap-2">
                    {getAvailableTimeSlots().map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`h-auto py-4 ${selectedTime === time ? "bg-primary text-primary-foreground" : ""}`}
                        onClick={() => handleSelectTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p>Please select a date to view available time slots</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => navigate("/client/bookings")}>
                  Cancel
                </Button>
                <Button 
                  disabled={!selectedTime || !date}
                  onClick={handleConfirmBooking}
                >
                  {isReschedule ? 'Reschedule Session' : 'Confirm Booking'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingCalendar;
