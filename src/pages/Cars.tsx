import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Trash } from "lucide-react";
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
    },
  ];

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
                <th className="text-left p-4 font-semibold">Statusas</th>
                <th className="text-right p-4 font-semibold">Veiksmai</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Cars Grid - Mobile */}
      <div className="grid md:hidden gap-4">
        {cars.map((car) => (
          <Card key={car.id} className="p-4 hover-lift bg-gradient-to-br from-card to-card/50">
            <div className="flex gap-4">
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
          </Card>
        ))}
      </div>
    </div>
  );
}
