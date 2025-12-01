<header class="h-16 bg-card/80 backdrop-blur-lg border-b border-border/50 px-6 items-center justify-between sticky top-0 z-40 hidden lg:flex">
    <div class="flex items-center gap-4 flex-1 max-w-2xl">
        <div class="relative flex-1">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
                type="search"
                placeholder="Paieška..."
                class="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth placeholder:text-muted-foreground/60"
            />
        </div>
    </div>

    <div class="flex items-center gap-2">
        <button class="p-2 hover:bg-accent/50 rounded-lg transition-smooth relative">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span class="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full animate-pulse shadow-smooth"></span>
        </button>
        
        <x-theme-toggle />
    </div>
</header>
