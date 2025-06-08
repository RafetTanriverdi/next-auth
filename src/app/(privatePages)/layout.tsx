"use client";
import Header from "@rt/components/Header/Header";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function PrivatePagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex flex-col min-h-screen" suppressHydrationWarning>
        <Header />
        {children}
      </div>
    </SessionProvider>
  );
}
