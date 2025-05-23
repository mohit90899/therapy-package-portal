
import { Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <MainLayout>
      <div className="container max-w-md py-12 px-4">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto my-4 bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>Your therapy package purchase is complete</CardDescription>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <p>
              Thank you for your purchase. Your therapy package is now ready to use.
            </p>
            
            <div className="bg-muted p-4 rounded-md text-left">
              <h3 className="font-medium mb-2">Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Go to "My Bookings" to view your new package</li>
                <li>Schedule your first session at a time that works for you</li>
                <li>Prepare for your session and join via the provided Zoom link when it's time</li>
                <li>After each session, you can schedule your next one</li>
              </ol>
            </div>
            
            <div className="border border-green-200 rounded-md p-4 mt-6">
              <p className="text-sm text-green-600">
                We've sent a confirmation email with all the details of your purchase.
                If you don't receive it within a few minutes, please check your spam folder.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/">
                Return to Home
              </Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link to="/client/bookings">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Sessions
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PaymentSuccess;
