"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Vehicle } from "@/lib/data"

const REQUEST_TYPES = [
  "Select a request type",
  "Remove car",
  "Change cover level",
  "Adjust add-ons",
  "Other",
]

interface SubmitRequestModalProps {
  onClose: () => void
  onSubmitSuccess: () => void
  vehicle?: Vehicle
}

const AVAILABLE_ADDONS = ["Rental car", "Tools", "Maskinskade"]

export function SubmitRequestModal({ onClose, onSubmitSuccess, vehicle }: SubmitRequestModalProps) {
  const [requestType, setRequestType] = useState("")
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [coverLevel, setCoverLevel] = useState("")
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const isVehicleSpecific = !!vehicle

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubmit = () => {
    console.log("Submitting request:", {
      requestType,
      ...(requestType === "Remove car" && {
        reason,
        ...(reason === "other" && { customReason })
      }),
      ...(requestType === "Change cover level" && { coverLevel }),
      ...(requestType === "Adjust add-ons" && { selectedAddOns }),
      message,
      ...(vehicle && { vehicleId: vehicle.id, plateNumber: vehicle.plateNumber }),
    })
    onSubmitSuccess()
    onClose()
  }

  const toggleAddOn = (addon: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    )
  }

  const isSubmitDisabled =
    !requestType ||
    !message.trim() ||
    (requestType === "Remove car" && reason === "other" && !customReason.trim()) ||
    (requestType === "Change cover level" && !coverLevel)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: "auto" }}
      >
        {/* Header */}
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {isVehicleSpecific ? `Request for ${vehicle.plateNumber}` : "Submit a request"}
          </h2>
        </div>
        <p className="mb-6 text-gray-600">
          {isVehicleSpecific
            ? "Submit a request to our support team if you&apos;d like to make any changes to the selected vehicle."
            : "Submit a request to our support team if you&apos;d like to make any changes."}
        </p>

        {/* Vehicle Info Section (for vehicle-specific requests) */}
        {isVehicleSpecific && (
          <div className="mb-6 rounded-lg bg-blue-50 p-4 border border-blue-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{vehicle.model}</h3>
                <p className="text-sm text-gray-600">{vehicle.plateNumber}</p>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                {vehicle.coverLevel}
              </span>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Type Dropdown */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Type
            </label>
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white pl-3 pr-10 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {REQUEST_TYPES.map((type) => (
                <option key={type} value={type === "Select a request type" ? "" : type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Cover Level Dropdown (only for Change cover level) */}
          {requestType === "Change cover level" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Cover level
              </label>
              <select
                value={coverLevel}
                onChange={(e) => setCoverLevel(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white pl-3 pr-10 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select cover level</option>
                <option value="Ansvar">Ansvar</option>
                <option value="Delkasko">Delkasko</option>
                <option value="Kasko">Kasko</option>
              </select>
            </div>
          )}

          {/* Add-ons Selection (only for Adjust add-ons) */}
          {requestType === "Adjust add-ons" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Add-ons
              </label>
              <div className="rounded-lg border border-gray-300 overflow-hidden bg-white">
                {AVAILABLE_ADDONS.map((addon, index) => (
                  <div key={addon}>
                    <button
                      type="button"
                      onClick={() => toggleAddOn(addon)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-gray-900 hover:bg-gray-50 transition"
                    >
                      <div
                        className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition"
                        style={{
                          backgroundColor: selectedAddOns.includes(addon) ? "#005055" : "white",
                          borderColor: selectedAddOns.includes(addon) ? "#005055" : "#D1D5DB",
                        }}
                      >
                        {selectedAddOns.includes(addon) && (
                          <svg
                            className="w-4 h-4"
                            fill="white"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span>{addon}</span>
                    </button>
                    {index < AVAILABLE_ADDONS.length - 1 && (
                      <div className="border-t border-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reason Dropdown (only for Remove car) */}
          {requestType === "Remove car" && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Reason
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white pl-3 pr-10 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select reason</option>
                  <option value="too_expensive">Too expensive</option>
                  <option value="better_offer">Better offer elsewhere</option>
                  <option value="unclear_terms">Unclear policy terms</option>
                  <option value="poor_service">Poor customer service</option>
                  <option value="claim_issues">Claim issues</option>
                  <option value="sold_car">Sold the car / no longer need insurance</option>
                  <option value="inflexible_coverage">Inflexible coverage options</option>
                  <option value="negative_reviews">Negative company reviews</option>
                  <option value="changed_employer">Changed employer or leasing company</option>
                  <option value="competitor_offers">Competitor promotions or discounts</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Custom Reason Input (only when "Other" is selected) */}
              {reason === "other" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Please specify
                  </label>
                  <input
                    type="text"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Enter your reason"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              )}
            </>
          )}

          {/* Message Textarea */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Your message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
              rows={5}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""}
            style={{ backgroundColor: "#005055" }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
