
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SessionCredit, Booking } from "@/utils/types";
import { Calendar, Clock, CheckCircle, Play, RotateCcw } from "lucide-react";

interface SessionCreditsTrackerProps {
  booking: Booking;
  onBookSession: (creditId: string) => void;
  onRescheduleSession: (creditId: string) => void;
  onJoinSession: (creditId: string) => void;
  onViewRecording: (creditId: string) => void;
}

const SessionCreditsTracker = ({ 
  booking, 
  onBookSession, 
  onRescheduleSession, 
  onJoinSession,
  onViewRecording 
}: SessionCreditsTrackerProps) => {
  const completedSessions = booking.sessionCredits.filter(credit => credit.status === "completed").length;
  const progressPercentage = (completedSessions / booking.totalSessions) * 100;

  const getStatusIcon = (status: SessionCredit["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case "cancelled":
        return <RotateCcw className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: SessionCredit["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const canJoinSession = (credit: SessionCredit) => {
    if (credit.status !== "scheduled" || !credit.scheduledDate) return false;
    
    const sessionTime = new Date(credit.scheduledDate);
    const now = new Date();
    
    // Allow joining 15 minutes before and until 1 hour after the scheduled time
    const earliestJoinTime = new Date(sessionTime);
    earliestJoinTime.setMinutes(earliestJoinTime.getMinutes() - 15);
    
    const latestJoinTime = new Date(sessionTime);
    latestJoinTime.setMinutes(latestJoinTime.getMinutes() + 60);
    
    return now >= earliestJoinTime && now <= latestJoinTime;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Session Credits</span>
          <Badge variant="outline">
            {booking.remainingSessions} of {booking.totalSessions} remaining
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{completedSessions}/{booking.totalSessions} completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Your Sessions</h4>
          {booking.sessionCredits.map((credit, index) => (
            <div key={credit.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getStatusIcon(credit.status)}
                  <div className="flex-1">
                    <div className="font-medium">
                      {credit.title || `Session ${index + 1}`}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {credit.duration} minutes
                    </div>
                    {credit.description && (
                      <div className="text-sm mt-1">{credit.description}</div>
                    )}
                    {credit.scheduledDate && (
                      <div className="text-sm mt-1 text-blue-600">
                        Scheduled: {formatDate(credit.scheduledDate)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getStatusColor(credit.status)}>
                    {credit.status}
                  </Badge>
                  
                  <div className="flex gap-2">
                    {credit.status === "available" && (
                      <Button 
                        size="sm" 
                        onClick={() => onBookSession(credit.id)}
                      >
                        Book Now
                      </Button>
                    )}
                    
                    {credit.status === "scheduled" && (
                      <>
                        {canJoinSession(credit) && credit.zoomLink ? (
                          <Button 
                            size="sm"
                            onClick={() => onJoinSession(credit.id)}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Join
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onRescheduleSession(credit.id)}
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Reschedule
                          </Button>
                        )}
                      </>
                    )}
                    
                    {credit.status === "completed" && credit.recordingUrl && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onViewRecording(credit.id)}
                      >
                        View Recording
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {booking.remainingSessions === 0 && (
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <h4 className="font-medium text-green-800">Package Completed!</h4>
            <p className="text-sm text-green-600">
              You've used all sessions in this package. Consider booking another package for continued support.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionCreditsTracker;
