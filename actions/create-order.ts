"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const createOrder = async (formData: FormData) => {
  const from = formData.get("from")
  const to = formData.get("to")
  const departureDay = formData.get("departureDay")
  const startTime = formData.get("startTime")
  const endTime = formData.get("endTime")
  const execDay = formData.get("execDay")

  console.log({
    from, to, departureDay, startTime, endTime, execDay
  })

  // await prisma.order.create({
  //   data: {
  //     from: from as string,
  //     to: to as string,
  //     startTime: new Date(startTime as string).toISOString(),
  //     endTime: new Date(endTime as string).toISOString(),
  //     execTime: new Date(execTime as string).toISOString(),
  //     creatorId: 1,
  //   },
  // })

  revalidatePath("/booking")
}
