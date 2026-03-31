"use client"

import { useState, useEffect } from "react"
import { Vehicle } from "@/lib/data"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  vehicles?: Vehicle[]
}

const AVAILABLE_ADDONS = ["Rental car", "Tools", "Maskinskade"]

export function SubmitRequestModal({ onClose, onSubmitSuccess, vehicle, vehicles = [] }: SubmitRequestModalProps) {
  const [requestType, setRequestType] = useState("")
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [coverLevel, setCoverLevel] = useState("")
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [plateNumberOrVIN, setPlateNumberOrVIN] = useState("")
  const [startDate, setStartDate] = useState("")
  const isVehicleSpecific = !!vehicle

  // Auto-fill cover level when plate number is selected
  useEffect(() => {
    if (plateNumberOrVIN && requestType === "Change cover level") {
      const selectedVehicle = vehicles.find((v) => v.plateNumber === plateNumberOrVIN)
      if (selectedVehicle) {
        setCoverLevel(selectedVehicle.coverLevel)
      }
    }
  }, [plateNumberOrVIN, requestType, vehicles])

  // Auto-select add-ons when plate number is selected in Adjust add-ons
  useEffect(() => {
    if (plateNumberOrVIN && requestType === "Adjust add-ons") {
      const selectedVehicle = vehicles.find((v) => v.plateNumber === plateNumberOrVIN)
      if (selectedVehicle) {
        setSelectedAddOns(selectedVehicle.addOns)
      }
    }
  }, [plateNumberOrVIN, requestType, vehicles])

  // Auto-fill cover level when vehicle-specific modal is opened for Change cover level
  useEffect(() => {
    if (isVehicleSpecific && requestType === "Change cover level" && vehicle) {
      setCoverLevel(vehicle.coverLevel)
    }
  }, [requestType, vehicle, isVehicleSpecific])

  // Auto-select add-ons when vehicle-specific modal is opened for Adjust add-ons
  useEffect(() => {
    if (isVehicleSpecific && requestType === "Adjust add-ons" && vehicle) {
      setSelectedAddOns(vehicle.addOns)
    }
  }, [requestType, vehicle, isVehicleSpecific])

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
        ...(plateNumberOrVIN && { plateNumber: plateNumberOrVIN }),
        reason,
        ...(reason === "other" && { customReason })
      }),
      ...(requestType === "Change cover level" && {
        plateNumber: plateNumberOrVIN,
        coverLevel,
        ...(startDate && { startDate })
      }),
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
    (requestType === "Remove car" && !reason) ||
    (requestType === "Remove car" && reason === "other" && !customReason.trim()) ||
    (requestType === "Remove car" && !isVehicleSpecific && !plateNumberOrVIN) ||
    (requestType === "Change cover level" && !isVehicleSpecific && (!plateNumberOrVIN || !coverLevel)) ||
    (requestType === "Change cover level" && isVehicleSpecific && !coverLevel) ||
    (requestType === "Adjust add-ons" && !isVehicleSpecific && !plateNumberOrVIN) ||
    (requestType === "Adjust add-ons" && selectedAddOns.length === 0)

  return (
    <div
      className="fixed inset-0 z-[60] md:flex md:items-center md:justify-center bg-black/0 md:bg-black/50"
      onClick={handleBackdropClick}
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="relative h-full w-full md:h-auto md:max-w-xl md:rounded-lg bg-white p-6 shadow-lg overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: "auto" }}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

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
            <Select value={requestType} onValueChange={setRequestType}>
              <SelectTrigger>
                <SelectValue placeholder="Select a request type" />
              </SelectTrigger>
              <SelectContent>
                {(isVehicleSpecific ? REQUEST_TYPES_VEHICLE : REQUEST_TYPES_GENERAL)
                  .filter(type => type !== "Select a request type")
                  .map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
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
                  <Select value={coverLevel} onValueChange={setCoverLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cover level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ansvar">Ansvar</SelectItem>
                      <SelectItem value="Delkasko">Delkasko</SelectItem>
                      <SelectItem value="Kasko">Kasko</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-900">
                    Start Date
                  </label>
                  <DatePicker
                    value={startDate}
                    onChange={setStartDate}
                    placeholder="Select start date"
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

          {/* Change Cover Level Section (only for Change cover level) */}
          {requestType === "Change cover level" && (
            <>
              {!isVehicleSpecific && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-900">
                    Plate number
                  </label>
                  <Select value={plateNumberOrVIN} onValueChange={setPlateNumberOrVIN}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plate number" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((v) => (
                        <SelectItem key={v.id} value={v.plateNumber}>
                          {v.plateNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {!isVehicleSpecific && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-900">
                      Cover level
                    </label>
                    <Select value={coverLevel} onValueChange={setCoverLevel} disabled={!plateNumberOrVIN}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cover level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ansvar">Ansvar</SelectItem>
                        <SelectItem value="Delkasko">Delkasko</SelectItem>
                        <SelectItem value="Kasko">Kasko</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-900">
                      Start Date
                    </label>
                    <DatePicker
                      value={startDate}
                      onChange={setStartDate}
                      placeholder="Select start date"
                    />
                  </div>
                </div>
              )}

              {isVehicleSpecific && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-900">
                    Cover level
                  </label>
                  <Select value={coverLevel} onValueChange={setCoverLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cover level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ansvar">Ansvar</SelectItem>
                      <SelectItem value="Delkasko">Delkasko</SelectItem>
                      <SelectItem value="Kasko">Kasko</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}

          {/* Adjust Add-ons Section (only for Adjust add-ons) */}
          {requestType === "Adjust add-ons" && (
            <>
              {!isVehicleSpecific && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-900">
                    Plate number
                  </label>
                  <Select value={plateNumberOrVIN} onValueChange={setPlateNumberOrVIN}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plate number" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((v) => (
                        <SelectItem key={v.id} value={v.plateNumber}>
                          {v.plateNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(plateNumberOrVIN || isVehicleSpecific) && (
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
                              backgroundColor: selectedAddOns.includes(addon)
                                ? "#005055"
                                : "white",
                              borderColor: selectedAddOns.includes(addon)
                                ? "#005055"
                                : "#CBD5E1",
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
            </>
          )}

          {/* Reason Dropdown (only for Remove car) */}
          {requestType === "Remove car" && (
            <>
              {!isVehicleSpecific && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-900">
                      Plate number
                    </label>
                    <Select value={plateNumberOrVIN} onValueChange={setPlateNumberOrVIN}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plate number" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((v) => (
                          <SelectItem key={v.id} value={v.plateNumber}>
                            {v.plateNumber}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-900">
                      Reason
                    </label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="too_expensive">Too expensive</SelectItem>
                        <SelectItem value="better_offer">Better offer elsewhere</SelectItem>
                        <SelectItem value="unclear_terms">Unclear policy terms</SelectItem>
                        <SelectItem value="poor_service">Poor customer service</SelectItem>
                        <SelectItem value="claim_issues">Claim issues</SelectItem>
                        <SelectItem value="sold_car">Sold the car / no longer need insurance</SelectItem>
                        <SelectItem value="inflexible_coverage">Inflexible coverage options</SelectItem>
                        <SelectItem value="negative_reviews">Negative company reviews</SelectItem>
                        <SelectItem value="changed_employer">Changed employer or leasing company</SelectItem>
                        <SelectItem value="competitor_offers">Competitor promotions or discounts</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {isVehicleSpecific && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-900">
                    Reason
                  </label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="too_expensive">Too expensive</SelectItem>
                      <SelectItem value="better_offer">Better offer elsewhere</SelectItem>
                      <SelectItem value="unclear_terms">Unclear policy terms</SelectItem>
                      <SelectItem value="poor_service">Poor customer service</SelectItem>
                      <SelectItem value="claim_issues">Claim issues</SelectItem>
                      <SelectItem value="sold_car">Sold the car / no longer need insurance</SelectItem>
                      <SelectItem value="inflexible_coverage">Inflexible coverage options</SelectItem>
                      <SelectItem value="negative_reviews">Negative company reviews</SelectItem>
                      <SelectItem value="changed_employer">Changed employer or leasing company</SelectItem>
                      <SelectItem value="competitor_offers">Competitor promotions or discounts</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

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
