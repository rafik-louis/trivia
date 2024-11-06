import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";
import { signup } from "./actions";
import { SignupForm } from "./client-signup";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await verifySession();
  if (session.isAuth) redirect("/start-search");
  const on_success_redirect = (await searchParams).next;
  return <SignupForm redirect={on_success_redirect} signupAction={signup} />;
}
