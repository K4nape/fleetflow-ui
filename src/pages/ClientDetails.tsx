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
  AlertCircle,
  IdCard,
  Copy,
  Users,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

interface Rental {
  id: string;
  contractNumber: string;
  carName: string;
  licensePlate: string;
  startDate: string;
  endDate: string;
  price: number;
  status: "active" | "completed" | "cancelled" | "draft";
}

interface DriverLicense {
  number: string;
  issueDate: string;
  expiryDate: string;
}

interface Client {
  id: string;
  type: "individual" | "company";
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  birthDate?: string;
  registrationDate: string;
  totalRentals: number;
  totalSpent: number;
  referredClients: number;
  referralCode: string;
  activeRentals: number;
  status: "active" | "inactive" | "vip";
  companyCode?: string;
  vatCode?: string;
  personalCode?: string;
  driverLicense?: DriverLicense;
  notes?: string;
  rentals: Rental[];
}

const mockClient: Client = {
  id: "1",
  type: "individual",
  name: "Dovydas Kazlauskas",
  email: "dovydas.kazlauskas@example.com",
  phone: "+37062345678",
  address: {
    street: "Klaipėdos g. 8",
    city: "Klaipėda",
    postalCode: "91234",
    country: "LT"
  },
  birthDate: "1991-11-10",
  registrationDate: "2025-12-01",
  totalRentals: 0,
  totalSpent: 0,
  referredClients: 0,
  referralCode: "XUHWLHQ3",
  activeRentals: 0,
  status: "active",
  personalCode: "39134567890",
  driverLicense: {
    number: "LT345678",
    issueDate: "2015-09-20",
    expiryDate: "2035-09-20"
  },
  notes: undefined,
  rentals: [
    { 
      id: "1", 
      contractNumber: "CR-2025-0007",
      carName: "Volkswagen Golf", 
      licensePlate: "ABC123",
      startDate: "2025-12-19", 
      endDate: "2025-12-27", 
      price: 240, 
      status: "draft" 
    },
  ]
};

const getClientTypeBadge = (type: Client["type"]) => {
  return type === "company" 
    ? <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Juridinis asmuo</Badge>
    : <Badge className="bg-primary/20 text-primary border-primary/30">Fizinis asmuo</Badge>;
};

const getRentalStatusBadge = (status: Rental["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Active</Badge>;
    case "completed":
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Completed</Badge>;
    case "cancelled":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Cancelled</Badge>;
    case "draft":
      return <Badge className="bg-muted text-muted-foreground border-border">Draft</Badge>;
  }
};

const isLicenseExpiringSoon = (expiryDate: string) => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const monthsUntilExpiry = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
  return monthsUntilExpiry <= 6 && monthsUntilExpiry > 0;
};

const isLicenseExpired = (expiryDate: string) => {
  return new Date(expiryDate) < new Date();
};

export default function ClientDetails() {
  const { id } = useParams();
  const client = mockClient;

  const copyReferralCode = () => {
    navigator.clipboard.writeText(client.referralCode);
    toast.success("Referral kodas nukopijuotas!");
  };

  const clientSince = new Date(client.registrationDate).toLocaleDateString("lt-LT", { year: "numeric", month: "2-digit" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold ${
            client.type === "company" ? "bg-amber-500/20 text-amber-500" : "bg-primary/20 text-primary"
          }`}>
            {client.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">{client.name}</h1>
            {getClientTypeBadge(client.type)}
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Redaguoti klientą
          </Button>
          <Link to="/clients">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Grįžti į sąrašą
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Car className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Nuomų skaičius</p>
                <p className="text-2xl font-bold">{client.totalRentals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Euro className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Išleista suma</p>
                <p className="text-2xl font-bold">€{client.totalSpent.toLocaleString("lt-LT", { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Users className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pakviesti klientai</p>
                <p className="text-2xl font-bold">{client.referredClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Klientas nuo</p>
                <p className="text-2xl font-bold">{clientSince}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" />
                Pagrindinė kliento informacija
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Vardas ir pavardė</p>
                  <p className="font-medium">{client.name}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Asmens kodas</p>
                  <p className="font-medium">{client.personalCode || "—"}</p>
                </div>
                {client.birthDate && (
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Gimimo data</p>
                    <p className="font-medium">{new Date(client.birthDate).toLocaleDateString("lt-LT")}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contacts */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="h-5 w-5 text-primary" />
                Kontaktai
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Telefonas</p>
                  <p className="font-medium">{client.phone}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">El. paštas</p>
                  <p className="font-medium">{client.email}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50 md:col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Adresas</p>
                  <p className="font-medium">
                    {client.address.street}, {client.address.city} , {client.address.postalCode} , {client.address.country}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver License */}
          {client.driverLicense && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IdCard className="h-5 w-5 text-primary" />
                  Vairuotojo pažymėjimas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Pažymėjimo numeris</p>
                    <p className="font-medium">{client.driverLicense.number}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Išdavimo data</p>
                    <p className="font-medium">{new Date(client.driverLicense.issueDate).toLocaleDateString("lt-LT")}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Galioja iki</p>
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${
                        isLicenseExpired(client.driverLicense.expiryDate) 
                          ? "text-red-500" 
                          : isLicenseExpiringSoon(client.driverLicense.expiryDate) 
                            ? "text-amber-500" 
                            : "text-emerald-500"
                      }`}>
                        {new Date(client.driverLicense.expiryDate).toLocaleDateString("lt-LT")}
                      </p>
                      {isLicenseExpiringSoon(client.driverLicense.expiryDate) && (
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                          Netrukus baigsis
                        </Badge>
                      )}
                      {isLicenseExpired(client.driverLicense.expiryDate) && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                          Pasibaigęs
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Pastabos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground italic">
                {client.notes || "Pastabų dar nėra."}
              </p>
            </CardContent>
          </Card>

          {/* Rentals History */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Nuomų istorija
              </CardTitle>
              <Badge variant="secondary" className="text-xs">
                {client.rentals.length} sutartys
              </Badge>
            </CardHeader>
            <CardContent>
              {client.rentals.length === 0 ? (
                <p className="text-muted-foreground italic text-center py-8">Nuomų istorija tuščia.</p>
              ) : (
                <div className="space-y-3">
                  {client.rentals.map((rental) => (
                    <div
                      key={rental.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{rental.contractNumber}</p>
                          {getRentalStatusBadge(rental.status)}
                        </div>
                        <div className="text-sm text-muted-foreground space-y-0.5">
                          <p className="flex items-center gap-2">
                            <Car className="h-3.5 w-3.5" />
                            {rental.carName} ({rental.licensePlate})
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(rental.startDate).toLocaleDateString("lt-LT")} → {new Date(rental.endDate).toLocaleDateString("lt-LT")}
                          </p>
                          <p className="flex items-center gap-2">
                            <Euro className="h-3.5 w-3.5" />
                            {rental.price.toFixed(2)} €
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Referral & Trust */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-amber-500" />
                Referral & Patikimumas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Referral kodas</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono font-bold text-lg">{client.referralCode}</p>
                  <Button 
                    size="sm" 
                    onClick={copyReferralCode}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Kopijuoti
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Greitieji veiksmai</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Mail className="h-4 w-4" />
                Siųsti el. laišką
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Phone className="h-4 w-4" />
                Skambinti
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
