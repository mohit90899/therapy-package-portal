
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { dummyPackages, dummyVouchers } from "@/utils/dummyData";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";

const paymentFormSchema = z.object({
  cardName: z.string().min(2, { message: "Name is required" }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits" }),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2}$/, { message: "Expiry must be in MM/YY format" }),
  cardCVV: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
  voucherCode: z.string().optional()
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const PaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const packageId = searchParams.get("packageId");
  const packageData = dummyPackages.find(pkg => pkg.id === packageId);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVV: "",
      voucherCode: ""
    }
  });
  
  const calculateTotal = () => {
    if (!packageData) return 0;
    
    const price = packageData.price;
    const discountAmount = voucherApplied ? (price * discount / 100) : 0;
    
    return price - discountAmount;
  };
  
  const applyVoucher = () => {
    const voucherCode = form.getValues("voucherCode");
    
    if (!voucherCode) {
      toast({
        title: "Error",
        description: "Please enter a voucher code",
        variant: "destructive"
      });
      return;
    }
    
    const voucher = dummyVouchers.find(v => v.code === voucherCode && v.isActive);
    
    if (!voucher) {
      toast({
        title: "Invalid Voucher",
        description: "The voucher code you entered is invalid or has expired",
        variant: "destructive"
      });
      return;
    }
    
    setVoucherApplied(true);
    setDiscount(voucher.discount);
    
    toast({
      title: "Voucher Applied",
      description: `${voucher.discount}% discount applied to your purchase`,
    });
  };
  
  const onSubmit = (data: PaymentFormValues) => {
    setIsSubmitting(true);
    
    // In a real application, this would call a payment processing API
    // For this demo, we'll simulate a payment process
    setTimeout(() => {
      console.log("Payment data:", data);
      
      toast({
        title: "Payment Successful!",
        description: "Your payment has been processed successfully. You can now schedule your sessions.",
      });
      
      navigate("/payment-success");
    }, 2000);
  };
  
  if (!packageData) {
    return (
      <MainLayout>
        <div className="container py-8 text-center">
          <h2 className="text-2xl font-bold">Package not found</h2>
          <p className="mt-2 mb-6">The therapy package you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/packages")}>Browse Packages</Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-8">
          Complete your purchase to book your therapy package
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Enter your card details to complete the purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="4242 4242 4242 4242" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="cardExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardCVV"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Voucher Code</h3>
                        <div className="flex space-x-2">
                          <FormField
                            control={form.control}
                            name="voucherCode"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input placeholder="Enter voucher code" {...field} disabled={voucherApplied} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={applyVoucher}
                            disabled={voucherApplied}
                          >
                            {voucherApplied ? "Applied" : "Apply"}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Processing..." : "Complete Payment"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">{packageData.title}</span>
                    <span>₹{packageData.price}</span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {packageData.sessions} sessions ({packageData.sessionDetails.map(s => `${s.duration} min`).join(', ')})
                    </p>
                  </div>
                  
                  {voucherApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>-₹{(packageData.price * discount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <div className="flex items-start">
                      <CreditCard className="h-4 w-4 mr-2 mt-0.5" />
                      <p>
                        Your payment is secure and encrypted. You will have full access to 
                        all sessions once payment is complete.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentPage;
