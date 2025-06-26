import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { patchProfile } from "@/helpers/faculty/api";
import toast from "react-hot-toast";
import { ProfileFC, updateProfileFC } from "@/helpers/faculty/types";
import { fetchProfile } from "@/helpers/faculty/api";
import { ProfileLoader, ProfileNavLoader } from "../Loader/loaders";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Mail, Phone, User, GraduationCap, Building, Edit3 } from "lucide-react";

const EditForm = (params: { profile: ProfileFC }) => {
  const [email, updateEmail] = useState<string>(params.profile.user.email);
  const [contact, updateContact] = useState<string>(
    params.profile.user.contact,
  );
  const [name, updateName] = useState<string>(params.profile.user.name);

  const updateProfile = () => {
    const data: updateProfileFC = {
      user: {
        name: name,
        email: email,
        contact: contact,
      },
    };

    const triggerUpdate = async () => {
      const res = await patchProfile(data);
      if (res) {
        window.location.reload();
      } else {
        toast.error("Some Error Occurred");
      }
    };
    triggerUpdate();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Edit Profile</h2>
        <p className="text-slate-600">Update your personal information</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
          <input
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={name}
            onChange={(e) => updateName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
          <input
            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
            type="text"
            value={params.profile.department}
            disabled
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
          <input
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="email"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Contact Number</label>
          <input
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={contact}
            onChange={(e) => updateContact(e.target.value)}
            placeholder="Enter your contact number"
          />
        </div>
      </div>

      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 py-3"
        onClick={() => updateProfile()}
      >
        Update Profile
      </Button>
    </div>
  );
};

const FacultyProfile = () => {
  const [data, setData] = useState<ProfileFC>();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const profileData = async () => {
      const jsonData = await fetchProfile();
      setData(jsonData);
      setLoading(false);
    };
    profileData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-center md:text-left">
                {loading ? (
                  <ProfileNavLoader />
                ) : (
                  <>
                    <h1 className="text-2xl font-bold mb-2">{data?.user.name}</h1>
                    <div className="inline-flex items-center bg-white/20 text-white border border-white/30 text-sm px-3 py-1 rounded-full">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Faculty
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {!edit && (
              <Button 
                onClick={() => setEdit(!edit)}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-8">
          {edit ? (
            <EditForm profile={data} />
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-slate-600" />
                  Faculty Information
                </h2>
              </div>
              
              {loading ? (
                <ProfileLoader />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-indigo-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-600 mb-1">Email Address</p>
                      <p className="text-slate-900 font-medium">{data?.user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-emerald-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-600 mb-1">Contact Number</p>
                      <p className="text-slate-900 font-medium">{data?.user.contact}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-teal-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-600 mb-1">Department</p>
                      <p className="text-slate-900 font-medium">{data?.department}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
