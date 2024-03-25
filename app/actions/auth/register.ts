'use server'

import prisma from "@/lib/prisma";
import { ActionError } from "@/types/action";
import { CreateUser, UpdateUser } from "@/types/auth";
import { redirect } from "next/navigation";
import { hash } from 'bcrypt'
import { revalidatePath } from "next/cache";

const saltRounds = 10;

export async function createUser(user: CreateUser): Promise<ActionError> {
  try {
    const hashedPassword = await hash(user.password, saltRounds)
    user.password = hashedPassword

    await prisma.user.create({
      data: user,
    })
  } catch (err) {
    return {
      message: `create user failed, err: ${err}`
    }
  }

  redirect("/auth/signin")
}

export async function updateUser(user: UpdateUser): Promise<ActionError> {
  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        idNumber: user.idNumber,
        phoneNumber: user.phoneNumber,
      }
    })

    revalidatePath("/setting/profile")
    redirect("/setting/profile")

  } catch (err) {
    return {
      message: `update user failed, err: ${err}`
    }
  }
}
