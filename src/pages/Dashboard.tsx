import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Users, FileText, Calendar, Plus, TrendingUp, AlertCircle } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export default function Dashboard() {
  // Mock data
  const stats = [
    { title: "Aktyvios sutartys", value: 12, icon: FileText, trend: { value: 8.5, isPositive: true } },
    { title: "Laisvos mašinos", value: 8, icon: Car, trend: { value: 12.3, isPositive: false } },
    { title: "Rezervacijos", value: 5, icon: Calendar, trend: { value: 25.0, isPositive: true } },
    { title: "Mėnesio pajamos", value: "€4,230", icon: TrendingUp, trend: { value: 15.2, isPositive: true } },
  ];

  const alerts = [
    { id: 1, car: "BMW X5 (ABC123)", type: "Draudimas baigiasi", daysLeft: 15, severity: "warning" },
    { id: 2, car: "Audi A4 (XYZ789)", type: "Techninė apžiūra", daysLeft: 7, severity: "error" },
    { id: 3, car: "Mercedes C-Class (DEF456)", type: "Sutartis baigiasi", daysLeft: 2, severity: "info" },
  ];

  const recentActivities = [
    { id: 1, action: "Nauja sutartis sukurta", car: "BMW X5", time: "prieš 30 min" },
    { id: 2, action: "Mašina grąžinta", car: "Audi A4", time: "prieš 2 val" },
    { id: 3, action: "Rezervacija patvirtinta", car: "Mercedes C-Class", time: "prieš 4 val" },
    { id: 4, action: "Naujas klientas", car: "Jonas Jonaitis", time: "prieš 6 val" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="space-y-1 sm:space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">Sveiki sugrįžę į AutoRent sistemą</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Greiti veiksmai</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <Button variant="outline" className="h-auto flex-col gap-2 sm:gap-3 p-4 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all group">
            <Plus className="h-5 w-5 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform text-primary" />
            <span className="text-xs sm:text-sm font-medium text-center leading-tight">Nauja sutartis</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 sm:gap-3 p-4 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all group">
            <Plus className="h-5 w-5 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform text-primary" />
            <span className="text-xs sm:text-sm font-medium text-center leading-tight">Nauja rezervacija</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 sm:gap-3 p-4 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all group">
            <Plus className="h-5 w-5 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform text-primary" />
            <span className="text-xs sm:text-sm font-medium text-center leading-tight">Pridėti mašiną</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 sm:gap-3 p-4 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all group">
            <Plus className="h-5 w-5 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform text-primary" />
            <span className="text-xs sm:text-sm font-medium text-center leading-tight">Pridėti klientą</span>
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Alerts */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
            Įspėjimai
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 sm:p-4 rounded-xl border-l-4 border-warning bg-warning/10 hover:scale-[1.02] transition-smooth shadow-[0_0_15px_rgba(251,191,36,0.1)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{alert.car}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{alert.type}</p>
                  </div>
                  <StatusBadge
                    status={alert.severity === "error" ? "in_service" : alert.severity === "warning" ? "reserved" : "active"}
                  />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  Liko {alert.daysLeft} d.
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Paskutinė veikla</h2>
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-border/50 last:border-0 last:pb-0 hover:bg-accent/20 -mx-2 px-2 py-2 rounded-lg transition-smooth">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg sm:rounded-xl flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div className="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium truncate">{activity.action}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{activity.car}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
