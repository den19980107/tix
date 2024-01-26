'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ThsrcTicket } from "@/types/thsrc-ticket"
import ThsrcCard from "../booking/components/thsrc-card"

type ThsrcTicketListProps = {
  orders: ThsrcTicket[]
}
export default function ThsrcTicketList({ orders }: ThsrcTicketListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>高鐵訂單 ({orders.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel className="m-10">
          <CarouselContent>
            {orders.map(order => (
              <CarouselItem className="md:basis-1/3 lg:basis-1/3">
                <ThsrcCard ticket={order}></ThsrcCard>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  )
}
