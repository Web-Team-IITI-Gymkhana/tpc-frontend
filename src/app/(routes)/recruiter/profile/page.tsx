"use client";

import React, { useEffect, useState } from "react";
import RecruiterProfile from "@/components/Recruiters/profile";
import { fetchProfile } from "@/helpers/recruiter/api";
import Cookies from "js-cookie";
import loadingImg from "@/../public/loadingSpinner.svg";
import { ProfileFC } from "@/helpers/recruiter/types";
import EditProfilePage from "@/components/Recruiters/editProfile";

const Profile = () => {
  const [data, setData] = useState<ProfileFC>();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const profileData = async () => {
      const jsonData = await fetchProfile(Cookies.get("accessToken"));
      setData(jsonData);
      setLoading(false);
    };
    profileData();
  }, []);

  return (
    <div className="h-screen flex justify-center">
      {loading && <img src={loadingImg.src} width={200} />}
      {data &&
        (editMode ? (
          <EditProfilePage data={data} />
        ) : (
          <RecruiterProfile
            profile={data}
            setEdit={() => setEditMode(!editMode)}
          />
        ))}
    </div>
  );
};

export default Profile;
