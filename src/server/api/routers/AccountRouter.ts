import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from "grindylocks/server/api/trpc";
import { TRPCError } from '@trpc/server';


export const accountRouter = createTRPCRouter({
    getAccountByUsername: publicProcedure.input(z.object({ username: z.string() })).query(async ({ ctx, input }) => {
        const account = await ctx.prisma.account.findUnique({ where: { username: input.username }, include: { posts: true, follow_requests: true, followedBy: true, following: true, sponsors: true, tricks: true } })
        if (!account) throw new TRPCError({ code: "NOT_FOUND" })
        return account
    }),
    getAccountById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const account = await ctx.prisma.account.findUnique({ where: { id: input.id }, include: { posts: true, follow_requests: true, followedBy: true, following: true, sponsors: true } })
        if (!account) throw new TRPCError({ code: "NOT_FOUND" })
        return account
    }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        const accounts = await ctx.prisma.account.findMany({
            take: 100
        })
        return accounts
    }),


});