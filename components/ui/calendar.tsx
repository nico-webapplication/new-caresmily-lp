"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  className?: string
  mode?: "single" | "multiple" | "range"
  locale?: string
  showOutsideDays?: boolean
}

const DAYS_OF_WEEK = ["日", "月", "火", "水", "木", "金", "土"]
const MONTHS = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月"
]

function Calendar({
  selected,
  onSelect,
  disabled,
  className,
  mode = "single",
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(selected || new Date())
  const [viewDate, setViewDate] = React.useState(new Date())

  const today = new Date()
  
  // Get the first day of the month and calculate grid
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)
  const lastDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  // Calculate previous month days to show
  const prevMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 0)
  const prevMonthDays = prevMonth.getDate()

  // Generate calendar grid
  const calendarDays = []
  
  // Previous month days
  if (showOutsideDays) {
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthDays - i
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, day)
      calendarDays.push({ date, isCurrentMonth: false, isPrevMonth: true })
    }
  } else {
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(null)
    }
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    calendarDays.push({ date, isCurrentMonth: true, isPrevMonth: false })
  }

  // Next month days to fill the grid
  const remainingCells = 42 - calendarDays.length // 6 rows × 7 days
  if (showOutsideDays) {
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, day)
      calendarDays.push({ date, isCurrentMonth: false, isPrevMonth: false })
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setViewDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleDateSelect = (date: Date) => {
    if (disabled && disabled(date)) return
    
    setCurrentDate(date)
    onSelect?.(date)
  }

  const isSelected = (date: Date) => {
    if (!selected) return false
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    )
  }

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isDisabled = (date: Date) => {
    return disabled ? disabled(date) : false
  }

  return (
    <div className={cn("p-4 bg-background border rounded-lg shadow-sm", className)} {...props}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth('prev')}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">
            {viewDate.getFullYear()}年{MONTHS[viewDate.getMonth()]}
          </h2>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth('next')}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayData, index) => {
          if (!dayData) {
            return <div key={index} className="h-9" />
          }

          const { date, isCurrentMonth } = dayData
          const selected = isSelected(date)
          const today = isToday(date)
          const disabled = isDisabled(date)

          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={cn(
                "h-9 w-9 p-0 font-normal text-sm",
                !isCurrentMonth && "text-muted-foreground/50",
                today && "bg-accent text-accent-foreground font-semibold",
                selected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                disabled && "text-muted-foreground/30 cursor-not-allowed",
                "hover:bg-accent hover:text-accent-foreground transition-colors"
              )}
              disabled={disabled}
              onClick={() => handleDateSelect(date)}
            >
              {date.getDate()}
            </Button>
          )
        })}
      </div>

      {/* Quick navigation */}
      <div className="flex items-center justify-center mt-4 pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setViewDate(today)
            handleDateSelect(today)
          }}
          className="text-xs"
        >
          今日
        </Button>
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
export type { CalendarProps }