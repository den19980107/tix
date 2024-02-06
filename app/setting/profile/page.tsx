import BookingPageHeader from '@/app/booking/components/booking-page-header'
import React from 'react'
import ProfileForm from './profile-form'

export default function Profile() {
  return (
    <div className="space-y-6">
      <BookingPageHeader title="個人資料" subTitle="編輯個人資料，這些資料會在訂單中使用"></BookingPageHeader>
      <ProfileForm />
    </div>
  )
}
