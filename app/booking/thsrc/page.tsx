'use client'
import BookingPageHeader from "../components/booking-page-header";
import ThsrcForm from "./thsrc-form";

export default function ThsrcPage() {
  return (
    <div className="space-y-6">
      <BookingPageHeader title="高鐵" subTitle="選取你想要訂購的出發站、抵達站，並選取可接受的時間，系統會在您指定的時間自動搶票"></BookingPageHeader>
      <ThsrcForm />
    </div>
  )
}
