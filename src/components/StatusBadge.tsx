import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Status = "available" | "rented" | "in_service" | "reserved" | "draft" | "active" | "completed" | "cancelled" | "overdue";

const statusConfig: Record<Status, { label: string; className: string }> = {
  available: { label: "Laisva", className: "bg-success/10 text-success border-success/20" },
  rented: { label: "Išnuomota", className: "bg-info/10 text-info border-info/20" },
  in_service: { label: "Servise", className: "bg-warning/10 text-warning border-warning/20" },
  reserved: { label: "Rezervuota", className: "bg-primary/10 text-primary border-primary/20" },
  draft: { label: "Juodraštis", className: "bg-muted text-muted-foreground border-border" },
  active: { label: "Aktyvi", className: "bg-success/10 text-success border-success/20" },
  completed: { label: "Užbaigta", className: "bg-muted text-muted-foreground border-border" },
  cancelled: { label: "Atšaukta", className: "bg-destructive/10 text-destructive border-destructive/20" },
  overdue: { label: "Vėluoja", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
  children?: ReactNode;
}

export function StatusBadge({ status, className, children }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge
      variant="outline"
      className={cn("transition-smooth", config.className, className)}
    >
      {children || config.label}
    </Badge>
  );
}
