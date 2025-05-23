
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/utils/types";

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <Card className="w-full md:w-1/3">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="h-32 w-32">
          {user.profileImage && <AvatarImage src={user.profileImage} alt={user.name} />}
          <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-xl font-medium">{user.name}</h2>
          <p className="text-muted-foreground capitalize">{user.role}</p>
        </div>
        <Button variant="outline" size="sm">
          Change Photo
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
