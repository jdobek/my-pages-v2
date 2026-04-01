"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { currentUser, Vehicle } from "@/lib/data"
import { SubmitRequestModal } from "@/components/submit-request-modal"
import { VehicleDetailsModal } from "@/components/vehicle-details-modal"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export default function MyPagesPage() {
  const [detailsModal, setDetailsModal] = useState<Vehicle | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [submitModal, setSubmitModal] = useState<Vehicle | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCoverLevels, setSelectedCoverLevels] = useState<string[]>([])
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [selectedSortBy, setSelectedSortBy] = useState<string>("")

  const openDetailsModal = (vehicle: Vehicle) => {
    console.log('Opening details modal for:', vehicle.plateNumber)
    setDetailsModal(vehicle)
    if (!isDetailsOpen) {
      setIsDetailsOpen(true)
    }
  }

  const closeDetailsModal = () => {
    setIsDetailsOpen(false)
    setDetailsModal(null)
    setSubmitModal(null)
  }

  const openSubmitModal = (vehicle: Vehicle) => {
    setDetailsModal(null)
    setSubmitModal(vehicle)
  }

  const closeSubmitModal = () => {
    setSubmitModal(null)
  }

  const handleBackToDetails = () => {
    const vehicle = submitModal
    setSubmitModal(null)
    setDetailsModal(vehicle)
  }

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-full flex-col items-start gap-6">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              My vehicles
            </h1>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by plate number or model"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Cover lvl
                  {selectedCoverLevels.length > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-[11px] font-semibold text-gray-900 ml-1 -mr-1">
                      {selectedCoverLevels.length}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-fit">
                <DropdownMenuCheckboxItem
                  checked={selectedCoverLevels.includes("Ansvar")}
                  onCheckedChange={(checked) => {
                    setSelectedCoverLevels(
                      checked
                        ? [...selectedCoverLevels, "Ansvar"]
                        : selectedCoverLevels.filter((item) => item !== "Ansvar")
                    )
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  Ansvar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCoverLevels.includes("Kasko")}
                  onCheckedChange={(checked) => {
                    setSelectedCoverLevels(
                      checked
                        ? [...selectedCoverLevels, "Kasko"]
                        : selectedCoverLevels.filter((item) => item !== "Kasko")
                    )
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  Kasko
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCoverLevels.includes("Delkasko")}
                  onCheckedChange={(checked) => {
                    setSelectedCoverLevels(
                      checked
                        ? [...selectedCoverLevels, "Delkasko"]
                        : selectedCoverLevels.filter(
                            (item) => item !== "Delkasko"
                          )
                    )
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  Delkasko
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Add-ons
                  {selectedAddOns.length > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-[11px] font-semibold text-gray-900 ml-1 -mr-1">
                      {selectedAddOns.length}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-fit">
                <DropdownMenuCheckboxItem
                  checked={selectedAddOns.includes("Rental car")}
                  onCheckedChange={(checked) => {
                    setSelectedAddOns(
                      checked
                        ? [...selectedAddOns, "Rental car"]
                        : selectedAddOns.filter((item) => item !== "Rental car")
                    )
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  Rental car
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedAddOns.includes("Tools")}
                  onCheckedChange={(checked) => {
                    setSelectedAddOns(
                      checked
                        ? [...selectedAddOns, "Tools"]
                        : selectedAddOns.filter((item) => item !== "Tools")
                    )
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  Tools
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedAddOns.includes("Maskinskade")}
                  onCheckedChange={(checked) => {
                    setSelectedAddOns(
                      checked
                        ? [...selectedAddOns, "Maskinskade"]
                        : selectedAddOns.filter(
                            (item) => item !== "Maskinskade"
                          )
                    )
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  Maskinskade
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Sort by
                  {selectedSortBy && (
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-[11px] font-semibold text-gray-900 ml-1 -mr-1">
                      1
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-80 pr-6">
                <DropdownMenuCheckboxItem
                  checked={selectedSortBy === ""}
                  onCheckedChange={(checked) => {
                    setSelectedSortBy(checked ? "" : selectedSortBy)
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  None
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedSortBy === "price_asc"}
                  onCheckedChange={(checked) => {
                    setSelectedSortBy(checked ? "price_asc" : "")
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  Price ascending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedSortBy === "price_desc"}
                  onCheckedChange={(checked) => {
                    setSelectedSortBy(checked ? "price_desc" : "")
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  Price descending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedSortBy === "startDate_desc"}
                  onCheckedChange={(checked) => {
                    setSelectedSortBy(checked ? "startDate_desc" : "")
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  Start date descending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedSortBy === "age_desc"}
                  onCheckedChange={(checked) => {
                    setSelectedSortBy(checked ? "age_desc" : "")
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  Age descending
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {(searchQuery || selectedCoverLevels.length > 0 || selectedAddOns.length > 0 || selectedSortBy) && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCoverLevels([])
                  setSelectedAddOns([])
                  setSelectedSortBy("")
                }}
                className="flex items-center gap-2 rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-gray-100"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Clear all
              </button>
            )}
          </div>

          {/* Vehicles Table */}
          <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Plate number
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Model
                  </th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const filteredVehicles = currentUser.vehicles.filter((vehicle) => {
                    // Search filter
                    const query = searchQuery.toLowerCase()
                    const matchesSearch =
                      vehicle.plateNumber.toLowerCase().includes(query) ||
                      vehicle.model.toLowerCase().includes(query)

                    // Cover level filter (OR logic - match ANY selected level)
                    const matchesCoverLevel =
                      selectedCoverLevels.length === 0 ||
                      selectedCoverLevels.includes(vehicle.coverLevel)

                    // Add-ons filter (AND logic - must have ALL selected add-ons)
                    const matchesAddOns =
                      selectedAddOns.length === 0 ||
                      selectedAddOns.every((addon) => vehicle.addOns.includes(addon))

                    return matchesSearch && matchesCoverLevel && matchesAddOns
                  }).sort((a, b) => {
                    // Apply sorting
                    switch (selectedSortBy) {
                      case "price_asc":
                        return a.price - b.price
                      case "price_desc":
                        return b.price - a.price
                      case "startDate_desc":
                        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
                      case "age_desc":
                        return b.age - a.age
                      default:
                        return 0
                    }
                  })

                  if (filteredVehicles.length === 0 && (searchQuery || selectedCoverLevels.length > 0 || selectedAddOns.length > 0)) {
                    return (
                      <tr>
                        <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                          No vehicles found. Try adjusting your search or filter criteria.
                        </td>
                      </tr>
                    )
                  }

                  return filteredVehicles.map((vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => openDetailsModal(vehicle)}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          {vehicle.plateNumber}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {vehicle.model}
                      </td>
                    </tr>
                  ))
                })()}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <VehicleDetailsModal
        vehicle={detailsModal}
        isOpen={isDetailsOpen}
        onClose={closeDetailsModal}
        onSubmitRequest={openSubmitModal}
      />

      <SubmitRequestModal
        vehicle={submitModal}
        isOpen={!!submitModal}
        onClose={closeSubmitModal}
        onSubmitSuccess={closeSubmitModal}
        onBack={submitModal ? handleBackToDetails : undefined}
        vehicles={currentUser.vehicles}
      />
    </>
  )
}
