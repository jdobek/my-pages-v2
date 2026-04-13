"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { currentUser } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Label, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

// Mock data for the dashboard
const dashboardData = {
  riskScore: 3,
  totalVehicles: currentUser.totalVehicles,
  totalPremium: "146 498,13 kr",
  averagePremium: "6 104,08 kr",
}

// Tasks data
const tasksData = [
  { day: "13", month: "APR", title: "April Recurring Invoice", action: "Pay now", actionType: "pay" },
  { day: "16", month: "APR", title: "Automatic Policy Renewal: GDA32100", action: null, actionType: null },
  { day: "19", month: "APR", title: "Automatic Policy Renewal: WA65400", action: null, actionType: null },
  { day: "22", month: "APR", title: "Claim fair-10002 has been closed", action: "View", actionType: "view" },
  { day: "30", month: "APR", title: "Request fair-10001 has benn closed", action: "View", actionType: "view" },
  { day: "01", month: "MAY", title: "May Recurring Invoice", action: "Pay now", actionType: "pay" },
]

// Submitted requests data
const submittedRequestsData = [
  { requestNo: "fair-10001", vehicle: "MDF01M", requestType: "Add car", status: "Pending" },
  { requestNo: "fair-10001", vehicle: "MDF01M", requestType: "Remove car", status: "Closed" },
  { requestNo: "fair-10001", vehicle: "MDF01M", requestType: "Change cover level", status: "Pending" },
  { requestNo: "fair-10001", vehicle: "MDF01M", requestType: "Adjust add-ons", status: "Closed" },
  { requestNo: "fair-10001", vehicle: "MDF01M", requestType: "Add car", status: "Closed" },
]

// Claims data
const claimsData = [
  { caseNo: "fair-10001", vehicle: "MDF01M", claimType: "Motor Glass Replacement", totalCost: "16246,00 kr", status: "Pending" },
  { caseNo: "fair-10001", vehicle: "MDF01M", claimType: "Motor Glass Replacement", totalCost: "16246,00 kr", status: "Closed" },
  { caseNo: "fair-10001", vehicle: "MDF01M", claimType: "Motor Glass Replacement", totalCost: "16246,00 kr", status: "Pending" },
  { caseNo: "fair-10001", vehicle: "MDF01M", claimType: "Motor Glass Replacement", totalCost: "16246,00 kr", status: "Closed" },
  { caseNo: "fair-10001", vehicle: "MDF01M", claimType: "Motor Glass Replacement", totalCost: "16246,00 kr", status: "Closed" },
]

// Fleet overview data for bar chart
const fleetOverviewData = {
  coverLevel: [
    { label: "Ansvar", value: 6 },
    { label: "Kasko", value: 10 },
    { label: "Delkasko", value: 8 },
  ],
  addOns: [
    { label: "Rental car", value: 14 },
    { label: "Tools", value: 12 },
    { label: "Maskinskade", value: 10 },
  ],
  age: [
    { label: "1-2 years", value: 5 },
    { label: "3-4 years", value: 11 },
    { label: "5+ years", value: 8 },
  ],
}

// Y-axis values for the chart
const yAxisValues = [20, 15, 10, 5, 0]

// Calculate age distribution from vehicles
const ageDistribution = currentUser.vehicles.reduce((acc, vehicle) => {
  if (vehicle.age <= 2) {
    acc["1-2 years"] = (acc["1-2 years"] || 0) + 1
  } else if (vehicle.age <= 4) {
    acc["3-4 years"] = (acc["3-4 years"] || 0) + 1
  } else {
    acc["5+ years"] = (acc["5+ years"] || 0) + 1
  }
  return acc
}, {} as Record<string, number>)

// Age pie chart data
const agePieData = [
  { name: "1-2 yo", value: ageDistribution["1-2 years"] || 0, fill: "#034F54" },
  { name: "3-4 yo", value: ageDistribution["3-4 years"] || 0, fill: "#22C55E" },
  { name: "5+ yo", value: ageDistribution["5+ years"] || 0, fill: "#F59E0B" },
]

// Chart config for age pie chart
const ageChartConfig = {
  value: {
    label: "Vehicles",
  },
  "1-2 yo": {
    label: "1-2 yo",
    color: "#034F54",
  },
  "3-4 yo": {
    label: "3-4 yo",
    color: "#22C55E",
  },
  "5+ yo": {
    label: "5+ yo",
    color: "#F59E0B",
  },
} satisfies ChartConfig


// Dates with events for calendar
const eventDates = [
  new Date(2026, 3, 13),
  new Date(2026, 3, 16),
  new Date(2026, 3, 19),
  new Date(2026, 3, 22),
  new Date(2026, 3, 30),
  new Date(2026, 4, 1),
]

function StatusBadge({ status }: { status: string }) {
  const isPending = status === "Pending"
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        isPending
          ? "bg-slate-100 text-slate-700"
          : "bg-[#E6F4F4] text-[#034F54]"
      )}
    >
      {status}
    </span>
  )
}

interface DashboardNewProps {
  onSubmitRequest?: () => void
}

export function DashboardNew({ onSubmitRequest }: DashboardNewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 3, 10))
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 3, 1))
  const [activeFleetTab, setActiveFleetTab] = useState<"coverLevel" | "addOns" | "age">("coverLevel")

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const fleetData = fleetOverviewData[activeFleetTab]

  return (
    <div className="w-full bg-[#F9F9FB] min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-black font-semibold" style={{ fontSize: "40px", letterSpacing: "0" }}>
              Dashboard
            </h1>
            <Button
              className="bg-[#005055] hover:bg-[#003c3f] text-white px-5 py-2 h-10"
              onClick={onSubmitRequest}
            >
              Submit a request
            </Button>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-6 bg-white rounded-lg border border-[#E3E8F0] p-4">
            {/* Risk Score */}
            <div className="group flex flex-col gap-1.5 flex-1 -m-3 p-3 rounded-lg hover:bg-[#F5F5F5] cursor-pointer transition-colors">
              <span className="text-sm font-semibold text-[#727272]">Risk score</span>
              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-[#0F172A]" style={{ letterSpacing: "-0.18px" }}>{dashboardData.riskScore}</span>
                  <span className="text-base font-semibold text-[#B7B7B7]">/10</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium text-[#005055]">Check analytics</span>
                  <ChevronRight className="h-4 w-4 text-[#005055]" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-[54px] bg-[#E3E8F0]" />

            {/* Total Vehicles */}
            <div className="flex flex-col gap-1.5 flex-1">
              <span className="text-sm font-semibold text-[#727272]">Total vehicles</span>
              <span className="text-2xl font-semibold text-[#0F172A]" style={{ letterSpacing: "-0.18px" }}>{dashboardData.totalVehicles}</span>
            </div>

            {/* Divider */}
            <div className="w-px h-[54px] bg-[#E3E8F0]" />

            {/* Total Premium */}
            <div className="flex flex-col gap-1.5 flex-1">
              <span className="text-sm font-semibold text-[#727272]">Total premium</span>
              <span className="text-2xl font-semibold text-[#0F172A]" style={{ letterSpacing: "-0.18px" }}>{dashboardData.totalPremium}</span>
            </div>

            {/* Divider */}
            <div className="w-px h-[54px] bg-[#E3E8F0]" />

            {/* Average Premium */}
            <div className="flex flex-col gap-1.5 flex-1">
              <span className="text-sm font-semibold text-[#727272]">Average premium</span>
              <span className="text-2xl font-semibold text-[#0F172A]" style={{ letterSpacing: "-0.18px" }}>{dashboardData.averagePremium}</span>
            </div>
          </div>

          {/* Middle Section - Calendar+Tasks, Fleet Overview */}
          <div className="grid grid-cols-[2fr_1fr] gap-6">
            {/* Combined Upcoming Events + Tasks Card */}
            <Card className="p-0 rounded-[10px] shadow-sm border border-[#E5E5E5] bg-white overflow-hidden">
              <div className="flex h-full">
                {/* Left: Upcoming Events - Calendar */}
                <div className="p-6 w-[280px] flex-shrink-0 flex flex-col">
                  <h3 className="text-xl font-semibold text-[#0A0A0A] mb-9" style={{ letterSpacing: "-0.4px" }}>Upcoming Events</h3>
                  <div className="flex items-center justify-between mb-3">
                    <button onClick={handlePreviousMonth} className="p-1 hover:bg-slate-100 rounded border border-[#E5E5E5]">
                      <ChevronLeft className="h-4 w-4 text-slate-600" />
                    </button>
                    <span className="text-sm font-medium text-slate-900">
                      {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                    <button onClick={handleNextMonth} className="p-1 hover:bg-slate-100 rounded border border-[#E5E5E5]">
                      <ChevronRight className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    className="w-full -ml-2"
                    modifiers={{
                      event: eventDates,
                    }}
                    modifiersClassNames={{
                      event: "relative after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-[#005055]",
                    }}
                    classNames={{
                      nav: "hidden",
                      month_caption: "hidden",
                      week: "mt-1 flex w-full",
                      outside: "text-[#D4D4D4] opacity-50",
                    }}
                  />
                  <Button
                    variant="outline"
                    className="w-full mt-auto border-[#E5E5E5] text-[#0A0A0A] bg-transparent hover:bg-transparent"
                  >
                    View all
                  </Button>
                </div>

                {/* Vertical Divider */}
                <div className="w-px bg-[#E5E5E5] self-stretch" />

                {/* Right: Tasks */}
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold text-[#0A0A0A] mb-4" style={{ letterSpacing: "-0.4px" }}>Task</h3>
                  <div className="space-y-0">
                    {tasksData.map((task, index) => (
                      <div key={index} className="flex items-center gap-4 py-2 border-b border-slate-100 last:border-0">
                        <div className="flex flex-col items-center justify-center min-w-[48px] h-12 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5]">
                          <span className="text-base font-semibold text-[#1E293B] text-center leading-tight">{task.day}</span>
                          <span className="text-[10px] font-medium text-[#9CA3AF] uppercase text-center leading-tight">{task.month}</span>
                        </div>
                        <div className="flex-1 text-sm font-medium text-[#0A0A0A]">{task.title}</div>
                        {task.action && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-3 text-sm font-medium border-slate-200 text-[#0F172A] bg-transparent hover:bg-transparent"
                          >
                            {task.action}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Fleet Overview */}
            <Card className="p-0 rounded-[10px] shadow-sm border border-[#E5E5E5] bg-white h-full min-w-0 overflow-hidden">
              <CardContent className="p-6 flex flex-col h-full min-w-0">
                <h3 className="text-xl font-semibold text-[#0A0A0A] mb-4" style={{ letterSpacing: "-0.4px" }}>Fleet overview</h3>
                {/* Tabs */}
                <div className="flex gap-1 mb-6 bg-[#F4F4F5] p-1 rounded-lg">
                  <button
                    onClick={() => setActiveFleetTab("coverLevel")}
                    className={cn(
                      "flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                      activeFleetTab === "coverLevel"
                        ? "bg-white text-[#0A0A0A] shadow-sm"
                        : "text-[#71717A] hover:bg-white/50"
                    )}
                  >
                    Cover level
                  </button>
                  <button
                    onClick={() => setActiveFleetTab("addOns")}
                    className={cn(
                      "flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                      activeFleetTab === "addOns"
                        ? "bg-white text-[#0A0A0A] shadow-sm"
                        : "text-[#71717A] hover:bg-white/50"
                    )}
                  >
                    Add-ons
                  </button>
                  <button
                    onClick={() => setActiveFleetTab("age")}
                    className={cn(
                      "flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                      activeFleetTab === "age"
                        ? "bg-white text-[#0A0A0A] shadow-sm"
                        : "text-[#71717A] hover:bg-white/50"
                    )}
                  >
                    Age
                  </button>
                </div>

                {/* Chart Area - Fixed height to prevent jumping */}
                <div className="h-[280px] w-full min-w-0">
                {activeFleetTab === "age" ? (
                  /* Age Donut Chart - Same structure as bar chart */
                  <div className="flex gap-3 h-full w-full pt-4">

                    {/* Chart Area */}
                    <div className="flex-1 flex flex-col items-start h-full min-w-0">
                      <div className="flex items-center justify-center w-full">
                        <ChartContainer
                          config={ageChartConfig}
                          className="aspect-square h-[200px]"
                        >
                        <PieChart>
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Pie
                            data={agePieData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={55}
                            outerRadius={85}
                            strokeWidth={2}
                            stroke="#fff"
                          >
                            <Label
                              content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                  const totalVehicles = agePieData.reduce((sum, entry) => sum + entry.value, 0)
                                  return (
                                    <text
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      textAnchor="middle"
                                      dominantBaseline="middle"
                                    >
                                      <tspan
                                        x={viewBox.cx}
                                        y={(viewBox.cy || 0) - 4}
                                        className="fill-foreground text-2xl font-bold"
                                      >
                                        {totalVehicles}
                                      </tspan>
                                      <tspan
                                        x={viewBox.cx}
                                        y={(viewBox.cy || 0) + 16}
                                        className="fill-muted-foreground text-xs"
                                      >
                                        Vehicles
                                      </tspan>
                                    </text>
                                  )
                                }
                              }}
                            />
                          </Pie>
                        </PieChart>
                        </ChartContainer>
                      </div>
                      {/* Legend - horizontal below chart */}
                      <div className="flex items-center justify-center w-full mt-8">
                        {agePieData.map((item, index) => (
                          <div key={index} className="flex items-left">
                            <div className={`flex items-center gap-2 whitespace-nowrap ${index === 0 ? 'pr-4' : 'px-4'}`}>
                              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                              <span className="text-sm text-[#71717A]">{item.name}</span>
                              <span className="text-sm font-semibold text-[#0A0A0A]">{item.value}</span>
                            </div>
                            {index < agePieData.length - 1 && (
                              <div className="w-px h-4 bg-[#E5E5E5]" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Bar Chart with Y-Axis */
                  <div className="flex gap-3 h-full w-full">
                    {/* Y-Axis */}
                    <div className="flex flex-col justify-between h-[200px] w-[30px] shrink-0 mt-6">
                      {yAxisValues.map((value) => (
                        <span key={value} className="text-xs text-[#71717A] text-right leading-none -translate-y-[3px]">{value}</span>
                      ))}
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 flex flex-col min-w-0">
                      <style>{`
                        @keyframes barGrow {
                          from { transform: scaleY(0); }
                          to { transform: scaleY(1); }
                        }
                        @keyframes fadeIn {
                          from { opacity: 0; }
                          to { opacity: 1; }
                        }
                      `}</style>
                      {/* Chart with grid lines and bars */}
                      <div className="relative h-[200px] mt-6">
                        {/* Horizontal grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                          {yAxisValues.map((_, i) => (
                            <div key={i} className="border-t border-[#E5E5E5]" />
                          ))}
                        </div>

                        {/* Bars */}
                        <div className="absolute inset-0 flex items-end justify-center gap-4">
                          {fleetData.map((item, index) => {
                            const barHeight = (item.value / 20) * 200
                            return (
                              <div key={`${activeFleetTab}-${index}`} className="flex flex-col items-center">
                                <span
                                  className="text-xs font-semibold text-[#0A0A0A] mb-1"
                                  style={{
                                    opacity: 0,
                                    animation: `fadeIn 0.3s ease-out ${600 + index * 150}ms forwards`,
                                  }}
                                >
                                  {item.value}
                                </span>
                                <div
                                  className="w-[80px] bg-[#034F54] rounded-t-md origin-bottom"
                                  style={{
                                    height: `${barHeight}px`,
                                    animation: `barGrow 0.6s ease-out ${index * 150}ms forwards`,
                                    transform: 'scaleY(0)',
                                  }}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* X-Axis Labels */}
                      <div className="flex justify-center gap-4 mt-2">
                        {fleetData.map((item, index) => (
                          <span key={`${activeFleetTab}-label-${index}`} className="text-xs text-[#71717A] text-center w-[80px]">{item.label}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                </div>

                {/* Chart Summary */}
                <p className="text-sm text-[#71717A] mt-4">
                  Distribution of {dashboardData.totalVehicles} vehicles across your fleet based on {activeFleetTab === "coverLevel" ? "coverage level" : activeFleetTab === "addOns" ? "add-on options" : "vehicle age"}.
                </p>

              </CardContent>
            </Card>
          </div>

          {/* Bottom Section - Tables */}
          <div className="grid grid-cols-2 gap-7">
            {/* Submitted Requests Table */}
            <Card className="p-0 rounded-[10px] shadow-sm border border-[#E5E5E5] bg-white">
              <CardContent className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#0A0A0A]" style={{ letterSpacing: "-0.4px" }}>Submited requests</h3>
                </div>
                {/* Table */}
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E5E5E5]">
                      <th className="pb-3 text-left text-sm font-semibold text-[#0A0A0A]">Request no.</th>
                      <th className="pb-3 text-left text-sm font-semibold text-[#0A0A0A]">Vehicle</th>
                      <th className="pb-3 text-left text-sm font-semibold text-[#0A0A0A]">Request Type</th>
                      <th className="pb-3 text-right text-sm font-semibold text-[#0A0A0A]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submittedRequestsData.map((request, index) => (
                      <tr key={index} className="border-b border-[#E5E5E5] last:border-0">
                        <td className="py-3 text-sm text-[#0A0A0A]">{request.requestNo}</td>
                        <td className="py-3 text-sm text-[#0A0A0A]">{request.vehicle}</td>
                        <td className="py-3 text-sm text-[#0A0A0A]">{request.requestType}</td>
                        <td className="py-3 text-right">
                          <StatusBadge status={request.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Claims Table */}
            <Card className="p-0 rounded-[10px] shadow-sm border border-[#E5E5E5] bg-white">
              <CardContent className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#0A0A0A]" style={{ letterSpacing: "-0.4px" }}>Claims</h3>
                </div>
                {/* Table */}
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E5E5E5]">
                      <th className="pb-3 text-left text-sm font-semibold text-[#0A0A0A]">Case no.</th>
                      <th className="pb-3 text-left text-sm font-semibold text-[#0A0A0A]">Vehicle</th>
                      <th className="pb-3 text-left text-sm font-semibold text-[#0A0A0A]">Claim Type</th>
                      <th className="pb-3 text-left text-sm font-semibold text-[#0A0A0A]">Total Cost</th>
                      <th className="pb-3 text-right text-sm font-semibold text-[#0A0A0A]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claimsData.map((claim, index) => (
                      <tr key={index} className="border-b border-[#E5E5E5] last:border-0">
                        <td className="py-3 text-sm text-[#0A0A0A]">{claim.caseNo}</td>
                        <td className="py-3 text-sm text-[#0A0A0A]">{claim.vehicle}</td>
                        <td className="py-3 text-sm text-[#0A0A0A]">{claim.claimType}</td>
                        <td className="py-3 text-sm text-[#0A0A0A]">{claim.totalCost}</td>
                        <td className="py-3 text-right">
                          <StatusBadge status={claim.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
