"use server";
"server-only";

import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import { redirect, RedirectType } from "next/navigation";
import * as bcrypt from "bcryptjs";
import prisma from "../../db";
import { createSession } from "../lib/session";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
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
    // Call the provider or db to create a user...
    const { name, password } = validatedFields.data;
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert the user into the database or call an Auth Library's API

    const user = await prisma.user.create({
      data: {
        name,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
      },
    });

    if (!user) {
      return {
        message: "An error occurred while creating your account.",
      };
    }

    await createSession(user.id, false);
  } catch (error) {
    throw error;
  }
  return redirect(
    `/${validatedFields.data.redirect || "start-search"}`,
    RedirectType.replace
  );
}
