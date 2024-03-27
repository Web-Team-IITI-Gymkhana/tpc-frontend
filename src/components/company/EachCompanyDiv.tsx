"use client";
import Cookies from "js-cookie";
import { revalidateTag } from "next/cache";
import submit from "../action";
export default function EachCompanyDiv({ Company }: any) {
    return (
        <div
            className="cursor-pointer hover:text-gray-600 hover:scale-95 transition-all fade-in-out"
            onClick={() => {
                Cookies.set("companyId", Company.id);
                Cookies.set("companyName", Company.name);
                submit("AllRecruiters");
                submit("AllJobs");
            }}
        >
            {Company.name}
        </div>
    );
}
