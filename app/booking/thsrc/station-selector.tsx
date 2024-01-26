import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SelectProps } from '@radix-ui/react-select'
import React from 'react'


export default function StationSelector({ ...props }: SelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full md:w-[300px]">
        <SelectValue placeholder="南港" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">南港</SelectItem>
          <SelectItem value="2">台北</SelectItem>
          <SelectItem value="3">板橋</SelectItem>
          <SelectItem value="4">桃園</SelectItem>
          <SelectItem value="5">新竹</SelectItem>
          <SelectItem value="6">苗栗</SelectItem>
          <SelectItem value="7">台中</SelectItem>
          <SelectItem value="8">彰化</SelectItem>
          <SelectItem value="9">雲林</SelectItem>
          <SelectItem value="10">嘉義</SelectItem>
          <SelectItem value="11">台南</SelectItem>
          <SelectItem value="12">左營</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
