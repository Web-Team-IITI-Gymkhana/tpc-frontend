import React, { useState, useEffect } from "react";
import { ProfileFC } from "@/helpers/recruiter/types";
import { Button } from "../ui/button";
import { EditForm, EditCompanyForm } from "./editProfile";
import { fetchProfile } from "@/helpers/recruiter/api";
import { ProfileLoader, ProfileNavLoader } from "../Loader/loaders";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Mail,
  Phone,
  User,
  Building,
  MapPin,
  Calendar,
  Globe,
  Edit3,
  Briefcase,
} from "lucide-react";

const ProfileDetails = ({ profile }: { profile: ProfileFC }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
        <div className="w-10 md:w-12 h-10 md:h-12 bg-amber-100 rounded-full flex items-center justify-center">
          <Phone className="w-5 md:w-6 h-5 md:h-6 text-amber-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-600 mb-1">Landline</p>
          <p className="text-slate-900 font-medium truncate">
            {profile.landline}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
        <div className="w-10 md:w-12 h-10 md:h-12 bg-indigo-100 rounded-full flex items-center justify-center">
          <Mail className="w-5 md:w-6 h-5 md:h-6 text-indigo-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-600 mb-1">
            Email Address
          </p>
          <p className="text-slate-900 font-medium truncate">
            {profile.user.email}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
        <div className="w-10 md:w-12 h-10 md:h-12 bg-emerald-100 rounded-full flex items-center justify-center">
          <Phone className="w-5 md:w-6 h-5 md:h-6 text-emerald-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-600 mb-1">
            Mobile Contact
          </p>
          <p className="text-slate-900 font-medium truncate">
            {profile.user.contact}
          </p>
        </div>
      </div>
    </div>
  );
};

const CompanyProfileCard = ({ profile }: { profile: ProfileFC }) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-slate-100 rounded-full flex items-center justify-center">
            <Building className="w-5 md:w-6 h-5 md:h-6 text-slate-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-600 mb-1">
              Company Name
            </p>
            <p className="text-slate-900 font-medium truncate">
              {profile.company.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-teal-100 rounded-full flex items-center justify-center">
            <User className="w-5 md:w-6 h-5 md:h-6 text-teal-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-600 mb-1">Category</p>
            <p className="text-slate-900 font-medium truncate">
              {profile.company.category}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-violet-100 rounded-full flex items-center justify-center">
            <User className="w-5 md:w-6 h-5 md:h-6 text-violet-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-600 mb-1">
              Company Size
            </p>
            <p className="text-slate-900 font-medium truncate">
              {profile.company.size}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <Calendar className="w-5 md:w-6 h-5 md:h-6 text-amber-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-600 mb-1">
              Established
            </p>
            <p className="text-slate-900 font-medium truncate">
              {profile.company.yearOfEstablishment}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-sky-100 rounded-full flex items-center justify-center">
            <Globe className="w-5 md:w-6 h-5 md:h-6 text-sky-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-600 mb-1">
              Social Media
            </p>
            <a
              href={profile.company.socialMediaLink}
              className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline truncate block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.company.socialMediaLink}
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-5 md:w-6 h-5 md:h-6 text-rose-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-600 mb-1">Domains</p>
            <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
              {profile.company.domains.map((domain, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 md:px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-slate-600" />
            <p className="text-sm font-medium text-slate-600">Address</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 text-sm">
            {Object.entries(profile.company.address).map(([key, value]) => (
              <div key={key} className="capitalize">
                <span className="font-medium text-slate-600">{key}:</span>{" "}
                <span className="text-slate-900 break-words">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const RecruiterProfile = () => {
  const [view, setView] = useState<string>("PROFILE");
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<ProfileFC>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileData = async () => {
      const jsonData = await fetchProfile();
      setData(jsonData);
      setLoading(false);
    };
    profileData();
  }, []);

  const handleViewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setView(e.target.value);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-2 md:p-6">
      <div className="w-full bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="relative">
              <div className="w-16 md:w-20 h-16 md:h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Briefcase className="w-8 md:w-10 h-8 md:h-10 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 md:w-6 h-5 md:h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              {loading ? (
                <ProfileNavLoader />
              ) : (
                <>
                  <h1 className="text-xl md:text-2xl font-bold mb-2">
                    {data?.user.name}
                  </h1>
                  <div className="inline-flex items-center bg-white/20 text-white border border-white/30 text-sm px-3 py-1 rounded-full">
                    <User className="w-4 h-4 mr-2" />
                    {data?.designation}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation and Content */}
        <div className="border-b border-slate-300 bg-slate-50/80">
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-lg md:text-xl font-semibold text-slate-800 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-slate-600" />
                {view === "PROFILE"
                  ? "Personal Information"
                  : "Company Information"}
              </h2>

              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* View Toggle */}
                <div className="flex bg-slate-200 rounded-xl p-1 flex-1 md:flex-initial">
                  <label className="flex items-center cursor-pointer flex-1 md:flex-initial">
                    <input
                      type="radio"
                      name="view"
                      value="PROFILE"
                      checked={view === "PROFILE"}
                      onChange={handleViewChange}
                      className="sr-only"
                    />
                    <span
                      className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center flex-1 md:flex-initial ${
                        view === "PROFILE"
                          ? "bg-white text-slate-700 shadow-sm"
                          : "text-slate-600 hover:text-slate-800"
                      }`}
                    >
                      Personal
                    </span>
                  </label>

                  <label className="flex items-center cursor-pointer flex-1 md:flex-initial">
                    <input
                      type="radio"
                      name="view"
                      value="COMPANY"
                      checked={view === "COMPANY"}
                      onChange={handleViewChange}
                      className="sr-only"
                    />
                    <span
                      className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center flex-1 md:flex-initial ${
                        view === "COMPANY"
                          ? "bg-white text-slate-700 shadow-sm"
                          : "text-slate-600 hover:text-slate-800"
                      }`}
                    >
                      Company
                    </span>
                  </label>
                </div>

                {/* Edit Button */}
                {!edit && (
                  <Button
                    onClick={() => setEdit(!edit)}
                    className="bg-slate-700 hover:bg-slate-800 text-white text-sm px-3 md:px-4"
                  >
                    <Edit3 className="w-4 h-4 mr-1 md:mr-2" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8">
          {loading ? (
            <ProfileLoader />
          ) : view === "PROFILE" ? (
            edit ? (
              <EditForm profile={data} />
            ) : (
              <ProfileDetails profile={data} />
            )
          ) : edit ? (
            <EditCompanyForm profile={data} />
          ) : (
            <CompanyProfileCard profile={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
