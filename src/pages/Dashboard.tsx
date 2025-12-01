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
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Sveiki sugrįžę! Čia yra jūsų sistemos apžvalga.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold font-display mb-4">Greiti veiksmai</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button className="h-auto py-4 flex flex-col gap-2 transition-smooth">
            <Plus className="h-5 w-5" />
            <span className="text-sm">Nauja sutartis</span>
          </Button>
          <Button variant="secondary" className="h-auto py-4 flex flex-col gap-2 transition-smooth">
            <Plus className="h-5 w-5" />
            <span className="text-sm">Nauja rezervacija</span>
          </Button>
          <Button variant="secondary" className="h-auto py-4 flex flex-col gap-2 transition-smooth">
            <Plus className="h-5 w-5" />
            <span className="text-sm">Pridėti mašiną</span>
          </Button>
          <Button variant="secondary" className="h-auto py-4 flex flex-col gap-2 transition-smooth">
            <Plus className="h-5 w-5" />
            <span className="text-sm">Pridėti klientą</span>
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold font-display flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Įspėjimai
            </h2>
            <Button variant="ghost" size="sm">Visi įspėjimai</Button>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 bg-muted/50 rounded-lg border border-border transition-smooth hover:shadow-smooth"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{alert.car}</p>
                    <p className="text-sm text-muted-foreground">{alert.type}</p>
                  </div>
                  <StatusBadge
                    status={alert.severity === "error" ? "in_service" : alert.severity === "warning" ? "reserved" : "active"}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Liko {alert.daysLeft} d.
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold font-display">Paskutinė veikla</h2>
            <Button variant="ghost" size="sm">Visa istorija</Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.car}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
