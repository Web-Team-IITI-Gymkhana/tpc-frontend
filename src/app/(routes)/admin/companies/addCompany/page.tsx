"use client";
import FormDropDown from "@/components/common/FormDropDown";
import { useState } from "react";

const AddCompany = () => {
  const [form, setForm] = useState({
    name: "",
    postalAddress: "",
    website: "",
    yearOfEstablishment: "",
    annualTurnover: 0,
    socialMediaPageLink: "",
    category: "",
    sector: "",
  });

  return (
    <>
      <div className="w-full text-center block font-bold text-[30px] text-underline">
        Add a Company
      </div>
      <hr className="col-span-12 mt-2 mb-4" />

      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mx-4 max-h-[60vh] overflow-y-scroll px-2">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Company Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Company Website
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="last-name"
              id="last-name"
              autoComplete="family-name"
              className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Year of Establishment
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Social Media Page Link
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="last-name"
              id="last-name"
              autoComplete="family-name"
              className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Company Size
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Annual Turnover
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="last-name"
              id="last-name"
              autoComplete="family-name"
              className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <div className="text-[20px] font-semibold">Address Details</div>
          <hr className="mt-1" />
        </div>
        <div className="col-span-3">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address Line 1
          </label>
          <div className="mt-1">
            <input
              type="textarea"
              name="street-address"
              id="street-address"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="col-span-3">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address Line 2
          </label>
          <div className="mt-1">
            <input
              type="textarea"
              name="street-address"
              id="street-address"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="col-span-3">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            City
          </label>
          <div className="mt-1">
            <input
              type="textarea"
              name="street-address"
              id="street-address"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="col-span-3">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            State
          </label>
          <div className="mt-1">
            <input
              type="textarea"
              name="street-address"
              id="street-address"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="col-span-3">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Zip Code
          </label>
          <div className="mt-1">
            <input
              type="textarea"
              name="street-address"
              id="street-address"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="col-span-3">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Country
          </label>
          <div className="mt-1">
            <input
              type="textarea"
              name="street-address"
              id="street-address"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="col-span-3">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-1">
            <FormDropDown
              data={[
                { value: "1", label: "Category 1" },
                { value: "2", label: "Category 2" },
                { value: "3", label: "Category 3" },
                { value: "4", label: "Category 4" },
              ]}
              value={form.category}
              setValue={(value: string) => {
                setForm({ ...form, category: value });
              }}
            />
          </div>
        </div>
        <div className="col-span-3">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Sector
          </label>
          <div className="mt-1">
            <FormDropDown
              data={[
                { value: "1", label: "Sector 1" },
                { value: "2", label: "Sector 2" },
                { value: "3", label: "Sector 3" },
                { value: "4", label: "Sector 4" },
              ]}
              value={form.sector}
              setValue={(value: string) => {
                setForm({ ...form, sector: value });
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-2 flex justify-center">
        <button
          className="px-4 py-2 rounded-md bg-blue-500 text-white mx-1"
          onClick={() => {}}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AddCompany;
