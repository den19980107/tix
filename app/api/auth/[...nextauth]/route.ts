import { createUser } from "@/app/actions/auth/register";
import prisma from "@/lib/prisma";
import { TicketIcon } from "lucide-react";
import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";


export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.username || !credentials.password) {
          console.log(`credentials has error`)
          console.log(credentials)
          return null
        }

        const user = await prisma.user.findUnique({ where: { username: credentials.username } })

        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        console.log(user)

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    // }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/register"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
