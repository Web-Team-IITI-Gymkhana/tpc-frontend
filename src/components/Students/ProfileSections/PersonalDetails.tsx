"use client";

import { StudentProfile } from "@/dummyData/studentProfile";

const PersonalDetails = () => {
  return (
    <div className="flex flex-col gap-2 max-h-full">
      <div className="font-bold text-2xl px-1">Personal Details</div>
      <hr />
      <div className="grid grid-cols-12 gap-2 px-4 py-2 overflow-y-scroll">
        <div className="col-span-3 flex flex-col gap-1">
          <div className="font-semibold text-sm">Name</div>
          <div className="font-semibold text-sm">Email</div>
          <div className="font-semibold text-sm">Roll No.</div>
          <div className="font-semibold text-sm">Date of Birth</div>
          <div className="font-semibold text-sm">Gender</div>
          <div className="font-semibold text-sm">Contact No.</div>
          <div className="font-semibold text-sm">Program</div>
          <div className="font-semibold text-sm">Branch</div>
          <div className="font-semibold text-sm">Category</div>
          <div className="font-semibold text-sm">Graduation Year</div>
          <div className="font-semibold text-sm">Semester</div>
        </div>
        <div className="col-span-9 flex flex-col gap-1">
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.name}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.email}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.rollNo}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.dateOfBirth}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.gender}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.contact}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.program}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.branch}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.category}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.graduationYear}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.semester}
          </div>
        </div>
        <div className="col-span-12 my-2 flex flex-col gap-1">
          <div className="font-bold text-lg">Current Address</div>
          <hr />
        </div>
        <div className="col-span-3 flex flex-col gap-1 px-2">
          <div className="font-semibold text-sm">Line 1</div>
          <div className="font-semibold text-sm">Line 2</div>
          <div className="font-semibold text-sm">City</div>
          <div className="font-semibold text-sm">State</div>
          <div className="font-semibold text-sm">Pincode</div>
        </div>
        <div className="col-span-9 flex flex-col gap-1">
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.currentAddress.line1}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.currentAddress.line2}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.currentAddress.city}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.currentAddress.state}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.currentAddress.pincode}
          </div>
        </div>
        <div className="col-span-12 my-2 flex flex-col gap-1">
          <div className="font-bold text-lg">Permanent Address</div>
          <hr />
        </div>
        <div className="col-span-3 flex flex-col gap-1 px-2">
          <div className="font-semibold text-sm">Line 1</div>
          <div className="font-semibold text-sm">Line 2</div>
          <div className="font-semibold text-sm">City</div>
          <div className="font-semibold text-sm">State</div>
          <div className="font-semibold text-sm">Pincode</div>
        </div>
        <div className="col-span-9 flex flex-col gap-1">
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.permanentAddress.line1}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.permanentAddress.line2}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.permanentAddress.city}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.permanentAddress.state}
          </div>
          <div className="font-medium text-sm">
            {StudentProfile.personalDetails.permanentAddress.pincode}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
