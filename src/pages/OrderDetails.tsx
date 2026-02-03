import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  ArrowLeft, FileText, Calendar, Car, User, Euro, 
  CheckCircle2, AlertCircle, XCircle, Clock,
  Download, Printer, Send, CreditCard, Phone, Mail,
  MapPin, Edit, Copy, MessageSquare, CalendarIcon,
  Banknote, Building2, Wallet
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
import { cn } from "@/lib/utils";

type OrderType = "reservation" | "contract";
type OrderStatus = "pending" | "confirmed" | "active" | "completed" | "cancelled" | "overdue";

const PAYMENT_METHODS = [
  { id: "cash", label: "Grynaisiais", icon: Banknote },
  { id: "card", label: "Kortele", icon: CreditCard },
  { id: "transfer", label: "Pavedimu", icon: Building2 },
  { id: "other", label: "Kita", icon: Wallet },
];

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentNote, setPaymentNote] = useState("");

  // Mock order data
  const order = {
    id: "1",
    orderNumber: "ORD-2024-0156",
    type: "contract" as OrderType,
    status: "active" as OrderStatus,
    client: {
      id: 1,
      name: "Jonas Petraitis",
      phone: "+370 612 34567",
      email: "jonas@email.com",
      type: "individual" as "individual" | "company",
      address: "Gedimino pr. 15-23, Vilnius",
    },
    car: {
      id: 1,
      brand: "BMW",
      model: "X5",
      plate: "ABC123",
      year: 2022,
      fuel: "Diesel",
      mileageStart: 45000,
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
    payments: [
      { id: 1, date: "2024-12-09", amount: 500, method: "Banko pavedimas", note: "Depozitas + avansas" },
      { id: 2, date: "2024-12-10", amount: 350, method: "Kortele", note: "Likusi suma" },
    ],
    deposit: 500,
    depositPaid: true,
    extras: [
      { name: "GPS navigacija", price: 5, days: 10, total: 50 },
      { name: "Vaikiška kėdutė", price: 3, days: 10, total: 30 },
    ],
    createdAt: "2024-12-08",
    notes: "Klientas pageidauja švaraus automobilio.",
  };

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case "pending": return { label: "Laukia", variant: "warning" as const, icon: Clock };
      case "confirmed": return { label: "Patvirtinta", variant: "info" as const, icon: CheckCircle2 };
      case "active": return { label: "Aktyvi", variant: "success" as const, icon: CheckCircle2 };
      case "completed": return { label: "Užbaigta", variant: "default" as const, icon: CheckCircle2 };
      case "cancelled": return { label: "Atšaukta", variant: "destructive" as const, icon: XCircle };
      case "overdue": return { label: "Vėluoja", variant: "destructive" as const, icon: AlertCircle };
    }
  };

  const getTypeConfig = (type: OrderType) => {
    switch (type) {
      case "reservation": return { label: "Rezervacija", color: "bg-info/10 text-info border-info/20", icon: Calendar };
      case "contract": return { label: "Sutartis", color: "bg-primary/10 text-primary border-primary/20", icon: FileText };
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

  const statusConfig = getStatusConfig(order.status);
  const typeConfig = getTypeConfig(order.type);
  const StatusIcon = statusConfig.icon;
  const TypeIcon = typeConfig.icon;
  const paymentProgress = Math.round((order.paidAmount / order.totalAmount) * 100);

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

  const handleConvertToContract = () => {
    toast.success("Rezervacija paversta sutartimi");
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500 pb-20 lg:pb-0">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/orders")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display">{order.orderNumber}</h1>
              <span className={cn("inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border", typeConfig.color)}>
                <TypeIcon className="h-3 w-3" />
                {typeConfig.label}
              </span>
              <StatusBadge status={statusConfig.variant === "success" ? "available" : statusConfig.variant === "warning" ? "reserved" : "in_service"}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusConfig.label}
              </StatusBadge>
            </div>
            <p className="text-sm text-muted-foreground">Sukurta: {formatDate(order.createdAt)}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {order.type === "reservation" && order.status !== "cancelled" && (
            <Button size="sm" onClick={handleConvertToContract}>
              <FileText className="h-4 w-4 mr-2" /> Paversti sutartimi
            </Button>
          )}
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
                  src={order.car.image}
                  alt={`${order.car.brand} ${order.car.model}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">{order.car.brand} {order.car.model}</h2>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="font-mono bg-background/50 px-2 py-0.5 rounded">{order.car.plate}</span>
                    <span>{order.car.year}</span>
                    <span>{order.car.fuel}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Dienos kaina</p>
                  <p className="text-sm font-semibold">{formatCurrency(order.dailyRate)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Rida pradžioje</p>
                  <p className="text-sm font-semibold">{order.car.mileageStart.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Trukmė</p>
                  <p className="text-sm font-semibold">{order.totalDays} dienų</p>
                </div>
              </div>
            </Card>

            {/* Rental Period */}
            <Card className="p-4 sm:p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Nuomos laikotarpis
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                  <p className="text-xs text-success font-medium mb-1">PAĖMIMAS</p>
                  <p className="font-semibold">{formatDate(order.startDate)}</p>
                  <p className="text-sm text-muted-foreground">{order.startTime}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{order.pickupLocation}</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                  <p className="text-xs text-destructive font-medium mb-1">GRĄŽINIMAS</p>
                  <p className="font-semibold">{formatDate(order.endDate)}</p>
                  <p className="text-sm text-muted-foreground">{order.endTime}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{order.returnLocation}</span>
                  </div>
                </div>
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
                  <span className="text-muted-foreground">Nuoma ({order.totalDays} d. × {formatCurrency(order.dailyRate)})</span>
                  <span className="font-medium">{formatCurrency(order.dailyRate * order.totalDays)}</span>
                </div>
                {order.extras.map((extra, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">{extra.name} ({extra.days} d.)</span>
                    <span className="font-medium">{formatCurrency(extra.total)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <span className="font-semibold">Viso</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(order.totalAmount + order.extras.reduce((s, e) => s + e.total, 0))}
                  </span>
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
                {order.payments.map((payment) => (
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
            {order.notes && (
              <Card className="p-4 sm:p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Pastabos
                </h3>
                <p className="text-muted-foreground">{order.notes}</p>
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
                  <p className="font-semibold text-lg">{order.client.name}</p>
                  {order.client.type === "company" && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-info/10 text-info">Įmonė</span>
                  )}
                </div>

                <div className="space-y-2">
                  <TooltipProvider>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${order.client.phone.replace(/\s/g, '')}`} className="text-sm hover:text-primary transition-colors">
                        {order.client.phone}
                      </a>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(order.client.phone, 'Telefono numeris')}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Kopijuoti</TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${order.client.email}`} className="text-sm hover:text-primary transition-colors">
                      {order.client.email}
                    </a>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm text-muted-foreground">{order.client.address}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={() => navigate(`/clients/${order.client.id}`)}>
                  Kliento profilis
                </Button>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-4 sm:p-6">
              <h3 className="font-semibold mb-4">Santrauka</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tipas</span>
                  <span className={cn("text-xs font-medium px-2 py-1 rounded-full border", typeConfig.color)}>
                    {typeConfig.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Statusas</span>
                  <StatusBadge status={statusConfig.variant === "success" ? "available" : statusConfig.variant === "warning" ? "reserved" : "in_service"}>
                    {statusConfig.label}
                  </StatusBadge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Suma</span>
                  <span className="font-semibold">{formatCurrency(order.totalAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sumokėta</span>
                  <span className="font-semibold text-success">{formatCurrency(order.paidAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Depozitas</span>
                  <span className={cn("font-semibold", order.depositPaid ? "text-success" : "text-warning")}>
                    {formatCurrency(order.deposit)} {order.depositPaid ? "✓" : "(laukia)"}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registruoti mokėjimą</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Suma (€)</Label>
              <Input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label>Mokėjimo būdas</Label>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border transition-all",
                      paymentMethod === method.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <method.icon className="h-4 w-4" />
                    <span className="text-sm">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Pastaba</Label>
              <Textarea
                value={paymentNote}
                onChange={(e) => setPaymentNote(e.target.value)}
                placeholder="Papildoma informacija..."
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setPaymentModalOpen(false)}>
                Atšaukti
              </Button>
              <Button className="flex-1" onClick={handleRegisterPayment}>
                Registruoti
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
