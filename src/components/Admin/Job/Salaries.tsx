import React from "react";

const Salaries = ({ salaries, editMode, handleChange }) => (
  <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
    <div className="font-semibold text-lg mb-4">Salaries</div>
    {salaries.map((salary, index) => (
      <div key={index}>
        <div className="flex md:flex-row flex-col flex-wrap justify-between">
          <div className="w-1/6">
            <div className="font-semibold my-2">Base Salary</div>
            {editMode ? (
              <input
                type="text"
                name="baseSalary"
                value={salary.baseSalary}
                onChange={(e) => handleChange(e, index, "baseSalary")}
              />
            ) : (
              <div>{salary.baseSalary}</div>
            )}
          </div>
          <div className="w-1/6">
            <div className="font-semibold my-2">CTC</div>
            {editMode ? (
              <input
                type="text"
                name="totalCTC"
                value={salary.totalCTC}
                onChange={(e) => handleChange(e, index, "totalCTC")}
              />
            ) : (
              <div>{salary.totalCTC}</div>
            )}
          </div>
          <div className="w-1/6">
            <div className="font-semibold my-2">Take Home Salary</div>
            {editMode ? (
              <input
                type="text"
                name="takeHomeSalary"
                value={salary.takeHomeSalary}
                onChange={(e) => handleChange(e, index, "takeHomeSalary")}
              />
            ) : (
              <div>{salary.takeHomeSalary}</div>
            )}
          </div>
          <div className="w-1/6">
            <div className="font-semibold my-2">Gross Salary</div>
            {editMode ? (
              <input
                type="text"
                name="grossSalary"
                value={salary.grossSalary}
                onChange={(e) => handleChange(e, index, "grossSalary")}
              />
            ) : (
              <div>{salary.grossSalary}</div>
            )}
          </div>
          <div className="w-1/6">
            <div className="font-semibold my-2">Other Compensations</div>
            {editMode ? (
              <input
                type="text"
                name="otherCompensations"
                value={salary.otherCompensations}
                onChange={(e) => handleChange(e, index, "otherCompensations")}
              />
            ) : (
              <div>{salary.otherCompensations}</div>
            )}
          </div>
        </div>
        <div className="flex md:flex-row flex-col flex-wrap justify-between my-5">
          <div className="w-1/6">
            <div className="font-semibold my-2">Minimum CPI</div>
            {editMode ? (
              <input
                type="text"
                name="minCPI"
                value={salary.minCPI}
                onChange={(e) => handleChange(e, index, "minCPI")}
              />
            ) : (
              <div>{salary.minCPI}</div>
            )}
          </div>
          <div className="w-1/6">
            <div className="font-semibold my-2">Tenth Marks</div>
            {editMode ? (
              <input
                type="text"
                name="tenthMarks"
                value={salary.tenthMarks}
                onChange={(e) => handleChange(e, index, "tenthMarks")}
              />
            ) : (
              <div>{salary.tenthMarks}</div>
            )}
          </div>
          <div className="w-1/6">
            <div className="font-semibold my-2">Twelfth Marks</div>
            {editMode ? (
              <input
                type="text"
                name="twelfthMarks"
                value={salary.twelfthMarks}
                onChange={(e) => handleChange(e, index, "twelfthMarks")}
              />
            ) : (
              <div>{salary.twelfthMarks}</div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-md font-semibold mt-4">Programs</h2>
          <div className="flex flex-wrap !text-md">
            {salary.programs.map((program, programIndex) => (
              <div key={programIndex} className="mx-2 my-2">
                <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                  {program.department} - {program.course} - {program.year}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-md font-semibold mt-4">Genders</h2>
          <div className="flex flex-wrap !text-md">
            {salary.genders.map((gender, genderIndex) => (
              <div key={genderIndex} className="mx-2 my-2">
                <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                  {gender}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-md font-semibold mt-4">Categories</h2>
          <div className="flex flex-wrap !text-md">
            {salary.categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mx-2 my-2">
                <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                  {category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Salaries;
