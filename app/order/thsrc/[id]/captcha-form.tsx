'use client'
import { completeOrder } from '@/app/actions/order/complete-order'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { FormButton } from '@/components/ui/form-button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { CompleteOrder } from '@/types/complete-order'
import { getThsrcStationName } from '@/types/thsrc-ticket'
import { Order } from '@prisma/client'
import { format } from 'date-fns'
import React from 'react'
import { useForm } from 'react-hook-form'
import OrderPageHeader from '../../components/order-page-header'

interface CaptchaFormProps {
  order: Order
}

export default function CaptchaForm({ order }: CaptchaFormProps) {
  const form = useForm<CompleteOrder>({
    defaultValues: {
      id: order.id,
      captcha: "",
    }
  })

  const onAction = async () => {
    const data = form.getValues()

    const err = await completeOrder(data.id, data.captcha)
    if (err) {
      toast({
        title: "驗證碼提交失敗",
        description: err.message,
      })
    }
  }

  return (
    <div className="flex flex-col">
      <OrderPageHeader title={`${getThsrcStationName(order.from)} 至 ${getThsrcStationName(order.to)}`} subTitle={format(order.departureDay, "yyyy-MM-dd")}></OrderPageHeader>
      <img src={`data:image/jpeg;base64,${order.captcha}`} className="w-full mb-4" />
      <form
        action={onAction}
        className="space-y-8"
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="captcha"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>驗證碼</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入驗證碼" className="mb-4" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormButton className="w-full">
            送出
          </FormButton>
        </Form>
      </form>
    </div >
  )
}
