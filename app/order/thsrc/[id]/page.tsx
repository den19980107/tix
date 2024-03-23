import Alert from '@/app/components/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import prisma from '@/lib/prisma'
import { getThsrcStationName } from '@/types/thsrc-ticket'
import { format } from 'date-fns'
import React from 'react'
import OrderPageHeader from '../../components/order-page-header'

interface ThsrcOrderProps {
  params: ThsrcOrderParams
}

interface ThsrcOrderParams {
  id: string
}

export default async function ThsrcOrderPage({ params }: ThsrcOrderProps) {
  const orderId = parseInt(params.id, 10)

  if (isNaN(orderId)) {
    return <Alert title="取得訂單失敗" description="輸入的訂單編號格式不正確！"></Alert>
  }


  const order = await prisma.order.findFirst({ where: { id: orderId } })

  if (!order) {
    return <Alert title="取得訂單失敗" description="找不到此訂單！"></Alert>
  }

  if (order.captcha === "" || order.jsessionId === "") {
    return <Alert title="訂單尚未被執行" description="請在收到通知輸入驗證碼 email 後在打開此頁面"></Alert>
  }

  return (
    <div className="flex flex-col">
      <OrderPageHeader title={`${getThsrcStationName(order.from)} 至 ${getThsrcStationName(order.to)}`} subTitle={format(order.departureDay, "yyyy-MM-dd")}></OrderPageHeader>
      <img src={`data:image/jpeg;base64,${order.captcha}`} className="w-full mb-4" />
      <Input placeholder="請輸入驗證碼" className="mb-4"></Input>
      <Button>送出</Button>
    </div >
  )
}

