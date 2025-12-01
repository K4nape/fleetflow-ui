@props([
    'title',
    'value',
    'icon',
    'trend' => null,
    'trendValue' => null,
    'trendPositive' => true
])

<div class="p-4 sm:p-6 hover-lift border border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur rounded-xl">
    <div class="flex items-start justify-between gap-3">
        <div class="space-y-2 flex-1 min-w-0">
            <p class="text-xs sm:text-sm font-medium text-muted-foreground truncate">{{ $title }}</p>
            <p class="text-2xl sm:text-3xl font-bold font-display bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                {{ $value }}
            </p>
            @if($trend)
                <div class="flex items-center gap-1.5 text-xs sm:text-sm flex-wrap">
                    <span class="inline-flex items-center gap-0.5 font-semibold px-2 py-1 rounded-lg {{ $trendPositive ? 'text-success bg-success/10' : 'text-destructive bg-destructive/10' }}">
                        {{ $trendPositive ? '↑' : '↓' }}
                        {{ $trendValue }}%
                    </span>
                </div>
            @endif
        </div>
        <div class="p-2.5 sm:p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-smooth glow-primary flex-shrink-0">
            <svg class="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $icon }}"/>
            </svg>
        </div>
    </div>
</div>
