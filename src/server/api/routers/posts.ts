import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "grindylocks/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
});
