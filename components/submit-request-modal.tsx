"use client"

import { useState } from "react"
import { Vehicle } from "@/lib/data"

const REQUEST_TYPES_GENERAL = [
  "Select a request type",
  "Add car",
  "Remove car",
  "Change cover level",
  "Adjust add-ons",
  "Other",
]

const REQUEST_TYPES_VEHICLE = [
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
  const [plateNumberOrVIN, setPlateNumberOrVIN] = useState("")
  const [startDate, setStartDate] = useState("")
  const isVehicleSpecific = !!vehicle

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubmit = () => {
    console.log("Submitting request:", {
      requestType,
      ...(requestType === "Add car" && {
        plateNumberOrVIN,
        coverLevel,
        startDate,
        selectedAddOns,
      }),
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
    (requestType === "Add car" && (!plateNumberOrVIN.trim() || !coverLevel || !startDate)) ||
    (requestType === "Remove car" && reason === "other" && !customReason.trim()) ||
    (requestType === "Change cover level" && !coverLevel)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: "auto" }}
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-bold text-slate-900">
            {isVehicleSpecific ? `Request for ${vehicle.plateNumber}` : "Submit a request"}
          </h2>
          <p className="text-sm text-slate-600">
            {isVehicleSpecific
              ? "Submit a request to our support team if you'd like to make any changes to the selected vehicle."
              : "Submit a request to our support team if you'd like to make any changes."}
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5 mb-6">
          {/* Type Dropdown */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Type
            </label>
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white pl-3 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              {(isVehicleSpecific ? REQUEST_TYPES_VEHICLE : REQUEST_TYPES_GENERAL).map((type) => (
                <option key={type} value={type === "Select a request type" ? "" : type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Add Car Form (only for Add car) */}
          {requestType === "Add car" && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-900">
                  Plate number or VIN
                </label>
                <input
                  type="text"
                  value={plateNumberOrVIN}
                  onChange={(e) => setPlateNumberOrVIN(e.target.value)}
                  placeholder="Enter plate number or VIN"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-900">
                    Cover level
                  </label>
                  <select
                    value={coverLevel}
                    onChange={(e) => setCoverLevel(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white pl-3 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  >
                    <option value="">Select cover level</option>
                    <option value="Ansvar">Ansvar</option>
                    <option value="Delkasko">Delkasko</option>
                    <option value="Kasko">Kasko</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-900">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-900">
                  Add-ons
                </label>
                <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
                  {AVAILABLE_ADDONS.map((addon, index) => (
                    <div key={addon}>
                      <button
                        type="button"
                        onClick={() => toggleAddOn(addon)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-slate-900 hover:bg-slate-50 transition"
                      >
                        <div
                          className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition"
                          style={{
                            backgroundColor: selectedAddOns.includes(addon) ? "#005055" : "white",
                            borderColor: selectedAddOns.includes(addon) ? "#005055" : "#CBD5E1",
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
                        <div className="border-t border-slate-200" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Cover Level Dropdown (only for Change cover level) */}
          {requestType === "Change cover level" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900">
                Cover level
              </label>
              <select
                value={coverLevel}
                onChange={(e) => setCoverLevel(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white pl-3 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
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
              <label className="mb-2 block text-sm font-medium text-slate-900">
                Add-ons
              </label>
              <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
                {AVAILABLE_ADDONS.map((addon, index) => (
                  <div key={addon}>
                    <button
                      type="button"
                      onClick={() => toggleAddOn(addon)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-slate-900 hover:bg-slate-50 transition"
                    >
                      <div
                        className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition"
                        style={{
                          backgroundColor: selectedAddOns.includes(addon) ? "#005055" : "white",
                          borderColor: selectedAddOns.includes(addon) ? "#005055" : "#CBD5E1",
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
                      <div className="border-t border-slate-200" />
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
                <label className="mb-2 block text-sm font-medium text-slate-900">
                  Reason
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white pl-3 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
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
                  <label className="mb-2 block text-sm font-medium text-slate-900">
                    Please specify
                  </label>
                  <input
                    type="text"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Enter your reason"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>
              )}
            </>
          )}

          {/* Message Textarea */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Your message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
              rows={5}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 resize-none"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className="px-6 py-2.5 text-sm font-medium text-white rounded-lg transition"
            style={{
              backgroundColor: isSubmitDisabled ? "#CBD5E1" : "#005055",
              cursor: isSubmitDisabled ? "not-allowed" : "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
