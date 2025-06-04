import React from "react";
import Link from "next/link";

export default function DahsboardPage() {
  return (
    <div>
      DahsboardPage
      <button>
        <Link
          href="/api/auth/signout"
          className="text-blue-500 hover:underline"
        >
          Sign Out
        </Link>
      </button>
    </div>
  );
}
