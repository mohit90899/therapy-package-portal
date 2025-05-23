
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BookingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Therapy Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            View and manage your booked therapy sessions here.
          </p>
          <Button asChild>
            <Link to="/client/bookings">Go to My Bookings</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsTab;
