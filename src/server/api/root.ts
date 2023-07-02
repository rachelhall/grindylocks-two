import { createTRPCRouter } from "grindylocks/server/api/trpc";
import { postsRouter } from "./routers/postsRouter";
import { profileRouter } from "./routers/profile";
import { parksRouter } from "./routers/parksRouter";
import { accountRouter } from "./routers/AccountRouter";
import { businessRouter } from "./routers/businessRouter";
import { followRequestRouter } from "./routers/followRequestRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  profile: profileRouter,
  parks: parksRouter,
  account: accountRouter,
  business: businessRouter,
  followRequest: followRequestRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
