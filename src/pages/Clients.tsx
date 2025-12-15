import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  User, 
  Building2, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Car,
  Euro,
  Filter,
  ChevronRight
} from "lucide-react";

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
}

const mockClients: Client[] = [
  {
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
    status: "vip"
  },
  {
    id: "2",
    type: "company",
    name: "UAB Transportas",
    email: "info@transportas.lt",
    phone: "+370 5 234 5678",
    address: "Savanorių pr. 123, Kaunas",
    registrationDate: "2022-11-20",
    totalRentals: 45,
    totalSpent: 28500,
    activeRentals: 3,
    status: "vip",
    companyCode: "123456789",
    vatCode: "LT123456789"
  },
  {
    id: "3",
    type: "individual",
    name: "Petras Petraitis",
    email: "petras@gmail.com",
    phone: "+370 698 76543",
    address: "Laisvės al. 50, Kaunas",
    registrationDate: "2024-01-10",
    totalRentals: 3,
    totalSpent: 890,
    activeRentals: 0,
    status: "active"
  },
  {
    id: "4",
    type: "company",
    name: "MB Kelionės",
    email: "keliones@mb.lt",
    phone: "+370 46 123456",
    address: "Tiltų g. 5, Klaipėda",
    registrationDate: "2023-08-05",
    totalRentals: 18,
    totalSpent: 8900,
    activeRentals: 0,
    status: "active",
    companyCode: "987654321",
    vatCode: "LT987654321"
  },
  {
    id: "5",
    type: "individual",
    name: "Ona Onaitė",
    email: "ona.onaite@yahoo.com",
    phone: "+370 655 11223",
    address: "Vilniaus g. 10, Šiauliai",
    registrationDate: "2024-06-01",
    totalRentals: 1,
    totalSpent: 180,
    activeRentals: 0,
    status: "inactive"
  }
];

const getStatusBadge = (status: Client["status"]) => {
  switch (status) {
    case "vip":
      return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">VIP</Badge>;
    case "active":
      return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Aktyvus</Badge>;
    case "inactive":
      return <Badge className="bg-muted text-muted-foreground">Neaktyvus</Badge>;
  }
};

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery);
    const matchesType = typeFilter === "all" || client.type === typeFilter;
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold">Klientai</h1>
          <p className="text-muted-foreground mt-1">Valdyk klientų informaciją</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Naujas klientas
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockClients.length}</p>
                <p className="text-xs text-muted-foreground">Viso klientų</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Building2 className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockClients.filter(c => c.type === "company").length}</p>
                <p className="text-xs text-muted-foreground">Įmonės</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Car className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockClients.reduce((sum, c) => sum + c.activeRentals, 0)}</p>
                <p className="text-xs text-muted-foreground">Aktyvios nuomos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Euro className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">€{mockClients.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Bendra apyvarta</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ieškoti pagal vardą, el. paštą ar telefoną..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Tipas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Visi tipai</SelectItem>
                  <SelectItem value="individual">Fiziniai</SelectItem>
                  <SelectItem value="company">Juridiniai</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Statusas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Visi</SelectItem>
                  <SelectItem value="active">Aktyvūs</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="inactive">Neaktyvūs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <div className="space-y-3">
        {filteredClients.map((client) => (
          <Link key={client.id} to={`/clients/${client.id}`}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    client.type === "company" ? "bg-amber-500/20" : "bg-primary/20"
                  }`}>
                    {client.type === "company" ? (
                      <Building2 className="h-6 w-6 text-amber-500" />
                    ) : (
                      <User className="h-6 w-6 text-primary" />
                    )}
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{client.name}</h3>
                      {getStatusBadge(client.status)}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {client.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {client.phone}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold">{client.totalRentals}</p>
                      <p className="text-xs text-muted-foreground">Nuomos</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-emerald-500">€{client.totalSpent}</p>
                      <p className="text-xs text-muted-foreground">Išleista</p>
                    </div>
                    {client.activeRentals > 0 && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {client.activeRentals} aktyvios
                      </Badge>
                    )}
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Klientų nerasta</h3>
            <p className="text-muted-foreground">Pabandykite pakeisti paieškos kriterijus</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
