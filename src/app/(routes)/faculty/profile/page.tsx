"use client";

import React, { useEffect, useState } from "react";
import FacultyProfile from "@/components/Faculty/Profile";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
import { ProfileFC } from "@/helpers/faculty/types";
import Loader from "@/components/Loader/loader";

const Profile = ({ params }: { params: { facultyId: string } }) => {
  return (
    <div className="min-h-screen p-2 md:p-4">
      <FacultyProfile />
    </div>
  );
};

export default Profile;
