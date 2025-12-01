<nav class="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border/50 lg:hidden safe-area-inset-bottom">
    <div class="grid grid-cols-5 h-16">
        @php
        $navigation = [
            ['name' => 'Dashboard', 'route' => 'dashboard', 'label' => 'Pradžia', 'icon' => 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'],
            ['name' => 'Mašinos', 'route' => 'cars.index', 'label' => 'Mašinos', 'icon' => 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'],
            ['name' => 'Klientai', 'route' => 'clients.index', 'label' => 'Klientai', 'icon' => 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'],
            ['name' => 'Sutartys', 'route' => 'contracts.index', 'label' => 'Sutartys', 'icon' => 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'],
            ['name' => 'Rezervacijos', 'route' => 'reservations.index', 'label' => 'Rezerv.', 'icon' => 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'],
        ];
        @endphp

        @foreach($navigation as $item)
            @php
                $isActive = request()->routeIs($item['route']);
            @endphp
            <a 
                href="{{ route($item['route']) }}"
                class="flex flex-col items-center justify-center gap-1 transition-all {{ $isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground' }}"
            >
                <div class="relative {{ $isActive ? 'after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-primary after:rounded-full' : '' }}">
                    <svg class="h-5 w-5 transition-transform {{ $isActive ? 'scale-110' : '' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $item['icon'] }}"/>
                    </svg>
                </div>
                <span class="text-xs truncate max-w-full px-1">{{ $item['label'] }}</span>
            </a>
        @endforeach
    </div>
</nav>
