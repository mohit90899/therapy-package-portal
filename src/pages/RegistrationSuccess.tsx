
import { Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const RegistrationSuccess = () => {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-12 px-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Application Submitted!</h1>
            <p className="text-muted-foreground mb-4">
              Thank you for applying to join TherapyPlus as a therapist. Our team will review your application and get back to you within 2-3 business days.
            </p>
            <div className="bg-muted p-4 rounded-md text-left mt-6">
              <h3 className="font-medium mb-2">What happens next?</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Our team reviews your application and credentials</li>
                <li>We may contact you for additional information or clarification</li>
                <li>Once approved, you'll receive an email with next steps</li>
                <li>Complete your onboarding and set up your available hours</li>
                <li>Start creating therapy packages and accepting clients!</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RegistrationSuccess;
