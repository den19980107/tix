import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth"
import { encode, decode } from 'next-auth/jwt'
import Credentials from "next-auth/providers/credentials";
import { compare } from 'bcrypt'


export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  jwt: { encode, decode },
  providers: [
    Credentials({
      id: "credentials",
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
          throw new Error("登入資訊不完整")
        }

        const user = await prisma.user.findUnique({ where: { username: credentials.username } })

        if (!user) {
          throw new Error("使用者不存在")
        }

        const match = await compare(credentials.password, user.password)
        if (!match) {
          throw new Error("登入失敗，請確認登入資訊是否正確")
        }


        return { id: user.id, username: user.username, phoneNumber: user.phoneNumber, idNumber: user.idNumber }
      }
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    // }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...token.user
        },
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/register"
  }
}

