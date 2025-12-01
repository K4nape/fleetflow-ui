import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check, X, Plus, Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, name: "Pagrindinė informacija" },
  { id: 2, name: "Draudimai ir techninė" },
  { id: 3, name: "Komplektacija" },
  { id: 4, name: "Nuomos kainos" },
  { id: 5, name: "Nuotraukos" },
  { id: 6, name: "Pastabos" },
];

const standardEquipment = [
  "Kondicionierius",
  "Bluetooth",
  "AUX/USB",
  "Parkavimo jutikliai",
  "Signalizacija",
  "Vairo stiprintuvas",
];

export default function CarForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    // Step 1
    plate: "",
    vin: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    fuelType: "",
    mileage: "",
    status: "available",
    
    // Step 2
    liabilityInsurance: "",
    kaskoInsurance: "",
    franchise: "",
    technicalInspection: "",
    oilChange: "",
    nextService: "",
    
    // Step 3
    equipment: [] as string[],
    customEquipment: [] as string[],
    inventory: [] as Array<{ item: string; quantity: number; condition: string; notes: string }>,
    
    // Step 4
    pricing: [] as Array<{ from: number; to: number | null; price: number }>,
    
    // Step 5
    mainImage: null as string | null,
    gallery: [] as string[],
    
    // Step 6
    notes: "",
  });

  const [tempCustomEquipment, setTempCustomEquipment] = useState("");
  const [tempInventoryItem, setTempInventoryItem] = useState({
    item: "",
    quantity: 1,
    condition: "good",
    notes: "",
  });
  const [tempPricingTier, setTempPricingTier] = useState({
    from: 1,
    to: null as number | null,
    price: 0,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addCustomEquipment = () => {
    if (tempCustomEquipment.trim()) {
      updateFormData("customEquipment", [...formData.customEquipment, tempCustomEquipment]);
      setTempCustomEquipment("");
    }
  };

  const removeCustomEquipment = (index: number) => {
    updateFormData(
      "customEquipment",
      formData.customEquipment.filter((_, i) => i !== index)
    );
  };

  const addInventoryItem = () => {
    if (tempInventoryItem.item.trim()) {
      updateFormData("inventory", [...formData.inventory, tempInventoryItem]);
      setTempInventoryItem({ item: "", quantity: 1, condition: "good", notes: "" });
    }
  };

  const removeInventoryItem = (index: number) => {
    updateFormData(
      "inventory",
      formData.inventory.filter((_, i) => i !== index)
    );
  };

  const addPricingTier = () => {
    if (tempPricingTier.price > 0) {
      updateFormData("pricing", [...formData.pricing, tempPricingTier]);
      const lastTo = tempPricingTier.to || tempPricingTier.from;
      setTempPricingTier({ from: lastTo + 1, to: null, price: 0 });
    }
  };

  const removePricingTier = (index: number) => {
    updateFormData(
      "pricing",
      formData.pricing.filter((_, i) => i !== index)
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isMain: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isMain) {
          updateFormData("mainImage", reader.result as string);
        } else {
          updateFormData("gallery", [...formData.gallery, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (index: number) => {
    updateFormData(
      "gallery",
      formData.gallery.filter((_, i) => i !== index)
    );
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.plate &&
          formData.vin &&
          formData.make &&
          formData.model &&
          formData.year &&
          formData.fuelType &&
          formData.mileage
        );
      case 2:
        return !!(
          formData.liabilityInsurance &&
          formData.technicalInspection
        );
      case 3:
        return true; // Optional
      case 4:
        return formData.pricing.length > 0;
      case 5:
        return true; // Optional
      case 6:
        return true; // Optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Klaida",
        description: "Prašome užpildyti visus privalomus laukus",
        variant: "destructive",
      });
      return;
    }
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!validateStep(6)) {
      toast({
        title: "Klaida",
        description: "Prašome užpildyti visus privalomus laukus",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would send data to API
    console.log("Form data:", formData);
    
    toast({
      title: "Sėkmingai",
      description: "Mašina sėkmingai pridėta",
    });
    
    navigate("/cars");
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/cars")}
          className="flex-shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Pridėti mašiną
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Užpildykite formą pridėdami naują automobilį
          </p>
        </div>
      </div>

      {/* Steps indicator */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all",
                    currentStep > step.id
                      ? "bg-success text-success-foreground shadow-lg"
                      : currentStep === step.id
                      ? "bg-primary text-primary-foreground shadow-lg scale-110"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {currentStep > step.id ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : step.id}
                </div>
                <span
                  className={cn(
                    "text-xs sm:text-sm mt-2 text-center hidden sm:block",
                    currentStep === step.id
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 transition-all",
                    currentStep > step.id ? "bg-success" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4 sm:hidden">
          {steps[currentStep - 1].name}
        </p>
      </Card>

      {/* Form content */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50">
        {/* Step 1: Pagrindinė informacija */}
        {currentStep === 1 && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Pagrindinė informacija</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="plate">
                  Valstybinis numeris <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="plate"
                  placeholder="ABC123"
                  value={formData.plate}
                  onChange={(e) => updateFormData("plate", e.target.value.toUpperCase())}
                  className="rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vin">
                  VIN kodas <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="vin"
                  placeholder="17 simbolių"
                  maxLength={17}
                  value={formData.vin}
                  onChange={(e) => updateFormData("vin", e.target.value.toUpperCase())}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">
                  Markė <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="make"
                  placeholder="BMW"
                  value={formData.make}
                  onChange={(e) => updateFormData("make", e.target.value)}
                  className="rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">
                  Modelis <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="model"
                  placeholder="X5"
                  value={formData.model}
                  onChange={(e) => updateFormData("model", e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">
                  Metai <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.year.toString()}
                  onValueChange={(value) => updateFormData("year", parseInt(value))}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(
                      (year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fuelType">
                  Kuro tipas <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.fuelType}
                  onValueChange={(value) => updateFormData("fuelType", value)}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Pasirinkite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Benzinas</SelectItem>
                    <SelectItem value="diesel">Dyzelis</SelectItem>
                    <SelectItem value="electric">Elektra</SelectItem>
                    <SelectItem value="hybrid">Hibridinis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mileage">
                  Rida (km) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="45000"
                  value={formData.mileage}
                  onChange={(e) => updateFormData("mileage", e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statusas</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => updateFormData("status", value)}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Laisva</SelectItem>
                  <SelectItem value="rented">Išnuomota</SelectItem>
                  <SelectItem value="in_service">Servise</SelectItem>
                  <SelectItem value="reserved">Rezervuota</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 2: Draudimai ir techninė */}
        {currentStep === 2 && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Draudimai ir techninė</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="liabilityInsurance">
                    Civilinis draudimas iki <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="liabilityInsurance"
                    type="date"
                    value={formData.liabilityInsurance}
                    onChange={(e) => updateFormData("liabilityInsurance", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="kaskoInsurance">Kasko draudimas iki</Label>
                  <Input
                    id="kaskoInsurance"
                    type="date"
                    value={formData.kaskoInsurance}
                    onChange={(e) => updateFormData("kaskoInsurance", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="franchise">Franchizė (€)</Label>
                <Input
                  id="franchise"
                  type="number"
                  placeholder="500"
                  value={formData.franchise}
                  onChange={(e) => updateFormData("franchise", e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technicalInspection">
                  Techninė apžiūra iki <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="technicalInspection"
                  type="date"
                  value={formData.technicalInspection}
                  onChange={(e) => updateFormData("technicalInspection", e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="oilChange">Tepalų keitimas (km)</Label>
                  <Input
                    id="oilChange"
                    type="number"
                    placeholder="50000"
                    value={formData.oilChange}
                    onChange={(e) => updateFormData("oilChange", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nextService">Kitas servisas</Label>
                  <Input
                    id="nextService"
                    type="date"
                    value={formData.nextService}
                    onChange={(e) => updateFormData("nextService", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Komplektacija */}
        {currentStep === 3 && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Komplektacija</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Standartinė komplektacija</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {standardEquipment.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={item}
                        checked={formData.equipment.includes(item)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData("equipment", [...formData.equipment, item]);
                          } else {
                            updateFormData(
                              "equipment",
                              formData.equipment.filter((e) => e !== item)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={item}
                        className="text-sm cursor-pointer select-none"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Papildoma komplektacija</h3>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Įveskite papildomą įrangą"
                    value={tempCustomEquipment}
                    onChange={(e) => setTempCustomEquipment(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCustomEquipment()}
                    className="rounded-xl flex-1"
                  />
                  <Button onClick={addCustomEquipment} size="icon" className="flex-shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.customEquipment.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 bg-accent/50 text-accent-foreground rounded-lg"
                    >
                      <span className="text-sm">{item}</span>
                      <button
                        onClick={() => removeCustomEquipment(index)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Inventorius</h3>
                <div className="space-y-3 mb-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Input
                      placeholder="Daiktas"
                      value={tempInventoryItem.item}
                      onChange={(e) =>
                        setTempInventoryItem({ ...tempInventoryItem, item: e.target.value })
                      }
                      className="rounded-xl"
                    />
                    <Input
                      type="number"
                      placeholder="Kiekis"
                      value={tempInventoryItem.quantity}
                      onChange={(e) =>
                        setTempInventoryItem({
                          ...tempInventoryItem,
                          quantity: parseInt(e.target.value) || 1,
                        })
                      }
                      className="rounded-xl"
                    />
                    <Select
                      value={tempInventoryItem.condition}
                      onValueChange={(value) =>
                        setTempInventoryItem({ ...tempInventoryItem, condition: value })
                      }
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Naujas</SelectItem>
                        <SelectItem value="good">Geras</SelectItem>
                        <SelectItem value="fair">Patenkinamas</SelectItem>
                        <SelectItem value="poor">Blogas</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={addInventoryItem} className="w-full sm:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Pridėti
                    </Button>
                  </div>
                </div>
                
                {formData.inventory.length > 0 && (
                  <div className="space-y-2">
                    {formData.inventory.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-xl"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.item}</p>
                          <p className="text-xs text-muted-foreground">
                            Kiekis: {item.quantity} • Būklė: {item.condition}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeInventoryItem(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Nuomos kainos */}
        {currentStep === 4 && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Nuomos kainos</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="priceFrom">Nuo dienų</Label>
                  <Input
                    id="priceFrom"
                    type="number"
                    value={tempPricingTier.from}
                    onChange={(e) =>
                      setTempPricingTier({
                        ...tempPricingTier,
                        from: parseInt(e.target.value) || 1,
                      })
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceTo">Iki dienų</Label>
                  <Input
                    id="priceTo"
                    type="number"
                    placeholder="Palikite tuščią jei neribota"
                    value={tempPricingTier.to || ""}
                    onChange={(e) =>
                      setTempPricingTier({
                        ...tempPricingTier,
                        to: e.target.value ? parseInt(e.target.value) : null,
                      })
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceAmount">Kaina (€)</Label>
                  <Input
                    id="priceAmount"
                    type="number"
                    value={tempPricingTier.price}
                    onChange={(e) =>
                      setTempPricingTier({
                        ...tempPricingTier,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="rounded-xl"
                  />
                </div>
                <Button onClick={addPricingTier} className="self-end">
                  <Plus className="h-4 w-4 mr-2" />
                  Pridėti
                </Button>
              </div>

              {formData.pricing.length > 0 && (
                <div className="space-y-2">
                  {formData.pricing.map((tier, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-xl"
                    >
                      <div>
                        <p className="font-medium">
                          {tier.from}
                          {tier.to ? `-${tier.to}` : "+"} dienų
                        </p>
                        <p className="text-sm text-muted-foreground">€{tier.price} už dieną</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePricingTier(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Nuotraukos */}
        {currentStep === 5 && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Nuotraukos</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Pagrindinė nuotrauka</h3>
                {formData.mainImage ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                    <img
                      src={formData.mainImage}
                      alt="Main"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => updateFormData("mainImage", null)}
                      className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-border rounded-xl hover:border-primary transition-colors cursor-pointer bg-muted/30">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Spustelėkite arba vilkite nuotrauką
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, true)}
                    />
                  </label>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Galerija</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {formData.gallery.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-border rounded-xl hover:border-primary transition-colors cursor-pointer bg-muted/30">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, false)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Pastabos */}
        {currentStep === 6 && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Pastabos</h2>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Papildoma informacija</Label>
              <Textarea
                id="notes"
                placeholder="Įveskite pastabas apie automobilį..."
                rows={8}
                value={formData.notes}
                onChange={(e) => updateFormData("notes", e.target.value)}
                className="rounded-xl resize-none"
              />
            </div>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <Card className="p-4 bg-gradient-to-br from-card to-card/50">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Atgal
          </Button>
          
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Žingsnis {currentStep} iš {steps.length}
          </span>
          
          {currentStep < 6 ? (
            <Button onClick={handleNext} className="flex-shrink-0">
              Toliau
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex-shrink-0">
              <Check className="h-4 w-4 mr-2" />
              Išsaugoti
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
