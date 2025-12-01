<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithFileUploads;

class CarForm extends Component
{
    use WithFileUploads;

    public $carId = null;
    public $currentStep = 1;
    public $totalSteps = 6;

    // Step 1: Basic Info
    public $brand = '';
    public $model = '';
    public $year = '';
    public $license_plate = '';
    public $vin = '';
    public $color = '';
    public $fuel_type = 'petrol';
    public $transmission = 'automatic';
    public $seats = 5;
    public $doors = 4;

    // Step 2: Insurance & Technical
    public $insurance_company = '';
    public $insurance_policy = '';
    public $insurance_expires = '';
    public $next_inspection = '';
    public $last_service = '';
    public $mileage = '';

    // Step 3: Equipment
    public $features = [];

    // Step 4: Pricing
    public $daily_rate = '';
    public $weekly_rate = '';
    public $monthly_rate = '';
    public $deposit = '';

    // Step 5: Photos
    public $photos = [];
    public $existingPhotos = [];

    // Step 6: Notes
    public $description = '';
    public $notes = '';

    protected $rules = [
        'brand' => 'required|min:2',
        'model' => 'required|min:1',
        'year' => 'required|numeric|min:1900|max:2100',
        'license_plate' => 'required',
        'daily_rate' => 'required|numeric|min:0',
    ];

    public function mount($id = null)
    {
        if ($id) {
            $this->carId = $id;
            $this->loadCar($id);
        }
    }

    private function loadCar($id)
    {
        // Load car data from database
        // $car = Car::findOrFail($id);
        // $this->fill($car->toArray());
    }

    public function nextStep()
    {
        $this->validateCurrentStep();
        
        if ($this->currentStep < $this->totalSteps) {
            $this->currentStep++;
        }
    }

    public function previousStep()
    {
        if ($this->currentStep > 1) {
            $this->currentStep--;
        }
    }

    public function goToStep($step)
    {
        if ($step >= 1 && $step <= $this->totalSteps) {
            $this->currentStep = $step;
        }
    }

    private function validateCurrentStep()
    {
        switch ($this->currentStep) {
            case 1:
                $this->validate([
                    'brand' => 'required|min:2',
                    'model' => 'required|min:1',
                    'year' => 'required|numeric|min:1900|max:2100',
                    'license_plate' => 'required',
                ]);
                break;
            case 4:
                $this->validate([
                    'daily_rate' => 'required|numeric|min:0',
                ]);
                break;
        }
    }

    public function save()
    {
        $this->validate();

        // Save to database
        // if ($this->carId) {
        //     $car = Car::findOrFail($this->carId);
        //     $car->update($this->getCarData());
        // } else {
        //     Car::create($this->getCarData());
        // }

        session()->flash('success', 'Mašina sėkmingai išsaugota!');
        return redirect()->route('cars.index');
    }

    private function getCarData()
    {
        return [
            'brand' => $this->brand,
            'model' => $this->model,
            'year' => $this->year,
            'license_plate' => $this->license_plate,
            'vin' => $this->vin,
            'color' => $this->color,
            'fuel_type' => $this->fuel_type,
            'transmission' => $this->transmission,
            'seats' => $this->seats,
            'doors' => $this->doors,
            'daily_rate' => $this->daily_rate,
            'weekly_rate' => $this->weekly_rate,
            'monthly_rate' => $this->monthly_rate,
            'deposit' => $this->deposit,
            'description' => $this->description,
            'notes' => $this->notes,
        ];
    }

    public function render()
    {
        return view('livewire.car-form');
    }
}
