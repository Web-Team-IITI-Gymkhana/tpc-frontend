"use client";
import React from "react";
import JAFCard from "@/components/Faculty/FacultyApproval";
import { Jobs } from "@/dummyData/job";
import { AllCompanies } from "@/dummyData/company";

const FacultyPage = ({
  params,
}: {
  params: {
    adminId: String;
  };
}) => {
  return (
    <div className="md:container">
      <h1 className="font-bold mb-4 ml-4 text-xl">Pending Approvals</h1>
      <div className="flex flex-col gap-2">
        <JAFCard jaf={Jobs[0]} company={AllCompanies[0]}></JAFCard>
        <JAFCard jaf={Jobs[1]} company={AllCompanies[1]}></JAFCard>
        <JAFCard jaf={Jobs[2]} company={AllCompanies[2]}></JAFCard>
        <JAFCard jaf={Jobs[0]} company={AllCompanies[0]}></JAFCard>
      </div>
    </div>
  );
};

export default FacultyPage;
