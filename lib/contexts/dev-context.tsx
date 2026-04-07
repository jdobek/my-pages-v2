"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface DevSettings {
  user: string
  role: string
  products: string[]
  preset: string
  buyMoreButton: string
  showBanner: boolean
  showOverdueInvoices: boolean
}

interface DevContextType {
  settings: DevSettings
  updateSettings: (updates: Partial<DevSettings>) => void
  resetSettings: () => void
}

const defaultSettings: DevSettings = {
  user: "jakub-dobek",
  role: "driver",
  products: ["triplog", "map", "equipment-control", "driving-behaviour", "reports-centre"],
  preset: "enterprise",
  buyMoreButton: "sidebar",
  showBanner: false,
  showOverdueInvoices: true,
}

const DevContext = createContext<DevContextType | undefined>(undefined)

export function DevProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<DevSettings>(defaultSettings)

  const updateSettings = (updates: Partial<DevSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  return (
    <DevContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </DevContext.Provider>
  )
}

export function useDevSettings() {
  const context = useContext(DevContext)
  if (context === undefined) {
    throw new Error("useDevSettings must be used within a DevProvider")
  }
  return context
}
