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
          className="relative h-9 w-9 hover:bg-accent/50 transition-all duration-200"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive rounded-full flex items-center justify-center text-[9px] font-bold text-destructive-foreground ring-2 ring-background">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 p-0 bg-popover border-border shadow-xl rounded-xl overflow-hidden"
        sideOffset={8}
      >
        {/* Header */}
        <div className="px-3 py-2.5 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Pranešimai</span>
            {unreadCount > 0 && (
              <span className="h-5 px-1.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full flex items-center">
                {unreadCount} nauji
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[11px] text-primary hover:underline"
            >
              Skaityti visus
            </button>
          )}
        </div>

        {/* Notifications List */}
        <ScrollArea className="max-h-72">
          {notifications.length === 0 ? (
            <div className="py-8 text-center">
              <Bell className="h-6 w-6 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Nėra pranešimų</p>
            </div>
          ) : (
            <div className="py-1">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const colors = getNotificationColors(notification.type, notification.read);

                return (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={cn(
                      "group relative px-3 py-2 cursor-pointer transition-colors",
                      "hover:bg-accent/50",
                      !notification.read && "bg-primary/5",
                      colors.baseOpacity
                    )}
                  >
                    <div className="flex gap-2.5">
                      {/* Icon */}
                      <div
                        className={cn(
                          "h-7 w-7 rounded-lg flex items-center justify-center shrink-0",
                          colors.bg
                        )}
                      >
                        <Icon className={cn("h-3.5 w-3.5", colors.icon)} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={cn(
                              "text-xs font-medium truncate",
                              notification.read ? "text-muted-foreground" : "text-foreground"
                            )}
                          >
                            {notification.title}
                          </p>
                          <span className="text-[10px] text-muted-foreground/60 shrink-0">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                          {notification.message}
                        </p>
                      </div>

                      {/* Unread dot */}
                      {!notification.read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1" />
                      )}

                      {/* Remove button */}
                      <button
                        onClick={(e) => removeNotification(notification.id, e)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5 rounded hover:bg-destructive/10 flex items-center justify-center shrink-0 absolute right-2 top-2"
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
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
          <div className="px-3 py-2 border-t border-border/50">
            <button className="w-full text-[11px] text-center text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1">
              Žiūrėti visus
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
