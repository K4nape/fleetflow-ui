import { useState } from "react";
import { 
  Bell, Car, FileText, AlertTriangle, CheckCircle2, Euro, Wrench, 
  Search, Filter, Check, Trash2, MoreHorizontal, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type NotificationType = "warning" | "info" | "success" | "contract" | "payment" | "service";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
}

const allNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Baigiasi draudimas",
    message: "BMW X5 (ABC 123) draudimas baigiasi po 3 dienų. Rekomenduojame atnaujinti draudimą kuo greičiau.",
    time: "09:45",
    date: "Šiandien",
    read: false,
  },
  {
    id: "2",
    type: "contract",
    title: "Nauja nuomos sutartis",
    message: "Jonas Jonaitis pasirašė nuomos sutartį automobiliui Audi A6. Nuomos laikotarpis: 2024-01-15 - 2024-01-22.",
    time: "09:30",
    date: "Šiandien",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Gautas mokėjimas",
    message: "Gautas €450 mokėjimas už Audi A6 nuomą. Mokėtojas: Jonas Jonaitis. Sąskaita #INV-2024-001.",
    time: "08:15",
    date: "Šiandien",
    read: false,
  },
  {
    id: "4",
    type: "service",
    title: "Techninė apžiūra",
    message: "Mercedes C200 (XYZ 789) reikia techninės apžiūros. Rekomenduojama data: 2024-01-20.",
    time: "16:30",
    date: "Vakar",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Automobilis grąžintas",
    message: "VW Golf (DEF 456) grąžintas laiku. Būklė: gera. Nuvažiuota: 450 km.",
    time: "14:20",
    date: "Vakar",
    read: true,
  },
  {
    id: "6",
    type: "success",
    title: "Rezervacija patvirtinta",
    message: "Toyota Camry rezervuota nuo rytojaus. Klientas: Petras Petraitis. Kontaktinis tel.: +370 600 12345.",
    time: "11:00",
    date: "Vakar",
    read: true,
  },
  {
    id: "7",
    type: "warning",
    title: "Vėluojantis grąžinimas",
    message: "Opel Astra turėjo būti grąžintas vakar. Klientas: Antanas Antanaitis. Susisiekite dėl grąžinimo.",
    time: "09:00",
    date: "2024-01-10",
    read: true,
  },
  {
    id: "8",
    type: "payment",
    title: "Laukiamas mokėjimas",
    message: "Laukiamas €320 mokėjimas už Škoda Octavia nuomą. Terminas: 2024-01-15.",
    time: "15:45",
    date: "2024-01-09",
    read: true,
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "warning": return AlertTriangle;
    case "contract": return FileText;
    case "payment": return Euro;
    case "service": return Wrench;
    case "success": return CheckCircle2;
    default: return Car;
  }
};

const getNotificationColors = (type: NotificationType) => {
  switch (type) {
    case "warning":
      return { bg: "bg-amber-500/10", icon: "text-amber-500", badge: "bg-amber-500/20 text-amber-600" };
    case "contract":
      return { bg: "bg-blue-500/10", icon: "text-blue-500", badge: "bg-blue-500/20 text-blue-600" };
    case "payment":
      return { bg: "bg-emerald-500/10", icon: "text-emerald-500", badge: "bg-emerald-500/20 text-emerald-600" };
    case "service":
      return { bg: "bg-purple-500/10", icon: "text-purple-500", badge: "bg-purple-500/20 text-purple-600" };
    case "success":
      return { bg: "bg-green-500/10", icon: "text-green-500", badge: "bg-green-500/20 text-green-600" };
    default:
      return { bg: "bg-primary/10", icon: "text-primary", badge: "bg-primary/20 text-primary" };
  }
};

const getTypeLabel = (type: NotificationType) => {
  switch (type) {
    case "warning": return "Įspėjimas";
    case "contract": return "Sutartis";
    case "payment": return "Mokėjimas";
    case "service": return "Servisas";
    case "success": return "Sėkmė";
    default: return "Informacija";
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredNotifications = notifications.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         n.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || n.type === typeFilter;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "unread" && !n.read) ||
                         (statusFilter === "read" && n.read);
    return matchesSearch && matchesType && matchesStatus;
  });

  const groupedNotifications = filteredNotifications.reduce((acc, notification) => {
    if (!acc[notification.date]) {
      acc[notification.date] = [];
    }
    acc[notification.date].push(notification);
    return acc;
  }, {} as Record<string, Notification[]>);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const deleteAllRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            Pranešimai
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {unreadCount} nauji
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground mt-1">
            Peržiūrėkite visus sistemos pranešimus
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-2">
              <Check className="h-4 w-4" />
              Skaityti visus
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={deleteAllRead} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Ištrinti skaitytus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Ieškoti pranešimų..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Tipas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Visi tipai</SelectItem>
            <SelectItem value="warning">Įspėjimai</SelectItem>
            <SelectItem value="contract">Sutartys</SelectItem>
            <SelectItem value="payment">Mokėjimai</SelectItem>
            <SelectItem value="service">Servisas</SelectItem>
            <SelectItem value="success">Sėkmė</SelectItem>
            <SelectItem value="info">Informacija</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Būsena" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Visi</SelectItem>
            <SelectItem value="unread">Neskaityti</SelectItem>
            <SelectItem value="read">Skaityti</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notifications List */}
      {Object.keys(groupedNotifications).length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">Nėra pranešimų</h3>
          <p className="text-sm text-muted-foreground/60 mt-1">
            Pagal pasirinktus filtrus pranešimų nerasta
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedNotifications).map(([date, items]) => (
            <div key={date}>
              {/* Date Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {date}
                </div>
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">
                  {items.length} {items.length === 1 ? "pranešimas" : "pranešimai"}
                </span>
              </div>

              {/* Notifications */}
              <div className="space-y-2">
                {items.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  const colors = getNotificationColors(notification.type);

                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "group bg-card rounded-xl border border-border p-4 transition-all duration-200",
                        "hover:shadow-md hover:border-border/80",
                        !notification.read && "bg-primary/5 border-primary/20"
                      )}
                    >
                      <div className="flex gap-4">
                        {/* Icon */}
                        <div
                          className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                            colors.bg
                          )}
                        >
                          <Icon className={cn("h-5 w-5", colors.icon)} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className={cn(
                                  "font-medium",
                                  notification.read ? "text-muted-foreground" : "text-foreground"
                                )}>
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <span className="h-2 w-2 rounded-full bg-primary" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {notification.message}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <Badge variant="secondary" className={cn("text-xs", colors.badge)}>
                                {getTypeLabel(notification.type)}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-7 text-xs gap-1"
                              >
                                <Check className="h-3 w-3" />
                                Pažymėti kaip skaitytą
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-7 text-xs gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-3 w-3" />
                              Ištrinti
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
