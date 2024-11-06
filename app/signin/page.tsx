import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";
import { signin } from "./actions";
import { SigninForm } from "./client-signin";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await verifySession();
  if (session.isAuth) redirect("/start-search");
  const on_success_redirect = (await searchParams).next;
  return <SigninForm redirect={on_success_redirect} signinAction={signin} />;
}
