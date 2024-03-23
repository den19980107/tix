import { ActionError } from "@/types/action"
import { CompleteOrder } from "@/types/complete-order"
import { redirect } from "next/navigation"

export async function completeOrder(data: CompleteOrder): Promise<ActionError> {
  const apiUrl = `${process.env.TIX_WORKER_URL}/api/order/complete`
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const json = await res.json()

  if (res.status != 200) {
    return {
      message: json.error
    }
  }

  redirect("/")
}
