"use client";
import { signin } from "@/app/signin/actions";
import { useActionState, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function SigninForm(props: {
  redirect?: string;
  signinAction: typeof signin;
}) {
  const [state, action] = useActionState(props.signinAction, {
    errors: undefined,
    message: "",
  });

  const router = useRouter();

  const idError = state?.errors?.id;
  const passwordError = state?.errors?.password;
  const generalError = state?.message;

  const [i, si] = useState<string>(""); // id
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
            ID:
          </label>
          <input
            id="id"
            name="id"
            className="text-black mb-[1vh]"
            style={{
              marginBottom: idError ? 0 : "1vh",
            }}
            placeholder="id"
            value={i}
            onChange={(e) => si(e.target.value)}
          />
          <label
            style={{ display: idError ? "block" : "none" }}
            className="mt-[1vh] mb-[1vh] text-red-400"
          >
            {idError?.[0]}
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
            Sign In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="min-w-[70px] mt-[5vh] rounded-full bg-[#116CFF] min-h-[55px]"
          >
            Create a new account
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
