import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Search, MoreVertical, Eye, Edit, Trash, Shield, Wrench, MapPin, Star, Calendar, TrendingUp, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Cars() {
  const navigate = useNavigate();
  
  // Mock data with extended info
  const cars = [
    {
      id: 1,
      plate: "ABC123",
      brand: "BMW",
      model: "X5",
      year: 2022,
      fuel: "Diesel",
      mileage: 45230,
      status: "available" as const,
      image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=100&h=100&fit=crop",
      techInspection: "2025-02-15",
      insurance: "2025-08-20",
      location: "office" as const,
      nextServiceKm: 50000,
      monthlyRevenue: 2450,
      rating: 4.8,
      totalRatings: 24,
      nextReservation: { date: "2024-12-18", client: "Jonas P." },
      lastRentalEnd: "2024-12-08",
    },
    {
      id: 2,
      plate: "XYZ789",
      brand: "Audi",
      model: "A4",
      year: 2021,
      fuel: "Petrol",
      mileage: 32100,
      status: "rented" as const,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop",
      techInspection: "2025-06-10",
      insurance: "2025-12-05",
      location: "client" as const,
      nextServiceKm: 40000,
      monthlyRevenue: 1890,
      rating: 4.5,
      totalRatings: 18,
      nextReservation: null,
      lastRentalEnd: null,
    },
    {
      id: 3,
      plate: "DEF456",
      brand: "Mercedes",
      model: "C-Class",
      year: 2023,
      fuel: "Hybrid",
      mileage: 12500,
      status: "in_service" as const,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&h=100&fit=crop",
      techInspection: "2024-11-30",
      insurance: "2025-03-15",
      location: "service" as const,
      nextServiceKm: 20000,
      monthlyRevenue: 980,
      rating: 4.9,
      totalRatings: 12,
      nextReservation: { date: "2024-12-20", client: "UAB Logistika" },
      lastRentalEnd: "2024-12-01",
    },
    {
      id: 4,
      plate: "GHI789",
      brand: "Tesla",
      model: "Model 3",
      year: 2023,
      fuel: "Electric",
      mileage: 8420,
      status: "reserved" as const,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100&h=100&fit=crop",
      techInspection: "2026-01-20",
      insurance: "2025-09-01",
      location: "office" as const,
      nextServiceKm: 15000,
      monthlyRevenue: 3200,
      rating: 5.0,
      totalRatings: 8,
      nextReservation: { date: "2024-12-15", client: "Petras K." },
      lastRentalEnd: "2024-12-10",
    },
  ];

  // Helper functions
  const getExpirationStatus = (dateString: string) => {
    const today = new Date();
    const expDate = new Date(dateString);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: "expired", days: Math.abs(diffDays), label: "Pasibaigė" };
    if (diffDays <= 30) return { status: "warning", days: diffDays, label: `${diffDays}d` };
    return { status: "ok", days: diffDays, label: `${diffDays}d` };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "expired": return "bg-destructive";
      case "warning": return "bg-warning";
      default: return "bg-success";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "expired": return "text-destructive";
      case "warning": return "text-warning";
      default: return "text-success";
    }
  };

  const getLocationInfo = (location: string) => {
    switch (location) {
      case "office": return { label: "Biuras", color: "bg-primary", textColor: "text-primary" };
      case "client": return { label: "Pas klientą", color: "bg-info", textColor: "text-info" };
      case "service": return { label: "Servise", color: "bg-warning", textColor: "text-warning" };
      case "parking": return { label: "Aikštelė", color: "bg-muted-foreground", textColor: "text-muted-foreground" };
      default: return { label: "Nežinoma", color: "bg-muted", textColor: "text-muted-foreground" };
    }
  };

  const getServiceProgress = (currentKm: number, nextServiceKm: number) => {
    const serviceInterval = 10000; // Every 10k km
    const lastServiceKm = nextServiceKm - serviceInterval;
    const progress = ((currentKm - lastServiceKm) / serviceInterval) * 100;
    const remaining = nextServiceKm - currentKm;
    return { progress: Math.min(progress, 100), remaining };
  };

  const getIdleDays = (lastRentalEnd: string | null) => {
    if (!lastRentalEnd) return null;
    const today = new Date();
    const lastEnd = new Date(lastRentalEnd);
    const diffTime = today.getTime() - lastEnd.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('lt-LT', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-warning text-warning' : 'text-muted-foreground/30'}`}
      />
    ));
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent truncate">
            Mašinų parkas
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg hidden sm:block">Valdykite savo automobilių parką</p>
        </div>
        <Button className="shadow-lg flex-shrink-0" onClick={() => navigate("/cars/new")}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Pridėti mašiną</span>
          <span className="sm:hidden">Pridėti</span>
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-3 sm:p-4 bg-gradient-to-br from-card to-card/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Paieška..."
              className="pl-10 bg-background/50 border-border/50 focus:ring-primary/50 rounded-xl text-sm"
            />
          </div>
          <Select>
            <SelectTrigger className="bg-background/50 border-border/50 rounded-xl text-sm">
              <SelectValue placeholder="Statusas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Visi</SelectItem>
              <SelectItem value="available">Laisva</SelectItem>
              <SelectItem value="rented">Išnuomota</SelectItem>
              <SelectItem value="in_service">Servise</SelectItem>
              <SelectItem value="reserved">Rezervuota</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="bg-background/50 border-border/50 rounded-xl text-sm">
              <SelectValue placeholder="Kuras" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Visi</SelectItem>
              <SelectItem value="petrol">Benzinas</SelectItem>
              <SelectItem value="diesel">Dyzelis</SelectItem>
              <SelectItem value="electric">Elektra</SelectItem>
              <SelectItem value="hybrid">Hibridinis</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Cars Grid - Desktop */}
      <div className="hidden md:grid gap-4">
        <TooltipProvider>
          {cars.map((car) => {
            const techStatus = getExpirationStatus(car.techInspection);
            const insuranceStatus = getExpirationStatus(car.insurance);
            const locationInfo = getLocationInfo(car.location);
            const serviceProgress = getServiceProgress(car.mileage, car.nextServiceKm);
            const idleDays = getIdleDays(car.lastRentalEnd);
            
            return (
              <Card key={car.id} className="overflow-hidden bg-gradient-to-br from-card to-card/50 hover:shadow-smooth-lg transition-smooth">
                <div className="p-4 flex gap-4 items-stretch">
                  {/* Car Image with Location Badge */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-24 h-24 rounded-xl object-cover shadow-smooth"
                    />
                    {/* Location indicator */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${locationInfo.color} flex items-center justify-center shadow-sm cursor-help`}>
                          <MapPin className="h-3 w-3 text-white" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        <p className="font-medium">Lokacija</p>
                        <p>{locationInfo.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0 space-y-3">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg truncate">{car.brand} {car.model}</h3>
                          <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">{car.plate}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span>{car.year}</span>
                          <span>•</span>
                          <span>{car.fuel}</span>
                          <span>•</span>
                          <span>{car.mileage.toLocaleString()} km</span>
                        </div>
                      </div>
                      <StatusBadge status={car.status} />
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 flex-wrap">
                      {/* Rating */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1.5 cursor-help">
                            <div className="flex">{renderStars(car.rating)}</div>
                            <span className="text-xs font-medium text-muted-foreground">({car.totalRatings})</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p className="font-medium">Klientų įvertinimas</p>
                          <p>{car.rating} iš 5 ({car.totalRatings} atsiliepimai)</p>
                        </TooltipContent>
                      </Tooltip>

                      <div className="w-px h-4 bg-border/50" />

                      {/* Monthly Revenue */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1.5 cursor-help">
                            <TrendingUp className="h-3.5 w-3.5 text-success" />
                            <span className="text-xs font-semibold text-success">{formatCurrency(car.monthlyRevenue)}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p className="font-medium">Šio mėnesio pajamos</p>
                        </TooltipContent>
                      </Tooltip>

                      <div className="w-px h-4 bg-border/50" />

                      {/* Service Progress */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 cursor-help min-w-[100px]">
                            <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                            <Progress 
                              value={serviceProgress.progress} 
                              className="h-1.5 flex-1"
                            />
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{serviceProgress.remaining.toLocaleString()} km</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p className="font-medium">Iki serviso</p>
                          <p>Liko {serviceProgress.remaining.toLocaleString()} km</p>
                        </TooltipContent>
                      </Tooltip>

                      <div className="w-px h-4 bg-border/50" />

                      {/* Documents */}
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 cursor-help">
                              <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(techStatus.status)}`} />
                              <Wrench className={`h-3 w-3 ${getStatusTextColor(techStatus.status)}`} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            <p className="font-medium">Tech. apžiūra</p>
                            <p className={getStatusTextColor(techStatus.status)}>
                              {techStatus.status === "expired" ? `Pasibaigė prieš ${techStatus.days}d` : `Liko ${techStatus.days}d`}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 cursor-help">
                              <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(insuranceStatus.status)}`} />
                              <Shield className={`h-3 w-3 ${getStatusTextColor(insuranceStatus.status)}`} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            <p className="font-medium">Draudimas</p>
                            <p className={getStatusTextColor(insuranceStatus.status)}>
                              {insuranceStatus.status === "expired" ? `Pasibaigė prieš ${insuranceStatus.days}d` : `Liko ${insuranceStatus.days}d`}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Info */}
                  <div className="flex-shrink-0 text-right space-y-2 min-w-[140px]">
                    {/* Next Reservation */}
                    {car.nextReservation ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs cursor-help">
                            <Calendar className="h-3 w-3" />
                            <span className="font-medium">{car.nextReservation.date}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="text-xs">
                          <p className="font-medium">Artimiausia rezervacija</p>
                          <p>{car.nextReservation.client}</p>
                          <p className="text-muted-foreground">{car.nextReservation.date}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-muted/50 text-muted-foreground rounded-lg text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>Nėra rezervacijų</span>
                      </div>
                    )}

                    {/* Idle Days */}
                    {idleDays !== null && car.status === "available" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs cursor-help ${
                            idleDays > 7 ? 'bg-warning/10 text-warning' : 'bg-muted/50 text-muted-foreground'
                          }`}>
                            <Clock className="h-3 w-3" />
                            <span className="font-medium">Stovi {idleDays}d</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="text-xs">
                          <p className="font-medium">Paskutinė nuoma baigėsi</p>
                          <p>{car.lastRentalEnd}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>

                  {/* Actions Menu - Far Right */}
                  <div className="flex-shrink-0 flex items-center border-l border-border/30 pl-4 ml-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 transition-smooth hover:bg-accent/50">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => navigate(`/cars/${car.id}`)}>
                          <Eye className="h-4 w-4" />
                          Peržiūrėti
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Edit className="h-4 w-4" />
                          Redaguoti
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive cursor-pointer">
                          <Trash className="h-4 w-4" />
                          Ištrinti
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            );
          })}
        </TooltipProvider>
      </div>

      {/* Cars Grid - Mobile */}
      <div className="grid md:hidden gap-4">
        <TooltipProvider>
          {cars.map((car) => {
            const techStatus = getExpirationStatus(car.techInspection);
            const insuranceStatus = getExpirationStatus(car.insurance);
            const locationInfo = getLocationInfo(car.location);
            const serviceProgress = getServiceProgress(car.mileage, car.nextServiceKm);
            const idleDays = getIdleDays(car.lastRentalEnd);
            
            return (
              <Card key={car.id} className="overflow-hidden hover-lift bg-gradient-to-br from-card to-card/50">
                <div className="p-4 flex gap-3">
                  {/* Car Image with Location Badge */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-20 h-20 rounded-xl object-cover shadow-smooth"
                    />
                    <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${locationInfo.color} flex items-center justify-center shadow-sm`}>
                      <MapPin className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold truncate">{car.brand} {car.model}</h3>
                        <p className="text-xs font-mono text-muted-foreground">{car.plate}</p>
                      </div>
                      <StatusBadge status={car.status} />
                    </div>
                    
                    {/* Rating & Revenue Row */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="flex">{renderStars(car.rating)}</div>
                        <span className="text-xs text-muted-foreground">({car.totalRatings})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-success" />
                        <span className="text-xs font-medium text-success">{formatCurrency(car.monthlyRevenue)}</span>
                      </div>
                    </div>

                    {/* Next Reservation */}
                    {car.nextReservation && (
                      <div className="flex items-center gap-1.5 text-xs text-primary">
                        <Calendar className="h-3 w-3" />
                        <span>{car.nextReservation.date} • {car.nextReservation.client}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Bottom Status Bar */}
                <div className="px-4 py-2.5 bg-muted/30 border-t border-border/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Documents */}
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1 cursor-help">
                            <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(techStatus.status)}`} />
                            <Wrench className={`h-3 w-3 ${getStatusTextColor(techStatus.status)}`} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p className="font-medium">Tech. apžiūra: {techStatus.label}</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1 cursor-help">
                            <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(insuranceStatus.status)}`} />
                            <Shield className={`h-3 w-3 ${getStatusTextColor(insuranceStatus.status)}`} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p className="font-medium">Draudimas: {insuranceStatus.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="w-px h-3 bg-border/50" />

                    {/* Service Progress - Compact */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1.5 cursor-help">
                          <Progress value={serviceProgress.progress} className="h-1 w-12" />
                          <span className="text-xs text-muted-foreground">{(serviceProgress.remaining / 1000).toFixed(0)}k</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        <p className="font-medium">Iki serviso: {serviceProgress.remaining.toLocaleString()} km</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Idle Days */}
                  {idleDays !== null && car.status === "available" && (
                    <div className={`flex items-center gap-1 text-xs ${idleDays > 7 ? 'text-warning' : 'text-muted-foreground'}`}>
                      <Clock className="h-3 w-3" />
                      <span>{idleDays}d</span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}
