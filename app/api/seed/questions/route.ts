"server-only";

import prisma from "@/db";
import { NextRequest } from "next/server";
import * as bcrypt from "bcryptjs";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, password } = body.login;
    if (!(name && password)) return Response.json({ status: "success" });
    const user = (
      await prisma.user.findMany({
        where: { name: name },
        include: { password: true },
      })
    )[0];
    if (!user) {
      return Response.json({ status: "fail", error: "not signed up" });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      user.password?.hash ?? ""
    );

    if (!passwordMatch) {
      return Response.json({ status: "fail", error: "this is wrong" });
    }
    const zodSchema = z.object({
      login: z.object({
        name: z
          .string()
          .min(2, { message: "Name must be at least 2 characters long." })
          .trim(),
        password: z.string({ message: "password must be a string" }).trim(),
      }),
      questions: z
        .object({
          text: z
            .string({ message: "text must be a string" })
            .min(2, "text must be at least two characters long")
            .trim(),
          option1: z
            .string({ message: "option1 must be a string" })
            .min(1, "option1 must be at least one character long")
            .trim(),
          option2: z
            .string({ message: "option2 must be a string" })
            .min(1, "option2 must be at least one character long")
            .trim(),
          option3: z
            .string({ message: "option3 must be a string" })
            .min(1, "option3 must be at least one character long")
            .trim(),
          option4: z
            .string({ message: "option4 must be a string" })
            .min(1, "option4 must be at least one character long")
            .trim(),
          answer: z
            .number({ message: "answer must be a number" })
            .gte(1, "answer must be a number from 1 to 4")
            .lte(4, "answer must be a number from 1 to 4")
            .int("answer must be an integer"),
        })
        .array()
        .min(1),
    });

    const valid = zodSchema.safeParse(body);
    if (!valid.success) return Response.json(valid.error.flatten().fieldErrors);

    const ids = await prisma.question.createManyAndReturn({
      select: {
        id: true,
      },
      data: valid.data.questions,
    });
    return Response.json(ids.map((i) => i.id));
  } catch (error: unknown) {
    return Response.json({ status: "fail", error });
  }
}
