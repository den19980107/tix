'use server'

import prisma from "@/lib/prisma";
import { ActionError } from "@/types/action";
import { CreateUser } from "@/types/auth";
import { redirect } from "next/navigation";
import { hash } from 'bcrypt'

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
