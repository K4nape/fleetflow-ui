import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Car,
  Euro,
  FileText,
  Edit,
  Clock,
  Star,
  CreditCard,
  TrendingUp,
  AlertCircle
} from "lucide-react";

interface Rental {
  id: string;
  carName: string;
  startDate: string;
  endDate: string;
  price: number;
  status: "active" | "completed" | "cancelled";
}

interface Client {
  id: string;
  type: "individual" | "company";
  name: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  totalRentals: number;
  totalSpent: number;
  activeRentals: number;
  status: "active" | "inactive" | "vip";
  companyCode?: string;
  vatCode?: string;
  personalCode?: string;
  driverLicense?: string;
  notes?: string;
  rentals: Rental[];
}

const mockClient: Client = {
  id: "1",
  type: "individual",
  name: "Jonas Jonaitis",
  email: "jonas@email.lt",
  phone: "+370 612 34567",
  address: "Gedimino pr. 1, Vilnius",
  registrationDate: "2023-05-15",
  totalRentals: 12,
  totalSpent: 3450,
  activeRentals: 1,
  status: "vip",
  personalCode: "39001011234",
  driverLicense: "LT12345678",
  notes: "Patikimas klientas, visada grąžina automobilius laiku ir švariai.",
  rentals: [
    { id: "1", carName: "BMW 320d", startDate: "2024-12-10", endDate: "2024-12-20", price: 650, status: "active" },
    { id: "2", carName: "Audi A4", startDate: "2024-11-01", endDate: "2024-11-10", price: 540, status: "completed" },
    { id: "3", carName: "VW Golf", startDate: "2024-09-15", endDate: "2024-09-20", price: 280, status: "completed" },
    { id: "4", carName: "Mercedes C200", startDate: "2024-08-01", endDate: "2024-08-15", price: 890, status: "completed" },
    { id: "5", carName: "Toyota Camry", startDate: "2024-06-10", endDate: "2024-06-15", price: 320, status: "cancelled" },
  ]
};

const getStatusBadge = (status: Client["status"]) => {
  switch (status) {
    case "vip":
      return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">VIP Klientas</Badge>;
    case "active":
      return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Aktyvus</Badge>;
    case "inactive":
      return <Badge className="bg-muted text-muted-foreground">Neaktyvus</Badge>;
  }
};

const getRentalStatusBadge = (status: Rental["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Aktyvi</Badge>;
    case "completed":
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Baigta</Badge>;
    case "cancelled":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Atšaukta</Badge>;
  }
};

export default function ClientDetails() {
  const { id } = useParams();
  const client = mockClient; // In real app, fetch by id

  const avgRentalValue = client.totalRentals > 0 ? Math.round(client.totalSpent / client.totalRentals) : 0;
  const completedRentals = client.rentals.filter(r => r.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/clients">
        <Button variant="ghost" className="gap-2 hover:bg-accent/50">
          <ArrowLeft className="h-4 w-4" />
          Grįžti į sąrašą
        </Button>
      </Link>

      {/* Header with Background */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        <div className="relative p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Avatar */}
            <div className={`h-20 w-20 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              client.type === "company" ? "bg-amber-500/20" : "bg-primary/20"
            }`}>
              {client.type === "company" ? (
                <Building2 className="h-10 w-10 text-amber-500" />
              ) : (
                <User className="h-10 w-10 text-primary" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl lg:text-3xl font-display font-bold">{client.name}</h1>
                {getStatusBadge(client.status)}
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {client.email}
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {client.phone}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {client.address}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Redaguoti
              </Button>
              <Button className="gap-2">
                <Car className="h-4 w-4" />
                Nauja nuoma
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Car className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{client.totalRentals}</p>
                <p className="text-xs text-muted-foreground">Viso nuomų</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Euro className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-500">€{client.totalSpent.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Išleista viso</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">€{avgRentalValue}</p>
                <p className="text-xs text-muted-foreground">Vid. nuomos vertė</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Star className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round((completedRentals / client.totalRentals) * 100)}%</p>
                <p className="text-xs text-muted-foreground">Užbaigtų nuomų</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Personal Info */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" />
                Asmeninė informacija
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Tipas</p>
                <p className="font-medium">{client.type === "company" ? "Juridinis asmuo" : "Fizinis asmuo"}</p>
              </div>
              {client.personalCode && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Asmens kodas</p>
                  <p className="font-medium">{client.personalCode}</p>
                </div>
              )}
              {client.driverLicense && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Vairuotojo pažymėjimas</p>
                  <p className="font-medium">{client.driverLicense}</p>
                </div>
              )}
              {client.companyCode && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Įmonės kodas</p>
                  <p className="font-medium">{client.companyCode}</p>
                </div>
              )}
              {client.vatCode && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">PVM kodas</p>
                  <p className="font-medium">{client.vatCode}</p>
                </div>
              )}
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Registracijos data</p>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {new Date(client.registrationDate).toLocaleDateString("lt-LT")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {client.notes && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  Pastabos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{client.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Greiti veiksmai</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Sukurti sutartį
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <CreditCard className="h-4 w-4" />
                Pridėti mokėjimą
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Mail className="h-4 w-4" />
                Siųsti laišką
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Rentals */}
        <div className="lg:col-span-2">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="h-5 w-5 text-primary" />
                Nuomos istorija
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {client.rentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{rental.carName}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(rental.startDate).toLocaleDateString("lt-LT")} - {new Date(rental.endDate).toLocaleDateString("lt-LT")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold text-emerald-500">€{rental.price}</p>
                      {getRentalStatusBadge(rental.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
