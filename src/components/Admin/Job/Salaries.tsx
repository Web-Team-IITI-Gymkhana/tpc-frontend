import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Loader/loader";

const Salaries = ({
  salaries,
  seasonType,
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
  formData,
  loading,
}) => (
  <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
    <div className="font-semibold text-lg mb-4">Salaries</div>
    {salaries.map((salary, index) => (
      <div key={index}>
        {seasonType === "PLACEMENT" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <div className="font-semibold my-2">Base Salary</div>
              {editMode ? (
                <input
                  type="text"
                  name="baseSalary"
                  value={formData.salaries[index].baseSalary}
                  onChange={(e) => handleChange(e, index, "baseSalary")}
                />
              ) : (
                <div>{salary.baseSalary}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Total CTC</div>
              {editMode ? (
                <input
                  type="text"
                  name="totalCTC"
                  value={formData.salaries[index].totalCTC}
                  onChange={(e) => handleChange(e, index, "totalCTC")}
                />
              ) : (
                <div>{salary.totalCTC}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Take Home Salary</div>
              {editMode ? (
                <input
                  type="text"
                  name="takeHomeSalary"
                  value={formData.salaries[index].takeHomeSalary}
                  onChange={(e) => handleChange(e, index, "takeHomeSalary")}
                />
              ) : (
                <div>{salary.takeHomeSalary}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Gross Salary</div>
              {editMode ? (
                <input
                  type="text"
                  name="grossSalary"
                  value={formData.salaries[index].grossSalary}
                  onChange={(e) => handleChange(e, index, "grossSalary")}
                />
              ) : (
                <div>{salary.grossSalary}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Joining Bonus</div>
              {editMode ? (
                <input
                  type="text"
                  name="joiningBonus"
                  value={formData.salaries[index].joiningBonus}
                  onChange={(e) => handleChange(e, index, "joiningBonus")}
                />
              ) : (
                <div>{salary.joiningBonus}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Performance Bonus</div>
              {editMode ? (
                <input
                  type="text"
                  name="performanceBonus"
                  value={formData.salaries[index].performanceBonus}
                  onChange={(e) => handleChange(e, index, "performanceBonus")}
                />
              ) : (
                <div>{salary.performanceBonus}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Relocation</div>
              {editMode ? (
                <input
                  type="text"
                  name="relocation"
                  value={formData.salaries[index].relocation}
                  onChange={(e) => handleChange(e, index, "relocation")}
                />
              ) : (
                <div>{salary.relocation}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Bond Amount</div>
              {editMode ? (
                <input
                  type="text"
                  name="bondAmount"
                  value={formData.salaries[index].bondAmount}
                  onChange={(e) => handleChange(e, index, "bondAmount")}
                />
              ) : (
                <div>{salary.bondAmount}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">ESOP Amount</div>
              {editMode ? (
                <input
                  type="text"
                  name="esopAmount"
                  value={formData.salaries[index].esopAmount}
                  onChange={(e) => handleChange(e, index, "esopAmount")}
                />
              ) : (
                <div>{salary.esopAmount}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">ESOP Vest Period</div>
              {editMode ? (
                <input
                  type="text"
                  name="esopVestPeriod"
                  value={formData.salaries[index].esopVestPeriod}
                  onChange={(e) => handleChange(e, index, "esopVestPeriod")}
                />
              ) : (
                <div>{salary.esopVestPeriod}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">First Year CTC</div>
              {editMode ? (
                <input
                  type="text"
                  name="firstYearCTC"
                  value={formData.salaries[index].firstYearCTC}
                  onChange={(e) => handleChange(e, index, "firstYearCTC")}
                />
              ) : (
                <div>{salary.firstYearCTC}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Retention Bonus</div>
              {editMode ? (
                <input
                  type="text"
                  name="retentionBonus"
                  value={formData.salaries[index].retentionBonus}
                  onChange={(e) => handleChange(e, index, "retentionBonus")}
                />
              ) : (
                <div>{salary.retentionBonus}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Deductions</div>
              {editMode ? (
                <input
                  type="text"
                  name="deductions"
                  value={formData.salaries[index].deductions}
                  onChange={(e) => handleChange(e, index, "deductions")}
                />
              ) : (
                <div>{salary.deductions}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Medical Allowance</div>
              {editMode ? (
                <input
                  type="text"
                  name="medicalAllowance"
                  value={formData.salaries[index].medicalAllowance}
                  onChange={(e) => handleChange(e, index, "medicalAllowance")}
                />
              ) : (
                <div>{salary.medicalAllowance}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Bond Duration</div>
              {editMode ? (
                <input
                  type="text"
                  name="bondDuration"
                  value={formData.salaries[index].bondDuration}
                  onChange={(e) => handleChange(e, index, "bondDuration")}
                />
              ) : (
                <div>{salary.bondDuration}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Foreign Currency CTC</div>
              {editMode ? (
                <input
                  type="text"
                  name="foreignCurrencyCTC"
                  value={formData.salaries[index].foreignCurrencyCTC}
                  onChange={(e) => handleChange(e, index, "foreignCurrencyCTC")}
                />
              ) : (
                <div>{salary.foreignCurrencyCTC}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Foreign Currency Code</div>
              {editMode ? (
                <input
                  type="text"
                  name="foreignCurrencyCode"
                  value={formData.salaries[index].foreignCurrencyCode}
                  onChange={(e) =>
                    handleChange(e, index, "foreignCurrencyCode")
                  }
                />
              ) : (
                <div>{salary.foreignCurrencyCode}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Other Compensations</div>
              {editMode ? (
                <input
                  type="text"
                  name="otherCompensations"
                  value={formData.salaries[index].otherCompensations}
                  onChange={(e) => handleChange(e, index, "otherCompensations")}
                />
              ) : (
                <div>{salary.otherCompensations}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Salary Period</div>
              {editMode ? (
                <input
                  type="text"
                  name="salaryPeriod"
                  value={formData.salaries[index].salaryPeriod}
                  onChange={(e) => handleChange(e, index, "salaryPeriod")}
                />
              ) : (
                <div>{salary.salaryPeriod}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Others</div>
              {editMode ? (
                <input
                  type="text"
                  name="others"
                  value={formData.salaries[index].others}
                  onChange={(e) => handleChange(e, index, "others")}
                />
              ) : (
                <div>{salary.others}</div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="font-semibold my-2">Stipend</div>
              {editMode ? (
                <input
                  type="text"
                  name="stipend"
                  value={formData.salaries[index].stipend}
                  onChange={(e) => handleChange(e, index, "stipend")}
                />
              ) : (
                <div>{salary.stipend}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Foreign Currency Stipend</div>
              {editMode ? (
                <input
                  type="text"
                  name="foreignCurrencyStipend"
                  value={formData.salaries[index].foreignCurrencyStipend}
                  onChange={(e) =>
                    handleChange(e, index, "foreignCurrencyStipend")
                  }
                />
              ) : (
                <div>{salary.foreignCurrencyStipend}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Accommodation</div>
              {editMode ? (
                <input
                  type="checkbox"
                  name="accommodation"
                  checked={formData.salaries[index].accommodation || false}
                  onChange={(e) =>
                    handleChange(
                      {
                        target: {
                          name: e.target.name,
                          value: e.target.checked,
                        },
                      },
                      index,
                      "accommodation",
                    )
                  }
                />
              ) : (
                <div>{salary.accommodation ? "Yes" : "No"}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">
                PPO Provision on Performance
              </div>
              {editMode ? (
                <input
                  type="checkbox"
                  name="ppoProvisionOnPerformance"
                  checked={
                    formData.salaries[index].ppoProvisionOnPerformance || false
                  }
                  onChange={(e) =>
                    handleChange(
                      {
                        target: {
                          name: e.target.name,
                          value: e.target.checked,
                        },
                      },
                      index,
                      "ppoProvisionOnPerformance",
                    )
                  }
                />
              ) : (
                <div>{salary.ppoProvisionOnPerformance ? "Yes" : "No"}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2">Tentative CTC</div>
              {editMode ? (
                <input
                  type="text"
                  name="tentativeCTC"
                  value={formData.salaries[index].tentativeCTC}
                  onChange={(e) => handleChange(e, index, "tentativeCTC")}
                />
              ) : (
                <div>{salary.tentativeCTC}</div>
              )}
            </div>
          </div>
        )}

        <div className="flex md:flex-row flex-col flex-wrap justify-between my-5">
          <div className="w-1/6">
            <div className="font-semibold my-2">Minimum CPI</div>
            {editMode ? (
              <input
                type="text"
                name="minCPI"
                value={formData.salaries[index].minCPI}
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
                value={formData.salaries[index].tenthMarks}
                onChange={(e) => handleChange(e, index, "tenthMarks")}
              />
            ) : (
              <div>{salary.tenthMarks}</div>
            )}
          </div>
          <div className="w-1/6">
            <div className="font-semibold my-2">Twelth Marks</div>
            {editMode ? (
              <input
                type="text"
                name="twelthMarks"
                value={formData.salaries[index].twelthMarks}
                onChange={(e) => handleChange(e, index, "twelthMarks")}
              />
            ) : (
              <div>{salary.twelthMarks}</div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-md font-semibold mt-4">Programs</h2>
          <div className="flex flex-wrap !text-md">
            {salary.programs && salary.programs.length > 0 ? (
              salary.programs.map((program, programIndex) => (
                <div key={programIndex} className="mx-2 my-2">
                  <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                    {program.department} - {program.course} - {program.year}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">No programs specified</div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-md font-semibold mt-4">Genders</h2>
          <div className="flex flex-wrap !text-md">
            {salary.genders && salary.genders.length > 0 ? (
              salary.genders.map((gender, genderIndex) => (
                <div key={genderIndex} className="mx-2 my-2">
                  <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                    {gender}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">All genders eligible</div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-md font-semibold mt-4">Categories</h2>
          <div className="flex flex-wrap !text-md">
            {salary.categories && salary.categories.length > 0 ? (
              salary.categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mx-2 my-2">
                  <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                    {category}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">
                All categories eligible
              </div>
            )}
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
              <div
                className="p-4 web overflow-auto"
                style={{ maxHeight: "75vh" }}
              >
                {loading ? (
                  <Loader />
                ) : (
                  facultyApprovals.map((approval, index) => (
                    <div
                      key={approval.id}
                      className="border-b border-gray-300 py-2"
                    >
                      <h3 className="text-lg font-semibold">
                        {approval?.faculty.user.name}
                      </h3>
                      <p className="text-gray-600">
                        <strong>Department:</strong>{" "}
                        {approval.faculty.department}
                      </p>
                      <p className="text-gray-600">
                        <strong>Email:</strong> {approval.faculty?.user.email}
                      </p>
                      <p className="text-gray-600">
                        <strong>Contact:</strong>{" "}
                        {approval.faculty?.user.contact}
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
                          checked={selectedFaculties[index]?.includes(
                            faculty.id,
                          )}
                          onChange={() =>
                            setSelectedFaculties((prev) => {
                              const newSelection = [...(prev[index] || [])];
                              const selectedIndex = newSelection.indexOf(
                                faculty.id,
                              );
                              if (selectedIndex >= 0) {
                                newSelection.splice(selectedIndex, 1);
                              } else {
                                newSelection.push(faculty.id);
                              }
                              const newSelectedFaculties = [...prev];
                              newSelectedFaculties[index] = newSelection;
                              return newSelectedFaculties;
                            })
                          }
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
