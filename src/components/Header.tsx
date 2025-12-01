import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 bg-card/80 backdrop-blur-lg border-b border-border/50 px-6 items-center justify-between sticky top-0 z-40 hidden lg:flex">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Paieška..."
            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative hover:bg-accent/50 transition-smooth">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full animate-pulse shadow-smooth" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
