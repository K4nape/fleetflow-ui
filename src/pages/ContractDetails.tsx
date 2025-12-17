import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  ArrowLeft, FileText, Calendar, Car, User, Euro, 
  CheckCircle2, AlertCircle, XCircle, FileSignature,
  Download, Printer, Send, CreditCard, Phone, Mail,
  MapPin, Clock, Edit, Copy, Shield, MessageSquare,
  Banknote, Building2, Wallet, CircleDollarSign
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate, useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PAYMENT_METHODS = [
  { id: "cash", label: "Grynaisiais", icon: Banknote },
  { id: "card", label: "Kortele", icon: CreditCard },
  { id: "transfer", label: "Pavedimu", icon: Building2 },
  { id: "other", label: "Kita", icon: Wallet },
];

export default function ContractDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentNote, setPaymentNote] = useState("");

  // Mock contract data
  const contract = {
    id: "1",
    contractNumber: "SUT-2024-0156",
    status: "active" as const,
    client: {
      id: 1,
      name: "Jonas Petraitis",
      phone: "+370 612 34567",
      email: "jonas@email.com",
      type: "individual" as "individual" | "company",
      address: "Gedimino pr. 15-23, Vilnius",
      personalCode: "39001010001",
      licenseNumber: "LT12345678",
      licenseExpiry: "2028-05-15",
    },
    car: {
      id: 1,
      brand: "BMW",
      model: "X5",
      plate: "ABC123",
      year: 2022,
      vin: "WBAJB0C55JB084264",
      fuel: "Diesel",
      mileageStart: 45000,
      mileageEnd: null,
      image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop",
    },
    startDate: "2024-12-10",
    startTime: "09:00",
    endDate: "2024-12-20",
    endTime: "18:00",
    pickupLocation: "Vilniaus biuras",
    returnLocation: "Vilniaus biuras",
    dailyRate: 85,
    totalDays: 10,
    totalAmount: 850,
    paidAmount: 850,
    paymentStatus: "paid" as const,
    payments: [
      { id: 1, date: "2024-12-09", amount: 500, method: "Banko pavedimas", note: "Depozitas + avansas" },
      { id: 2, date: "2024-12-10", amount: 350, method: "Kortele", note: "Likusi suma" },
    ],
    deposit: 500,
    depositPaid: true,
    depositReturned: false,
    insurance: {
      type: "Pilnas",
      dailyCost: 15,
      totalCost: 150,
    },
    extras: [
      { name: "GPS navigacija", price: 5, days: 10, total: 50 },
      { name: "Vaikiška kėdutė", price: 3, days: 10, total: 30 },
    ],
    signedAt: "2024-12-09",
    signedBy: "Jonas Petraitis",
    createdAt: "2024-12-08",
    createdBy: "Admin",
    notes: "Klientas pageidauja švaraus automobilio. Grąžins laiku.",
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active": return { label: "Aktyvi", variant: "success" as const, icon: CheckCircle2 };
      case "completed": return { label: "Užbaigta", variant: "default" as const, icon: CheckCircle2 };
      case "draft": return { label: "Juodraštis", variant: "warning" as const, icon: FileText };
      case "cancelled": return { label: "Atšaukta", variant: "destructive" as const, icon: XCircle };
      case "overdue": return { label: "Vėluoja", variant: "destructive" as const, icon: AlertCircle };
      default: return { label: "Nežinoma", variant: "default" as const, icon: FileText };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('lt-LT', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('lt-LT', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} nukopijuota`);
  };

  const statusConfig = getStatusConfig(contract.status);
  const StatusIcon = statusConfig.icon;
  const paymentProgress = Math.round((contract.paidAmount / contract.totalAmount) * 100);

  const remainingAmount = (contract.totalAmount + contract.insurance.totalCost + contract.extras.reduce((s, e) => s + e.total, 0)) - contract.paidAmount;

  const handleRegisterPayment = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast.error("Įveskite teisingą sumą");
      return;
    }
    toast.success(`Mokėjimas ${formatCurrency(parseFloat(paymentAmount))} užregistruotas`);
    setPaymentModalOpen(false);
    setPaymentAmount("");
    setPaymentNote("");
  };

  return (
    <>
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/contracts")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display">{contract.contractNumber}</h1>
            <StatusBadge status={statusConfig.variant === "success" ? "available" : statusConfig.variant === "warning" ? "reserved" : "in_service"}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig.label}
            </StatusBadge>
          </div>
          <p className="text-sm text-muted-foreground">Sukurta: {formatDate(contract.createdAt)}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" /> Atsisiųsti PDF
        </Button>
        <Button variant="outline" size="sm">
          <Printer className="h-4 w-4 mr-2" /> Spausdinti
        </Button>
        <Button variant="outline" size="sm">
          <Send className="h-4 w-4 mr-2" /> Siųsti klientui
        </Button>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" /> Redaguoti
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Car Info */}
          <Card className="overflow-hidden">
            <div className="relative h-48 sm:h-64">
              <img
                src={contract.car.image}
                alt={`${contract.car.brand} ${contract.car.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">{contract.car.brand} {contract.car.model}</h2>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="font-mono bg-background/50 px-2 py-0.5 rounded">{contract.car.plate}</span>
                  <span>{contract.car.year}</span>
                  <span>{contract.car.fuel}</span>
                </div>
              </div>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">VIN</p>
                <p className="text-sm font-mono truncate">{contract.car.vin}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rida pradžioje</p>
                <p className="text-sm font-medium">{contract.car.mileageStart.toLocaleString()} km</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rida pabaigoje</p>
                <p className="text-sm font-medium">{contract.car.mileageEnd ? `${contract.car.mileageEnd.toLocaleString()} km` : '—'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Nuvažiuota</p>
                <p className="text-sm font-medium">{contract.car.mileageEnd ? `${(contract.car.mileageEnd - contract.car.mileageStart).toLocaleString()} km` : '—'}</p>
              </div>
            </div>
          </Card>

          {/* Rental Period */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Nuomos laikotarpis
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                <p className="text-xs text-success font-medium mb-1">PAĖMIMAS</p>
                <p className="font-semibold">{formatDate(contract.startDate)}</p>
                <p className="text-sm text-muted-foreground">{contract.startTime}</p>
                <div className="flex items-center gap-1.5 mt-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{contract.pickupLocation}</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-xs text-destructive font-medium mb-1">GRĄŽINIMAS</p>
                <p className="font-semibold">{formatDate(contract.endDate)}</p>
                <p className="text-sm text-muted-foreground">{contract.endTime}</p>
                <div className="flex items-center gap-1.5 mt-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{contract.returnLocation}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-muted/50 flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Trukmė: <strong>{contract.totalDays} dienų</strong></span>
            </div>
          </Card>

          {/* Pricing Breakdown */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Euro className="h-5 w-5 text-primary" />
              Kainos išskaidymas
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Nuoma ({contract.totalDays} d. × {formatCurrency(contract.dailyRate)})</span>
                <span className="font-medium">{formatCurrency(contract.dailyRate * contract.totalDays)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Draudimas "{contract.insurance.type}"</span>
                </div>
                <span className="font-medium">{formatCurrency(contract.insurance.totalCost)}</span>
              </div>
              {contract.extras.map((extra, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">{extra.name} ({extra.days} d.)</span>
                  <span className="font-medium">{formatCurrency(extra.total)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between py-2">
                <span className="font-semibold">Viso</span>
                <span className="text-xl font-bold text-primary">{formatCurrency(contract.totalAmount + contract.insurance.totalCost + contract.extras.reduce((s, e) => s + e.total, 0))}</span>
              </div>
            </div>
          </Card>

          {/* Payment History */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Mokėjimų istorija
              </h3>
              <Button variant="outline" size="sm" onClick={() => setPaymentModalOpen(true)}>
                <CreditCard className="h-4 w-4 mr-2" /> Registruoti mokėjimą
              </Button>
            </div>
            <div className="space-y-3">
              {contract.payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{formatCurrency(payment.amount)}</p>
                    <p className="text-sm text-muted-foreground">{payment.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{payment.date}</p>
                    <p className="text-xs text-muted-foreground">{payment.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Apmokėjimo progresas</span>
                <span className="text-sm font-medium text-success">{paymentProgress}%</span>
              </div>
              <Progress value={paymentProgress} className="h-2" />
            </div>
          </Card>

          {/* Notes */}
          {contract.notes && (
            <Card className="p-4 sm:p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Pastabos
              </h3>
              <p className="text-muted-foreground">{contract.notes}</p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Client Info */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Kliento informacija
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-lg">{contract.client.name}</p>
                {contract.client.type === "company" && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-info/10 text-info">Įmonė</span>
                )}
              </div>

              <div className="space-y-2">
                <TooltipProvider>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${contract.client.phone.replace(/\s/g, '')}`} className="text-sm hover:text-primary transition-colors">
                      {contract.client.phone}
                    </a>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(contract.client.phone, 'Telefono numeris')}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Kopijuoti</TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${contract.client.email}`} className="text-sm hover:text-primary transition-colors truncate">
                    {contract.client.email}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{contract.client.address}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Asmens kodas</p>
                  <p className="text-sm font-mono">{contract.client.personalCode}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Vairuotojo pažymėjimas</p>
                  <p className="text-sm font-mono">{contract.client.licenseNumber}</p>
                  <p className="text-xs text-muted-foreground">Galioja iki: {contract.client.licenseExpiry}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={`tel:${contract.client.phone.replace(/\s/g, '')}`}>
                    <Phone className="h-4 w-4 mr-2" /> Skambinti
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={`mailto:${contract.client.email}`}>
                    <Mail className="h-4 w-4 mr-2" /> El. paštas
                  </a>
                </Button>
              </div>

              <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate(`/clients/${contract.client.id}`)}>
                Peržiūrėti kliento profilį →
              </Button>
            </div>
          </Card>

          {/* Deposit Status */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Depozitas
            </h3>
            <div className="text-center">
              <p className="text-2xl font-bold">{formatCurrency(contract.deposit)}</p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${contract.depositPaid ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                  {contract.depositPaid ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  <span className="text-sm font-medium">{contract.depositPaid ? 'Sumokėtas' : 'Nesumokėtas'}</span>
                </div>
              </div>
              {contract.depositPaid && !contract.depositReturned && contract.status === "active" && (
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Grąžinti depozitą
                </Button>
              )}
            </div>
          </Card>

          {/* Signature Status */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-primary" />
              Pasirašymas
            </h3>
            {contract.signedAt ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <p className="font-medium text-success">Pasirašyta</p>
                <p className="text-sm text-muted-foreground mt-1">{formatDate(contract.signedAt)}</p>
                <p className="text-xs text-muted-foreground">Pasirašė: {contract.signedBy}</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-8 w-8 text-warning" />
                </div>
                <p className="font-medium text-warning">Laukia parašo</p>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  <Send className="h-4 w-4 mr-2" /> Siųsti pasirašymui
                </Button>
              </div>
            )}
          </Card>

          {/* Created Info */}
          <Card className="p-4">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Sukurta: {formatDate(contract.createdAt)}</p>
              <p>Sukūrė: {contract.createdBy}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>

    {/* Payment Registration Modal */}
    <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <CircleDollarSign className="h-5 w-5 text-primary" />
            </div>
            Registruoti mokėjimą
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Suma</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="pl-10 text-lg h-12 font-semibold"
              />
              <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            {remainingAmount > 0 && (
              <button 
                type="button"
                onClick={() => setPaymentAmount(remainingAmount.toString())}
                className="text-xs text-primary hover:underline"
              >
                Likusi suma: {formatCurrency(remainingAmount)}
              </button>
            )}
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <Label>Mokėjimo būdas</Label>
            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-sm font-medium">{method.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Note Input */}
          <div className="space-y-2">
            <Label htmlFor="note">Pastaba (neprivaloma)</Label>
            <Textarea
              id="note"
              placeholder="Pvz.: Avansas, likusi suma..."
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              rows={2}
              className="resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setPaymentModalOpen(false)}
            >
              Atšaukti
            </Button>
            <Button 
              className="flex-1"
              onClick={handleRegisterPayment}
              disabled={!paymentAmount || parseFloat(paymentAmount) <= 0}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Registruoti
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}