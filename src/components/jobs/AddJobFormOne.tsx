"use client";
import { Job, Company } from "@/app/(routes)/admin/jobs/addJob/page";
import FormDropDown from "../common/FormDropDown";
import { OptionInterface } from "../common/FormDropDown";

interface Props {
  companiesDropDownOptions: OptionInterface[];
  job: Job;
  setJob: Function;
}

const AddJobFormOne = ({ companiesDropDownOptions, job, setJob }: Props) => {
  return (
    <>
      <div className="block font-bold text-[20px] text-underline h-fit">
        Company And Job Profile
      </div>
      <hr className="col-span-12 mt-2 mb-4" />

      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mx-4 max-h-[50vh] overflow-y-scroll">
        <div className="col-span-3">
          <label
            htmlFor="company"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Select Company
          </label>
          <div className="mt-1">
            <FormDropDown
              data={companiesDropDownOptions}
              value={job.companyId}
              setValue={(value: string) => {
                setJob({
                  ...job,
                  companyId: value,
                });
              }}
            />
          </div>
        </div>

        <div className="col-span-3">
          <label
            htmlFor="job-designation"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Job Designation
          </label>
          <div className="mt-1">
            <input
              maxLength={40}
              type="text"
              name="job-designation"
              id="job-designation"
              autoComplete="job-designation"
              className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="job-description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Job Description
          </label>
          <p className="mt-3 text-sm leading-6 text-gray-600"></p>
          <div className="mt-2">
            <textarea
              id="job-description"
              name="job-description"
              rows={3}
              className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <div className="col-span-3">
          <label
            htmlFor="remote-work-policy"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Remote Work Policy(if any)
          </label>
          <div className="mt-1">
            <input
              maxLength={40}
              type="text"
              name="remote-work-policy"
              id="remote-work-policy"
              autoComplete="remote-work-policy"
              className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label
            htmlFor="tentative-offers-for-IIT-Indore"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Tentative Offers for IIT Indore
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="tentative-offers-for-IIT-Indore"
              id="tentative-offers-for-IIT-Indore"
              autoComplete="tentative-offers-for-IIT-Indore"
              className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full flex gap-4">
          <div>
            <label
              htmlFor="tentative-joining-date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tentative Joining Date
            </label>
            <div className="mt-1 flex gap-2">
              <input
                maxLength={40}
                type="date"
                name="tentative-joining-date"
                id="tentative-joining-date"
                autoComplete="tentative-joining-date"
                className="rounded-md w-fit border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="release-date-of-offer-letter"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Release Date of Offer Letter
            </label>
            <div className="mt-1 flex gap-2">
              <input
                maxLength={40}
                type="date"
                name="release-date-of-offer-letter"
                id="release-date-of-offer-letter"
                autoComplete="release-date-of-offer-letter"
                className="rounded-md w-fit border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddJobFormOne;
