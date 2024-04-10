'use server'

import prisma from "@/lib/prisma";
import { ActionError } from "@/types/action";
import { CreateUser, UpdateUser } from "@/types/auth";
import { redirect } from "next/navigation";
import { hash } from 'bcrypt'
import { revalidatePath } from "next/cache";
import { isNationalIdentificationNumberValid } from "./id-number-validator";
import { isPhoneNumberValid } from "./phone-number-validator";
import { Prisma } from "@prisma/client";

const saltRounds = 10;

export async function createUser(user: CreateUser): Promise<ActionError> {
  // validate input
  if (!isNationalIdentificationNumberValid(user.idNumber)) {
    return {
      message: `輸入的身分證字號無效`
    }
  }

  if (!isPhoneNumberValid(user.phoneNumber)) {
    return {
      message: `輸入的電話號碼無效`
    }
  }

  try {
    const hashedPassword = await hash(user.password, saltRounds)
    user.password = hashedPassword

    await prisma.user.create({
      data: user,
    })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return {
          message: `您輸入的帳號 "${user.username}" 已經被使用過了，請選擇別的使用者名稱`
        }
      }
    }

    return {
      message: "系統錯誤，請稍後再試"
    }
  }

  redirect("/auth/signin")
}

export async function updateUser(user: UpdateUser): Promise<ActionError> {
  // validate input
  if (!isNationalIdentificationNumberValid(user.idNumber)) {
    return {
      message: `輸入的身分證字號無效`
    }
  }

  if (!isPhoneNumberValid(user.phoneNumber)) {
    return {
      message: `輸入的電話號碼無效`
    }
  }

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
