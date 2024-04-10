'use client'
import { createUser } from '@/app/actions/auth/register'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { FormButton } from '@/components/ui/form-button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { RotateCw } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TaiwanIdNumberGenerator } from './system-generated-id-number'

export default function RegisterForm() {

  const form = useForm<{ username: string, password: string, idNumber: string, phoneNumber: string }>({
    defaultValues: { username: "", password: "", idNumber: "", phoneNumber: "" }
  })

  const onAction = async () => {
    const user = form.getValues()
    const err = await createUser({
      username: user.username,
      password: user.password,
      phoneNumber: user.phoneNumber,
      idNumber: user.idNumber
    })

    if (err) {
      toast({
        title: "註冊失敗",
        description: `錯誤訊息：${err.message}`
      })
    } else {
      toast({
        title: "註冊成功",
        description: `請至登入頁面登入`
      })
    }
  }
  return (
    <form
      action={onAction}
      className="space-y-8">
      <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>帳號</FormLabel>
              <FormControl>
                <Input type="email" className="w-full md:w-[300px]" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>密碼</FormLabel>
              <FormControl>
                <Input type="password" className="w-full md:w-[300px]" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>身分證字號</FormLabel>
              <FormControl>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="text" className="w-full md:w-[300px]" {...field} />
                  <Button type="button" onClick={() => form.setValue("idNumber", new TaiwanIdNumberGenerator().generate())}>
                    <RotateCw></RotateCw>
                  </Button>
                </div>
              </FormControl>
              <FormDescription className="mt-2 mb-2">
                領票時需使用此身分證字號末四碼，如使用隨機產生請記住此身份證號碼
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>手機號碼</FormLabel>
              <FormControl>
                <Input type="tel" className="w-full md:w-[300px]" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="mt-2">
          <FormButton type="submit" className="w-full mb-2">
            註冊
          </FormButton>
          <FormDescription className="mt-2 mb-2">
            已經有帳號了嗎?
          </FormDescription>

          <Button asChild className="w-full" variant="outline">
            <Link href="/auth/signin">
              登入
            </Link>
          </Button>
        </div>
      </Form>
    </form >
  )
}
