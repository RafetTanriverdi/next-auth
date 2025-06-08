"use client";
import Header from "@rt/components/Header/Header";

export default function PrivatePagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen" suppressHydrationWarning>
      <Header />
      {children}
    </div>
  );
}
