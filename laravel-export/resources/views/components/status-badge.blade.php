@props(['status'])

@php
$statusConfig = [
    'available' => ['label' => 'Laisva', 'class' => 'bg-success/10 text-success border-success/20'],
    'rented' => ['label' => 'Išnuomota', 'class' => 'bg-info/10 text-info border-info/20'],
    'in_service' => ['label' => 'Servise', 'class' => 'bg-warning/10 text-warning border-warning/20'],
    'reserved' => ['label' => 'Rezervuota', 'class' => 'bg-primary/10 text-primary border-primary/20'],
    'draft' => ['label' => 'Juodraštis', 'class' => 'bg-muted text-muted-foreground border-border'],
    'active' => ['label' => 'Aktyvi', 'class' => 'bg-success/10 text-success border-success/20'],
    'completed' => ['label' => 'Užbaigta', 'class' => 'bg-muted text-muted-foreground border-border'],
    'cancelled' => ['label' => 'Atšaukta', 'class' => 'bg-destructive/10 text-destructive border-destructive/20'],
];

$config = $statusConfig[$status] ?? ['label' => $status, 'class' => 'bg-muted text-muted-foreground border-border'];
@endphp

<span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium border transition-smooth {{ $config['class'] }}">
    {{ $config['label'] }}
</span>
