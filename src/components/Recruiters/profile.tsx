import React, { useEffect, useState } from "react";
import profileImg from "@/../public/profile-icon.svg";
import { ProfileFC, updateProfileFC } from "@/helpers/recruiter/types";
import { Button } from "../ui/button";
import PersonIcon from "@mui/icons-material/Person";

const RecruiterProfile = (params: {
  profile: ProfileFC;
  setEdit: () => void;
}) => {
  return (
    <div className="flex flex-col justify-center border-4 border-black hover:border-gray-800 rounded-lg px-12 py-8 w-max overflow-hidden">
      <div className=" relative flex justify-between items-center">
        <PersonIcon sx={{ fontSize: 80 }} />
        <Button onClick={params.setEdit}>Edit Details</Button>
      </div>

      <div className="flex md:flex-row flex-col w-full gap-8 flex-1">
        <div className="mt-4 p-8 rounded-lg bg-gray-100">
          <div>
            <div>
              <span className="font-semibold">Name: </span>
              {params.profile.user.name}
            </div>
            <div>
              <span className="font-semibold">Designation: </span>
              {params.profile.designation}
            </div>
            <div>
              <span className="font-semibold">Landline: </span>
              {params.profile.landline}
            </div>
            <div>
              <span className="font-semibold">Email: </span>
              {params.profile.user.email}
            </div>
            <div>
              <span className="font-semibold">Contact: </span>
              {params.profile.user.contact}
            </div>
          </div>
        </div>

        <div className="mt-4 p-8 rounded-lg bg-gray-100 w-full">
          <h2 className="font-semibold text-xl text-center mb-4">
            Company Details
          </h2>
          <div>
            <span className="font-semibold">Name: </span>
            <span>{params.profile.company.name}</span>
          </div>
          <div>
            <span className="font-semibold">Domains: </span>
            <span>
              {params.profile.company.domains.map(
                (domain, index) => `${domain}, `
              )}
            </span>
          </div>
          <div>
            <span className="font-semibold">Category: </span>
            <span>{params.profile.company.category}</span>
          </div>
          <div>
            <span className="font-semibold">Address: </span>
            <ul className="capitalize ml-8">
              {Object.entries(params.profile.company.address).map(
                ([key, value]) => (
                  <li key={key}>
                    {key} : {value}
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <span className="font-semibold">Size: </span>
            <span>{params.profile.company.size}</span>
          </div>
          <div>
            <span className="font-semibold">Year of Establishment: </span>
            <span>{params.profile.company.yearOfEstablishment}</span>
          </div>
          <div>
            <span className="font-semibold">Social Media Link: </span>
            <a href={params.profile.company.socialMediaLink}>
              {params.profile.company.socialMediaLink}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
