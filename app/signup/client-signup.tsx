"use client";
import { signup } from "@/app/signup/actions";
import { useActionState, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function SignupForm(props: {
  redirect?: string;
  signupAction: typeof signup;
}) {
  const [state, action] = useActionState(props.signupAction, {
    errors: undefined,
    message: "",
  });

  const router = useRouter();

  const nameError = state?.errors?.name;
  const passwordError = state?.errors?.password;
  const generalError = state?.message;

  const [n, sn] = useState<string>(""); // name
  const [p, sp] = useState<string>(""); // password

  return (
    <div className="grid grid-cols-5">
      <form
        action={action}
        className="col-start-2 col-span-3 lg:col-start-3 lg:col-span-1 grid grid-rows-8 grid-cols-5 items-center justify-items-center min-h-screen max-h-screen p-10 font-[family-name:var(--font-geist-sans)] mb-[2vh]"
      >
        {props.redirect && (
          <input
            hidden={true}
            readOnly={true}
            value={props.redirect}
            name="redirect"
            id="redirect"
          />
        )}
        <div className="row-start-4 col-start-2 col-span-3 align-start flex flex-col">
          <label htmlFor="name" className="mb-[1vh]">
            Name:
          </label>
          <input
            id="name"
            name="name"
            className="text-black mb-[1vh]"
            style={{
              marginBottom: nameError ? 0 : "1vh",
            }}
            placeholder="Name"
            value={n}
            onChange={(e) => sn(e.target.value)}
          />
          <label
            style={{ display: nameError ? "block" : "none" }}
            className="mt-[1vh] mb-[1vh] text-red-400"
          >
            {nameError?.[0]}
          </label>
          <label htmlFor="password" className="pb-[1vh]">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            className="text-black"
            value={p}
            style={{
              marginBottom: passwordError ? 0 : "1vh",
            }}
            onChange={(e) => sp(e.target.value)}
          />
          <label
            style={{ display: passwordError ? "block" : "none" }}
            className="mt-[1vh] mb-[1vh] text-red-400"
          >
            {passwordError?.[0]}
          </label>
          <label
            style={{ display: generalError ? "block" : "none" }}
            className="mt-[1vh] mb-[1vh] text-red-400"
          >
            {generalError}
          </label>
          <button type="submit" className="min-w-[70px] mt-[10vh]">
            Sign Up
          </button>
          <button
            onClick={() => router.push("/signin")}
            className="min-w-[70px] mt-[5vh] rounded-full bg-[#116CFF] min-h-[55px]"
          >
            Already have an account
          </button>
        </div>
        {/* RRI LOGO */}
        <Image
          className="col-span-5 row-start-7 min-w-full"
          src="/RRI_Red_Logo.png"
          alt="Red Rock International logo"
          width={230}
          height={50}
          priority
        />
      </form>
    </div>
  );
}
