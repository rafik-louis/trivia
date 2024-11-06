"use server";
"server-only";

import { SigninFormSchema, FormState } from "@/app/lib/definitions";
import { redirect, RedirectType } from "next/navigation";
import * as bcrypt from "bcryptjs";
import prisma from "../../db";
import { createSession } from "../lib/session";

export async function signin(state: FormState, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    id: formData.get("id"),
    password: formData.get("password"),
    redirect: formData.get("redirect"),
  });
  try {
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const { id, password } = validatedFields.data;

    const user = (
      await prisma.user.findMany({
        where: { id: id },
        include: { password: true },
      })
    )[0];
    if (!user) {
      return {
        message: "Not signed up",
      };
    }
    const passwordMatch = await bcrypt.compare(
      password,
      user.password?.hash ?? ""
    );

    if (!passwordMatch) {
      return {
        message: "Wrong password",
      };
    }

    await createSession(user.id, user.isAdmin);
  } catch (error) {
    throw error;
  }
  return redirect(
    `/${validatedFields.data.redirect || "start-search"}`,
    RedirectType.replace
  );
}
