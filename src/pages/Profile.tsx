
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser } from "@/utils/dummyData";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import GeneralInfoTab from "@/components/Profile/GeneralInfoTab";
import PasswordTab from "@/components/Profile/PasswordTab";
import BookingsTab from "@/components/Profile/BookingsTab";
import ProfessionalInfoTab from "@/components/Profile/ProfessionalInfoTab";
import NotificationsTab from "@/components/Profile/NotificationsTab";

const Profile = () => {
  // Determine which tabs to show based on user role
  const showProfessionalTab = currentUser.role === 'therapist';
  const showBookingsTab = currentUser.role === 'client';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and profile information
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <ProfileHeader user={currentUser} />
          
          <div className="flex-1">
            <Tabs defaultValue="general">
              <TabsList className="mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                {showProfessionalTab && (
                  <TabsTrigger value="professional">Professional Info</TabsTrigger>
                )}
                {showBookingsTab && (
                  <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                )}
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <GeneralInfoTab user={currentUser} />
              </TabsContent>
              
              <TabsContent value="password">
                <PasswordTab />
              </TabsContent>
              
              {showBookingsTab && (
                <TabsContent value="bookings">
                  <BookingsTab />
                </TabsContent>
              )}
              
              {showProfessionalTab && (
                <TabsContent value="professional">
                  <ProfessionalInfoTab user={currentUser} />
                </TabsContent>
              )}
              
              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
