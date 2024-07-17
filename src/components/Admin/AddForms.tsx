import React, { useEffect, useState } from "react";
import { JobCoordinatorFC, TPCMember } from "./types";
import PersonIcon from "@mui/icons-material/Person";
import Select from "react-select";
import { Button } from "../ui/button";
import { fetchTpcMembers, postJobCoordinator } from "@/helpers/api";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";

const JobCoordinatorForm = ({ jobId }: { jobId: string }) => {
  const [tpcMembers, setTpcMembers] = useState<TPCMember[]>();
  const [role, setRole] = useState("PRIMARY");
  const [loading, setLoading] = useState(true);
  const options = tpcMembers?.map((member) => ({
    label: `${member.user.name} ${member.user.email}`,
    value: member.id,
  }));
  const jobRoleOptions = [
    {
      label: "PRIMARY",
      value: "PRIMARY",
    },
    {
      label: "SECONDARY",
      value: "SECONDARY",
    },
  ];
  const [coordinator, setCoordinator] = useState<TPCMember>();

  const submitData = async () => {
    await postJobCoordinator([
      {
        jobId: jobId,
        tpcMemberId: coordinator.id,
        role: role,
      },
    ]);
    toast.success("Added! Reload to see changes",{duration: 3000});
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTpcMembers();
      setTpcMembers(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-200 p-8 rounded-lg md:w-80 w-full leading-8">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="text-center font-semibold">
            <PersonIcon sx={{ fontSize: 80 }} className="mx-auto" />
            <br />
            <label htmlFor="tpcMember" className="mt-2">
              Select TPC Member
            </label>
            <Select
              options={options}
              onChange={(value) => {
                tpcMembers.forEach((member) => {
                  if (value.value == member.id) {
                    setCoordinator(member);
                  }
                });
              }}
              isSearchable
              className="mb-4 text-sm font-normal"
            />
            {coordinator && coordinator.user.name}
          </div>
          {coordinator && (
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
                {coordinator.user.email}
              </div>
              <div>
                <span className="font-semibold">Contact : </span>
                {coordinator.user.contact}
              </div>
              <Select
                options={jobRoleOptions}
                isSearchable={false}
                className="my-2 mb-4"
                value={{ value: role, label: role }}
                onChange={(newValue) => {
                  setRole(newValue.value);
                }}
              />
              <Button
                className="w-full"
                onClick={() => {
                  submitData();
                }}
              >
                Add
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobCoordinatorForm;
