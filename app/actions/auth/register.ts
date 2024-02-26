'use server'

import prisma from "@/lib/prisma";
import { ActionError } from "@/types/action";
import { CreateUser } from "@/types/auth";
import { redirect } from "next/navigation";

export async function createUser(user: CreateUser): Promise<ActionError> {
  try {
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
