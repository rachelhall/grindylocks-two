import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { ratelimit } from "./postsRouter";
import { TRPCError } from "@trpc/server";
import { FollowRequestStatus } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";

export const followRequestRouter = createTRPCRouter({
    getAllFollowRequestOnAccount: privateProcedure.input(z.object({ account_id: z.string() })).query(async ({ ctx, input }) => {
        const followRequests = await ctx.prisma.followRequest.findMany({
            where: {
                accountId: input.account_id
            },
            include: {
                Account: true
            }
        })
        return followRequests
    }),

    createFollowRequest: privateProcedure.input(z.object({ account_id: z.string(), requested_id: z.string() })).mutation(async ({ ctx, input }) => {
        const userId = ctx.userId

        const { success } = await ratelimit.limit(userId)

        // TODO: Prevent duplicate friend requests

        if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" })

        const followRequests = await ctx.prisma.followRequest.findMany({
            where: {
                accountId: input.account_id
            }
        })

        if (followRequests.some(request => request.requested_id === input.account_id)) {
            throw new TRPCClientError("You have already requested this user")
        }

        const followRequest = await ctx.prisma.followRequest.create({
            data: {
                accountId: input.account_id,
                requested_id: input.requested_id,
                status: "PENDING",
            }
        })
        return followRequest
    }),

    updateFollowRequest: privateProcedure.input(z.object({ followRequestId: z.string(), status: z.nativeEnum(FollowRequestStatus) })).mutation(async ({ ctx, input }) => {
        const userId = ctx.userId

        const followRequest = await ctx.prisma.followRequest.update({
            where: { id: input.followRequestId },
            data: {
                status: input.status
            }
        })

        if (!followRequest) throw new Error('Failed to accept follow request')

        const newFollower = await ctx.prisma.account.findUnique({ where: { id: followRequest.accountId } })

        if (!newFollower) throw new Error("Could not find accoun matching followRequest")

        const accountWithFollowedBy = await ctx.prisma.account.update({
            where: { userId },
            data: {
                followedBy: {
                    connect: {
                        id: newFollower.id
                    }
                }
            }
        })
        return accountWithFollowedBy
    })
})