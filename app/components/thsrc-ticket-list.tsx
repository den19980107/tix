'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ThsrcTicket } from "@/types/thsrc-ticket"
import ThsrcCard from "../booking/components/thsrc-card"

type ThsrcTicketListProps = {
  orders: ThsrcTicket[]
}
export default function ThsrcTicketList({ orders }: ThsrcTicketListProps) {
  if (orders.length == 0) {
    return <></>
  }

  return (
    <div>
      {/* <Card className="hidden lg:block lg:w-full"> */}
      {/*   <CardHeader> */}
      {/*     <CardTitle className="text-lg">高鐵訂單 ({orders.length})</CardTitle> */}
      {/*   </CardHeader> */}
      {/*   <CardContent> */}
      {/*     <Carousel className="md:mx-10"> */}
      {/*       <CarouselContent> */}
      {/*         {orders.map((order, index) => ( */}
      {/*           <CarouselItem key={index} className="basis-1/1 lg:basis-1/2 xl:basis-1/3"> */}
      {/*             <ThsrcCard ticket={order}></ThsrcCard> */}
      {/*           </CarouselItem> */}
      {/*         ))} */}
      {/*       </CarouselContent> */}
      {/*       <CarouselPrevious /> */}
      {/*       <CarouselNext /> */}
      {/*     </Carousel> */}
      {/*   </CardContent> */}
      {/* </Card> */}
      <div className="flex flex-col gap-y-4">
        {orders.map((order, index) => (
          <ThsrcCard key={index} ticket={order} className="w-full"></ThsrcCard>
        ))}
      </div>
    </div>
  )
}
