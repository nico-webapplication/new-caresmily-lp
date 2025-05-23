"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center mb-4",
        caption_label: "text-base font-semibold text-gray-900",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-8 w-8 bg-transparent p-0 opacity-60 hover:opacity-100 hover:bg-blue-50 rounded-full transition-all duration-200 flex items-center justify-center"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex mb-2",
        head_cell: "text-gray-500 rounded-md w-10 h-10 font-medium text-sm flex items-center justify-center",
        row: "flex w-full mt-1",
        cell: "relative h-10 w-10 text-center text-sm p-0 focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-blue-50 [&:has([aria-selected].day-outside)]:bg-blue-50/50 rounded-md",
        day: cn(
          "h-10 w-10 p-0 font-normal rounded-md hover:bg-blue-100 hover:text-blue-700 transition-all duration-150 flex items-center justify-center focus:bg-blue-100 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-700 focus:text-white font-semibold shadow-sm",
        day_today: "bg-blue-100 text-blue-700 font-semibold border border-blue-200",
        day_outside: "text-gray-400 opacity-50 hover:bg-gray-50 hover:text-gray-500",
        day_disabled: "text-gray-300 opacity-30 cursor-not-allowed hover:bg-transparent hover:text-gray-300",
        day_range_middle: "aria-selected:bg-blue-50 aria-selected:text-blue-700",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
