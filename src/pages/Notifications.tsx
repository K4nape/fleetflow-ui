import { useState } from "react";
import { 
  Bell, Car, FileText, AlertTriangle, CheckCircle2, Euro, Wrench, 
  Search, Check, Trash2, MoreHorizontal, ChevronRight
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
    message: "BMW X5 (ABC 123) draudimas baigiasi po 3 dienų",
    time: "09:45",
    date: "Šiandien",
    read: false,
  },
  {
    id: "2",
    type: "contract",
    title: "Nauja nuomos sutartis",
    message: "Jonas Jonaitis pasirašė sutartį - Audi A6",
    time: "09:30",
    date: "Šiandien",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Gautas mokėjimas",
    message: "€450 už Audi A6 nuomą - Jonas Jonaitis",
    time: "08:15",
    date: "Šiandien",
    read: false,
  },
  {
    id: "4",
    type: "service",
    title: "Techninė apžiūra",
    message: "Mercedes C200 reikia TA iki 2024-01-20",
    time: "16:30",
    date: "Vakar",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Automobilis grąžintas",
    message: "VW Golf grąžintas laiku, būklė gera",
    time: "14:20",
    date: "Vakar",
    read: true,
  },
  {
    id: "6",
    type: "success",
    title: "Rezervacija patvirtinta",
    message: "Toyota Camry - Petras Petraitis",
    time: "11:00",
    date: "Vakar",
    read: true,
  },
  {
    id: "7",
    type: "warning",
    title: "Vėluojantis grąžinimas",
    message: "Opel Astra - Antanas Antanaitis",
    time: "09:00",
    date: "2024-01-10",
    read: true,
  },
  {
    id: "8",
    type: "payment",
    title: "Laukiamas mokėjimas",
    message: "€320 už Škoda Octavia - terminas 01-15",
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
      return { bg: "bg-amber-500/15", icon: "text-amber-500" };
    case "contract":
      return { bg: "bg-blue-500/15", icon: "text-blue-500" };
    case "payment":
      return { bg: "bg-emerald-500/15", icon: "text-emerald-500" };
    case "service":
      return { bg: "bg-purple-500/15", icon: "text-purple-500" };
    case "success":
      return { bg: "bg-green-500/15", icon: "text-green-500" };
    default:
      return { bg: "bg-primary/15", icon: "text-primary" };
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
    <div className="space-y-4 md:space-y-6 animate-fade-in pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Bell className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold flex items-center gap-2">
              Pranešimai
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
              Sistemos pranešimai ir įspėjimai
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead} 
              className="h-8 px-2 md:px-3 text-xs gap-1.5"
            >
              <Check className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Skaityti</span>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              <DropdownMenuItem onClick={deleteAllRead} className="text-destructive text-xs">
                <Trash2 className="h-3.5 w-3.5 mr-2" />
                Ištrinti skaitytus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filters - Compact */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Ieškoti..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-28 md:w-32 h-9 text-xs">
            <SelectValue placeholder="Tipas" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all" className="text-xs">Visi</SelectItem>
            <SelectItem value="warning" className="text-xs">Įspėjimai</SelectItem>
            <SelectItem value="contract" className="text-xs">Sutartys</SelectItem>
            <SelectItem value="payment" className="text-xs">Mokėjimai</SelectItem>
            <SelectItem value="service" className="text-xs">Servisas</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-24 md:w-28 h-9 text-xs">
            <SelectValue placeholder="Būsena" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all" className="text-xs">Visi</SelectItem>
            <SelectItem value="unread" className="text-xs">Nauji</SelectItem>
            <SelectItem value="read" className="text-xs">Skaityti</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notifications List */}
      {Object.keys(groupedNotifications).length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
            <Bell className="h-5 w-5 text-muted-foreground/50" />
          </div>
          <p className="text-sm text-muted-foreground">Pranešimų nerasta</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedNotifications).map(([date, items]) => (
            <div key={date}>
              {/* Date Header - Minimal */}
              <div className="flex items-center gap-2 mb-2 px-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {date}
                </span>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              {/* Notifications - Card Style */}
              <div className="bg-card rounded-xl border border-border/50 overflow-hidden divide-y divide-border/50">
                {items.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  const colors = getNotificationColors(notification.type);

                  return (
                    <div
                      key={notification.id}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                      className={cn(
                        "flex items-center gap-3 p-3 md:p-4 transition-colors cursor-pointer",
                        "hover:bg-accent/30",
                        !notification.read && "bg-primary/[0.03]"
                      )}
                    >
                      {/* Icon */}
                      <div className={cn(
                        "h-8 w-8 md:h-9 md:w-9 rounded-lg flex items-center justify-center shrink-0",
                        colors.bg
                      )}>
                        <Icon className={cn("h-4 w-4", colors.icon)} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-sm font-medium truncate",
                            notification.read ? "text-muted-foreground" : "text-foreground"
                          )}>
                            {notification.title}
                          </span>
                          {!notification.read && (
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {notification.message}
                        </p>
                      </div>

                      {/* Time & Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] md:text-xs text-muted-foreground/70">
                          {notification.time}
                        </span>
                        
                        {/* Desktop actions */}
                        <div className="hidden md:flex items-center gap-1 opacity-0 group-hover:opacity-100">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        
                        {/* Mobile chevron */}
                        <ChevronRight className="h-4 w-4 text-muted-foreground/30 md:hidden" />
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
