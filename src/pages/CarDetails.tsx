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
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617531653520-bd788c51e3e5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617531653572-5f6c7f6e6e6e?w=800&h=600&fit=crop",
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

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/cars")}
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {car.make} {car.model}
              </h1>
              <StatusBadge status={car.status} />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              {car.plate} • VIN: {car.vin}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="hidden sm:flex text-destructive hover:text-destructive">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Image Gallery */}
          <Card className="overflow-hidden bg-gradient-to-br from-card to-card/50">
            <div className="aspect-video bg-muted relative overflow-hidden group">
              <img
                src={car.images[mainImage]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3 sm:p-4 flex gap-2 sm:gap-3 overflow-x-auto">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={cn(
                    "w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                    mainImage === index
                      ? "border-primary shadow-lg scale-105"
                      : "border-border/50 hover:border-primary/50"
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
          </Card>

          {/* Basic Info */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Pagrindinė informacija</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-muted/30 rounded-xl">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Metai</p>
                  <p className="font-semibold truncate">{car.year}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-muted/30 rounded-xl">
                <Fuel className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Kuras</p>
                  <p className="font-semibold truncate">{car.fuel}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-muted/30 rounded-xl col-span-2 sm:col-span-1">
                <Gauge className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Rida</p>
                  <p className="font-semibold truncate">{car.mileage.toLocaleString()} km</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Insurance & Technical */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Draudimai ir techninė
            </h2>
            <div className="space-y-3">
              <div className={cn(
                "p-3 sm:p-4 rounded-xl border-l-4",
                car.insurance.liability.daysLeft < 30
                  ? "bg-destructive/10 border-destructive"
                  : car.insurance.liability.daysLeft < 60
                  ? "bg-warning/10 border-warning"
                  : "bg-success/10 border-success"
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
                "p-3 sm:p-4 rounded-xl border-l-4",
                car.insurance.kasko.daysLeft < 30
                  ? "bg-destructive/10 border-destructive"
                  : car.insurance.kasko.daysLeft < 60
                  ? "bg-warning/10 border-warning"
                  : "bg-success/10 border-success"
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
                "p-3 sm:p-4 rounded-xl border-l-4",
                car.technical.inspection.daysLeft < 14
                  ? "bg-destructive/10 border-destructive"
                  : car.technical.inspection.daysLeft < 30
                  ? "bg-warning/10 border-warning"
                  : "bg-success/10 border-success"
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

              <div className="p-3 sm:p-4 rounded-xl bg-muted/30">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">Tepalų keitimas</p>
                  <p className="text-sm text-muted-foreground">{car.technical.oilChange.nextAt.toLocaleString()} km</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Equipment */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Komplektacija</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Standartinė</h3>
                <div className="flex flex-wrap gap-2">
                  {car.equipment.standard.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg border border-primary/20"
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
                    {car.equipment.additional.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 bg-accent/50 text-accent-foreground text-sm rounded-lg border border-accent"
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
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
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
                      <tr key={index} className="border-b border-border/30 last:border-0">
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
          {/* Pricing */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <Euro className="h-5 w-5 text-primary" />
              Kainodara
            </h2>
            <div className="space-y-2">
              {car.pricing.map((tier, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground">
                      {tier.from}
                      {tier.to ? `-${tier.to}` : "+"} d.
                    </span>
                    <span className="text-lg font-bold text-primary">€{tier.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">už dieną</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Defects */}
          {car.defects.length > 0 && (
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Aktyvūs defektai
              </h2>
              <div className="space-y-3">
                {car.defects.map((defect) => (
                  <div key={defect.id} className="p-3 sm:p-4 bg-muted/30 rounded-xl">
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
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Serviso istorija
            </h2>
            <div className="space-y-3">
              {car.serviceHistory.map((service) => {
                const ServiceIcon = serviceTypeConfig[service.type].icon;
                return (
                  <div
                    key={service.id}
                    className="p-3 sm:p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-smooth"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        <ServiceIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{service.description}</p>
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
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
              <h2 className="text-lg sm:text-xl font-semibold mb-3">Pastabos</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{car.notes}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Import React at the top
import * as React from "react";
