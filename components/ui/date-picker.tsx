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
          className="w-full rounded-lg border border-slate-200 !bg-white pl-3 pr-10 py-2.5 text-sm !text-slate-900 placeholder:!text-slate-500 focus:!border-slate-400 focus:outline-none focus:ring-1 focus:!ring-slate-400 text-left flex items-center"
        >
          <CalendarIcon className="mr-2 size-4 shrink-0 !text-slate-900" />
          <span className="flex-1 !text-slate-900">
            {date ? format(date, "dd.MM.yyyy") : <span className="!text-slate-500">{placeholder}</span>}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1 rounded-lg border !border-slate-200 !bg-white" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={(d) => d < today}
          className="!bg-white"
          classNames={{
            today: date ? "!bg-slate-100 !text-slate-900 rounded-md data-[selected=true]:rounded-none" : "",
            day_button: "!text-slate-900 data-[selected-single=true]:!bg-[#005055] data-[selected-single=true]:!text-white"
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
