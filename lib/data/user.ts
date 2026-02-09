import { User } from "./types"

export const currentUser: User = {
  id: "user-001",
  firstName: "Jakub",
  lastName: "Dobek",
  totalVehicles: 24,
  totalPremium: 217618.00,
  totalPremiumWithoutTFA: 146498.00,
  avgVehicleInsurancePrice: 6104.08,
  riskScore: 7,
  vehicles: [
    {
      id: "vehicle-001",
      plateNumber: "WB1AG2000000001",
      model: "BMW 3 Series",
      age: 5,
      price: 45000,
      priceWithTFA: 47250,
      coverLevel: "Full Coverage",
      addOns: ["Roadside Assistance", "Glass Protection"],
      startDate: "2023-01-15",
      renewalDate: "2024-01-15",
    },
    {
      id: "vehicle-002",
      plateNumber: "WB1BG3000000002",
      model: "BMW X5",
      age: 2,
      price: 75000,
      priceWithTFA: 78750,
      coverLevel: "Full Coverage",
      addOns: ["Roadside Assistance", "Personal Belongings", "Legal Protection"],
      startDate: "2023-06-20",
      renewalDate: "2024-06-20",
    },
  ],
}
