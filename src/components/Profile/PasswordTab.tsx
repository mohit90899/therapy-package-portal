
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PasswordChangeForm from "./PasswordChangeForm";

const PasswordTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <PasswordChangeForm />
      </CardContent>
    </Card>
  );
};

export default PasswordTab;
