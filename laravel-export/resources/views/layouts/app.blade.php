<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'AutoRent') }} - @yield('title', 'Dashboard')</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
</head>
<body class="antialiased">
    <div class="min-h-screen flex w-full bg-background" x-data="{ sidebarCollapsed: false }">
        <!-- Desktop Sidebar -->
        <x-sidebar />
        
        <div class="flex-1 flex flex-col min-w-0">
            <!-- Desktop Header -->
            <x-header />
            
            <!-- Mobile Header -->
            <x-mobile-header />
            
            <!-- Main Content -->
            <main class="flex-1 p-3 sm:p-4 lg:p-6 pb-20 lg:pb-6">
                @yield('content')
            </main>
            
            <!-- Mobile Bottom Navigation -->
            <x-bottom-nav />
        </div>
    </div>

    @livewireScripts
    
    <!-- Theme Toggle Script -->
    <script>
        // Theme initialization
        const initTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = savedTheme || (prefersDark ? 'dark' : 'light');
            
            document.documentElement.classList.toggle('dark', theme === 'dark');
        };
        
        initTheme();
        
        // Theme toggle function
        window.toggleTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';
            
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
            localStorage.setItem('theme', newTheme);
        };
    </script>
</body>
</html>
