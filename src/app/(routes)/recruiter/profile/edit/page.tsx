"use client";
import React, { useEffect, useState } from "react";
import { EditForm, EditCompanyForm } from "@/components/Recruiters/editProfile";
import { ProfileFC, fetchProfile } from "@/helpers/recruiter/api";
import loadingImg from "@/../public/loadingSpinner.svg";
import Cookies from "js-cookie";

const EditProfilePage = () => {
  const [data, setData] = useState<ProfileFC>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileData = async () => {
      const jsonData = await fetchProfile(Cookies.get("accessToken"));
      setData(jsonData);
      setLoading(false);
    };
    profileData();
  }, []);
  return (
    <div>
      {loading && (
        <div className="w-full flex justify-center">
          <img src={loadingImg.src} width={200} />
        </div>
      )}

      {data && (
        <div className="flex md:flex-row flex-col justify-around">
          <div className="">
            <h2 className="text-xl font-bold text-center">Company Details</h2>
            <EditCompanyForm profile={data} />
          </div>
          <div className="">
            <h2 className="text-xl font-bold text-center">Profile Details</h2>
            <EditForm profile={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;
