import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import {
  ArrowLeft,
  Edit,
  Trash,
  Calendar,
  Fuel,
  Gauge,
  Shield,
  Wrench,
  Package,
  AlertTriangle,
  Euro,
  Clock,
  Play,
  CalendarPlus,
  TrendingUp,
  Users,
  FileText,
  MapPin,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - would come from API
  const car = {
    id: 1,
    plate: "ABC123",
    vin: "WBA3B5G59DNP26082",
    make: "BMW",
    model: "X5",
    year: 2022,
    fuel: "Diesel",
    mileage: 45230,
    status: "available" as const,
    currentLocation: "Vilnius, Konstitucijos pr. 12",
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617531653520-bd788c51e3e5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617531653572-5f6c7f6e6e6e?w=800&h=600&fit=crop",
    ],
    statistics: {
      totalRentals: 47,
      totalEarnings: 4250,
      avgDuration: 4.2,
      utilizationRate: 78,
      thisMonthEarnings: 580,
      lastMonthEarnings: 720,
    },
    recentRentals: [
      { id: 1, clientName: "Jonas Jonaitis", startDate: "2024-12-01", endDate: "2024-12-05", amount: 180 },
      { id: 2, clientName: "Petras Petraitis", startDate: "2024-11-20", endDate: "2024-11-25", amount: 200 },
      { id: 3, clientName: "UAB Transportas", startDate: "2024-11-10", endDate: "2024-11-15", amount: 175 },
      { id: 4, clientName: "Ona Onaitė", startDate: "2024-10-28", endDate: "2024-11-02", amount: 225 },
    ],
    upcomingReservations: [
      { id: 1, startDate: "2024-12-15", endDate: "2024-12-18", clientName: "Marius Marijonas" },
      { id: 2, startDate: "2024-12-22", endDate: "2024-12-28", clientName: "UAB Kelionės" },
    ],
    documents: [
      { id: 1, name: "Civilinis draudimas", type: "insurance", expiresAt: "2025-03-15", fileUrl: "#" },
      { id: 2, name: "Kasko draudimas", type: "insurance", expiresAt: "2025-06-20", fileUrl: "#" },
      { id: 3, name: "Registracijos dokumentai", type: "registration", fileUrl: "#" },
      { id: 4, name: "Techninė apžiūra", type: "inspection", expiresAt: "2025-02-10", fileUrl: "#" },
    ],
    insurance: {
      liability: { expiresAt: "2025-03-15", daysLeft: 104 },
      kasko: { expiresAt: "2025-06-20", franchise: 500, daysLeft: 201 },
    },
    technical: {
      inspection: { expiresAt: "2025-02-10", daysLeft: 71 },
      oilChange: { nextAt: 50000 },
      nextService: "2025-04-15",
    },
    equipment: {
      standard: ["Kondicionierius", "Bluetooth", "AUX/USB", "Parkavimo jutikliai", "Signalizacija", "Vairo stiprintuvas"],
      additional: ["Odinis salonas", "Panoraminis stogas", "LED žibintai"],
    },
    inventory: [
      { item: "Atsarginis ratas", quantity: 1, condition: "good", notes: "" },
      { item: "Kėlimo įrankiai", quantity: 1, condition: "good", notes: "" },
      { item: "Valytuvas", quantity: 1, condition: "good", notes: "" },
      { item: "Pirmosios pagalbos rinkinys", quantity: 1, condition: "new", notes: "" },
    ],
    pricing: [
      { from: 1, to: 3, price: 45 },
      { from: 4, to: 7, price: 40 },
      { from: 8, to: 14, price: 35 },
      { from: 15, to: null, price: 30 },
    ],
    defects: [
      {
        id: 1,
        severity: "minor" as const,
        location: "front" as const,
        description: "Nedidelis įbrėžimas priekyje dešinėje",
        reportedAt: "2024-11-15",
      },
    ],
    serviceHistory: [
      {
        id: 1,
        date: "2024-10-20",
        type: "oil_change",
        description: "Tepalų ir filtrų keitimas",
        mileage: 45000,
        cost: 120,
      },
      {
        id: 2,
        date: "2024-08-10",
        type: "technical_inspection",
        description: "Techninė apžiūra",
        mileage: 43500,
        cost: 25,
      },
      {
        id: 3,
        date: "2024-05-15",
        type: "repair",
        description: "Stabdžių kaladėlių keitimas",
        mileage: 41000,
        cost: 180,
      },
    ],
    notes: "Automobilis puikios būklės, reguliariai prižiūrimas. Pageidautina trumpalaikė nuoma.",
  };

  const [mainImage, setMainImage] = React.useState(0);
  const [calendarWeekOffset, setCalendarWeekOffset] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxImage, setLightboxImage] = React.useState(0);
  const [lightboxZoom, setLightboxZoom] = React.useState(1);

  const severityConfig = {
    minor: { label: "Nedidelis", className: "bg-info/10 text-info border-info/20" },
    moderate: { label: "Vidutinis", className: "bg-warning/10 text-warning border-warning/20" },
    severe: { label: "Rimtas", className: "bg-destructive/10 text-destructive border-destructive/20" },
  };

  const serviceTypeConfig = {
    oil_change: { label: "Tepalų keitimas", icon: Wrench },
    technical_inspection: { label: "Techninė apžiūra", icon: Shield },
    repair: { label: "Remontas", icon: Wrench },
    maintenance: { label: "Aptarnavimas", icon: Package },
  };

  // Generate calendar days for mini calendar (2 weeks)
  const generateCalendarDays = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() + (calendarWeekOffset * 7));
    
    const days = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const reservation = car.upcomingReservations.find(r => {
        const start = new Date(r.startDate);
        const end = new Date(r.endDate);
        return date >= start && date <= end;
      });
      
      days.push({
        date,
        dateStr,
        dayNumber: date.getDate(),
        dayName: date.toLocaleDateString('lt-LT', { weekday: 'short' }),
        isToday: dateStr === today.toISOString().split('T')[0],
        reservation,
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const openLightbox = (index: number) => {
    setLightboxImage(index);
    setLightboxZoom(1);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxZoom(1);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setLightboxImage((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
    } else {
      setLightboxImage((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
    }
    setLightboxZoom(1);
  };

  // Handle keyboard navigation in lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
        {/* Hero Header with Background */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 mb-6">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={car.images[0]}
              alt=""
              className="w-full h-full object-cover blur-2xl opacity-30 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-8">
            {/* Header with Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/cars")}
                  className="flex-shrink-0 bg-background/50 backdrop-blur-sm hover:bg-background/70"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {car.make} {car.model}
                    </h1>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={car.status} />
                      {car.status === "available" && (
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1">
                    {car.plate} • VIN: {car.vin}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{car.currentLocation}</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 flex-wrap sm:flex-nowrap">
                <Button className="gap-2 flex-1 sm:flex-none shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                  <Play className="h-4 w-4" />
                  <span className="hidden sm:inline">Pradėti nuomą</span>
                  <span className="sm:hidden">Nuomoti</span>
                </Button>
                <Button variant="outline" className="gap-2 flex-1 sm:flex-none bg-background/50 backdrop-blur-sm hover:bg-background/70">
                  <CalendarPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Rezervuoti</span>
                  <span className="sm:hidden">Rezerv.</span>
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigate(`/cars/${id}/edit`)} className="bg-background/50 backdrop-blur-sm hover:bg-background/70">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="text-destructive hover:text-destructive bg-background/50 backdrop-blur-sm hover:bg-background/70">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card className="group p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] transition-all duration-300 cursor-default">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Nuomų</p>
                <p className="text-xl font-bold">{car.statistics.totalRentals}</p>
              </div>
            </div>
          </Card>
          
          <Card className="group p-4 bg-gradient-to-br from-success/10 to-success/5 border-success/20 hover:shadow-lg hover:shadow-success/10 hover:scale-[1.02] transition-all duration-300 cursor-default">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-success/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Euro className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Uždirbta</p>
                <p className="text-xl font-bold">€{car.statistics.totalEarnings}</p>
              </div>
            </div>
          </Card>
          
          <Card className="group p-4 bg-gradient-to-br from-info/10 to-info/5 border-info/20 hover:shadow-lg hover:shadow-info/10 hover:scale-[1.02] transition-all duration-300 cursor-default">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-info/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Vid. trukmė</p>
                <p className="text-xl font-bold">{car.statistics.avgDuration}d.</p>
              </div>
            </div>
          </Card>
          
          <Card className="group p-4 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20 hover:shadow-lg hover:shadow-warning/10 hover:scale-[1.02] transition-all duration-300 cursor-default">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-warning/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Gauge className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Užimtumas</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">{car.statistics.utilizationRate}%</p>
                </div>
              </div>
            </div>
            {/* Animated progress bar */}
            <div className="mt-3 h-1.5 bg-warning/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-warning rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${car.statistics.utilizationRate}%`,
                  animation: 'progressAnimation 1s ease-out'
                }}
              />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Professional Car Card with Gallery + Info */}
            <Card className="overflow-hidden border-0 shadow-xl bg-card">
              {/* Main Image Section */}
              <div 
                className="relative aspect-[16/9] bg-muted overflow-hidden cursor-zoom-in group"
                onClick={() => openLightbox(mainImage)}
              >
                <img
                  src={car.images[mainImage]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Elegant gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Zoom indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                    <ZoomIn className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Car name overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                        {car.make} {car.model}
                      </h2>
                      <p className="text-white/70 text-sm mt-1">{car.year} • {car.fuel}</p>
                    </div>
                    <div className="hidden sm:block">
                      <span className="font-mono text-lg font-bold text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                        {car.plate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Image counter badge */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  {mainImage + 1} / {car.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery - Below image */}
              <div className="p-3 sm:p-4 bg-muted/30 border-b border-border/50">
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMainImage(index);
                      }}
                      className={cn(
                        "relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden transition-all flex-shrink-0",
                        mainImage === index
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 shadow-lg"
                          : "opacity-60 hover:opacity-100 hover:scale-105"
                      )}
                    >
                      <img
                        src={image}
                        alt={`Nuotrauka ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {mainImage === index && (
                        <div className="absolute inset-0 border-2 border-primary rounded-lg" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Car Details Grid - Clean modern design */}
              <div className="p-4 sm:p-6">
                {/* Primary Info Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Valst. Nr.</p>
                    <p className="text-lg font-mono font-bold text-primary">{car.plate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Metai</p>
                    <p className="text-lg font-semibold">{car.year}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Kuras</p>
                    <p className="text-lg font-semibold">{car.fuel}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Rida</p>
                    <p className="text-lg font-semibold">{car.mileage.toLocaleString()} <span className="text-sm text-muted-foreground">km</span></p>
                  </div>
                </div>
                
                {/* Separator */}
                <div className="my-4 sm:my-5 border-t border-border/50" />

                {/* Secondary Info Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                    <div className="p-2 rounded-lg bg-background">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">VIN kodas</p>
                      <p className="text-sm font-mono truncate">{car.vin}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                    <div className="p-2 rounded-lg bg-background">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Dabartinė vieta</p>
                      <p className="text-sm truncate">{car.currentLocation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Mini Calendar */}

            {/* Insurance & Technical */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Draudimai ir techninė
              </h2>
              <div className="space-y-3">
                <div className={cn(
                  "group p-3 sm:p-4 rounded-xl border-l-4 hover:scale-[1.01] transition-all duration-300",
                  car.insurance.liability.daysLeft < 30
                    ? "bg-destructive/10 border-destructive hover:shadow-lg hover:shadow-destructive/10"
                    : car.insurance.liability.daysLeft < 60
                    ? "bg-warning/10 border-warning hover:shadow-lg hover:shadow-warning/10"
                    : "bg-success/10 border-success hover:shadow-lg hover:shadow-success/10"
                )}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">Civilinis draudimas</p>
                      <p className="text-sm text-muted-foreground truncate">
                        Galioja iki: {car.insurance.liability.expiresAt}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-background/50 whitespace-nowrap">
                      {car.insurance.liability.daysLeft} d.
                    </span>
                  </div>
                </div>

                <div className={cn(
                  "group p-3 sm:p-4 rounded-xl border-l-4 hover:scale-[1.01] transition-all duration-300",
                  car.insurance.kasko.daysLeft < 30
                    ? "bg-destructive/10 border-destructive hover:shadow-lg hover:shadow-destructive/10"
                    : car.insurance.kasko.daysLeft < 60
                    ? "bg-warning/10 border-warning hover:shadow-lg hover:shadow-warning/10"
                    : "bg-success/10 border-success hover:shadow-lg hover:shadow-success/10"
                )}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">Kasko draudimas</p>
                      <p className="text-sm text-muted-foreground truncate">
                        Galioja iki: {car.insurance.kasko.expiresAt} • Franchizė: €{car.insurance.kasko.franchise}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-background/50 whitespace-nowrap">
                      {car.insurance.kasko.daysLeft} d.
                    </span>
                  </div>
                </div>

                <div className={cn(
                  "group p-3 sm:p-4 rounded-xl border-l-4 hover:scale-[1.01] transition-all duration-300",
                  car.technical.inspection.daysLeft < 14
                    ? "bg-destructive/10 border-destructive hover:shadow-lg hover:shadow-destructive/10"
                    : car.technical.inspection.daysLeft < 30
                    ? "bg-warning/10 border-warning hover:shadow-lg hover:shadow-warning/10"
                    : "bg-success/10 border-success hover:shadow-lg hover:shadow-success/10"
                )}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">Techninė apžiūra</p>
                      <p className="text-sm text-muted-foreground truncate">
                        Galioja iki: {car.technical.inspection.expiresAt}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-background/50 whitespace-nowrap">
                      {car.technical.inspection.daysLeft} d.
                    </span>
                  </div>
                </div>

                <div className="group p-3 sm:p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium">Tepalų keitimas</p>
                    <p className="text-sm text-muted-foreground">{car.technical.oilChange.nextAt.toLocaleString()} km</p>
                  </div>
                  {/* Progress to oil change */}
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${(car.mileage / car.technical.oilChange.nextAt) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Liko {(car.technical.oilChange.nextAt - car.mileage).toLocaleString()} km
                  </p>
                </div>
              </div>
            </Card>

            {/* Equipment */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Komplektacija</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Standartinė</h3>
                  <div className="flex flex-wrap gap-2">
                    {car.equipment.standard.map((item, index) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg border border-primary/20 hover:bg-primary/20 hover:scale-105 transition-all duration-200 cursor-default"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {car.equipment.additional.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Papildoma</h3>
                    <div className="flex flex-wrap gap-2">
                      {car.equipment.additional.map((item, index) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 bg-accent/50 text-accent-foreground text-sm rounded-lg border border-accent hover:bg-accent hover:scale-105 transition-all duration-200 cursor-default"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Inventory */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Inventorius
              </h2>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[500px] sm:min-w-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-semibold">Daiktas</th>
                        <th className="text-center p-2 sm:p-3 text-xs sm:text-sm font-semibold">Kiekis</th>
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-semibold">Būklė</th>
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-semibold hidden sm:table-cell">Pastabos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {car.inventory.map((item, index) => (
                        <tr key={index} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-2 sm:p-3 text-sm">{item.item}</td>
                          <td className="p-2 sm:p-3 text-center text-sm">{item.quantity}</td>
                          <td className="p-2 sm:p-3">
                            <span
                              className={cn(
                                "text-xs px-2 py-1 rounded-lg",
                                item.condition === "new" && "bg-success/10 text-success",
                                item.condition === "good" && "bg-primary/10 text-primary",
                                item.condition === "fair" && "bg-warning/10 text-warning",
                                item.condition === "poor" && "bg-destructive/10 text-destructive"
                              )}
                            >
                              {item.condition === "new" && "Naujas"}
                              {item.condition === "good" && "Geras"}
                              {item.condition === "fair" && "Patenkinamas"}
                              {item.condition === "poor" && "Blogas"}
                            </span>
                          </td>
                          <td className="p-2 sm:p-3 text-sm text-muted-foreground hidden sm:table-cell">
                            {item.notes || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Monthly Earnings Comparison */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Mėnesio pajamos
              </h2>
              <div className="space-y-3">
                <div className="group flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all duration-300">
                  <span className="text-sm text-muted-foreground">Šį mėnesį</span>
                  <span className="text-lg font-bold text-success">€{car.statistics.thisMonthEarnings}</span>
                </div>
                <div className="group flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all duration-300">
                  <span className="text-sm text-muted-foreground">Praėjusį mėnesį</span>
                  <span className="text-lg font-bold">€{car.statistics.lastMonthEarnings}</span>
                </div>
                <div className="pt-2 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pokytis</span>
                    <span className={cn(
                      "text-sm font-semibold px-2 py-1 rounded-lg",
                      car.statistics.thisMonthEarnings >= car.statistics.lastMonthEarnings 
                        ? "text-success bg-success/10" 
                        : "text-destructive bg-destructive/10"
                    )}>
                      {car.statistics.thisMonthEarnings >= car.statistics.lastMonthEarnings ? "+" : ""}
                      {Math.round(((car.statistics.thisMonthEarnings - car.statistics.lastMonthEarnings) / car.statistics.lastMonthEarnings) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Rentals */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Paskutinės nuomos
              </h2>
              <div className="space-y-3">
                {car.recentRentals.map((rental, index) => (
                  <div
                    key={rental.id}
                    className="group p-3 bg-muted/30 rounded-xl hover:bg-muted/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">{rental.clientName}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {rental.startDate} – {rental.endDate}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-primary">€{rental.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pricing */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <Euro className="h-5 w-5 text-primary" />
                Kainodara
              </h2>
              <div className="space-y-2">
                {car.pricing.map((tier, index) => (
                  <div
                    key={index}
                    className="group p-3 sm:p-4 bg-muted/30 rounded-xl hover:bg-muted/50 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-muted-foreground">
                        {tier.from}
                        {tier.to ? `-${tier.to}` : "+"} d.
                      </span>
                      <span className="text-lg font-bold text-primary group-hover:scale-110 transition-transform">€{tier.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">už dieną</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Documents */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Dokumentai
              </h2>
              <div className="space-y-2">
                {car.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="group flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{doc.name}</p>
                      {doc.expiresAt && (
                        <p className="text-xs text-muted-foreground">Iki: {doc.expiresAt}</p>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Active Defects */}
            {car.defects.length > 0 && (
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Aktyvūs defektai
                </h2>
                <div className="space-y-3">
                  {car.defects.map((defect) => (
                    <div key={defect.id} className="group p-3 sm:p-4 bg-muted/30 rounded-xl hover:bg-muted/50 hover:scale-[1.01] transition-all duration-300">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span
                          className={cn(
                            "text-xs px-2 py-1 rounded-lg border",
                            severityConfig[defect.severity].className
                          )}
                        >
                          {severityConfig[defect.severity].label}
                        </span>
                        <span className="text-xs text-muted-foreground">{defect.reportedAt}</span>
                      </div>
                      <p className="text-sm font-medium mb-1">{defect.description}</p>
                      <p className="text-xs text-muted-foreground capitalize">{defect.location}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Service History */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Serviso istorija
              </h2>
              <div className="space-y-3">
                {car.serviceHistory.map((service, index) => {
                  const ServiceIcon = serviceTypeConfig[service.type].icon;
                  return (
                    <div
                      key={service.id}
                      className="group p-3 sm:p-4 bg-muted/30 rounded-xl hover:bg-muted/50 hover:scale-[1.02] transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                          <ServiceIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">{service.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {service.date} • {service.mileage.toLocaleString()} km
                          </p>
                          <p className="text-sm font-semibold text-primary mt-1">€{service.cost}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Notes */}
            {car.notes && (
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
                <h2 className="text-lg sm:text-xl font-semibold mb-3">Pastabos</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{car.notes}</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Zoom controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 rounded-full px-4 py-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-8 w-8"
              onClick={(e) => { e.stopPropagation(); setLightboxZoom(prev => Math.max(0.5, prev - 0.25)); }}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-white text-sm min-w-[3rem] text-center">{Math.round(lightboxZoom * 100)}%</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-8 w-8"
              onClick={(e) => { e.stopPropagation(); setLightboxZoom(prev => Math.min(3, prev + 0.25)); }}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 rounded-full px-4 py-1">
            {lightboxImage + 1} / {car.images.length}
          </div>

          {/* Main image */}
          <div 
            className="max-w-[90vw] max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={car.images[lightboxImage]}
              alt={`${car.make} ${car.model}`}
              className="max-w-full max-h-[85vh] object-contain transition-transform duration-300"
              style={{ transform: `scale(${lightboxZoom})` }}
            />
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
            {car.images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setLightboxImage(index); setLightboxZoom(1); }}
                className={cn(
                  "w-12 h-12 rounded-lg overflow-hidden border-2 transition-all",
                  lightboxImage === index
                    ? "border-white scale-110"
                    : "border-white/30 hover:border-white/60 opacity-60 hover:opacity-100"
                )}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes progressAnimation {
          from { width: 0; }
        }
      `}</style>
    </>
  );
}
