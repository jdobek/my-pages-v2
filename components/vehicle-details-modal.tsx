"use client"

import { useEffect, useState } from "react"
import { Check, Download, X } from "lucide-react"

import { Vehicle } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"

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
  onSubmitRequest,
  isOpen,
}: {
  vehicle: Vehicle | null
  onClose: () => void
  onSubmitRequest?: (vehicle: Vehicle) => void
  isOpen: boolean
}) {
  const [displayVehicle, setDisplayVehicle] = useState<Vehicle | null>(vehicle)

  // Update display vehicle
  useEffect(() => {
    if (vehicle) {
      setDisplayVehicle(vehicle)
    }
  }, [vehicle])

  return (
    <Sheet open={isOpen && !!displayVehicle} onOpenChange={onClose} modal={false}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        {displayVehicle && (
          <>
        <SheetHeader>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-900">
              Policy number: {generatePolicyNumber()}
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="size-4" />
              Download insurance letter
            </Button>
          </div>
        </SheetHeader>

        {/* Vehicle Info */}
        <div className="mb-6 mt-4">
          <h2
            className="mb-2 text-gray-900"
            style={{ fontSize: "2.5rem", fontWeight: 600 }}
          >
            {displayVehicle.model}
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base text-gray-900">
                {displayVehicle.plateNumber}
              </span>
              <span className="rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm">
                {displayVehicle.coverLevel}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {displayVehicle.age} years old
            </p>
          </div>
        </div>

        {onSubmitRequest && (
          <div className="mb-12">
            <Button
              onClick={() => onSubmitRequest(displayVehicle)}
              className="w-full bg-[#005055] hover:bg-[#005055]/90"
            >
              Submit a request
            </Button>
          </div>
        )}

        {/* Details Sections */}
        <div className="space-y-5">
          {/* Dates */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Dates</h3>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <span className="text-sm text-gray-900">Start Date</span>
                <span className="text-sm text-gray-900">
                  {formatDate(displayVehicle.startDate)}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-900">Renewal Date</span>
                <span className="text-sm text-gray-900">
                  {formatDate(displayVehicle.renewalDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Price</h3>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <span className="text-sm text-gray-900">Price without TFA</span>
                <span className="text-sm text-gray-900">
                  {formatPrice(displayVehicle.price)} kr
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-900">Price with TFA</span>
                <span className="text-sm text-gray-900">
                  {formatPrice(displayVehicle.priceWithTFA)} kr
                </span>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Add-ons
            </h3>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              {AVAILABLE_ADDONS.map((addon, index) => {
                const hasAddon = displayVehicle.addOns.includes(addon)
                const isLast = index === AVAILABLE_ADDONS.length - 1
                return (
                  <div
                    key={addon}
                    className={`flex items-center justify-between px-4 py-3 ${!isLast ? "border-b border-gray-200" : ""}`}
                  >
                    <span className="text-sm text-gray-900">{addon}</span>
                    <div
                      className={`flex size-5 items-center justify-center rounded-full border bg-white ${
                        hasAddon ? "border-[#005055]" : "border-red-600"
                      }`}
                    >
                      {hasAddon ? (
                        <Check className="size-3 text-[#005055]" />
                      ) : (
                        <X className="size-3 text-red-600" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        </>
        )}
      </SheetContent>
    </Sheet>
  )
}
