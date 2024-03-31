'use server'
import prisma from "@/lib/prisma";
import { ThsrcTicket, ThsrcTicketStatus } from "@/types/thsrc-ticket";

export async function getOrders(userId: number, status: ThsrcTicketStatus | null): Promise<ThsrcTicket[]> {
  let filter: any = { creatorId: userId }
  if (status) {
    filter["status"] = status
  }
  const orders = await prisma.order.findMany({ where: filter })
  return orders as ThsrcTicket[]
}
