import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "grindylocks/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import type { Post } from "@prisma/client"

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profilePicture: user.profileImageUrl,
  };
};

const addUserDataToPosts = async (posts: Post[]) => {
  const users = (
    await clerkClient.users.getUserList({
      userId: posts.map((post) => post.userId),
      limit: 100,
    })
  ).map(filterUserForClient);

  return posts.map((post) => {
    const user = users.find((user) => user.id === post.userId);
    if (!user)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User for post not found",
      });

    return {
      post,
      user: { ...user, username: user.username ?? "no username" },
    };
  });

}
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export const postsRouter = createTRPCRouter({
  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findUnique({ where: { id: input.id } })
    if (!post) throw new TRPCError({ code: "NOT_FOUND" })
    return (await addUserDataToPosts([post]))[0]
  }),


  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: [
        {
          createdAt: "desc"
        }
      ]
    });
    return addUserDataToPosts(posts)
  }),

  getPostsByUserId: publicProcedure.input(z.object({
    userId: z.string()
  })).query(({ ctx, input }) => ctx.prisma.post.findMany({
    where: {
      userId: input.userId
    },
    take: 100,
    orderBy: [{ createdAt: "desc" }]
  }).then(addUserDataToPosts)

  ),

  create: privateProcedure.input(z.object({ content: z.string().min(1).max(280) })).mutation(async ({ ctx, input }) => {
    const userId = ctx.userId

    const { success } = await ratelimit.limit(userId)

    if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" })

    const post = await ctx.prisma.post.create({
      data: {
        userId,
        content: input.content
      }
    })
    return post
  })
});
