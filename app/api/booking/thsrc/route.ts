import prisma from "@/lib/prisma"
import { ThsrcTicket } from "@/types/thsrc-ticket"

export async function POST(req: Request) {
  const order: ThsrcTicket = await req.json()

  try {
    await prisma.order.create({
      data: {
        from: order.from,
        to: order.to,
        departureDay: order.departureDay,
        startTime: order.startTime,
        endTime: order.endTime,
        execDay: order.execDay,
        creatorId: 1,
      },
    })
  } catch (err) {
    return new Response(`create order failed, err: ${err}`, { status: 500 })
  }

  return new Response("OK")
}
