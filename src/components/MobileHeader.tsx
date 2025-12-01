import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Bell, Search, Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from "@/components/NavLink";
import { Home, Car, Users, FileText, Calendar, DollarSign, Settings } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Mašinos", href: "/cars", icon: Car },
  { name: "Klientai", href: "/clients", icon: Users },
  { name: "Sutartys", href: "/contracts", icon: FileText },
  { name: "Rezervacijos", href: "/reservations", icon: Calendar },
  { name: "Finansai", href: "/finance", icon: DollarSign },
  { name: "Nustatymai", href: "/settings", icon: Settings },
];

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="h-14 bg-card/95 backdrop-blur-lg border-b border-border/50 px-4 flex items-center justify-between lg:hidden sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="p-4 border-b border-border/50">
              <SheetTitle className="font-display font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                AutoRent
              </SheetTitle>
            </SheetHeader>
            <nav className="p-2 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === "/"}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-foreground transition-smooth hover:bg-accent/50"
                  activeClassName="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium shadow-lg"
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <h1 className="font-display font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          AutoRent
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full animate-pulse" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
