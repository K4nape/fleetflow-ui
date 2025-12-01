<div class="space-y-6 animate-fade-in max-w-4xl mx-auto">
    <!-- Header -->
    <div>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold font-display bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {{ $carId ? 'Redaguoti mašiną' : 'Pridėti naują mašiną' }}
        </h1>
        <p class="text-sm sm:text-base text-muted-foreground mt-2">
            Užpildykite visą informaciją apie automobilį
        </p>
    </div>

    <!-- Progress Steps -->
    <div class="bg-card border border-border/50 rounded-xl p-4 sm:p-6">
        <div class="flex items-center justify-between mb-4">
            @for($i = 1; $i <= $totalSteps; $i++)
                <div class="flex flex-col items-center flex-1">
                    <button 
                        wire:click="goToStep({{ $i }})"
                        class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-smooth
                            {{ $currentStep === $i ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-smooth' : '' }}
                            {{ $currentStep > $i ? 'bg-success text-white' : '' }}
                            {{ $currentStep < $i ? 'bg-muted text-muted-foreground' : '' }}"
                    >
                        {{ $i }}
                    </button>
                    @if($i < $totalSteps)
                        <div class="h-1 flex-1 mx-2 {{ $currentStep > $i ? 'bg-success' : 'bg-muted' }} transition-smooth"></div>
                    @endif
                </div>
            @endfor
        </div>
        <div class="text-center">
            <p class="font-medium text-sm">
                @switch($currentStep)
                    @case(1) Pagrindinė informacija @break
                    @case(2) Draudimas ir techninė @break
                    @case(3) Įranga @break
                    @case(4) Kainos @break
                    @case(5) Nuotraukos @break
                    @case(6) Pastabos @break
                @endswitch
            </p>
        </div>
    </div>

    <!-- Form Steps -->
    <form wire:submit="save" class="bg-card border border-border/50 rounded-xl p-4 sm:p-6 space-y-6">
        
        <!-- Step 1: Basic Info -->
        @if($currentStep === 1)
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Markė *</label>
                    <input type="text" wire:model="brand" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    @error('brand') <span class="text-destructive text-sm">{{ $message }}</span> @enderror
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Modelis *</label>
                    <input type="text" wire:model="model" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    @error('model') <span class="text-destructive text-sm">{{ $message }}</span> @enderror
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Metai *</label>
                    <input type="number" wire:model="year" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    @error('year') <span class="text-destructive text-sm">{{ $message }}</span> @enderror
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Valstybinis numeris *</label>
                    <input type="text" wire:model="license_plate" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    @error('license_plate') <span class="text-destructive text-sm">{{ $message }}</span> @enderror
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">VIN kodas</label>
                    <input type="text" wire:model="vin" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Spalva</label>
                    <input type="text" wire:model="color" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Kuro tipas</label>
                    <select wire:model="fuel_type" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="petrol">Benzinas</option>
                        <option value="diesel">Dyzelinas</option>
                        <option value="electric">Elektra</option>
                        <option value="hybrid">Hibridinis</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Pavarų dėžė</label>
                    <select wire:model="transmission" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="automatic">Automatinė</option>
                        <option value="manual">Mechaninė</option>
                    </select>
                </div>
            </div>
        @endif

        <!-- Step 2: Insurance & Technical -->
        @if($currentStep === 2)
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Draudimo kompanija</label>
                    <input type="text" wire:model="insurance_company" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Poliso numeris</label>
                    <input type="text" wire:model="insurance_policy" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Draudimo galiojimas</label>
                    <input type="date" wire:model="insurance_expires" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Kita techninė apžiūra</label>
                    <input type="date" wire:model="next_inspection" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Rida (km)</label>
                    <input type="number" wire:model="mileage" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
            </div>
        @endif

        <!-- Step 3: Equipment -->
        @if($currentStep === 3)
            <div class="space-y-4">
                <p class="text-sm text-muted-foreground">Pasirinkite automobilio įrangą</p>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    @foreach(['Kondicionierius', 'Navigacija', 'Bluetooth', 'Cruise control', 'Parkavimo davikliai', 'Kamera', 'Panoraminis stogas', 'Oda salonas'] as $feature)
                        <label class="flex items-center gap-2 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-smooth">
                            <input type="checkbox" wire:model="features" value="{{ $feature }}" class="rounded border-border focus:ring-primary" />
                            <span class="text-sm">{{ $feature }}</span>
                        </label>
                    @endforeach
                </div>
            </div>
        @endif

        <!-- Step 4: Pricing -->
        @if($currentStep === 4)
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Dienos kaina (€) *</label>
                    <input type="number" step="0.01" wire:model="daily_rate" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    @error('daily_rate') <span class="text-destructive text-sm">{{ $message }}</span> @enderror
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Savaitės kaina (€)</label>
                    <input type="number" step="0.01" wire:model="weekly_rate" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Mėnesio kaina (€)</label>
                    <input type="number" step="0.01" wire:model="monthly_rate" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Užstatas (€)</label>
                    <input type="number" step="0.01" wire:model="deposit" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
            </div>
        @endif

        <!-- Step 5: Photos -->
        @if($currentStep === 5)
            <div class="space-y-4">
                <label class="block text-sm font-medium mb-2">Nuotraukos</label>
                <input type="file" wire:model="photos" multiple accept="image/*" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <p class="text-xs text-muted-foreground">Įkelkite iki 10 nuotraukų</p>
            </div>
        @endif

        <!-- Step 6: Notes -->
        @if($currentStep === 6)
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Aprašymas</label>
                    <textarea wire:model="description" rows="4" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Vidinės pastabos</label>
                    <textarea wire:model="notes" rows="3" class="w-full px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
                </div>
            </div>
        @endif

        <!-- Navigation Buttons -->
        <div class="flex items-center justify-between pt-6 border-t border-border/50">
            <button 
                type="button"
                wire:click="previousStep"
                @if($currentStep === 1) disabled @endif
                class="px-4 py-2.5 border border-border rounded-xl hover:bg-accent transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Atgal
            </button>
            
            @if($currentStep < $totalSteps)
                <button 
                    type="button"
                    wire:click="nextStep"
                    class="px-6 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium hover:scale-105 transition-transform shadow-smooth"
                >
                    Toliau
                </button>
            @else
                <button 
                    type="submit"
                    class="px-6 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium hover:scale-105 transition-transform shadow-smooth"
                >
                    Išsaugoti
                </button>
            @endif
        </div>
    </form>
</div>
