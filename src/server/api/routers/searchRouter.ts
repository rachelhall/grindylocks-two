import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from 'zod'

export const searchRouter = createTRPCRouter({
    all: publicProcedure.input(z.object({ searchTerm: z.string() })).query(async ({ ctx, input }) => {
        const allParks = await ctx.prisma.park.findMany({
            where: {
                OR: [
                    {
                        name: {
                            startsWith: input.searchTerm
                        }
                    },
                    {
                        city: {
                            startsWith: input.searchTerm
                        }
                    },
                    {
                        region: {
                            startsWith: input.searchTerm
                        }
                    }
                ]
            },
            include: { media: true }
        })

        const allAccounts = await ctx.prisma.account.findMany({
            where: {
                OR:
                    [

                        {
                            first_name: {
                                startsWith: input.searchTerm
                            }
                        },
                        {
                            last_name: {
                                startsWith: input.searchTerm
                            }
                        },
                        {
                            email: {
                                startsWith: input.searchTerm
                            }
                        },
                    ]

            }
        })

        const allBusinesses = await ctx.prisma.business.findMany({
            where: {
                OR: [

                    {
                        name: {
                            startsWith: input.searchTerm
                        }
                    },
                    {
                        city: {
                            startsWith: input.searchTerm
                        }
                    },
                    {
                        region: {
                            startsWith: input.searchTerm
                        }
                    }
                ]
            }
        })

        return { parks: allParks, accounts: allAccounts, businesses: allBusinesses }

    })
})