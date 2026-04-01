"use client"

import { useState, useEffect } from "react"
import * as XLSX from "xlsx"
import { ChevronDown, Search } from "lucide-react"

import { currentUser, Vehicle } from "@/lib/data"
import { SubmitRequestModal } from "@/components/submit-request-modal"
import { VehicleDetailsModal } from "@/components/vehicle-details-modal"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

type ModalState = {
  isOpen: boolean
  vehicle: Vehicle | null
}

export default function IndexPage() {
  const [selectedCoverLevels, setSelectedCoverLevels] = useState<string[]>([])
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [selectedSortBy, setSelectedSortBy] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [modal, setModal] = useState<ModalState>({ isOpen: false, vehicle: null })
  const [showSubmitRequestModal, setShowSubmitRequestModal] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)

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

  const openModal = (vehicle: Vehicle) => {
    setModal(prev =>
      prev.isOpen
        ? { ...prev, vehicle }  // If already open, only update vehicle
        : { isOpen: true, vehicle }  // If closed, open it with vehicle
    )
  }

  const closeModal = () => {
    setModal({ isOpen: false, vehicle: null })
  }

  const openSubmitRequestModal = () => {
    setShowSubmitRequestModal(true)
  }

  const closeSubmitRequestModal = () => {
    setShowSubmitRequestModal(false)
    setModal({ isOpen: false, vehicle: null })
  }

  const openSubmitRequestModalForVehicle = (vehicle: Vehicle) => {
    setModal({ isOpen: false, vehicle })
    setShowSubmitRequestModal(true)
  }

  const handleBackToVehicleDetails = () => {
    setShowSubmitRequestModal(false)
    setModal({ isOpen: true, vehicle: modal.vehicle })
  }

  const downloadExcel = () => {
    const data = currentUser.vehicles.map((vehicle) => ({
      "Plate Number": vehicle.plateNumber,
      "Model": vehicle.model,
      "Age": `${vehicle.age} years`,
      "Price": vehicle.price,
      "Price (TFA)": vehicle.priceWithTFA,
      "Cover Level": vehicle.coverLevel,
      "Add-ons": vehicle.addOns.join(", "),
      "Start Date": new Date(vehicle.startDate).toLocaleDateString("sv-SE"),
      "End Date": new Date(vehicle.renewalDate).toLocaleDateString("sv-SE"),
    }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vehicles")
    XLSX.writeFile(workbook, "my_vehicles.xlsx")
  }

  const downloadAllInsuranceLetters = () => {
    const link = document.createElement("a")
    link.href = "/Insurance-Letter-Overview-.pdf"
    link.download = "Insurance-Letter-Overview.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadSingleInsuranceLetter = () => {
    const link = document.createElement("a")
    link.href = "/Insurance-Letter-Single.pdf"
    link.download = "Insurance-Letter-Single.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <section className="w-full">
      {/* Header and boxes section with light background */}
      <div>
        <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-slate-950" style={{ fontWeight: 600, fontSize: "2.5rem" }}>
              Policies
            </h1>
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
          <div className="mb-8 grid grid-cols-2 gap-4 2xl:grid-cols-4">
            {/* Total amount of vehicles */}
            <div
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                padding: "24px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <p
                style={{
                  color: "#334155",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "16px",
                }}
              >
                Total vehicles
              </p>
              <p
                style={{
                  color: "#0F172A",
                  fontSize: "28px",
                  fontWeight: "700",
                }}
                className="font-sans"
              >
                {currentUser.totalVehicles}
              </p>
            </div>

            {/* Total amount of premium */}
            <div
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                padding: "24px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <p
                  style={{
                    color: "#334155",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Total premium
                </p>
                <svg
                  style={{ width: "16px", height: "16px", color: "#94A3B8" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <p
                style={{
                  color: "#0F172A",
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                {currentUser.totalPremium.toLocaleString("sv-SE", {
                  maximumFractionDigits: 0,
                })}{" "}
                kr
              </p>
            </div>

            {/* Avg. vehicle insurance price */}
            <div
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                padding: "24px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <p
                style={{
                  color: "#334155",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "16px",
                }}
              >
                Average premium
              </p>
              <p
                style={{
                  color: "#0F172A",
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                {currentUser.avgVehicleInsurancePrice.toLocaleString("sv-SE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                kr
              </p>
            </div>

            {/* Risk score */}
            <div
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                padding: "24px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <p
                style={{
                  color: "#334155",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "16px",
                }}
              >
                Risk score
              </p>
              <p
                style={{
                  color: "#0F172A",
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                {currentUser.riskScore}/10
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1
              className="text-xl md:text-2xl"
              style={{ color: "#0F172A", fontWeight: "600" }}
            >
              My vehicles
            </h1>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center w-full">
            {/* Mobile/Tablet Layout (Below 1120px) */}
            <div className="flex min-[1120px]:hidden flex-col gap-2 w-full">
              {/* First row: Search bar full width */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by plate number or model"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white"
                />
              </div>

              {/* Second row: Filter & Sort (50%) and Download (50%) */}
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => setShowFilterModal(true)}
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    fontSize: "14px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    color: "#0F172A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  Filter & Sort
                  {(selectedCoverLevels.length > 0 || selectedAddOns.length > 0 || selectedSortBy) && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#005055",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      {selectedCoverLevels.length + selectedAddOns.length + (selectedSortBy ? 1 : 0)}
                    </span>
                  )}
                </button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        backgroundColor: "white",
                        color: "#0F172A",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        className="size-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#005055"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Download
                      <ChevronDown className="size-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={downloadAllInsuranceLetters}>
                      All Insurance Letters
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={downloadExcel}>
                      Excel File
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Desktop Layout (1120px and above) */}
            <div className="hidden min-[1120px]:flex flex-wrap items-center gap-2 w-full lg:w-auto lg:flex-1 lg:min-w-0">
              <div className="relative w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by plate number or model"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid #E2E8F0",
                      fontSize: "14px",
                      backgroundColor: "white",
                      cursor: "pointer",
                      color: "#0F172A",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Cover lvl
                    {selectedCoverLevels.length > 0 && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#E2E8F0",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#0F172A",
                          marginLeft: "4px",
                          marginRight: "-4px",
                        }}
                      >
                        {selectedCoverLevels.length}
                      </span>
                    )}
                    <svg
                      className="size-4 opacity-50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-fit">
                  <DropdownMenuCheckboxItem
                    checked={selectedCoverLevels.includes("Ansvar")}
                    onCheckedChange={(checked) => {
                      setSelectedCoverLevels(
                        checked
                          ? [...selectedCoverLevels, "Ansvar"]
                          : selectedCoverLevels.filter(
                              (item) => item !== "Ansvar"
                            )
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
                          : selectedCoverLevels.filter(
                              (item) => item !== "Kasko"
                            )
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
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid #E2E8F0",
                      fontSize: "14px",
                      backgroundColor: "white",
                      cursor: "pointer",
                      color: "#0F172A",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Add-ons
                    {selectedAddOns.length > 0 && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#E2E8F0",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#0F172A",
                          marginLeft: "4px",
                          marginRight: "-4px",
                        }}
                      >
                        {selectedAddOns.length}
                      </span>
                    )}
                    <svg
                      className="size-4 opacity-50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
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
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid #E2E8F0",
                      fontSize: "14px",
                      backgroundColor: "white",
                      cursor: "pointer",
                      color: "#0F172A",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Sort by
                    {selectedSortBy && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#E2E8F0",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#0F172A",
                          marginLeft: "4px",
                          marginRight: "-4px",
                        }}
                      >
                        1
                      </span>
                    )}
                    <svg
                      className="size-4 opacity-50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "transparent",
                    color: "#DC2626",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#F8FAFC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
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

              {/* Download Button */}
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        backgroundColor: "white",
                        color: "#0F172A",
                        padding: "8px 16px 8px 16px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#F8FAFC")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      <svg
                        className="size-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#005055"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Download
                      <ChevronDown className="size-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={downloadAllInsuranceLetters}>
                      All Insurance Letters
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={downloadExcel}>
                      Excel File
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
            {/* Mobile/Tablet Card View - Hidden on Large Desktop */}
            <div className="block 2xl:hidden space-y-4 bg-white p-4 rounded-lg border border-[#E2E8F0]">
              {(() => {
                const filteredVehicles = currentUser.vehicles.filter((vehicle) => {
                  const query = searchQuery.toLowerCase()
                  const matchesSearch =
                    vehicle.plateNumber.toLowerCase().includes(query) ||
                    vehicle.model.toLowerCase().includes(query)
                  const matchesCoverLevel =
                    selectedCoverLevels.length === 0 ||
                    selectedCoverLevels.includes(vehicle.coverLevel)
                  const matchesAddOns =
                    selectedAddOns.length === 0 ||
                    selectedAddOns.every((addon) => vehicle.addOns.includes(addon))
                  return matchesSearch && matchesCoverLevel && matchesAddOns
                }).sort((a, b) => {
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
                    <div style={{ padding: "32px 16px", textAlign: "center" }}>
                      <svg
                        className="size-12"
                        style={{ margin: "0 auto 16px", color: "#94A3B8" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                      <p style={{ fontSize: "16px", fontWeight: "500", color: "#0F172A", marginBottom: "8px" }}>
                        No vehicles found
                      </p>
                      <p style={{ fontSize: "14px", color: "#334155" }}>
                        Try adjusting your search or filter criteria to find matching vehicles.
                      </p>
                    </div>
                  )
                }

                return filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    style={{
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                      padding: "16px",
                      backgroundColor: "white",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <button
                        type="button"
                        onClick={() => openModal(vehicle)}
                        style={{
                          textDecoration: "underline",
                          color: "#005055",
                          fontWeight: "600",
                          fontSize: "20px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        {vehicle.plateNumber}
                      </button>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => openSubmitRequestModalForVehicle(vehicle)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            backgroundColor: "white",
                            color: "#0F172A",
                            border: "1px solid #E2E8F0",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            whiteSpace: "nowrap",
                            height: "32px",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#F8FAFC")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "white")
                          }
                        >
                          Submit a request
                        </button>
                        <button
                          onClick={downloadSingleInsuranceLetter}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                            color: "#005055",
                            border: "1px solid #E2E8F0",
                            cursor: "pointer",
                            padding: "6px 8px",
                            borderRadius: "6px",
                            width: "32px",
                            height: "32px",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#F8FAFC")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "white")
                          }
                        >
                          <svg
                            className="size-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* Mobile Layout - Below md */}
                    <div className="block md:hidden" style={{ fontSize: "14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px", borderBottom: "1px solid #E2E8F0" }}>
                        <span style={{ color: "#0F172A", fontWeight: "500" }}>Model</span>
                        <span style={{ color: "#0F172A" }}>{vehicle.model}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px", borderBottom: "1px solid #E2E8F0" }}>
                        <span style={{ color: "#0F172A", fontWeight: "500" }}>Age</span>
                        <span style={{ color: "#0F172A" }}>{vehicle.age} yo</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px", borderBottom: "1px solid #E2E8F0" }}>
                        <span style={{ color: "#0F172A", fontWeight: "500" }}>Price</span>
                        <span style={{ color: "#0F172A" }}>{vehicle.price.toLocaleString("sv-SE")} kr</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px", borderBottom: "1px solid #E2E8F0" }}>
                        <span style={{ color: "#0F172A", fontWeight: "500" }}>Price (TFA)</span>
                        <span style={{ color: "#0F172A" }}>{vehicle.priceWithTFA.toLocaleString("sv-SE")} kr</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px", borderBottom: "1px solid #E2E8F0" }}>
                        <span style={{ color: "#0F172A", fontWeight: "500" }}>Cover lvl</span>
                        <span style={{ color: "#0F172A" }}>{vehicle.coverLevel}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px", borderBottom: "1px solid #E2E8F0" }}>
                        <span style={{ color: "#0F172A", fontWeight: "500" }}>Add-ons</span>
                        <span style={{ color: "#0F172A" }}>{vehicle.addOns.length}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px", borderBottom: "1px solid #E2E8F0" }}>
                        <span style={{ color: "#0F172A", fontWeight: "500" }}>Start Date</span>
                        <span style={{ color: "#0F172A" }}>
                          {new Date(vehicle.startDate).toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit" })}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px" }}>
                        <span style={{ color: "#0F172A", fontWeight: "500" }}>Renewal Date</span>
                        <span style={{ color: "#0F172A" }}>
                          {new Date(vehicle.renewalDate).toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit" })}
                        </span>
                      </div>
                    </div>

                    {/* Tablet Layout - md and above */}
                    <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr", gap: "16px 0", fontSize: "14px", paddingTop: "12px" }}>
                      <div style={{ paddingRight: "8px" }}>
                        <span style={{ color: "#0F172A", display: "block", marginBottom: "1px", fontWeight: "500" }}>Model</span>
                        <span style={{ color: "#0F172A" }}>{vehicle.model}</span>
                      </div>
                      <div style={{ width: "1px", backgroundColor: "#E2E8F0", marginRight: "16px" }}></div>
                      <div style={{ paddingRight: "8px" }}>
                        <span style={{ color: "#0F172A", display: "block", marginBottom: "1px", fontWeight: "500" }}>Age</span>
                        <span style={{ color: "#0F172A" }}>{vehicle.age} yo</span>
                      </div>
                      <div style={{ width: "1px", backgroundColor: "#E2E8F0", marginRight: "16px" }}></div>
                      <div style={{ paddingRight: "8px" }}>
                        <span style={{ color: "#0F172A", display: "block", marginBottom: "1px", fontWeight: "500" }}>Price</span>
                        <span style={{ color: "#0F172A" }}>{vehicle.price.toLocaleString("sv-SE")} kr</span>
                      </div>
                      <div style={{ width: "1px", backgroundColor: "#E2E8F0", marginRight: "16px" }}></div>
                      <div>
                        <span style={{ color: "#0F172A", display: "block", marginBottom: "1px", fontWeight: "500" }}>Price (TFA)</span>
                        <span style={{ color: "#0F172A" }}>{vehicle.priceWithTFA.toLocaleString("sv-SE")} kr</span>
                      </div>
                      <div style={{ paddingRight: "8px" }}>
                        <span style={{ color: "#0F172A", display: "block", marginBottom: "1px", fontWeight: "500" }}>Cover lvl</span>
                        <span style={{ color: "#0F172A" }}>{vehicle.coverLevel}</span>
                      </div>
                      <div style={{ width: "1px", backgroundColor: "#E2E8F0", marginRight: "16px" }}></div>
                      <div style={{ paddingRight: "8px" }}>
                        <span style={{ color: "#0F172A", display: "block", marginBottom: "1px", fontWeight: "500" }}>Add-ons</span>
                        <span style={{ color: "#0F172A" }}>{vehicle.addOns.length}</span>
                      </div>
                      <div style={{ width: "1px", backgroundColor: "#E2E8F0", marginRight: "16px" }}></div>
                      <div style={{ paddingRight: "8px" }}>
                        <span style={{ color: "#0F172A", display: "block", marginBottom: "1px", fontWeight: "500" }}>Start Date</span>
                        <span style={{ color: "#0F172A" }}>
                          {new Date(vehicle.startDate).toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit" })}
                        </span>
                      </div>
                      <div style={{ width: "1px", backgroundColor: "#E2E8F0", marginRight: "16px" }}></div>
                      <div>
                        <span style={{ color: "#0F172A", display: "block", marginBottom: "1px", fontWeight: "500" }}>Renewal Date</span>
                        <span style={{ color: "#0F172A" }}>
                          {new Date(vehicle.renewalDate).toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              })()}
            </div>

            {/* Desktop Table View - Hidden on Mobile/Tablet */}
            <div className="hidden 2xl:block">
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(100px, 1fr) minmax(180px, 2fr) minmax(80px, 0.8fr) minmax(100px, 1fr) minmax(110px, 1.1fr) minmax(100px, 1fr) minmax(90px, 0.9fr) minmax(120px, 1.2fr) minmax(120px, 1.2fr) minmax(220px, 2fr)",
                gap: "0",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  padding: "8px 8px 8px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                Plate no.
              </div>
              <div
                style={{
                  padding: "8px 8px 8px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                Model
              </div>
              <div
                style={{
                  padding: "8px 8px 8px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                Age
              </div>
              <div
                style={{
                  padding: "8px 8px 8px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                Price
              </div>
              <div
                style={{
                  padding: "8px 8px 8px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                Price (TFA)
              </div>
              <div
                style={{
                  padding: "8px 8px 8px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                Cover lvl
              </div>
              <div
                style={{
                  padding: "8px 8px 8px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                Add-ons
              </div>
              <div
                style={{
                  padding: "8px 8px 8px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                Start Date
              </div>
              <div
                style={{
                  padding: "8px 8px 8px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                End Date
              </div>
              <div
                style={{
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  paddingLeft: "32px",
                  paddingRight: "8px",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <span>Action</span>
              </div>
            </div>

            <div
              style={{
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
                backgroundColor: "white",
              }}
            >
              <div className="w-full">
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
                      <div
                        style={{ padding: "32px 16px", textAlign: "center" }}
                      >
                        <svg
                          className="size-12"
                          style={{ margin: "0 auto 16px", color: "#94A3B8" }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#0F172A",
                            marginBottom: "8px",
                          }}
                        >
                          No vehicles found
                        </p>
                        <p style={{ fontSize: "14px", color: "#334155" }}>
                            Try adjusting your search or filter criteria to find matching vehicles.
                        </p>
                      </div>
                    )
                  }

                  return filteredVehicles.map((vehicle, index) => (
                    <div
                      key={vehicle.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "minmax(100px, 1fr) minmax(180px, 2fr) minmax(80px, 0.8fr) minmax(100px, 1fr) minmax(110px, 1.1fr) minmax(100px, 1fr) minmax(90px, 0.9fr) minmax(120px, 1.2fr) minmax(120px, 1.2fr) minmax(220px, 2fr)",
                        gap: "0",
                        borderBottom:
                          index < filteredVehicles.length - 1
                            ? "1px solid #E2E8F0"
                            : "none",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#005055",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => openModal(vehicle)}
                          style={{
                            textDecoration: "underline",
                            color: "#005055",
                            fontWeight: "500",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {vehicle.plateNumber}
                        </button>
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#0F172A",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {vehicle.model}
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#0F172A",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {vehicle.age} yo
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#0F172A",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {vehicle.price.toLocaleString("sv-SE")} kr
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#0F172A",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {vehicle.priceWithTFA.toLocaleString("sv-SE")} kr
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#0F172A",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {vehicle.coverLevel}
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#0F172A",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {vehicle.addOns.length}
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#0F172A",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {new Date(vehicle.startDate).toLocaleDateString(
                          "sv-SE",
                          { year: "numeric", month: "2-digit", day: "2-digit" }
                        )}
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#0F172A",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {new Date(vehicle.renewalDate).toLocaleDateString(
                          "sv-SE",
                          { year: "numeric", month: "2-digit", day: "2-digit" }
                        )}
                      </div>
                      <div
                        style={{
                          paddingTop: "8px",
                          paddingBottom: "8px",
                          paddingLeft: "16px",
                          paddingRight: "8px",
                          textAlign: "right",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: "8px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <button
                          onClick={() => openSubmitRequestModalForVehicle(vehicle)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            backgroundColor: "white",
                            color: "#0F172A",
                            border: "1px solid #E2E8F0",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            whiteSpace: "nowrap",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#F8FAFC")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "white")
                          }
                        >
                          Submit a request
                        </button>
                        <button
                          onClick={downloadSingleInsuranceLetter}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                            color: "#005055",
                            border: "1px solid #E2E8F0",
                            cursor: "pointer",
                            padding: "6px 8px",
                            borderRadius: "6px",
                            width: "32px",
                            height: "32px",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#F8FAFC")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "white")
                          }
                        >
                          <svg
                            className="size-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                })()}
              </div>
            </div>
          </div>

          <div style={{ marginTop: "32px", marginBottom: "48px" }}>
            <p style={{ fontSize: "12px", color: "#334155" }}>
              ©2026 Fair Car Insurance
            </p>
          </div>
        </div>
      </div>

      <VehicleDetailsModal
        vehicle={modal.vehicle}
        isOpen={modal.isOpen}
        onClose={closeModal}
        onSubmitRequest={openSubmitRequestModalForVehicle}
      />

      <SubmitRequestModal
        vehicle={modal.vehicle || undefined}
        isOpen={showSubmitRequestModal}
        onClose={closeSubmitRequestModal}
        onSubmitSuccess={handleSubmitSuccess}
        onBack={modal.vehicle ? handleBackToVehicleDetails : undefined}
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

      {/* Filter & Sort Modal */}
      {showFilterModal && (
        <div
          className="fixed inset-0 z-50 bg-white"
          style={{ overflowY: "auto" }}
        >
          <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{
              padding: "16px",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#0F172A" }}>Filter & Sort</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                style={{
                  padding: "8px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "#0F172A"
                }}
              >
                <svg
                  className="size-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {/* Cover Level Section */}
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0F172A", marginBottom: "12px" }}>Cover Level</h3>
                {["Ansvar", "Kasko", "Delkasko"].map((level) => (
                  <div
                    key={level}
                    className="flex items-center py-2 cursor-pointer"
                    onClick={() => {
                      setSelectedCoverLevels(
                        selectedCoverLevels.includes(level)
                          ? selectedCoverLevels.filter((item) => item !== level)
                          : [...selectedCoverLevels, level]
                      )
                    }}
                  >
                    <Checkbox
                      checked={selectedCoverLevels.includes(level)}
                      onCheckedChange={(checked) => {
                        setSelectedCoverLevels(
                          checked
                            ? [...selectedCoverLevels, level]
                            : selectedCoverLevels.filter((item) => item !== level)
                        )
                      }}
                      className="h-5 w-5 mr-3 border-slate-300 data-[state=checked]:bg-[#005055] data-[state=checked]:border-[#005055]"
                    />
                    <span style={{ fontSize: "14px", color: "#0F172A" }}>{level}</span>
                  </div>
                ))}
              </div>

              {/* Add-ons Section */}
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0F172A", marginBottom: "12px" }}>Add-ons</h3>
                {["Rental car", "Tools", "Maskinskade"].map((addon) => (
                  <div
                    key={addon}
                    className="flex items-center py-2 cursor-pointer"
                    onClick={() => {
                      setSelectedAddOns(
                        selectedAddOns.includes(addon)
                          ? selectedAddOns.filter((item) => item !== addon)
                          : [...selectedAddOns, addon]
                      )
                    }}
                  >
                    <Checkbox
                      checked={selectedAddOns.includes(addon)}
                      onCheckedChange={(checked) => {
                        setSelectedAddOns(
                          checked
                            ? [...selectedAddOns, addon]
                            : selectedAddOns.filter((item) => item !== addon)
                        )
                      }}
                      className="h-5 w-5 mr-3 border-slate-300 data-[state=checked]:bg-[#005055] data-[state=checked]:border-[#005055]"
                    />
                    <span style={{ fontSize: "14px", color: "#0F172A" }}>{addon}</span>
                  </div>
                ))}
              </div>

              {/* Sort By Section */}
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0F172A", marginBottom: "12px" }}>Sort By</h3>
                {[
                  { value: "price_asc", label: "Price ascending" },
                  { value: "price_desc", label: "Price descending" },
                  { value: "startDate_desc", label: "Start date descending" },
                  { value: "age_desc", label: "Age descending" }
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center py-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sortByPolicies"
                      checked={selectedSortBy === option.value}
                      onChange={() => setSelectedSortBy(option.value)}
                      className="h-5 w-5 mr-3 cursor-pointer accent-[#005055]"
                    />
                    <span style={{ fontSize: "14px", color: "#0F172A" }}>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: "16px",
              borderTop: "1px solid #E2E8F0",
              display: "flex",
              gap: "12px"
            }}>
              <button
                onClick={() => {
                  setSelectedCoverLevels([])
                  setSelectedAddOns([])
                  setSelectedSortBy("")
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "white",
                  color: "#0F172A",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer"
                }}
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#005055",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer"
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}


