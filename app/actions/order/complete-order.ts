import { ActionError } from "@/types/action"
import { CompleteOrder } from "@/types/complete-order"
import { redirect } from "next/navigation"

export async function setCaptcha(data: CompleteOrder): Promise<ActionError> {
  const apiUrl = `${process.env.NEXT_PUBLIC_TIX_WORKER_URL}/api/order/setCaptcha`
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const json = await res.json()

  if (res.status != 200) {
    console.log(`set order captcha failed, res: ${JSON.stringify(res)}`)
    return {
      message: json.error
    }
  }

  console.log(`set order captcha sucess, redirect to home page`)
  redirect("/")
}
