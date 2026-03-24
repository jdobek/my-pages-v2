"use client"

import { useState, useEffect } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SubmitRequestModal } from "@/components/submit-request-modal"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { currentUser } from "@/lib/data"
import { AlertCircle, Check, X, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Invoice = {
  number: string
  issueDate: string
  dueDate: string
  price: string
  creditAmount?: string
  status: "overdue" | "paid" | "in_progress"
  schedule: string
  creditNote?: string
}

const invoices: Invoice[] = [
  { number: "300675", issueDate: "01.03.2026", dueDate: "15.03.2026", price: "8 027,48 kr", status: "overdue", schedule: "Monthly" },
  { number: "300674", issueDate: "01.02.2026", dueDate: "15.02.2026", price: "8 027,48 kr", status: "overdue", schedule: "Monthly" },
  { number: "300673", issueDate: "01.01.2026", dueDate: "15.01.2026", price: "13 000 kr", creditAmount: "-1 243.13", status: "in_progress", schedule: "Monthly", creditNote: "300062" },
  { number: "300672", issueDate: "01.12.2025", dueDate: "15.12.2025", price: "13 000 kr", status: "paid", schedule: "Monthly" },
  { number: "300671", issueDate: "01.11.2025", dueDate: "15.11.2025", price: "13 000 kr", status: "paid", schedule: "Monthly" },
  { number: "300669", issueDate: "01.10.2025", dueDate: "15.10.2025", price: "13 000 kr", status: "paid", schedule: "Monthly" },
  { number: "300668", issueDate: "01.09.2025", dueDate: "15.09.2025", price: "11 400 kr", status: "paid", schedule: "Monthly" },
  { number: "300667", issueDate: "01.08.2025", dueDate: "15.08.2025", price: "11 400 kr", status: "paid", schedule: "Monthly" },
  { number: "300666", issueDate: "01.07.2025", dueDate: "15.07.2025", price: "11 400 kr", status: "paid", schedule: "Monthly" },
  { number: "300665", issueDate: "01.06.2025", dueDate: "15.06.2025", price: "11 400 kr", status: "paid", schedule: "Monthly" },
  { number: "300664", issueDate: "01.05.2025", dueDate: "15.05.2025", price: "10 600 kr", status: "paid", schedule: "Monthly" },
  { number: "300663", issueDate: "01.04.2025", dueDate: "15.04.2025", price: "10 600 kr", status: "paid", schedule: "Monthly" },
  { number: "300662", issueDate: "01.03.2025", dueDate: "15.03.2025", price: "10 600 kr", status: "paid", schedule: "Monthly" },
  { number: "300661", issueDate: "01.02.2025", dueDate: "15.02.2025", price: "9 800 kr", status: "paid", schedule: "Monthly" },
  { number: "300660", issueDate: "01.01.2025", dueDate: "15.01.2025", price: "9 800 kr", status: "paid", schedule: "Monthly" },
  { number: "300659", issueDate: "01.12.2024", dueDate: "15.12.2024", price: "9 800 kr", status: "paid", schedule: "Monthly" },
  { number: "300658", issueDate: "01.11.2024", dueDate: "15.11.2024", price: "9 800 kr", status: "paid", schedule: "Monthly" },
  { number: "300657", issueDate: "01.10.2024", dueDate: "15.10.2024", price: "9 000 kr", status: "paid", schedule: "Monthly" },
  { number: "300656", issueDate: "01.09.2024", dueDate: "15.09.2024", price: "9 000 kr", status: "paid", schedule: "Monthly" },
  { number: "300655", issueDate: "01.08.2024", dueDate: "15.08.2024", price: "9 000 kr", status: "paid", schedule: "Monthly" },
]

export default function InvoicesPage() {
  const [showSubmitRequestModal, setShowSubmitRequestModal] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedSortBy, setSelectedSortBy] = useState<string>("")

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

  const openHelpModal = () => {
    setShowHelpModal(true)
  }

  const closeHelpModal = () => {
    setShowHelpModal(false)
  }

  // Calculate totals
  const parsePrice = (price: string) => {
    return parseFloat(price.replace(/\s/g, '').replace(',', '.').replace('kr', ''))
  }

  const unpaidInvoices = invoices.filter(inv => inv.status === "overdue" || inv.status === "in_progress")
  const unpaidTotal = unpaidInvoices.reduce((sum, inv) => sum + parsePrice(inv.price), 0)
  const unpaidCount = unpaidInvoices.length

  const paidInvoices = invoices.filter(inv => inv.status === "paid")
  const paidTotal = paidInvoices.reduce((sum, inv) => sum + parsePrice(inv.price), 0)
  const paidCount = paidInvoices.length

  const creditNotes = invoices.filter(inv => inv.creditAmount)
  const creditTotal = creditNotes.reduce((sum, inv) => sum + (inv.creditAmount ? parseFloat(inv.creditAmount.replace(/\s/g, '').replace(',', '.')) : 0), 0)
  const creditCount = creditNotes.length

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount).replace(',', '.').replace(/\s/g, ' ')
  }

  const calculateDaysLeft = (dueDate: string, status: string) => {
    if (status === "paid") return null

    const [day, month, year] = dueDate.split('.')
    const due = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }

  return (
    <div className="w-full">
      {/* Header with Sidebar toggle */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <SidebarTrigger />
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
      </div>

      {/* Header and boxes section */}
      <div>
        <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
          <h1 className="text-slate-950 mb-6" style={{ fontSize: "2.5rem", fontWeight: 600 }}>
            Invoices
          </h1>
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Unpaid Invoices */}
            <div
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                padding: "24px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <p
                  style={{
                    color: "#334155",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Unpaid Invoices
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <p
                  style={{
                    color: "#DC2626",
                    fontSize: "32px",
                    fontWeight: "700",
                  }}
                  className="font-sans"
                >
                  {unpaidCount}
                </p>
                <AlertCircle style={{ width: "20px", height: "20px", color: "#DC2626" }} />
              </div>
              <p style={{ color: "#64748B", fontSize: "12px" }}>
                Total Amount: <span style={{ fontWeight: "600", color: "#0F172A" }}>{formatAmount(unpaidTotal)} kr</span>
              </p>
            </div>

            {/* Paid Invoices */}
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
                  marginBottom: "4px",
                }}
              >
                Paid Invoices
              </p>
              <p
                style={{
                  color: "#0F172A",
                  fontSize: "32px",
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
                className="font-sans"
              >
                {paidCount}
              </p>
              <p style={{ color: "#64748B", fontSize: "12px" }}>
                Total Amount: <span style={{ fontWeight: "600", color: "#0F172A" }}>{formatAmount(paidTotal)} kr</span>
              </p>
            </div>

            {/* Credit Notes */}
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
                  marginBottom: "4px",
                }}
              >
                Credit Notes
              </p>
              <p
                style={{
                  color: "#0F172A",
                  fontSize: "32px",
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
                className="font-sans"
              >
                {creditCount}
              </p>
              <p style={{ color: "#64748B", fontSize: "12px" }}>
                Total Amount: <span style={{ fontWeight: "600", color: "#0F172A" }}>{formatAmount(Math.abs(creditTotal))} kr</span>
              </p>
            </div>

            {/* Need help */}
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
                  color: "#0F172A",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "4px",
                }}
              >
                Need help with the invoice?
              </p>
              <p
                style={{
                  color: "#64748B",
                  fontSize: "12px",
                  marginBottom: "16px",
                }}
              >
                We&apos;re here to help you.
              </p>
              <button
                onClick={openHelpModal}
                style={{
                  backgroundColor: "white",
                  color: "#005055",
                  padding: "8px 20px",
                  borderRadius: "8px",
                  border: "1px solid #005055",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#005055"
                  e.currentTarget.style.color = "white"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white"
                  e.currentTarget.style.color = "#005055"
                }}
              >
                Get help
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 style={{ color: "#0F172A", fontWeight: "600", fontSize: "24px" }}>
              All Invoices
            </h1>
          </div>

            <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="text"
                  placeholder="Search by invoice number"
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
                      Status
                      {selectedStatuses.length > 0 && (
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
                          {selectedStatuses.length}
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
                      checked={selectedStatuses.includes("paid")}
                      onCheckedChange={(checked) => {
                        setSelectedStatuses(
                          checked
                            ? [...selectedStatuses, "paid"]
                            : selectedStatuses.filter((item) => item !== "paid")
                        )
                      }}
                      onSelect={(e) => e.preventDefault()}
                    >
                      Paid
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatuses.includes("in_progress")}
                      onCheckedChange={(checked) => {
                        setSelectedStatuses(
                          checked
                            ? [...selectedStatuses, "in_progress"]
                            : selectedStatuses.filter((item) => item !== "in_progress")
                        )
                      }}
                      onSelect={(e) => e.preventDefault()}
                    >
                      In progress
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatuses.includes("overdue")}
                      onCheckedChange={(checked) => {
                        setSelectedStatuses(
                          checked
                            ? [...selectedStatuses, "overdue"]
                            : selectedStatuses.filter((item) => item !== "overdue")
                        )
                      }}
                      onSelect={(e) => e.preventDefault()}
                    >
                      Overdue
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
                      checked={selectedSortBy === "dueDate_asc"}
                      onCheckedChange={(checked) => {
                        setSelectedSortBy(checked ? "dueDate_asc" : "")
                      }}
                      onSelect={(e) => e.preventDefault()}
                    >
                      Due date ascending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedSortBy === "dueDate_desc"}
                      onCheckedChange={(checked) => {
                        setSelectedSortBy(checked ? "dueDate_desc" : "")
                      }}
                      onSelect={(e) => e.preventDefault()}
                    >
                      Due date descending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedSortBy === "issueDate_desc"}
                      onCheckedChange={(checked) => {
                        setSelectedSortBy(checked ? "issueDate_desc" : "")
                      }}
                      onSelect={(e) => e.preventDefault()}
                    >
                      Issue date descending
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {(searchQuery || selectedStatuses.length > 0 || selectedSortBy) && (
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedStatuses([])
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
              </div>
            </div>

            <div className="mt-8">
              <div
                className="w-full"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
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
                  Invoice no.
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
                  Issue date
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
                  Due Date
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
                  Past due
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
                  Status
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
                  Schedule
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
                  Credit Notes
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
                    const filteredInvoices = invoices
                      .filter((invoice) => {
                        // Search filter
                        const query = searchQuery.toLowerCase()
                        const matchesSearch = invoice.number.toLowerCase().includes(query)

                        // Status filter
                        const matchesStatus =
                          selectedStatuses.length === 0 ||
                          selectedStatuses.includes(invoice.status)

                        return matchesSearch && matchesStatus
                      })
                      .sort((a, b) => {
                        // Apply sorting
                        switch (selectedSortBy) {
                          case "dueDate_asc":
                            return new Date(a.dueDate.split('.').reverse().join('-')).getTime() -
                                   new Date(b.dueDate.split('.').reverse().join('-')).getTime()
                          case "dueDate_desc":
                            return new Date(b.dueDate.split('.').reverse().join('-')).getTime() -
                                   new Date(a.dueDate.split('.').reverse().join('-')).getTime()
                          case "issueDate_desc":
                            return new Date(b.issueDate.split('.').reverse().join('-')).getTime() -
                                   new Date(a.issueDate.split('.').reverse().join('-')).getTime()
                          default:
                            return 0
                        }
                      })

                    if (filteredInvoices.length === 0 && (searchQuery || selectedStatuses.length > 0)) {
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
                          <p
                            style={{
                              fontSize: "16px",
                              fontWeight: "500",
                              color: "#0F172A",
                              marginBottom: "8px",
                            }}
                          >
                            No invoices found
                          </p>
                          <p style={{ fontSize: "14px", color: "#334155" }}>
                            Try adjusting your search or filter criteria to find matching invoices.
                          </p>
                        </div>
                      )
                    }

                    return filteredInvoices.map((invoice, index) => {
                      const daysLeft = calculateDaysLeft(invoice.dueDate, invoice.status)
                      return (
                    <div
                      key={invoice.number}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                        gap: "0",
                        borderBottom: index < invoices.length - 1 ? "1px solid #E2E8F0" : "none",
                        alignItems: "center",
                        height: "52px",
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
                        <a
                          href="/Invoice-301944.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#005055",
                            fontSize: "14px",
                            fontWeight: "500",
                            textDecoration: "underline",
                          }}
                        >
                          {invoice.number}
                        </a>
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#0F172A",
                        }}
                      >
                        {invoice.issueDate}
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#0F172A",
                        }}
                      >
                        {invoice.dueDate}
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#0F172A",
                        }}
                      >
                        {daysLeft !== null ? (
                          <span style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: daysLeft < 0 ? "#DC2626" : "#0F172A"
                          }}>
                            {Math.abs(daysLeft)} days
                          </span>
                        ) : (
                          <span style={{ fontSize: "14px", color: "#64748B" }}>-</span>
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
                        <p style={{ fontSize: "14px", color: "#334155", fontWeight: "500" }}>
                          {invoice.price}
                        </p>
                        {invoice.creditAmount && (
                          <p style={{ fontSize: "11px", color: "#005055", marginTop: "0px", fontWeight: "500" }}>
                            {invoice.creditAmount}
                          </p>
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
                        {invoice.status === "overdue" ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "1px 8px",
                              borderRadius: "16px",
                              backgroundColor: "white",
                              border: "1px solid #DC2626",
                              color: "#DC2626",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          >
                            <X style={{ width: "12px", height: "12px" }} />
                            Overdue
                          </span>
                        ) : invoice.status === "in_progress" ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "1px 8px",
                              borderRadius: "16px",
                              backgroundColor: "#FAFAFA",
                              border: "1px solid #9CA3AF",
                              color: "#0F172A",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          >
                            <Clock style={{ width: "12px", height: "12px" }} />
                            In progress
                          </span>
                        ) : (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "1px 8px",
                              borderRadius: "16px",
                              backgroundColor: "white",
                              border: "1px solid #005055",
                              color: "#005055",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          >
                            <Check style={{ width: "12px", height: "12px" }} />
                            Paid
                          </span>
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
                        {invoice.schedule}
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 16px",
                          textAlign: "left",
                          fontSize: "14px",
                          color: "#0F172A",
                        }}
                      >
                        {invoice.creditNote ? (
                          <a
                            href="/Credit-Memo-300062.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#005055",
                              fontSize: "14px",
                              fontWeight: "500",
                              textDecoration: "underline",
                            }}
                          >
                            {invoice.creditNote}
                          </a>
                        ) : (
                          "-"
                        )}
                      </div>
                      <div
                        style={{
                          padding: "8px 8px 8px 40px",
                          textAlign: "left",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: "8px",
                        }}
                      >
                        {invoice.creditNote ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
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
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <a
                                href="/Invoice-301944.pdf"
                                download
                                style={{
                                  display: "block",
                                  padding: "8px 12px",
                                  color: "#0F172A",
                                  fontSize: "14px",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8FAFC")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                              >
                                Invoice
                              </a>
                              <a
                                href="/Credit-Memo-300062.pdf"
                                download
                                style={{
                                  display: "block",
                                  padding: "8px 12px",
                                  color: "#0F172A",
                                  fontSize: "14px",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8FAFC")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                              >
                                Credit Note
                              </a>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <a
                            href="/Invoice-301944.pdf"
                            download
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
                          </a>
                        )}
                      </div>
                    </div>
                    )
                    })
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

      {showSubmitRequestModal && (
        <SubmitRequestModal
          onClose={closeSubmitRequestModal}
          onSubmitSuccess={handleSubmitSuccess}
          vehicles={currentUser.vehicles}
        />
      )}

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

      {showHelpModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
          onClick={closeHelpModal}
          style={{ pointerEvents: "auto" }}
        >
          <div
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
            style={{ pointerEvents: "auto" }}
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Get help
              </h2>
              <p className="text-sm text-slate-600">
                Need assistance with your invoices? Our customer support team is here to help.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 mb-2">
                      Customer Support
                    </p>
                    <a
                      href="tel:0812334080"
                      className="text-sm text-[#005055] hover:underline"
                    >
                      08-12 33 40 80
                    </a>
                    <p className="text-xs text-slate-600 mt-1">
                      Monday - Friday, 9:00 - 17:00
                    </p>
                  </div>
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#005055"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 mb-2">
                      Email Support
                    </p>
                    <a
                      href="mailto:support@fairinsurance.se"
                      className="text-sm text-[#005055] hover:underline"
                    >
                      support@fairinsurance.se
                    </a>
                    <p className="text-xs text-slate-600 mt-1">
                      We&apos;ll respond within 24 hours
                    </p>
                  </div>
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#005055"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
