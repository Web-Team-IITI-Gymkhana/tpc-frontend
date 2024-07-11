"use client";

import React, { useEffect, useState } from "react";
import RecruiterProfile from "@/components/Recruiters/profile";
import { fetchProfile } from "@/helpers/recruiter/api";
import loadingImg from "@/../public/loadingSpinner.svg";
import { ProfileFC } from "@/helpers/recruiter/types";
import EditProfilePage from "@/components/Recruiters/editProfile";
import Loader from "@/components/Loader/loader";
const Profile = () => {
  const [data, setData] = useState<ProfileFC>();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const profileData = async () => {
      const jsonData = await fetchProfile();
      setData(jsonData);
      setLoading(false);
    };
    profileData();
  }, []);

  return (
    <div className="h-screen flex justify-center">
      {loading && <div className="h-screen w-full flex justify-center items-center">
       <Loader/>
      </div>}
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
