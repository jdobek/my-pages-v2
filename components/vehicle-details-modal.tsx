"use client"

import { Vehicle } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Download, Check, X } from "lucide-react"

const AVAILABLE_ADDONS = ["Rental car", "Tools", "Maskinskade"]

function generatePolicyNumber(): string {
  return Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(7, "0")
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("sv-SE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("sv-SE")
}

export function VehicleDetailsModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle
  onClose: () => void
}) {
  const policyNumber = generatePolicyNumber()

  console.log("Modal rendered for vehicle:", vehicle.plateNumber)

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-4 flex items-baseline gap-2">
              <span className="text-sm text-gray-600">Policy number:</span>
              <span className="font-semibold text-gray-900">{policyNumber}</span>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="size-4" />
            Download insurance letter
          </Button>
        </div>

        {/* Vehicle Info */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              {vehicle.model}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-gray-900">
                {vehicle.plateNumber}
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                {vehicle.coverLevel}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Age of car</p>
            <p className="text-2xl font-bold text-gray-900">
              {vehicle.age} {vehicle.age === 1 ? "year" : "years"} old
            </p>
          </div>
        </div>

        {/* Details Sections */}
        <div className="mb-8 space-y-6">
          {/* Dates */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Dates</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium text-gray-900">
                  {formatDate(vehicle.startDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Renewal Date</span>
                <span className="font-medium text-gray-900">
                  {formatDate(vehicle.renewalDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Price</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Price without TFA</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(vehicle.price)} kr
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price with TFA</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(vehicle.priceWithTFA)} kr
                </span>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Add-ons</h3>
            <div className="space-y-3">
              {AVAILABLE_ADDONS.map((addon) => {
                const hasAddon = vehicle.addOns.includes(addon)
                return (
                  <div key={addon} className="flex items-center justify-between">
                    <span className="text-gray-600">{addon}</span>
                    {hasAddon ? (
                      <Check className="size-5 text-green-600" />
                    ) : (
                      <X className="size-5 text-red-600" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 border-t pt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Submit a request</Button>
        </div>
      </div>
    </div>
  )
}
