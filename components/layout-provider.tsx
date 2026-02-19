"use client"

import { Sidebar07 } from "@/components/sidebar-07"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

interface LayoutProviderProps {
  children: React.ReactNode
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  return (
    <SidebarProvider>
      <Sidebar07 />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
