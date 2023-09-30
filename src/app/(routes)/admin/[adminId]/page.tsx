//this is the page.tsx file that contains the page component for the admin/[adminId] route
"use client";
import { useParams } from "next/navigation";
import React from "react";

interface Props {}

const AdminPage = (props: Props) => {
  const searchParams = useParams();
  const adminId = searchParams.adminId;

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Admin ID: {adminId}</p>
    </div>
  );
};

export default AdminPage;
