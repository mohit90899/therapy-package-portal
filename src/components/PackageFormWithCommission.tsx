
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, DollarSign, Percent } from "lucide-react";
import { TherapyPackage, TherapySession } from "@/utils/types";

const packageFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.number().min(1, { message: "Price must be greater than 0" }),
  tags: z.string().optional(),
  termsAndConditions: z.string().optional(),
  benefits: z.string().optional(),
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

interface PackageFormWithCommissionProps {
  onSubmit: (data: Omit<TherapyPackage, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'therapistId' | 'therapistName'>) => void;
  onCancel: () => void;
  initialData?: Partial<TherapyPackage>;
  therapistName: string;
}

const PackageFormWithCommission = ({ onSubmit, onCancel, initialData, therapistName }: PackageFormWithCommissionProps) => {
  const [sessions, setSessions] = useState<TherapySession[]>(
    initialData?.sessionDetails || [{ duration: 60, title: "", description: "" }]
  );

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      tags: initialData?.tags?.join(", ") || "",
      termsAndConditions: initialData?.termsAndConditions || "",
      benefits: initialData?.benefits?.join(", ") || "",
    }
  });

  const watchedPrice = form.watch("price");
  const platformFeePercentage = 35;
  const platformFee = (watchedPrice * platformFeePercentage) / 100;
  const therapistEarnings = watchedPrice - platformFee;

  const addSession = () => {
    setSessions([...sessions, { duration: 60, title: "", description: "" }]);
  };

  const removeSession = (index: number) => {
    if (sessions.length > 1) {
      setSessions(sessions.filter((_, i) => i !== index));
    }
  };

  const updateSession = (index: number, field: keyof TherapySession, value: any) => {
    const updatedSessions = sessions.map((session, i) => 
      i === index ? { ...session, [field]: value } : session
    );
    setSessions(updatedSessions);
  };

  const handleSubmit = (data: PackageFormValues) => {
    const packageData = {
      title: data.title,
      description: data.description,
      price: data.price,
      sessions: sessions.length,
      sessionDetails: sessions.map((session, index) => ({
        ...session,
        sessionIndex: index
      })),
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()).filter(Boolean) : [],
      benefits: data.benefits ? data.benefits.split(",").map(benefit => benefit.trim()).filter(Boolean) : [],
      termsAndConditions: data.termsAndConditions,
      // Commission calculation
      platformFeePercentage,
      therapistEarnings,
      platformEarnings: platformFee
    };

    onSubmit(packageData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Therapy Package</CardTitle>
          <CardDescription>Design your therapy package with automatic commission calculation</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Basic package info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Pre-Wedding Therapy Package" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Price ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="299" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe what your package includes and who it's for..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Commission breakdown */}
              {watchedPrice > 0 && (
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Commission Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-primary">${watchedPrice.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">Package Price</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600">${therapistEarnings.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">Your Earnings (65%)</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">${platformFee.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">Platform Fee (35%)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Sessions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Sessions ({sessions.length})</h3>
                  <Button type="button" onClick={addSession} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Session
                  </Button>
                </div>

                <div className="space-y-4">
                  {sessions.map((session, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline">Session {index + 1}</Badge>
                          {sessions.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeSession(index)}
                              variant="ghost"
                              size="sm"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium">Duration (minutes)</label>
                            <Input
                              type="number"
                              value={session.duration}
                              onChange={(e) => updateSession(index, 'duration', Number(e.target.value))}
                              placeholder="60"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Session Title</label>
                            <Input
                              value={session.title || ""}
                              onChange={(e) => updateSession(index, 'title', e.target.value)}
                              placeholder="e.g., Introduction & Assessment"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Description</label>
                            <Input
                              value={session.description || ""}
                              onChange={(e) => updateSession(index, 'description', e.target.value)}
                              placeholder="Session focus..."
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Additional fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (comma separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="anxiety, couples, pre-wedding" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefits (comma separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="Flexible scheduling, Expert guidance" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="termsAndConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Terms and Conditions</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Package terms, cancellation policy, etc."
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create Package
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageFormWithCommission;
