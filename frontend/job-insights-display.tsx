import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
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
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

const trendData = [
  { month: "Jan", applications: 1200, hires: 250 },
  { month: "Feb", applications: 1400, hires: 280 },
  { month: "Mar", applications: 1100, hires: 230 },
  { month: "Apr", applications: 1600, hires: 320 },
  { month: "May", applications: 1800, hires: 350 },
  { month: "Jun", applications: 2000, hires: 380 },
  { month: "Jul", applications: 2200, hires: 400 },
  { month: "Aug", applications: 2100, hires: 390 },
  { month: "Sep", applications: 1900, hires: 360 },
  { month: "Oct", applications: 2300, hires: 420 },
  { month: "Nov", applications: 2500, hires: 450 },
]

const topJobsData = [
  { role: "Software Engineer", count: 1200 },
  { role: "Data Scientist", count: 800 },
  { role: "Product Manager", count: 600 },
  { role: "UX Designer", count: 400 },
]

const salaryData = [
  { role: "AI Engineer", salary: 150000 },
  { role: "DevOps", salary: 140000 },
  { role: "Full Stack", salary: 130000 },
  { role: "Mobile Dev", salary: 125000 },
]

const closedJobsData = [
  { month: "Jan", closed: 50 },
  { month: "Feb", closed: 65 },
  { month: "Mar", closed: 45 },
  { month: "Apr", closed: 80 },
  { month: "May", closed: 75 },
  { month: "Jun", closed: 90 },
  { month: "Jul", closed: 100 },
  { month: "Aug", closed: 95 },
  { month: "Sep", closed: 85 },
  { month: "Oct", closed: 110 },
  { month: "Nov", closed: 120 },
]

export default function JobInsightsDisplay() {
  const [searchQuery, setSearchQuery] = useState("")
  const topJob = topJobsData.reduce((prev, current) => (prev.count > current.count ? prev : current))
  const bestPaidJob = salaryData.reduce((prev, current) => (prev.salary > current.salary ? prev : current))
  const latestClosedJobs = closedJobsData[closedJobsData.length - 1].closed

  const keyInsights = [
    { title: "Growth Rate", description: "108% increase in applications", icon: BarChart3Icon },
    { title: "Hiring Velocity", description: "80% growth in hiring rate", icon: LineChartIcon },
    { title: "Market Leader", description: "Software Engineering dominates", icon: PieChartIcon },
    { title: "Salary Trends", description: "AI roles lead compensation", icon: ActivityIcon },
  ]

  const emergingTrends = [
    { title: "Remote Work", description: "Expanding across industries", icon: LaptopIcon },
    { title: "AI & ML", description: "Rising demand for specialists", icon: BrainIcon },
    { title: "Soft Skills", description: "Growing importance", icon: UserIcon },
    { title: "Freelancing", description: "Increasing opportunities", icon: HandshakeIcon },
  ]

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center gap-6 mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Job Market Analytics</h1>
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
        {/* Top Job Card */}
        <Card className="bg-yellow-100 shadow-lg rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-yellow-800">Top Job</CardTitle>
            <div className="bg-yellow-300 rounded-full p-2">
              <BriefcaseIcon className="h-8 w-8 text-yellow-800" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-3xl font-bold text-yellow-900 z-10">{topJob.role}</div>
            <p className="text-sm text-yellow-700 mb-4 z-10">{topJob.count} openings</p>
            <div className="h-[200px] w-full z-20 relative bg-white p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topJobsData}>
                  <XAxis dataKey="role" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(40, 95%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Best Paid Role Card */}
        <Card className="bg-green-100 shadow-lg rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-green-800">Best Paid Role</CardTitle>
            <div className="bg-green-300 rounded-full p-2">
              <TrendingUpIcon className="h-8 w-8 text-green-800" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-3xl font-bold text-green-900 z-10">{bestPaidJob.role}</div>
            <p className="text-sm text-green-700 mb-4 z-10">${bestPaidJob.salary.toLocaleString()} per year</p>
            <div className="h-[200px] w-full z-20 relative bg-white p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="role" />
                  <Tooltip />
                  <Bar dataKey="salary" fill="hsl(120, 95%, 35%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Closed Positions Card */}
        <Card className="bg-pink-100 shadow-lg rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-pink-800">Closed Positions</CardTitle>
            <div className="bg-pink-300 rounded-full p-2">
              <ArrowUpIcon className="h-8 w-8 text-pink-800" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-3xl font-bold text-pink-900 z-10">{latestClosedJobs}</div>
            <p className="text-sm text-pink-700 mb-4 z-10">
              +{latestClosedJobs - closedJobsData[closedJobsData.length - 2].closed} from last month
            </p>
            <div className="h-[200px] w-full z-20 relative bg-white p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={closedJobsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="closed" stroke="hsl(330, 95%, 60%)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
        {/* Trends - Large Card with Chart and Table */}
        <Card className="md:col-span-3 row-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Hiring Trends 2024</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-2/3">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="hires"
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
                    <TableHead>Applications</TableHead>
                    <TableHead>Hires</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trendData.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.applications}</TableCell>
                      <TableCell>{row.hires}</TableCell>
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
    </div>
  )
}

