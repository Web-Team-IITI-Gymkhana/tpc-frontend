import React, { useState } from "react";
import profileImg from "@/../public/profile-icon.svg";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { patchProfile } from "@/helpers/faculty/api";
import toast from "react-hot-toast";
import { ProfileFC, updateProfileFC } from "@/helpers/faculty/types";

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
        toast.error("Some Error Occured",{duration: 3000});
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

const FacultyProfile = (params: { profile: ProfileFC }) => {
  return (
    <div>
      <div className="grid justify-center border-4 border-black rounded-lg px-12 py-8">
        <div className="flex justify-between items-center">
          <img src={profileImg.src} width="100px" alt="" />
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit Details</Button>
            </DialogTrigger>
            <DialogContent>
              <EditForm profile={params.profile} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-gray-100">
          <div>
            <span className="font-semibold">Name: </span>
            {params.profile.user.name}
          </div>
          <div>
            <span className="font-semibold">Department: </span>
            {params.profile.department}
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
    </div>
  );
};

export default FacultyProfile;
