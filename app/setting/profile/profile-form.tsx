'use client'
import { updateUser } from '@/app/actions/auth/register'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { FormButton } from '@/components/ui/form-button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { UpdateUser, User } from '@/types/auth'
import { UpdateProfile } from '@/types/profile'
import { useForm } from 'react-hook-form'

type ProfileProps = {
  user: User
}

export default function ProfileForm({ user }: ProfileProps) {
  const defaultValues: UpdateUser = {
    id: user.id,
    idNumber: user.idNumber,
    phoneNumber: user.phoneNumber
  }

  const form = useForm<UpdateUser>({
    defaultValues: defaultValues
  })

  const onAction = async () => {
    const user = form.getValues()
    const err = await updateUser(user)
    if (err) {
      toast({
        title: "更新個人資料失敗",
        description: err.message,
      })
    } else {
      toast({
        title: "更新個人資料成功",
      })
    }
  }

  return (
    <form
      action={onAction}
      className="space-y-8"
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>身分證字號</FormLabel>
              <FormControl>
                <Input type="text" className="w-full md:w-[300px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>手機號碼</FormLabel>
              <FormControl>
                <Input type="text" className="w-full md:w-[300px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormButton>
          更新
        </FormButton>

      </Form>
    </form>
  )
}
