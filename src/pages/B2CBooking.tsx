
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock, User, CreditCard, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const B2CBooking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const therapistId = searchParams.get("therapistId") || "therapist1";
  
  // Mock therapist data
  const therapist = {
    id: therapistId,
    name: "Dr. Sarah Johnson",
    specialties: ["Relationship Counseling", "Anxiety Management", "Career Guidance"],
    hourlyRate: 150,
    bio: "Licensed clinical psychologist with 10+ years of experience"
  };
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(60);
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionDescription, setSessionDescription] = useState("");
  
  const platformFeePercentage = 35;
  const sessionPrice = (therapist.hourlyRate * duration) / 60;
  const platformFee = (sessionPrice * platformFeePercentage) / 100;
  const therapistEarnings = sessionPrice - platformFee;
  
  const getAvailableTimeSlots = () => {
    return ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
  };
  
  const handleBookAndPay = () => {
    if (!date || !selectedTime || !sessionTitle.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including session title.",
        variant: "destructive"
      });
      return;
    }
    
    // Create B2C booking and redirect to payment
    const bookingData = {
      therapistId: therapist.id,
      therapistName: therapist.name,
      sessionTitle,
      sessionDescription,
      duration,
      price: sessionPrice,
      scheduledDate: `${date.toISOString().split('T')[0]}T${selectedTime}:00`,
      platformFee,
      therapistEarnings
    };
    
    // In real app, this would create the booking and redirect to payment
    toast({
      title: "Booking Created!",
      description: "Redirecting to payment...",
    });
    
    // Simulate payment redirect
    navigate(`/payment/b2c?bookingData=${encodeURIComponent(JSON.stringify(bookingData))}`);
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Book a Session</h1>
        <p className="text-muted-foreground mb-8">
          Pay-per-session booking with immediate scheduling
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
                <CardDescription>Provide details about your session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sessionTitle">Session Title *</Label>
                  <Input
                    id="sessionTitle"
                    placeholder="e.g., Anxiety Management Session"
                    value={sessionTitle}
                    onChange={(e) => setSessionTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="sessionDescription">Session Description (Optional)</Label>
                  <Textarea
                    id="sessionDescription"
                    placeholder="Describe what you'd like to focus on in this session"
                    value={sessionDescription}
                    onChange={(e) => setSessionDescription(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration">Session Duration</Label>
                  <select 
                    id="duration"
                    className="w-full p-2 border rounded-md"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                  >
                    <option value={30}>30 minutes - ${(therapist.hourlyRate * 30) / 60}</option>
                    <option value={45}>45 minutes - ${(therapist.hourlyRate * 45) / 60}</option>
                    <option value={60}>60 minutes - ${therapist.hourlyRate}</option>
                    <option value={90}>90 minutes - ${(therapist.hourlyRate * 90) / 60}</option>
                  </select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose when you'd like to have your session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const day = date.getDay();
                    return date < today || day === 0 || day === 6;
                  }}
                />
                
                {date && (
                  <div>
                    <h3 className="font-medium mb-2">Available Times for {formatDate(date)}</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {getAvailableTimeSlots().map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Therapist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    <span className="font-medium">{therapist.name}</span>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {therapist.specialties.map(specialty => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{therapist.bio}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span>{duration} minutes</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Session Fee</span>
                    <span>${sessionPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Platform Fee ({platformFeePercentage}%)</span>
                    <span>${platformFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Therapist Earnings</span>
                    <span>${therapistEarnings.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${sessionPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {date && selectedTime && (
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <div className="flex items-center mb-1">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span className="font-medium">Scheduled for:</span>
                      </div>
                      <p>{formatDate(date)} at {selectedTime}</p>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 p-3 rounded-md text-sm">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">Pay & Book Instantly</p>
                        <p className="text-blue-700">
                          Payment is processed immediately and your session is confirmed upon successful payment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  onClick={handleBookAndPay}
                  disabled={!date || !selectedTime || !sessionTitle.trim()}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay & Book Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default B2CBooking;
