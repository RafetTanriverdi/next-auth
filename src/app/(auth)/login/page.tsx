"use client";

import { Button } from "@rt/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white items-center justify-center p-6 md:p-10">
        <div className="text-center md:text-left space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome to Platform 🌱
          </h1>
          <p className="text-base md:text-lg opacity-80">
            Discover a world of possibilities with our platform. Join us to
            explore, learn, and grow together.
          </p>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center p-6 md:p-8 transition-colors bg-white dark:bg-gray-900">
        <div className="max-w-md w-full space-y-6">
          <Button
            variant={"default"}
            onClick={() =>
              signIn("auth0", {
                prompt: "login",
              })
            }
            className="w-full py-3 px-4 rounded-md text-base md:text-lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
