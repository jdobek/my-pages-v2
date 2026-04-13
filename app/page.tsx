"use client"

import { useState, useEffect } from "react"
import { currentUser } from "@/lib/data"
import { SubmitRequestModal } from "@/components/submit-request-modal"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DashboardNew } from "@/components/dashboard-new"

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
    <>
      <DashboardNew onSubmitRequest={openSubmitRequestModal} />

      <SubmitRequestModal
        vehicle={undefined}
        isOpen={showSubmitRequestModal}
        onClose={closeSubmitRequestModal}
        onSubmitSuccess={handleSubmitSuccess}
        vehicles={currentUser.vehicles}
      />

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
    </>
  )
}
