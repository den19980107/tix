import prisma from "@/lib/prisma"
import { ThsrcTicket } from "@/types/thsrc-ticket"
import { revalidatePath } from "next/cache"

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
    return new Response(`{"error": "create order failed, err: ${err}"}`, { status: 500 })
  }

  revalidatePath("/")
  return new Response("OK")
}
