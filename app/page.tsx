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

export default function IndexPage() {
  const [selectedCoverLevels, setSelectedCoverLevels] = useState<string[]>([])
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [selectedSortBy, setSelectedSortBy] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [modal, setModal] = useState<ModalState>({ isOpen: false, vehicle: null })

  const openModal = (vehicle: Vehicle) => {
    setModal({ isOpen: true, vehicle })
  }

  const closeModal = () => {
    setModal({ isOpen: false, vehicle: null })
  }
  return (
    <section className="w-full">
      {/* Header and boxes section with light background */}
      <div style={{ backgroundColor: "#FBFBFB" }}>
        <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
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
                  color: "#64748B",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "16px",
                }}
              >
                Total amount of vehicles
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  color: "#0F172A",
                  fontSize: "32px",
                  fontWeight: "700",
                }}
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
                    color: "#64748B",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Total amount of premium
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
                  fontSize: "32px",
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
                  color: "#64748B",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "16px",
                }}
              >
                Avg. vehicle insurance price
              </p>
              <p
                style={{
                  color: "#0F172A",
                  fontSize: "32px",
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
                  color: "#64748B",
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
                  fontSize: "32px",
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
              style={{ color: "#0F172A", fontWeight: "600", fontSize: "24px" }}
            >
              Get in touch
            </h1>
            <p
              style={{ color: "#334155", fontSize: "14px", lineHeight: "24px" }}
            >
              Want to update something in your active policy? Send us a request
              whenever you need - it&apos;s fast, simple, and we&apos;ll take
              care of everything for you.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
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
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "white",
                color: "#0F172A",
                padding: "8px 20px",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
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
              Download all insurance letters
            </button>
          </div>
          <div className="mt-12 border-t border-gray-200"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1
              style={{ color: "#0F172A", fontWeight: "600", fontSize: "24px" }}
            >
              My vehicles
            </h1>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-2">
              <input
                type="text"
                placeholder="Search by plate number or model"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  width: "300px",
                  backgroundColor: "white",
                  color: "#0F172A",
                }}
              />

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
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0F172A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={selectedCoverLevels.includes("full")}
                    onCheckedChange={(checked) => {
                      setSelectedCoverLevels(
                        checked
                          ? [...selectedCoverLevels, "full"]
                          : selectedCoverLevels.filter(
                              (item) => item !== "full"
                            )
                      )
                    }}
                  >
                    Full Coverage
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedCoverLevels.includes("basic")}
                    onCheckedChange={(checked) => {
                      setSelectedCoverLevels(
                        checked
                          ? [...selectedCoverLevels, "basic"]
                          : selectedCoverLevels.filter(
                              (item) => item !== "basic"
                            )
                      )
                    }}
                  >
                    Basic Coverage
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
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0F172A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={selectedAddOns.includes("roadside")}
                    onCheckedChange={(checked) => {
                      setSelectedAddOns(
                        checked
                          ? [...selectedAddOns, "roadside"]
                          : selectedAddOns.filter((item) => item !== "roadside")
                      )
                    }}
                  >
                    Roadside Assistance
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedAddOns.includes("glass")}
                    onCheckedChange={(checked) => {
                      setSelectedAddOns(
                        checked
                          ? [...selectedAddOns, "glass"]
                          : selectedAddOns.filter((item) => item !== "glass")
                      )
                    }}
                  >
                    Glass Protection
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedAddOns.includes("belongings")}
                    onCheckedChange={(checked) => {
                      setSelectedAddOns(
                        checked
                          ? [...selectedAddOns, "belongings"]
                          : selectedAddOns.filter(
                              (item) => item !== "belongings"
                            )
                      )
                    }}
                  >
                    Personal Belongings
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedAddOns.includes("legal")}
                    onCheckedChange={(checked) => {
                      setSelectedAddOns(
                        checked
                          ? [...selectedAddOns, "legal"]
                          : selectedAddOns.filter((item) => item !== "legal")
                      )
                    }}
                  >
                    Legal Protection
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
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0F172A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={selectedSortBy === "model"}
                    onCheckedChange={(checked) => {
                      setSelectedSortBy(checked ? "model" : "")
                    }}
                  >
                    Model
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedSortBy === "price"}
                    onCheckedChange={(checked) => {
                      setSelectedSortBy(checked ? "price" : "")
                    }}
                  >
                    Price
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedSortBy === "age"}
                    onCheckedChange={(checked) => {
                      setSelectedSortBy(checked ? "age" : "")
                    }}
                  >
                    Age
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

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
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 5 7 13 17 13 17 5"></polyline>
              </svg>
              Download excel file
            </button>
          </div>

          <div className="mt-8">
            <div
              className="w-full"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1.8fr 0.8fr 1fr 1fr 1fr 1fr 1.2fr 1fr 2.2fr",
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
                }}
              >
                End Date
              </div>
              <div
                style={{
                  padding: "8px 8px 8px 40px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#0F172A",
                }}
              >
                Action
              </div>
            </div>

            <div
              style={{
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
              }}
            >
              <div className="w-full">
                {(() => {
                  const filteredVehicles = currentUser.vehicles.filter(
                    (vehicle) => {
                      const query = searchQuery.toLowerCase()
                      return (
                        vehicle.plateNumber.toLowerCase().includes(query) ||
                        vehicle.model.toLowerCase().includes(query)
                      )
                    }
                  )

                  if (filteredVehicles.length === 0 && searchQuery) {
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
                        <p style={{ fontSize: "14px", color: "#64748B" }}>
                            {`We couldn't find any vehicles matching "${searchQuery}". Try searching for a different plate number or model.`}
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
                          "1fr 1.8fr 0.8fr 1fr 1fr 1fr 1fr 1.2fr 1fr 2.2fr",
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
                        }}
                      >
                        {new Date(vehicle.renewalDate).toLocaleDateString(
                          "sv-SE",
                          { year: "numeric", month: "2-digit", day: "2-digit" }
                        )}
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 40px",
                          textAlign: "left",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <button
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
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                            color: "#0F172A",
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
                            stroke="#005055"
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
            <p style={{ fontSize: "12px", color: "#64748B" }}>
              ©2026 Fair Car Insurance
            </p>
          </div>
        </div>
      </div>

      {modal.isOpen && modal.vehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-8 shadow-lg">
            {/* Header with Policy Number and Download Button */}
            <div className="mb-4 flex items-center justify-between">
              <div style={{ marginTop: "14px" }}>
                <div className="mb-4 flex items-baseline gap-1">
                  <span style={{ fontFamily: "Inter", fontSize: "14px", color: "#334155", fontWeight: "400" }}>Policy number:</span>
                  <span style={{ fontFamily: "Inter", fontSize: "14px", color: "#334155", fontWeight: "400" }}>
                    {Math.floor(Math.random() * 10000000).toString().padStart(7, "0")}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "white",
                  color: "#005055",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #E2E8F0",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                <svg
                  style={{ width: "16px", height: "16px" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download insurance letter
              </button>
            </div>

            {/* Vehicle Info Section */}
            <div style={{
              backgroundColor: "#FBFBFB",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
            }}>
              <h2 style={{ color: "#0F172A", fontWeight: "700", fontSize: "28px", marginBottom: "4px" }}>
                {modal.vehicle.model}
              </h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontFamily: "Inter", fontSize: "16px", color: "black", fontWeight: "400" }}>
                    {modal.vehicle.plateNumber}
                  </span>
                  <span style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "500",
                    backgroundColor: "white",
                    border: "1px solid #CBD5E1",
                    padding: "2px 10px 4px 10px",
                    borderRadius: "40px",
                  }}>
                    {modal.vehicle.coverLevel}
                  </span>
                </div>
                <span style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: "400", color: "#334155" }}>
                  {modal.vehicle.age} {modal.vehicle.age === 1 ? "year" : "years"} old
                </span>
              </div>
            </div>

            {/* Dates Section */}
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ color: "#0F172A", fontWeight: "600", fontSize: "14px", marginBottom: "4px" }}>
                Dates
              </h3>
              <div style={{ border: "1px solid #E2E8F0", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>
                  <span style={{ color: "#64748B", fontSize: "14px" }}>Start Date</span>
                  <span style={{ color: "#0F172A", fontWeight: "500", fontSize: "14px" }}>
                    {new Date(modal.vehicle.startDate).toLocaleDateString("sv-SE")}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px" }}>
                  <span style={{ color: "#64748B", fontSize: "14px" }}>Renewal Date</span>
                  <span style={{ color: "#0F172A", fontWeight: "500", fontSize: "14px" }}>
                    {new Date(modal.vehicle.renewalDate).toLocaleDateString("sv-SE")}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ color: "#0F172A", fontWeight: "600", fontSize: "14px", marginBottom: "4px" }}>
                Price
              </h3>
              <div style={{ border: "1px solid #E2E8F0", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>
                  <span style={{ color: "#64748B", fontSize: "14px" }}>Price without TFA</span>
                  <span style={{ color: "#0F172A", fontWeight: "500", fontSize: "14px" }}>
                    {new Intl.NumberFormat("sv-SE").format(modal.vehicle.price)} kr
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px" }}>
                  <span style={{ color: "#64748B", fontSize: "14px" }}>Price with TFA</span>
                  <span style={{ color: "#0F172A", fontWeight: "500", fontSize: "14px" }}>
                    {new Intl.NumberFormat("sv-SE").format(modal.vehicle.priceWithTFA)} kr
                  </span>
                </div>
              </div>
            </div>

            {/* Add-ons Section */}
            <div style={{ marginBottom: "8px" }}>
              <h3 style={{ color: "#0F172A", fontWeight: "600", fontSize: "14px", marginBottom: "4px" }}>
                Add-ons
              </h3>
              <div style={{ border: "1px solid #E2E8F0", borderRadius: "8px", overflow: "hidden" }}>
                {["Rental car", "Tools", "Maskinskade"].map((addon, index) => {
                  const hasAddon = modal.vehicle?.addOns.includes(addon)
                  const isLast = index === 2
                  return (
                    <div key={addon} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: isLast ? "none" : "1px solid #E2E8F0" }}>
                      <span style={{ color: "#64748B", fontSize: "14px" }}>{addon}</span>
                      {hasAddon ? (
                        <img src="/icons/check-ic.svg" alt="checked" style={{ width: "24px", height: "24px" }} />
                      ) : (
                        <img src="/icons/failed-ic.svg" alt="unchecked" style={{ width: "24px", height: "24px" }} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Footer Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "24px" }}>
              <button
                type="button"
                onClick={closeModal}
                style={{
                  padding: "8px 20px",
                  borderRadius: "6px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "white",
                  color: "#0F172A",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8FAFC")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={closeModal}
                style={{
                  padding: "8px 20px",
                  borderRadius: "6px",
                  backgroundColor: "#005055",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  border: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Submit a request
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
