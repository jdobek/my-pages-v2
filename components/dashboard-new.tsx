"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import { currentUser } from "@/lib/data"
import { cn } from "@/lib/utils"

// Mock data for the dashboard
const dashboardData = {
  riskScore: 8,
  riskScoreChange: "+1 this month",
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
    { label: "Ansvar", value: 99 },
    { label: "Kasko", value: 210 },
    { label: "Delkasko", value: 120 },
  ],
  addOns: [
    { label: "Rental car", value: 180 },
    { label: "Tools", value: 150 },
    { label: "Maskinskade", value: 95 },
  ],
  age: [
    { label: "1-2 years", value: 85 },
    { label: "3-4 years", value: 165 },
    { label: "5+ years", value: 130 },
  ],
  profiles: [
    { label: "Standard", value: 220 },
    { label: "Premium", value: 145 },
    { label: "Basic", value: 75 },
  ],
}

// Y-axis values for the chart
const yAxisValues = [400, 300, 200, 100, 0]

// Legend items
const legendItems = [
  { label: "Item 1", color: "#034F54" },
  { label: "Item 2", color: "#22C55E" },
  { label: "Item 3", color: "#F59E0B" },
  { label: "Item 4", color: "#3B82F6" },
  { label: "Item 5", color: "#8B5CF6" },
]

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
  const [activeFleetTab, setActiveFleetTab] = useState<"coverLevel" | "addOns" | "age" | "profiles">("coverLevel")

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
            <div className="flex flex-col gap-1.5 flex-1">
              <span className="text-sm font-semibold text-[#727272]">Risk score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-[#0F172A]" style={{ letterSpacing: "-0.18px" }}>{dashboardData.riskScore}</span>
                <span className="text-base font-semibold text-[#B7B7B7]">/10</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#DCF0F0] px-2 py-0.5 text-xs font-semibold text-[#034F54]">
                  {dashboardData.riskScoreChange}
                  <TrendingUp className="h-3 w-3" />
                </span>
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
                <div className="p-6 w-[280px] flex-shrink-0">
                  <h3 className="text-xl font-semibold text-[#0A0A0A] mb-4" style={{ letterSpacing: "-0.4px" }}>Upcoming Events</h3>
                  <div className="flex items-center justify-between mb-2">
                    <button onClick={handlePreviousMonth} className="p-1 hover:bg-slate-100 rounded">
                      <ChevronLeft className="h-4 w-4 text-slate-600" />
                    </button>
                    <span className="text-sm font-medium text-slate-900">
                      {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                    <button onClick={handleNextMonth} className="p-1 hover:bg-slate-100 rounded">
                      <ChevronRight className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    className="w-full"
                    modifiers={{
                      event: eventDates,
                    }}
                    modifiersClassNames={{
                      event: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-[#005055]",
                    }}
                    classNames={{
                      nav: "hidden",
                      month_caption: "hidden",
                    }}
                  />
                </div>

                {/* Vertical Divider */}
                <div className="w-px bg-[#E5E5E5] self-stretch" />

                {/* Right: Tasks */}
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold text-[#0A0A0A] mb-4" style={{ letterSpacing: "-0.4px" }}>Task</h3>
                  <div className="space-y-0">
                    {tasksData.map((task, index) => (
                      <div key={index} className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
                        <div className="flex flex-col items-center justify-center min-w-[48px] h-12 bg-[#F4F4F5] rounded-lg">
                          <span className="text-sm font-normal text-[#0A0A0A] text-center">{task.day}</span>
                          <span className="text-xs text-[#71717A] uppercase text-center">{task.month}</span>
                        </div>
                        <div className="flex-1 text-sm text-[#3F3F46]">{task.title}</div>
                        {task.action && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-3 text-sm font-medium border-slate-200 text-[#0F172A]"
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
            <Card className="p-0 rounded-[10px] shadow-sm border border-[#E5E5E5] bg-white h-full">
              <CardContent className="p-6 flex flex-col h-full">
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
                  <button
                    onClick={() => setActiveFleetTab("profiles")}
                    className={cn(
                      "flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                      activeFleetTab === "profiles"
                        ? "bg-white text-[#0A0A0A] shadow-sm"
                        : "text-[#71717A] hover:bg-white/50"
                    )}
                  >
                    Profiles
                  </button>
                </div>

                {/* Bar Chart with Y-Axis */}
                <div className="flex-1 flex gap-3">
                  {/* Y-Axis */}
                  <div className="flex flex-col justify-between h-[210px] pr-2">
                    {yAxisValues.map((value) => (
                      <span key={value} className="text-xs text-[#71717A] text-right">{value}</span>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="flex-1 relative">
                    {/* Horizontal grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between h-[210px]">
                      {yAxisValues.map((_, i) => (
                        <div key={i} className="border-t border-[#E5E5E5]" />
                      ))}
                    </div>

                    {/* Bars */}
                    <div className="flex items-end justify-around h-[210px] relative z-10">
                      {fleetData.map((item, index) => {
                        const barHeight = (item.value / 400) * 210
                        return (
                          <div key={index} className="flex flex-col items-center">
                            <span className="text-xs text-[#71717A] mb-1">{item.value}</span>
                            <div
                              className="w-[70px] bg-[#034F54] rounded-t-md"
                              style={{ height: `${barHeight}px` }}
                            />
                          </div>
                        )
                      })}
                    </div>

                    {/* X-Axis Labels */}
                    <div className="flex justify-around mt-2">
                      {fleetData.map((item, index) => (
                        <span key={index} className="text-xs text-[#71717A] text-center w-[70px]">{item.label}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-[#E5E5E5]">
                  {legendItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-[#71717A]">{item.label}</span>
                    </div>
                  ))}
                </div>
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
                  <p className="text-sm text-[#71717A] mt-1">January - June 2024</p>
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
                {/* Footer */}
                <p className="text-sm text-[#727272] mt-4 pt-4 border-t border-[#E5E5E5]">
                  Showing total visitors for the last 6 months
                </p>
              </CardContent>
            </Card>

            {/* Claims Table */}
            <Card className="p-0 rounded-[10px] shadow-sm border border-[#E5E5E5] bg-white">
              <CardContent className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#0A0A0A]" style={{ letterSpacing: "-0.4px" }}>Claims</h3>
                  <p className="text-sm text-[#71717A] mt-1">January - June 2024</p>
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
                {/* Footer */}
                <p className="text-sm text-[#727272] mt-4 pt-4 border-t border-[#E5E5E5]">
                  Showing total visitors for the last 6 months
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
