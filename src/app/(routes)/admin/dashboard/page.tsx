"use client" 

import { useEffect, useState } from "react";
import Loader from "@/components/Loader/loader";
import Dashboard from "@/components/dashboard/dashboard"

const DashboardPage = () => {
    return (
        <div className="">
            <h1 className="text-center font-bold text-3xl my-5 py-5">Reports</h1>
            <Dashboard />
        </div>
    )
}

export default DashboardPage;