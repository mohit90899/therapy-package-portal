
import { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Calendar as CalendarIcon, Video } from "lucide-react";

const TherapistCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  
  // Sample sessions data
  const upcomingSessions = [
    {
      id: "sess001",
      clientName: "Emily Johnson",
      packageName: "Pre-Wedding Therapy",
      date: new Date(2023, 7, 15, 10, 0),
      duration: 60,
      status: "scheduled",
      zoomLink: "https://zoom.us/j/123456789"
    },
    {
      id: "sess002",
      clientName: "David Wilson",
      packageName: "Job Interview Preparation",
      date: new Date(2023, 7, 15, 14, 0),
      duration: 45,
      status: "scheduled",
      zoomLink: "https://zoom.us/j/987654321"
    },
    {
      id: "sess003",
      clientName: "Sarah Miller",
      packageName: "Parenting Support Package",
      date: new Date(2023, 7, 16, 11, 30),
      duration: 60,
      status: "scheduled",
      zoomLink: "https://zoom.us/j/567891234"
    }
  ];
  
  // Generate time slots for the selected date
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      const formattedHour = hour.toString().padStart(2, "0");
      slots.push(`${formattedHour}:00`);
      slots.push(`${formattedHour}:30`);
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  // Toggle time slot selection
  const toggleTimeSlot = (time: string) => {
    if (selectedHours.includes(time)) {
      setSelectedHours(selectedHours.filter(h => h !== time));
    } else {
      setSelectedHours([...selectedHours, time]);
    }
  };
  
  // Check if a time slot is booked
  const isBooked = (time: string) => {
    if (!date) return false;
    
    const [hours, minutes] = time.split(':').map(Number);
    const slotDate = new Date(date);
    slotDate.setHours(hours, minutes);
    
    return upcomingSessions.some(session => {
      const sessionDate = new Date(session.date);
      return (
        sessionDate.getDate() === slotDate.getDate() &&
        sessionDate.getMonth() === slotDate.getMonth() &&
        sessionDate.getFullYear() === slotDate.getFullYear() &&
        sessionDate.getHours() === slotDate.getHours() &&
        sessionDate.getMinutes() === slotDate.getMinutes()
      );
    });
  };
  
  // Get session details for a specific time
  const getSessionDetails = (time: string) => {
    if (!date) return null;
    
    const [hours, minutes] = time.split(':').map(Number);
    const slotDate = new Date(date);
    slotDate.setHours(hours, minutes);
    
    return upcomingSessions.find(session => {
      const sessionDate = new Date(session.date);
      return (
        sessionDate.getDate() === slotDate.getDate() &&
        sessionDate.getMonth() === slotDate.getMonth() &&
        sessionDate.getFullYear() === slotDate.getFullYear() &&
        sessionDate.getHours() === slotDate.getHours() &&
        sessionDate.getMinutes() === slotDate.getMinutes()
      );
    });
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
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule and availability
          </p>
        </div>
        
        <Tabs defaultValue="calendar">
          <TabsList>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="schedule">Set Availability</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {date ? formatDate(date) : "Select a date"}
                  </CardTitle>
                  <CardDescription>
                    Sessions scheduled for the selected date
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {date ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((time) => {
                          const booked = isBooked(time);
                          const session = getSessionDetails(time);
                          
                          return (
                            <Button
                              key={time}
                              variant={booked ? "default" : "outline"}
                              className={`h-auto py-4 ${booked ? "bg-primary text-primary-foreground" : ""}`}
                              disabled={booked}
                            >
                              <div>
                                <div className="font-medium">{time}</div>
                                {booked && session && (
                                  <div className="text-xs mt-1">{session.clientName}</div>
                                )}
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">Sessions for {formatDate(date)}</h3>
                        {upcomingSessions.filter(session => {
                          const sessionDate = new Date(session.date);
                          return (
                            sessionDate.getDate() === date.getDate() &&
                            sessionDate.getMonth() === date.getMonth() &&
                            sessionDate.getFullYear() === date.getFullYear()
                          );
                        }).length > 0 ? (
                          <div className="space-y-2">
                            {upcomingSessions.filter(session => {
                              const sessionDate = new Date(session.date);
                              return (
                                sessionDate.getDate() === date.getDate() &&
                                sessionDate.getMonth() === date.getMonth() &&
                                sessionDate.getFullYear() === date.getFullYear()
                              );
                            }).map(session => {
                              const sessionDate = new Date(session.date);
                              const hours = sessionDate.getHours().toString().padStart(2, '0');
                              const minutes = sessionDate.getMinutes().toString().padStart(2, '0');
                              
                              return (
                                <div key={session.id} className="flex items-center justify-between bg-muted p-3 rounded-md">
                                  <div>
                                    <div className="font-medium">{`${hours}:${minutes} - ${session.clientName}`}</div>
                                    <div className="text-sm text-muted-foreground">{session.packageName} ({session.duration} min)</div>
                                  </div>
                                  <a href={session.zoomLink} target="_blank" rel="noreferrer">
                                    <Button variant="outline" size="sm">
                                      <Video className="h-4 w-4 mr-2" />
                                      Join
                                    </Button>
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No sessions scheduled for this date.</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-40">
                      <p className="text-muted-foreground">Select a date to view sessions</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Set Your Availability</CardTitle>
                <CardDescription>
                  Select the hours you're available to take sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                    
                    <div className="mt-4">
                      <h3 className="font-medium mb-2">Your Schedule</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedHours.map(hour => (
                          <Badge key={hour} variant="secondary">
                            {hour}
                            <button 
                              className="ml-1 text-muted-foreground hover:text-foreground" 
                              onClick={() => toggleTimeSlot(hour)}
                            >
                              ✕
                            </button>
                          </Badge>
                        ))}
                        {selectedHours.length === 0 && (
                          <p className="text-sm text-muted-foreground">No hours selected for this date.</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button>Save Availability</Button>
                      <Button variant="outline" className="ml-2">Copy to Next Week</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Select Available Hours</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Click on time slots to mark when you're available for sessions
                    </p>
                    
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedHours.includes(time) ? "default" : "outline"}
                          className={`h-auto py-2 ${selectedHours.includes(time) ? "bg-primary text-primary-foreground" : ""}`}
                          onClick={() => toggleTimeSlot(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>
                  View and manage your upcoming therapy sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map(session => {
                    const sessionDate = new Date(session.date);
                    
                    return (
                      <div key={session.id} className="border rounded-md p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{session.packageName}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              {formatDate(sessionDate)} at {sessionDate.getHours().toString().padStart(2, '0')}:
                              {sessionDate.getMinutes().toString().padStart(2, '0')}
                            </div>
                            <div className="flex items-center text-sm mt-1">
                              <User className="h-4 w-4 mr-1" />
                              {session.clientName}
                            </div>
                            <div className="mt-2">
                              <Badge variant="outline">
                                {session.duration} minutes
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <a href={session.zoomLink} target="_blank" rel="noreferrer">
                              <Button variant="default" size="sm">
                                <Video className="h-4 w-4 mr-2" />
                                Join Session
                              </Button>
                            </a>
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TherapistCalendar;
