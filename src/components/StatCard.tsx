import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("p-6 hover-lift border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold font-display bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 text-sm">
              <span
                className={cn(
                  "font-semibold px-2 py-0.5 rounded-full",
                  trend.isPositive 
                    ? "text-success bg-success/10" 
                    : "text-destructive bg-destructive/10"
                )}
              >
                {trend.isPositive ? "↑ " : "↓ "}
                {trend.value}%
              </span>
              <span className="text-muted-foreground">vs praėjusį mėn.</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-smooth glow-primary">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
    </Card>
  );
}
