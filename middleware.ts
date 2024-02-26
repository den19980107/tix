import { withAuth } from "next-auth/middleware"

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/register',
    error: '/error',
  }
})

export const config = {
  matcher: ["/", "/booking/:path*", "/setting/:path*"]
}
