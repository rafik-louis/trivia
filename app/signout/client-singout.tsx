"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export function ClientSignout({
  signoutAction,
}: {
  signoutAction: () => Promise<void>;
}) {
  useEffect(() => {
    (async () => {
      await signoutAction();
      redirect("/");
    })();
  }, []);

  return <div className="min-h-screen max-h-screen"></div>;
}
