import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Plus, Search, FileText, Calendar as CalendarIcon, Car, User, Euro, 
  CheckCircle2, AlertCircle, XCircle, Clock, CalendarDays,
  Eye, MoreVertical, ArrowUpDown, ArrowUp, ArrowDown, X, List, LayoutGrid
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval, parseISO } from "date-fns";
import { lt } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type OrderType = "reservation" | "contract";
type OrderStatus = "pending" | "confirmed" | "active" | "completed" | "cancelled" | "overdue";
type FilterTab = "all" | "pending" | "confirmed" | "active" | "completed";
type ViewMode = "list" | "calendar";
type SortField = "date" | "amount" | "client" | "status";
type SortDirection = "asc" | "desc";

interface Order {
  id: string;
  orderNumber: string;
  type: OrderType;
  status: OrderStatus;
  client: {
    id: number;
    name: string;
    phone: string;
    email: string;
    type: "individual" | "company";
  };
  car: {
    id: number;
    brand: string;
    model: string;
    plate: string;
    image: string;
  };
  startDate: string;
  endDate: string;
  totalAmount: number;
  paidAmount: number;
  deposit: number;
  depositPaid: boolean;
  createdAt: string;
  notes?: string;
}

export default function Orders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

  // Mock data
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-0156",
      type: "contract",
      status: "active",
      client: { id: 1, name: "Jonas Petraitis", phone: "+370 612 34567", email: "jonas@email.com", type: "individual" },
      car: { id: 1, brand: "BMW", model: "X5", plate: "ABC123", image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=100&h=100&fit=crop" },
      startDate: "2024-12-10", endDate: "2024-12-20", totalAmount: 850, paidAmount: 850, deposit: 500, depositPaid: true, createdAt: "2024-12-08",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-0157",
      type: "reservation",
      status: "confirmed",
      client: { id: 2, name: "UAB Logistika", phone: "+370 698 76543", email: "info@logistika.lt", type: "company" },
      car: { id: 2, brand: "Audi", model: "A4", plate: "XYZ789", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop" },
      startDate: "2024-12-22", endDate: "2024-12-28", totalAmount: 420, paidAmount: 0, deposit: 200, depositPaid: false, createdAt: "2024-12-15",
    },
    {
      id: "3",
      orderNumber: "ORD-2024-0158",
      type: "reservation",
      status: "pending",
      client: { id: 3, name: "Petras Kazlauskas", phone: "+370 655 11223", email: "petras@gmail.com", type: "individual" },
      car: { id: 4, brand: "Tesla", model: "Model 3", plate: "GHI789", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100&h=100&fit=crop" },
      startDate: "2024-12-18", endDate: "2024-12-28", totalAmount: 1000, paidAmount: 0, deposit: 400, depositPaid: false, createdAt: "2024-12-14",
    },
    {
      id: "4",
      orderNumber: "ORD-2024-0150",
      type: "contract",
      status: "completed",
      client: { id: 4, name: "Marius Jonaitis", phone: "+370 677 88990", email: "marius.j@inbox.lt", type: "individual" },
      car: { id: 3, brand: "Mercedes", model: "C-Class", plate: "DEF456", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&h=100&fit=crop" },
      startDate: "2024-11-20", endDate: "2024-11-30", totalAmount: 750, paidAmount: 750, deposit: 300, depositPaid: true, createdAt: "2024-11-18",
    },
    {
      id: "5",
      orderNumber: "ORD-2024-0145",
      type: "contract",
      status: "overdue",
      client: { id: 5, name: "UAB TransPort", phone: "+370 611 22334", email: "transport@company.lt", type: "company" },
      car: { id: 1, brand: "BMW", model: "X5", plate: "ABC123", image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=100&h=100&fit=crop" },
      startDate: "2024-11-01", endDate: "2024-11-15", totalAmount: 1100, paidAmount: 500, deposit: 500, depositPaid: true, createdAt: "2024-10-30",
    },
    {
      id: "6",
      orderNumber: "ORD-2024-0140",
      type: "reservation",
      status: "cancelled",
      client: { id: 6, name: "Laura Vilkaitė", phone: "+370 688 99001", email: "laura.v@mail.com", type: "individual" },
      car: { id: 2, brand: "Audi", model: "A4", plate: "XYZ789", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop" },
      startDate: "2024-12-01", endDate: "2024-12-10", totalAmount: 540, paidAmount: 0, deposit: 200, depositPaid: false, createdAt: "2024-11-28",
    },
  ];

  // Filtered and sorted orders
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Tab filter
    if (activeTab !== "all") {
      result = result.filter(o => o.status === activeTab);
    }

    // Type filter
    if (typeFilter !== "all") {
      result = result.filter(o => o.type === typeFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(o => 
        o.orderNumber.toLowerCase().includes(query) ||
        o.client.name.toLowerCase().includes(query) ||
        o.car.brand.toLowerCase().includes(query) ||
        o.car.model.toLowerCase().includes(query) ||
        o.car.plate.toLowerCase().includes(query)
      );
    }

    // Date range filter
    if (dateFrom) {
      result = result.filter(o => new Date(o.startDate) >= dateFrom);
    }
    if (dateTo) {
      result = result.filter(o => new Date(o.endDate) <= dateTo);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "date":
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case "amount":
          comparison = a.totalAmount - b.totalAmount;
          break;
        case "client":
          comparison = a.client.name.localeCompare(b.client.name);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [orders, activeTab, typeFilter, searchQuery, dateFrom, dateTo, sortField, sortDirection]);

  // Stats calculation
  const stats = {
    pending: orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    active: orders.filter(o => o.status === "active").length,
    completed: orders.filter(o => o.status === "completed").length,
    reservations: orders.filter(o => o.type === "reservation").length,
    contracts: orders.filter(o => o.type === "contract").length,
  };

  // Helper functions
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case "pending": return { label: "Laukia", variant: "warning" as const, icon: Clock };
      case "confirmed": return { label: "Patvirtinta", variant: "info" as const, icon: CheckCircle2 };
      case "active": return { label: "Aktyvi", variant: "success" as const, icon: CheckCircle2 };
      case "completed": return { label: "Užbaigta", variant: "default" as const, icon: CheckCircle2 };
      case "cancelled": return { label: "Atšaukta", variant: "destructive" as const, icon: XCircle };
      case "overdue": return { label: "Vėluoja", variant: "destructive" as const, icon: AlertCircle };
    }
  };

  const getTypeConfig = (type: OrderType) => {
    switch (type) {
      case "reservation": return { label: "Rezervacija", color: "bg-info/10 text-info border-info/20" };
      case "contract": return { label: "Sutartis", color: "bg-primary/10 text-primary border-primary/20" };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('lt-LT', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('lt-LT', { month: 'short', day: 'numeric' });
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDateFrom(undefined);
    setDateTo(undefined);
    setTypeFilter("all");
    setActiveTab("all");
  };

  const hasActiveFilters = searchQuery || dateFrom || dateTo || typeFilter !== "all" || activeTab !== "all";

  // Calendar view helpers
  const calendarDays = useMemo(() => {
    const start = startOfMonth(calendarMonth);
    const end = endOfMonth(calendarMonth);
    return eachDayOfInterval({ start, end });
  }, [calendarMonth]);

  const getOrdersForDay = (day: Date) => {
    return filteredOrders.filter(order => {
      const start = parseISO(order.startDate);
      const end = parseISO(order.endDate);
      return isWithinInterval(day, { start, end }) || isSameDay(day, start) || isSameDay(day, end);
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent truncate">
            Užsakymai
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg hidden sm:block">
            Rezervacijos ir sutartys vienoje vietoje
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="hidden sm:flex items-center bg-muted/50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn("h-8 px-3", viewMode === "list" && "bg-background shadow-sm")}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn("h-8 px-3", viewMode === "calendar" && "bg-background shadow-sm")}
              onClick={() => setViewMode("calendar")}
            >
              <CalendarDays className="h-4 w-4" />
            </Button>
          </div>
          <Button className="shadow-lg flex-shrink-0" onClick={() => navigate("/orders/new")}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Naujas užsakymas</span>
            <span className="sm:hidden">Naujas</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <Card className="p-3 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium">Laukia</span>
          </div>
          <p className="text-2xl font-bold mt-1">{stats.pending}</p>
        </Card>
        <Card className="p-3 bg-gradient-to-br from-info/10 to-info/5 border-info/20">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-info" />
            <span className="text-sm font-medium">Rezervacijos</span>
          </div>
          <p className="text-2xl font-bold mt-1">{stats.reservations}</p>
        </Card>
        <Card className="p-3 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-sm font-medium">Aktyvios</span>
          </div>
          <p className="text-2xl font-bold mt-1">{stats.active}</p>
        </Card>
        <Card className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Sutartys</span>
          </div>
          <p className="text-2xl font-bold mt-1">{stats.contracts}</p>
        </Card>
      </div>

      {/* Quick Filter Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FilterTab)} className="w-full">
        <TabsList className="w-full justify-start bg-card/50 p-1 h-auto flex-wrap">
          <TabsTrigger value="all" className="flex-1 sm:flex-none text-xs sm:text-sm">
            Visi ({orders.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-1 sm:flex-none data-[state=active]:bg-warning data-[state=active]:text-warning-foreground text-xs sm:text-sm">
            Laukia ({stats.pending})
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="flex-1 sm:flex-none data-[state=active]:bg-info data-[state=active]:text-info-foreground text-xs sm:text-sm">
            Patvirtinti ({stats.confirmed})
          </TabsTrigger>
          <TabsTrigger value="active" className="flex-1 sm:flex-none data-[state=active]:bg-success data-[state=active]:text-success-foreground text-xs sm:text-sm">
            Aktyvūs ({stats.active})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1 sm:flex-none text-xs sm:text-sm">
            Užbaigti ({stats.completed})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search, Filters & Sorting */}
      <Card className="p-3 sm:p-4 bg-gradient-to-br from-card to-card/50">
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ieškoti pagal numerį, klientą, automobilį..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border/50 focus:ring-primary/50 rounded-xl text-sm"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-background/50 border-border/50 rounded-xl text-sm">
                <SelectValue placeholder="Tipas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Visi tipai</SelectItem>
                <SelectItem value="reservation">Rezervacijos</SelectItem>
                <SelectItem value="contract">Sutartys</SelectItem>
              </SelectContent>
            </Select>

            {/* Sorting */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-background/50 border-border/50 rounded-xl text-sm justify-between">
                  <span className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="hidden sm:inline">Rikiuoti</span>
                  </span>
                  {sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => toggleSort("date")} className={sortField === "date" ? "bg-muted" : ""}>
                  <CalendarIcon className="h-4 w-4 mr-2" /> Pagal datą
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleSort("amount")} className={sortField === "amount" ? "bg-muted" : ""}>
                  <Euro className="h-4 w-4 mr-2" /> Pagal sumą
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleSort("client")} className={sortField === "client" ? "bg-muted" : ""}>
                  <User className="h-4 w-4 mr-2" /> Pagal klientą
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleSort("status")} className={sortField === "status" ? "bg-muted" : ""}>
                  <FileText className="h-4 w-4 mr-2" /> Pagal statusą
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Date Range Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Laikotarpis:</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className={cn("text-xs bg-background/50", !dateFrom && "text-muted-foreground")}>
                  <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                  {dateFrom ? format(dateFrom, "yyyy-MM-dd", { locale: lt }) : "Nuo"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <span className="text-muted-foreground">—</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className={cn("text-xs bg-background/50", !dateTo && "text-muted-foreground")}>
                  <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                  {dateTo ? format(dateTo, "yyyy-MM-dd", { locale: lt }) : "Iki"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  disabled={(date) => dateFrom ? date < dateFrom : false}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5 mr-1" /> Išvalyti filtrus
              </Button>
            )}

            <div className="ml-auto text-sm text-muted-foreground">
              Rasta: <span className="font-medium text-foreground">{filteredOrders.length}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Mobile View Toggle */}
      <div className="flex sm:hidden items-center justify-center gap-2 bg-muted/50 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          className={cn("flex-1 h-9", viewMode === "list" && "bg-background shadow-sm")}
          onClick={() => setViewMode("list")}
        >
          <List className="h-4 w-4 mr-2" /> Sąrašas
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("flex-1 h-9", viewMode === "calendar" && "bg-background shadow-sm")}
          onClick={() => setViewMode("calendar")}
        >
          <CalendarDays className="h-4 w-4 mr-2" /> Kalendorius
        </Button>
      </div>

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-3">
          {filteredOrders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const typeConfig = getTypeConfig(order.type);
            const StatusIcon = statusConfig.icon;

            return (
              <Card 
                key={order.id}
                className="p-3 sm:p-4 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <div className="flex gap-3 sm:gap-4">
                  {/* Car Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={order.car.image}
                      alt={`${order.car.brand} ${order.car.model}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
                    />
                    <span className={cn(
                      "absolute -top-1.5 -right-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full border",
                      typeConfig.color
                    )}>
                      {order.type === "reservation" ? "R" : "S"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-sm font-medium">{order.orderNumber}</span>
                          <StatusBadge status={statusConfig.variant === "success" ? "available" : statusConfig.variant === "warning" ? "reserved" : "in_service"}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                          </StatusBadge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 truncate">
                          {order.car.brand} {order.car.model} • {order.car.plate}
                        </p>
                      </div>
                      <div className="hidden sm:block text-right">
                        <p className="font-semibold">{formatCurrency(order.totalAmount)}</p>
                        {order.paidAmount > 0 && order.paidAmount < order.totalAmount && (
                          <p className="text-xs text-muted-foreground">
                            Sumokėta: {formatCurrency(order.paidAmount)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <User className="h-3.5 w-3.5" />
                          <span className="truncate max-w-[120px] sm:max-w-none">{order.client.name}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
                          <CalendarIcon className="h-3.5 w-3.5" />
                          <span>{formatDate(order.startDate)} — {formatDate(order.endDate)}</span>
                        </div>
                      </div>
                      <div className="sm:hidden text-right">
                        <p className="font-semibold text-sm">{formatCurrency(order.totalAmount)}</p>
                      </div>
                    </div>

                    {/* Mobile dates */}
                    <div className="flex sm:hidden items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{formatDate(order.startDate)} — {formatDate(order.endDate)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="hidden sm:flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Peržiūrėti</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/orders/${order.id}`); }}>
                          <Eye className="h-4 w-4 mr-2" /> Peržiūrėti
                        </DropdownMenuItem>
                        {order.type === "reservation" && order.status !== "cancelled" && (
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <FileText className="h-4 w-4 mr-2" /> Paversti sutartimi
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-destructive">
                          <XCircle className="h-4 w-4 mr-2" /> Atšaukti
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredOrders.length === 0 && (
            <Card className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">Užsakymų nerasta</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Išvalyti filtrus
              </Button>
            </Card>
          )}
        </div>
      )}

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" onClick={() => setCalendarMonth(addDays(calendarMonth, -30))}>
              ← Ankstesnis
            </Button>
            <h3 className="font-semibold">
              {format(calendarMonth, "yyyy MMMM", { locale: lt })}
            </h3>
            <Button variant="outline" size="sm" onClick={() => setCalendarMonth(addDays(calendarMonth, 30))}>
              Kitas →
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {["Pr", "An", "Tr", "Kt", "Pn", "Št", "Sk"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Days */}
            {calendarDays.map((day) => {
              const dayOrders = getOrdersForDay(day);
              const isToday = isSameDay(day, new Date());

              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "min-h-[80px] sm:min-h-[100px] p-1 border rounded-lg",
                    isToday && "bg-primary/5 border-primary/30"
                  )}
                >
                  <div className={cn(
                    "text-xs font-medium mb-1",
                    isToday && "text-primary"
                  )}>
                    {format(day, "d")}
                  </div>
                  <div className="space-y-0.5">
                    {dayOrders.slice(0, 3).map((order) => {
                      const typeConfig = getTypeConfig(order.type);
                      return (
                        <button
                          key={order.id}
                          onClick={() => navigate(`/orders/${order.id}`)}
                          className={cn(
                            "w-full text-left text-[10px] px-1 py-0.5 rounded truncate",
                            order.type === "reservation" ? "bg-info/20 text-info" : "bg-primary/20 text-primary"
                          )}
                        >
                          {order.car.brand} {order.car.model}
                        </button>
                      );
                    })}
                    {dayOrders.length > 3 && (
                      <div className="text-[10px] text-muted-foreground text-center">
                        +{dayOrders.length - 3} daugiau
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-info/20 border border-info/40" />
              <span className="text-muted-foreground">Rezervacija</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-primary/20 border border-primary/40" />
              <span className="text-muted-foreground">Sutartis</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
