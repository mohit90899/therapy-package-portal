
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, User } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";

const therapistFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  phone: z.string().min(8, { message: "Please enter a valid phone number." }),
  bio: z.string().min(50, { message: "Bio must be at least 50 characters." }),
  specialties: z.string().min(5, { message: "Please list at least one specialty." }),
  address: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type TherapistFormValues = z.infer<typeof therapistFormSchema>;

const TherapistRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const form = useForm<TherapistFormValues>({
    resolver: zodResolver(therapistFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      bio: "",
      specialties: "",
      address: "",
    },
  });

  function onSubmit(data: TherapistFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      
      toast({
        title: "Application submitted!",
        description: "Your application to become a therapist has been submitted. We'll review it and get back to you soon.",
      });
      
      setIsSubmitting(false);
      navigate("/registration-success");
    }, 1500);
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Become a Therapist on TherapyPlus</h1>
        
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`flex items-center justify-center rounded-full w-10 h-10 ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-gray-200"
                }`}
              >
                {step > s ? <CheckIcon className="h-5 w-5" /> : s}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Account</span>
            <span>Profile</span>
            <span>Verification</span>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Create your therapist account"}
              {step === 2 && "Complete your professional profile"}
              {step === 3 && "Verification and documents"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Enter your basic information to get started"}
              {step === 2 && "Tell us about your expertise and specialties"}
              {step === 3 && "Final step to complete your registration"}
            </CardDescription>
          </CardHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Create a password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                
                {step === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your professional background, education, and approach to therapy" 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            This will be displayed on your public profile.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="specialties"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialties</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Anxiety, Depression, Couples Therapy (comma separated)" {...field} />
                          </FormControl>
                          <FormDescription>
                            List your areas of expertise, separated by commas.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Office Address (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter your office address if you offer in-person sessions" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                {step === 3 && (
                  <>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">License/Certification</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload your professional license or certification document
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button type="button" variant="outline" size="sm">Choose File</Button>
                          <span className="text-sm text-muted-foreground">No file chosen</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Profile Photo</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload a professional headshot for your profile
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button type="button" variant="outline" size="sm">Choose Image</Button>
                          <span className="text-sm text-muted-foreground">No image chosen</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">ID Verification</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload a government-issued ID for verification
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button type="button" variant="outline" size="sm">Choose File</Button>
                          <span className="text-sm text-muted-foreground">No file chosen</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 mt-6">
                        <input type="checkbox" id="terms" className="mt-1" />
                        <label htmlFor="terms" className="text-sm">
                          I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and 
                          confirm that all information provided is accurate and complete.
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" onClick={() => setStep(step + 1)}>
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TherapistRegister;
