import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Loader/loader";

const Salaries = ({
  salaries,
  editMode,
  handleChange,
  setApprovalModal,
  approvalModal,
  getApprovals,
  facultyDropDown,
  submitApproval,
  facultyApprovals,
  facultyData,
  selectedFaculties,
  setSelectedFaculties,
  setFacultyDropdown,
  loading,
}) => (
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
        <div className="flex justify-between mt-2 mb-4">
          <Button
            color="primary"
            onClick={() => {
              setApprovalModal(!approvalModal);
              getApprovals(index);
            }}
          >
            Current Approvals
          </Button>
          <div className="flex justify-end">
            {facultyDropDown[index] && (
              <button
                className="bg-blue-500 text-white p-2 mr-4 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => submitApproval(index)}
              >
                Submit Request
              </button>
            )}
            <Button
              color="primary"
              onClick={() => {
                setFacultyDropdown((prev) => {
                  const newDropdownState = [...prev];
                  newDropdownState[index] = !newDropdownState[index];
                  return newDropdownState;
                });
              }}
            >
              Make Request
            </Button>
          </div>
        </div>
        <Separator className="my-8" />
        {approvalModal && (
          <div className="fixed inset-0 flex items-center justify-center z-30 bg-gray-800 bg-opacity-10">
            <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Current Approvals</h2>
                <button
                  className="text-gray-500 text-lg font-extrabold hover:text-gray-700"
                  onClick={() => setApprovalModal(!approvalModal)}
                >
                  X
                </button>
              </div>
              <div className="p-4 web overflow-auto" style={{ maxHeight: "75vh" }}>
                {loading ? (
                  <Loader />
                ) : (
                  facultyApprovals.map((approval, index) => (
                    <div key={approval.id} className="border-b border-gray-300 py-2">
                      <h3 className="text-lg font-semibold">
                        {approval?.faculty.user.name}
                      </h3>
                      <p className="text-gray-600">
                        <strong>Department:</strong> {approval.faculty.department}
                      </p>
                      <p className="text-gray-600">
                        <strong>Email:</strong> {approval.faculty?.user.email}
                      </p>
                      <p className="text-gray-600">
                        <strong>Contact:</strong> {approval.faculty?.user.contact}
                      </p>
                      <p className="text-gray-600">
                        <strong>Status:</strong> {approval.status}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
        <div key={index} className="flex flex-col">
          <div className="relative">
            {facultyDropDown[index] && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full md:w-96 z-20">
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Add Faculty</h3>
                  <div className="flex flex-wrap">
                    {facultyData?.map((faculty, i) => (
                      <div key={faculty.id} className="mr-4">
                        <input
                          type="checkbox"
                          id={`faculty-${i}`}
                          checked={selectedFaculties[index]?.includes(faculty.id)}
                          onChange={() => setSelectedFaculties((prev) => {
                            const newSelection = [...(prev[index] || [])];
                            const selectedIndex = newSelection.indexOf(faculty.id);
                            if (selectedIndex >= 0) {
                              newSelection.splice(selectedIndex, 1);
                            } else {
                              newSelection.push(faculty.id);
                            }
                            const newSelectedFaculties = [...prev];
                            newSelectedFaculties[index] = newSelection;
                            return newSelectedFaculties;
                          })}
                        />
                        <label htmlFor={`faculty-${i}`} className="ml-2">
                          {faculty.user.name} ({faculty.department})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Salaries;
