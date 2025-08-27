"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Resume, Salary } from "@/helpers/student/types";
import { ApplyJob, GetSalaryById, OpenResume } from "@/helpers/student/api";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import Loader from "@/components/Loader/loader";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

interface ApplicationResume {
  id: string;
  filepath: string;
  verified: boolean;
}

interface Application {
  id: string;
  eventId: string;
  resume: ApplicationResume;
  additionalData?: Record<string, string>;
}

interface SalaryCardProps {
  salaryId: string;
  seasonType: "PLACEMENT" | "INTERNSHIP" | "INTERN";
  resumes: Resume[];
}

interface ErrorState {
  hasError: boolean;
  message: string;
}

const formatNumber = (num: number): string => {
  if (!num || typeof num !== "number") return "₹0";

  if (num >= 1e7) {
    const crores = num / 1e7;
    return `₹${crores.toFixed(2)} Crores`;
  } else if (num >= 1e5) {
    const lakhs = num / 1e5;
    return `₹${lakhs.toFixed(2)} Lakhs`;
  } else if (num >= 1e3) {
    const thousands = num / 1e3;
    return `₹${thousands.toFixed(2)}K`;
  } else {
    return `₹${num.toString()}`;
  }
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

const extractResumeDisplayName = (filepath: string): string => {
  if (!filepath) return "resume.pdf";

  try {
    const filename =
      filepath.split("/").pop() || filepath.split("\\").pop() || "resume";

    if (filename.toLowerCase().endsWith(".pdf")) {
      return filename;
    } else {
      const nameWithoutExt = filename.split(".")[0];
      return `${nameWithoutExt}.pdf`;
    }
  } catch (error) {
    console.error("Error extracting resume name:", error);
    return "resume.pdf";
  }
};

const SalaryCard: React.FC<SalaryCardProps> = ({
  salaryId,
  resumes,
  seasonType,
}) => {
  const [salaryData, setSalaryData] = useState<Salary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    message: "",
  });
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [additionalData, setAdditionalData] = useState<Record<string, string>>({});

  const hasApplied = useMemo(() => {
    return salaryData?.job?.applications?.length > 0;
  }, [salaryData?.job?.applications]);

  const salaryTitle = useMemo(() => {
    if (!salaryData) return "";
    return seasonType === "PLACEMENT"
      ? `CTC Offered: ${formatNumber(salaryData.totalCTC || 0)}`
      : `Stipend: ${formatNumber(salaryData.stipend || 0)}`;
  }, [salaryData, seasonType]);

  // Get additional data requirements from the event student is applying to
  const eventAdditionalData = useMemo(() => {
    if (!salaryData?.job?.events?.length) return {};
    // Find event with lowest round number
    const applicationEvent = salaryData.job.events.reduce((lowest, current) => 
      current.roundNumber < lowest.roundNumber ? current : lowest
    );
    return applicationEvent?.additionalData || {};
  }, [salaryData?.job?.events]);

  const fetchSalaryData = useCallback(async () => {
    if (!salaryId) {
      setError({ hasError: true, message: "Invalid salary ID" });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError({ hasError: false, message: "" });

      const data = await GetSalaryById(salaryId);

      if (!data) {
        throw new Error("No data received from server");
      }

      setSalaryData(data);
    } catch (error) {
      console.error("Error fetching salary data:", error);
      setError({
        hasError: true,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch salary data",
      });
      toast.error("Error fetching salary data");
    } finally {
      setLoading(false);
    }
  }, [salaryId]);

  useEffect(() => {
    fetchSalaryData();
  }, [fetchSalaryData]);

  const handleResumeChange = useCallback((value: string) => {
    setSelectedResume(value);
  }, []);

  const handleApply = useCallback(async () => {
    if (!selectedResume) {
      toast.error("Please select a resume");
      return;
    }

    if (!salaryId) {
      toast.error("Invalid salary information");
      return;
    }

    const selectedResumeData = resumes.find(
      (resume) => resume.id === selectedResume,
    );

    if (!selectedResumeData) {
      toast.error("Selected resume not found");
      return;
    }

    if (!selectedResumeData.verified) {
      toast.error("Please select a verified resume");
      return;
    }

    // Validate required additional data
    const requiredFields = Object.keys(eventAdditionalData);
    if (requiredFields.length > 0) {
      for (const field of requiredFields) {
        if (!additionalData[field] || additionalData[field].trim() === "") {
          toast.error(`Please fill in the required field: ${field}`);
          return;
        }
      }
    }

    try {
      setIsApplying(true);
      const data = await ApplyJob(salaryId, selectedResume, additionalData);

      if (data) {
        toast.success("Applied Successfully");
        await fetchSalaryData();
      } else {
        toast.error("Application failed. Please try again.");
      }
    } catch (error) {
      console.error("Application error:", error);

      if (error instanceof Error) {
        if (error.message.includes("Not Authorized")) {
          toast.error(
            "You are not authorized to apply for this position. Please check if you meet the eligibility criteria.",
          );
        } else if (error.message.includes("already applied")) {
          toast.error("You have already applied for this position.");
        } else {
          toast.error("Failed to apply. Please try again or contact support.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsApplying(false);
    }
  }, [selectedResume, salaryId, resumes, fetchSalaryData, additionalData, eventAdditionalData]);

  const handleOpenResume = useCallback((filepath: string) => {
    if (!filepath) {
      toast.error("Invalid resume file");
      return;
    }

    try {
      OpenResume(filepath);
    } catch (error) {
      console.error("Error opening resume:", error);
      toast.error("Failed to open resume");
    }
  }, []);

  const handleToggleDetails = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  if (loading) {
    return (
      <div className="h-64 w-full flex justify-center items-center bg-white rounded-xl">
        <Loader />
      </div>
    );
  }

  if (error.hasError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl">
        <h3 className="font-semibold mb-2">Error Loading Salary Information</h3>
        <p className="text-sm">{error.message}</p>
        <Button
          onClick={fetchSalaryData}
          className="mt-4 bg-red-600 hover:bg-red-700"
          size="sm"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!salaryData) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-600 p-6 rounded-xl text-center">
        <p>No salary information available</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-black p-5 rounded-xl shadow-sm border border-gray-200">
      <div
        className="font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors"
        onClick={handleToggleDetails}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggleDetails();
          }
        }}
      >
        <div className="flex justify-between items-center">
          <span>{salaryData.job?.company?.name || "Unknown Company"}</span>
          {hasApplied && (
            <div className="text-green-500 font-semibold px-3 py-1 border rounded-full inline-block border-green-500 text-xs bg-green-50">
              Applied
            </div>
          )}
        </div>
      </div>

      <div className="text-gray-500 font-semibold my-2 text-sm">
        {salaryTitle}
      </div>

      <div className="my-4">
        <Separator />
      </div>

      {seasonType === "PLACEMENT" ? (
        <div
          className="grid md:grid-cols-3 lg:grid-cols-6 text-sm mx-2 gap-4"
          onClick={handleToggleDetails}
          style={{ cursor: "pointer" }}
        >
          <div>
            <div className="text-gray-500 font-semibold my-2">Role</div>
            <div className="font-medium">{salaryData.job?.role || "N/A"}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Base Salary</div>
            <div>
              {salaryData.baseSalary
                ? formatNumber(salaryData.baseSalary)
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">
              Take Home Salary
            </div>
            <div>
              {salaryData.takeHomeSalary
                ? formatNumber(salaryData.takeHomeSalary)
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Gross Salary</div>
            <div>
              {salaryData.grossSalary
                ? formatNumber(salaryData.grossSalary)
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">
              Other Compensations
            </div>
            <div>
              {salaryData.otherCompensations
                ? formatNumber(salaryData.otherCompensations)
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Duration</div>
            <div>{salaryData.salaryPeriod || "N/A"}</div>
          </div>
        </div>
      ) : (
        <div
          className="grid md:grid-cols-3 lg:grid-cols-6 text-sm mx-2 gap-4"
          onClick={handleToggleDetails}
          style={{ cursor: "pointer" }}
        >
          <div>
            <div className="text-gray-500 font-semibold my-2">Role</div>
            <div className="font-medium">{salaryData.job?.role || "N/A"}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">
              Foreign Currency Stipend
            </div>
            <div>{salaryData.foreignCurrencyStipend || "N/A"}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">
              Accommodation
            </div>
            <div>{salaryData.accommodation ? "Yes" : "No"}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">
              PPO Provision
            </div>
            <div>{salaryData.ppoProvisionOnPerformance ? "Yes" : "No"}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">
              Tentative CTC for PPO
            </div>
            <div>
              {salaryData.tentativeCTC
                ? formatNumber(salaryData.tentativeCTC)
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">
              PPO Confirmation Date
            </div>
            <div>
              {salaryData.PPOConfirmationDate
                ? formatDate(salaryData.PPOConfirmationDate)
                : "N/A"}
            </div>
          </div>
        </div>
      )}

      {isExpanded && (
        <>
          <div className="my-4">
            <Separator />
          </div>

          {seasonType === "PLACEMENT" && (
            <>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 text-sm mx-2 gap-4 mb-6">
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Joining Bonus
                  </div>
                  <div>
                    {salaryData.joiningBonus
                      ? formatNumber(salaryData.joiningBonus)
                      : "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Performance Bonus
                  </div>
                  <div>
                    {salaryData.performanceBonus
                      ? formatNumber(salaryData.performanceBonus)
                      : "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Relocation
                  </div>
                  <div>
                    {salaryData.relocation
                      ? formatNumber(salaryData.relocation)
                      : "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Bond Amount
                  </div>
                  <div>
                    {salaryData.bondAmount
                      ? formatNumber(salaryData.bondAmount)
                      : "N/A"}
                  </div>
                </div>
              </div>

              <div className="my-4">
                <Separator />
              </div>

              <div className="grid md:grid-cols-3 lg:grid-cols-4 text-sm mx-2 gap-4 mb-6">
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    ESOP Amount
                  </div>
                  <div>
                    {salaryData.esopAmount
                      ? formatNumber(salaryData.esopAmount)
                      : "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    ESOP Vest Period
                  </div>
                  <div>{salaryData.esopVestPeriod || "N/A"}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    First Year CTC
                  </div>
                  <div>
                    {salaryData.firstYearCTC
                      ? formatNumber(salaryData.firstYearCTC)
                      : "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Retention Bonus
                  </div>
                  <div>
                    {salaryData.retentionBonus
                      ? formatNumber(salaryData.retentionBonus)
                      : "N/A"}
                  </div>
                </div>
              </div>

              <div className="my-4">
                <Separator />
              </div>

              <div className="grid md:grid-cols-3 lg:grid-cols-4 text-sm mx-2 gap-4 mb-6">
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Deductions
                  </div>
                  <div>
                    {salaryData.deductions
                      ? formatNumber(salaryData.deductions)
                      : "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Medical Allowance
                  </div>
                  <div>
                    {salaryData.medicalAllowance
                      ? formatNumber(salaryData.medicalAllowance)
                      : "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Bond Duration
                  </div>
                  <div>{salaryData.bondDuration || "N/A"}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Foreign Currency CTC
                  </div>
                  <div>
                    {salaryData.foreignCurrencyCTC &&
                    salaryData.foreignCurrencyCode
                      ? `${salaryData.foreignCurrencyCTC} ${salaryData.foreignCurrencyCode}`
                      : "N/A"}
                  </div>
                </div>
              </div>

              <div className="my-4">
                <Separator />
              </div>
            </>
          )}

          <div className="my-4 mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 text-sm mx-2 gap-4 mb-6">
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Selection Mode
                </div>
                <div>
                  {salaryData.job?.selectionProcedure?.selectionMode || "N/A"}
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Shortlist from Resume
                </div>
                <div>
                  {salaryData.job?.selectionProcedure?.shortlistFromResume
                    ? "YES"
                    : "NO"}
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Group Discussion
                </div>
                <div>
                  {salaryData.job?.selectionProcedure?.groupDiscussion
                    ? "YES"
                    : "NO"}
                </div>
              </div>
            </div>

            <div className="my-4">
              <Separator />
            </div>

            <div className="font-semibold text-md mx-2 my-4">
              Selection Procedure
            </div>

            <h3 className="text-md font-semibold mx-2 mt-6 mb-2">Tests</h3>
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Sr.</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryData.job?.selectionProcedure?.tests?.length > 0 ? (
                    salaryData.job.selectionProcedure.tests.map(
                      (test, index) => (
                        <TableRow key={`test-${index}`}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{test.type || "N/A"}</TableCell>
                          <TableCell>
                            {test.duration ? `${test.duration} mins` : "N/A"}
                          </TableCell>
                        </TableRow>
                      ),
                    )
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center text-gray-500"
                      >
                        No tests specified
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <h3 className="text-md font-semibold mx-2 mt-6 mb-2">Interviews</h3>
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Sr.</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryData.job?.selectionProcedure?.interviews?.length >
                  0 ? (
                    salaryData.job.selectionProcedure.interviews.map(
                      (interview, index) => (
                        <TableRow key={`interview-${index}`}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{interview.type || "N/A"}</TableCell>
                          <TableCell>
                            {interview.duration
                              ? `${interview.duration} mins`
                              : "N/A"}
                          </TableCell>
                        </TableRow>
                      ),
                    )
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center text-gray-500"
                      >
                        No interviews specified
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="my-4">
            <Separator />
          </div>

          <div className="font-semibold text-md mx-2 my-4">Events</div>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Round</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salaryData.job?.events?.length > 0 ? (
                  salaryData.job.events.map((event, index) => (
                    <TableRow key={`event-${index}`}>
                      <TableCell>
                        {event.roundNumber !== null &&
                        event.roundNumber !== undefined
                          ? event.roundNumber
                          : "N/A"}
                      </TableCell>
                      <TableCell>{event.type || "N/A"}</TableCell>
                      <TableCell>
                        {event.startDateTime
                          ? formatDate(event.startDateTime)
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-gray-500"
                    >
                      No events scheduled
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {salaryData.job?.applications?.length > 0 && (
            <>
              <div className="my-4">
                <Separator />
              </div>

              <div className="font-semibold text-md mx-2 my-4">
                Applications
              </div>
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Sr.</TableHead>
                      <TableHead>Resume</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Additional Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryData.job.applications.map(
                      (application: Application, index: number) => {
                        // Find the matching resume from the resumes array
                        const matchingResume = resumes.find(
                          (resume) => resume.id === application.resume.id,
                        );

                        // Use the resume name if found, otherwise fallback to extracting from filepath
                        const displayName = matchingResume
                          ? matchingResume.name
                          : extractResumeDisplayName(
                              application.resume.filepath,
                            );

                        return (
                          <TableRow
                            key={`application-${application.id}-${index}`}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <button
                                className="text-blue-500 font-semibold hover:text-blue-600 transition-colors underline"
                                onClick={() =>
                                  handleOpenResume(application.resume.filepath)
                                }
                                type="button"
                              >
                                {displayName}
                              </button>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  application.resume.verified
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {application.resume.verified
                                  ? "Verified"
                                  : "Not Verified"}
                              </span>
                            </TableCell>
                            <TableCell>
                              {application.additionalData && Object.keys(application.additionalData).length > 0 ? (
                                <div className="max-w-xs">
                                  {Object.entries(application.additionalData).map(([key, value]) => (
                                    <div key={key} className="text-xs mb-1">
                                      <span className="font-medium text-gray-600">{key}:</span>{" "}
                                      <span className="text-gray-800">{String(value)}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-gray-400 text-xs">No additional data</span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      },
                    )}
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          {/* Additional Data Fields - Only show if event requires additional data and user hasn't applied yet */}
          {Object.keys(eventAdditionalData).length > 0 && !hasApplied && (
            <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">
                Additional Information Required
              </h4>
              <div className="space-y-4">
                {Object.entries(eventAdditionalData).map(([key, placeholder]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-blue-800 mb-2">
                      {key} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={additionalData[key] || ""}
                      onChange={(e) => setAdditionalData(prev => ({
                        ...prev,
                        [key]: e.target.value
                      }))}
                      placeholder={placeholder as string}
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-6 p-4 bg-gray-50 rounded-lg">
            <Select
              value={selectedResume || ""}
              onValueChange={handleResumeChange}
            >
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder="Select a Resume" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {resumes?.length > 0 ? (
                    resumes.map((resume) => (
                      <SelectItem key={resume.id} value={resume.id}>
                        <div className="flex items-center gap-2">
                          <span>{resume.name}</span>
                          {resume.verified && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="#10B981"
                              className="flex-shrink-0"
                            >
                              <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 10.874 21.803984 9.7942031 21.458984 8.7832031L19.839844 10.402344C19.944844 10.918344 20 11.453 20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C13.633 4 15.151922 4.4938906 16.419922 5.3378906L17.851562 3.90625C16.203562 2.71225 14.185 2 12 2zM21.292969 3.2929688L11 13.585938L7.7070312 10.292969L6.2929688 11.707031L11 16.414062L22.707031 4.7070312L21.292969 3.2929688z" />
                            </svg>
                          )}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-resumes" disabled>
                      No resumes available
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              disabled={!selectedResume || isApplying || hasApplied}
              onClick={handleApply}
              className={`w-full sm:w-auto px-6 ${
                hasApplied
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isApplying ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Applying...
                </div>
              ) : hasApplied ? (
                "Applied"
              ) : (
                "Apply"
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SalaryCard;
