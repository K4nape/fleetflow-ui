# Laravel Blade + Livewire Export

Šis folderis skirtas Laravel projektui su Blade šablonais ir Livewire komponentais.

## Failų struktūra

```
laravel-export/
├── resources/
│   ├── views/
│   │   ├── layouts/
│   │   │   └── app.blade.php          # Pagrindinis layout
│   │   ├── components/
│   │   │   ├── sidebar.blade.php      # Desktop sidebar
│   │   │   ├── header.blade.php       # Desktop header
│   │   │   ├── mobile-header.blade.php # Mobile header
│   │   │   ├── bottom-nav.blade.php   # Mobile bottom navigation
│   │   │   ├── theme-toggle.blade.php # Temos perjungimas
│   │   │   ├── stat-card.blade.php    # Statistikos kortelė
│   │   │   └── status-badge.blade.php # Būsenos ženklelis
│   │   ├── dashboard.blade.php         # Dashboard puslapis
│   │   └── cars/
│   │       ├── index.blade.php         # Mašinų sąrašas
│   │       ├── show.blade.php          # Mašinos detalės
│   │       └── form.blade.php          # Mašinos forma
│   └── css/
│       └── app.css                     # Pagrindinis CSS su Tailwind
├── app/
│   └── Livewire/
│       ├── CarsList.php                # Livewire: Mašinų sąrašas
│       ├── CarDetails.php              # Livewire: Mašinos detalės
│       └── CarForm.php                 # Livewire: Mašinos forma
└── tailwind.config.js                  # Tailwind konfigūracija
```

## Instaliavimas

### 1. Nukopijuokite failus į savo Laravel projektą

```bash
# Blade views
cp laravel-export/resources/views/* resources/views/ -r

# CSS
cp laravel-export/resources/css/app.css resources/css/

# Livewire komponentai
cp laravel-export/app/Livewire/* app/Livewire/ -r

# Tailwind config
cp laravel-export/tailwind.config.js ./
```

### 2. Įdiekite reikiamus paketus

```bash
composer require livewire/livewire
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npm install
```

### 3. Sukonfigūruokite Tailwind

Patikrinkite, kad `postcss.config.js` būtų:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 4. Sukompiliuokite assets

```bash
npm run dev
# arba production build
npm run build
```

### 5. Pridėkite route'us

```php
// routes/web.php
use App\Livewire\CarsList;
use App\Livewire\CarDetails;
use App\Livewire\CarForm;

Route::get('/', function () {
    return view('dashboard');
})->name('dashboard');

Route::get('/cars', CarsList::class)->name('cars.index');
Route::get('/cars/create', CarForm::class)->name('cars.create');
Route::get('/cars/{id}', CarDetails::class)->name('cars.show');
Route::get('/cars/{id}/edit', CarForm::class)->name('cars.edit');

// Kiti route'ai pagal poreikį
Route::view('/clients', 'clients.index')->name('clients.index');
Route::view('/contracts', 'contracts.index')->name('contracts.index');
Route::view('/reservations', 'reservations.index')->name('reservations.index');
Route::view('/finance', 'finance.index')->name('finance.index');
Route::view('/settings', 'settings.index')->name('settings.index');
```

## Naudojimas

### Temos perjungimas

Tema valdoma per localStorage ir JavaScript. Pridėta automatinė dark mode detekcija.

### Livewire komponentai

Visi pagrindiniai komponentai naudoja Livewire:
- `CarsList` - Mašinų sąrašas su filtrais ir paieška
- `CarDetails` - Mašinos detalių peržiūra
- `CarForm` - Mašinos kūrimo/redagavimo forma su 6 žingsniais

### Responsive dizainas

- **Desktop**: Pilnas sidebar ir header
- **Tablet**: Sutraukiamas sidebar
- **Mobile**: Bottom navigation + hamburger meniu

## Spalvų sistema

Visos spalvos apibrėžtos per CSS kintamuosius (HSL) ir Tailwind semantic tokens:
- `--primary` - Pagrindinė spalva (emerald/teal)
- `--secondary`, `--accent`, `--muted` - Papildomos spalvos
- Dark mode automatiškai perjungiamas per `.dark` klasę

## Šriftai

Naudojamas **Outfit** šriftas iš Google Fonts (jau įtrauktas layout'e).

## Pastabos

- Livewire v3 sintaksė
- Alpine.js naudojamas dropdown'ams ir interaktyvumui
- Blade komponentai naudoja `@props` ir `{{ $slot }}`
- Išlaikyta visa dizaino sistema iš React versijos
