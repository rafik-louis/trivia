"use server";

import prisma from "@/db";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { verifySession } from "./dal";

export const getQuestion = async (id: string, userId: number) => {
  const question = await prisma.question.findUnique({
    select: {
      id: true,
      text: true,
      option1: true,
      option2: true,
      option3: true,
      option4: true,
      answer: true,
      answers: {
        where: {
          userId: userId,
        },
        select: {
          answer: true,
        },
      },
    },

    where: {
      id: id,
    },
  });
  return question;
};

export const getScore = async () => {
  const { userId, isAuth } = await verifySession();
  if (!isAuth) redirect("/");

  return await prisma.user.findUniqueOrThrow({
    select: {
      score: true,
    },
    where: {
      id: userId,
    },
  });
};

export const submitAnswer = async (questionId: string, answer: number) => {
  const { userId, isAuth } = await verifySession();
  if (!isAuth) redirect("/");

  const validInputSchema = z.object({
    questionId: z.string().cuid("invalid question").trim(),
    answer: z.number().gte(1).lte(4),
  });
  const parsed = validInputSchema.safeParse({
    questionId: questionId,
    answer: answer,
  });
  if (!parsed.success) throw notFound();

  const question = await getQuestion(questionId, userId);
  if (!question) throw notFound();

  if (question.answers.length > 0) return;

  await prisma.answer.create({
    data: {
      questionId: questionId,
      userId: userId,
      answer: answer,
    },
  });

  if (answer === question.answer) {
    await prisma.user.update({
      data: {
        score: {
          increment: 1,
        },
      },
      where: {
        id: userId,
      },
    });
  }
};
