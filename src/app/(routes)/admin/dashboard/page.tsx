"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader/loader";
import Dashboard from "@/components/dashboard/dashboard";

const DashboardPage = () => {
  return (
    <div className="p-2 md:p-4">
      <h1 className="text-center font-bold text-2xl md:text-3xl my-3 md:my-5 py-3 md:py-5">
        Reports
      </h1>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
