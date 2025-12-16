import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, Search, FileText, Calendar, Car, User, Euro, 
  CheckCircle2, AlertCircle, XCircle, FileSignature,
  Download, Eye, MoreVertical, Printer, Send, CreditCard,
  TrendingUp, ArrowRight, Phone, Mail
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ContractStatus = "active" | "completed" | "draft" | "cancelled" | "overdue";
type PaymentStatus = "paid" | "partial" | "pending" | "overdue";
type FilterTab = "all" | "active" | "draft" | "completed" | "overdue";

interface Contract {
  id: string;
  contractNumber: string;
  status: ContractStatus;
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
  paymentStatus: PaymentStatus;
  deposit: number;
  depositPaid: boolean;
  signedAt: string | null;
  createdAt: string;
  notes?: string;
}

export default function Contracts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  // Mock data
  const contracts: Contract[] = [
    {
      id: "1",
      contractNumber: "SUT-2024-0156",
      status: "active",
      client: { id: 1, name: "Jonas Petraitis", phone: "+370 612 34567", email: "jonas@email.com", type: "individual" },
      car: { id: 1, brand: "BMW", model: "X5", plate: "ABC123", image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=100&h=100&fit=crop" },
      startDate: "2024-12-10", endDate: "2024-12-20", totalAmount: 850, paidAmount: 850, paymentStatus: "paid", deposit: 500, depositPaid: true, signedAt: "2024-12-09", createdAt: "2024-12-08",
    },
    {
      id: "2",
      contractNumber: "SUT-2024-0157",
      status: "active",
      client: { id: 2, name: "UAB Logistika", phone: "+370 698 76543", email: "info@logistika.lt", type: "company" },
      car: { id: 2, brand: "Audi", model: "A4", plate: "XYZ789", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop" },
      startDate: "2024-12-05", endDate: "2024-12-25", totalAmount: 1200, paidAmount: 600, paymentStatus: "partial", deposit: 400, depositPaid: true, signedAt: "2024-12-04", createdAt: "2024-12-03",
    },
    {
      id: "3",
      contractNumber: "SUT-2024-0158",
      status: "draft",
      client: { id: 3, name: "Petras Kazlauskas", phone: "+370 655 11223", email: "petras@gmail.com", type: "individual" },
      car: { id: 4, brand: "Tesla", model: "Model 3", plate: "GHI789", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100&h=100&fit=crop" },
      startDate: "2024-12-18", endDate: "2024-12-28", totalAmount: 1500, paidAmount: 0, paymentStatus: "pending", deposit: 600, depositPaid: false, signedAt: null, createdAt: "2024-12-14",
    },
    {
      id: "4",
      contractNumber: "SUT-2024-0150",
      status: "completed",
      client: { id: 4, name: "Marius Jonaitis", phone: "+370 677 88990", email: "marius.j@inbox.lt", type: "individual" },
      car: { id: 3, brand: "Mercedes", model: "C-Class", plate: "DEF456", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&h=100&fit=crop" },
      startDate: "2024-11-20", endDate: "2024-11-30", totalAmount: 950, paidAmount: 950, paymentStatus: "paid", deposit: 400, depositPaid: true, signedAt: "2024-11-19", createdAt: "2024-11-18",
    },
    {
      id: "5",
      contractNumber: "SUT-2024-0145",
      status: "overdue",
      client: { id: 5, name: "UAB TransPort", phone: "+370 611 22334", email: "transport@company.lt", type: "company" },
      car: { id: 1, brand: "BMW", model: "X5", plate: "ABC123", image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=100&h=100&fit=crop" },
      startDate: "2024-11-01", endDate: "2024-11-15", totalAmount: 1100, paidAmount: 500, paymentStatus: "overdue", deposit: 500, depositPaid: true, signedAt: "2024-10-31", createdAt: "2024-10-30", notes: "Vėluoja grąžinti automobilį",
    },
    {
      id: "6",
      contractNumber: "SUT-2024-0140",
      status: "cancelled",
      client: { id: 6, name: "Laura Vilkaitė", phone: "+370 688 99001", email: "laura.v@mail.com", type: "individual" },
      car: { id: 2, brand: "Audi", model: "A4", plate: "XYZ789", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop" },
      startDate: "2024-12-01", endDate: "2024-12-10", totalAmount: 600, paidAmount: 0, paymentStatus: "pending", deposit: 300, depositPaid: false, signedAt: null, createdAt: "2024-11-28", notes: "Klientas atšaukė rezervaciją",
    },
  ];

  // Filtered contracts
  const filteredContracts = activeTab === "all" 
    ? contracts 
    : contracts.filter(c => c.status === activeTab);

  // Stats calculation
  const stats = {
    active: contracts.filter(c => c.status === "active").length,
    draft: contracts.filter(c => c.status === "draft").length,
    completed: contracts.filter(c => c.status === "completed").length,
    overdue: contracts.filter(c => c.status === "overdue" || c.paymentStatus === "overdue").length,
    totalRevenue: contracts.filter(c => c.status !== "cancelled").reduce((sum, c) => sum + c.paidAmount, 0),
    avgDuration: Math.round(contracts.reduce((sum, c) => {
      const start = new Date(c.startDate);
      const end = new Date(c.endDate);
      return sum + Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    }, 0) / contracts.length),
  };


  // Helper functions
  const getStatusConfig = (status: ContractStatus) => {
    switch (status) {
      case "active": return { label: "Aktyvi", variant: "success" as const, icon: CheckCircle2 };
      case "completed": return { label: "Užbaigta", variant: "default" as const, icon: CheckCircle2 };
      case "draft": return { label: "Juodraštis", variant: "warning" as const, icon: FileText };
      case "cancelled": return { label: "Atšaukta", variant: "destructive" as const, icon: XCircle };
      case "overdue": return { label: "Vėluoja", variant: "destructive" as const, icon: AlertCircle };
    }
  };

  const getPaymentStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case "paid": return { label: "Apmokėta", color: "text-success", bg: "bg-success/10" };
      case "partial": return { label: "Dalinis", color: "text-warning", bg: "bg-warning/10" };
      case "pending": return { label: "Laukia", color: "text-muted-foreground", bg: "bg-muted" };
      case "overdue": return { label: "Vėluoja", color: "text-destructive", bg: "bg-destructive/10" };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('lt-LT', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('lt-LT', { month: 'short', day: 'numeric' });
  };

  const getDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getPaymentProgress = (paid: number, total: number) => {
    return Math.round((paid / total) * 100);
  };

  const formatPhoneForCall = (phone: string) => {
    return phone.replace(/\s/g, '');
  };

  

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent truncate">
            Sutartys
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg hidden sm:block">Nuomos sutarčių valdymas</p>
        </div>
        <Button className="shadow-lg flex-shrink-0">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nauja sutartis</span>
          <span className="sm:hidden">Nauja</span>
        </Button>
      </div>

      {/* Quick Filter Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FilterTab)} className="w-full">
        <TabsList className="w-full justify-start bg-card/50 p-1 h-auto flex-wrap">
          <TabsTrigger 
            value="all" 
            className="flex-1 sm:flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
          >
            Visos ({contracts.length})
          </TabsTrigger>
          <TabsTrigger 
            value="active" 
            className="flex-1 sm:flex-none data-[state=active]:bg-success data-[state=active]:text-success-foreground text-xs sm:text-sm"
          >
            Aktyvios ({stats.active})
          </TabsTrigger>
          <TabsTrigger 
            value="draft" 
            className="flex-1 sm:flex-none data-[state=active]:bg-warning data-[state=active]:text-warning-foreground text-xs sm:text-sm"
          >
            Juodraščiai ({stats.draft})
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="flex-1 sm:flex-none text-xs sm:text-sm"
          >
            Užbaigtos ({stats.completed})
          </TabsTrigger>
          <TabsTrigger 
            value="overdue" 
            className="flex-1 sm:flex-none data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground text-xs sm:text-sm"
          >
            Vėluoja ({stats.overdue})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search & Filters */}
      <Card className="p-3 sm:p-4 bg-gradient-to-br from-card to-card/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ieškoti pagal numerį, klientą, automobilį..."
              className="pl-10 bg-background/50 border-border/50 focus:ring-primary/50 rounded-xl text-sm"
            />
          </div>
          <Select>
            <SelectTrigger className="bg-background/50 border-border/50 rounded-xl text-sm">
              <SelectValue placeholder="Mokėjimas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Visi</SelectItem>
              <SelectItem value="paid">Apmokėtos</SelectItem>
              <SelectItem value="partial">Dalinis apmokėjimas</SelectItem>
              <SelectItem value="pending">Laukia apmokėjimo</SelectItem>
              <SelectItem value="overdue">Vėluojantys mokėjimai</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="bg-background/50 border-border/50 rounded-xl text-sm">
              <SelectValue placeholder="Automobilis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Visi</SelectItem>
              <SelectItem value="bmw">BMW X5</SelectItem>
              <SelectItem value="audi">Audi A4</SelectItem>
              <SelectItem value="mercedes">Mercedes C-Class</SelectItem>
              <SelectItem value="tesla">Tesla Model 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Contracts List - Desktop */}
      <div className="hidden md:block space-y-3">
        <TooltipProvider>
          {filteredContracts.map((contract) => {
            const statusConfig = getStatusConfig(contract.status);
            const paymentConfig = getPaymentStatusConfig(contract.paymentStatus);
            const daysRemaining = getDaysRemaining(contract.endDate);
            const paymentProgress = getPaymentProgress(contract.paidAmount, contract.totalAmount);
            const StatusIcon = statusConfig.icon;

            return (
              <Card 
                key={contract.id} 
                className="overflow-hidden bg-gradient-to-br from-card to-card/50 hover:shadow-smooth-lg transition-smooth cursor-pointer"
                onClick={() => navigate(`/contracts/${contract.id}`)}
              >
                <div className="p-4 flex gap-4 items-stretch">
                  {/* Car Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={contract.car.image}
                      alt={`${contract.car.brand} ${contract.car.model}`}
                      className="w-20 h-20 rounded-xl object-cover shadow-smooth"
                    />
                    {contract.status === "active" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success animate-pulse" />
                    )}
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    {/* Header Row */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-semibold text-primary">{contract.contractNumber}</span>
                      <StatusBadge status={statusConfig.variant === "success" ? "available" : statusConfig.variant === "warning" ? "reserved" : statusConfig.variant === "destructive" ? "in_service" : "rented"}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig.label}
                      </StatusBadge>
                    </div>
                    
                    {/* Client & Car */}
                    <div className="flex items-center gap-4 text-sm mb-2">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="font-medium truncate max-w-[150px]">{contract.client.name}</span>
                        {contract.client.type === "company" && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-info/10 text-info">Įmonė</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Car className="h-3.5 w-3.5" />
                        <span>{contract.car.brand} {contract.car.model}</span>
                        <span className="font-mono text-xs bg-muted/50 px-1.5 py-0.5 rounded">{contract.car.plate}</span>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 flex-wrap">
                      {/* Dates */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1.5 cursor-help">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs">{formatDate(contract.startDate)}</span>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs">{formatDate(contract.endDate)}</span>
                            {contract.status === "active" && daysRemaining > 0 && (
                              <span className={`text-xs font-medium ${daysRemaining <= 3 ? 'text-warning' : 'text-muted-foreground'}`}>
                                ({daysRemaining}d)
                              </span>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p className="font-medium">Nuomos laikotarpis</p>
                          <p>{contract.startDate} – {contract.endDate}</p>
                        </TooltipContent>
                      </Tooltip>

                      <div className="w-px h-4 bg-border/50" />

                      {/* Enhanced Payment Progress */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 cursor-help">
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${paymentConfig.bg}`}>
                              <Euro className={`h-3 w-3 ${paymentConfig.color}`} />
                              <span className={`text-xs font-medium ${paymentConfig.color}`}>
                                {formatCurrency(contract.paidAmount)} / {formatCurrency(contract.totalAmount)}
                              </span>
                            </div>
                            <div className="relative w-20">
                              <Progress value={paymentProgress} className="h-2" />
                              <span className="absolute right-0 -top-4 text-[10px] font-medium text-muted-foreground">{paymentProgress}%</span>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p className="font-medium">Mokėjimo statusas</p>
                          <p>{paymentConfig.label} • {paymentProgress}%</p>
                          <p className="text-muted-foreground mt-1">Depozitas: {contract.depositPaid ? '✓' : '✗'} {formatCurrency(contract.deposit)}</p>
                        </TooltipContent>
                      </Tooltip>

                      <div className="w-px h-4 bg-border/50" />

                      {/* Signature */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1.5 cursor-help">
                            <FileSignature className={`h-3.5 w-3.5 ${contract.signedAt ? 'text-success' : 'text-muted-foreground'}`} />
                            <span className={`text-xs ${contract.signedAt ? 'text-success' : 'text-muted-foreground'}`}>
                              {contract.signedAt ? 'Pasirašyta' : 'Nepasirašyta'}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p className="font-medium">Sutarties pasirašymas</p>
                          {contract.signedAt ? <p>Pasirašyta: {contract.signedAt}</p> : <p>Laukiama parašo</p>}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end justify-between">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/contracts/${contract.id}`); }}>
                          <Eye className="h-4 w-4 mr-2" /> Peržiūrėti
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Download className="h-4 w-4 mr-2" /> Atsisiųsti PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Printer className="h-4 w-4 mr-2" /> Spausdinti
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Send className="h-4 w-4 mr-2" /> Siųsti klientui
                        </DropdownMenuItem>
                        {contract.paymentStatus !== "paid" && (
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <CreditCard className="h-4 w-4 mr-2" /> Registruoti mokėjimą
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Quick contact */}
                    <div className="flex gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `tel:${formatPhoneForCall(contract.client.phone)}`;
                            }}
                          >
                            <Phone className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">Skambinti</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `mailto:${contract.client.email}`;
                            }}
                          >
                            <Mail className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">Rašyti el. laišką</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                {/* Warning banner for overdue */}
                {(contract.status === "overdue" || contract.paymentStatus === "overdue") && contract.notes && (
                  <div className="px-4 py-2 bg-destructive/10 border-t border-destructive/20 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                    <span className="text-xs text-destructive">{contract.notes}</span>
                  </div>
                )}
              </Card>
            );
          })}
        </TooltipProvider>
      </div>

      {/* Contracts List - Mobile */}
      <div className="md:hidden space-y-3">
        {filteredContracts.map((contract) => {
          const statusConfig = getStatusConfig(contract.status);
          const paymentConfig = getPaymentStatusConfig(contract.paymentStatus);
          const paymentProgress = getPaymentProgress(contract.paidAmount, contract.totalAmount);
          const StatusIcon = statusConfig.icon;

          return (
            <Card 
              key={contract.id} 
              className="overflow-hidden bg-gradient-to-br from-card to-card/50"
              onClick={() => navigate(`/contracts/${contract.id}`)}
            >
              <div className="p-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-semibold text-primary">{contract.contractNumber}</span>
                  <StatusBadge status={statusConfig.variant === "success" ? "available" : statusConfig.variant === "warning" ? "reserved" : statusConfig.variant === "destructive" ? "in_service" : "rented"}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig.label}
                  </StatusBadge>
                </div>

                {/* Client & Car */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={contract.car.image}
                    alt={`${contract.car.brand} ${contract.car.model}`}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{contract.client.name}</p>
                    <p className="text-sm text-muted-foreground">{contract.car.brand} {contract.car.model} • {contract.car.plate}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(contract.startDate)} – {formatDate(contract.endDate)}</p>
                  </div>
                </div>

                {/* Enhanced Payment Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${paymentConfig.color}`}>
                      {formatCurrency(contract.paidAmount)} / {formatCurrency(contract.totalAmount)}
                    </span>
                    <span className={`text-xs font-medium ${paymentConfig.color}`}>{paymentProgress}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={paymentProgress} className="h-2.5" />
                    <div 
                      className="absolute top-0 h-full w-0.5 bg-foreground/30"
                      style={{ left: `${paymentProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-xs ${paymentConfig.bg} ${paymentConfig.color} px-1.5 py-0.5 rounded`}>
                      {paymentConfig.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Depozitas: {contract.depositPaid ? '✓' : '✗'} {formatCurrency(contract.deposit)}
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `tel:${formatPhoneForCall(contract.client.phone)}`;
                    }}
                  >
                    <Phone className="h-3.5 w-3.5 mr-1" />
                    Skambinti
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `mailto:${contract.client.email}`;
                    }}
                  >
                    <Mail className="h-3.5 w-3.5 mr-1" />
                    Rašyti
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      // PDF download logic
                    }}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>

              {/* Warning banner */}
              {(contract.status === "overdue" || contract.paymentStatus === "overdue") && contract.notes && (
                <div className="px-3 py-2 bg-destructive/10 border-t border-destructive/20 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  <span className="text-xs text-destructive">{contract.notes}</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredContracts.length === 0 && (
        <Card className="p-8 text-center bg-gradient-to-br from-card to-card/50">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="font-semibold mb-2">Nerasta sutarčių</h3>
          <p className="text-sm text-muted-foreground">Nėra sutarčių su pasirinktu filtru</p>
        </Card>
      )}
    </div>
  );
}
