'use server'
import { ActionError } from "@/types/action"
import { redirect } from "next/navigation"
import fetch from 'node-fetch'

export async function completeOrder(orderId: number, captcha: string): Promise<ActionError> {
  const apiUrl = `${process.env.TIX_WORKER_URL}/api/order/${orderId}/setCaptcha`
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      captcha: captcha
    })
  })

  const json: any = await res.json()

  if (res.status != 200) {
    console.log(`set order captcha failed, res: ${JSON.stringify(res)}`)
    return {
      message: json.error
    }
  }

  console.log(`set order captcha sucess, redirect to home page`)
  redirect("/")
}
