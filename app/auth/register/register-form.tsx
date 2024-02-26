'use client'
import { createUser } from '@/app/actions/auth/register'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { FormButton } from '@/components/ui/form-button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

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
                <Input type="text" className="w-full md:w-[300px]" {...field} />
              </FormControl>
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
          <FormButton className="w-full mb-2">
            註冊
          </FormButton>
          <FormDescription className="mt-2">
            已經有帳號了嗎?
          </FormDescription>
          <FormButton variant="secondary" className="w-full" >
            <Link href="/auth/signin">
              登入
            </Link>
          </FormButton>
        </div>
      </Form>
    </form >
  )
}
