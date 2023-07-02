import { Account } from "@prisma/client";
import { createContext } from "react";

export const AccountContext = createContext<Account | null>(null)