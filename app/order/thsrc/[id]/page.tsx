import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import Alert from '@/app/components/alert'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/dist/client/components/navigation'
import React from 'react'
import CaptchaForm from './captcha-form'

interface ThsrcOrderProps {
  params: ThsrcOrderParams
}

interface ThsrcOrderParams {
  id: string
}

export default async function ThsrcOrderPage({ params }: ThsrcOrderProps) {
  const orderId = parseInt(params.id, 10)
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/auth/signin")
  }

  if (session.error) {
    return <Alert title="取得使用者資訊失敗" description={session.error}></Alert>
  }


  if (isNaN(orderId)) {
    return <Alert title="取得訂單失敗" description="輸入的訂單編號格式不正確！"></Alert>
  }


  const order = await prisma.order.findFirst({ where: { id: orderId, creatorId: session.user.id } })

  if (!order) {
    return <Alert title="取得訂單失敗" description="找不到此訂單！"></Alert>
  }

  if (order.captcha === "" || order.jsessionId === "") {
    return <Alert title="訂單尚未被執行" description="請在收到通知輸入驗證碼 email 後再打開此頁面"></Alert>
  }

  return (
    <CaptchaForm order={order}></CaptchaForm>
  )
}

