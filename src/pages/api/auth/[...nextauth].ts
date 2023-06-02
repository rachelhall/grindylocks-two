import NextAuth from "next-auth";
import { authOptions } from "grindylocks/server/auth";

export default NextAuth(authOptions);
