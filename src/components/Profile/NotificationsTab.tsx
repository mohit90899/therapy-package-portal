
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotificationsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Session Reminders</h4>
              <p className="text-sm text-muted-foreground">Receive reminders before your upcoming sessions</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Marketing Emails</h4>
              <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
            </div>
            <input type="checkbox" />
          </div>
          
          <Button>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
