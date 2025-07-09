"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { StudentDataType } from "@/helpers/student/types";
import { GetStudentData, RegisterSeason } from "@/helpers/student/api";
import { getSeasonPolicyDocument } from "@/helpers/api";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/loader";
import { ProfileNavLoader } from "@/components/Loader/loaders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  GraduationCap,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Mail,
  Phone,
  Award,
  Building,
  Users,
  CheckCircle,
  XCircle,
  Loader2,
  Info,
  X,
  FileText,
  Download,
} from "lucide-react";
import { OnboardingForm } from "@/components/Students/OnboardingForm";
import { Modal } from "@mui/material";

const ProfilePage = () => {
  const [studentData, setStudentData] = useState<StudentDataType | null>(null);
  const [totalPenalty, setTotalPenalty] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

  // Policy modal state
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<any>(null);
  const [policyAccepted, setPolicyAccepted] = useState(false);

  // Remove blob/iframe/scroll logic and add viewPolicyClicked state
  const [viewPolicyClicked, setViewPolicyClicked] = useState(false);

  const fetchStudentData = async () => {
    try {
      const data = await GetStudentData();
      console.log("Student data received:", data); // Debug log
      setStudentData(data);

      if (data) {
        const total = data.penalties.reduce(
          (sum: number, penalty) => sum + penalty.penalty,
          0,
        );
        setTotalPenalty(total);

        // Set registration status based on actual data
        if (data.registrations && data.registrations.length > 0) {
          console.log("Registrations found:", data.registrations); // Debug log
          setIsRegistered(data.registrations[0].registered);
        } else {
          console.log("No registrations found"); // Debug log
        }
      }
    } catch (error) {
      console.error("Error fetching student data:", error); // Debug log
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = (seasonId: string, registered: boolean) => {
    // Check onboarding completion before attempting registration
    if (needsOnboarding) {
      toast.error(
        "Please complete your profile onboarding before registering for seasons",
      );
      return;
    }

    // If deregistering, do it directly without policy modal
    if (registered) {
      handleRegister(seasonId, registered);
      return;
    }

    // For registration, find the season and show policy modal
    const season = studentData?.registrations.find(
      (reg) => reg.season.id === seasonId,
    );

    if (season) {
      setSelectedSeason(season);
      setPolicyAccepted(false);
      setPolicyModalOpen(true);
    }
  };

  const handleRegister = async (seasonId: string, registered: boolean) => {
    try {
      if (registered) {
        setRegistering(true);
      } else {
        setRegistering(true);
      }

      const res = await RegisterSeason(seasonId, registered);

      if (res) {
        if (registered) {
          toast.success("Deregistered successfully");
          setIsRegistered(false);
        } else {
          toast.success("Registered successfully");
          setIsRegistered(true);
        }

        setStudentData((prevState) => {
          if (!prevState) return null;

          const updatedRegistrations = prevState.registrations.map(
            (registration) =>
              registration.season.id === seasonId
                ? { ...registration, registered: !registered }
                : registration,
          );

          return {
            ...prevState,
            registrations: updatedRegistrations,
          };
        });

        // Close policy modal if open
        setPolicyModalOpen(false);
        setSelectedSeason(null);
        setPolicyAccepted(false);
      } else {
        toast.error("Some Error Occurred");
      }
    } catch (error: any) {
      if (error.message?.includes("onboarding")) {
        toast.error("Please complete your profile onboarding first");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setRegistering(false);
    }
  };

  const handlePolicyAccept = () => {
    if (selectedSeason && policyAccepted) {
      handleRegister(selectedSeason.season.id, false);
      setViewPolicyClicked(false);
    }
  };

  const handleDownloadPolicy = (policyDocument: string) => {
    getSeasonPolicyDocument(policyDocument);
  };

  useEffect(() => {
    fetchStudentData();
  }, []); // Add empty dependency array to run only once

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Loader />
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <p className="text-lg text-slate-600">No student data found</p>
        </div>
      </div>
    );
  }

  // Check if onboarding is needed
  const needsOnboarding =
    studentData.backlog === null ||
    studentData.backlog === undefined ||
    studentData.tenthMarks === null ||
    studentData.tenthMarks === undefined ||
    studentData.twelthMarks === null ||
    studentData.twelthMarks === undefined;

  const isOnboardingComplete = !needsOnboarding;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 md:p-6">
      <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 md:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-6">
            <div className="relative">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="text-center lg:text-left flex-1">
              {loading ? (
                <ProfileNavLoader />
              ) : (
                <>
                  <h1 className="text-xl md:text-2xl font-bold mb-2">
                    {studentData.user.name}
                  </h1>
                  <div className="inline-flex items-center bg-white/20 text-white border border-white/30 text-sm px-3 py-1 rounded-full">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {studentData.rollNo}
                  </div>
                </>
              )}
            </div>

            <div className="w-full lg:w-auto">
              {/* Registration Status Display */}
              {studentData.registrations &&
              studentData.registrations.length > 0 ? (
                <div className="text-center lg:text-right">
                  <p className="text-white/80 text-xs mb-2">
                    Registration Status
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-end gap-2">
                    {studentData.registrations.map((registration, index) => (
                      <div
                        key={index}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                          registration.registered
                            ? "bg-emerald-500/20 text-emerald-100 border-emerald-400/30"
                            : "bg-slate-500/20 text-slate-200 border-slate-400/30"
                        }`}
                      >
                        {registration.registered ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        <span className="truncate">
                          {registration.season.year} {registration.season.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-white/80 text-sm bg-white/10 px-3 py-2 rounded-lg border border-white/20 text-center">
                  No active seasons available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Onboarding Form */}
        {needsOnboarding && (
          <div className="border-b border-slate-300 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-6">
            <OnboardingForm
              studentData={studentData}
              onUpdate={fetchStudentData}
            />
          </div>
        )}

        {/* Personal Information */}
        <div className="border-b border-slate-300 bg-slate-50/80 p-3 md:p-6">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-slate-600" />
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-amber-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">
                  Category
                </p>
                <p className="text-slate-900 font-medium text-sm">
                  {studentData.category}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-rose-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">
                  Gender
                </p>
                <p className="text-slate-900 font-medium text-sm">
                  {studentData.gender}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-indigo-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">
                  Email Address
                </p>
                <p className="text-slate-900 font-medium text-sm break-all">
                  {studentData.user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">
                  Contact Number
                </p>
                <p className="text-slate-900 font-medium text-sm">
                  {studentData.user.contact}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Program Information */}
        <div className="border-b border-slate-300 bg-slate-50/80 p-3 md:p-6">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-slate-600" />
            Program Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-violet-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">
                  Course
                </p>
                <p
                  className="text-slate-900 font-medium text-sm"
                  title={studentData.program.course}
                >
                  {studentData.program.course}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">
                  Branch
                </p>
                <p
                  className="text-slate-900 font-medium text-sm"
                  title={studentData.program.branch}
                >
                  {studentData.program.branch}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Building className="w-5 h-5 text-slate-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">
                  Department
                </p>
                <p
                  className="text-slate-900 font-medium text-sm"
                  title={studentData.program.department}
                >
                  {studentData.program.department}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-indigo-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">Year</p>
                <p className="text-slate-900 font-medium text-sm">
                  {studentData.program.year}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="p-3 md:p-6">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-slate-600" />
            Academic Performance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">CPI</p>
                <p className="text-slate-900 font-medium text-lg">
                  {studentData.cpi}
                </p>
              </div>
            </div>

            {/* Backlog Status */}
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-purple-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">
                  Backlog Status
                </p>
                <p className="text-slate-900 font-medium text-sm">
                  {studentData.backlog ? (
                    studentData.backlog === "NEVER" ? (
                      "No Backlogs Ever"
                    ) : studentData.backlog === "PREVIOUS" ? (
                      "No Active Backlogs"
                    ) : (
                      "Having an Active Backlog"
                    )
                  ) : (
                    <span className="text-amber-600 font-medium">Pending</span>
                  )}
                </p>
              </div>
            </div>

            {/* 10th Marks */}
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-green-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">
                  10th Marks
                </p>
                <p className="text-slate-900 font-medium text-sm">
                  {studentData.tenthMarks !== null &&
                  studentData.tenthMarks !== undefined ? (
                    `${studentData.tenthMarks}%`
                  ) : (
                    <span className="text-amber-600 font-medium">Pending</span>
                  )}
                </p>
              </div>
            </div>

            {/* 12th Marks */}
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-teal-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">
                  12th Marks
                </p>
                <p className="text-slate-900 font-medium text-sm">
                  {studentData.twelthMarks !== null &&
                  studentData.twelthMarks !== undefined ? (
                    `${studentData.twelthMarks}%`
                  ) : (
                    <span className="text-amber-600 font-medium">Pending</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Penalties Table */}
        {studentData.penalties && studentData.penalties.length > 0 && (
          <div className="border-t border-slate-300 p-3 md:p-6">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Penalties
            </h2>
            <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Sr. No.</TableHead>
                      <TableHead className="w-24">Penalty</TableHead>
                      <TableHead className="min-w-[200px]">Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentData.penalties.map((penalty, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {penalty.penalty}
                        </TableCell>
                        <TableCell className="break-words">
                          {penalty.reason}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        {/* Registrations Table */}
        {studentData.registrations && studentData.registrations.length > 0 && (
          <div className="border-t border-slate-300 p-3 md:p-6">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              Season Registrations
            </h2>
            {needsOnboarding && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <Info className="w-4 h-4 inline mr-2" />
                  Please complete your profile onboarding above before
                  registering for seasons.
                </p>
              </div>
            )}
            <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Sr. No.</TableHead>
                      <TableHead className="w-20">Name</TableHead>
                      <TableHead className="min-w-[100px]">Type</TableHead>
                      <TableHead className="min-w-[140px]">Status</TableHead>
                      <TableHead className="min-w-[120px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentData.registrations.map((registration, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{registration.season.year}</TableCell>
                        <TableCell className="uppercase font-medium">
                          {registration.season.type}
                        </TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              registration.registered
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {registration.registered ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Registered
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 mr-1" />
                                Not Registered
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Button
                              onClick={() =>
                                handleRegisterClick(
                                  registration.season.id,
                                  registration.registered,
                                )
                              }
                              disabled={registering || needsOnboarding}
                              size="sm"
                              variant={
                                registration.registered ? "outline" : "default"
                              }
                              className="h-8 w-full sm:w-auto"
                            >
                              {registering ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : registration.registered ? (
                                "Deregister"
                              ) : (
                                "Register"
                              )}
                            </Button>
                            {needsOnboarding && (
                              <p className="text-xs text-amber-600 text-center sm:text-left">
                                Complete profile first
                              </p>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        {/* Policy Acceptance Modal */}
        <Modal
          open={policyModalOpen}
          onClose={() => {
            setPolicyModalOpen(false);
            setSelectedSeason(null);
            setPolicyAccepted(false);
          }}
          className="flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Season Policy</h2>
                    <p className="text-blue-100 text-sm">
                      {selectedSeason?.season.year} -{" "}
                      {selectedSeason?.season.type}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setPolicyModalOpen(false);
                    setSelectedSeason(null);
                    setPolicyAccepted(false);
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Policy Document Section */}
              {selectedSeason?.season?.policyDocument ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900">
                          Season Policy Document
                        </h3>
                        <p className="text-sm text-slate-600">
                          You must view the policy document before accepting the
                          terms and registering.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* View Policy button in its own row */}
                  <div className="mt-4">
                    <Button
                      onClick={() => {
                        handleDownloadPolicy(
                          selectedSeason.season.policyDocument,
                        );
                        setViewPolicyClicked(true);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      View Policy
                    </Button>
                    {!viewPolicyClicked && (
                      <div className="mt-2 text-xs text-amber-600">
                        Please view the policy before continuing
                      </div>
                    )}
                  </div>
                  {/* Policy Acceptance Checkbox */}
                  <div className="space-y-4 mt-4">
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <input
                        type="checkbox"
                        id="policyAccept"
                        checked={policyAccepted}
                        onChange={(e) => setPolicyAccepted(e.target.checked)}
                        disabled={!viewPolicyClicked}
                        className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <label
                        htmlFor="policyAccept"
                        className={`text-sm cursor-pointer ${viewPolicyClicked ? "text-slate-700" : "text-slate-400"}`}
                      >
                        I, {studentData.user.name}, Roll No {studentData.rollNo}{" "}
                        of {studentData.program.course}, hereby agree to abide
                        by the aforementioned Terms and Conditions and would not
                        violate them, thus maintaining confidentiality.
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    No Policy Document
                  </h3>
                  <p className="text-slate-600 mb-6">
                    This season doesn't have a specific policy document. You can
                    proceed with registration.
                  </p>
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <input
                      type="checkbox"
                      id="generalPolicyAccept"
                      checked={policyAccepted}
                      onChange={(e) => setPolicyAccepted(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="generalPolicyAccept"
                      className="text-sm text-slate-700 cursor-pointer"
                    >
                      I, {studentData.user.name}, Roll No {studentData.rollNo}{" "}
                      of {studentData.program.course}, hereby agree to abide by
                      the aforementioned Terms and Conditions and would not
                      violate them, thus maintaining confidentiality.
                    </label>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
                <Button
                  onClick={() => {
                    setPolicyModalOpen(false);
                    setSelectedSeason(null);
                    setPolicyAccepted(false);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePolicyAccept}
                  disabled={
                    !policyAccepted || !viewPolicyClicked || registering
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {registering ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Accept & Register"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePage;
