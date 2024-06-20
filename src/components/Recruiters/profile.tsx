import React, { useState } from "react";
import profileImg from "@/../public/profile-icon.svg";
import { ProfileFC, updateProfileFC } from "@/helpers/recruiter/api";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogTitle,
  DialogContent,
} from "../ui/dialog";
import { patchProfile } from "@/helpers/recruiter/api";
import Cookies from "js-cookie";

const EditForm = (params: { profile: ProfileFC }) => {
  const { profile } = params;
  const [email, updateEmail] = useState<string>(
    profile.user.email ? profile.user.email : ""
  );
  const [contact, updateContact] = useState<string>(
    profile.user.contact ? profile.user.contact : ""
  );
  const [name, updateName] = useState<string>(
    profile.user.name ? profile.user.name : ""
  );
  const [designation, setDesignation] = useState<string>(
    profile.designation ? profile.designation : ""
  );
  const [landline, setlandline] = useState<string>(
    profile.landline ? profile.landline : ""
  );

  const updateProfile = () => {
    const data: updateProfileFC = {
      designation: designation,
      landline: landline,
      user: {
        name: name,
        email: email,
        contact: contact,
      },
    };
    const triggerUpdate = async () => {
      const res = await patchProfile(Cookies.get("accessToken"), data);
      window.location.reload();
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
          <span className="font-semibold">Designation: </span>
          <input
            className="rounded"
            type="text"
            value={designation}
            onChange={(e) => {
              setDesignation(e.target.value);
            }}
          />
        </div>
        <div>
          <span className="font-semibold">Landline: </span>
          <input
            className="rounded"
            type="text"
            value={landline}
            onChange={(e) => {
              setlandline(e.target.value);
            }}
          />
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

const RecruiterProfile = (params: { profile: ProfileFC }) => {
  return (
    <div>
      <div className="grid justify-center border-4 border-black hover:border-gray-800 rounded-lg px-12 py-8">
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
    </div>
  );
};

export default RecruiterProfile;
