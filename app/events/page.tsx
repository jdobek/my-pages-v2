"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

// Extended events data
const eventsData = [
  {
    day: "13",
    month: "APR",
    year: "2026",
    title: "April Recurring Invoice",
    description: "Monthly invoice for fleet insurance premium",
    action: "Pay now",
    actionType: "pay",
    category: "invoice",
    amount: "12 208,18 kr"
  },
  {
    day: "16",
    month: "APR",
    year: "2026",
    title: "Automatic Policy Renewal: GDA32100",
    description: "Policy for vehicle GDA32100 will be automatically renewed",
    action: null,
    actionType: null,
    category: "renewal",
    amount: null
  },
  {
    day: "19",
    month: "APR",
    year: "2026",
    title: "Automatic Policy Renewal: WA65400",
    description: "Policy for vehicle WA65400 will be automatically renewed",
    action: null,
    actionType: null,
    category: "renewal",
    amount: null
  },
  {
    day: "22",
    month: "APR",
    year: "2026",
    title: "Claim fair-10002 has been closed",
    description: "Motor glass replacement claim has been processed and closed",
    action: "View",
    actionType: "view",
    category: "claim",
    amount: "16 246,00 kr"
  },
  {
    day: "30",
    month: "APR",
    year: "2026",
    title: "Request fair-10001 has been closed",
    description: "Your request to add a vehicle has been processed",
    action: "View",
    actionType: "view",
    category: "request",
    amount: null
  },
  {
    day: "01",
    month: "MAY",
    year: "2026",
    title: "May Recurring Invoice",
    description: "Monthly invoice for fleet insurance premium",
    action: "Pay now",
    actionType: "pay",
    category: "invoice",
    amount: "12 208,18 kr"
  },
  {
    day: "15",
    month: "MAY",
    year: "2026",
    title: "Automatic Policy Renewal: KLM89012",
    description: "Policy for vehicle KLM89012 will be automatically renewed",
    action: null,
    actionType: null,
    category: "renewal",
    amount: null
  },
  {
    day: "20",
    month: "MAY",
    year: "2026",
    title: "Annual Fleet Review",
    description: "Scheduled annual review of your fleet insurance coverage",
    action: "Schedule",
    actionType: "view",
    category: "review",
    amount: null
  },
]

// Dates with events for calendar
const eventDates = [
  new Date(2026, 3, 13),
  new Date(2026, 3, 16),
  new Date(2026, 3, 19),
  new Date(2026, 3, 22),
  new Date(2026, 3, 30),
  new Date(2026, 4, 1),
  new Date(2026, 4, 15),
  new Date(2026, 4, 20),
]

function CategoryBadge({ category }: { category: string }) {
  const styles: Record<string, string> = {
    invoice: "bg-blue-100 text-blue-700",
    renewal: "bg-purple-100 text-purple-700",
    claim: "bg-amber-100 text-amber-700",
    request: "bg-slate-100 text-slate-700",
    review: "bg-teal-100 text-teal-700",
  }

  const labels: Record<string, string> = {
    invoice: "Invoice",
    renewal: "Renewal",
    claim: "Claim",
    request: "Request",
    review: "Review",
  }

  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", styles[category] || styles.request)}>
      {labels[category] || category}
    </span>
  )
}

export default function EventsPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 3, 10))
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 3, 1))
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const filteredEvents = activeFilter === "all"
    ? eventsData
    : eventsData.filter(event => event.category === activeFilter)

  return (
    <div className="w-full bg-[#F9F9FB] min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
        <div className="flex flex-col gap-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-[#71717A] hover:text-[#0A0A0A] transition-colors">Dashboard</a>
            <ChevronRight className="h-4 w-4 text-[#71717A]" />
            <span className="text-[#0A0A0A] font-medium">Upcoming Events</span>
          </nav>

          {/* Header with Back Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-lg border-[#E5E5E5] bg-white hover:bg-white"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-black font-semibold" style={{ fontSize: "40px", letterSpacing: "0" }}>
              Upcoming Events
            </h1>
          </div>

          <div className="grid grid-cols-[320px_1fr] gap-6">
            {/* Calendar Card */}
            <Card className="p-0 rounded-[10px] shadow-sm border border-[#E5E5E5] bg-white h-fit">
              <CardContent className="p-6">
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
                  className="w-full"
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

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-[#E5E5E5]">
                  <h4 className="text-sm font-semibold text-[#0A0A0A] mb-3">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <CategoryBadge category="invoice" />
                    <CategoryBadge category="renewal" />
                    <CategoryBadge category="claim" />
                    <CategoryBadge category="request" />
                    <CategoryBadge category="review" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Events List */}
            <Card className="p-0 rounded-[10px] shadow-sm border border-[#E5E5E5] bg-white">
              <CardContent className="p-6">
                {/* Filter Tabs */}
                <div className="flex gap-1 mb-6 bg-[#F4F4F5] p-1 rounded-lg w-fit">
                  {["all", "invoice", "renewal", "claim", "request"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={cn(
                        "px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize",
                        activeFilter === filter
                          ? "bg-white text-[#0A0A0A] shadow-sm"
                          : "text-[#71717A] hover:bg-white/50"
                      )}
                    >
                      {filter === "all" ? "All Events" : filter}
                    </button>
                  ))}
                </div>

                {/* Events Table */}
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E5E5E5]">
                      <th className="pb-3 text-left text-sm font-semibold text-[#0A0A0A]">Date</th>
                      <th className="pb-3 text-left text-sm font-semibold text-[#0A0A0A]">Event</th>
                      <th className="pb-3 text-left text-sm font-semibold text-[#0A0A0A]">Category</th>
                      <th className="pb-3 text-left text-sm font-semibold text-[#0A0A0A]">Amount</th>
                      <th className="pb-3 text-right text-sm font-semibold text-[#0A0A0A]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event, index) => (
                      <tr key={index} className="border-b border-[#E5E5E5] last:border-0">
                        <td className="py-4">
                          <div className="flex flex-col items-center justify-center min-w-[48px] h-12 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5] w-fit px-2">
                            <span className="text-base font-semibold text-[#1E293B] text-center leading-tight">{event.day}</span>
                            <span className="text-[10px] font-medium text-[#9CA3AF] uppercase text-center leading-tight">{event.month}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-[#0A0A0A]">{event.title}</span>
                            <span className="text-xs text-[#71717A]">{event.description}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <CategoryBadge category={event.category} />
                        </td>
                        <td className="py-4 text-sm text-[#0A0A0A]">
                          {event.amount || "-"}
                        </td>
                        <td className="py-4 text-right">
                          {event.action && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 text-sm font-medium border-slate-200 text-[#0F172A] bg-transparent hover:bg-transparent"
                            >
                              {event.action}
                            </Button>
                          )}
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
