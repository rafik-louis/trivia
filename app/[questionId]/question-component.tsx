"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const green = "#68EA85";
const blue = "#116CFF";
const red = "#FF5757";
const gray = "#979797";
export default function QuestionComponent(props: {
  submitAction: (questionId: string, answer: number) => Promise<void>;
  score: number;
  userId: number;
  question: {
    id: string;
    text: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    selection?: {
      selectedAnswer: number;
      isCorrect: boolean;
    };
  };
}) {
  const [selected_value, set_selected_value] = useState<number | null>(null);
  const [selected_value_color, set_selected_value_color] = useState(blue);
  const { question } = props;

  const router = useRouter();

  const choose = (vara: number) => () => {
    if (!question.selection) set_selected_value(vara);
  };

  const submit = async () => {
    await props.submitAction(question.id, selected_value as number);
    router.refresh();
  };

  useEffect(() => {
    if (question.selection) {
      if (question.selection.isCorrect) set_selected_value_color(green);
      else set_selected_value_color(red);
      set_selected_value(question.selection.selectedAnswer);
    }
  }, [question]);

  return (
    <div className="grid grid-rows-8 grid-cols-5 items-center justify-items-center min-h-screen max-h-screen p-10 font-[family-name:var(--font-geist-sans)] mb-[2vh]">
      {/* USER ID */}
      <div className="ml-[30px] row-start-1 col-start-1 w-[160px] justify-center items-center flex h-[80px]">
        <p className="text-xl p-4">Your id is: {props.userId}</p>
      </div>
      {/* SCORE */}
      <div className=" row-start-1 col-start-5 w-[125px] justify-center items-center flex h-[80px]">
        <p className="text-xl p-4">score: {props.score}</p>
      </div>
      {/* QUESTION */}
      <div className="row-start-2 row-end-4 col-start-1 col-end-6 md:col-start-1 min-h-full md:col-end-6 md:px-[5%] lg:col-start-1 lg:col-end-6 min-w-full justify-center items-center text-center overflow-y-scroll max-h-[25vh] flex align-items-center flex-wrap">
        <h1 className="rounded text-xl md:text-2xl lg:text-3xl font-bold ">
          {question.text}
        </h1>
      </div>

      {/* CHOICES */}
      <div className="row-start-4 row-end-6 col-start-1 col-end-6 px-[4vw] md:col-start-2 md:col-end-5 md:px-[5%] lg:col-start-3 lg:col-end-4 lg:text-2xl min-w-full mt-[14vh]">
        <button className="min-w-full" onClick={choose(1)}>
          <h1
            className="rounded bg-gray-600  py-[1vh] pl-[1vw] pr-[1vw] pl-[10%] rounded-full mb-[3vh] opacity-70"
            style={
              selected_value && selected_value == 1
                ? { backgroundColor: selected_value_color }
                : {}
            }
          >
            {question.option1}
          </h1>
        </button>

        <button className="min-w-full" onClick={choose(2)}>
          <h1
            className="rounded bg-gray-600  py-[1vh] pl-[1vw] pr-[1vw] pl-[10%] rounded-full mb-[3vh] opacity-70"
            style={
              selected_value && selected_value == 2
                ? { backgroundColor: selected_value_color }
                : {}
            }
          >
            {question.option2}
          </h1>
        </button>

        <button className="min-w-full" onClick={choose(3)}>
          <h1
            className="rounded bg-gray-600  py-[1vh] pl-[1vw] pr-[1vw] pl-[10%] rounded-full mb-[3vh] opacity-70"
            style={
              selected_value && selected_value == 3
                ? { backgroundColor: selected_value_color }
                : {}
            }
          >
            {question.option3}
          </h1>
        </button>

        <button className="min-w-full" onClick={choose(4)}>
          <h1
            className="rounded bg-gray-600  py-[1vh] pl-[1vw] pr-[1vw] pl-[10%] rounded-full mb-[3vh] opacity-70"
            style={
              selected_value && selected_value == 4
                ? { backgroundColor: selected_value_color }
                : {}
            }
          >
            {question.option4}
          </h1>
        </button>
      </div>

      {/* Submit */}
      <div className="row-start-6 row-end-8 col-start-1 col-end-6 px-[4vw] md:col-start-2 md:col-end-5 md:px-[5%] lg:col-start-3 lg:col-end-4  min-w-full mt-[10vh]">
        <button
          className="min-w-full"
          onClick={submit}
          disabled={question.selection != null}
        >
          <h1
            className="rounded text-xl py-[1vh] pl-[1vw] pr-[1vw] rounded-full text-center b"
            style={{
              backgroundColor: question.selection ? gray : green,
              opacity: question.selection ? "80%" : "100%",
            }}
          >
            Submit
          </h1>
        </button>
      </div>

      <div
        className="row-start-8 col-start-1 col-end-6 px-[4vw] md:col-start-2 md:col-end-5 md:px-[5%] lg:col-start-3 lg:col-end-4 text-bold text-xl"
        style={{
          display: question.selection ? "block" : "none",
          color: question.selection?.isCorrect ? green : red,
        }}
      >
        {question.selection?.isCorrect
          ? "You got this one right!"
          : "Hard luck this time..."}
      </div>

      {/* RRI LOGO */}
      <Image
        className="row-start-10 col-start-2 col-end-5 px-[4vw] md:col-start-3 md:col-end-4 md:px-[5%] lg:col-start-3 lg:col-end-4 lg:px-[10%] min-w-full"
        src="/RRI_Red_Logo.png"
        alt="Red Rock International logo"
        width={180}
        height={38}
        priority
      />
    </div>
  );
}
