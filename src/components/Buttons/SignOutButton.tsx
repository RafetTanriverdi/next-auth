"use client";

import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@rt/components/ui/button";
import { redirectTo } from "@rt/lib/redirect";

export default function SignOutButton({ text }: { text: string }) {
  const mutation = useMutation({
    mutationKey: ["signOut"],
    mutationFn: () => {
      return signOut({ callbackUrl: "/login" });
    },
    onSuccess: () => {
      redirectTo(
        `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/v2/logout?` +
          new URLSearchParams({
            client_id: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`,
            returnTo: `${process.env.NEXT_PUBLIC_REDIRECT_URL}`,
          })
      );
    },
  });

  return (
    <Button onClick={() => mutation.mutate()} variant={"destructive"}>
      {mutation.isPending && <Loader2 className="animate-spin" />}
      {text}
    </Button>
  );
}
