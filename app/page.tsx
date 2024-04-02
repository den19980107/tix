import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import prisma from "@/lib/prisma"
import { ThsrcTicket } from "@/types/thsrc-ticket";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import TicketTab from "./components/ticket-tab";
import PageHeader from "./page-header"

export default async function IndexPage() {
  const session = await getServerSession(authOptions);
  const orders = await prisma.order.findMany({ where: { creatorId: session?.user?.id } })

  return (
    <div className="space-y-6 py-10 md:block md:p-10">
      <PageHeader title="首頁 123" subTitle="一個訂票服務" ></PageHeader>
      {
        orders.length === 0
          ?
          <Alert>
            <AlertTitle>還沒有新增任何訂單</AlertTitle>
            <AlertDescription className="mt-4 hidden md:block">
              {`點擊導航欄中的 "訂票" 連結開始訂票`}
            </AlertDescription>
            <AlertDescription className="mt-4 md:hidden">
              {`點擊左上角漢堡按鈕打開選單，點擊 "訂票" 連結開始訂票`}
            </AlertDescription>
          </Alert>
          :
          <TicketTab initialOrders={orders as ThsrcTicket[]}></TicketTab>
      }
    </div>
  )
}
