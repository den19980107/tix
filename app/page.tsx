import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ThsrcTicketList from "./components/thsrc-ticket-list"
import PageHeader from "./page-header"

export default async function IndexPage() {
  const session = await getServerSession(authOptions);
  const orders = await prisma.order.findMany({ where: { creatorId: session?.user?.id } })

  return (
    <div className="space-y-6 py-10 md:block md:p-10">
      <PageHeader title="首頁" subTitle="一個訂票服務" ></PageHeader>
      <ThsrcTicketList orders={orders}></ThsrcTicketList>
    </div>
  )
}
