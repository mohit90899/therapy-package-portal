
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TherapyPackage } from "@/utils/types";
import { currentUser } from "@/utils/dummyData";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const packageFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  duration: z.coerce.number().int().positive("Duration must be a positive integer"),
  sessions: z.coerce.number().int().positive("Sessions must be a positive integer"),
  image: z.string().url("Must be a valid URL").optional(),
  tags: z.string().optional(),
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

interface PackageFormProps {
  initialData?: Partial<TherapyPackage>;
  onSubmit: (data: Omit<TherapyPackage, "id" | "status" | "createdAt" | "updatedAt">) => void;
  isLoading?: boolean;
  submitText?: string;
}

const PackageForm = ({
  initialData,
  onSubmit,
  isLoading = false,
  submitText = "Create Package",
}: PackageFormProps) => {
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      duration: initialData?.duration || 60,
      sessions: initialData?.sessions || 1,
      image: initialData?.image || "",
      tags: initialData?.tags?.join(", ") || "",
    },
  });
  
  const handleSubmit = (values: PackageFormValues) => {
    const tagsArray = values.tags 
      ? values.tags.split(",").map(tag => tag.trim()).filter(Boolean)
      : [];
      
    onSubmit({
      title: values.title,
      description: values.description,
      price: values.price,
      duration: values.duration,
      sessions: values.sessions,
      image: values.image,
      tags: tagsArray,
      therapistId: currentUser.id,
      therapistName: currentUser.name,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Package" : "Create New Package"}</CardTitle>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Stress Relief Package" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what clients will get from this package..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" min="15" step="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sessions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Sessions</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a URL to an image that represents this package
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="anxiety, stress, meditation" {...field} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of tags
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : submitText}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default PackageForm;
