import { z } from 'zod'
import { createTRPCRouter, privateProcedure, publicProcedure } from "grindylocks/server/api/trpc";
import { TRPCError } from '@trpc/server';

export const businessRouter = createTRPCRouter({
    getBusinessById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        if (!input.id) throw new Error("ID Required")
        const business = await ctx.prisma.business.findUnique({ where: { id: input.id }, include: { team_riders: true } })
        if (!business) throw new TRPCError({ code: "NOT_FOUND" })
        return business
    }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        const business = await ctx.prisma.business.findMany({
            take: 100,
            include: {
                team_riders: true
            }
        })
        return business
    }),
});