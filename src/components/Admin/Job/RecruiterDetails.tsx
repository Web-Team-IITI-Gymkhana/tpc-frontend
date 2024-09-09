import React from "react";

const RecruiterDetails = ({ recruiter, editMode, handleChange }) => (
  <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
    <div className="font-semibold text-lg mb-4">Recruiter Details</div>
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col w-full">
        <div className="font-semibold my-2">Recruiter Name</div>
        <div className="flex">
          {editMode ? (
            <input
              type="text"
              name="recruiterName"
              value={recruiter.name}
              onChange={handleChange}
            />
          ) : (
            <div>{recruiter.name}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="font-semibold my-2">Email</div>
        <div className="flex items-center">
          {editMode ? (
            <input
              type="email"
              name="recruiterEmail"
              value={recruiter.email}
              onChange={handleChange}
            />
          ) : (
            <div>{recruiter.email}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="font-semibold my-2">Contact</div>
        <div className="flex items-center">
          {editMode ? (
            <input
              type="text"
              name="recruiterContact"
              value={recruiter.contact}
              onChange={handleChange}
            />
          ) : (
            <div>{recruiter.contact}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="font-semibold my-2">Company</div>
        <div className="flex items-center">
          {editMode ? (
            <input
              type="text"
              name="recruiterCompany"
              value={recruiter.company}
              onChange={handleChange}
            />
          ) : (
            <div>{recruiter.company}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="font-semibold my-2">Designation</div>
        <div className="flex items-center">
          {editMode ? (
            <input
              type="text"
              name="recruiterDesignation"
              value={recruiter.designation}
              onChange={handleChange}
            />
          ) : (
            <div>{recruiter.designation}</div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default RecruiterDetails;
