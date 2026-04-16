export type Invoice = {
  number: string
  issueDate: string
  dueDate: string
  price: string
  creditAmount?: string
  status: "overdue" | "paid"
  schedule: string
  creditNote?: string
}

export const baseInvoices: Invoice[] = [
  { number: "300675", issueDate: "01.03.2026", dueDate: "15.03.2026", price: "8 027,48 kr", status: "overdue", schedule: "Monthly" },
  { number: "300674", issueDate: "01.02.2026", dueDate: "15.02.2026", price: "8 027,48 kr", status: "overdue", schedule: "Monthly" },
  { number: "300673", issueDate: "01.01.2026", dueDate: "15.01.2026", price: "13 000 kr", status: "paid", schedule: "Monthly" },
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

// Helper to parse date from DD.MM.YYYY format
export function parseInvoiceDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split(".").map(Number)
  return new Date(year, month - 1, day)
}

// Get overdue invoices
export function getOverdueInvoices(): Invoice[] {
  return baseInvoices.filter(inv => inv.status === "overdue")
}

// Get the oldest overdue invoice
export function getOldestOverdueInvoice(): Invoice | null {
  const overdue = getOverdueInvoices()
  if (overdue.length === 0) return null

  return overdue.reduce((oldest, current) => {
    const oldestDate = parseInvoiceDate(oldest.dueDate)
    const currentDate = parseInvoiceDate(current.dueDate)
    return currentDate < oldestDate ? current : oldest
  })
}

// Calculate days overdue for an invoice (matches invoices page calculation)
export function getDaysOverdue(invoice: Invoice): number {
  const dueDate = parseInvoiceDate(invoice.dueDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  dueDate.setHours(0, 0, 0, 0)
  const diffTime = today.getTime() - dueDate.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
