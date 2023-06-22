import { z } from 'zod'
import { createTRPCRouter, privateProcedure, publicProcedure } from "grindylocks/server/api/trpc";
import { TRPCError } from '@trpc/server';

export const businessRouter = createTRPCRouter({
    getBusinessById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const account = await ctx.prisma.business.findUnique({ where: { id: input.id } })
        if (!account) throw new TRPCError({ code: "NOT_FOUND" })
        return account
    }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        const accounts = await ctx.prisma.business.findMany({
            take: 100
        })
        return accounts
    }),
});