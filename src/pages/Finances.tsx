import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Car,
  FileText
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const monthlyRevenue = [
  { month: "Sau", income: 4200, expenses: 1800 },
  { month: "Vas", income: 3800, expenses: 1600 },
  { month: "Kov", income: 5100, expenses: 2100 },
  { month: "Bal", income: 4800, expenses: 1900 },
  { month: "Geg", income: 5600, expenses: 2200 },
  { month: "Bir", income: 6200, expenses: 2400 },
  { month: "Lie", income: 7100, expenses: 2600 },
  { month: "Rgp", income: 6800, expenses: 2500 },
  { month: "Rgs", income: 5900, expenses: 2300 },
  { month: "Spa", income: 5200, expenses: 2000 },
  { month: "Lap", income: 4900, expenses: 1900 },
  { month: "Grd", income: 5500, expenses: 2100 },
];

const expenseCategories = [
  { name: "Kuras", value: 35, color: "hsl(var(--primary))" },
  { name: "Draudimas", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Servisas", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Mokesčiai", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Kita", value: 8, color: "hsl(var(--chart-5))" },
];

const recentTransactions = [
  { id: 1, type: "income", description: "Sutartis #1247 - BMW X5", amount: 850, date: "2024-01-15", car: "ABC 123" },
  { id: 2, type: "expense", description: "Kuro papildymas - Mercedes", amount: -120, date: "2024-01-14", car: "XYZ 789" },
  { id: 3, type: "income", description: "Sutartis #1246 - Audi A6", amount: 620, date: "2024-01-13", car: "DEF 456" },
  { id: 4, type: "expense", description: "Techninė apžiūra - VW Golf", amount: -85, date: "2024-01-12", car: "GHI 321" },
  { id: 5, type: "income", description: "Sutartis #1245 - Toyota RAV4", amount: 480, date: "2024-01-11", car: "JKL 654" },
  { id: 6, type: "expense", description: "Draudimo mokestis", amount: -350, date: "2024-01-10", car: "-" },
];

const topCars = [
  { name: "BMW X5", revenue: 4200, contracts: 12 },
  { name: "Mercedes E-Class", revenue: 3800, contracts: 10 },
  { name: "Audi A6", revenue: 3200, contracts: 9 },
  { name: "Toyota RAV4", revenue: 2800, contracts: 11 },
  { name: "VW Golf", revenue: 2100, contracts: 14 },
];

const chartConfig = {
  income: {
    label: "Pajamos",
    color: "hsl(var(--primary))",
  },
  expenses: {
    label: "Išlaidos",
    color: "hsl(var(--destructive))",
  },
};

export default function Finances() {
  const totalIncome = monthlyRevenue.reduce((sum, m) => sum + m.income, 0);
  const totalExpenses = monthlyRevenue.reduce((sum, m) => sum + m.expenses, 0);
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Finansai
          </h1>
          <p className="text-muted-foreground mt-1">
            Pajamų ir išlaidų apžvalga
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="2024">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Metai" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Eksportuoti
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Bendros pajamos"
          value={`€${totalIncome.toLocaleString()}`}
          icon={TrendingUp}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Bendros išlaidos"
          value={`€${totalExpenses.toLocaleString()}`}
          icon={TrendingDown}
          trend={{ value: 8.2, isPositive: false }}
        />
        <StatCard
          title="Grynasis pelnas"
          value={`€${netProfit.toLocaleString()}`}
          icon={Wallet}
          trend={{ value: 15.3, isPositive: true }}
        />
        <StatCard
          title="Pelno marža"
          value={`${profitMargin}%`}
          icon={DollarSign}
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 p-6 border-border/50 bg-gradient-to-br from-card to-card/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg">Pajamos vs Išlaidos</h3>
              <p className="text-sm text-muted-foreground">Mėnesinė apžvalga</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Pajamos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Išlaidos</span>
              </div>
            </div>
          </div>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => `€${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="income"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#incomeGradient)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                fill="url(#expensesGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </Card>

        {/* Expense Categories */}
        <Card className="p-6 border-border/50 bg-gradient-to-br from-card to-card/50">
          <div className="mb-6">
            <h3 className="font-semibold text-lg">Išlaidų kategorijos</h3>
            <p className="text-sm text-muted-foreground">Pasiskirstymas pagal tipą</p>
          </div>
          <div className="h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {expenseCategories.map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-muted-foreground">{cat.name}</span>
                </div>
                <span className="font-medium">{cat.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="p-6 border-border/50 bg-gradient-to-br from-card to-card/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg">Paskutinės operacijos</h3>
              <p className="text-sm text-muted-foreground">Naujausi įrašai</p>
            </div>
            <Button variant="ghost" size="sm">
              Visos
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div 
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    tx.type === 'income' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {tx.type === 'income' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  tx.type === 'income' ? 'text-success' : 'text-destructive'
                }`}>
                  {tx.type === 'income' ? '+' : ''}€{Math.abs(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Performing Cars */}
        <Card className="p-6 border-border/50 bg-gradient-to-br from-card to-card/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg">Pelningiausi automobiliai</h3>
              <p className="text-sm text-muted-foreground">Pagal pajamas</p>
            </div>
            <Button variant="ghost" size="sm">
              Visi
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-4">
            {topCars.map((car, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{car.name}</p>
                      <p className="text-xs text-muted-foreground">{car.contracts} sutartys</p>
                    </div>
                  </div>
                  <span className="font-semibold text-success">€{car.revenue.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all"
                    style={{ width: `${(car.revenue / topCars[0].revenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
