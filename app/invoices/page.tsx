"use client"

import { useState, useEffect } from "react"
import { SubmitRequestModal } from "@/components/submit-request-modal"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { currentUser } from "@/lib/data"
import { AlertCircle, Check, X, Clock, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useDevSettings } from "@/lib/contexts/dev-context"

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

const baseInvoices: Invoice[] = [
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
  const { settings } = useDevSettings()
  const [showSubmitRequestModal, setShowSubmitRequestModal] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedSortBy, setSelectedSortBy] = useState<string>("")
  const [showFilterModal, setShowFilterModal] = useState(false)

  // Transform invoices based on dev settings
  const invoices = settings.showOverdueInvoices
    ? baseInvoices
    : baseInvoices.map((invoice) => {
        // Change all invoices to "paid" status
        return { ...invoice, status: "paid" as const }
      })

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
      {/* Header and boxes section */}
      <div>
        <div className="container mx-auto max-w-7xl px-4 pb-4 pt-10 md:pb-4 md:pt-16">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-slate-950" style={{ fontSize: "2.5rem", fontWeight: 600 }}>
              Invoices
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
                    color: unpaidCount > 0 ? "#DC2626" : "#0F172A",
                    fontSize: "32px",
                    fontWeight: "700",
                  }}
                  className="font-sans"
                >
                  {unpaidCount}
                </p>
                {unpaidCount > 0 && (
                  <AlertCircle style={{ width: "20px", height: "20px", color: "#DC2626" }} />
                )}
              </div>
              <p style={{ color: "#64748B", fontSize: "12px" }}>
                Total Amount: <span style={{ fontWeight: "600", color: "#0F172A" }}>{formatAmount(unpaidTotal)} kr</span>
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
            <h1
              className="text-xl md:text-2xl"
              style={{ color: "#0F172A", fontWeight: "600" }}
            >
              All Invoices
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
                  placeholder="Search by invoice number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white"
                />
              </div>

              {/* Second row: Filter & Sort button */}
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
                  {(selectedStatuses.length > 0 || selectedSortBy) && (
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
                      {selectedStatuses.length + (selectedSortBy ? 1 : 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Layout (1120px and above) */}
            <div className="hidden min-[1120px]:flex flex-wrap items-center gap-2 w-full lg:w-auto lg:flex-1 lg:min-w-0">
              <div className="relative w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by invoice number"
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
          </div>

            <div className="mt-8">
            {/* Mobile/Tablet Card View - Hidden on Large Desktop */}
            <div className="block 2xl:hidden space-y-4 bg-white p-4 rounded-lg border border-[#E2E8F0]">
              {(() => {
                const filteredInvoices = invoices
                  .filter((invoice) => {
                    const query = searchQuery.toLowerCase()
                    const matchesSearch = invoice.number.toLowerCase().includes(query)
                    const matchesStatus =
                      selectedStatuses.length === 0 ||
                      selectedStatuses.includes(invoice.status)
                    return matchesSearch && matchesStatus
                  })
                  .sort((a, b) => {
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
                      <p style={{ fontSize: "16px", fontWeight: "500", color: "#0F172A", marginBottom: "8px" }}>
                        No invoices found
                      </p>
                      <p style={{ fontSize: "14px", color: "#334155" }}>
                        Try adjusting your search or filter criteria to find matching invoices.
                      </p>
                    </div>
                  )
                }

                return filteredInvoices.map((invoice) => {
                  const daysLeft = calculateDaysLeft(invoice.dueDate, invoice.status)
                  return (
                    <div
                      key={invoice.number}
                      style={{
                        border: "1px solid #E2E8F0",
                        borderRadius: "8px",
                        padding: "16px",
                        backgroundColor: "white",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: invoice.creditNote ? "8px" : "0" }}>
                            <a
                              href="/Invoice-301944.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "underline",
                                color: "#005055",
                                fontWeight: "600",
                                fontSize: "20px",
                              }}
                            >
                              #{invoice.number}
                            </a>
                            {invoice.status === "overdue" ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                              {daysLeft !== null && (
                                <span style={{ fontSize: "12px", fontWeight: "500", color: "#DC2626" }}>
                                  {Math.abs(daysLeft)} days
                                </span>
                              )}
                            </div>
                          ) : invoice.status === "in_progress" ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                              {daysLeft !== null && (
                                <span style={{ fontSize: "12px", fontWeight: "500", color: "#DC2626" }}>
                                  {Math.abs(daysLeft)} days
                                </span>
                              )}
                            </div>
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
                          {invoice.creditNote && (
                            <div style={{ fontSize: "12px", color: "#64748B" }}>
                              Credit Note: <a
                                href="/Credit-Memo-300062.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#005055",
                                  fontWeight: "500",
                                  textDecoration: "underline",
                                }}
                              >
                                {invoice.creditNote}
                              </a>
                            </div>
                          )}
                        </div>
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
                      </div>
                      {/* Mobile Layout - Below md */}
                      <div className="block md:hidden" style={{ fontSize: "14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px", borderBottom: "1px solid #E2E8F0" }}>
                          <span style={{ color: "#0F172A", fontWeight: "500" }}>Issue date</span>
                          <span style={{ color: "#0F172A" }}>{invoice.issueDate}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px", borderBottom: "1px solid #E2E8F0" }}>
                          <span style={{ color: "#0F172A", fontWeight: "500" }}>Due date</span>
                          <span style={{ color: "#0F172A" }}>{invoice.dueDate}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px", borderBottom: "1px solid #E2E8F0" }}>
                          <span style={{ color: "#0F172A", fontWeight: "500" }}>Price</span>
                          <div style={{ textAlign: "right" }}>
                            <span style={{ color: "#334155", fontWeight: "500" }}>{invoice.price}</span>
                            {invoice.creditAmount && (
                              <p style={{ fontSize: "11px", color: "#005055", marginTop: "0px", fontWeight: "500" }}>
                                {invoice.creditAmount}
                              </p>
                            )}
                          </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px", borderBottom: invoice.creditNote ? "1px solid #E2E8F0" : "none" }}>
                          <span style={{ color: "#0F172A", fontWeight: "500" }}>Schedule</span>
                          <span style={{ color: "#0F172A" }}>{invoice.schedule}</span>
                        </div>
                        {invoice.creditNote && (
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px" }}>
                            <span style={{ color: "#0F172A", fontWeight: "500" }}>Credit Note</span>
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
                          </div>
                        )}
                      </div>
                      {/* Tablet Layout - md and above */}
                      <div className="hidden md:block" style={{ fontSize: "14px" }}>
                        {invoice.status === "paid" ? (
                          /* Paid invoices - single row layout */
                          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr", gap: "16px 0", paddingTop: "12px" }}>
                            <div style={{ paddingRight: "8px" }}>
                              <span style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "4px" }}>Issue date</span>
                              <span style={{ color: "#0F172A", fontWeight: "500" }}>{invoice.issueDate}</span>
                            </div>
                            <div style={{ width: "1px", backgroundColor: "#E2E8F0", marginRight: "16px" }}></div>
                            <div style={{ paddingRight: "8px" }}>
                              <span style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "4px" }}>Due date</span>
                              <span style={{ color: "#0F172A", fontWeight: "500" }}>{invoice.dueDate}</span>
                            </div>
                            <div style={{ width: "1px", backgroundColor: "#E2E8F0", marginRight: "16px" }}></div>
                            <div style={{ paddingRight: "8px" }}>
                              <span style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "4px" }}>Price</span>
                              <span style={{ color: "#334155", fontWeight: "500" }}>{invoice.price}</span>
                            </div>
                            <div style={{ width: "1px", backgroundColor: "#E2E8F0", marginRight: "16px" }}></div>
                            <div>
                              <span style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "4px" }}>Schedule</span>
                              <span style={{ color: "#0F172A", fontWeight: "500" }}>{invoice.schedule}</span>
                            </div>
                          </div>
                        ) : (
                          /* Overdue/In progress invoices - single row layout */
                          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr", gap: "16px 0", paddingTop: "12px" }}>
                            <div style={{ paddingRight: "8px" }}>
                              <span style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "4px" }}>Issue date</span>
                              <span style={{ color: "#0F172A", fontWeight: "500" }}>{invoice.issueDate}</span>
                            </div>
                            <div style={{ width: "1px", backgroundColor: "#E2E8F0", marginRight: "16px" }}></div>
                            <div style={{ paddingRight: "8px" }}>
                              <span style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "4px" }}>Due date</span>
                              <span style={{ color: "#0F172A", fontWeight: "500" }}>{invoice.dueDate}</span>
                            </div>
                            <div style={{ width: "1px", backgroundColor: "#E2E8F0", marginRight: "16px" }}></div>
                            <div style={{ paddingRight: "8px" }}>
                              <span style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "4px" }}>Price</span>
                              <span style={{ color: "#334155", fontWeight: "500", display: "block" }}>{invoice.price}</span>
                              {invoice.creditAmount && (
                                <span style={{ fontSize: "11px", color: "#005055", fontWeight: "500", display: "block" }}>
                                  {invoice.creditAmount}
                                </span>
                              )}
                            </div>
                            <div style={{ width: "1px", backgroundColor: "#E2E8F0", marginRight: "16px" }}></div>
                            <div>
                              <span style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "4px" }}>Schedule</span>
                              <span style={{ color: "#0F172A", fontWeight: "500" }}>{invoice.schedule}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              })()}
            </div>

            {/* Desktop Table View - Hidden on Mobile/Tablet */}
            <div className="hidden 2xl:block">
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
                  backgroundColor: "white",
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

      <SubmitRequestModal
        vehicle={undefined}
        isOpen={showSubmitRequestModal}
        onClose={closeSubmitRequestModal}
        onSubmitSuccess={handleSubmitSuccess}
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

      {/* Filter & Sort Full Screen */}
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
              {/* Status Section */}
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0F172A", marginBottom: "12px" }}>Status</h3>
                {[
                  { value: "paid", label: "Paid" },
                  { value: "in_progress", label: "In progress" },
                  { value: "overdue", label: "Overdue" }
                ].map((status) => (
                  <div
                    key={status.value}
                    className="flex items-center py-2 cursor-pointer"
                    onClick={() => {
                      setSelectedStatuses(
                        selectedStatuses.includes(status.value)
                          ? selectedStatuses.filter((item) => item !== status.value)
                          : [...selectedStatuses, status.value]
                      )
                    }}
                  >
                    <Checkbox
                      checked={selectedStatuses.includes(status.value)}
                      onCheckedChange={(checked) => {
                        setSelectedStatuses(
                          checked
                            ? [...selectedStatuses, status.value]
                            : selectedStatuses.filter((item) => item !== status.value)
                        )
                      }}
                      className="h-5 w-5 mr-3 border-slate-300 data-[state=checked]:bg-[#005055] data-[state=checked]:border-[#005055]"
                    />
                    <span style={{ fontSize: "14px", color: "#0F172A" }}>{status.label}</span>
                  </div>
                ))}
              </div>

              {/* Sort By Section */}
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0F172A", marginBottom: "12px" }}>Sort By</h3>
                {[
                  { value: "dueDate_asc", label: "Due date ascending" },
                  { value: "dueDate_desc", label: "Due date descending" },
                  { value: "issueDate_desc", label: "Issue date descending" }
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center py-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sortBy"
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
                  setSelectedStatuses([])
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
    </div>
  )
}
