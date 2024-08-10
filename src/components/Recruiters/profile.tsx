import React, { useState, useEffect } from "react";
import { ProfileFC } from "@/helpers/recruiter/types";
import { Button } from "../ui/button";
import PersonIcon from "@mui/icons-material/Person";
import { EditForm, EditCompanyForm } from "./editProfile";
import { fetchProfile } from "@/helpers/recruiter/api";
import { ProfileLoader, ProfileNavLoader } from "../Loader/loaders";

const ProfileDetails = ({ profile }: { profile: ProfileFC }) => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div>
          <span className="font-semibold">Landline: </span>
          {profile.landline}
        </div>
        <div>
          <span className="font-semibold">Email: </span>
          {profile.user.email}
        </div>
        <div>
          <span className="font-semibold">Contact: </span>
          {profile.user.contact}
        </div>
      </div>
    </>
  );
};

const CompanyProfileCard = ({ profile }: { profile: ProfileFC }) => {
  return (
    <>
      <div className="mb-4">
        <span className="font-semibold">Name: </span>
        <span>{profile.company.name}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Domains: </span>
        <span>{profile.company.domains.join(", ")}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Category: </span>
        <span>{profile.company.category}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Address: </span>
        <ul className="capitalize ml-4 list-disc">
          {Object.entries(profile.company.address).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Size: </span>
        <span>{profile.company.size}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Year of Establishment: </span>
        <span>{profile.company.yearOfEstablishment}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Social Media Link: </span>
        <a
          href={profile.company.socialMediaLink}
          className="text-blue-500 hover:underline"
        >
          {profile.company.socialMediaLink}
        </a>
      </div>
    </>
  );
};

const RecruiterProfile = () => {
  const [view, setView] = useState<string>("PROFILE");
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<ProfileFC>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileData = async () => {
      const jsonData = await fetchProfile();
      setData(jsonData);
      setLoading(false);
    };
    profileData();
  }, []);

  const handleViewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setView(e.target.value);
  };

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
                  <h6 className="text-lg font-semibold">{data.user.name}</h6>
                  <p>{data.designation}</p>
                </>
              )}
            </div>
            <div className="w-2/3">
              <div className="p-5">
                <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-300">
                  <div className="flex space-x-2 rounded-xl select-none">
                    <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                      <input
                        type="radio"
                        name="view"
                        value="PROFILE"
                        checked={view === "PROFILE"}
                        onChange={handleViewChange}
                        className="peer hidden"
                      />
                      <span className="tracking-widest peer-checked:bg-gradient-to-br peer-checked:from-gray-400 peer-checked:to-gray-900 peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                        Self
                      </span>
                    </label>

                    <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                      <input
                        type="radio"
                        name="view"
                        value="COMPANY"
                        checked={view === "COMPANY"}
                        onChange={handleViewChange}
                        className="peer hidden"
                      />
                      <span className="tracking-widest peer-checked:bg-gradient-to-br peer-checked:from-gray-400 peer-checked:to-gray-900 peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                        Company
                      </span>
                    </label>
                  </div>
                  {edit || (
                    <Button onClick={() => setEdit(!edit)}>
                      {edit ? "Save" : "Edit"}
                    </Button>
                  )}
                </div>
                {loading ? (
                  <ProfileLoader />
                ) : view === "PROFILE" ? (
                  edit ? (
                    <EditForm profile={data} />
                  ) : (
                    <ProfileDetails profile={data} />
                  )
                ) : edit ? (
                  <EditCompanyForm profile={data} />
                ) : (
                  <CompanyProfileCard profile={data} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
