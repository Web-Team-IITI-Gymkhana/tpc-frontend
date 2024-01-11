"use client";
import AddJobFormFour from "@/components/jobs/AddJobFormFour";
import AddJobFormOne from "@/components/jobs/AddJobFormOne";
import AddJobFormThree from "@/components/jobs/AddJobFormThree";
import AddJobFormTwo from "@/components/jobs/AddJobFormTwo";
import { useState } from "react";
import { Company, Job } from "@/app/(routes)/admin/job/addJob/page";
import { OptionInterface } from "../common/FormDropDown";

interface Props {
  companiesDropDownOptions: OptionInterface[];
}

const AddJobForm = ({ companiesDropDownOptions }: Props) => {
  const initialJob: Job = {
    companyId: "",
    description: "",
    selectionProcess: "",
    salary: 0,
    tags: [],
  };
  const [job, setJob] = useState<Job>(initialJob);
  const [checkedStep, setCheckedStep] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [formStage, setFormStage] = useState<number>(1);
  const numStages = 4;

  return (
    <div className="mx-2 my-[1vh] h-[84vh] py-[2vh] rounded-md bg-white">
      <div className="mx-2 my-[2vh]">
        <div className="flex justify-between mx-1 h-[6vh]">
          <div className="flex items-center">
            <div className="text-[30px] font-bold mx-2 font-serif">Add Job</div>
          </div>
          <div className="text-sm text-gray-500">
            Step {formStage} of {numStages}
          </div>
        </div>
        <hr />
        <div className="mt-4 mx-3 min-h-[60vh]">
          {formStage === 1 ? (
            <AddJobFormOne
              job={job}
              setJob={setJob}
              companiesDropDownOptions={companiesDropDownOptions}
            />
          ) : formStage === 2 ? (
            <AddJobFormTwo job={job} setJob={setJob} />
          ) : formStage === 3 ? (
            <AddJobFormThree />
          ) : (
            <AddJobFormFour />
          )}

          <div className="mt-4 flex justify-center">
            <button
              disabled={formStage === 1}
              className="px-4 py-2 rounded-md bg-blue-500 text-white mx-1"
              onClick={() => setFormStage(formStage - 1)}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 rounded-md bg-blue-500 text-white mx-1"
              onClick={() => {
                if (formStage === numStages) {
                  // submit
                } else {
                  setFormStage(formStage + 1);
                }
              }}
            >
              {formStage === numStages ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;
