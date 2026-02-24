"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { ChartRiskRadial } from "@/components/chart-risk-radial"
import { ChartRiskScoreTrend } from "@/components/chart-risk-score-trend"
import { ChartHorizontalBar } from "@/components/chart-horizontal-bar"
import { ChartHorizontalBar2 } from "@/components/chart-horizontal-bar-2"
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
            <div
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                padding: "24px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <p
                style={{
                  color: "#334155",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "16px",
                }}
              >
                Total amount of vehicles
              </p>
              <p
                style={{
                  color: "#0F172A",
                  fontSize: "100px",
                  fontWeight: "400",
                  paddingTop: "60px",
                }}
                className="font-sans"
              >
                {currentUser.totalVehicles}
              </p>
            </div>

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
