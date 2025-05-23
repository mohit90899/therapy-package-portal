
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GeneralInfoForm from "./GeneralInfoForm";
import { User } from "@/utils/types";

interface GeneralInfoTabProps {
  user: User;
}

const GeneralInfoTab = ({ user }: GeneralInfoTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>
      <CardContent>
        <GeneralInfoForm user={user} />
      </CardContent>
    </Card>
  );
};

export default GeneralInfoTab;
