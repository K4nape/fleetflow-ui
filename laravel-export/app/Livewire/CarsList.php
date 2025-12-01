<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithPagination;

class CarsList extends Component
{
    use WithPagination;

    public $search = '';
    public $status = 'all';
    public $sortBy = 'newest';
    public $view = 'grid'; // grid or table

    protected $queryString = ['search', 'status', 'sortBy'];

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function updatingStatus()
    {
        $this->resetPage();
    }

    public function render()
    {
        // Čia pakeiskite savo Car modeliu
        // $cars = Car::query()
        //     ->when($this->search, function($query) {
        //         $query->where('brand', 'like', '%' . $this->search . '%')
        //               ->orWhere('model', 'like', '%' . $this->search . '%')
        //               ->orWhere('license_plate', 'like', '%' . $this->search . '%');
        //     })
        //     ->when($this->status !== 'all', function($query) {
        //         $query->where('status', $this->status);
        //     })
        //     ->when($this->sortBy === 'newest', function($query) {
        //         $query->latest();
        //     })
        //     ->when($this->sortBy === 'oldest', function($query) {
        //         $query->oldest();
        //     })
        //     ->when($this->sortBy === 'price_low', function($query) {
        //         $query->orderBy('daily_rate', 'asc');
        //     })
        //     ->when($this->sortBy === 'price_high', function($query) {
        //         $query->orderBy('daily_rate', 'desc');
        //     })
        //     ->paginate(12);

        // Demo data
        $cars = $this->getDemoCars();

        return view('livewire.cars-list', [
            'cars' => $cars
        ]);
    }

    private function getDemoCars()
    {
        // Demo duomenys testavimui
        return collect([
            [
                'id' => 1,
                'brand' => 'BMW',
                'model' => 'X5',
                'year' => 2023,
                'license_plate' => 'ABC 123',
                'status' => 'available',
                'daily_rate' => 89,
                'image' => 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400'
            ],
            [
                'id' => 2,
                'brand' => 'Mercedes',
                'model' => 'E-Class',
                'year' => 2023,
                'license_plate' => 'DEF 456',
                'status' => 'rented',
                'daily_rate' => 95,
                'image' => 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400'
            ],
            [
                'id' => 3,
                'brand' => 'Audi',
                'model' => 'A6',
                'year' => 2022,
                'license_plate' => 'GHI 789',
                'status' => 'available',
                'daily_rate' => 79,
                'image' => 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400'
            ],
        ]);
    }
}
