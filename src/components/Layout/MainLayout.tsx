
import { ReactNode } from "react";
import Navbar from "@/components/Navigation/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-background">
        {children}
      </main>
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">TherapyPlus</h3>
              <p className="text-sm">
                Professional therapy services to help you live your best life.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/packages" className="hover:underline">Packages</a></li>
                <li><a href="/about" className="hover:underline">About Us</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-sm">
                123 Therapy Street<br />
                Wellness City, WC 12345<br />
                info@therapyplus.com<br />
                (123) 456-7890
              </p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-primary-foreground/20 text-center text-sm">
            <p>© {new Date().getFullYear()} TherapyPlus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
