<div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold font-display bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Mašinos
            </h1>
            <p class="text-sm sm:text-base text-muted-foreground mt-2">
                Valdykite savo automobilių parką
            </p>
        </div>
        <a href="{{ route('cars.create') }}" class="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium hover:scale-105 transition-transform shadow-smooth">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Pridėti mašiną
        </a>
    </div>

    <!-- Filters -->
    <div class="bg-card border border-border/50 rounded-xl p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Search -->
            <div class="relative sm:col-span-2">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input 
                    type="search" 
                    wire:model.live.debounce.300ms="search"
                    placeholder="Ieškoti pagal markę, modelį ar numerį..."
                    class="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                />
            </div>

            <!-- Status Filter -->
            <select 
                wire:model.live="status"
                class="px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
            >
                <option value="all">Visos būsenos</option>
                <option value="available">Laisva</option>
                <option value="rented">Išnuomota</option>
                <option value="in_service">Servise</option>
                <option value="reserved">Rezervuota</option>
            </select>

            <!-- Sort -->
            <select 
                wire:model.live="sortBy"
                class="px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
            >
                <option value="newest">Naujausi</option>
                <option value="oldest">Seniausi</option>
                <option value="price_low">Kaina: Mažiausia</option>
                <option value="price_high">Kaina: Didžiausia</option>
            </select>
        </div>

        <!-- View Toggle -->
        <div class="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
            <span class="text-sm text-muted-foreground">Rodymas:</span>
            <button 
                wire:click="$set('view', 'grid')"
                class="p-2 rounded-lg transition-smooth {{ $view === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent' }}"
            >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
            </button>
            <button 
                wire:click="$set('view', 'table')"
                class="p-2 rounded-lg transition-smooth {{ $view === 'table' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent' }}"
            >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
            </button>
        </div>
    </div>

    <!-- Cars Grid/Table -->
    @if($view === 'grid')
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            @foreach($cars as $car)
                <a href="{{ route('cars.show', $car['id']) }}" class="bg-card border border-border/50 rounded-xl overflow-hidden hover-lift group">
                    <div class="aspect-[4/3] bg-muted relative overflow-hidden">
                        <img src="{{ $car['image'] }}" alt="{{ $car['brand'] }} {{ $car['model'] }}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div class="absolute top-3 right-3">
                            <x-status-badge :status="$car['status']" />
                        </div>
                    </div>
                    <div class="p-4 space-y-2">
                        <h3 class="font-bold text-lg">{{ $car['brand'] }} {{ $car['model'] }}</h3>
                        <div class="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{{ $car['year'] }} m.</span>
                            <span>{{ $car['license_plate'] }}</span>
                        </div>
                        <div class="flex items-center justify-between pt-2 border-t border-border/50">
                            <span class="text-2xl font-bold text-primary">€{{ $car['daily_rate'] }}</span>
                            <span class="text-sm text-muted-foreground">/diena</span>
                        </div>
                    </div>
                </a>
            @endforeach
        </div>
    @else
        <div class="bg-card border border-border/50 rounded-xl overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-muted/50 border-b border-border/50">
                        <tr>
                            <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Nuotrauka</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Mašina</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Metai</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Numeris</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Būsena</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Kaina/diena</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Veiksmai</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-border/50">
                        @foreach($cars as $car)
                            <tr class="hover:bg-muted/30 transition-colors">
                                <td class="px-4 py-3">
                                    <img src="{{ $car['image'] }}" alt="{{ $car['brand'] }}" class="w-16 h-12 object-cover rounded-lg" />
                                </td>
                                <td class="px-4 py-3 font-medium">{{ $car['brand'] }} {{ $car['model'] }}</td>
                                <td class="px-4 py-3 text-sm text-muted-foreground">{{ $car['year'] }}</td>
                                <td class="px-4 py-3 text-sm">{{ $car['license_plate'] }}</td>
                                <td class="px-4 py-3">
                                    <x-status-badge :status="$car['status']" />
                                </td>
                                <td class="px-4 py-3 font-bold text-primary">€{{ $car['daily_rate'] }}</td>
                                <td class="px-4 py-3">
                                    <a href="{{ route('cars.show', $car['id']) }}" class="text-primary hover:underline text-sm">Peržiūrėti</a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
</div>
