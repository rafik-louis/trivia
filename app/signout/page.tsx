import { signout } from "./actions";
import { ClientSignout } from "./client-singout";

export default async function Home() {
  return <ClientSignout signoutAction={signout} />;
}
