// //this is the page.tsx file that contains the page component for the admin/[adminId] route
"use client";
import { useRouter } from "next/router";

interface Props {}

const AdminPage = ({
  params,
}: {
  params: {
    adminId: String;
  };
}) => {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>Static Admin ID: {params.adminId}</p>
    </div>
  );
};

export default AdminPage;
