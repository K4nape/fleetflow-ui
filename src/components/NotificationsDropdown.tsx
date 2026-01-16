import { useState } from "react";
import { Bell, Car, FileText, AlertTriangle, Calendar, CheckCircle2, Clock, Euro, Wrench, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type NotificationType = "warning" | "info" | "success" | "contract" | "payment" | "service";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Baigiasi draudimas",
    message: "BMW X5 draudimas baigiasi po 3 dienų",
    time: "Prieš 5 min",
    read: false,
  },
  {
    id: "2",
    type: "contract",
    title: "Nauja sutartis",
    message: "Jonas Jonaitis pasirašė nuomos sutartį",
    time: "Prieš 15 min",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Gautas mokėjimas",
    message: "€450 už Audi A6 nuomą",
    time: "Prieš 1 val",
    read: false,
  },
  {
    id: "4",
    type: "service",
    title: "Techninė apžiūra",
    message: "Mercedes C200 reikia techninės apžiūros",
    time: "Prieš 2 val",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Grąžintas automobilis",
    message: "VW Golf grąžintas laiku",
    time: "Prieš 3 val",
    read: true,
  },
  {
    id: "6",
    type: "success",
    title: "Rezervacija patvirtinta",
    message: "Toyota Camry rezervuota nuo rytojaus",
    time: "Vakar",
    read: true,
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "warning":
      return AlertTriangle;
    case "contract":
      return FileText;
    case "payment":
      return Euro;
    case "service":
      return Wrench;
    case "success":
      return CheckCircle2;
    default:
      return Car;
  }
};

const getNotificationColors = (type: NotificationType, read: boolean) => {
  const baseOpacity = read ? "opacity-60" : "";
  
  switch (type) {
    case "warning":
      return {
        bg: "bg-amber-500/10",
        icon: "text-amber-500",
        border: "border-amber-500/20",
        baseOpacity,
      };
    case "contract":
      return {
        bg: "bg-blue-500/10",
        icon: "text-blue-500",
        border: "border-blue-500/20",
        baseOpacity,
      };
    case "payment":
      return {
        bg: "bg-emerald-500/10",
        icon: "text-emerald-500",
        border: "border-emerald-500/20",
        baseOpacity,
      };
    case "service":
      return {
        bg: "bg-purple-500/10",
        icon: "text-purple-500",
        border: "border-purple-500/20",
        baseOpacity,
      };
    case "success":
      return {
        bg: "bg-green-500/10",
        icon: "text-green-500",
        border: "border-green-500/20",
        baseOpacity,
      };
    default:
      return {
        bg: "bg-primary/10",
        icon: "text-primary",
        border: "border-primary/20",
        baseOpacity,
      };
  }
};

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-accent/50 transition-all duration-300"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <>
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full animate-pulse shadow-lg shadow-destructive/50" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full flex items-center justify-center text-[10px] font-bold text-destructive-foreground animate-scale-in">
                {unreadCount}
              </span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[380px] p-0 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl rounded-2xl overflow-hidden"
        sideOffset={8}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Pranešimai</h3>
                <p className="text-xs text-muted-foreground">
                  {unreadCount > 0
                    ? `${unreadCount} neperskaityti`
                    : "Visi perskaityti"}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-primary hover:text-primary hover:bg-primary/10"
              >
                Žymėti visus
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="max-h-[400px]">
          {notifications.length === 0 ? (
            <div className="py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <p className="text-sm text-muted-foreground">
                Nėra pranešimų
              </p>
            </div>
          ) : (
            <div className="py-2">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const colors = getNotificationColors(
                  notification.type,
                  notification.read
                );

                return (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={cn(
                      "group relative px-4 py-3 cursor-pointer transition-all duration-200",
                      "hover:bg-accent/50",
                      !notification.read && "bg-primary/5",
                      colors.baseOpacity
                    )}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div
                        className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-110",
                          colors.bg,
                          colors.border
                        )}
                      >
                        <Icon className={cn("h-5 w-5", colors.icon)} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={cn(
                              "text-sm font-medium text-foreground truncate",
                              notification.read && "text-muted-foreground"
                            )}
                          >
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Clock className="h-3 w-3 text-muted-foreground/60" />
                          <span className="text-[10px] text-muted-foreground/60">
                            {notification.time}
                          </span>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={(e) => removeNotification(notification.id, e)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-6 w-6 rounded-lg hover:bg-destructive/10 flex items-center justify-center shrink-0"
                      >
                        <X className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="px-4 py-3 border-t border-border/50 bg-gradient-to-r from-transparent to-primary/5">
            <Button
              variant="ghost"
              className="w-full justify-center gap-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              <span>Žiūrėti visus pranešimus</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
