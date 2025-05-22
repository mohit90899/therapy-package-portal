
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TherapyPackage } from "@/utils/types";
import { cn } from "@/lib/utils";
import { Clock, FileText } from "lucide-react";

interface PackageCardProps {
  pkg: TherapyPackage;
  actionText?: string;
  onAction?: (id: string) => void;
  showStatus?: boolean;
  className?: string;
}

const PackageCard = ({
  pkg,
  actionText = "View Details",
  onAction,
  showStatus = false,
  className,
}: PackageCardProps) => {
  const { id, title, description, price, sessions, therapistName, status, tags, sessionDetails } = pkg;

  // Calculate total duration across all sessions
  const totalDuration = sessionDetails?.reduce((sum, session) => sum + (session.duration || 0), 0) || 0;
  
  // Calculate average session duration
  const avgDuration = sessionDetails?.length 
    ? Math.round(totalDuration / sessionDetails.length) 
    : 0;

  const getStatusColor = (status: TherapyPackage["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className={cn("h-full package-card-hover", className)}>
      {pkg.image && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <img 
            src={pkg.image} 
            alt={title} 
            className="object-cover w-full h-full"
          />
          {showStatus && status && (
            <div className={cn("absolute top-2 right-2 px-2 py-1 text-xs rounded-full", getStatusColor(status))}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          )}
        </div>
      )}
      
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>By {therapistName}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Price</span>
            <span className="font-medium">${price}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Avg. Duration</span>
            <span className="font-medium">{avgDuration} min</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Sessions</span>
            <span className="font-medium">{sessions}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Total Time</span>
            <span className="font-medium">{Math.round(totalDuration / 60)} hrs</span>
          </div>
        </div>
        
        {pkg.documents && pkg.documents.length > 0 && (
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <FileText className="h-3 w-3 mr-1" />
            <span>{pkg.documents.length} document{pkg.documents.length !== 1 ? 's' : ''}</span>
          </div>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onAction && onAction(id)}
        >
          {actionText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;
