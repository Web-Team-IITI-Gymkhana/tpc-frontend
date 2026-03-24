import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Loader/loader";

const Salaries = ({
  salaries,
  seasonType,
  editMode,
  handleChange,
  formData,
  loading,
  jafDetails,
}) => (
  <div className="bg-white p-3 md:p-4 lg:px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
    <div className="font-semibold text-lg mb-4">Salaries</div>
    {salaries.map((salary, index) => (
      <div key={index}>
        {seasonType === "PLACEMENT" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Base Salary
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="baseSalary"
                  value={formData.salaries[index].baseSalary}
                  onChange={(e) => handleChange(e, index, "baseSalary")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">{salary.baseSalary}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Total CTC
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="totalCTC"
                  value={formData.salaries[index].totalCTC}
                  onChange={(e) => handleChange(e, index, "totalCTC")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">{salary.totalCTC}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Take Home Salary
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="takeHomeSalary"
                  value={formData.salaries[index].takeHomeSalary}
                  onChange={(e) => handleChange(e, index, "takeHomeSalary")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">
                  {salary.takeHomeSalary}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Gross Salary
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="grossSalary"
                  value={formData.salaries[index].grossSalary}
                  onChange={(e) => handleChange(e, index, "grossSalary")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">{salary.grossSalary}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Joining Bonus
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="joiningBonus"
                  value={formData.salaries[index].joiningBonus}
                  onChange={(e) => handleChange(e, index, "joiningBonus")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">
                  {salary.joiningBonus}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Performance Bonus
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="performanceBonus"
                  value={formData.salaries[index].performanceBonus}
                  onChange={(e) => handleChange(e, index, "performanceBonus")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">
                  {salary.performanceBonus}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Relocation
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="relocation"
                  value={formData.salaries[index].relocation}
                  onChange={(e) => handleChange(e, index, "relocation")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">{salary.relocation}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Bond Amount
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="bondAmount"
                  value={formData.salaries[index].bondAmount}
                  onChange={(e) => handleChange(e, index, "bondAmount")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">{salary.bondAmount}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                ESOP Amount
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="esopAmount"
                  value={formData.salaries[index].esopAmount}
                  onChange={(e) => handleChange(e, index, "esopAmount")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">{salary.esopAmount}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                ESOP Vest Period
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="esopVestPeriod"
                  value={formData.salaries[index].esopVestPeriod}
                  onChange={(e) => handleChange(e, index, "esopVestPeriod")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">
                  {salary.esopVestPeriod}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                First Year CTC
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="firstYearCTC"
                  value={formData.salaries[index].firstYearCTC}
                  onChange={(e) => handleChange(e, index, "firstYearCTC")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">
                  {salary.firstYearCTC}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Retention Bonus
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="retentionBonus"
                  value={formData.salaries[index].retentionBonus}
                  onChange={(e) => handleChange(e, index, "retentionBonus")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">
                  {salary.retentionBonus}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Deductions
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="deductions"
                  value={formData.salaries[index].deductions}
                  onChange={(e) => handleChange(e, index, "deductions")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">{salary.deductions}</div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Medical Allowance
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="medicalAllowance"
                  value={formData.salaries[index].medicalAllowance}
                  onChange={(e) => handleChange(e, index, "medicalAllowance")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">
                  {salary.medicalAllowance}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Bond Duration
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="bondDuration"
                  value={formData.salaries[index].bondDuration}
                  onChange={(e) => handleChange(e, index, "bondDuration")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">
                  {salary.bondDuration}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Foreign Currency CTC
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="foreignCurrencyCTC"
                  value={formData.salaries[index].foreignCurrencyCTC}
                  onChange={(e) => handleChange(e, index, "foreignCurrencyCTC")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">
                  {salary.foreignCurrencyCTC}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Foreign Currency Code
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="foreignCurrencyCode"
                  value={formData.salaries[index].foreignCurrencyCode}
                  onChange={(e) =>
                    handleChange(e, index, "foreignCurrencyCode")
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">
                  {salary.foreignCurrencyCode}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Other Compensations
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="otherCompensations"
                  value={formData.salaries[index].otherCompensations}
                  onChange={(e) => handleChange(e, index, "otherCompensations")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">
                  {salary.otherCompensations}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Salary Period
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="salaryPeriod"
                  value={formData.salaries[index].salaryPeriod}
                  onChange={(e) => handleChange(e, index, "salaryPeriod")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">
                  {salary.salaryPeriod}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold my-2 text-sm md:text-base">
                Others
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="others"
                  value={formData.salaries[index].others}
                  onChange={(e) => handleChange(e, index, "others")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              ) : (
                <div className="text-sm md:text-base">{salary.others}</div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
              <div className="font-semibold my-2">
                {" "}
                Tentative CTC for PPO Select
              </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 my-5">
          <div>
            <div className="font-semibold my-2 text-sm md:text-base">
              Minimum CPI
            </div>
            {editMode ? (
              <input
                type="text"
                name="minCPI"
                value={formData.salaries[index].minCPI}
                onChange={(e) => handleChange(e, index, "minCPI")}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            ) : (
              <div className="text-sm md:text-base">{salary.minCPI}</div>
            )}
          </div>
          <div>
            <div className="font-semibold my-2 text-sm md:text-base">
              Tenth Marks
            </div>
            {editMode ? (
              <input
                type="text"
                name="tenthMarks"
                value={formData.salaries[index].tenthMarks}
                onChange={(e) => handleChange(e, index, "tenthMarks")}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            ) : (
              <div className="text-sm md:text-base">{salary.tenthMarks}</div>
            )}
          </div>
          <div>
            <div className="font-semibold my-2 text-sm md:text-base">
              Twelth Marks
            </div>
            {editMode ? (
              <input
                type="text"
                name="twelthMarks"
                value={formData.salaries[index].twelthMarks}
                onChange={(e) => handleChange(e, index, "twelthMarks")}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            ) : (
              <div className="text-sm md:text-base">{salary.twelthMarks}</div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-md font-semibold mt-4">Programs</h2>
          <div className="flex flex-wrap !text-md">
            {salary.programs && salary.programs.length > 0 ? (
              salary.programs.map((programId, programIndex) => {
                const program = jafDetails?.programs?.find(
                  (p) => p.id === programId,
                );
                return (
                  <div key={programIndex} className="mx-2 my-2">
                    <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                      {program
                        ? `${program.department} - ${program.course} - ${program.year}`
                        : programId}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-gray-500">No programs specified</div>
            )}
          </div>
        </div>
        {/* <div>
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
              <div className="text-gray-500">No genders specified</div>
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
              <div className="text-gray-500">No categories specified</div>
            )}
          </div>
        </div> */}
      </div>
    ))}
  </div>
);

export default Salaries;
