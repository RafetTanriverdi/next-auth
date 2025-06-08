import TanstackProvider from "@rt/providers/Tanstack";
import { ThemeProvider } from "@rt/providers/ThemeProvider";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </TanstackProvider>
  );
}
