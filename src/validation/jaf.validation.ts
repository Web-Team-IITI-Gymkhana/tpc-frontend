import * as Yup from "yup";
import {
  SelectionModeEnum,
  TestTypesEnum,
  InterviewTypesEnum,
  BacklogEnum,
  GenderEnum,
  CategoryEnum,
} from "../types/jaf.types";

// Phone number regex
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// Helper function for conditional validation
const requiredIfAny = (idx: 2 | 3, base: Yup.StringSchema = Yup.string()) =>
  Yup.lazy((_, { parent }) => {
    const k = (field: string) => `${field}${idx}` as const;
    const essentials = [
      parent[k("recName")],
      parent[k("designation")],
      parent[k("email")],
      parent[k("phoneNumber")],
    ];
    const anyFilled = essentials.some(
      (v) => typeof v === "string" && v.trim() !== "",
    );
    return anyFilled
      ? base.required(
          "This field is required when any contact info is provided",
        )
      : base.notRequired();
  });

// Season Details validation
export const seasonDetailsValidationSchema = Yup.object({
  seasonId: Yup.string()
    .required("Please select a recruitment season")
    .uuid("Invalid season ID format"),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions to proceed")
    .required("Terms acceptance is required"),
});

// Recruiter Details validation
export const recruiterDetailsValidationSchema = Yup.object({
  // Primary recruiter (required)
  recName1: Yup.string()
    .required("Primary recruiter name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .matches(
      /^[a-zA-Z\s.'-]+$/,
      "Name can only contain letters, spaces, dots, apostrophes, and hyphens",
    ),

  designation1: Yup.string()
    .required("Primary recruiter designation is required")
    .min(2, "Designation must be at least 2 characters")
    .max(100, "Designation must not exceed 100 characters"),

  email1: Yup.string()
    .email("Please enter a valid email address")
    .required("Primary recruiter email is required")
    .max(254, "Email must not exceed 254 characters"),

  phoneNumber1: Yup.string()
    .matches(phoneRegExp, "Please enter a valid phone number")
    .required("Primary recruiter phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),

  landline1: Yup.string()
    .matches(/^[\d\s\-\+\(\)]+$/, "Please enter a valid landline number")
    .max(20, "Landline number must not exceed 20 characters"),

  // Secondary recruiters (conditional)
  recName2: requiredIfAny(
    2,
    Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters")
      .matches(
        /^[a-zA-Z\s.'-]+$/,
        "Name can only contain letters, spaces, dots, apostrophes, and hyphens",
      ),
  ),

  designation2: requiredIfAny(
    2,
    Yup.string()
      .min(2, "Designation must be at least 2 characters")
      .max(100, "Designation must not exceed 100 characters"),
  ),

  email2: requiredIfAny(
    2,
    Yup.string()
      .email("Please enter a valid email address")
      .max(254, "Email must not exceed 254 characters"),
  ),

  phoneNumber2: requiredIfAny(
    2,
    Yup.string()
      .matches(phoneRegExp, "Please enter a valid phone number")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits"),
  ),

  landline2: Yup.string()
    .matches(/^[\d\s\-\+\(\)]+$/, "Please enter a valid landline number")
    .max(20, "Landline number must not exceed 20 characters"),

  recName3: requiredIfAny(
    3,
    Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters")
      .matches(
        /^[a-zA-Z\s.'-]+$/,
        "Name can only contain letters, spaces, dots, apostrophes, and hyphens",
      ),
  ),

  designation3: requiredIfAny(
    3,
    Yup.string()
      .min(2, "Designation must be at least 2 characters")
      .max(100, "Designation must not exceed 100 characters"),
  ),

  email3: requiredIfAny(
    3,
    Yup.string()
      .email("Please enter a valid email address")
      .max(254, "Email must not exceed 254 characters"),
  ),

  phoneNumber3: requiredIfAny(
    3,
    Yup.string()
      .matches(phoneRegExp, "Please enter a valid phone number")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits"),
  ),

  landline3: Yup.string()
    .matches(/^[\d\s\-\+\(\)]+$/, "Please enter a valid landline number")
    .max(20, "Landline number must not exceed 20 characters"),
});

// Job Details validation
export const jobDetailsValidationSchema = Yup.object({
  // Core job information
  role: Yup.string()
    .required("Job title/role is required")
    .min(2, "Job title must be at least 2 characters")
    .max(200, "Job title must not exceed 200 characters")
    .matches(
      /^[a-zA-Z0-9\s\-\&\(\)\/\.]+$/,
      "Job title contains invalid characters",
    ),

  location: Yup.string()
    .required("Job location is required")
    .min(2, "Location must be at least 2 characters")
    .max(200, "Location must not exceed 200 characters"),

  duration: Yup.string()
    .max(100, "Duration must not exceed 100 characters")
    .matches(/^[a-zA-Z0-9\s\-\/]+$/, "Duration contains invalid characters"),

  description: Yup.string().max(
    5000,
    "Description must not exceed 5000 characters",
  ),

  offerLetterReleaseDate: Yup.date()
    .nullable()
    .transform((value) => {
      // Handle array inputs like ["null"] and convert them to null
      if (Array.isArray(value)) {
        return value[0] === "null" ||
          value[0] === null ||
          value[0] === undefined
          ? null
          : new Date(value[0]);
      }
      return value === "null" || value === "" ? null : value;
    })
    .min(new Date(), "Offer letter release date cannot be in the past"),

  joiningDate: Yup.date()
    .nullable()
    .transform((value) => {
      // Handle array inputs like ["null"] and convert them to null
      if (Array.isArray(value)) {
        return value[0] === "null" ||
          value[0] === null ||
          value[0] === undefined
          ? null
          : new Date(value[0]);
      }
      return value === "null" || value === "" ? null : value;
    })
    .min(new Date(), "Joining date cannot be in the past")
    .when("offerLetterReleaseDate", {
      is: (value: any) =>
        value && value instanceof Date && !isNaN(value.getTime()),
      then: (schema) =>
        schema.min(
          Yup.ref("offerLetterReleaseDate"),
          "Joining date must be after offer letter release date",
        ),
      otherwise: (schema) => schema,
    }),

  expectedNoOfHires: Yup.number()
    .nullable()
    .min(0, "Expected hires cannot be negative")
    .max(1000, "Expected hires seems unreasonably high")
    .integer("Expected hires must be a whole number"),

  minNoOfHires: Yup.number()
    .nullable()
    .min(0, "Minimum hires cannot be negative")
    .max(1000, "Minimum hires seems unreasonably high")
    .integer("Minimum hires must be a whole number")
    .when("expectedNoOfHires", {
      is: (value: any) => value != null && value > 0,
      then: (schema) =>
        schema.max(
          Yup.ref("expectedNoOfHires"),
          "Minimum hires cannot exceed expected hires",
        ),
      otherwise: (schema) => schema,
    }),

  skills: Yup.array()
    .of(
      Yup.string()
        .min(1, "Skill cannot be empty")
        .max(50, "Skill name too long"),
    )
    .max(20, "Maximum 20 skills allowed"),

  attachments: Yup.array()
    .of(Yup.mixed<File>())
    .max(5, "Maximum 5 attachments allowed"),

  others: Yup.string().max(
    1000,
    "Other details must not exceed 1000 characters",
  ),

  // Selection procedure
  selectionMode: Yup.string()
    .oneOf(
      Object.values(SelectionModeEnum),
      "Please select a valid selection mode",
    )
    .required("Selection mode is required"),

  shortlistFromResume: Yup.boolean().required(
    "Please specify if shortlisting from resume is required",
  ),

  groupDiscussion: Yup.boolean().required(
    "Please specify if group discussion is part of selection",
  ),

  tests: Yup.array()
    .of(
      Yup.object({
        type: Yup.string()
          .oneOf(
            Object.values(TestTypesEnum),
            "Please select a valid test type",
          )
          .required("Test type is required"),
        duration: Yup.string()
          .required("Test duration is required")
          .min(1, "Duration cannot be empty")
          .max(100, "Duration description too long")
          .matches(
            /^[a-zA-Z0-9\s\-\/]+$/,
            "Duration contains invalid characters",
          ),
      }),
    )
    .min(1, "At least one test must be specified")
    .max(10, "Maximum 10 tests allowed"),

  interviews: Yup.array()
    .of(
      Yup.object({
        type: Yup.string()
          .oneOf(
            Object.values(InterviewTypesEnum),
            "Please select a valid interview type",
          )
          .required("Interview type is required"),
        duration: Yup.string()
          .required("Interview duration is required")
          .min(1, "Duration cannot be empty")
          .max(100, "Duration description too long")
          .matches(
            /^[a-zA-Z0-9\s\-\/]+$/,
            "Duration contains invalid characters",
          ),
      }),
    )
    .min(1, "At least one interview round must be specified")
    .max(10, "Maximum 10 interview rounds allowed"),

  // Requirements (optional)
  numberOfMembers: Yup.number()
    .nullable()
    .min(0, "Number of members cannot be negative")
    .max(1000, "Number of members seems unreasonably high")
    .integer("Number of members must be a whole number"),

  numberOfRooms: Yup.number()
    .nullable()
    .min(0, "Number of rooms cannot be negative")
    .max(100, "Number of rooms seems unreasonably high")
    .integer("Number of rooms must be a whole number"),

  otherRequirements: Yup.string().max(
    1000,
    "Other requirements must not exceed 1000 characters",
  ),

  // Salary information
  salaries: Yup.array()
    .of(
      Yup.object({
        // Criteria
        programs: Yup.array()
          .of(Yup.string().uuid("Invalid program ID"))
          .min(1, "At least one program must be selected"),

        genders: Yup.array().of(
          Yup.string().oneOf(
            Object.values(GenderEnum),
            "Invalid gender selection",
          ),
        ),

        categories: Yup.array().of(
          Yup.string().oneOf(
            Object.values(CategoryEnum),
            "Invalid category selection",
          ),
        ),

        isBacklogAllowed: Yup.string()
          .oneOf(Object.values(BacklogEnum), "Please select backlog policy")
          .required("Backlog policy is required"),

        minCPI: Yup.number()
          .nullable()
          .min(0, "CPI cannot be negative")
          .max(10, "CPI cannot exceed 10"),

        tenthMarks: Yup.number()
          .nullable()
          .min(0, "Marks cannot be negative")
          .max(100, "Marks cannot exceed 100"),

        twelthMarks: Yup.number()
          .nullable()
          .min(0, "Marks cannot be negative")
          .max(100, "Marks cannot exceed 100"),

        // Placement salary fields
        baseSalary: Yup.number()
          .nullable()
          .min(0, "Salary cannot be negative")
          .max(10000000, "Salary seems unreasonably high"),

        totalCTC: Yup.number()
          .nullable()
          .min(0, "CTC cannot be negative")
          .max(10000000, "CTC seems unreasonably high"),

        takeHomeSalary: Yup.number()
          .nullable()
          .min(0, "Take home salary cannot be negative")
          .max(10000000, "Take home salary seems unreasonably high"),

        grossSalary: Yup.number()
          .nullable()
          .min(0, "Gross salary cannot be negative")
          .max(10000000, "Gross salary seems unreasonably high"),

        // Internship fields
        stipend: Yup.number()
          .nullable()
          .min(0, "Stipend cannot be negative")
          .max(1000000, "Stipend seems unreasonably high"),

        accommodation: Yup.boolean().nullable(),

        ppoProvisionOnPerformance: Yup.boolean().nullable(),

        tentativeCTC: Yup.number()
          .nullable()
          .min(0, "Tentative CTC cannot be negative")
          .max(10000000, "Tentative CTC seems unreasonably high"),

        PPOConfirmationDate: Yup.date()
          .nullable()
          .transform((value) => {
            // Handle array inputs like ["null"] and convert them to null
            if (Array.isArray(value)) {
              return value[0] === "null" ||
                value[0] === null ||
                value[0] === undefined
                ? null
                : new Date(value[0]);
            }
            return value === "null" || value === "" ? null : value;
          })
          .min(new Date(), "PPO confirmation date cannot be in the past"),

        // Other compensation fields
        joiningBonus: Yup.number()
          .nullable()
          .min(0, "Joining bonus cannot be negative"),

        performanceBonus: Yup.number()
          .nullable()
          .min(0, "Performance bonus cannot be negative"),

        relocation: Yup.number()
          .nullable()
          .min(0, "Relocation allowance cannot be negative"),

        bondAmount: Yup.number()
          .nullable()
          .min(0, "Bond amount cannot be negative"),

        esopAmount: Yup.number()
          .nullable()
          .min(0, "ESOP amount cannot be negative"),

        esopVestPeriod: Yup.string().max(
          100,
          "ESOP vest period description too long",
        ),

        firstYearCTC: Yup.number()
          .nullable()
          .min(0, "First year CTC cannot be negative"),

        retentionBonus: Yup.number()
          .nullable()
          .min(0, "Retention bonus cannot be negative"),

        deductions: Yup.number()
          .nullable()
          .min(0, "Deductions cannot be negative"),

        medicalAllowance: Yup.number()
          .nullable()
          .min(0, "Medical allowance cannot be negative"),

        bondDuration: Yup.string().max(
          100,
          "Bond duration description too long",
        ),

        foreignCurrencyCTC: Yup.number()
          .nullable()
          .min(0, "Foreign currency CTC cannot be negative"),

        foreignCurrencyCode: Yup.string()
          .max(10, "Currency code too long")
          .matches(/^[A-Z]{3}$/, "Currency code must be 3 uppercase letters"),

        otherCompensations: Yup.number()
          .nullable()
          .min(0, "Other compensations cannot be negative"),

        salaryPeriod: Yup.string().max(
          50,
          "Salary period description too long",
        ),

        others: Yup.string().max(
          1000,
          "Other details must not exceed 1000 characters",
        ),
      }),
    )
    .min(1, "At least one salary entry is required")
    .max(10, "Maximum 10 salary entries allowed"),

  jobOthers: Yup.string().max(
    1000,
    "Job other details must not exceed 1000 characters",
  ),
});

// Combined validation schema
export const jafValidationSchema = {
  seasonDetails: seasonDetailsValidationSchema,
  recruiterDetails: recruiterDetailsValidationSchema,
  jobDetails: jobDetailsValidationSchema,
};
