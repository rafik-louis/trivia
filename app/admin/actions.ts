"use server";
"server-only";

import prisma from "@/db";
import { verifySession } from "../lib/dal";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

export async function getUsers(search: string) {
  const { isAdmin, userId } = await verifySession();
  if (!(userId && isAdmin)) redirect("/");
  const or: Prisma.UserWhereInput[] = [
    {
      name: {
        contains: search,
      },
    },
  ];
  if (+search)
    or.push({
      id: {
        equals: +search,
      },
    });
  return await prisma.user.findMany({
    select: {
      name: true,
      id: true,
      score: true,
    },
    where: {
      isAdmin: false,
      OR: or,
    },
  });
}
