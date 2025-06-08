"use server";

import { getServerSession } from "next-auth";
import { createAccessToken } from "./createAccessToken";
import { authOptions } from "@rt/lib/authOptions";

type Role = {
  id: string;
  name: string;
  description: string;
};
export async function getUsersRoles(): Promise<Role[]> {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  console.log("User from getUsersRoles:", user);
  if (!user) {
    throw new Error("User not authenticated");
  }

  const token = await createAccessToken();

  const response = await fetch(
    `${process.env.AUTH0_ISSUER}/api/v2/users/${user.sub}/roles`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: Role[] = await response.json();
  console.log("Response from Auth0 roles API:", data, "user:", user);
  return data;
}
