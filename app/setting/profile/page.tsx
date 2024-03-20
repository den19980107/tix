import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import BookingPageHeader from '@/app/booking/components/booking-page-header'
import { toast } from '@/components/ui/use-toast'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import ProfileForm from './profile-form'

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const user = await prisma.user.findFirst({ where: { id: session?.user?.id } })

  if (!user) {
    toast({
      title: "找不到使用者",
      description: "請重新登入一次"
    })

    redirect("/auth/login")
  }

  return (
    <div className="space-y-6">
      <BookingPageHeader title="個人資料" subTitle="編輯個人資料，這些資料會在訂單中使用"></BookingPageHeader>
      <ProfileForm user={user} />
    </div>
  )
}
