<header 
    x-data="{ menuOpen: false }"
    class="h-14 bg-card/95 backdrop-blur-lg border-b border-border/50 px-4 flex items-center justify-between lg:hidden sticky top-0 z-40"
>
    <div class="flex items-center gap-3">
        <button @click="menuOpen = true" class="p-2 hover:bg-accent/50 rounded-lg transition-smooth">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        </button>

        <h1 class="font-display font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            AutoRent
        </h1>
    </div>

    <div class="flex items-center gap-2">
        <button class="p-2 hover:bg-accent/50 rounded-lg transition-smooth relative">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span class="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full animate-pulse"></span>
        </button>
        <x-theme-toggle />
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
        x-show="menuOpen"
        x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        @click="menuOpen = false"
        class="fixed inset-0 bg-black/50 z-50"
        style="display: none;"
    ></div>

    <!-- Mobile Menu -->
    <div 
        x-show="menuOpen"
        x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="-translate-x-full"
        x-transition:enter-end="translate-x-0"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="translate-x-0"
        x-transition:leave-end="-translate-x-full"
        class="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border/50 z-50"
        style="display: none;"
    >
        <div class="p-4 border-b border-border/50">
            <h2 class="font-display font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                AutoRent
            </h2>
        </div>
        
        <nav class="p-2 space-y-1">
            @php
            $navigation = [
                ['name' => 'Dashboard', 'route' => 'dashboard', 'icon' => 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'],
                ['name' => 'Mašinos', 'route' => 'cars.index', 'icon' => 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'],
                ['name' => 'Klientai', 'route' => 'clients.index', 'icon' => 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'],
                ['name' => 'Sutartys', 'route' => 'contracts.index', 'icon' => 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'],
                ['name' => 'Rezervacijos', 'route' => 'reservations.index', 'icon' => 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'],
                ['name' => 'Finansai', 'route' => 'finance.index', 'icon' => 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'],
                ['name' => 'Nustatymai', 'route' => 'settings.index', 'icon' => 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'],
            ];
            @endphp

            @foreach($navigation as $item)
                <a 
                    href="{{ route($item['route']) }}"
                    @click="menuOpen = false"
                    class="flex items-center gap-3 px-3 py-3 rounded-xl text-foreground transition-smooth hover:bg-accent/50 {{ request()->routeIs($item['route']) ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium shadow-lg' : '' }}"
                >
                    <svg class="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $item['icon'] }}"/>
                    </svg>
                    <span>{{ $item['name'] }}</span>
                </a>
            @endforeach
        </nav>
    </div>
</header>
