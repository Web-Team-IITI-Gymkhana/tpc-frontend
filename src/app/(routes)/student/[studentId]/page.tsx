"use client";
import React, { use, useContext, useEffect, useState } from "react";

import { StudentProfile } from "@/dummyData/studentProfile";
import { ToggleContext } from "@/contextProviders/ToggleProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import PersonalDetails from "@/components/Students/ProfileSections/PersonalDetails";

interface Props {}

const ProfileOptions = [
  "Internships/Placements",
  "Personal Details",
  "Academic Details",
  "Experience",
  "Technical Skills",
  "Projects",
  "Accomplishments",
  "Resumes",
];

const StudentPage = () => {
  const { isOpen, sidebarToggle, isDisabled, sidebarDisable } =
    useContext(ToggleContext);
  useEffect(() => {
    if (isOpen) sidebarToggle();
    sidebarDisable();
  }, []);

  const [profileOption, setProfileOption] = useState("Internships/Placements");

  return (
    <div className="flex flex-col gap-2 overflow-y-scroll">
      {/* <div className="bg-white px-4 py-4 shadow-sm rounded-md flex justify-between align-middle">
        <div className="text-xl font-bold align-middle">Your Profile</div>
        <div className="flex gap-2">
          <div className="rounded-md duration-150 border-black border-2 px-2 py-1 hover:text-white hover:bg-black">
            Update Profile
          </div>
          <div className="rounded-md duration-150 border-black border-2 px-2 py-1 hover:text-white hover:bg-black">
            Hello
          </div>
        </div>
      </div> */}
      <div className="shadow-md rounded-md overflow-clip">
        <div className="bg-white shadow-sm rounded-md flex justify-stretch h-[80vh]">
          <div className="font-medium flex flex-col w-[20%]">
            <div className="flex flex-col gap-1 bg-[#f0f0f0] py-4 px-4 border-b-2">
              <div className="w-full flex justify-center">
                <div className="rounded-full w-20 h-20 flex justify-center align-middle bg-slate-100 overflow-clip mb-4 ring-2 inset-2 ring-slate-700">
                  <img src={StudentProfile.profileImage} alt="Profile Pic" />
                </div>
              </div>
              <div className="w-full text-center font-bold text-2xl">
                {StudentProfile.name}
              </div>
            </div>
            <ScrollArea className="w-full">
              <div className="p-2">
                {ProfileOptions.map((item: string, index: number) => {
                  return (
                    <>
                      <div
                        key={index}
                        onClick={() => {
                          setProfileOption(item);
                        }}
                        className={`text-sm cursor-pointer pl-2 hover:text-blue-400 hover:scale-95 transition-all fade-in-out ${
                          profileOption === item ? "text-blue-600" : ""
                        }`}
                      >
                        {item.toUpperCase()}
                        <Separator className="my-2" />
                      </div>
                    </>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
          <div className="w-[80%] pt-4 px-4 border-l-2 inset-2 border-[#f0f0f0]">
            {profileOption === "Internships/Placements" && (
              <>{profileOption.toUpperCase()}</>
            )}
            {profileOption === "Personal Details" && <PersonalDetails />}
            {profileOption === "Academic Details" && (
              <>{profileOption.toUpperCase()}</>
            )}
            {profileOption === "Experience" && (
              <>{profileOption.toUpperCase()}</>
            )}
            {profileOption === "Technical Skills" && (
              <>{profileOption.toUpperCase()}</>
            )}
            {profileOption === "Projects" && <>{profileOption.toUpperCase()}</>}
            {profileOption === "Accomplishments" && (
              <>{profileOption.toUpperCase()}</>
            )}
            {profileOption === "Resumes" && <>{profileOption.toUpperCase()}</>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
