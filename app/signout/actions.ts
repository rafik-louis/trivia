"use server";
"server-only";
import { deleteSession } from "../lib/session";

export async function signout() {
  await deleteSession();
  return;
}
