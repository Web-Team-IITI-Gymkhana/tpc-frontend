"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Loader/loader";
import { getJafDetails } from "@/helpers/recruiter/api";
import { ProgramsDto } from "@/types/jaf.types";

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
}) => {
  const [allPrograms, setAllPrograms] = useState<ProgramsDto[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState<boolean>(false);

  // Per-salary temporary selection state (year/course/branch)
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [selectedProgramsBySalary, setSelectedProgramsBySalary] = useState<Map<number, { year: string; course: string; branch: string; id: string }[]>>(new Map());
  const [expandProgramsEditor, setExpandProgramsEditor] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingPrograms(true);
        const jaf = await getJafDetails();
        setAllPrograms(jaf?.programs || []);
      } finally {
        setLoadingPrograms(false);
      }
    };
    load();
  }, []);

  // Derived options
  const allYears = useMemo(() => Array.from(new Set(allPrograms.map((p) => p.year))).sort(), [allPrograms]);
  const coursesMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    allPrograms.forEach((p) => {
      if (!map.has(p.year)) map.set(p.year, new Set());
      map.get(p.year)?.add(String(p.course));
    });
    return map;
  }, [allPrograms]);
  const branchesMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    allPrograms.forEach((p) => {
      const key = `${p.year}-${p.course}`;
      if (!map.has(key)) map.set(key, new Set());
      map.get(key)?.add(p.branch);
    });
    return map;
  }, [allPrograms]);

  // Initialize selected programs from incoming formData once programs are loaded
  useEffect(() => {
    if (!formData?.salaries || allPrograms.length === 0) return;
    const map = new Map<number, { year: string; course: string; branch: string; id: string }[]>();
    formData.salaries.forEach((salary: any, idx: number) => {
      if (Array.isArray(salary?.programs) && salary.programs.length > 0) {
        const selected = salary.programs
          .map((prog: any) => {
            const found = allPrograms.find((p) => p.id === (prog?.id || prog));
            return found
              ? { year: found.year, course: String(found.course), branch: found.branch, id: found.id }
              : null;
          })
          .filter(Boolean) as { year: string; course: string; branch: string; id: string }[];
        if (selected.length > 0) map.set(idx, selected);
      }
    });
    setSelectedProgramsBySalary(map);
  }, [formData?.salaries, allPrograms]);

  const getSelectedPrograms = (index: number) => selectedProgramsBySalary.get(index) || [];
  const updateSelectedPrograms = (index: number, programs: { year: string; course: string; branch: string; id: string }[]) => {
    const newMap = new Map(selectedProgramsBySalary);
    newMap.set(index, programs);
    setSelectedProgramsBySalary(newMap);

    // reflect to parent formData
    const selectedIds = programs.map((p) => p.id);
    const selectedObjects = allPrograms.filter((p) => selectedIds.includes(p.id));
    handleChange({ target: { value: selectedObjects } }, index, "programs");
  };

  const isYearIndeterminate = (year: string, index: number) => {
    const selected = getSelectedPrograms(index);
    const yearPrograms = allPrograms.filter((p) => p.year === year);
    const selectedYearPrograms = selected.filter((p) => p.year === year);
    return selectedYearPrograms.length > 0 && selectedYearPrograms.length < yearPrograms.length;
  };

  const isCourseIndeterminate = (year: string, course: string, index: number) => {
    const selected = getSelectedPrograms(index);
    const coursePrograms = allPrograms.filter((p) => p.year === year && String(p.course) === course);
    const selectedCoursePrograms = selected.filter((p) => p.year === year && p.course === course);
    return selectedCoursePrograms.length > 0 && selectedCoursePrograms.length < coursePrograms.length;
  };

  const handleYearToggle = (year: string, checked: boolean, index: number) => {
    if (checked) {
      const yearPrograms = allPrograms
        .filter((p) => p.year === year)
        .map((p) => ({ year: p.year, course: String(p.course), branch: p.branch, id: p.id }));
      const current = getSelectedPrograms(index);
      const other = current.filter((p) => p.year !== year);
      updateSelectedPrograms(index, [...other, ...yearPrograms]);
    } else {
      const current = getSelectedPrograms(index);
      const remaining = current.filter((p) => p.year !== year);
      updateSelectedPrograms(index, remaining);
    }
  };

  const handleCourseToggle = (year: string, course: string, checked: boolean, index: number) => {
    if (checked) {
      const coursePrograms = allPrograms
        .filter((p) => p.year === year && String(p.course) === course)
        .map((p) => ({ year: p.year, course: String(p.course), branch: p.branch, id: p.id }));
      const current = getSelectedPrograms(index);
      const other = current.filter((p) => !(p.year === year && p.course === course));
      updateSelectedPrograms(index, [...other, ...coursePrograms]);
    } else {
      const current = getSelectedPrograms(index);
      const remaining = current.filter((p) => !(p.year === year && p.course === course));
      updateSelectedPrograms(index, remaining);
    }
  };

  const handleBranchToggle = (year: string, course: string, branch: string, checked: boolean, index: number) => {
    const program = allPrograms.find((p) => p.year === year && String(p.course) === course && p.branch === branch);
    if (!program) return;
    const current = getSelectedPrograms(index);
    if (checked) {
      const newProgram = { year: program.year, course: String(program.course), branch: program.branch, id: program.id };
      updateSelectedPrograms(index, [...current, newProgram]);
    } else {
      const remaining = current.filter((p) => p.id !== program.id);
      updateSelectedPrograms(index, remaining);
    }
  };

  const handleSelectAllForYear = (year: string, index: number) => {
    const yearPrograms = allPrograms
      .filter((p) => p.year === year)
      .map((p) => ({ year: p.year, course: String(p.course), branch: p.branch, id: p.id }));
    const current = getSelectedPrograms(index);
    const other = current.filter((p) => p.year !== year);
    updateSelectedPrograms(index, [...other, ...yearPrograms]);
  };

  const handleSelectAllForCourse = (year: string, course: string, index: number) => {
    const coursePrograms = allPrograms
      .filter((p) => p.year === year && String(p.course) === course)
      .map((p) => ({ year: p.year, course: String(p.course), branch: p.branch, id: p.id }));
    const current = getSelectedPrograms(index);
    const other = current.filter((p) => !(p.year === year && p.course === course));
    updateSelectedPrograms(index, [...other, ...coursePrograms]);
  };

  const toggleYearExpanded = (year: string) => {
    const next = new Set(expandedYears);
    if (next.has(year)) next.delete(year); else next.add(year);
    setExpandedYears(next);
  };
  const toggleCourseExpanded = (year: string, course: string) => {
    const key = `${year}-${course}`;
    const next = new Set(expandedCourses);
    if (next.has(key)) next.delete(key); else next.add(key);
    setExpandedCourses(next);
  };

  return (
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
                <div>
                  {salary.foreignCurrencyCode} {salary.baseSalary}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.totalCTC}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.takeHomeSalary}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.grossSalary}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.joiningBonus}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.performanceBonus}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.relocation}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.bondAmount}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.esopAmount}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.firstYearCTC}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.retentionBonus}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.deductions}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.medicalAllowance}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.foreignCurrencyCTC}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.otherCompensations}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.stipend}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.foreignCurrencyStipend}
                </div>
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
                <div>
                  {salary.foreignCurrencyCode} {salary.tentativeCTC}
                </div>
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
          {editMode && (
            <div className="mt-3">
              <Button
                onClick={() =>
                  setExpandProgramsEditor((prev) => ({ ...prev, [index]: !prev[index] }))
                }
              >
                {expandProgramsEditor[index] ? "Hide Program Selector" : "Edit Programs"}
              </Button>
              {expandProgramsEditor[index] && (
                <div className="mt-3 border border-gray-200 rounded-md overflow-hidden">
                  {loadingPrograms ? (
                    <Loader />
                  ) : (
                    <div>
                      <div className="bg-gray-50 border-b px-4 py-2 flex justify-between">
                        <span className="font-semibold text-sm">Program Selection (Based on Course Completion Year)</span>
                        <span className="text-xs text-gray-600">{getSelectedPrograms(index).length} selected</span>
                      </div>
                      <div className="py-2">
                        {allYears.map((year) => {
                          const yearPrograms = allPrograms.filter((p) => p.year === year);
                          const selectedYearPrograms = getSelectedPrograms(index).filter((p) => p.year === year);
                          const isYearSelected = selectedYearPrograms.length === yearPrograms.length && yearPrograms.length > 0;
                          const isYearInd = isYearIndeterminate(year, index);
                          return (
                            <div key={year} className="border-b last:border-b-0">
                              <div className="px-4 py-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    className="text-gray-500 text-xs"
                                    onClick={() => toggleYearExpanded(year)}
                                  >
                                    {expandedYears.has(year) ? "▼" : "▶"}
                                  </button>
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={isYearSelected}
                                      ref={(el) => { if (el) el.indeterminate = !isYearSelected && isYearInd; }}
                                      onChange={(e) => handleYearToggle(year, e.target.checked, index)}
                                    />
                                    <span className="font-medium text-sm">{year} Batch ({yearPrograms.length} programs)</span>
                                  </label>
                                </div>
                                <button
                                  type="button"
                                  className="text-blue-600 text-xs"
                                  onClick={() => handleSelectAllForYear(year, index)}
                                >
                                  Select All
                                </button>
                              </div>
                              {expandedYears.has(year) && (
                                <div className="bg-gray-50 pl-8">
                                  {Array.from(coursesMap.get(year) || []).map((course) => {
                                    const coursePrograms = allPrograms.filter((p) => p.year === year && String(p.course) === course);
                                    const selectedCoursePrograms = getSelectedPrograms(index).filter((p) => p.year === year && p.course === course);
                                    const isCourseSelected = selectedCoursePrograms.length === coursePrograms.length && coursePrograms.length > 0;
                                    const isCourseInd = isCourseIndeterminate(year, course, index);
                                    const courseKey = `${year}-${course}`;
                                    return (
                                      <div key={courseKey}>
                                        <div className="px-4 py-1 flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            <button
                                              type="button"
                                              className="text-gray-500 text-[10px]"
                                              onClick={() => toggleCourseExpanded(year, course)}
                                            >
                                              {expandedCourses.has(courseKey) ? "▼" : "▶"}
                                            </button>
                                            <label className="flex items-center gap-2">
                                              <input
                                                type="checkbox"
                                                checked={isCourseSelected}
                                                ref={(el) => { if (el) el.indeterminate = !isCourseSelected && isCourseInd; }}
                                                onChange={(e) => handleCourseToggle(year, course, e.target.checked, index)}
                                              />
                                              <span className="text-sm">{course} ({coursePrograms.length})</span>
                                            </label>
                                          </div>
                                          <button
                                            type="button"
                                            className="text-blue-600 text-xs"
                                            onClick={() => handleSelectAllForCourse(year, course, index)}
                                          >
                                            All Branches
                                          </button>
                                        </div>
                                        {expandedCourses.has(courseKey) && (
                                          <div className="pl-6 pb-2">
                                            {Array.from(branchesMap.get(courseKey) || []).map((branch) => {
                                              const program = allPrograms.find((p) => p.year === year && String(p.course) === course && p.branch === branch);
                                              const isSelected = getSelectedPrograms(index).some((p) => p.id === program?.id);
                                              return (
                                                <label key={`${courseKey}-${branch}`} className="flex items-center gap-2 px-2 py-1 rounded">
                                                  <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={(e) => handleBranchToggle(year, course, branch, e.target.checked, index)}
                                                  />
                                                  <span className="text-sm">{program?.course === "BTech" ? branch : `${program?.department} - ${branch}`}</span>
                                                </label>
                                              );
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
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
        <div>
          <h2 className="text-md font-semibold mt-4">
            Are Students with Backlogs Allowed?
          </h2>
          <div className="flex flex-wrap items-center mt-2">
            <div className="mx-2 my-2">
              <span
                className={`inline-block border-2 p-2 px-6 rounded-full font-semibold shadow-sm transition-colors duration-200 ${
                  salary.isBacklogAllowed
                    ? "bg-green-50 border-green-400 text-green-700"
                    : "bg-red-50 border-red-400 text-red-700"
                }`}
              >
                {salary.isBacklogAllowed === "ACTIVE" ? "Yes" : "No"}
              </span>
            </div>
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

};

export default Salaries;
