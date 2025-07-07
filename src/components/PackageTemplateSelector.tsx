
import { useState } from "react";
import { PackageTemplate } from "@/utils/types";
import { packageTemplates, getTemplatesByCategory } from "@/utils/packageTemplates";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Users, Clock, DollarSign } from "lucide-react";

interface PackageTemplateSelectorProps {
  onSelectTemplate: (template: PackageTemplate) => void;
  onSkip: () => void;
}

const PackageTemplateSelector = ({ onSelectTemplate, onSkip }: PackageTemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<PackageTemplate | null>(null);
  
  const categories = [...new Set(packageTemplates.map(t => t.category))];
  
  const TemplateCard = ({ template }: { template: PackageTemplate }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{template.name}</CardTitle>
            <CardDescription className="mt-2">{template.description}</CardDescription>
          </div>
          <Badge variant="secondary">{template.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{template.suggestedSessions} sessions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{template.defaultSessionDetails.reduce((acc, s) => acc + s.duration, 0)} mins total</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>${template.samplePrice}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {template.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{template.name}</DialogTitle>
                <DialogDescription>{template.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{template.suggestedSessions} Sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Suggested Price: ${template.samplePrice}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Session Breakdown:</h4>
                  <div className="space-y-2">
                    {template.defaultSessionDetails.map((session, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium">Session {index + 1}: {session.title}</h5>
                          <Badge variant="outline">{session.duration} mins</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{session.description}</p>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{session.participantDetails}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => onSelectTemplate(template)} 
                  className="w-full"
                >
                  Use This Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            onClick={() => onSelectTemplate(template)} 
            size="sm" 
            className="flex-1"
          >
            Use Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose a Package Template</h2>
        <p className="text-muted-foreground mb-4">
          Start with one of our pre-designed templates or create from scratch
        </p>
        <Button variant="outline" onClick={onSkip}>
          Skip Templates - Create From Scratch
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category.toLowerCase()}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packageTemplates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </TabsContent>
        
        {categories.map(category => (
          <TabsContent key={category} value={category.toLowerCase()} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getTemplatesByCategory(category).map(template => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PackageTemplateSelector;
