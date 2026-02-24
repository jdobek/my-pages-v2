"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { ChartRiskRadial } from "@/components/chart-risk-radial"
import { ChartRiskScoreTrend } from "@/components/chart-risk-score-trend"
import { ChartHorizontalBar } from "@/components/chart-horizontal-bar"
import { ChartHorizontalBar2 } from "@/components/chart-horizontal-bar-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUser } from "@/lib/data"

export default function DashboardPage() {
  return (
    <div className="w-full">
      {/* Header with Sidebar toggle */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <SidebarTrigger />
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-slate-950">Dashboard</h1>
          </div>

          {/* Cards and Chart Section */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Total amount of vehicles card */}
            <Card>
              <CardHeader>
                <CardTitle>Total amount of vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="pt-[60px] text-[100px] font-normal leading-none">
                  {currentUser.totalVehicles}
                </p>
              </CardContent>
            </Card>

            {/* Risk Score Chart */}
            <ChartRiskRadial />
          </div>

          {/* Risk Score Trend - Full Width */}
          <div className="w-full">
            <ChartRiskScoreTrend />
          </div>

          {/* Horizontal Bar Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <ChartHorizontalBar />
            <ChartHorizontalBar2 />
          </div>
        </div>
      </div>
    </div>
  )
}
