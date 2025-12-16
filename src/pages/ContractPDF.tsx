import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

export default function ContractPDF() {
  const navigate = useNavigate();
  const { id } = useParams();
  const printRef = useRef<HTMLDivElement>(null);

  // Mock contract data
  const contract = {
    id: id || "1",
    contractNumber: "SUT-2024-0156",
    client: {
      name: "Jonas Petraitis",
      address: "Gedimino pr. 1, Vilnius",
      phone: "+370 612 34567",
      email: "jonas@email.com",
      personalCode: "39001011234",
      licenseNumber: "LT123456",
    },
    car: {
      brand: "BMW",
      model: "X5",
      plate: "ABC123",
      vin: "WBAJB0C51JB084264",
      year: 2023,
      color: "Juoda",
      mileageStart: 45230,
    },
    startDate: "2024-12-10",
    endDate: "2024-12-20",
    totalAmount: 850,
    deposit: 500,
    dailyRate: 85,
    services: [
      { name: "GPS navigacija", price: 50 },
      { name: "Pilnas draudimas", price: 150 },
    ],
    company: {
      name: "AutoRent UAB",
      code: "123456789",
      vatCode: "LT123456789",
      address: "Laisvės al. 10, Kaunas",
      phone: "+370 600 00000",
      email: "info@autorent.lt",
      bank: "AB SEB bankas",
      account: "LT12 7044 0600 0000 0001",
    },
  };

  const handlePrint = () => {
    window.print();
  };

  const totalDays = Math.ceil(
    (new Date(contract.endDate).getTime() - new Date(contract.startDate).getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      {/* Controls - Hidden in print */}
      <div className="flex items-center justify-between gap-3 print:hidden">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/contracts/${id}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Spausdinti
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Atsisiųsti PDF
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Siųsti klientui
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div 
        ref={printRef} 
        className="bg-white text-black p-8 rounded-lg shadow-lg max-w-4xl mx-auto print:shadow-none print:p-0 print:max-w-none"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{contract.company.name}</h1>
            <p className="text-sm text-gray-600 mt-1">Įm. kodas: {contract.company.code}</p>
            <p className="text-sm text-gray-600">PVM kodas: {contract.company.vatCode}</p>
            <p className="text-sm text-gray-600 mt-2">{contract.company.address}</p>
            <p className="text-sm text-gray-600">{contract.company.phone} | {contract.company.email}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-emerald-600">NUOMOS SUTARTIS</h2>
            <p className="text-lg font-mono font-semibold mt-2">{contract.contractNumber}</p>
            <p className="text-sm text-gray-500 mt-1">Data: {new Date().toLocaleDateString('lt-LT')}</p>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Nuomotojas</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">{contract.company.name}</p>
              <p className="text-sm text-gray-600">{contract.company.address}</p>
              <p className="text-sm text-gray-600">Tel.: {contract.company.phone}</p>
              <p className="text-sm text-gray-600">El. paštas: {contract.company.email}</p>
              <p className="text-sm text-gray-600 mt-2">Bankas: {contract.company.bank}</p>
              <p className="text-sm text-gray-600">Sąskaita: {contract.company.account}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Nuomininkas</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">{contract.client.name}</p>
              <p className="text-sm text-gray-600">{contract.client.address}</p>
              <p className="text-sm text-gray-600">Tel.: {contract.client.phone}</p>
              <p className="text-sm text-gray-600">El. paštas: {contract.client.email}</p>
              <p className="text-sm text-gray-600 mt-2">Asmens kodas: {contract.client.personalCode}</p>
              <p className="text-sm text-gray-600">Vairuotojo pažym.: {contract.client.licenseNumber}</p>
            </div>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Automobilio duomenys</h3>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500">Markė / Modelis</p>
                <p className="font-semibold">{contract.car.brand} {contract.car.model}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Valstybinis Nr.</p>
                <p className="font-semibold font-mono">{contract.car.plate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">VIN kodas</p>
                <p className="font-semibold font-mono text-sm">{contract.car.vin}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Metai</p>
                <p className="font-semibold">{contract.car.year}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Spalva</p>
                <p className="font-semibold">{contract.car.color}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Rida išduodant</p>
                <p className="font-semibold">{contract.car.mileageStart.toLocaleString()} km</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Period */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Nuomos laikotarpis</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-500">Pradžia</p>
              <p className="font-semibold text-lg">{new Date(contract.startDate).toLocaleDateString('lt-LT')}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-500">Pabaiga</p>
              <p className="font-semibold text-lg">{new Date(contract.endDate).toLocaleDateString('lt-LT')}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg text-center border border-emerald-200">
              <p className="text-xs text-gray-500">Trukmė</p>
              <p className="font-semibold text-lg text-emerald-600">{totalDays} dienos</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Kaina</h3>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 text-gray-600">Paros kaina</td>
                  <td className="px-4 py-3 text-right font-medium">{contract.dailyRate.toFixed(2)} €</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 text-gray-600">Nuomos dienų skaičius</td>
                  <td className="px-4 py-3 text-right font-medium">{totalDays}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 text-gray-600">Bazinė kaina ({totalDays} × {contract.dailyRate} €)</td>
                  <td className="px-4 py-3 text-right font-medium">{(totalDays * contract.dailyRate).toFixed(2)} €</td>
                </tr>
                {contract.services.map((service, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-600">{service.name}</td>
                    <td className="px-4 py-3 text-right font-medium">{service.price.toFixed(2)} €</td>
                  </tr>
                ))}
                <tr className="bg-emerald-50">
                  <td className="px-4 py-4 font-semibold text-gray-900">VISO MOKĖTI</td>
                  <td className="px-4 py-4 text-right font-bold text-xl text-emerald-600">{contract.totalAmount.toFixed(2)} €</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3 text-gray-600">Depozitas</td>
                  <td className="px-4 py-3 text-right font-medium">{contract.deposit.toFixed(2)} €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Terms */}
        <div className="mb-8 text-sm text-gray-600">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Sąlygos</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Nuomininkas įsipareigoja grąžinti automobilį sutartu laiku ir tokios pat būklės, kokios jį gavo.</li>
            <li>Draudžiama naudoti automobilį lenktynėse, mokyti vairuoti ar pervežti pavojingus krovinius.</li>
            <li>Nuomininkas prisiima atsakomybę už visus kelių eismo taisyklių pažeidimus nuomos laikotarpiu.</li>
            <li>Depozitas grąžinamas per 3 darbo dienas po automobilio grąžinimo, jei nėra pažeidimų.</li>
            <li>Kuro bake turi likti tiek pat kuro, kiek buvo išdavimo metu.</li>
          </ol>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t-2 border-gray-200">
          <div>
            <p className="text-sm text-gray-500 mb-12">Nuomotojas</p>
            <div className="border-t border-gray-400 pt-2">
              <p className="text-sm">{contract.company.name}</p>
              <p className="text-xs text-gray-500">Parašas, data</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-12">Nuomininkas</p>
            <div className="border-t border-gray-400 pt-2">
              <p className="text-sm">{contract.client.name}</p>
              <p className="text-xs text-gray-500">Parašas, data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
