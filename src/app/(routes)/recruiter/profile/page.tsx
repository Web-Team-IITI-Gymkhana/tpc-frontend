"use client";

import React, { useEffect, useState } from "react";
import RecruiterProfile from "@/components/Recruiters/profile";
import { fetchProfile } from "@/helpers/recruiter/api";
import Cookies from "js-cookie";
import loadingImg from "@/../public/loadingSpinner.svg";
import { ProfileFC } from "@/helpers/recruiter/api";

const Profile = ({ params }: { params: { RecruiterId: string } }) => {
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
    <div className="h-screen grid justify-center items-center">
      {loading && <img src={loadingImg.src} />}
      {data && <RecruiterProfile profile={data} />}
    </div>
  );
};

export default Profile;
