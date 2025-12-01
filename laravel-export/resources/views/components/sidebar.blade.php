@props(['collapsed' => false])

<aside 
    x-data="{ collapsed: false }"
    :class="collapsed ? 'w-16' : 'w-64'"
    class="bg-sidebar/80 backdrop-blur-lg border-r border-sidebar-border/50 transition-smooth flex-col hidden lg:flex"
>
    <!-- Header -->
    <div class="h-16 flex items-center justify-between px-4 border-b border-sidebar-border/50">
        <h1 x-show="!collapsed" class="font-display font-bold text-xl bg-gradient-to-r from-sidebar-primary to-primary bg-clip-text text-transparent">
            AutoRent
        </h1>
        <button 
            @click="collapsed = !collapsed"
            class="p-2 hover:bg-sidebar-accent/50 rounded-lg transition-smooth"
        >
            <svg x-show="collapsed" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
            <svg x-show="!collapsed" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
        </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-2 space-y-1">
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
                :class="collapsed ? 'justify-center' : ''"
                class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground transition-smooth hover:bg-sidebar-accent/50 group {{ request()->routeIs($item['route']) ? 'bg-gradient-to-r from-sidebar-primary to-primary text-sidebar-primary-foreground font-medium shadow-smooth' : '' }}"
            >
                <svg class="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $item['icon'] }}"/>
                </svg>
                <span x-show="!collapsed">{{ $item['name'] }}</span>
            </a>
        @endforeach
    </nav>
</aside>
