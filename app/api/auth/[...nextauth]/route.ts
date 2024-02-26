import prisma from "@/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { compare } from 'bcrypt'
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

        if (!user) {
          return null
        }

        const match = await compare(credentials.password, user.password)
        if (!match) {
          return null
        }

        // Add logic here to look up the user from the credentials supplied
        const userJwt = { id: user.id.toString(), name: user.username, email: user.username, phone: user.phoneNumber, idNumber: user.idNumber }
        console.log(user)

        return userJwt
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
