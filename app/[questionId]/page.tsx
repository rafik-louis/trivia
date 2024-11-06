import { z } from "zod";
import { getQuestion, getScore, submitAnswer } from "../lib/data";
import QuestionComponent from "./question-component";
import { notFound, redirect } from "next/navigation";
import { verifySession } from "../lib/dal";
import { Answer } from "@prisma/client";

export default async function Home({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const { questionId } = await params;
  const valid = z.object({
    questionId: z.string().cuid("invalid question").trim(),
  });
  const isValid = valid.safeParse({ questionId: questionId });
  if (!isValid.success) throw notFound();
  const session = await verifySession();
  if (!session.isAuth) return redirect(`/signup?next=${questionId}`);
  const question = await getQuestion(questionId, session.userId);
  if (!question) throw notFound();
  const ret: Omit<typeof question, "answers" | "answer"> & {
    selection?: {
      selectedAnswer: number;
      isCorrect: boolean;
    };
    answers?: Partial<Answer>[] | null;
    answer?: number;
  } = { ...question };
  if (question.answers.length > 0) {
    ret.selection = {
      selectedAnswer: question.answers[0]?.answer,
      isCorrect: question.answer === question.answers[0]?.answer,
    };
  }
  delete ret.answers;
  delete ret.answer;
  const { score } = await getScore();
  return (
    <QuestionComponent
      userId={session.userId}
      question={ret}
      score={score}
      submitAction={submitAnswer}
    />
  );
}
