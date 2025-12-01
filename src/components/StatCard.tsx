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
    <Card className={cn("p-4 sm:p-6 hover-lift border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold font-display bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm flex-wrap">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-semibold px-2 py-1 rounded-lg",
                  trend.isPositive 
                    ? "text-success bg-success/10" 
                    : "text-destructive bg-destructive/10"
                )}
              >
                {trend.isPositive ? "↑" : "↓"}
                {trend.value}%
              </span>
            </div>
          )}
        </div>
        <div className="p-2.5 sm:p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-smooth glow-primary flex-shrink-0">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
        </div>
      </div>
    </Card>
  );
}
