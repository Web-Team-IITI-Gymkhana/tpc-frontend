import React from "react";
import PersonIcon from "@mui/icons-material/Person";

const JobCoordinators = ({ jobCoordinators }) => (
  <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
    <div className="font-semibold text-lg mb-4">Job Coordinators</div>
    <div className="flex gap-4 flex-wrap">
      {jobCoordinators.map((coordinator, index) => (
        <div
          key={index}
          className="bg-gray-200 p-8 rounded-lg md:w-80 w-full leading-8"
        >
          <div className="text-center font-semibold">
            <PersonIcon sx={{ fontSize: 80 }} className="mx-auto" />
            <br />
            {coordinator.name}
          </div>
          <div>
            <div>
              <span className="font-semibold">Role : </span>
              {coordinator.role}
            </div>
            <div>
              <span className="font-semibold">Department : </span>
              {coordinator.department}
            </div>
            <div>
              <span className="font-semibold">Email : </span>
              {coordinator.email}
            </div>
            <div>
              <span className="font-semibold">Contact : </span>
              {coordinator.contact}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default JobCoordinators;
