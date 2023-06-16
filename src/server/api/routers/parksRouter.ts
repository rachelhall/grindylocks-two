import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "grindylocks/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import type { Post } from "@prisma/client"

// const filterUserForClient = (user: User) => {
//   return {
//     id: user.id,
//     username: user.username,
//     profilePicture: user.profileImageUrl,
//   };
// };

// const addUserDataToPosts = async (posts: Post[]) => {
//   const users = (
//     await clerkClient.users.getUserList({
//       userId: posts.map((post) => post.userId),
//       limit: 100,
//     })
//   ).map(filterUserForClient);

//   return posts.map((post) => {
//     const user = users.find((user) => user.id === post.userId);
//     if (!user)
//       throw new TRPCError({
//         code: "INTERNAL_SERVER_ERROR",
//         message: "User for post not found",
//       });

//     return {
//       post,
//       user: { ...user, username: user.username ?? "no username" },
//     };
//   });

// }
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "1 m"),
    analytics: true,
    prefix: "@upstash/ratelimit",
});

export const parksRouter = createTRPCRouter({
    getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const park = await ctx.prisma.park.findUnique({ where: { id: input.id } })
        if (!park) throw new TRPCError({ code: "NOT_FOUND" })
        // return (await addUserDataToPosts([post]))[0]
        return park
    }),


    getAll: publicProcedure.query(async ({ ctx }) => {
        console.log(ctx.prisma.park)
        const parks = await ctx.prisma.park.findMany({
            take: 100,
            // orderBy: [
            //     {
            //         createdAt: "desc"
            //     }
            // ]
        });
        // return addUserDataToPosts(posts)
        return parks
    }),

    // getPostsByUserId: publicProcedure.input(z.object({
    //     userId: z.string()
    // })).query(({ ctx, input }) => ctx.prisma.post.findMany({
    //     where: {
    //         userId: input.userId
    //     },
    //     take: 100,
    //     orderBy: [{ createdAt: "desc" }]
    // }).then(addUserDataToPosts)

    // ),



    create: privateProcedure.input(z.object({ name: z.string().min(1).max(280), description: z.string(), address_number: z.string(), street: z.string(), post_code: z.string(), city: z.string(), region: z.string(), region_code: z.string(), country: z.string(), lat: z.string(), lng: z.string() })).mutation(async ({ ctx, input }) => {
        const userId = ctx.userId

        const { success } = await ratelimit.limit(userId)

        if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" })

        const park = await ctx.prisma.park.create({
            data: {
                ...input
            }
        })
        return park
    })
});
