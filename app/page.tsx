import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function IndexPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/home")
  }

  redirect("/auth/signin")
}
