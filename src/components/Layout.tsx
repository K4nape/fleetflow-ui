import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileHeader } from "./MobileHeader";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header */}
        <Header />
        
        {/* Mobile Header */}
        <MobileHeader />
        
        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 pb-20 lg:pb-6">
          {children}
        </main>
        
        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
