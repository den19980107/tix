import prisma from "@/lib/prisma"
import ThsrcCard from "../booking/components/thsrc-card"

export default async function ThsrcTicketList() {
  const orders = await prisma.order.findMany()
  return (
    <div className="flex flex-col">
      {orders.map(order => <ThsrcCard ticket={order}></ThsrcCard>)}
    </div>
  )
}
