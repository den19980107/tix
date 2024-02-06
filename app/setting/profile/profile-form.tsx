'use client'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UpdateProfile } from '@/types/profile'
import { useForm } from 'react-hook-form'

export default function ProfileForm() {
  const defaultValues: UpdateProfile = {
    username: '',
    id: '',
    phoneNumber: ''
  }

  const form = useForm<UpdateProfile>({
    defaultValues: defaultValues
  })

  const onAction = async () => {

  }

  return (
    <form
      action={onAction}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>使用者名稱</FormLabel>
              <FormControl>
                <Input type="text" className="w-full md:w-[300px]" {...field} />
              </FormControl>
              <FormDescription>
                請輸入使用者名稱
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>身分證字號</FormLabel>
              <FormControl>
                <Input type="text" className="w-full md:w-[300px]" {...field} />
              </FormControl>
              <FormDescription>
                請輸入身分證字號
              </FormDescription>
              <FormMessage />
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
                <Input type="text" className="w-full md:w-[300px]" {...field} />
              </FormControl>
              <FormDescription>
                請輸入手機號碼
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      </Form>
    </form>
  )
}
