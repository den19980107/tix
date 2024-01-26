import prisma from "@/lib/prisma"
import ThsrcTicketList from "./components/thsrc-ticket-list"
import PageHeader from "./page-header"

export default async function IndexPage() {
  const orders = await prisma.order.findMany()
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <PageHeader title="首頁" subTitle="一個訂票服務" ></PageHeader>
      <ThsrcTicketList orders={orders}></ThsrcTicketList>
    </div>
  )
}
