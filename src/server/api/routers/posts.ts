import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "grindylocks/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profilePicture: user.profileImageUrl,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: [
        {
          createdAt: "desc"
        }
      ]
    });

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
  }),

  create: privateProcedure.input(z.object({ content: z.string().min(1).max(280) })).mutation(async ({ ctx, input }) => {
    const userId = ctx.userId
    const post = await ctx.prisma.post.create({
      data: {
        userId,
        content: input.content
      }
    })
    return post
  })
});
