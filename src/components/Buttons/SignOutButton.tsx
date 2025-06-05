"use client";

import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import React from "react";
import { Loader2 } from "lucide-react";

export default function SignOutButton({ text }: { text: string }) {
  const mutation = useMutation({
    mutationKey: ["signOut"],
    mutationFn: () => {
      return signOut({ callbackUrl: "/login" });
    },
    onSuccess: () => {
      window.location.href =
        `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/v2/logout?` +
        new URLSearchParams({
          client_id: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`,
          returnTo: "http://localhost:3000/",
        });
    },
  });

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
      onClick={() => mutation.mutate()}
    >
      {mutation.isPending && <Loader2 className="animate-spin" />}
      {text}
    </button>
  );
}
