import React from "react";

const CompanyDetails = ({ company, editMode, handleChange }) => (
  <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
    <div className="font-bold text-xl my-4">Company Details</div>
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col w-full">
        <div className="font-semibold my-2">Company Name</div>
        <div className="flex">
          {editMode ? (
            <input
              type="text"
              name="companyName"
              value={company.name}
              onChange={handleChange}
            />
          ) : (
            <div>{company.name}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="font-semibold my-2">Annual Turnover</div>
        <div className="flex items-center">
          {editMode ? (
            <input
              type="text"
              name="annualTurnover"
              value={company.annualTurnover}
              onChange={handleChange}
            />
          ) : (
            <div>{company.annualTurnover}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="font-semibold my-2">Year of Establishment</div>
        <div className="flex items-center">
          {editMode ? (
            <input
              type="text"
              name="yearOfEstablishment"
              value={company.yearOfEstablishment}
              onChange={handleChange}
            />
          ) : (
            <div>{company.yearOfEstablishment}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="font-semibold my-2">Category</div>
        <div className="flex items-center">
          {editMode ? (
            <input
              type="text"
              name="category"
              value={company.category}
              onChange={handleChange}
            />
          ) : (
            <div>{company.category}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="font-semibold my-2">Social Media Link</div>
        <div className="flex items-center">
          {editMode ? (
            <input
              type="text"
              name="socialMediaLink"
              value={company.socialMediaLink}
              onChange={handleChange}
            />
          ) : (
            <div>
              <a
                href={company.socialMediaLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.socialMediaLink}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default CompanyDetails;
