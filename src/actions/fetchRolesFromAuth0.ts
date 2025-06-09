export async function fetchRolesFromAuth0(
  userSub: string,
  managementAccessToken: string
) {
  const response = await fetch(
    `${process.env.AUTH0_ISSUER}/api/v2/users/${userSub}/roles`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${managementAccessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user roles");
  }

  const data = await response.json();
  return data;
}
