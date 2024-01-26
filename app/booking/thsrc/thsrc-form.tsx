'use client';

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import StationSelector from "./station-selector";
import { useRouter } from "next/navigation";

export type ThsrcFormValues = {
  from: string
  to: string
  departureDay: Date
  startTime: string
  endTime: string
  execDay: Date
}

export default function ThsrcForm() {
  const router = useRouter()
  const form = useForm<ThsrcFormValues>()

  const onSubmit = async () => {
    const res = await fetch("/api/booking/thsrc", {
      method: "POST",
      body: JSON.stringify(form.getValues())
    })

    if (res.ok) {
      router.push("/")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <div className="flex">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>出發站</FormLabel>
                <FormControl>
                  <StationSelector onValueChange={field.onChange} defaultValue={field.value}></StationSelector>
                </FormControl>
                <FormDescription>
                  選擇您要從哪裡搭乘高鐵出發
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>抵達站</FormLabel>
                <FormControl>
                  <StationSelector onValueChange={field.onChange} defaultValue={field.value}></StationSelector>
                </FormControl>
                <FormDescription>
                  選擇您要搭乘高鐵前往哪裏
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="departureDay"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-2" style={{ height: "17px" }}>出發日</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>選擇一個日期</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                選擇您要出發的日期
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>最早出發時間</FormLabel>
                <FormControl>
                  <Input type="time" className="w-[240px]" {...field} />
                </FormControl>
                <FormDescription>
                  系統不會搶比這個時間早的票
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>最晚出發時間</FormLabel>
                <FormControl>
                  <Input type="time" className="w-[240px]" {...field} />
                </FormControl>
                <FormDescription>
                  系統不會搶比這個時間晚的票
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex">
          <FormField
            control={form.control}
            name="execDay"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2" style={{ height: "17px" }}>搶票日</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>選擇一個日期</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  選擇高鐵開放搶票的日期
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">送出</Button>
      </form>
    </Form >
  )
}
