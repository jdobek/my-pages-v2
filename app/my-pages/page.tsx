"use client"

import { useState } from "react"
import { currentUser, Vehicle } from "@/lib/data"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ModalState = {
  isOpen: boolean
  vehicle: Vehicle | null
}

export default function MyPagesPage() {
  const [modal, setModal] = useState<ModalState>({ isOpen: false, vehicle: null })
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCoverLevels, setSelectedCoverLevels] = useState<string[]>([])
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [selectedSortBy, setSelectedSortBy] = useState<string>("")

  const openModal = (vehicle: Vehicle) => {
    console.log("Opening modal for vehicle:", vehicle.plateNumber)
    setModal({ isOpen: true, vehicle })
  }

  const closeModal = () => {
    setModal({ isOpen: false, vehicle: null })
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
            <input
              type="text"
              placeholder="Search by plate number or model"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Cover lvl
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
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Add-ons
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
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Sort by
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
                          onClick={() => openModal(vehicle)}
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

      {modal.isOpen && modal.vehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-8 shadow-lg">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-sm text-gray-600">Policy number:</span>
                  <span className="font-semibold text-gray-900">{Math.floor(Math.random() * 10000000).toString().padStart(7, "0")}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Vehicle Info */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h2 className="mb-3 text-2xl font-bold text-gray-900">
                  {modal.vehicle.model}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-base font-semibold text-gray-900">
                    {modal.vehicle.plateNumber}
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {modal.vehicle.coverLevel}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Age of car</p>
                <p className="text-2xl font-bold text-gray-900">
                  {modal.vehicle.age} {modal.vehicle.age === 1 ? "year" : "years"} old
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
                      {new Date(modal.vehicle.startDate).toLocaleDateString("sv-SE")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Renewal Date</span>
                    <span className="font-medium text-gray-900">
                      {new Date(modal.vehicle.renewalDate).toLocaleDateString("sv-SE")}
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
                      {new Intl.NumberFormat("sv-SE").format(modal.vehicle.price)} kr
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price with TFA</span>
                    <span className="font-medium text-gray-900">
                      {new Intl.NumberFormat("sv-SE").format(modal.vehicle.priceWithTFA)} kr
                    </span>
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h3 className="mb-4 font-semibold text-gray-900">Add-ons</h3>
                <div className="space-y-3">
                  {["Rental car", "Tools", "Maskinskade"].map((addon) => {
                    const hasAddon = modal.vehicle?.addOns.includes(addon)
                    return (
                      <div key={addon} className="flex items-center justify-between">
                        <span className="text-gray-600">{addon}</span>
                        {hasAddon ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-red-600">✕</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 border-t pt-6">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Submit a request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
