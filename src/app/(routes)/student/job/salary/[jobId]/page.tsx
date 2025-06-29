"use client";
import React, { useEffect, useState } from "react";
import SalaryCard from "@/components/jobs/SalaryCard";
import { GetJobById, GetResumes } from "@/helpers/student/api";
import { Resume } from "@/helpers/student/types";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/loader";

// Define the season type union
type SeasonType = "PLACEMENT" | "INTERNSHIP";

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

interface JobSeason {
  id: string;
  year: string;
  type: SeasonType;
}

interface JobData {
  salaries: Salary[];
  season: JobSeason;
}

const SalaryPage = ({ params }: { params: { jobId: string } }) => {
  const [salaryData, setSalaryData] = useState<Salary[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [seasonType, setSeasonType] = useState<SeasonType | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSalaryData = async () => {
      if (!params.jobId) {
        setError("Invalid job ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [jobData, resumesData] = await Promise.all([
          GetJobById(params.jobId) as Promise<JobData>,
          GetResumes(),
        ]);

        if (!jobData) {
          throw new Error("No job data received");
        }

        // Validate season type
        if (
          jobData.season?.type &&
          (jobData.season.type === "PLACEMENT" ||
            jobData.season.type === "INTERNSHIP")
        ) {
          setSeasonType(jobData.season.type);
        } else {
          console.warn(
            `Invalid season type: ${jobData.season?.type}, defaulting to PLACEMENT`,
          );
          setSeasonType("PLACEMENT");
        }

        setSalaryData(jobData.salaries || []);
        setResumes(resumesData || []);
      } catch (error) {
        console.error("Error fetching salary data:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch salary data",
        );
        toast.error("Error fetching salary data");
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryData();
  }, [params.jobId]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl max-w-md text-center">
          <h3 className="font-semibold mb-2">Error Loading Job Data</h3>
          <p className="text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!seasonType) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-xl max-w-md text-center">
          <h3 className="font-semibold mb-2">Invalid Season Type</h3>
          <p className="text-sm">
            Unable to determine if this is a placement or internship
            opportunity.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            {seasonType === "PLACEMENT" ? "Placement" : "Internship"}{" "}
            Opportunities
          </h1>
          <p className="text-slate-600">
            {salaryData.length}{" "}
            {salaryData.length === 1 ? "position" : "positions"} available
          </p>
        </div>

        {salaryData.length > 0 ? (
          <div className="space-y-6">
            {salaryData.map((item, index) => (
              <SalaryCard
                key={`salary-${item.id}-${index}`}
                salaryId={item.id}
                resumes={resumes}
                seasonType={seasonType}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              No Salary Information Available
            </h3>
            <p className="text-slate-600">
              There are currently no salary details available for this position.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryPage;
