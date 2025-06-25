"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUserById } from "@/helpers/api";
import { ProfileLoader, ProfileNavLoader } from "../Loader/loaders";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Mail, Phone, User, Shield } from "lucide-react";

interface ProfileProps {
  name: string;
  email: string;
  contact: string;
  role: string;
}

const AdminProfile = () => {
  const [profile, setProfile] = useState<ProfileProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const user = Cookies.get("user");
      const userId = JSON.parse(user).id;
      const data = await getUserById(userId);
      setProfile(data[0]);
      setLoading(false);
    };
    setData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-10 h-10 text-white" />
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
                  <h1 className="text-2xl font-bold mb-2">{profile?.name}</h1>
                  <div className="inline-flex items-center bg-white/20 text-white border border-white/30 text-sm px-3 py-1 rounded-full">
                    <User className="w-4 h-4 mr-2" />
                    {profile?.role}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-8 w-full">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-slate-600" />
              Profile Information
            </h2>
          </div>
          
          {loading ? (
            <ProfileLoader />
          ) : (
            <div className="grid grid-cols-1 w-full lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-indigo-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Email Address</p>
                  <p className="text-slate-900 font-medium">{profile?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Contact Number</p>
                  <p className="text-slate-900 font-medium">{profile?.contact}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-violet-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Role</p>
                  <p className="text-slate-900 font-medium">{profile?.role}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
