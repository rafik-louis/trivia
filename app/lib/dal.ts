import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "@/app/lib/session";

export const verifySession: () => Promise<
  | { isAuth: true; userId: number; isAdmin: boolean }
  | { isAuth: false; isAdmin: false; userId: null }
> = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return { isAuth: false, userId: null, isAdmin: false };
  }

  return {
    isAuth: true,
    userId: session.userId as number,
    isAdmin: session.isAdmin as boolean,
  };
});
