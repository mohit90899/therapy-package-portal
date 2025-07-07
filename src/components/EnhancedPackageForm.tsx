
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, DollarSign, Upload, FileText, Video, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { TherapyPackage, TherapySession, PackageTemplate } from "@/utils/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

const packageFormSchema = z.object({
  title: z.string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  description: z.string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description cannot exceed 500 characters" }),
  price: z.number().min(1, { message: "Price must be greater than 0" }),
  category: z.string().min(1, { message: "Please select a category" }),
  languages: z.array(z.string()).min(1, { message: "Please select at least one language" }),
  mode: z.enum(["video", "audio+video"]),
  maxParticipants: z.number().min(1).max(10),
  tags: z.string().optional(),
  termsAndConditions: z.string().optional(),
  benefits: z.string().optional(),
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

interface EnhancedPackageFormProps {
  onSubmit: (data: Omit<TherapyPackage, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'therapistId' | 'therapistName'>) => void;
  onCancel: () => void;
  initialData?: Partial<TherapyPackage>;
  selectedTemplate?: PackageTemplate;
  therapistName: string;
}

const EnhancedPackageForm = ({ onSubmit, onCancel, initialData, selectedTemplate, therapistName }: EnhancedPackageFormProps) => {
  const [sessions, setSessions] = useState<TherapySession[]>(
    selectedTemplate?.defaultSessionDetails || 
    initialData?.sessionDetails || 
    [{ duration: 60, title: "", description: "", participants: "individual" }]
  );
  
  const [files, setFiles] = useState<Array<{title: string, url: string, type: 'pdf' | 'video' | 'image' | 'link'}>>([]);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image || "");

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      title: selectedTemplate?.name || initialData?.title || "",
      description: selectedTemplate?.description || initialData?.description || "",
      price: selectedTemplate?.samplePrice || initialData?.price || 0,
      category: selectedTemplate?.category || initialData?.category || "",
      languages: initialData?.languages || ["English"],
      mode: initialData?.mode || "video",
      maxParticipants: initialData?.maxParticipants || 2,
      tags: selectedTemplate?.tags?.join(", ") || initialData?.tags?.join(", ") || "",
      termsAndConditions: initialData?.termsAndConditions || "",
      benefits: initialData?.benefits?.join(", ") || "",
    }
  });

  const watchedPrice = form.watch("price");
  const platformFeePercentage = 35;
  const platformFee = (watchedPrice * platformFeePercentage) / 100;
  const therapistEarnings = watchedPrice - platformFee;

  const categories = [
    "Relationship", "Career", "Family", "Education", "Health", "Personal Development", "Anxiety", "Depression", "Other"
  ];

  const languages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", "Mandarin", "Hindi", "Arabic", "Japanese"
  ];

  const durations = [30, 45, 60, 90, 120];
  const participantOptions = [
    { value: "individual", label: "Individual" },
    { value: "couple", label: "Couple" },
    { value: "family", label: "Family" },
    { value: "custom", label: "Custom" }
  ];

  const addSession = () => {
    setSessions([...sessions, { duration: 60, title: "", description: "", participants: "individual" }]);
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

  const addFile = () => {
    setFiles([...files, { title: "", url: "", type: "pdf" }]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const updateFile = (index: number, field: string, value: string) => {
    const updatedFiles = files.map((file, i) => 
      i === index ? { ...file, [field]: value } : file
    );
    setFiles(updatedFiles);
  };

  const handleSubmit = (data: PackageFormValues) => {
    const packageData = {
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      languages: data.languages,
      mode: data.mode,
      maxParticipants: data.maxParticipants,
      sessions: sessions.length,
      sessionDetails: sessions.map((session, index) => ({
        ...session,
        sessionIndex: index
      })),
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()).filter(Boolean) : [],
      benefits: data.benefits ? data.benefits.split(",").map(benefit => benefit.trim()).filter(Boolean) : [],
      termsAndConditions: data.termsAndConditions,
      image: imagePreview,
      files: files.filter(f => f.title && f.url),
      // Commission calculation
      platformFeePercentage,
      therapistEarnings,
      platformEarnings: platformFee,
      // Analytics initialization
      viewCount: 0,
      saveCount: 0,
      soldCount: 0,
      averageRating: 0,
      reviewCount: 0
    };

    onSubmit(packageData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedTemplate ? `Creating: ${selectedTemplate.name}` : "Create Therapy Package"}
          </CardTitle>
          <CardDescription>
            {selectedTemplate 
              ? "Customize this template to match your practice style" 
              : "Design your comprehensive therapy package"
            }
          </CardDescription>
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
                        <Input 
                          placeholder="e.g., Pre-Wedding Therapy Package" 
                          {...field} 
                          maxLength={100}
                        />
                      </FormControl>
                      <FormDescription>{field.value?.length || 0}/100 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        maxLength={500}
                      />
                    </FormControl>
                    <FormDescription>{field.value?.length || 0}/500 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Package settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                <FormField
                  control={form.control}
                  name="mode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Mode</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="video">Video Only</SelectItem>
                          <SelectItem value="audio+video">Audio + Video</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxParticipants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Participants</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="10" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Languages */}
              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Languages Available</FormLabel>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                      {languages.map(language => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={field.value?.includes(language)}
                            onCheckedChange={(checked) => {
                              const updatedLanguages = checked
                                ? [...(field.value || []), language]
                                : field.value?.filter(l => l !== language) || [];
                              field.onChange(updatedLanguages);
                            }}
                          />
                          <label htmlFor={language} className="text-sm">
                            {language}
                          </label>
                        </div>
                      ))}
                    </div>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="text-sm font-medium">Duration</label>
                            <Select
                              value={session.duration.toString()}
                              onValueChange={(value) => updateSession(index, 'duration', Number(value))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {durations.map(duration => (
                                  <SelectItem key={duration} value={duration.toString()}>
                                    {duration} minutes
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Session Title</label>
                            <Input
                              value={session.title || ""}
                              onChange={(e) => updateSession(index, 'title', e.target.value)}
                              placeholder="e.g., Introduction & Assessment"
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="text-sm font-medium">Description</label>
                          <Textarea
                            value={session.description || ""}
                            onChange={(e) => updateSession(index, 'description', e.target.value)}
                            placeholder="What will be covered in this session?"
                            className="mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Participants</label>
                            <Select
                              value={session.participants || "individual"}
                              onValueChange={(value) => updateSession(index, 'participants', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {participantOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Participant Details</label>
                            <Input
                              value={session.participantDetails || ""}
                              onChange={(e) => updateSession(index, 'participantDetails', e.target.value)}
                              placeholder="e.g., Both bride and bridegroom"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Files and Resources */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Files & Resources</h3>
                  <Button type="button" onClick={addFile} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add File
                  </Button>
                </div>

                {files.map((file, index) => (
                  <Card key={index} className="mb-4">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">Resource {index + 1}</Badge>
                        <Button
                          type="button"
                          onClick={() => removeFile(index)}
                          variant="ghost"
                          size="sm"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium">Type</label>
                          <Select
                            value={file.type}
                            onValueChange={(value) => updateFile(index, 'type', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  PDF Document
                                </div>
                              </SelectItem>
                              <SelectItem value="video">
                                <div className="flex items-center gap-2">
                                  <Video className="h-4 w-4" />
                                  Video
                                </div>
                              </SelectItem>
                              <SelectItem value="image">
                                <div className="flex items-center gap-2">
                                  <ImageIcon className="h-4 w-4" />
                                  Image
                                </div>
                              </SelectItem>
                              <SelectItem value="link">
                                <div className="flex items-center gap-2">
                                  <LinkIcon className="h-4 w-4" />
                                  Link
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Title</label>
                          <Input
                            value={file.title}
                            onChange={(e) => updateFile(index, 'title', e.target.value)}
                            placeholder="Resource title"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">URL</label>
                          <Input
                            value={file.url}
                            onChange={(e) => updateFile(index, 'url', e.target.value)}
                            placeholder="File URL or link"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                        placeholder="Package terms, cancellation policy, refund policy, etc."
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Package Preview Alert */}
              <Alert>
                <AlertDescription>
                  Once submitted, your package will be reviewed by our team. You'll be notified once it's approved 
                  and available for purchase by clients.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit for Review
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedPackageForm;
