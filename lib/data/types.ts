export interface Vehicle {
  id: string
  plateNumber: string
  model: string
  age: number
  price: number
  priceWithTFA: number
  coverLevel: string
  addOns: string[]
  startDate: string
  renewalDate: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  totalVehicles: number
  totalPremium: number
  totalPremiumWithoutTFA: number
  avgVehicleInsurancePrice: number
  riskScore: number
  vehicles: Vehicle[]
}
