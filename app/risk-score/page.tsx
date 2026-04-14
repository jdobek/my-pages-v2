"use client"

import { Card, CardContent } from "@/components/ui/card"
import { currentUser } from "@/lib/data"

const dashboardData = {
  riskScore: 3,
  totalVehicles: currentUser.totalVehicles,
}

export default function RiskScorePage() {
  return (
    <div className="w-full bg-[#F9F9FB] min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <h1 className="text-black font-semibold" style={{ fontSize: "40px", letterSpacing: "0" }}>
            Risk Score
          </h1>

          {/* Risk Score Overview Card */}
          <Card className="p-0 rounded-[10px] shadow-sm border border-[#E5E5E5] bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-8">
                {/* Score Display */}
                <div className="flex flex-col items-center justify-center w-[160px] h-[160px] rounded-full border-8 border-[#005055]">
                  <span className="text-5xl font-bold text-[#0F172A]">{dashboardData.riskScore}</span>
                  <span className="text-lg font-semibold text-[#B7B7B7]">/10</span>
                </div>

                {/* Score Description */}
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-[#0A0A0A] mb-2">Low Risk</h2>
                  <p className="text-[#71717A] mb-4">
                    Your fleet has a low risk score based on driving behavior, claims history, and vehicle conditions across {dashboardData.totalVehicles} vehicles.
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                      <span className="text-sm text-[#71717A]">Good standing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                      <span className="text-sm text-[#71717A]">Needs attention</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                      <span className="text-sm text-[#71717A]">High risk</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-0 rounded-[10px] shadow-sm border border-[#E5E5E5] bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-4">Driving Behavior</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-semibold text-[#22C55E]">2</span>
                  <span className="text-lg text-[#B7B7B7]">/10</span>
                </div>
                <p className="text-sm text-[#71717A]">Based on telematics data from connected vehicles.</p>
              </CardContent>
            </Card>

            <Card className="p-0 rounded-[10px] shadow-sm border border-[#E5E5E5] bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-4">Claims History</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-semibold text-[#22C55E]">3</span>
                  <span className="text-lg text-[#B7B7B7]">/10</span>
                </div>
                <p className="text-sm text-[#71717A]">Based on historical claims and their severity.</p>
              </CardContent>
            </Card>

            <Card className="p-0 rounded-[10px] shadow-sm border border-[#E5E5E5] bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-4">Vehicle Condition</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-semibold text-[#F59E0B]">4</span>
                  <span className="text-lg text-[#B7B7B7]">/10</span>
                </div>
                <p className="text-sm text-[#71717A]">Based on fleet age and maintenance records.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
