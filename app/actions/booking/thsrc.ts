'use server'

import prisma from "@/lib/prisma"
import { CreateThsrcTicket, ThsrcTicket } from "@/types/thsrc-ticket"
import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/client/components/navigation"

type CreateThsrcTicketError = {
  error?: string
}

export async function createThsrcOrder(ticket: ThsrcTicket): Promise<CreateThsrcTicketError | null> {
  const order: CreateThsrcTicket = {
    from: ticket.from,
    to: ticket.to,
    departureDay: ticket.departureDay,
    startTime: ticket.startTime,
    endTime: ticket.endTime,
    execDay: ticket.execDay,
    creatorId: 1,
  }


  try {
    await prisma.order.create({
      data: order,
    })
  } catch (err) {
    return {
      error: `create order failed, err: ${err}`
    }
  }

  revalidatePath("/")
  redirect("/")
}

export async function test() {
  await new Promise(r => setTimeout(r, 2000));
}
