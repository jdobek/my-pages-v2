"use client"

import { useState, useEffect } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ChartRiskRadial } from "@/components/chart-risk-radial"
import { ChartRiskScoreTrend } from "@/components/chart-risk-score-trend"
import { ChartHorizontalBar } from "@/components/chart-horizontal-bar"
import { ChartHorizontalBar2 } from "@/components/chart-horizontal-bar-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUser } from "@/lib/data"
import { SubmitRequestModal } from "@/components/submit-request-modal"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DashboardPage() {
  const [showSubmitRequestModal, setShowSubmitRequestModal] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccessAlert])

  const handleSubmitSuccess = () => {
    setShowSuccessAlert(true)
  }

  const openSubmitRequestModal = () => {
    setShowSubmitRequestModal(true)
  }

  const closeSubmitRequestModal = () => {
    setShowSubmitRequestModal(false)
  }

  return (
    <div className="w-full">
      {/* Header with Sidebar toggle */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <SidebarTrigger />
          <button
            onClick={openSubmitRequestModal}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#005055",
              color: "white",
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Submit a request
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-950" style={{ fontSize: "2.5rem", fontWeight: 600 }}>Dashboard</h1>
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

      {showSubmitRequestModal && (
        <SubmitRequestModal
          onClose={closeSubmitRequestModal}
          onSubmitSuccess={handleSubmitSuccess}
          vehicles={currentUser.vehicles}
        />
      )}

      {showSuccessAlert && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 max-w-2xl z-50">
          <Alert className="bg-white border-gray-200 shadow-lg">
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                minWidth: "40px",
                borderRadius: "50%",
                backgroundColor: "transparent"
              }}>
                <img src="/icons/check-ic.svg" alt="success" style={{ width: "20px", height: "20px" }} />
              </div>
              <div style={{ flex: 1 }}>
                <AlertTitle className="text-gray-900" style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>Your request has been sent</AlertTitle>
                <AlertDescription className="text-gray-600" style={{ fontSize: "15px", lineHeight: "1.5" }}>
                  Your request has been submitted and is being processed by our support team. You will receive a confirmation email once the change has been completed.
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </div>
      )}
    </div>
  )
}
