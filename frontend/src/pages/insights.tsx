import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import {
  ArrowUpIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  SearchIcon,
  LaptopIcon,
  BrainIcon,
  UserIcon,
  HandshakeIcon,
  BarChart3Icon,
  LineChartIcon,
  PieChartIcon,
  ActivityIcon,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/landing/footer";

interface FinancialData {
  month: string;
  revenue: number;
  profit: number;
}

interface PortfolioData {
  asset: string;
  value: number;
}

interface BusinessPerformanceData {
  metric: string;
  value: number;
}

interface InvestmentData {
  month: string;
  investments: number;
}

interface Insight {
  title: string;
  description: string;
  icon: React.ComponentType;
}

const financialData: FinancialData[] = [
  { month: "Jan", revenue: 1200000, profit: 250000 },
  { month: "Feb", revenue: 1400000, profit: 280000 },
  { month: "Mar", revenue: 1100000, profit: 230000 },
  { month: "Apr", revenue: 1600000, profit: 320000 },
  { month: "May", revenue: 1800000, profit: 350000 },
  { month: "Jun", revenue: 2000000, profit: 380000 },
  { month: "Jul", revenue: 2200000, profit: 400000 },
  { month: "Aug", revenue: 2100000, profit: 390000 },
  { month: "Sep", revenue: 1900000, profit: 360000 },
  { month: "Oct", revenue: 2300000, profit: 420000 },
  { month: "Nov", revenue: 2500000, profit: 450000 },
];

const portfolioData: PortfolioData[] = [
  { asset: "Stocks", value: 1200000 },
  { asset: "Bonds", value: 800000 },
  { asset: "Real Estate", value: 600000 },
  { asset: "Commodities", value: 400000 },
];

const businessPerformanceData: BusinessPerformanceData[] = [
  { metric: "Customer Growth", value: 15 },
  { metric: "Market Share", value: 25 },
  { metric: "Operational Efficiency", value: 10 },
  { metric: "Employee Satisfaction", value: 90 },
];

const investmentData: InvestmentData[] = [
  { month: "Jan", investments: 500000 },
  { month: "Feb", investments: 650000 },
  { month: "Mar", investments: 450000 },
  { month: "Apr", investments: 800000 },
  { month: "May", investments: 750000 },
  { month: "Jun", investments: 900000 },
  { month: "Jul", investments: 1000000 },
  { month: "Aug", investments: 950000 },
  { month: "Sep", investments: 850000 },
  { month: "Oct", investments: 1100000 },
  { month: "Nov", investments: 1200000 },
];

const keyInsights: Insight[] = [
  { title: "Revenue Growth", description: "108% increase in revenue", icon: BarChart3Icon },
  { title: "Profit Margin", description: "20% growth in profit margin", icon: LineChartIcon },
  { title: "Portfolio Value", description: "Stocks dominate portfolio", icon: PieChartIcon },
  { title: "Investment Trends", description: "AI startups lead investments", icon: ActivityIcon },
];

const emergingTrends: Insight[] = [
  { title: "Digital Transformation", description: "Expanding across industries", icon: LaptopIcon },
  { title: "AI & ML", description: "Rising demand for AI solutions", icon: BrainIcon },
  { title: "Sustainability", description: "Growing focus on ESG", icon: UserIcon },
  { title: "Global Expansion", description: "Increasing international presence", icon: HandshakeIcon },
];

export default function BusinessFinancePortfolioDisplay() {
  const [searchQuery, setSearchQuery] = useState("");
  const topAsset = portfolioData.reduce((prev, current) => (prev.value > current.value ? prev : current));
  const latestInvestments = investmentData[investmentData.length - 1].investments;

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center gap-6 mb-8 mt-10 pt-10">
        <h1 className="text-3xl font-bold text-center text-gray-800">Business, Finance & Portfolio Analytics</h1>
        <div className="w-full max-w-md relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 pr-4 py-2 w-full"
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {/* Top Asset Card */}
        <Card className="bg-yellow-100 shadow-lg rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-yellow-800">Top Asset</CardTitle>
            <div className="bg-yellow-300 rounded-full p-2">
              <BriefcaseIcon className="h-8 w-8 text-yellow-800" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-3xl font-bold text-yellow-900 z-10">{topAsset.asset}</div>
            <p className="text-sm text-yellow-700 mb-4 z-10">${topAsset.value.toLocaleString()} value</p>
            <div className="h-[200px] w-full z-20 relative bg-white p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={portfolioData}>
                  <XAxis dataKey="asset" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(40, 95%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Latest Investments Card */}
        <Card className="bg-green-100 shadow-lg rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-green-800">Latest Investments</CardTitle>
            <div className="bg-green-300 rounded-full p-2">
              <TrendingUpIcon className="h-8 w-8 text-green-800" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-3xl font-bold text-green-900 z-10">${latestInvestments.toLocaleString()}</div>
            <p className="text-sm text-green-700 mb-4 z-10">
              +${(latestInvestments - investmentData[investmentData.length - 2].investments).toLocaleString()} from last month
            </p>
            <div className="h-[200px] w-full z-20 relative bg-white p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={investmentData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="investments" stroke="hsl(120, 95%, 35%)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Business Performance Card */}
        <Card className="bg-pink-100 shadow-lg rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-pink-800">Business Performance</CardTitle>
            <div className="bg-pink-300 rounded-full p-2">
              <ArrowUpIcon className="h-8 w-8 text-pink-800" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-3xl font-bold text-pink-900 z-10">{businessPerformanceData[0].value}%</div>
            <p className="text-sm text-pink-700 mb-4 z-10">Customer Growth</p>
            <div className="h-[200px] w-full z-20 relative bg-white p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={businessPerformanceData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="metric" />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(330, 95%, 60%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
        {/* Financial Trends - Large Card with Chart and Table */}
        <Card className="md:col-span-3 row-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Financial Trends 2024</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-2/3">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={financialData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full lg:w-1/3 overflow-auto max-h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Profit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialData.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>${row.revenue.toLocaleString()}</TableCell>
                      <TableCell>${row.profit.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card className="md:col-span-3 lg:col-span-2 shadow-lg bg-blue-50 mb-4">
          <CardHeader>
            <CardTitle className="text-xl text-blue-900">Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {keyInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out"
                  >
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <insight.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium">{insight.title}</CardTitle>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                    </CardHeader>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>

        {/* Emerging Trends */}
        <Card className="md:col-span-3 lg:col-span-1 shadow-lg bg-purple-50 mb-4">
          <CardHeader>
            <CardTitle className="text-xl text-purple-900">Emerging Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="grid grid-cols-1 gap-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {emergingTrends.map((trend, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out"
                  >
                    <CardContent className="flex items-center space-x-4 py-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <trend.icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{trend.title}</h3>
                        <p className="text-sm text-gray-600">{trend.description}</p>
                      </div>
                    </CardContent>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
