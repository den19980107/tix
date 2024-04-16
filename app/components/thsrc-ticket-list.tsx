'use client'
import { ThsrcTicket } from "@/types/thsrc-ticket"
import ThsrcCard from "./thsrc-card"

type ThsrcTicketListProps = {
  orders: ThsrcTicket[]
}
export default function ThsrcTicketList({ orders }: ThsrcTicketListProps) {
  if (orders.length == 0) {
    return <></>
  }

  return (
    <div>
      <div className="flex flex-col gap-y-4">
        {orders.map((order, index) => (
          <ThsrcCard key={index} ticket={order} className="w-full"></ThsrcCard>
        ))}
      </div>
    </div>
  )
}
