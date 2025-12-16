import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, Calendar as CalendarIcon, Car, User, Euro, 
  FileSignature, Calculator, Check, ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { lt } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock data for dropdowns
const mockCars = [
  { id: 1, brand: "BMW", model: "X5", plate: "ABC123", dailyRate: 85, image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=100&h=100&fit=crop" },
  { id: 2, brand: "Audi", model: "A4", plate: "XYZ789", dailyRate: 60, image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop" },
  { id: 3, brand: "Mercedes", model: "C-Class", plate: "DEF456", dailyRate: 75, image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&h=100&fit=crop" },
  { id: 4, brand: "Tesla", model: "Model 3", plate: "GHI789", dailyRate: 100, image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100&h=100&fit=crop" },
];

const mockClients = [
  { id: 1, name: "Jonas Petraitis", phone: "+370 612 34567", email: "jonas@email.com", type: "individual" as const },
  { id: 2, name: "UAB Logistika", phone: "+370 698 76543", email: "info@logistika.lt", type: "company" as const },
  { id: 3, name: "Petras Kazlauskas", phone: "+370 655 11223", email: "petras@gmail.com", type: "individual" as const },
  { id: 4, name: "Marius Jonaitis", phone: "+370 677 88990", email: "marius.j@inbox.lt", type: "individual" as const },
];

const additionalServices = [
  { id: "gps", name: "GPS navigacija", price: 5 },
  { id: "child_seat", name: "Vaikiška kėdutė", price: 8 },
  { id: "wifi", name: "Wi-Fi hotspot", price: 10 },
  { id: "insurance_full", name: "Pilnas draudimas", price: 15 },
  { id: "unlimited_km", name: "Neriboti kilometrai", price: 20 },
];

export default function ContractForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Form state
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [deposit, setDeposit] = useState("");
  const [notes, setNotes] = useState("");
  const [discount, setDiscount] = useState("");

  // Calculations
  const car = mockCars.find(c => c.id === selectedCar);
  const client = mockClients.find(c => c.id === selectedClient);
  
  const rentalDays = startDate && endDate 
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;
  
  const basePrice = car ? car.dailyRate * rentalDays : 0;
  const servicesPrice = selectedServices.reduce((sum, serviceId) => {
    const service = additionalServices.find(s => s.id === serviceId);
    return sum + (service ? service.price * rentalDays : 0);
  }, 0);
  const subtotal = basePrice + servicesPrice;
  const discountAmount = discount ? (subtotal * parseFloat(discount)) / 100 : 0;
  const totalPrice = subtotal - discountAmount;

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = () => {
    toast.success("Sutartis sėkmingai sukurta!", {
      description: `Sutartis su ${client?.name} sukurta.`,
    });
    navigate("/contracts");
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedCar !== null;
      case 2: return selectedClient !== null;
      case 3: return startDate && endDate && endDate >= startDate;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/contracts")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold font-display bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Nauja sutartis
          </h1>
          <p className="text-muted-foreground text-sm hidden sm:block">Sukurkite naują nuomos sutartį</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {[
          { num: 1, label: "Automobilis", icon: Car },
          { num: 2, label: "Klientas", icon: User },
          { num: 3, label: "Datos", icon: CalendarIcon },
          { num: 4, label: "Paslaugos", icon: Euro },
          { num: 5, label: "Patvirtinimas", icon: FileSignature },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center">
            <button
              onClick={() => s.num < step && setStep(s.num)}
              className={cn(
                "flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all",
                step === s.num ? "bg-primary text-primary-foreground" : 
                step > s.num ? "bg-success/20 text-success cursor-pointer hover:bg-success/30" : 
                "bg-muted text-muted-foreground"
              )}
            >
              {step > s.num ? <Check className="h-3.5 w-3.5" /> : <s.icon className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < 4 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
        {/* Step 1: Select Car */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              Pasirinkite automobilį
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mockCars.map((car) => (
                <button
                  key={car.id}
                  onClick={() => setSelectedCar(car.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                    selectedCar === car.id 
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20" 
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <img src={car.image} alt={car.brand} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold">{car.brand} {car.model}</p>
                    <p className="text-sm text-muted-foreground">{car.plate}</p>
                    <p className="text-sm font-medium text-primary">{car.dailyRate} €/dieną</p>
                  </div>
                  {selectedCar === car.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Client */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Pasirinkite klientą
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mockClients.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedClient(c.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                    selectedClient === c.id 
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20" 
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.phone}</p>
                    <span className={cn(
                      "text-[10px] font-medium px-1.5 py-0.5 rounded",
                      c.type === "company" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"
                    )}>
                      {c.type === "company" ? "Įmonė" : "Fizinis asmuo"}
                    </span>
                  </div>
                  {selectedClient === c.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Dates */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Pasirinkite nuomos laikotarpį
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Pradžios data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP", { locale: lt }) : "Pasirinkite datą"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Pabaigos data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP", { locale: lt }) : "Pasirinkite datą"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => date < (startDate || new Date())}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {rentalDays > 0 && (
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm">
                  <span className="text-muted-foreground">Nuomos trukmė:</span>{" "}
                  <span className="font-semibold text-primary">{rentalDays} {rentalDays === 1 ? 'diena' : rentalDays < 10 ? 'dienos' : 'dienų'}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Additional Services */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Euro className="h-5 w-5 text-primary" />
              Papildomos paslaugos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {additionalServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceToggle(service.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                    selectedServices.includes(service.id)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Checkbox checked={selectedServices.includes(service.id)} />
                  <div className="flex-1">
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-primary">+{service.price} €/dieną</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <Label>Depozitas (€)</Label>
                <Input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  placeholder="500"
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label>Nuolaida (%)</Label>
                <Input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="0"
                  max="100"
                  className="bg-background/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Pastabos</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Papildomos pastabos..."
                className="bg-background/50 min-h-[80px]"
              />
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-primary" />
              Sutarties peržiūra
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left - Details */}
              <div className="space-y-4">
                {/* Car */}
                {car && (
                  <div className="p-4 rounded-xl bg-muted/30 border">
                    <p className="text-xs text-muted-foreground mb-2">Automobilis</p>
                    <div className="flex items-center gap-3">
                      <img src={car.image} alt={car.brand} className="w-14 h-14 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold">{car.brand} {car.model}</p>
                        <p className="text-sm text-muted-foreground">{car.plate} • {car.dailyRate} €/dieną</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Client */}
                {client && (
                  <div className="p-4 rounded-xl bg-muted/30 border">
                    <p className="text-xs text-muted-foreground mb-2">Klientas</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.phone}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="p-4 rounded-xl bg-muted/30 border">
                  <p className="text-xs text-muted-foreground mb-2">Nuomos laikotarpis</p>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {startDate && format(startDate, "yyyy-MM-dd")} — {endDate && format(endDate, "yyyy-MM-dd")}
                    </span>
                    <span className="text-sm text-muted-foreground">({rentalDays} d.)</span>
                  </div>
                </div>

                {/* Services */}
                {selectedServices.length > 0 && (
                  <div className="p-4 rounded-xl bg-muted/30 border">
                    <p className="text-xs text-muted-foreground mb-2">Papildomos paslaugos</p>
                    <div className="space-y-1">
                      {selectedServices.map(id => {
                        const service = additionalServices.find(s => s.id === id);
                        return service && (
                          <div key={id} className="flex items-center justify-between text-sm">
                            <span>{service.name}</span>
                            <span className="text-muted-foreground">+{service.price * rentalDays} €</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Right - Price Calculator */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Kainų skaičiuoklė</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bazinė kaina ({rentalDays} d. × {car?.dailyRate} €)</span>
                    <span>{basePrice.toFixed(2)} €</span>
                  </div>
                  {servicesPrice > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Papildomos paslaugos</span>
                      <span>+{servicesPrice.toFixed(2)} €</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-success">
                      <span>Nuolaida ({discount}%)</span>
                      <span>-{discountAmount.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="border-t border-border/50 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Viso:</span>
                      <span className="text-xl font-bold text-primary">{totalPrice.toFixed(2)} €</span>
                    </div>
                    {deposit && (
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>Depozitas</span>
                        <span>{parseFloat(deposit).toFixed(2)} €</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => step > 1 ? setStep(step - 1) : navigate("/contracts")}
        >
          {step === 1 ? "Atšaukti" : "Atgal"}
        </Button>
        <Button
          onClick={() => step < 5 ? setStep(step + 1) : handleSubmit()}
          disabled={!canProceed()}
        >
          {step === 5 ? (
            <>
              <FileSignature className="h-4 w-4 mr-2" />
              Sukurti sutartį
            </>
          ) : (
            <>
              Toliau
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
