import React from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { fetchJobSalary } from "@/helpers/api";
import { cookies } from "next/headers";
interface Event {
    id: string;
    name: string;
    date: string;
}

interface Coordinator {
    id: string;
    name: string;
}

interface FacultyCoordinatorApproval {
    id: string;
    facultyId: string;
    approvalStatus: string;
}

interface OnCampusOffer {
    id: string;
    name: string;
    offerStatus: string;
}

interface RoleOffered {
    id: string;
    roleName: string;
}

interface Props {
    jobItem: {
        id: string;
        seasonId: string;
        companyId: string;
        role: string;
        recruiterId: string;
        active: boolean;
        eligibility: any;
        currentStatusId: string;
        metadata: any;
        createdAt: string;
        updatedAt: string;
    };
    salary: null | {
        salary: string;
        salaryPeriod: string;
        metadata: any;
        constraints: any;
    };
}

const JobCard = async ({ jobItem }: Props) => {
    const salary = await fetchJobSalary(cookies()?.get("accessToken")?.value, jobItem.id);
    console.log(salary);
    return (
        <div className="">
            <div className="rounded-xl bg-white text-black p-5">
                <div className="font-semibold text-md ">{jobItem.role}</div>
                <Separator className="my-4" />
                <div className="text-xs my-2">Rs 45000 / Month</div>
                <div className="text-xs my-2">3 Months</div>
                <div className="flex justify-between text-xs">
                    <div className="bg-gray-200 my-1 p-2 rounded-md">Internship</div>
                    <Link
                        href={`/admin/jobs/${jobItem.id}`}
                        className="my-1 p-2 text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all fade-in-out"
                    >
                        View Details {">"}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
