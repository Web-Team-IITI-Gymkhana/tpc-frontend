import {
  FormikErrors,
  FormikValues,
  FormikHandlers,
  Formik,
  Field,
} from "formik";
import {
  Form,
  Upload,
  message,
  Input,
  Card,
  Checkbox,
  Select,
  Row,
  Col,
  Button,
  UploadProps,
  SelectProps,
  List,
  Cascader,
  Typography,
  Alert,
  Divider,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./styles/CustomQuill.css";
import {
  UploadOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import CurrencySelect from "./CurrencySelect";
import {
  PLACEHOLDERS,
  SELECTION_MODE_OPTIONS,
  GENDER_OPTIONS,
  CATEGORY_OPTIONS,
  BACKLOG_OPTIONS,
  API_ENDPOINTS,
  validateFileSize,
  validateFileType,
  FIELD_LIMITS,
} from "../../utils/jaf.constants";
import {
  JAFFormValues,
  SeasonsDto,
  ProgramsDto,
  TestTypesEnum,
  InterviewTypesEnum,
  SelectionModeEnum,
  GenderEnum,
  CategoryEnum,
  BacklogEnum,
} from "../../types/jaf.types";
import { CourseEnum } from "@/dto/Programs";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const { TextArea } = Input;
const { Title, Text } = Typography;

const toErrorString = (err: unknown): string | undefined => {
  if (typeof err === "string") return err; // plain message
  if (Array.isArray(err)) return err.join(", "); // ["A","B"] → "A, B"
  return undefined; // nested object → ignore
};

type StepProps = {
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
  setFieldValue: (field: string, value: any) => void;
};

interface SelectedProgram {
  year: string;
  course: CourseEnum;
  branch: string;
  id: string;
}

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

const JobDetails = ({
  errors,
  values,
  handleChange,
  setFieldValue,
}: StepProps) => {
  const [form] = Form.useForm();
  const [syncedCurrency, setSyncedCurrency] = useState<string>("INR");

  const [skills, setSkills] = useState<string[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  const [testType, setTestType] = useState<SelectProps["options"]>([]);
  const [seasonType, setSeasonType] = useState<string>("");
  const [interviewType, setInterviewType] = useState<SelectProps["options"]>(
    [],
  );
  const [programsData, setProgramsData] = useState<{
    programs: ProgramsDto[];
    coursesMap: Map<string, Set<string>>;
    branchesMap: Map<string, Set<string>>;
  }>({
    programs: [],
    coursesMap: new Map(),
    branchesMap: new Map(),
  });
  const [customCurrencies, setCustomCurrencies] = useState<CurrencyOption[]>(
    [],
  );

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Enhanced error handling for nested fields
  const getFieldError = (fieldPath: string): string | undefined => {
    const pathArray = fieldPath.split(".");
    let error: any = errors;

    for (const key of pathArray) {
      if (error && typeof error === "object") {
        error = error[key];
      } else {
        return undefined;
      }
    }

    return toErrorString(error);
  };

  const handleFileChange = async (info: any) => {
    if (info.file.status !== "uploading") {
      console.log("Uploading:", info.file, info.fileList);
    }
    if (info.file.status === "done") {
      const file = info.file.originFileObj;
      try {
        const base64String = await getBase64(file);
        const files = values.attachments;
        files.push(base64String);
        setFieldValue("attachments", files);
        console.log(values.attachments);
        message.success(`${info.file.name} file uploaded successfully`);
      } catch (error) {
        message.error("File conversion to Base64 failed.");
      }
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }

    setFileList(info.fileList);
  };

  const handleSkillChange = (newSkills: string[]) => {
    setSkills(newSkills);
    setFieldValue("skills", newSkills);
  };

  const handleAddCustomCurrency = (newCurrency: CurrencyOption) => {
    setCustomCurrencies((prev) => [...prev, newCurrency]);
    message.success(
      `Added new currency: ${newCurrency.symbol} ${newCurrency.label}`,
    );
  };

  const handleCurrencySync = (currency: string) => {
    setSyncedCurrency(currency);
    const currentSalaries = form.getFieldValue("salaries") || [];
    const updatedSalaries = currentSalaries.map((salary: any) => ({
      ...salary,
      foreignCurrencyCode: currency,
    }));
    form.setFieldValue("salaries", updatedSalaries);
    setFieldValue("salaries", updatedSalaries);
  };

  useEffect(() => {
    const fetchJafData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}${API_ENDPOINTS.JAF_VALUES}`,
        );
        const data = response.data;

        // Process test types
        const testTypeOptions =
          data.testTypes?.map((type: TestTypesEnum) => ({
            value: type,
            label:
              type.charAt(0) + type.slice(1).toLowerCase().replace("_", " "),
          })) || [];
        setTestType(testTypeOptions);

        // Process interview types
        const interviewTypeOptions =
          data.interviewTypes?.map((type: InterviewTypesEnum) => ({
            value: type,
            label:
              type.charAt(0) + type.slice(1).toLowerCase().replace("_", " "),
          })) || [];
        setInterviewType(interviewTypeOptions);

        // Find matching season
        const matchingSeason = data.seasons?.find(
          (season: SeasonsDto) => season.id === values.seasonId,
        );

        if (matchingSeason) {
          setSeasonType(matchingSeason.type);
        }

        // Process programs data
        const uniqueYears = new Set<string>();
        const programsMap = new Map<string, Set<string>>();
        const branchesMap = new Map<string, Set<string>>();

        data.programs?.forEach((program: ProgramsDto) => {
          uniqueYears.add(program.year);

          const yearCourseKey = program.year;
          if (!programsMap.has(yearCourseKey)) {
            programsMap.set(yearCourseKey, new Set());
          }
          programsMap.get(yearCourseKey)?.add(program.course);

          const courseBranchKey = `${program.year}-${program.course}`;
          if (!branchesMap.has(courseBranchKey)) {
            branchesMap.set(courseBranchKey, new Set());
          }
          branchesMap.get(courseBranchKey)?.add(program.branch);
        });

        setYears(Array.from(uniqueYears));
        setProgramsData({
          programs: data.programs || [],
          coursesMap: programsMap,
          branchesMap: branchesMap,
        });

        // Initialize selected programs from existing form data if any
        const currentSalaries = values.salaries || [];
        const newSelectedPrograms = new Map<number, SelectedProgram[]>();

        currentSalaries.forEach((salary: any, index: number) => {
          if (salary?.programs?.length > 0) {
            const selectedPrograms = salary.programs
              .map((programId: string) => {
                const program = data.programs?.find(
                  (p: ProgramsDto) => p.id === programId,
                );
                return program
                  ? {
                      year: program.year,
                      course: program.course,
                      branch: program.branch,
                      id: program.id,
                    }
                  : null;
              })
              .filter(Boolean);

            if (selectedPrograms.length > 0) {
              newSelectedPrograms.set(index, selectedPrograms);
            }
          }
        });

        if (newSelectedPrograms.size > 0) {
          setSelectedProgramsBySalary(newSelectedPrograms);
        }
      } catch (error) {
        console.error("Failed to fetch JAF data:", error);
        message.error("Failed to load form data. Please refresh the page.");
      }
    };

    fetchJafData();
  }, [values.seasonId]);

  const [years, setYears] = useState<string[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);

  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  // Collapsible state management
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(
    new Set(),
  );

  const handleYearChange = (years: string[], fieldIndex: number) => {
    setSelectedYears(years);

    // Only keep courses that are available in the selected years
    const availableCourses = new Set<string>();
    years.forEach((year) => {
      const yearCourses = programsData.coursesMap.get(year) || new Set();
      yearCourses.forEach((course) => availableCourses.add(course));
    });
    setCourses(Array.from(availableCourses));

    // Filter selected courses to only keep those that are still valid
    const validCourses = selectedCourses.filter((course) =>
      availableCourses.has(course),
    );
    setSelectedCourses(validCourses);

    // Get available branches for the remaining valid year-course combinations
    const availableBranches = new Set<string>();
    years.forEach((year) => {
      validCourses.forEach((course) => {
        const key = `${year}-${course}`;
        const yearCourseBranches =
          programsData.branchesMap.get(key) || new Set();
        yearCourseBranches.forEach((branch) => availableBranches.add(branch));
      });
    });
    setBranches(Array.from(availableBranches));

    // Filter selected branches to only keep those that are still valid
    const validBranches = selectedBranches.filter((branch) =>
      availableBranches.has(branch),
    );
    setSelectedBranches(validBranches);

    // Update selected programs - remove programs that are no longer valid
    const currentSelectedPrograms = getSelectedPrograms(fieldIndex);
    const validPrograms = currentSelectedPrograms.filter(
      (program) =>
        years.includes(program.year) &&
        validCourses.includes(program.course) &&
        validBranches.includes(program.branch),
    );
    updateSelectedPrograms(fieldIndex, validPrograms);
  };

  const handleCourseChange = (courses: string[], fieldIndex: number) => {
    setSelectedCourses(courses);

    // Get all available branches for selected year-course combinations
    const availableBranches = new Set<string>();
    selectedYears.forEach((year) => {
      courses.forEach((course) => {
        const key = `${year}-${course}`;
        const yearCourseBranches =
          programsData.branchesMap.get(key) || new Set();
        yearCourseBranches.forEach((branch) => availableBranches.add(branch));
      });
    });
    setBranches(Array.from(availableBranches));

    // Filter selected branches to only keep those that are still valid
    const validBranches = selectedBranches.filter((branch) =>
      availableBranches.has(branch),
    );
    setSelectedBranches(validBranches);

    // Update selected programs - remove programs that are no longer valid
    const currentSelectedPrograms = getSelectedPrograms(fieldIndex);
    const validPrograms = currentSelectedPrograms.filter(
      (program) =>
        selectedYears.includes(program.year) &&
        courses.includes(program.course) &&
        validBranches.includes(program.branch),
    );
    updateSelectedPrograms(fieldIndex, validPrograms);
  };

  const handleBranchChange = (branches: string[], fieldIndex: number) => {
    const currentSelectedPrograms = getSelectedPrograms(fieldIndex);

    // Handle "ALL" selection
    if (branches.includes("ALL")) {
      // Get all possible programs for selected year-course combinations
      const allPrograms: SelectedProgram[] = [];
      selectedYears.forEach((year) => {
        selectedCourses.forEach((course) => {
          const yearCoursePrograms = programsData.programs
            .filter((p) => p.year === year && p.course === course)
            .map((p) => ({
              year: p.year,
              course: p.course,
              branch: p.branch,
              id: p.id,
            }));
          allPrograms.push(...yearCoursePrograms);
        });
      });

      // Remove duplicates
      const uniquePrograms = allPrograms.filter(
        (prog, index, self) =>
          index === self.findIndex((p) => p.id === prog.id),
      );

      const newPrograms = uniquePrograms.filter(
        (newProg) =>
          !currentSelectedPrograms.some(
            (existingProg) => existingProg.id === newProg.id,
          ),
      );

      const updatedPrograms = [...currentSelectedPrograms, ...newPrograms];
      updateSelectedPrograms(fieldIndex, updatedPrograms);
    } else {
      // Handle individual branch selections
      const newPrograms: SelectedProgram[] = [];

      selectedYears.forEach((year) => {
        selectedCourses.forEach((course) => {
          branches.forEach((branch) => {
            const program = programsData.programs.find(
              (p) =>
                p.year === year && p.course === course && p.branch === branch,
            );

            if (
              program &&
              !currentSelectedPrograms.some((p) => p.id === program.id)
            ) {
              newPrograms.push({
                year: program.year,
                course: program.course,
                branch: program.branch,
                id: program.id,
              });
            }
          });
        });
      });

      const updatedPrograms = [...currentSelectedPrograms, ...newPrograms];
      updateSelectedPrograms(fieldIndex, updatedPrograms);
    }

    setSelectedBranches([]);
  };

  const [selectedProgramsBySalary, setSelectedProgramsBySalary] = useState<
    Map<number, SelectedProgram[]>
  >(new Map());

  // Helper function to get selected programs for a salary entry
  const getSelectedPrograms = (fieldIndex: number): SelectedProgram[] => {
    return selectedProgramsBySalary.get(fieldIndex) || [];
  };

  // Helper function to update selected programs for a salary entry
  const updateSelectedPrograms = (
    fieldIndex: number,
    programs: SelectedProgram[],
  ) => {
    const newMap = new Map(selectedProgramsBySalary);
    newMap.set(fieldIndex, programs);
    setSelectedProgramsBySalary(newMap);

    const programIds = programs.map((p) => p.id);

    // Update form field
    form.setFieldValue(["salaries", fieldIndex, "programs"], programIds);

    // Update Formik state to ensure validation
    const currentSalaries = form.getFieldValue("salaries") || [];
    currentSalaries[fieldIndex] = {
      ...currentSalaries[fieldIndex],
      programs: programIds,
    };
    setFieldValue("salaries", currentSalaries);
  };

  // Helper functions for hierarchical selection
  const isYearIndeterminate = (year: string, fieldIndex: number): boolean => {
    const selectedPrograms = getSelectedPrograms(fieldIndex);
    const yearPrograms = programsData.programs.filter((p) => p.year === year);
    const selectedYearPrograms = selectedPrograms.filter(
      (p) => p.year === year,
    );
    return (
      selectedYearPrograms.length > 0 &&
      selectedYearPrograms.length < yearPrograms.length
    );
  };

  const isCourseIndeterminate = (
    year: string,
    course: string,
    fieldIndex: number,
  ): boolean => {
    const selectedPrograms = getSelectedPrograms(fieldIndex);
    const coursePrograms = programsData.programs.filter(
      (p) => p.year === year && p.course === course,
    );
    const selectedCoursePrograms = selectedPrograms.filter(
      (p) => p.year === year && p.course === course,
    );
    return (
      selectedCoursePrograms.length > 0 &&
      selectedCoursePrograms.length < coursePrograms.length
    );
  };

  const handleYearToggle = (
    year: string,
    checked: boolean,
    fieldIndex: number,
  ) => {
    if (checked) {
      // Add all programs for this year
      const yearPrograms = programsData.programs
        .filter((p) => p.year === year)
        .map((p) => ({
          year: p.year,
          course: p.course,
          branch: p.branch,
          id: p.id,
        }));

      const currentPrograms = getSelectedPrograms(fieldIndex);
      const otherPrograms = currentPrograms.filter((p) => p.year !== year);
      updateSelectedPrograms(fieldIndex, [...otherPrograms, ...yearPrograms]);
    } else {
      // Remove all programs for this year
      const currentPrograms = getSelectedPrograms(fieldIndex);
      const remainingPrograms = currentPrograms.filter((p) => p.year !== year);
      updateSelectedPrograms(fieldIndex, remainingPrograms);
    }
  };

  const handleCourseToggle = (
    year: string,
    course: string,
    checked: boolean,
    fieldIndex: number,
  ) => {
    if (checked) {
      // Add all programs for this year-course combination
      const coursePrograms = programsData.programs
        .filter((p) => p.year === year && p.course === course)
        .map((p) => ({
          year: p.year,
          course: p.course,
          branch: p.branch,
          id: p.id,
        }));

      const currentPrograms = getSelectedPrograms(fieldIndex);
      const otherPrograms = currentPrograms.filter(
        (p) => !(p.year === year && p.course === course),
      );
      updateSelectedPrograms(fieldIndex, [...otherPrograms, ...coursePrograms]);
    } else {
      // Remove all programs for this year-course combination
      const currentPrograms = getSelectedPrograms(fieldIndex);
      const remainingPrograms = currentPrograms.filter(
        (p) => !(p.year === year && p.course === course),
      );
      updateSelectedPrograms(fieldIndex, remainingPrograms);
    }
  };

  const handleBranchToggle = (
    year: string,
    course: string,
    branch: string,
    checked: boolean,
    fieldIndex: number,
  ) => {
    const program = programsData.programs.find(
      (p) => p.year === year && p.course === course && p.branch === branch,
    );
    if (!program) return;

    const currentPrograms = getSelectedPrograms(fieldIndex);

    if (checked) {
      const newProgram = {
        year: program.year,
        course: program.course,
        branch: program.branch,
        id: program.id,
      };
      updateSelectedPrograms(fieldIndex, [...currentPrograms, newProgram]);
    } else {
      const remainingPrograms = currentPrograms.filter(
        (p) => p.id !== program.id,
      );
      updateSelectedPrograms(fieldIndex, remainingPrograms);
    }
  };

  const handleSelectAllForYear = (year: string, fieldIndex: number) => {
    const yearPrograms = programsData.programs
      .filter((p) => p.year === year)
      .map((p) => ({
        year: p.year,
        course: p.course,
        branch: p.branch,
        id: p.id,
      }));

    const currentPrograms = getSelectedPrograms(fieldIndex);
    const otherPrograms = currentPrograms.filter((p) => p.year !== year);
    updateSelectedPrograms(fieldIndex, [...otherPrograms, ...yearPrograms]);
  };

  const handleSelectAllForCourse = (
    year: string,
    course: string,
    fieldIndex: number,
  ) => {
    const coursePrograms = programsData.programs
      .filter((p) => p.year === year && p.course === course)
      .map((p) => ({
        year: p.year,
        course: p.course,
        branch: p.branch,
        id: p.id,
      }));

    const currentPrograms = getSelectedPrograms(fieldIndex);
    const otherPrograms = currentPrograms.filter(
      (p) => !(p.year === year && p.course === course),
    );
    updateSelectedPrograms(fieldIndex, [...otherPrograms, ...coursePrograms]);
  };

  // Collapsible helper functions
  const toggleYearExpanded = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const toggleCourseExpanded = (year: string, course: string) => {
    const courseKey = `${year}-${course}`;
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseKey)) {
      newExpanded.delete(courseKey);
    } else {
      newExpanded.add(courseKey);
    }
    setExpandedCourses(newExpanded);
  };

  return (
    <div className="px-1 md:px-8 min-h-screen">
      {/* Header Section */}
      <div className="text-center mt-4 md:mt-8 mb-4 md:mb-8 py-4 md:py-8 bg-white rounded-lg md:rounded-2xl shadow-md border border-gray-200">
        <Title
          level={4}
          className="mb-2 md:mb-3 text-gray-800 uppercase tracking-wide font-bold text-lg md:text-xl"
        >
          {seasonType === "INTERN" ? "Intern Details" : "Job Details"}
        </Title>
        <Text className="text-sm md:text-base text-gray-600 font-medium px-2 md:px-0">
          {seasonType === "INTERN"
            ? "Provide comprehensive internship position details and requirements"
            : "Provide comprehensive job position details and requirements"}
        </Text>
      </div>

      <Form
        layout="vertical"
        form={form}
        initialValues={{
          tests: [{ type: "APTITUDE", duration: "" }],
          interviews: [{ type: "TECHNICAL", duration: "" }],
          salaries: [{ programs: [] }],
        }}
        onValuesChange={async (changedFields, allFields) => {
          // Update Formik state with form values
          const formValues = form.getFieldsValue();
          setFieldValue("interviews", formValues.interviews || []);
          setFieldValue("tests", formValues.tests || []);

          // Safely handle salaries array with proper null checks
          const salariesArray = formValues.salaries || [];
          const norm = salariesArray
            .filter((s: any) => s !== undefined && s !== null)
            .map((s: any, index: number) => {
              // Get selected programs for this salary entry
              const selectedPrograms = getSelectedPrograms(index);
              return {
                salaryPeriod: s?.salaryPeriod ?? "",
                programs: s?.programs ?? selectedPrograms.map((p) => p.id),
                genders: s?.genders ?? [],
                categories: s?.categories ?? [],
                isBacklogAllowed: s?.isBacklogAllowed ?? "",
                minCPI: s?.minCPI ?? 0,
                tenthMarks: s?.tenthMarks ?? 0,
                twelthMarks: s?.twelthMarks ?? 0,
                baseSalary: s?.baseSalary ?? 0,
                totalCTC: s?.totalCTC ?? 0,
                takeHomeSalary: s?.takeHomeSalary ?? 0,
                grossSalary: s?.grossSalary ?? 0,
                joiningBonus: s?.joiningBonus ?? 0,
                performanceBonus: s?.performanceBonus ?? 0,
                relocation: s?.relocation ?? 0,
                bondAmount: s?.bondAmount ?? 0,
                esopAmount: s?.esopAmount ?? 0,
                esopVestPeriod: s?.esopVestPeriod ?? "",
                firstYearCTC: s?.firstYearCTC ?? 0,
                retentionBonus: s?.retentionBonus ?? 0,
                deductions: s?.deductions ?? 0,
                medicalAllowance: s?.medicalAllowance ?? 0,
                bondDuration: s?.bondDuration ?? "",
                foreignCurrencyCTC: s?.foreignCurrencyCTC ?? 0,
                foreignCurrencyCode: s?.foreignCurrencyCode ?? "INR",
                otherCompensations: s?.otherCompensations ?? 0,
                others: s?.others ?? "",
                stipend: s?.stipend ?? 0,
                foreignCurrencyStipend: s?.foreignCurrencyStipend ?? 0,
                accommodation: s?.accommodation ?? false,
                ppoProvisionOnPerformance:
                  s?.ppoProvisionOnPerformance ?? false,
                tentativeCTC: s?.tentativeCTC ?? 0,
                PPOConfirmationDate: s?.PPOConfirmationDate ?? null,
              };
            });
          setFieldValue("salaries", norm);
        }}
      >
        {/* Basic Job Information Section */}
        <div className="bg-white rounded-lg md:rounded-2xl p-4 md:p-8 mb-4 md:mb-6 shadow-md border border-gray-200">
          <Title
            level={5}
            className="mb-4 md:mb-6 text-gray-800 font-semibold text-base md:text-lg border-b-2 border-gray-200 pb-2 md:pb-3"
          >
            {seasonType === "INTERN"
              ? "Basic Internship Information"
              : "Basic Job Information"}
          </Title>

          <Row gutter={[16, 12]} className="md:gutter-24">
            {/* Job Title (required) */}
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Text strong className="text-xs md:text-sm text-gray-700">
                    <span className="text-red-500">* </span>
                    {seasonType === "INTERN"
                      ? "Internship Title / Role"
                      : "Job Title / Role"}
                  </Text>
                }
                required
                hasFeedback
                validateStatus={getFieldError("role") ? "error" : undefined}
                help={getFieldError("role")}
                className="mb-3 md:mb-4"
              >
                <Input
                  name="role"
                  placeholder={
                    seasonType === "INTERN"
                      ? "e.g., Software Development Intern"
                      : PLACEHOLDERS.JOB_TITLE
                  }
                  value={values.role}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  maxLength={FIELD_LIMITS.JOB_TITLE_MAX}
                  showCount
                  className="rounded-md shadow-sm border-gray-300 text-xs md:text-sm"
                />
              </Form.Item>
            </Col>

            {/* Duration (only for internships) */}
            {seasonType === "INTERN" && (
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <Text strong className="text-xs md:text-sm text-gray-700">
                      Internship Duration
                    </Text>
                  }
                  validateStatus={
                    getFieldError("duration") ? "error" : undefined
                  }
                  help={getFieldError("duration")}
                  className="mb-3 md:mb-4"
                >
                  <Input
                    name="duration"
                    placeholder="e.g., 2 months, 8 weeks"
                    value={values.duration}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    maxLength={FIELD_LIMITS.DURATION_MAX}
                    className="rounded-md shadow-sm border-gray-300 text-xs md:text-sm"
                  />
                </Form.Item>
              </Col>
            )}
          </Row>

          <Row gutter={[16, 12]} className="md:gutter-24">
            {/* Location (required) */}
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Text strong className="text-xs md:text-sm text-gray-700">
                    <span className="text-red-500">* </span>
                    Work Location
                  </Text>
                }
                required
                hasFeedback
                validateStatus={getFieldError("location") ? "error" : undefined}
                help={getFieldError("location")}
                className="mb-3 md:mb-4"
              >
                <Input
                  name="location"
                  placeholder={PLACEHOLDERS.JOB_LOCATION}
                  value={values.location}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  maxLength={FIELD_LIMITS.LOCATION_MAX}
                  showCount
                  className="rounded-md shadow-sm border-gray-300 text-xs md:text-sm"
                />
              </Form.Item>
            </Col>

            {/* Expected hires (optional but numeric) */}
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Text strong className="text-xs md:text-sm text-gray-700">
                    Expected Number of Hires
                  </Text>
                }
                validateStatus={
                  getFieldError("expectedNoOfHires") ? "error" : undefined
                }
                help={getFieldError("expectedNoOfHires")}
                className="mb-3 md:mb-4"
              >
                <Input
                  type="number"
                  name="expectedNoOfHires"
                  placeholder={PLACEHOLDERS.EXPECTED_HIRES}
                  value={values.expectedNoOfHires}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  min={0}
                  max={FIELD_LIMITS.HIRES_MAX}
                  className="rounded-md shadow-sm border-gray-300 text-xs md:text-sm"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 12]} className="md:gutter-24">
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Text strong style={{ fontSize: 14, color: "#374151" }}>
                    Minimum Number of Hires
                  </Text>
                }
                validateStatus={
                  getFieldError("minNoOfHires") ? "error" : undefined
                }
                help={getFieldError("minNoOfHires")}
              >
                <Input
                  type="number"
                  name="minNoOfHires"
                  placeholder={PLACEHOLDERS.MIN_HIRES}
                  value={values.minNoOfHires}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  min={0}
                  max={FIELD_LIMITS.HIRES_MAX}
                  style={{
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                    border: "1px solid #d1d5db",
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={
                  <Text strong style={{ fontSize: 14, color: "#374151" }}>
                    Offer Letter Release Date
                  </Text>
                }
                validateStatus={
                  getFieldError("offerLetterReleaseDate") ? "error" : undefined
                }
                help={getFieldError("offerLetterReleaseDate")}
              >
                <Input
                  type="date"
                  name="offerLetterReleaseDate"
                  value={values.offerLetterReleaseDate}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  min={new Date().toISOString().split("T")[0]}
                  style={{
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                    border: "1px solid #d1d5db",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col span={12}>
              <Form.Item
                label={
                  <Text strong style={{ fontSize: 14, color: "#374151" }}>
                    Tentative Joining Date
                  </Text>
                }
                validateStatus={
                  getFieldError("joiningDate") ? "error" : undefined
                }
                help={getFieldError("joiningDate")}
              >
                <Input
                  type="date"
                  name="joiningDate"
                  value={values.joiningDate}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  min={new Date().toISOString().split("T")[0]}
                  style={{
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                    border: "1px solid #d1d5db",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col span={24}>
              <Form.Item
                label={
                  <Text strong style={{ fontSize: 14, color: "#374151" }}>
                    Required Skills
                  </Text>
                }
                validateStatus={getFieldError("skills") ? "error" : undefined}
                help={getFieldError("skills")}
              >
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  placeholder={PLACEHOLDERS.SKILLS}
                  value={values.skills}
                  onChange={(newSkills: string[]) => {
                    if (newSkills.length <= FIELD_LIMITS.SKILLS_MAX) {
                      setFieldValue("skills", newSkills);
                      setSkills(newSkills);
                    } else {
                      message.warning(
                        `Maximum ${FIELD_LIMITS.SKILLS_MAX} skills allowed`,
                      );
                    }
                  }}
                  maxTagCount="responsive"
                  showSearch
                  filterOption={false}
                  notFoundContent={null}
                />
                {values.skills?.length > 0 && (
                  <Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>
                    {values.skills.length} / {FIELD_LIMITS.SKILLS_MAX} skills
                    added
                  </Text>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={
              <Text strong style={{ fontSize: 14, color: "#374151" }}>
                {seasonType === "INTERN"
                  ? "Internship Description"
                  : "Job Description"}
              </Text>
            }
            validateStatus={getFieldError("description") ? "error" : undefined}
            help={getFieldError("description")}
            style={{ marginBottom: 24 }}
          >
            <Field name="description">
              {() => (
                <div
                  style={{
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                    border: "1px solid #d1d5db",
                    overflow: "hidden",
                  }}
                >
                  <ReactQuill
                    value={values.description || ""}
                    onChange={(html) => {
                      setFieldValue("description", html);
                    }}
                    placeholder={
                      seasonType === "INTERN"
                        ? "Describe the internship role, responsibilities, and learning opportunities..."
                        : PLACEHOLDERS.JOB_DESCRIPTION
                    }
                    className="custom-quill"
                    style={{
                      minHeight: 200,
                    }}
                  />
                </div>
              )}
            </Field>
            {values.description && (
              <Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>
                {values.description.replace(/<[^>]*>/g, "").length} /{" "}
                {FIELD_LIMITS.DESCRIPTION_MAX} characters
              </Text>
            )}
          </Form.Item>

          <Row gutter={[24, 16]}>
            <Col span={24}>
              <Form.Item
                label={
                  <Text strong style={{ fontSize: 14, color: "#374151" }}>
                    {seasonType === "INTERN"
                      ? "Internship Related Documents"
                      : "Job Related Documents"}
                  </Text>
                }
                validateStatus={
                  getFieldError("attachments") ? "error" : undefined
                }
                help={getFieldError("attachments")}
              >
                <div
                  style={{
                    borderRadius: 8,
                    border: "2px dashed #d1d5db",
                    padding: "24px",
                    textAlign: "center",
                    background: "#f9fafb",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Upload
                    fileList={fileList}
                    onChange={handleFileChange}
                    beforeUpload={(file) => {
                      // Validate file type
                      if (!validateFileType(file)) {
                        message.error("Only PDF files are allowed!");
                        return Upload.LIST_IGNORE;
                      }

                      // Validate file size
                      if (!validateFileSize(file, 2)) {
                        message.error("File size must be smaller than 2MB!");
                        return Upload.LIST_IGNORE;
                      }

                      // Check max files limit
                      if (fileList.length >= FIELD_LIMITS.ATTACHMENTS_MAX) {
                        message.error(
                          `Maximum ${FIELD_LIMITS.ATTACHMENTS_MAX} files allowed`,
                        );
                        return Upload.LIST_IGNORE;
                      }

                      return true;
                    }}
                    multiple
                    showUploadList={{
                      showRemoveIcon: true,
                      showDownloadIcon: false,
                    }}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      disabled={fileList.length >= FIELD_LIMITS.ATTACHMENTS_MAX}
                      style={{
                        borderRadius: 8,
                        height: 40,
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      Upload Documents
                    </Button>
                  </Upload>

                  <div style={{ marginTop: 12 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      PDF files only, max 2MB each, up to{" "}
                      {FIELD_LIMITS.ATTACHMENTS_MAX} files
                    </Text>
                    {fileList.length > 0 && (
                      <div style={{ marginTop: 6 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {fileList.length} / {FIELD_LIMITS.ATTACHMENTS_MAX}{" "}
                          files uploaded
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={
              <Text strong style={{ fontSize: 14, color: "#374151" }}>
                {seasonType === "INTERN"
                  ? "Additional Internship Information"
                  : "Additional Job Information"}
              </Text>
            }
            validateStatus={getFieldError("others") ? "error" : undefined}
            help={getFieldError("others")}
          >
            <TextArea
              rows={4}
              name="others"
              placeholder={
                seasonType === "INTERN"
                  ? "Any additional internship details, special requirements, or benefits..."
                  : PLACEHOLDERS.OTHER_DETAILS
              }
              onChange={(e) => {
                handleChange(e);
              }}
              value={values.others}
              maxLength={FIELD_LIMITS.OTHER_DETAILS_MAX}
              showCount
              style={{
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                border: "1px solid #d1d5db",
              }}
            />
          </Form.Item>
        </div>

        {/* Compensation Details */}
        <div className="bg-white rounded-lg md:rounded-2xl p-4 md:p-8 mb-4 md:mb-6 shadow-md border border-gray-200">
          <Title
            level={5}
            className="mb-4 md:mb-6 text-gray-800 font-semibold text-base md:text-lg border-b-2 border-gray-200 pb-2 md:pb-3"
          >
            Compensation/Eligibility Details
          </Title>

          <Form.List name="salaries">
            {(fields, { add, remove }) => (
              <div
                style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
              >
                {fields.map((field, index) => (
                  <Card
                    size="small"
                    title={<Text strong>Compensation Package {index + 1}</Text>}
                    key={field.key}
                    extra={
                      <Button
                        type="text"
                        danger
                        size="small"
                        icon={<CloseOutlined />}
                        onClick={() => remove(field.name)}
                        title="Remove this salary package"
                        disabled={fields.length === 1} // Prevent removing the last salary entry
                      />
                    }
                    style={{ marginBottom: 16 }}
                  >
                    <Title
                      level={5}
                      className="mb-3 md:mb-5 text-gray-700 font-semibold text-xs md:text-sm uppercase tracking-wide"
                    >
                      Eligibility Criteria
                    </Title>
                    <Row gutter={[16, 12]} className="md:gutter-24">
                      <Col span={24}>
                        <div>
                          <Text
                            strong
                            style={{
                              fontSize: 14,
                              color: "#374151",
                              marginBottom: 16,
                              display: "block",
                            }}
                          >
                            Programs
                          </Text>

                          {/* Hidden Form.Item to manage the actual form field */}
                          <Form.Item
                            name={[field.name, "programs"]}
                            initialValue={[]}
                            style={{ display: "none" }}
                            rules={[
                              {
                                type: "array",
                                message: "Programs must be an array",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>

                          <div>
                            {/* Program Selection Tree */}
                            <div
                              style={{
                                border: "1px solid #e5e7eb",
                                borderRadius: 8,
                                background: "#ffffff",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  padding: "12px 16px",
                                  background: "#f9fafb",
                                  borderBottom: "1px solid #e5e7eb",
                                  borderTopLeftRadius: 8,
                                  borderTopRightRadius: 8,
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Text
                                    strong
                                    style={{
                                      fontSize: 14,
                                      color: "#374151",
                                    }}
                                  >
                                    {
                                      "Program Selection (Based on Course Completion Year)"
                                    }
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: "#6b7280",
                                    }}
                                  >
                                    {getSelectedPrograms(field.name).length}{" "}
                                    selected
                                  </Text>
                                </div>
                              </div>

                              <div
                                style={{
                                  padding: "8px 0",
                                }}
                              >
                                {years.map((year) => {
                                  const yearPrograms =
                                    programsData.programs.filter(
                                      (p) => p.year === year,
                                    );
                                  const selectedYearPrograms =
                                    getSelectedPrograms(field.name).filter(
                                      (p) => p.year === year,
                                    );
                                  const isYearSelected =
                                    selectedYearPrograms.length ===
                                    yearPrograms.length;
                                  const isYearIndeterminateVal =
                                    isYearIndeterminate(year, field.name);

                                  return (
                                    <div
                                      key={year}
                                      style={{
                                        borderBottom: "1px solid #f3f4f6",
                                      }}
                                    >
                                      {/* Year Level */}
                                      <div
                                        style={{
                                          padding: "8px 16px",
                                          background: "#ffffff",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: 8,
                                            }}
                                          >
                                            <Button
                                              type="text"
                                              size="small"
                                              icon={
                                                expandedYears.has(year)
                                                  ? "▼"
                                                  : "▶"
                                              }
                                              onClick={() =>
                                                toggleYearExpanded(year)
                                              }
                                              style={{
                                                minWidth: 20,
                                                height: 20,
                                                padding: 0,
                                                fontSize: 10,
                                                color: "#6b7280",
                                              }}
                                            />
                                            <Checkbox
                                              checked={isYearSelected}
                                              indeterminate={
                                                isYearIndeterminateVal
                                              }
                                              onChange={(e) =>
                                                handleYearToggle(
                                                  year,
                                                  e.target.checked,
                                                  field.name,
                                                )
                                              }
                                              style={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                              }}
                                            >
                                              {year} Batch (
                                              {yearPrograms.length} programs)
                                            </Checkbox>
                                          </div>

                                          <Button
                                            type="link"
                                            size="small"
                                            style={{
                                              fontSize: 12,
                                            }}
                                            onClick={() =>
                                              handleSelectAllForYear(
                                                year,
                                                field.name,
                                              )
                                            }
                                          >
                                            Select All
                                          </Button>
                                        </div>
                                      </div>

                                      {/* Courses for this year */}
                                      {expandedYears.has(year) && (
                                        <div
                                          style={{
                                            paddingLeft: 32,
                                            background: "#fafbfc",
                                          }}
                                        >
                                          {Array.from(
                                            programsData.coursesMap.get(year) ||
                                              [],
                                          ).map((course) => {
                                            const coursePrograms =
                                              programsData.programs.filter(
                                                (p) =>
                                                  p.year === year &&
                                                  p.course === course,
                                              );
                                            const selectedCoursePrograms =
                                              getSelectedPrograms(
                                                field.name,
                                              ).filter(
                                                (p) =>
                                                  p.year === year &&
                                                  p.course === course,
                                              );
                                            const isCourseSelected =
                                              selectedCoursePrograms.length ===
                                              coursePrograms.length;
                                            const isCourseIndeterminateVal =
                                              isCourseIndeterminate(
                                                year,
                                                course,
                                                field.name,
                                              );

                                            return (
                                              <div key={`${year}-${course}`}>
                                                {/* Course Level */}
                                                <div
                                                  style={{
                                                    padding: "6px 12px",
                                                    background: "#ffffff",
                                                    margin: "2px 0",
                                                    cursor: "pointer",
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      justifyContent:
                                                        "space-between",
                                                    }}
                                                  >
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 4,
                                                      }}
                                                    >
                                                      <Button
                                                        type="text"
                                                        size="small"
                                                        icon={
                                                          expandedCourses.has(
                                                            `${year}-${course}`,
                                                          )
                                                            ? "▼"
                                                            : "▶"
                                                        }
                                                        onClick={() =>
                                                          toggleCourseExpanded(
                                                            year,
                                                            course,
                                                          )
                                                        }
                                                        style={{
                                                          minWidth: 16,
                                                          height: 16,
                                                          padding: 0,
                                                          fontSize: 8,
                                                          color: "#6b7280",
                                                        }}
                                                      />
                                                      <Checkbox
                                                        checked={
                                                          isCourseSelected
                                                        }
                                                        indeterminate={
                                                          isCourseIndeterminateVal
                                                        }
                                                        onChange={(e) =>
                                                          handleCourseToggle(
                                                            year,
                                                            course,
                                                            e.target.checked,
                                                            field.name,
                                                          )
                                                        }
                                                        style={{
                                                          fontWeight: 500,
                                                          fontSize: 13,
                                                        }}
                                                      >
                                                        {course} (
                                                        {coursePrograms.length})
                                                      </Checkbox>
                                                    </div>

                                                    <Button
                                                      type="link"
                                                      size="small"
                                                      style={{
                                                        fontSize: 11,
                                                      }}
                                                      onClick={() =>
                                                        handleSelectAllForCourse(
                                                          year,
                                                          course,
                                                          field.name,
                                                        )
                                                      }
                                                    >
                                                      All Branches
                                                    </Button>
                                                  </div>
                                                </div>

                                                {/* Branches for this course */}
                                                {expandedCourses.has(
                                                  `${year}-${course}`,
                                                ) && (
                                                  <div
                                                    style={{
                                                      paddingLeft: 24,
                                                      marginBottom: 4,
                                                    }}
                                                  >
                                                    {Array.from(
                                                      programsData.branchesMap.get(
                                                        `${year}-${course}`,
                                                      ) || [],
                                                    ).map((branch) => {
                                                      const program =
                                                        programsData.programs.find(
                                                          (p) =>
                                                            p.year === year &&
                                                            p.course ===
                                                              course &&
                                                            p.branch === branch,
                                                        );
                                                      const isSelected =
                                                        getSelectedPrograms(
                                                          field.name,
                                                        ).some(
                                                          (p) =>
                                                            p.id ===
                                                            program?.id,
                                                        );

                                                      return (
                                                        <div
                                                          key={`${year}-${course}-${branch}`}
                                                          style={{
                                                            padding: "4px 8px",
                                                            background:
                                                              isSelected
                                                                ? "#f0fdf4"
                                                                : "#ffffff",
                                                            margin: "1px 0",
                                                            borderRadius: 4,
                                                          }}
                                                        >
                                                          <Checkbox
                                                            checked={isSelected}
                                                            onChange={(e) =>
                                                              handleBranchToggle(
                                                                year,
                                                                course,
                                                                branch,
                                                                e.target
                                                                  .checked,
                                                                field.name,
                                                              )
                                                            }
                                                            style={{
                                                              fontSize: 12,
                                                            }}
                                                          >
                                                            {program?.course ===
                                                            "BTech"
                                                              ? branch
                                                              : `${program?.department} - ${branch}`}
                                                          </Checkbox>
                                                        </div>
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
                          </div>
                        </div>
                      </Col>
                    </Row>
                    {/* <Row gutter={[24, 16]}>
                      <Col span={12}>
                        <Form.Item
                          label={
                            <Text
                              strong
                              style={{ fontSize: 14, color: "#374151" }}
                            >
                              Eligible Genders
                            </Text>
                          }
                          name={[field.name, "genders"]}
                          help="Select eligible genders (leave empty for all genders)"
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select eligible genders"
                            options={GENDER_OPTIONS}
                            allowClear
                            maxTagCount="responsive"
                            style={{
                              borderRadius: 8,
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={
                            <Text
                              strong
                              style={{ fontSize: 14, color: "#374151" }}
                            >
                              Eligible Categories
                            </Text>
                          }
                          name={[field.name, "categories"]}
                          help="Select eligible categories (leave empty for all categories)"
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select eligible categories"
                            options={CATEGORY_OPTIONS}
                            allowClear
                            maxTagCount="responsive"
                            style={{
                              borderRadius: 8,
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row> */}
                    <Row gutter={[16, 12]} className="md:gutter-24">
                      <Col xs={24} md={12}>
                        <Form.Item
                          label={
                            <Text
                              strong
                              className="text-xs md:text-sm text-gray-700"
                            >
                              Is there a minimum CPI criterion?
                            </Text>
                          }
                          name={[field.name, "hasCpiCriterion"]}
                          initialValue={false}
                          valuePropName="checked"
                          className="mb-3 md:mb-4"
                        >
                          <Switch
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                            onChange={(checked) => {
                              form.setFieldValue(
                                ["salaries", index, "hasCpiCriterion"],
                                checked,
                              );
                              if (!checked) {
                                form.setFieldValue(
                                  ["salaries", index, "minCPI"],
                                  undefined,
                                );
                              }
                            }}
                          />
                        </Form.Item>
                      </Col>
                      {form.getFieldValue([
                        "salaries",
                        index,
                        "hasCpiCriterion",
                      ]) && (
                        <Col xs={24} md={12}>
                          <Form.Item
                            label={
                              <Text
                                strong
                                className="text-xs md:text-sm text-gray-700"
                              >
                                Minimum CPI Required
                              </Text>
                            }
                            name={[field.name, "minCPI"]}
                            help="Enter minimum CPI requirement"
                            className="mb-3 md:mb-4"
                            rules={[
                              {
                                required: true,
                                message:
                                  "Please enter minimum CPI if criterion is enabled",
                              },
                            ]}
                          >
                            <Input
                              placeholder={PLACEHOLDERS.MIN_CPI}
                              type="number"
                              min={0}
                              max={FIELD_LIMITS.CPI_MAX}
                              step={0.1}
                              className="rounded-md shadow-sm border-gray-300 text-xs md:text-sm"
                            />
                          </Form.Item>
                        </Col>
                      )}

                      <Col xs={24} md={12}>
                        <Form.Item
                          label={
                            <Text
                              strong
                              style={{ fontSize: 14, color: "#374151" }}
                            >
                              Minimum 10th Marks (%)
                            </Text>
                          }
                          name={[field.name, "tenthMarks"]}
                          validateStatus={
                            getFieldError(`salaries.${index}.tenthMarks`)
                              ? "error"
                              : undefined
                          }
                          help={
                            getFieldError(`salaries.${index}.tenthMarks`) ||
                            "Enter minimum 10th standard marks requirement (leave empty if no minimum)"
                          }
                        >
                          <Input
                            placeholder={PLACEHOLDERS.TENTH_MARKS}
                            type="number"
                            min={0}
                            max={100}
                            step={0.1}
                            onChange={(e) => {
                              form.setFieldValue(
                                ["salaries", index, "tenthMarks"],
                                e.target.value,
                              );
                            }}
                            style={{
                              borderRadius: 8,
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                              border: "1px solid #d1d5db",
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 12]} className="md:gutter-24">
                      <Col xs={24} md={12}>
                        <Form.Item
                          label={
                            <Text
                              strong
                              className="text-xs md:text-sm text-gray-700"
                            >
                              Minimum 12th Marks (%)
                            </Text>
                          }
                          name={[field.name, "twelthMarks"]}
                          validateStatus={
                            getFieldError(`salaries.${index}.twelthMarks`)
                              ? "error"
                              : undefined
                          }
                          help={
                            getFieldError(`salaries.${index}.twelthMarks`) ||
                            "Enter minimum 12th standard marks requirement (leave empty if no minimum)"
                          }
                          className="mb-3 md:mb-4"
                        >
                          <Input
                            placeholder={PLACEHOLDERS.TWELFTH_MARKS}
                            type="number"
                            min={0}
                            max={100}
                            step={0.1}
                            onChange={(e) => {
                              form.setFieldValue(
                                ["salaries", index, "twelthMarks"],
                                e.target.value,
                              );
                            }}
                            className="rounded-md shadow-sm border-gray-300 text-xs md:text-sm"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label={
                            <Text
                              strong
                              className="text-xs md:text-sm text-gray-700"
                            >
                              <span className="text-red-500">* </span>
                              Are Students With Backlogs Allowed?
                            </Text>
                          }
                          name={[field.name, "isBacklogAllowed"]}
                          validateStatus={
                            getFieldError(`salaries.${index}.isBacklogAllowed`)
                              ? "error"
                              : undefined
                          }
                          help="Concerns students with uncleared backlogs."
                          className="mb-3 md:mb-4"
                        >
                          <Select
                            placeholder="Select policy"
                            options={BACKLOG_OPTIONS}
                            onChange={(value) => {
                              form.setFieldValue(
                                ["salaries", index, "isBacklogAllowed"],
                                value,
                              );
                            }}
                            className="rounded-md"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    {seasonType === "PLACEMENT" ? (
                      <>
                        <Title
                          level={5}
                          className="mt-4 md:mt-6 mb-3 md:mb-4 text-gray-800 font-semibold text-sm md:text-base"
                        >
                          Placement Compensation Details
                        </Title>

                        <Row gutter={[16, 12]} className="md:gutter-24">
                          <Col xs={24} md={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  className="text-xs md:text-sm text-gray-700"
                                >
                                  Base Salary (Annual)
                                </Text>
                              }
                              name={[field.name, "baseSalary"]}
                              help="Fixed annual salary component"
                              className="mb-3 md:mb-4"
                            >
                              <Input
                                type="number"
                                placeholder={PLACEHOLDERS.BASE_SALARY}
                                min={0}
                                max={FIELD_LIMITS.SALARY_MAX}
                                className="rounded-md shadow-sm border-gray-300 text-xs md:text-sm"
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  className="text-xs md:text-sm text-gray-700"
                                >
                                  Total CTC (Annual)
                                </Text>
                              }
                              name={[field.name, "totalCTC"]}
                              help="Complete cost to company including all benefits"
                              className="mb-3 md:mb-4"
                            >
                              <Input
                                type="number"
                                placeholder={PLACEHOLDERS.TOTAL_CTC}
                                min={0}
                                max={FIELD_LIMITS.SALARY_MAX}
                                className="rounded-md shadow-sm border-gray-300 text-xs md:text-sm"
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={[16, 12]} className="md:gutter-24">
                          <Col xs={24} md={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  Take Home Salary (Monthly)
                                </Text>
                              }
                              name={[field.name, "takeHomeSalary"]}
                              help="Net monthly salary after deductions"
                            >
                              <Input
                                type="number"
                                placeholder={PLACEHOLDERS.TAKE_HOME_SALARY}
                                min={0}
                                max={FIELD_LIMITS.SALARY_MAX}
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  Gross Salary
                                </Text>
                              }
                              name={[field.name, "grossSalary"]}
                            >
                              <Input
                                type="number"
                                placeholder={PLACEHOLDERS.GROSS_SALARY}
                                min={0}
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={[24, 16]}>
                          <Col span={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  Joining Bonus
                                </Text>
                              }
                              name={[field.name, "joiningBonus"]}
                            >
                              <Input
                                type="number"
                                placeholder={PLACEHOLDERS.JOINING_BONUS}
                                min={0}
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  Performance Bonus
                                </Text>
                              }
                              name={[field.name, "performanceBonus"]}
                            >
                              <Input
                                type="number"
                                placeholder={PLACEHOLDERS.PERFORMANCE_BONUS}
                                min={0}
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={[24, 16]}>
                          <Col span={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  Relocation
                                </Text>
                              }
                              name={[field.name, "relocation"]}
                            >
                              <Input
                                type="number"
                                placeholder={PLACEHOLDERS.RELOCATION}
                                min={0}
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  First Year CTC
                                </Text>
                              }
                              name={[field.name, "firstYearCTC"]}
                            >
                              <Input
                                type="number"
                                placeholder={PLACEHOLDERS.FIRST_YEAR_CTC}
                                min={0}
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={[24, 16]}>
                          <Col span={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  Retention Bonus
                                </Text>
                              }
                              name={[field.name, "retentionBonus"]}
                            >
                              <Input
                                type="number"
                                placeholder={PLACEHOLDERS.RETENTION_BONUS}
                                min={0}
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  Deductions
                                </Text>
                              }
                              name={[field.name, "deductions"]}
                            >
                              <Input
                                type="number"
                                placeholder="Deductions"
                                min={0}
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={[24, 16]}>
                          <Col span={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  Medical Allowance
                                </Text>
                              }
                              name={[field.name, "medicalAllowance"]}
                            >
                              <Input
                                type="number"
                                placeholder="Medical Allowance"
                                min={0}
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={[24, 16]}>
                          <Col span={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  ESOP Amount
                                </Text>
                              }
                              name={[field.name, "esopAmount"]}
                            >
                              <Input
                                type="number"
                                placeholder="ESOP Amount"
                                min={0}
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  ESOP Vest Period
                                </Text>
                              }
                              name={[field.name, "esopVestPeriod"]}
                            >
                              <Input
                                placeholder="ESOP Vest Period"
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={[24, 16]}>
                          <Col span={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  Bond Amount
                                </Text>
                              }
                              name={[field.name, "bondAmount"]}
                            >
                              <Input
                                type="number"
                                placeholder="Bond Amount"
                                min={0}
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ fontSize: 14, color: "#374151" }}
                                >
                                  Bond Duration
                                </Text>
                              }
                              name={[field.name, "bondDuration"]}
                            >
                              <Input
                                placeholder="Bond Duration"
                                style={{
                                  borderRadius: 8,
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                  border: "1px solid #d1d5db",
                                }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <>
                        <Title
                          level={5}
                          className="mt-4 md:mt-6 mb-3 md:mb-4 text-gray-800 font-semibold text-sm md:text-base"
                        >
                          Internship Compensation Details
                        </Title>

                        <Row gutter={[16, 12]} className="md:gutter-24">
                          <Col xs={24} md={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  className="text-xs md:text-sm text-gray-700"
                                >
                                  Monthly Stipend
                                </Text>
                              }
                              name={[field.name, "stipend"]}
                              className="mb-3 md:mb-4"
                            >
                              <Input
                                type="number"
                                placeholder={PLACEHOLDERS.STIPEND}
                                min={0}
                                max={FIELD_LIMITS.STIPEND_MAX}
                                className="rounded-md shadow-sm border-gray-300 text-xs md:text-sm"
                                addonBefore={
                                  <CurrencySelect
                                    defaultValue="INR"
                                    style={{ width: 120 }}
                                    allowCustom={true}
                                    customCurrencies={customCurrencies}
                                    onAddCustomCurrency={
                                      handleAddCustomCurrency
                                    }
                                    syncedCurrency={syncedCurrency}
                                    onCurrencySync={handleCurrencySync}
                                  />
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  className="text-xs md:text-sm text-gray-700"
                                >
                                  Accommodation
                                </Text>
                              }
                              name={[field.name, "accommodation"]}
                              className="mb-3 md:mb-4"
                            >
                              <Select
                                placeholder="Select accommodation provision"
                                className="rounded-md"
                                options={[
                                  {
                                    value: true,
                                    label: "Yes - Accommodation Provided",
                                  },
                                  {
                                    value: false,
                                    label: "No - Accommodation Not Provided",
                                  },
                                ]}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  className="text-xs md:text-sm text-gray-700"
                                >
                                  PPO Provision on Performance
                                </Text>
                              }
                              name={[field.name, "ppoProvisionOnPerformance"]}
                              className="mb-3 md:mb-4"
                            >
                              <Select
                                placeholder="Select PPO provision"
                                className="rounded-md"
                                options={[
                                  {
                                    value: true,
                                    label: "Yes - PPO Offered on Performance",
                                  },
                                  {
                                    value: false,
                                    label: "No - PPO Not Offered",
                                  },
                                ]}
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        {/* PPO Details - Only show if PPO provision is YES */}
                        {form.getFieldValue([
                          "salaries",
                          index,
                          "ppoProvisionOnPerformance",
                        ]) === true && (
                          <Row gutter={[24, 16]}>
                            <Col span={12}>
                              <Form.Item
                                label={
                                  <Text
                                    strong
                                    style={{ fontSize: 14, color: "#374151" }}
                                  >
                                    Tentative CTC for PPO Select
                                  </Text>
                                }
                                name={[field.name, "tentativeCTC"]}
                              >
                                <Input
                                  type="number"
                                  placeholder="Tentative CTC"
                                  min={0}
                                  style={{
                                    borderRadius: 8,
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                    border: "1px solid #d1d5db",
                                  }}
                                  addonBefore={
                                    <CurrencySelect
                                      defaultValue="INR"
                                      style={{ width: 120 }}
                                      allowCustom={true}
                                      customCurrencies={customCurrencies}
                                      onAddCustomCurrency={
                                        handleAddCustomCurrency
                                      }
                                      syncedCurrency={syncedCurrency}
                                      onCurrencySync={handleCurrencySync}
                                    />
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                label={
                                  <Text
                                    strong
                                    style={{ fontSize: 14, color: "#374151" }}
                                  >
                                    Tentative Date for PPO Confirmation
                                  </Text>
                                }
                                name={[field.name, "PPOConfirmationDate"]}
                                help="Not later than 15th September 2025, as per AIPC policy"
                              >
                                <Input
                                  type="date"
                                  min={new Date().toISOString().split("T")[0]}
                                  style={{
                                    borderRadius: 8,
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                    border: "1px solid #d1d5db",
                                  }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        )}
                      </>
                    )}
                    <Row gutter={[16, 12]} className="md:gutter-24">
                      <Col span={24}>
                        <Form.Item
                          label={
                            <Text
                              strong
                              className="text-xs md:text-sm text-gray-700"
                            >
                              Other Compensations / Perks
                            </Text>
                          }
                          name={[field.name, "otherCompensations"]}
                          validateStatus={
                            getFieldError(
                              `salaries.${index}.otherCompensations`,
                            )
                              ? "error"
                              : undefined
                          }
                          help={getFieldError(
                            `salaries.${index}.otherCompensations`,
                          )}
                          className="mb-3 md:mb-4"
                        >
                          <Input
                            placeholder={PLACEHOLDERS.OTHER_COMPENSATIONS}
                            type="number"
                            min={0}
                            onChange={(e) => {
                              form.setFieldValue(
                                ["salaries", index, "otherCompensations"],
                                e.target.value,
                              );
                            }}
                            className="rounded-md shadow-sm border-gray-300 text-xs md:text-sm"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}

                <Button
                  type="dashed"
                  onClick={() => {
                    if (fields.length < FIELD_LIMITS.SALARY_ENTRIES_MAX) {
                      add({ programs: [] });
                    } else {
                      message.warning(
                        `Maximum ${FIELD_LIMITS.SALARY_ENTRIES_MAX} salary packages allowed`,
                      );
                    }
                  }}
                  block
                  style={{
                    marginTop: 24,
                    borderRadius: 8,
                    height: 40,
                    fontSize: 14,
                    fontWeight: 500,
                    borderColor: "#d1d5db",
                  }}
                  disabled={fields.length >= FIELD_LIMITS.SALARY_ENTRIES_MAX}
                >
                  + Add Salary Package ({fields.length}/
                  {FIELD_LIMITS.SALARY_ENTRIES_MAX})
                </Button>
              </div>
            )}
          </Form.List>
        </div>

        {/* Selection Procedure Section */}
        <div className="bg-white rounded-lg md:rounded-2xl p-4 md:p-8 mb-4 md:mb-6 shadow-md border border-gray-200">
          <Title
            level={5}
            className="mb-4 md:mb-6 text-gray-800 font-semibold text-base md:text-lg border-b-2 border-gray-200 pb-2 md:pb-3"
          >
            Selection Procedure
          </Title>

          <Row gutter={[16, 12]} className="md:gutter-24">
            {/* Selection Mode (required) */}
            <Col xs={24} lg={8}>
              <Form.Item
                label={
                  <Text strong className="text-xs md:text-sm text-gray-700">
                    <span className="text-red-500">* </span>
                    Selection Mode
                  </Text>
                }
                required
                hasFeedback
                validateStatus={
                  getFieldError("selectionMode") ? "error" : undefined
                }
                help={getFieldError("selectionMode")}
                className="mb-3 md:mb-4"
              >
                <Select
                  value={values.selectionMode || undefined}
                  placeholder="Select mode"
                  onChange={(val: SelectionModeEnum) => {
                    setFieldValue("selectionMode", val);
                  }}
                  options={SELECTION_MODE_OPTIONS}
                  className="rounded-md"
                />
              </Form.Item>
            </Col>

            {/* Selection preferences */}
            <Col xs={24} lg={8}>
              <Form.Item
                label={
                  <Text strong className="text-xs md:text-sm text-gray-700">
                    Selection Options
                  </Text>
                }
                className="mb-2 md:mb-4"
              >
                <div className="flex flex-col gap-3">
                  <Checkbox
                    checked={values.shortlistFromResume}
                    onChange={(e) =>
                      setFieldValue("shortlistFromResume", e.target.checked)
                    }
                    className="text-xs md:text-sm"
                  >
                    <Text className="text-xs md:text-sm">
                      Shortlist From Resume
                    </Text>
                  </Checkbox>
                </div>
              </Form.Item>
            </Col>

            <Col xs={24} lg={8}>
              <Form.Item label=" " className="mb-2 md:mb-4">
                <div className="flex flex-col gap-3">
                  <Checkbox
                    checked={values.groupDiscussion}
                    onChange={(e) =>
                      setFieldValue("groupDiscussion", e.target.checked)
                    }
                    className="text-xs md:text-sm"
                  >
                    <Text className="text-xs md:text-sm">
                      Group Discussion Round
                    </Text>
                  </Checkbox>
                </div>
              </Form.Item>
            </Col>
          </Row>

          {/* Tests Section */}
          <Title
            level={5}
            className="mt-6 md:mt-8 mb-3 md:mb-4 text-gray-800 font-semibold text-sm md:text-base"
          >
            Written Tests & Assessments
          </Title>

          <Form.List name="tests">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Card
                    size="small"
                    title={
                      <Text strong className="text-xs md:text-sm text-gray-700">
                        Test {index + 1}
                      </Text>
                    }
                    key={field.key}
                    extra={
                      <Button
                        type="text"
                        danger
                        size="small"
                        icon={<CloseOutlined />}
                        onClick={() => remove(field.name)}
                        title="Remove this test"
                        className="rounded-md"
                      />
                    }
                    className="mb-3 md:mb-4 rounded-lg shadow-sm border border-gray-200"
                  >
                    <Row gutter={[16, 12]} className="md:gutter-24">
                      <Col xs={24} md={12}>
                        <Form.Item
                          label={
                            <Text
                              strong
                              style={{ fontSize: 14, color: "#374151" }}
                            >
                              <span style={{ color: "#ef4444" }}>* </span>
                              Test Type
                            </Text>
                          }
                          name={[field.name, "type"]}
                          validateStatus={
                            getFieldError(`tests.${index}.type`)
                              ? "error"
                              : undefined
                          }
                          help={getFieldError(`tests.${index}.type`)}
                        >
                          <Select
                            placeholder="Select type"
                            options={testType}
                            showSearch
                            filterOption={(input, option) =>
                              String(option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            onChange={(value) => {
                              form.setFieldValue(
                                ["tests", index, "type"],
                                value,
                              );
                            }}
                            style={{
                              borderRadius: 8,
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={
                            <Text
                              strong
                              style={{ fontSize: 14, color: "#374151" }}
                            >
                              <span style={{ color: "#ef4444" }}>* </span>
                              Duration
                            </Text>
                          }
                          name={[field.name, "duration"]}
                          validateStatus={
                            getFieldError(`tests.${index}.duration`)
                              ? "error"
                              : undefined
                          }
                          help={getFieldError(`tests.${index}.duration`)}
                        >
                          <Input
                            placeholder={PLACEHOLDERS.TEST_DURATION}
                            maxLength={100}
                            onChange={(e) => {
                              form.setFieldValue(
                                ["tests", index, "duration"],
                                e.target.value,
                              );
                            }}
                            style={{
                              borderRadius: 8,
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                              border: "1px solid #d1d5db",
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}

                <Button
                  type="dashed"
                  onClick={() => {
                    if (fields.length < FIELD_LIMITS.TESTS_MAX) {
                      add();
                    } else {
                      message.warning(
                        `Maximum ${FIELD_LIMITS.TESTS_MAX} tests allowed`,
                      );
                    }
                  }}
                  block
                  style={{
                    marginBottom: 16,
                    borderRadius: 8,
                    height: 40,
                    fontSize: 14,
                    fontWeight: 500,
                    borderColor: "#d1d5db",
                  }}
                  disabled={fields.length >= FIELD_LIMITS.TESTS_MAX}
                >
                  + Add Test ({fields.length}/{FIELD_LIMITS.TESTS_MAX})
                </Button>
              </>
            )}
          </Form.List>

          {/* Interviews Section */}
          <Title
            level={5}
            style={{
              marginTop: 32,
              marginBottom: 16,
              color: "#1f2937",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Interview Rounds
          </Title>

          <Form.List name="interviews">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Card
                    size="small"
                    title={
                      <Text strong style={{ fontSize: 14, color: "#374151" }}>
                        Interview Round {index + 1}
                      </Text>
                    }
                    key={field.key}
                    extra={
                      <Button
                        type="text"
                        danger
                        size="small"
                        icon={<CloseOutlined />}
                        onClick={() => remove(field.name)}
                        title="Remove this interview round"
                        style={{
                          borderRadius: 6,
                        }}
                      />
                    }
                    style={{
                      marginBottom: 16,
                      borderRadius: 12,
                      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <Row gutter={[24, 16]}>
                      <Col span={12}>
                        <Form.Item
                          label={
                            <Text
                              strong
                              style={{ fontSize: 14, color: "#374151" }}
                            >
                              <span style={{ color: "#ef4444" }}>* </span>
                              Interview Type
                            </Text>
                          }
                          name={[field.name, "type"]}
                          validateStatus={
                            getFieldError(`interviews.${index}.type`)
                              ? "error"
                              : undefined
                          }
                          help={getFieldError(`interviews.${index}.type`)}
                        >
                          <Select
                            placeholder="Select type"
                            options={interviewType}
                            showSearch
                            filterOption={(input, option) =>
                              String(option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            onChange={(value) => {
                              form.setFieldValue(
                                ["interviews", index, "type"],
                                value,
                              );
                            }}
                            style={{
                              borderRadius: 8,
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={
                            <Text
                              strong
                              style={{ fontSize: 14, color: "#374151" }}
                            >
                              <span style={{ color: "#ef4444" }}>* </span>
                              Duration
                            </Text>
                          }
                          name={[field.name, "duration"]}
                          validateStatus={
                            getFieldError(`interviews.${index}.duration`)
                              ? "error"
                              : undefined
                          }
                          help={getFieldError(`interviews.${index}.duration`)}
                        >
                          <Input
                            placeholder={PLACEHOLDERS.INTERVIEW_DURATION}
                            maxLength={100}
                            onChange={(e) => {
                              form.setFieldValue(
                                ["interviews", index, "duration"],
                                e.target.value,
                              );
                            }}
                            style={{
                              borderRadius: 8,
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                              border: "1px solid #d1d5db",
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}

                <Button
                  type="dashed"
                  onClick={() => {
                    if (fields.length < FIELD_LIMITS.INTERVIEWS_MAX) {
                      add();
                    } else {
                      message.warning(
                        `Maximum ${FIELD_LIMITS.INTERVIEWS_MAX} interview rounds allowed`,
                      );
                    }
                  }}
                  block
                  style={{
                    marginBottom: 16,
                    borderRadius: 8,
                    height: 40,
                    fontSize: 14,
                    fontWeight: 500,
                    borderColor: "#d1d5db",
                  }}
                  disabled={fields.length >= FIELD_LIMITS.INTERVIEWS_MAX}
                >
                  + Add Interview Round ({fields.length}/
                  {FIELD_LIMITS.INTERVIEWS_MAX})
                </Button>
              </>
            )}
          </Form.List>

          {/* Infrastructure Requirements */}
          <Title
            level={5}
            className="mt-6 md:mt-8 mb-3 md:mb-4 text-gray-800 font-semibold text-sm md:text-base"
          >
            Infrastructure Requirements
          </Title>

          <Row gutter={[16, 12]} className="md:gutter-24">
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Text strong className="text-xs md:text-sm text-gray-700">
                    Team Members Required
                  </Text>
                }
                validateStatus={
                  getFieldError("numberOfMembers") ? "error" : undefined
                }
                help={getFieldError("numberOfMembers")}
                className="mb-3 md:mb-4"
              >
                <Input
                  type="number"
                  name="numberOfMembers"
                  placeholder={PLACEHOLDERS.REQUIREMENTS_MEMBERS}
                  value={values.numberOfMembers}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  min={0}
                  max={FIELD_LIMITS.MEMBERS_MAX}
                  className="rounded-md shadow-sm border-gray-300 text-xs md:text-sm"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Text strong style={{ fontSize: 14, color: "#374151" }}>
                    Rooms/Spaces Required
                  </Text>
                }
                validateStatus={
                  getFieldError("numberOfRooms") ? "error" : undefined
                }
                help={getFieldError("numberOfRooms")}
              >
                <Input
                  type="number"
                  name="numberOfRooms"
                  placeholder={PLACEHOLDERS.REQUIREMENTS_ROOMS}
                  value={values.numberOfRooms}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  min={0}
                  max={FIELD_LIMITS.ROOMS_MAX}
                  style={{
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                    border: "1px solid #d1d5db",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={
              <Text strong style={{ fontSize: 14, color: "#374151" }}>
                Other Infrastructure Requirements
              </Text>
            }
            validateStatus={
              getFieldError("otherRequirements") ? "error" : undefined
            }
            help={getFieldError("otherRequirements")}
          >
            <TextArea
              rows={4}
              name="otherRequirements"
              placeholder={PLACEHOLDERS.OTHER_REQUIREMENTS}
              value={values.otherRequirements}
              onChange={(e) => {
                handleChange(e);
              }}
              maxLength={FIELD_LIMITS.OTHER_DETAILS_MAX}
              showCount
              style={{
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                border: "1px solid #d1d5db",
              }}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default JobDetails;
