"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUserById } from "@/helpers/api";
import { ProfileLoader, ProfileNavLoader } from "../Loader/loaders";
import PersonIcon from "@mui/icons-material/Person";

interface ProfileProps {
  name: string;
  email: string;
  contact: string;
  role: string;
}

const AdminProfile = () => {
  const [profile, setProfile] = useState<ProfileProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const user = Cookies.get("user");
      const userId = JSON.parse(user).id;
      const data = await getUserById(userId);
      setProfile(data[0]);
      setLoading(false);
    };
    setData();
  }, []);

  return (
    <div className="w-full flex justify-center mt-16">
      <div className="w-full lg:w-2/3 md:w-3/4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
          <div className="flex">
            <div className="w-1/3 bg-gradient-to-br from-gray-400 to-gray-900 text-center text-white py-5">
              <div className="mb-6">
                <PersonIcon sx={{ fontSize: "6rem" }} />
              </div>
              {loading ? (
                <ProfileNavLoader />
              ) : (
                <>
                  <h6 className="text-lg font-semibold">{profile.name}</h6>
                  <p>{profile.role}</p>
                </>
              )}
            </div>
            <div className="w-2/3">
              <div className="p-5">
                <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-300">
                  Self Details
                </div>
                {loading ? (
                  <ProfileLoader />
                ) : (
                  <div className="mb-4 overflow-x-auto">
                    <div>
                      <span className="font-semibold">Email: </span>
                      <span>{profile.email}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Contact: </span>
                      <span>{profile.contact}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
