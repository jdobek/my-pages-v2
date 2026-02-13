"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  value?: string
  onChange?: (date: string) => void
  placeholder?: string
}

export function DatePicker({ value, onChange, placeholder = "Pick a date" }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  )
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (value && !date) {
      setDate(new Date(value))
    }
  }, [value, date])

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      onChange?.(formattedDate)
      setOpen(false)
    }
  }

  // Get today's date at midnight for proper comparison
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-full rounded-lg border border-slate-200 bg-white pl-3 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 text-left flex items-center"
        >
          <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="flex-1">
            {date ? format(date, "dd.MM.yyyy") : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1 rounded-lg border border-slate-200" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={(d) => d < today}
          classNames={{
            today: date ? "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none" : "",
            day_button: "data-[selected-single=true]:bg-[#005055] data-[selected-single=true]:text-white"
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
