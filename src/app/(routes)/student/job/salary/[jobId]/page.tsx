"use client";
import React, { useEffect, useState } from "react";
import SalaryCard from "@/components/jobs/SalaryCard";
import { GetJobById, GetResumes } from "@/helpers/student/api";
import { Resume } from "@/helpers/student/types";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
import Loader from "@/components/Loader/loader";

interface Salary {
  id: string;
  salaryPeriod?: string;
  facultyApprovals: string[];
  baseSalary?: number;
  totalCTC?: number;
  takeHomeSalary?: number;
  grossSalary?: number;
  joiningBonus?: number;
  performanceBonus?: number;
  relocation?: number;
  bondAmount?: number;
  esopAmount?: number;
  esopVestPeriod?: string;
  firstYearCTC?: number;
  retentionBonus?: number;
  deductions?: number;
  medicalAllowance?: number;
  bondDuration?: string;
  foreignCurrencyCTC?: number;
  foreignCurrencyCode?: string;
  otherCompensations?: number;
  others?: string;

  // Internship-specific fields
  stipend?: number;
  foreignCurrencyStipend?: number;
  accommodation?: boolean;
  ppoProvisionOnPerformance?: boolean;
  tentativeCTC?: number;
  PPOConfirmationDate?: Date;
}

const SalaryPage = ({ params }: { params: { jobId: string } }) => {
  const [salaryData, setSalaryData] = useState<Salary[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [seasonType, setSeasonType] = useState<string>("");

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const data = await GetJobById(params.jobId);
        setSalaryData(data.salaries);
        setSeasonType(data.season.type);

        const res = await GetResumes();
        setResumes(res);
      } catch (error) {
        toast.error("Error fetching data:");
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryData();
  }, [params.jobId]);

  return (
    <div>
      <div className="font-bold text-black text-lg ml-2 mb-4">Salaries</div>
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {salaryData &&
        salaryData.map((item, index) => (
          <div key={index} className="my-3">
            <SalaryCard
              salaryId={item.id}
              resumes={resumes}
              seasonType={seasonType}
            />
          </div>
        ))}
    </div>
  );
};

export default SalaryPage;
