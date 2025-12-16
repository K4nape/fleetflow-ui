import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  ChevronRight,
  MessageCircle,
  Copy,
  Check,
  Clock
} from "lucide-react";
import { toast } from "sonner";

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
  lastRentalDate?: string;
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
    status: "vip",
    lastRentalDate: "2024-12-10"
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
    vatCode: "LT123456789",
    lastRentalDate: "2024-12-14"
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
    status: "active",
    lastRentalDate: "2024-11-20"
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
    vatCode: "LT987654321",
    lastRentalDate: "2024-10-05"
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
    status: "inactive",
    lastRentalDate: "2024-07-15"
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

const formatPhoneForCall = (phone: string) => {
  return phone.replace(/\s/g, '');
};

const getDaysSinceLastRental = (lastRentalDate?: string) => {
  if (!lastRentalDate) return null;
  const last = new Date(lastRentalDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - last.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery);
    const matchesType = typeFilter === "all" || client.type === typeFilter;
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCopyPhone = (e: React.MouseEvent, phone: string, clientId: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedId(clientId);
    toast.success("Numeris nukopijuotas");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCall = (e: React.MouseEvent, phone: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `tel:${formatPhoneForCall(phone)}`;
  };

  const handleEmail = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `mailto:${email}`;
  };

  const handleSMS = (e: React.MouseEvent, phone: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `sms:${formatPhoneForCall(phone)}`;
  };

  return (
    <TooltipProvider>
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
          {filteredClients.map((client) => {
            const daysSinceRental = getDaysSinceLastRental(client.lastRentalDate);
            
            return (
              <Card key={client.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    {/* Top Row - Main Info */}
                    <Link to={`/clients/${client.id}`} className="flex items-center gap-4 group">
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
                          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{client.name}</h3>
                          {getStatusBadge(client.status)}
                          {client.activeRentals > 0 && (
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 hidden sm:flex">
                              {client.activeRentals} aktyvios
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="truncate max-w-[150px]">{client.address}</span>
                          </span>
                          {daysSinceRental && (
                            <span className="hidden sm:flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              Prieš {daysSinceRental} d.
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats - Desktop */}
                      <div className="hidden lg:flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-semibold">{client.totalRentals}</p>
                          <p className="text-xs text-muted-foreground">Nuomos</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-emerald-500">€{client.totalSpent.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Išleista</p>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all hidden sm:block" />
                    </Link>

                    {/* Bottom Row - Quick Actions */}
                    <div className="flex items-center justify-between border-t border-border/50 pt-3 -mb-1">
                      {/* Contact Info with Actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Phone Actions */}
                        <div className="flex items-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-muted-foreground hover:text-primary"
                                onClick={(e) => handleCall(e, client.phone)}
                              >
                                <Phone className="h-4 w-4 mr-1.5" />
                                <span className="text-sm">{client.phone}</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Skambinti</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-primary"
                                onClick={(e) => handleCopyPhone(e, client.phone, client.id)}
                              >
                                {copiedId === client.id ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Kopijuoti numerį</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-primary"
                                onClick={(e) => handleSMS(e, client.phone)}
                              >
                                <MessageCircle className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Siųsti SMS</TooltipContent>
                          </Tooltip>
                        </div>

                        <span className="text-border hidden sm:block">|</span>

                        {/* Email Action */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-muted-foreground hover:text-primary"
                              onClick={(e) => handleEmail(e, client.email)}
                            >
                              <Mail className="h-4 w-4 mr-1.5" />
                              <span className="text-sm hidden sm:inline">{client.email}</span>
                              <span className="text-sm sm:hidden">El. paštas</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Rašyti el. laišką</TooltipContent>
                        </Tooltip>
                      </div>

                      {/* Mobile Stats */}
                      <div className="flex lg:hidden items-center gap-3 text-sm">
                        <span className="text-muted-foreground">{client.totalRentals} nuomos</span>
                        <span className="font-semibold text-emerald-500">€{client.totalSpent}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
    </TooltipProvider>
  );
}
