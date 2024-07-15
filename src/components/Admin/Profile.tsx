"use client";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Cookies from "js-cookie";
import { getUserById } from "@/helpers/api";
import Loader from "../Loader/loader";

interface ProfileProps {
  name: string;
  email: string;
  contact: string;
  role: string;
}

const AdminProfile = () => {
  const [profile, setProfile] = useState<ProfileProps>();

  useEffect(() => {
    const setData = async () => {
      const user = Cookies.get("user");
      const userId = JSON.parse(user).id;
      const data = await getUserById(userId);
      console.log(data);
      setProfile(data[0]);
    };
    setData();
  }, []);

  return (
    <div>
      <div className="grid justify-center border-4 border-black rounded-lg px-12 py-8 md:w-max w-[95vw]">
        <div className="flex w-full justify-between items-center">
          <AccountCircleIcon sx={{ fontSize: "5rem" }} />
        </div>
        {profile ? (
          <div className="mt-8 p-8 rounded-lg bg-gray-100 flex flex-col flex-wrap">
            <div>
              <span className="font-semibold">Name: </span>
              {profile.name}
            </div>
            <div>
              <span className="font-semibold">Email: </span>
              {profile.email}
            </div>
            <div>
              <span className="font-semibold">Role: </span>
              {profile.role}
            </div>
            <div>
              <span className="font-semibold">Contact: </span>
              {profile.contact}
            </div>
          </div>
        ) : (
          <div className="p-12">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
