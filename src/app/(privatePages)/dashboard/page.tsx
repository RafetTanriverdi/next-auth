"use client";

import { getUsersRoles } from "@rt/actions/getUserRoles";
import React, { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getUsersRoles();
      console.log("roles", roles);
    };
    fetchRoles();
  }, []);

  return <div className="flex">DashboardPage</div>;
}
