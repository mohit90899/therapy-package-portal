
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TherapyPackage } from "@/utils/types";
import { cn } from "@/lib/utils";

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
  const { id, title, description, price, duration, sessions, therapistName, status, tags } = pkg;

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
            <span className="text-xs text-muted-foreground">Duration</span>
            <span className="font-medium">{duration} min</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Sessions</span>
            <span className="font-medium">{sessions}</span>
          </div>
        </div>
        
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
