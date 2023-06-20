import { z } from 'zod'
import { createTRPCRouter, privateProcedure, publicProcedure } from "grindylocks/server/api/trpc";
import { TRPCError } from '@trpc/server';

export const accountRouter = createTRPCRouter({
    getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const account = await ctx.prisma.account.findUnique({ where: { id: input.id } })
        if (!account) throw new TRPCError({ code: "NOT_FOUND" })
        return account
    }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        const accounts = await ctx.prisma.account.findMany({
            take: 100
        })
        return accounts
    }),

    create: privateProcedure.input(z.object({ userId: z.string(), email: z.string() })).query(async ({ ctx, input }) => {
        const account = await ctx.prisma.account.create({
            data: {
                ...input
            }
        })
        return account
    }),
});