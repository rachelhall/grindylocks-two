import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "grindylocks/server/api/trpc";
import { TRPCError } from "@trpc/server";
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
        const park = await ctx.prisma.park.findUnique({
            where: {
                id: input.id
            }, include: {
                media: true, posts: {
                    where: {
                        account: {
                            visibility: "PUBLIC"
                        }
                    }
                }
            }
        })
        if (!park) throw new TRPCError({ code: "NOT_FOUND" })
        return park
    }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        const parks = await ctx.prisma.park.findMany({
            take: 100,
            include: { media: true }
        });
        return parks
    }),

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
    }),
});
