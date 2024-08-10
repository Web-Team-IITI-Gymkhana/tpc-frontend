"use client";

import React from "react";
import RecruiterProfile from "@/components/Recruiters/profile";
import Loader from "@/components/Loader/loader";
const Profile = () => {
  return (
    <div className="h-screen flex justify-center">
      <RecruiterProfile />
    </div>
  );
};

export default Profile;
