import { NavLink } from "@/components/NavLink";
import { Home, Car, Users, FileText, Calendar, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, label: "Pradžia" },
  { name: "Mašinos", href: "/cars", icon: Car, label: "Mašinos" },
  { name: "Klientai", href: "/clients", icon: Users, label: "Klientai" },
  { name: "Sutartys", href: "/contracts", icon: FileText, label: "Sutartys" },
  { name: "Rezervacijos", href: "/reservations", icon: Calendar, label: "Rezerv." },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border/50 lg:hidden safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-16">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-all hover:text-foreground"
            activeClassName="text-primary font-medium"
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "relative",
                  isActive && "after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-primary after:rounded-full"
                )}>
                  <item.icon className={cn(
                    "h-5 w-5 transition-transform",
                    isActive && "scale-110"
                  )} />
                </div>
                <span className="text-xs truncate max-w-full px-1">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
