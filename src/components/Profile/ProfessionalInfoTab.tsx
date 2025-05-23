
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/utils/types";

interface ProfessionalInfoTabProps {
  user: User;
}

const ProfessionalInfoTab = ({ user }: ProfessionalInfoTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Specialties</label>
            <div className="flex flex-wrap gap-2">
              {user.specialties?.map((specialty, i) => (
                <span key={i} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                  {specialty}
                </span>
              ))}
            </div>
            <Button variant="link" className="mt-2 h-auto p-0">+ Add specialty</Button>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Credentials</label>
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground mb-2">Upload your professional licenses and certifications</p>
              <div className="flex items-center justify-between bg-muted p-2 rounded">
                <span className="text-sm">Therapist-License.pdf</span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <Button variant="outline" size="sm" className="mt-4">Upload New</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalInfoTab;
