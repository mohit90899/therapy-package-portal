
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User } from "@/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@/utils/dummyData";
import { PackageIcon, UserIcon, CalendarIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-react";

interface NavbarProps {
  user?: User;
}

const Navbar = ({ user = currentUser }: NavbarProps) => {
  return (
    <nav className="bg-white border-b px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            TherapyPlus
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/packages" className="text-foreground hover:text-primary transition-colors">
            Packages
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2">
                  <Avatar>
                    {user.profileImage && <AvatarImage src={user.profileImage} alt={user.name} />}
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm">{user.name}</span>
                </button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56">
                {user.role === "client" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="w-full flex items-center">
                        <LayoutDashboardIcon className="h-4 w-4 mr-2" /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/client/packages" className="w-full flex items-center">
                        <PackageIcon className="h-4 w-4 mr-2" /> Browse Packages
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/client/bookings" className="w-full flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" /> My Bookings
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                {user.role === "therapist" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="w-full flex items-center">
                        <LayoutDashboardIcon className="h-4 w-4 mr-2" /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/therapist/packages" className="w-full flex items-center">
                        <PackageIcon className="h-4 w-4 mr-2" /> My Packages
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/therapist/calendar" className="w-full flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" /> Calendar
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full flex items-center">
                    <UserIcon className="h-4 w-4 mr-2" /> Profile
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <div className="w-full flex items-center">
                    <LogOutIcon className="h-4 w-4 mr-2" /> Logout
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Sign in</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
