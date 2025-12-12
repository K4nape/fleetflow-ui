import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Trash, Shield, Wrench } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Cars() {
  const navigate = useNavigate();
  
  // Mock data
  const cars = [
    {
      id: 1,
      plate: "ABC123",
      brand: "BMW",
      model: "X5",
      year: 2022,
      fuel: "Diesel",
      mileage: "45,230",
      status: "available" as const,
      image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=100&h=100&fit=crop",
      techInspection: "2025-02-15",
      insurance: "2025-08-20",
    },
    {
      id: 2,
      plate: "XYZ789",
      brand: "Audi",
      model: "A4",
      year: 2021,
      fuel: "Petrol",
      mileage: "32,100",
      status: "rented" as const,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop",
      techInspection: "2025-06-10",
      insurance: "2025-12-05",
    },
    {
      id: 3,
      plate: "DEF456",
      brand: "Mercedes",
      model: "C-Class",
      year: 2023,
      fuel: "Hybrid",
      mileage: "12,500",
      status: "in_service" as const,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&h=100&fit=crop",
      techInspection: "2024-11-30",
      insurance: "2025-03-15",
    },
    {
      id: 4,
      plate: "GHI789",
      brand: "Tesla",
      model: "Model 3",
      year: 2023,
      fuel: "Electric",
      mileage: "8,420",
      status: "reserved" as const,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100&h=100&fit=crop",
      techInspection: "2026-01-20",
      insurance: "2025-09-01",
    },
  ];

  // Helper to get days until expiration and status
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

      {/* Cars Table - Desktop */}
      <Card className="hidden md:block overflow-hidden bg-gradient-to-br from-card to-card/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left p-4 font-semibold">Automobilis</th>
                <th className="text-left p-4 font-semibold">Numeris</th>
                <th className="text-left p-4 font-semibold">Metai</th>
                <th className="text-left p-4 font-semibold">Kuras</th>
                <th className="text-left p-4 font-semibold">Rida (km)</th>
                <th className="text-left p-4 font-semibold">Dokumentai</th>
                <th className="text-left p-4 font-semibold">Statusas</th>
                <th className="text-right p-4 font-semibold">Veiksmai</th>
              </tr>
            </thead>
            <tbody>
              <TooltipProvider>
                {cars.map((car) => {
                  const techStatus = getExpirationStatus(car.techInspection);
                  const insuranceStatus = getExpirationStatus(car.insurance);
                  
                  return (
                    <tr
                      key={car.id}
                      className="border-b border-border/50 last:border-0 hover:bg-accent/20 transition-smooth"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={car.image}
                            alt={`${car.brand} ${car.model}`}
                            className="w-12 h-12 rounded-xl object-cover shadow-smooth"
                          />
                          <div>
                            <p className="font-medium">{car.brand} {car.model}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-mono font-semibold">{car.plate}</span>
                      </td>
                      <td className="p-4 text-muted-foreground">{car.year}</td>
                      <td className="p-4 text-muted-foreground">{car.fuel}</td>
                      <td className="p-4 text-muted-foreground">{car.mileage}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {/* Tech Inspection Indicator */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1.5 cursor-help">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(techStatus.status)}`} />
                                <Wrench className={`h-3.5 w-3.5 ${getStatusTextColor(techStatus.status)}`} />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                              <p className="font-medium">Tech. apžiūra</p>
                              <p className={getStatusTextColor(techStatus.status)}>
                                {techStatus.status === "expired" 
                                  ? `Pasibaigė prieš ${techStatus.days}d` 
                                  : `Liko ${techStatus.days}d`}
                              </p>
                              <p className="text-muted-foreground">{car.techInspection}</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          {/* Insurance Indicator */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1.5 cursor-help">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(insuranceStatus.status)}`} />
                                <Shield className={`h-3.5 w-3.5 ${getStatusTextColor(insuranceStatus.status)}`} />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                              <p className="font-medium">Draudimas</p>
                              <p className={getStatusTextColor(insuranceStatus.status)}>
                                {insuranceStatus.status === "expired" 
                                  ? `Pasibaigė prieš ${insuranceStatus.days}d` 
                                  : `Liko ${insuranceStatus.days}d`}
                              </p>
                              <p className="text-muted-foreground">{car.insurance}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={car.status} />
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="transition-smooth hover:bg-accent/50">
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
                      </td>
                    </tr>
                  );
                })}
              </TooltipProvider>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Cars Grid - Mobile */}
      <div className="grid md:hidden gap-4">
        <TooltipProvider>
          {cars.map((car) => {
            const techStatus = getExpirationStatus(car.techInspection);
            const insuranceStatus = getExpirationStatus(car.insurance);
            
            return (
              <Card key={car.id} className="overflow-hidden hover-lift bg-gradient-to-br from-card to-card/50">
                <div className="p-4 flex gap-4">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-20 h-20 rounded-xl object-cover shadow-smooth"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{car.brand} {car.model}</h3>
                        <p className="text-sm font-mono text-muted-foreground">{car.plate}</p>
                      </div>
                      <StatusBadge status={car.status} />
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{car.year}</span>
                      <span>{car.fuel}</span>
                      <span>{car.mileage} km</span>
                    </div>
                  </div>
                </div>
                
                {/* Document Status Bar */}
                <div className="px-4 py-2.5 bg-muted/30 border-t border-border/30 flex items-center gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 cursor-help">
                        <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(techStatus.status)}`} />
                        <Wrench className={`h-3.5 w-3.5 ${getStatusTextColor(techStatus.status)}`} />
                        <span className={`text-xs font-medium ${getStatusTextColor(techStatus.status)}`}>
                          {techStatus.label}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      <p className="font-medium">Tech. apžiūra</p>
                      <p className="text-muted-foreground">{car.techInspection}</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <div className="w-px h-4 bg-border/50" />
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 cursor-help">
                        <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(insuranceStatus.status)}`} />
                        <Shield className={`h-3.5 w-3.5 ${getStatusTextColor(insuranceStatus.status)}`} />
                        <span className={`text-xs font-medium ${getStatusTextColor(insuranceStatus.status)}`}>
                          {insuranceStatus.label}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      <p className="font-medium">Draudimas</p>
                      <p className="text-muted-foreground">{car.insurance}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </Card>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}
