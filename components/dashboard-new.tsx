"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, ShieldAlert, FileText, AlertTriangle, CreditCard, CalendarClock, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import { currentUser } from "@/lib/data"

// Dynamic vehicle count from policies data
const totalVehicles = currentUser.vehicles.length
const activeVehicles = totalVehicles - 2 // Assuming 2 inactive for demo
const inactiveVehicles = 2

// Mock data for the dashboard
const dashboardData = {
  totalVehicles,
  vehiclesTrend: "+3",
  activeVehicles,
  inactiveVehicles,

  riskScore: 7.8,
  riskScoreTrend: "+0.3",
  riskLevel: "Good",
  previousScore: 7.5,

  submittedRequests: 12,
  pendingRequests: 5,
  approvedRequests: 6,
  rejectedRequests: 1,

  claimsOverview: {
    total: 8,
    open: 3,
    inProgress: 2,
    resolved: 3,
    totalValue: "PLN 45,200",
  },

  invoicesToPay: {
    total: 6,
    overdue: 2,
    dueSoon: 4,
    totalAmount: "PLN 12,450",
    overdueAmount: "PLN 3,200",
  },

  upcomingRenewals: {
    total: 9,
    thisMonth: 3,
    nextMonth: 4,
    later: 2,
    nearestDate: "Apr 15, 2026",
  },
}

export function DashboardNew() {
  return (
    <div className="w-full">
      <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
        <div className="flex flex-col gap-6">
          <h1 className="text-slate-950" style={{ fontSize: "2.5rem", fontWeight: 600 }}>
            Dashboard
          </h1>

          {/* Top Row - 3 Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Total Vehicles */}
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium text-muted-foreground">Total vehicles</CardTitle>
                  <div className="rounded-full bg-[#005055]/10 p-2">
                    <Car className="h-5 w-5 text-[#005055]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-slate-900">{dashboardData.totalVehicles}</span>
                  <span className="mb-1 flex items-center text-sm font-medium text-green-600">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    {dashboardData.vehiclesTrend}
                  </span>
                </div>
                <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    {dashboardData.activeVehicles} active
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                    {dashboardData.inactiveVehicles} inactive
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Current Risk Score */}
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium text-muted-foreground">Current Risk score</CardTitle>
                  <div className="rounded-full bg-[#005055]/10 p-2">
                    <ShieldAlert className="h-5 w-5 text-[#005055]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-slate-900">{dashboardData.riskScore}</span>
                  <span className="mb-1 text-lg text-muted-foreground">/ 10</span>
                  <span className="mb-1 flex items-center text-sm font-medium text-green-600">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    {dashboardData.riskScoreTrend}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                    {dashboardData.riskLevel}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    vs {dashboardData.previousScore} last month
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Number of Submitted Requests */}
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium text-muted-foreground">Submitted requests</CardTitle>
                  <div className="rounded-full bg-[#005055]/10 p-2">
                    <FileText className="h-5 w-5 text-[#005055]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-slate-900">{dashboardData.submittedRequests}</span>
                </div>
                <div className="mt-3 flex gap-3 text-sm">
                  <span className="flex items-center gap-1 text-amber-600">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    {dashboardData.pendingRequests} pending
                  </span>
                  <span className="flex items-center gap-1 text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    {dashboardData.approvedRequests} approved
                  </span>
                  <span className="flex items-center gap-1 text-red-600">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    {dashboardData.rejectedRequests} rejected
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row - 3 Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Claims Overview */}
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium text-muted-foreground">Claims overview</CardTitle>
                  <div className="rounded-full bg-amber-500/10 p-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-slate-900">{dashboardData.claimsOverview.total}</span>
                  <span className="mb-1 text-sm text-muted-foreground">claims</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total value</span>
                    <span className="font-medium">{dashboardData.claimsOverview.totalValue}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                      {dashboardData.claimsOverview.open} open
                    </Badge>
                    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                      {dashboardData.claimsOverview.inProgress} in progress
                    </Badge>
                    <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                      {dashboardData.claimsOverview.resolved} resolved
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" className="mt-4 h-8 w-full justify-between px-0 text-[#005055] hover:text-[#003c3f]" asChild>
                  <Link href="/claims">
                    View all claims
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Invoices to Pay */}
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium text-muted-foreground">Invoices to pay</CardTitle>
                  <div className="rounded-full bg-red-500/10 p-2">
                    <CreditCard className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-slate-900">{dashboardData.invoicesToPay.total}</span>
                  <span className="mb-1 text-sm text-muted-foreground">invoices</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total amount</span>
                    <span className="font-medium">{dashboardData.invoicesToPay.totalAmount}</span>
                  </div>
                  {dashboardData.invoicesToPay.overdue > 0 && (
                    <div className="flex items-center justify-between rounded-md bg-red-50 px-3 py-2 text-sm">
                      <span className="flex items-center gap-2 font-medium text-red-700">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
                        {dashboardData.invoicesToPay.overdue} overdue
                      </span>
                      <span className="font-semibold text-red-700">{dashboardData.invoicesToPay.overdueAmount}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    {dashboardData.invoicesToPay.dueSoon} due soon
                  </div>
                </div>
                <Button variant="ghost" className="mt-4 h-8 w-full justify-between px-0 text-[#005055] hover:text-[#003c3f]" asChild>
                  <Link href="/invoices">
                    View all invoices
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Renewals */}
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium text-muted-foreground">Upcoming renewals</CardTitle>
                  <div className="rounded-full bg-blue-500/10 p-2">
                    <CalendarClock className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-slate-900">{dashboardData.upcomingRenewals.total}</span>
                  <span className="mb-1 text-sm text-muted-foreground">renewals</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next renewal</span>
                    <span className="font-medium">{dashboardData.upcomingRenewals.nearestDate}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                      {dashboardData.upcomingRenewals.thisMonth} this month
                    </Badge>
                    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                      {dashboardData.upcomingRenewals.nextMonth} next month
                    </Badge>
                    <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-600">
                      {dashboardData.upcomingRenewals.later} later
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" className="mt-4 h-8 w-full justify-between px-0 text-[#005055] hover:text-[#003c3f]" asChild>
                  <Link href="/renewals">
                    View all renewals
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
