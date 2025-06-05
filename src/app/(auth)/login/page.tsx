"use client";

import { signIn } from "next-auth/react";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Platform 🌱</h1>
          <p className="text-lg opacity-80">
            Discover a world of possibilities with our platform. Join us to
            explore, learn, and grow together.
          </p>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-md w-full space-y-6">
          <button
            onClick={() =>
              signIn("auth0", {
                prompt: "login",
              })
            }
            className="w-full py-3 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
