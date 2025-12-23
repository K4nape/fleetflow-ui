import { Home, Car, Users, FileText, Calendar, DollarSign, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Mašinos", href: "/cars", icon: Car },
  { name: "Klientai", href: "/clients", icon: Users },
  { name: "Sutartys", href: "/contracts", icon: FileText },
  { name: "Rezervacijos", href: "/reservations", icon: Calendar },
  { name: "Finansai", href: "/finances", icon: DollarSign },
  { name: "Nustatymai", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-sidebar/80 backdrop-blur-lg border-r border-sidebar-border/50 transition-smooth flex-col hidden lg:flex",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border/50">
        {!collapsed && (
          <h1 className="font-display font-bold text-xl bg-gradient-to-r from-sidebar-primary to-primary bg-clip-text text-transparent">
            AutoRent
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="transition-smooth hover:bg-sidebar-accent/50"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground transition-smooth hover:bg-sidebar-accent/50 group",
              collapsed && "justify-center"
            )}
            activeClassName="bg-gradient-to-r from-sidebar-primary to-primary text-sidebar-primary-foreground font-medium hover:from-sidebar-primary hover:to-primary shadow-smooth"
          >
            <item.icon className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
