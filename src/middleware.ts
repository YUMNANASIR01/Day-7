import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/','/shop(.*)']) 


export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}















// // 
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/", "/shop(.*)", "/login"]);

// interface SessionClaims {
//   publicMetadata?: {
//     role?: string;
//   };
// }

// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     const { userId, sessionClaims } = await auth();
    
//     if (!userId) {
//       return (await auth()).redirectToSignIn();
//     }

//     // Retrieve user role from session claims
//     const role = (sessionClaims as SessionClaims)?.publicMetadata?.role;

//     // If trying to access /admin but not an admin, redirect to home
//     if (request.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
//       return Response.redirect(new URL("/", request.url)); // ✅ Fixed redirect
//     }
//   }
// });

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };
