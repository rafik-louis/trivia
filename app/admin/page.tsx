import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";
import { getUsers } from "./actions";
import { ViewPlayersComponent } from "./view-users-component";

export default async function Home() {
  const { isAdmin, userId } = await verifySession();
  if (!(userId && isAdmin)) redirect("/");
  return <ViewPlayersComponent searchFunction={getUsers} />;
}
