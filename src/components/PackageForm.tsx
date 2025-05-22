import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TherapyPackage, TherapySession } from "@/utils/types";
import { currentUser } from "@/utils/dummyData";
import { PlusCircle, Trash2, FileUp } from "lucide-react";

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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

// Make sure the duration is required in the session schema
const sessionSchema = z.object({
  duration: z.coerce.number().int().positive("Duration must be a positive integer"),
  title: z.string().optional(),
  description: z.string().optional(),
});

const packageFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  sessions: z.coerce.number().int().min(1, "Must have at least one session").max(20, "Maximum 20 sessions allowed"),
  sessionDetails: z.array(sessionSchema)
    .min(1, "Add at least one session detail")
    .refine(items => items.length > 0, {
      message: "You must provide details for at least one session",
    }),
  image: z.string().url("Must be a valid URL").optional(),
  tags: z.string().optional(),
  termsAndConditions: z.string().optional(),
  documents: z.array(z.object({
    title: z.string(),
    url: z.string().url("Must be a valid URL")
  })).optional(),
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
  const [documents, setDocuments] = useState<{title: string, url: string}[]>(
    initialData?.documents || []
  );

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      sessions: initialData?.sessions || 3,
      sessionDetails: initialData?.sessionDetails || [{ duration: 60 }], // Ensure duration is present
      image: initialData?.image || "",
      tags: initialData?.tags?.join(", ") || "",
      termsAndConditions: initialData?.termsAndConditions || "",
      documents: initialData?.documents || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sessionDetails",
  });
  
  const handleSubmit = (values: PackageFormValues) => {
    const tagsArray = values.tags 
      ? values.tags.split(",").map(tag => tag.trim()).filter(Boolean)
      : [];
      
    // Ensure all session details have a duration
    const sessionDetails: TherapySession[] = values.sessionDetails.map(session => ({
      duration: session.duration, // This is now required
      title: session.title,
      description: session.description,
    }));
      
    onSubmit({
      title: values.title,
      description: values.description,
      price: values.price,
      sessions: values.sessions,
      sessionDetails: sessionDetails,
      image: values.image,
      tags: tagsArray,
      therapistId: currentUser.id,
      therapistName: currentUser.name,
      termsAndConditions: values.termsAndConditions,
      documents: documents,
    });
  };

  const addDocument = () => {
    setDocuments([...documents, { title: "", url: "" }]);
  };

  const updateDocument = (index: number, field: "title" | "url", value: string) => {
    const updated = [...documents];
    updated[index][field] = value;
    setDocuments(updated);
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const [documentTitle, setDocumentTitle] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [documentError, setDocumentError] = useState("");

  const handleAddDocument = () => {
    if (!documentTitle || !documentUrl) {
      setDocumentError("Both title and URL are required");
      return;
    }

    try {
      new URL(documentUrl);
    } catch (_) {
      setDocumentError("Please enter a valid URL");
      return;
    }

    setDocuments([...documents, { title: documentTitle, url: documentUrl }]);
    setDocumentTitle("");
    setDocumentUrl("");
    setDocumentError("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Package" : "Create New Package"}</CardTitle>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            {/* Basic Package Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Package Information</h3>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Pre-Wedding Therapy Package" {...field} />
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
                    <FormDescription>
                      Provide a detailed description that helps clients understand what they'll gain
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Package Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
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
                        <Input 
                          type="number" 
                          min="1" 
                          max="20" 
                          step="1" 
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            field.onChange(value);
                            
                            // Adjust session details array length
                            const currentDetails = form.getValues("sessionDetails");
                            if (value > currentDetails.length) {
                              // Add more empty session details
                              for (let i = currentDetails.length; i < value; i++) {
                                append({ duration: 60 });
                              }
                            } else if (value < currentDetails.length) {
                              // Remove excess session details
                              for (let i = currentDetails.length; i > value; i--) {
                                remove(i - 1);
                              }
                            }
                          }}
                          value={field.value}
                        />
                      </FormControl>
                      <FormDescription>
                        Choose 1-20 sessions (common options: 3, 6, 9, 12)
                      </FormDescription>
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
                    <FormLabel>Package Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      Add an image that represents this therapy package
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />
            
            {/* Session Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Session Details</h3>
              <p className="text-sm text-muted-foreground">
                Define the duration and details for each session in this package
              </p>
              
              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-md space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Session {index + 1}</h4>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`sessionDetails.${index}.duration`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <FormControl>
                              <Input type="number" min="15" step="5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`sessionDetails.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Title (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Initial Assessment" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name={`sessionDetails.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Session Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="What will happen in this session..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
              
              {form.getValues("sessions") > fields.length && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ duration: 60 })}
                  className="w-full"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Session Details
                </Button>
              )}
            </div>

            <Separator />
            
            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Information</h3>
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="anxiety, couples, pre-wedding" {...field} />
                    </FormControl>
                    <FormDescription>
                      Comma-separated tags to help clients find your package
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="termsAndConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Terms and Conditions</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any special terms, cancellation policies, etc."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />
            
            {/* Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Package Documents</h3>
              <p className="text-sm text-muted-foreground">
                Add links to supplementary materials, worksheets, or resources
              </p>
              
              {documents.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Title</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{doc.title}</TableCell>
                        <TableCell className="truncate max-w-[200px]">
                          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {doc.url}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDocument(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormLabel>Document Title</FormLabel>
                    <Input 
                      placeholder="e.g., Pre-session Worksheet" 
                      value={documentTitle}
                      onChange={(e) => setDocumentTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <FormLabel>Document URL</FormLabel>
                    <Input 
                      placeholder="https://example.com/document.pdf" 
                      value={documentUrl}
                      onChange={(e) => setDocumentUrl(e.target.value)}
                    />
                  </div>
                </div>
                
                {documentError && (
                  <Alert variant="destructive">
                    <AlertDescription>{documentError}</AlertDescription>
                  </Alert>
                )}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddDocument}
                  className="w-full"
                >
                  <FileUp className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between space-x-2 border-t pt-6">
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
