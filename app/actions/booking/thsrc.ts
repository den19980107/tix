'use server'

import prisma from "@/lib/prisma"
import { ActionError } from "@/types/action"
import { CreateThsrcTicket, ThsrcTicket } from "@/types/thsrc-ticket"
import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/client/components/navigation"


export async function createThsrcOrder(ticket: CreateThsrcTicket): Promise<ActionError> {
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
      message: `create order failed, err: ${err}`
    }
  }

  revalidatePath("/")
  redirect("/")
}

export async function deleteThsrcOrder(id: number): Promise<ActionError> {
  try {
    await prisma.order.delete({ where: { id: id } })
  } catch (err) {
    return {
      message: `delete order failed, err: ${err}`
    }
  }

  revalidatePath("/")
  return null
}
