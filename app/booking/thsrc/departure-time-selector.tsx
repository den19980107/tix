import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from 'react'
import { ControllerRenderProps } from 'react-hook-form';


export default function DepartureTimeSelector(props: ControllerRenderProps<any, any>) {
  const time = generateTimes()

  return (
    <Select {...props} onValueChange={props.onChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        {time.map(t => <SelectItem value={t}>{t}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}

function generateTimes(): string[] {
  const times: string[] = [];

  // Generate the times and add them to the array
  for (let hour = 5; hour <= 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      let hourStr = hour.toString()
      if (hour === 24) {
        hourStr = "0"
      }
      times.push(`${hourStr.padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      if (hour === 24) {
        break
      }
    }
  }

  return times;
}
