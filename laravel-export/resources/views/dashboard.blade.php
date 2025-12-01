@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
<div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold font-display bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Sveiki sugrįžę! 👋
        </h1>
        <p class="text-sm sm:text-base text-muted-foreground mt-2">
            Čia yra jūsų valdymo skydelis su visomis svarbiomis detalėmis
        </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <x-stat-card 
            title="Visos mašinos"
            value="24"
            icon="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            :trend="true"
            trend-value="12"
            :trend-positive="true"
        />
        
        <x-stat-card 
            title="Išnuomota"
            value="18"
            icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            :trend="true"
            trend-value="8"
            :trend-positive="true"
        />
        
        <x-stat-card 
            title="Aktyvūs klientai"
            value="142"
            icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            :trend="true"
            trend-value="15"
            :trend-positive="true"
        />
        
        <x-stat-card 
            title="Mėnesio pajamos"
            value="€12,450"
            icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            :trend="true"
            trend-value="23"
            :trend-positive="true"
        />
    </div>

    <!-- Quick Actions -->
    <div class="bg-card border border-border/50 rounded-xl p-4 sm:p-6">
        <h2 class="text-lg sm:text-xl font-bold mb-4">Greiti veiksmai</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <a href="{{ route('cars.create') }}" class="flex items-center gap-3 p-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl hover:scale-105 transition-transform shadow-smooth">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                <span class="font-medium">Pridėti mašiną</span>
            </a>
            
            <a href="{{ route('contracts.index') }}" class="flex items-center gap-3 p-4 bg-accent hover:bg-accent/80 rounded-xl hover:scale-105 transition-transform shadow-smooth">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span class="font-medium">Nauja sutartis</span>
            </a>
            
            <a href="{{ route('reservations.index') }}" class="flex items-center gap-3 p-4 bg-accent hover:bg-accent/80 rounded-xl hover:scale-105 transition-transform shadow-smooth">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span class="font-medium">Rezervacijos</span>
            </a>
        </div>
    </div>
</div>
@endsection
