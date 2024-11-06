"use client";

import Image from "next/image";

export default function QuestionComponent() {
  return (
    <div className="grid grid-rows-8 grid-cols-5 items-center justify-items-center min-h-screen max-h-screen p-10 font-[family-name:var(--font-geist-sans)] mb-[2vh]">
      <div className="row-start-1 row-end-6  col-start-3   lg:text-2xl  mt-[14vh] min-w-[277px] max-w-[277px]">
        <h1 className="py-[1vh] pl-[1vw] pr-[1vw] pl-[10%] mb-[3vh] text-center font-bold">
          You&#39;re already signed up!
        </h1>
        <h1 className="py-[1vh] pl-[1vw] pr-[1vw] pl-[10%] mb-[3vh] text-center">
          Find the first QR code to begin your mission...
        </h1>
        <div className="max-w-[150px]  py-[1vh] pl-[1vw] pr-[1vw] pl-[10%] mb-[3vh] ml-[20%]">
          <Image
            className="row-start-10 col-start-2 col-end-5 px-[4vw] md:col-start-3 md:col-end-4 md:px-[5%] lg:col-start-3 lg:col-end-4 lg:px-[10%] min-w-full"
            src="/image 1.png"
            alt="QR code image"
            width={180}
            height={38}
            priority
          />
        </div>
      </div>
    </div>
  );
}
