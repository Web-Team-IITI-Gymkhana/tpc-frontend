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
  Loader2
} from "lucide-react";

const ProfilePage = () => {
  const [studentData, setStudentData] = useState<StudentDataType | null>(null);
  const [totalPenalty, setTotalPenalty] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [deregistering, setDeregistering] = useState(false);

  const handleRegister = async (seasonId: string, registered: boolean) => {
    const res = await RegisterSeason(seasonId, registered);
    if (res) {
      if (registered) toast.success("Deregistered successfully");
      else toast.success("Registered successfully");
      setStudentData(prevState => {
        if (!prevState) return null;

        const updatedRegistrations = prevState.registrations.map(registration =>
          registration.season.id === seasonId
            ? { ...registration, registered: !registered }
            : registration
        );

        return {
          ...prevState,
          registrations: updatedRegistrations
        };
      });
    } else {
      toast.error("Some Error Occurred");
    }
  }

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await GetStudentData();
        setStudentData(data);

        if (data) {
          const total = data.penalties.reduce(
            (sum: number, penalty) => sum + penalty.penalty,
            0,
          );
          setTotalPenalty(total);
        }
      } catch (error) {
        toast.error("Error fetching data:");
      } finally {
        setLoading(false);
      }
    };

    if (studentData === null) {
      fetchStudentData();
    }
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              {loading ? (
                <ProfileNavLoader />
              ) : (
                <>
                  <h1 className="text-2xl font-bold mb-2">{studentData.user.name}</h1>
                  <div className="inline-flex items-center bg-white/20 text-white border border-white/30 text-sm px-3 py-1 rounded-full">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {studentData.rollNo}
                  </div>
                </>
              )}
            </div>
            
            <div className="flex gap-4">
              {!isRegistered && (
                <Button 
                  onClick={() => handleRegister(studentData.registrations[0].season.id, false)}
                  disabled={registering}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                >
                  {registering ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Register for Season
                    </>
                  )}
                </Button>
              )}
              
              {isRegistered && (
                <Button 
                  onClick={() => handleRegister(studentData.registrations[0].season.id, true)}
                  disabled={deregistering}
                  variant="outline"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                >
                  {deregistering ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deregistering...
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Deregister
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-b border-slate-300 bg-slate-50/80 p-6">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-slate-600" />
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-indigo-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-600 mb-1">Email Address</p>
                <p className="text-slate-900 font-medium text-sm">{studentData.user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-600 mb-1">Contact Number</p>
                <p className="text-slate-900 font-medium text-sm">{studentData.user.contact}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Program Information */}
        <div className="border-b border-slate-300 bg-slate-50/80 p-6">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-slate-600" />
            Program Information
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-violet-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">Course</p>
                <p className="text-slate-900 font-medium text-sm truncate">{studentData.program.course}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">Branch</p>
                <p className="text-slate-900 font-medium text-sm truncate">{studentData.program.branch}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <Building className="w-4 h-4 text-slate-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">Department</p>
                <p className="text-slate-900 font-medium text-sm truncate">{studentData.program.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-indigo-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">Year</p>
                <p className="text-slate-900 font-medium text-sm">{studentData.program.year}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-slate-600" />
            Academic Performance
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-10 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-amber-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">Category</p>
                <p className="text-slate-900 font-medium text-sm">{studentData.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-rose-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">Gender</p>
                <p className="text-slate-900 font-medium text-sm">{studentData.gender}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">CPI</p>
                <p className="text-slate-900 font-bold text-lg">{studentData.cpi}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-sky-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">10th Marks</p>
                <p className="text-slate-900 font-medium text-sm">{studentData.tenthMarks}%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-300 shadow-sm">
              <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-violet-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 mb-1">12th Marks</p>
                <p className="text-slate-900 font-medium text-sm">{studentData.twelthMarks}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Penalties Table */}
        {studentData.penalties && studentData.penalties.length > 0 && (
          <div className="border-t border-slate-300 p-6">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Penalties
            </h2>
            <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr. No.</TableHead>
                    <TableHead>Penalty</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentData.penalties.map((penalty, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-semibold">{penalty.penalty}</TableCell>
                      <TableCell>{penalty.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
