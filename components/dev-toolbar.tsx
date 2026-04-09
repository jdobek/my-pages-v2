"use client"

import { useState } from "react"
import { Settings, RotateCcw, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDevSettings } from "@/lib/contexts/dev-context"

export function DevToolbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { settings, updateSettings, resetSettings } = useDevSettings()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="h-10 w-10 rounded-full bg-[#005055] hover:bg-[#003c3f] shadow-lg"
          >
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-white" />
            ) : (
              <Settings className="h-4 w-4 text-white" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          side="top"
          className="w-[320px] p-4"
          sideOffset={8}
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <h3 className="font-semibold">Dev Toolbar</h3>
              </div>
              <span className="text-xs text-muted-foreground">Gallery</span>
            </div>

            {/* Dashboard Version Toggle */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Dashboard version</label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={settings.dashboardVersion === "current" ? "default" : "outline"}
                  onClick={() => updateSettings({ dashboardVersion: "current" })}
                  className={
                    settings.dashboardVersion === "current" ? "bg-[#005055] hover:bg-[#003c3f]" : ""
                  }
                >
                  Current
                </Button>
                <Button
                  size="sm"
                  variant={settings.dashboardVersion === "new" ? "default" : "outline"}
                  onClick={() => updateSettings({ dashboardVersion: "new" })}
                  className={
                    settings.dashboardVersion === "new" ? "bg-[#005055] hover:bg-[#003c3f]" : ""
                  }
                >
                  New
                </Button>
              </div>
            </div>

            {/* Show Overdue Invoices Toggle */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Show overdue invoices</label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={!settings.showOverdueInvoices ? "default" : "outline"}
                  onClick={() => updateSettings({ showOverdueInvoices: false })}
                  className={
                    !settings.showOverdueInvoices ? "bg-[#005055] hover:bg-[#003c3f]" : ""
                  }
                >
                  No
                </Button>
                <Button
                  size="sm"
                  variant={settings.showOverdueInvoices ? "default" : "outline"}
                  onClick={() => updateSettings({ showOverdueInvoices: true })}
                  className={
                    settings.showOverdueInvoices ? "bg-[#005055] hover:bg-[#003c3f]" : ""
                  }
                >
                  Yes
                </Button>
              </div>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={resetSettings}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset all data
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
