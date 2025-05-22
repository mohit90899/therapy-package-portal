
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Calendar, Package, User, Settings, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/utils/dummyData";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const DashboardSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const therapistItems: SidebarLinkProps[] = [
    { to: "/dashboard", icon: Settings, label: "Dashboard" },
    { to: "/therapist/packages", icon: Package, label: "My Packages" },
    { to: "/therapist/calendar", icon: Calendar, label: "Calendar" },
    { to: "/therapist/clients", icon: Users, label: "Clients" },
    { to: "/therapist/profile", icon: User, label: "Profile" }
  ];
  
  const adminItems: SidebarLinkProps[] = [
    { to: "/dashboard", icon: Settings, label: "Dashboard" },
    { to: "/admin/approval", icon: Package, label: "Package Approval" },
    { to: "/admin/therapists", icon: User, label: "Therapists" },
    { to: "/admin/clients", icon: Users, label: "Clients" }
  ];
  
  const clientItems: SidebarLinkProps[] = [
    { to: "/dashboard", icon: Settings, label: "Dashboard" },
    { to: "/client/packages", icon: Package, label: "Browse Packages" },
    { to: "/client/bookings", icon: Calendar, label: "My Bookings" },
    { to: "/client/profile", icon: User, label: "Profile" }
  ];
  
  let navigationItems: SidebarLinkProps[] = [];
  
  switch(currentUser.role) {
    case "therapist":
      navigationItems = therapistItems;
      break;
    case "admin":
      navigationItems = adminItems;
      break;
    case "client":
      navigationItems = clientItems;
      break;
  }

  return (
    <Sidebar 
      className={cn(
        "border-r h-screen transition-all duration-300 ease-in-out", 
        collapsed ? "w-16" : "w-64"
      )}
      collapsible
    >
      <div className="p-4 flex items-center justify-center mb-4">
        {collapsed ? (
          <Avatar>
            {currentUser.profileImage && <AvatarImage src={currentUser.profileImage} alt={currentUser.name} />}
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex items-center space-x-3">
            <Avatar>
              {currentUser.profileImage && <AvatarImage src={currentUser.profileImage} alt={currentUser.name} />}
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{currentUser.name}</span>
              <span className="text-xs text-muted-foreground capitalize">{currentUser.role}</span>
            </div>
          </div>
        )}
      </div>

      <SidebarTrigger className="absolute right-4 top-4" />
      
      <SidebarContent>
        <SidebarGroup defaultOpen>
          <SidebarGroupLabel className={cn(collapsed && "sr-only")}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.to}
                      className={cn(
                        "flex items-center py-2 px-3 rounded-md",
                        isActive(item.to) ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <div className={cn("mt-auto p-4", collapsed && "flex justify-center")}>
        <Link
          to="/"
          className={cn(
            "flex items-center text-destructive hover:text-destructive/80",
            collapsed ? "justify-center" : ""
          )}
        >
          {!collapsed && <span>Return to Site</span>}
          {collapsed && <span>🏠</span>}
        </Link>
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;
