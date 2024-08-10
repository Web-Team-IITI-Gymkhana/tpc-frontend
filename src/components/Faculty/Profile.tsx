import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { patchProfile } from "@/helpers/faculty/api";
import toast from "react-hot-toast";
import { ProfileFC, updateProfileFC } from "@/helpers/faculty/types";
import PersonIcon from "@mui/icons-material/Person";
import { fetchProfile } from "@/helpers/faculty/api";
import { ProfileLoader, ProfileNavLoader } from "../Loader/loaders";

const EditForm = (params: { profile: ProfileFC }) => {
  const [email, updateEmail] = useState<string>(params.profile.user.email);
  const [contact, updateContact] = useState<string>(
    params.profile.user.contact,
  );
  const [name, updateName] = useState<string>(params.profile.user.name);

  const updateProfile = () => {
    const data: updateProfileFC = {
      user: {
        name: name,
        email: email,
        contact: contact,
      },
    };

    const triggerUpdate = async () => {
      const res = await patchProfile(data);
      if (res) {
        window.location.reload();
      } else {
        toast.error("Some Error Occurred");
      }
    };
    triggerUpdate();
  };

  return (
    <div className="text-black">
      <div className="mt-8 p-4 rounded-lg bg-gray-100 leading-10">
        <div>
          <span className="font-semibold">Name: </span>
          <input
            className="rounded"
            type="text"
            value={name}
            onChange={(e) => {
              updateName(e.target.value);
            }}
          />
        </div>
        <div>
          <span className="font-semibold">Department: </span>
          {params.profile.department}
        </div>
        <div className="flex gap-8 mb-2">
          <span className="font-semibold">Email: </span>
          <input
            className="rounded"
            type="email"
            value={email}
            onChange={(e) => {
              updateEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-8">
          <span className="font-semibold">Contact: </span>
          <input
            type="text"
            value={contact}
            onChange={(e) => {
              updateContact(e.target.value);
            }}
          />
        </div>

        <div className="mt-4">
          <Button
            className="w-full"
            onClick={() => {
              updateProfile();
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

const FacultyProfile = () => {
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
                  <p>{data.department}</p>
                </>
              )}
            </div>
            <div className="w-2/3">
              <div className="p-5">
                <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-300">
                  Faculty Details
                  {loading || (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Edit Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <EditForm profile={data} />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                <div className="mb-4">
                  {loading ? (
                    <ProfileLoader />
                  ) : (
                    <>
                      <div>
                        <span className="font-semibold">Email: </span>
                        <span>{data.user.email}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Contact: </span>
                        <span>{data.user.contact}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
