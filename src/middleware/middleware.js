import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const publicPaths = ["/", "/sign-in*", "/sign-up*"]
const isPublic = createRouteMatcher(publicPaths)

export default clerkMiddleware((auth, req, evt) => {
  if (isPublic(req)) {
    return NextResponse.next()
  }
  // Handle authenticated routes
  return auth()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}