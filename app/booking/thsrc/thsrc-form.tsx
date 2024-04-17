'use client';

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import StationSelector from "./station-selector";
import { CreateThsrcTicket, ThsrcTicketStatus } from "@/types/thsrc-ticket";
import { useToast } from "@/components/ui/use-toast";
import { createThsrcOrder } from "@/app/actions/booking/thsrc";
import { FormButton } from "@/components/ui/form-button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DepartureTimeSelector from "./departure-time-selector";

export default function ThsrcForm() {
  const { data: session } = useSession()
  if (!session || !session.user) {
    redirect("/auth/login")
  }

  const { toast } = useToast()
  const now = new Date()
  const { startTime, endTime } = getStartAndEndTime(now)
  const defaultValues: CreateThsrcTicket = {
    from: "1",
    to: "12",
    departureDay: now,
    startTime: startTime,
    endTime: endTime,
    execDay: now,
    creatorId: session?.user?.id,
    captcha: "",
    jsessionId: "",
    status: ThsrcTicketStatus.pending,
    errorMessage: ""
  }

  const form = useForm<CreateThsrcTicket>({
    defaultValues: defaultValues
  })

  const handleStartTimeChange = (value: string) => {
    form.setValue("startTime", value)
    form.setValue("endTime", value)
  }

  const onAction = async () => {
    const ticket = form.getValues()
    const err = await createThsrcOrder(ticket)

    if (err) {
      toast({
        title: "新增失敗",
        description: `錯誤訊息：${err.message}`
      })
    } else {
      toast({
        title: "新增成功",
        description: `已新增 ${format(ticket.departureDay, "yyyy-MM-dd")} 由 ${ticket.from} 至 ${ticket.to} 的訂單`
      })
    }
  }


  return (
    <form
      action={onAction}
      className="space-y-8">
      <Form {...form}>
        <div className="grid gap-7 md:grid-cols-2">
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
                        "w-full md:w-[300px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
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

        <div className="grid gap-7 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>最早出發時間</FormLabel>
                <FormControl>
                  <DepartureTimeSelector {...field} onValueChange={handleStartTimeChange}></DepartureTimeSelector>
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
                  <DepartureTimeSelector {...field} onValueChange={field.onChange}></DepartureTimeSelector>
                </FormControl>
                <FormDescription>
                  系統不會搶比這個時間晚的票
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                        "w-full md:w-[300px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
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
        <FormButton>
          送出
        </FormButton>
      </Form >
    </form>
  )
}


type GetStartAndEndHourTime = {
  startTime: string,
  endTime: string,
}

const getStartAndEndTime = (date: Date): GetStartAndEndHourTime => {
  let startHour = date.getHours()
  let endHour = startHour + 2

  const result: GetStartAndEndHourTime = {
    startTime: "",
    endTime: ""
  }

  if (startHour >= 24) {
    startHour = startHour - 24
  }

  if (endHour >= 24) {
    endHour = endHour - 24
  }

  if (startHour < 5 && startHour > 0) {
    startHour = 5
  }

  if (endHour < 5 && endHour > 0) {
    endHour = startHour
  }


  if (startHour < 10) {
    result.startTime = `0${startHour}:00`
  } else {
    result.startTime = `${startHour}:00`
  }

  if (endHour < 10) {
    result.endTime = `0${endHour}:00`
  } else {
    result.endTime = `${endHour}:00`
  }

  return result
}
