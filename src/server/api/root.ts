import { createTRPCRouter } from "grindylocks/server/api/trpc";
import { postsRouter } from "./routers/posts";
import { profileRouter } from "./routers/profile";
import { parksRouter } from "./routers/parksRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  profile: profileRouter,
  parks: parksRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
