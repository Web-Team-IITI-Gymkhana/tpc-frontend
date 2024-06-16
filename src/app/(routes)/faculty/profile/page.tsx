"use client";

import React, { useEffect, useState } from "react";
import FacultyProfile from "@/components/Faculty/Profile";
import { fetchProfile } from "@/helpers/faculty/api";
import Cookies from "js-cookie";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
import { ProfileFC } from "@/helpers/faculty/api";

const Profile = ({ params }: { params: { facultyId: string } }) => {
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
      {data && <FacultyProfile profile={data} />}
    </div>
  );
};

export default Profile;
