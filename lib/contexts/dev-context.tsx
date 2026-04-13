"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

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

const STORAGE_KEY = "dev-settings"

const DevContext = createContext<DevContextType | undefined>(undefined)

export function DevProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<DevSettings>(defaultSettings)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setSettings({ ...defaultSettings, ...parsed })
      } catch {
        // Invalid JSON, use defaults
      }
    }
    setIsHydrated(true)
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    }
  }, [settings, isHydrated])

  const updateSettings = (updates: Partial<DevSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.removeItem(STORAGE_KEY)
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
