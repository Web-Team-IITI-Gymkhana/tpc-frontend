// JAF Form Constants and Placeholders

// Validation patterns
export const VALIDATION_PATTERNS = {
  PHONE: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  LANDLINE: /^[\d\s\-\+\(\)]+$/,
  NAME: /^[a-zA-Z\s.'-]+$/,
  JOB_TITLE: /^[a-zA-Z0-9\s\-\&\(\)\/\.]+$/,
  DURATION: /^[a-zA-Z0-9\s\-\/]+$/,
  CURRENCY_CODE: /^[A-Z]{3}$/,
};

// Enum values for dropdowns
export const SELECTION_MODE_OPTIONS = [
  { value: "ONLINE", label: "Online" },
  { value: "OFFLINE", label: "Offline" },
  { value: "HYBRID", label: "Hybrid" },
];

export const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

export const CATEGORY_OPTIONS = [
  { value: "GENERAL", label: "General" },
  { value: "SC", label: "SC" },
  { value: "ST", label: "ST" },
  { value: "OBC", label: "OBC" },
  { value: "PWD", label: "PWD" },
];

export const BACKLOG_OPTIONS = [
  { value: "ACTIVE", label: "Backlogs Not a Concern" },
  { value: "PREVIOUS", label: "No Active Backlogs" },
  { value: "NEVER", label: "No Backlogs Ever" },
];

// Placeholder texts
export const PLACEHOLDERS = {
  // Recruiter Details
  RECRUITER_NAME: "John Smith",
  RECRUITER_DESIGNATION: "HR Manager",
  RECRUITER_EMAIL: "john.smith@company.com",
  RECRUITER_PHONE: "9876543210",
  RECRUITER_LANDLINE: "011-12345678",

  // Job Details
  JOB_TITLE: "Enter job role (e.g., Software Developer, Data Analyst)",
  JOB_LOCATION: "Enter work location (e.g., Bangalore, Remote, Hybrid)",
  JOB_DURATION: "Enter duration (e.g., 6 months, 2 years, Permanent)",
  JOB_DESCRIPTION: "Provide detailed job description, responsibilities, and requirements...",
  EXPECTED_HIRES: "Enter expected number of candidates to hire",
  MIN_HIRES: "Enter minimum number of candidates to hire",
  SKILLS: "Type skill and press Enter to add (e.g., JavaScript, Python, SQL)",
  OTHER_DETAILS: "Add any additional information about the role...",

  // Selection Procedure
  TEST_DURATION: "60 minutes",
  INTERVIEW_DURATION: "30 minutes",
  REQUIREMENTS_MEMBERS: "5",
  REQUIREMENTS_ROOMS: "3",
  OTHER_REQUIREMENTS: "Specify any additional requirements...",

  // Salary Details
  MIN_CPI: "6",
  TENTH_MARKS: "75",
  TWELFTH_MARKS: "75",
  
  // Placement Salary
  BASE_SALARY: "800000",
  TOTAL_CTC: "1200000",
  TAKE_HOME_SALARY: "65000",
  GROSS_SALARY: "900000",
  JOINING_BONUS: "100000",
  PERFORMANCE_BONUS: "150000",
  RELOCATION: "50000",
  BOND_AMOUNT: "200000",
  BOND_DURATION: "2 years",
  ESOP_AMOUNT: "500000",
  ESOP_VEST_PERIOD: "4 years",
  FIRST_YEAR_CTC: "1300000",
  RETENTION_BONUS: "100000",
  DEDUCTIONS: "50000",
  MEDICAL_ALLOWANCE: "25000",
  FOREIGN_CURRENCY_CTC: "50000",
  FOREIGN_CURRENCY_CODE: "USD",
  OTHER_COMPENSATIONS: "75000",
  SALARY_PERIOD: "Annual",
  SALARY_OTHERS: "Additional compensation details...",

  // Internship Salary
  STIPEND: "25000",
  FOREIGN_STIPEND: "1500",
  ACCOMMODATION: "15000",
  TENTATIVE_CTC: "800000", 
  PPO_DATE: "",

  // Other
  OTHER_COMPENSATIONS_DESC: "Describe any other benefits, allowances, or compensations...",
};

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid phone number",
  INVALID_NAME: "Name can only contain letters, spaces, dots, apostrophes, and hyphens",
  INVALID_CURRENCY: "Currency code must be 3 uppercase letters",
  NEGATIVE_NUMBER: "Value cannot be negative",
  INVALID_PERCENTAGE: "Percentage must be between 0 and 100",
  INVALID_CPI: "CPI must be between 0 and 10",
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must not exceed ${max} characters`,
  MIN_VALUE: (min: number) => `Value must be at least ${min}`,
  MAX_VALUE: (max: number) => `Value must not exceed ${max}`,
  FUTURE_DATE: "Date cannot be in the past",
  DATE_ORDER: "End date must be after start date",
  MIN_HIRES_EXCEEDED: "Minimum hires cannot exceed expected hires",
  CONDITIONAL_REQUIRED: "This field is required when any contact info is provided",
};

// Form field limits
export const FIELD_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 254,
  PHONE_MIN: 10,
  PHONE_MAX: 15,
  LANDLINE_MAX: 20,
  JOB_TITLE_MIN: 2,
  JOB_TITLE_MAX: 200,
  LOCATION_MIN: 2,
  LOCATION_MAX: 200,
  DURATION_MAX: 100,
  DESCRIPTION_MAX: 5000,
  SKILLS_MAX: 20,
  SKILL_NAME_MAX: 50,
  ATTACHMENTS_MAX: 5,
  TESTS_MAX: 10,
  INTERVIEWS_MAX: 10,
  SALARY_ENTRIES_MAX: 10,
  MEMBERS_MAX: 1000,
  ROOMS_MAX: 100,
  HIRES_MAX: 1000,
  SALARY_MAX: 10000000,
  STIPEND_MAX: 1000000,
  CPI_MAX: 10,
  PERCENTAGE_MAX: 100,
  CURRENCY_CODE_LENGTH: 3,
  OTHER_DETAILS_MAX: 1000,
  SALARY_PERIOD_MAX: 50,
  ESOP_VEST_MAX: 100,
  BOND_DURATION_MAX: 100,
};

// Helper functions
export const formatCurrency = (amount: number, currency: string = "INR"): string => {
  const currencySymbols: { [key: string]: string } = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
  };
  
  const symbol = currencySymbols[currency] || currency;
  return `${symbol} ${amount.toLocaleString()}`;
};

export const validateFileSize = (file: File, maxSizeMB: number = 2): boolean => {
  return file.size / 1024 / 1024 <= maxSizeMB;
};

export const validateFileType = (file: File, allowedTypes: string[] = ["application/pdf"]): boolean => {
  return allowedTypes.includes(file.type);
};

export const generateErrorMessage = (field: string, error: string): string => {
  return `${field}: ${error}`;
};

// Default form values
export const DEFAULT_FORM_VALUES = {
  // Season Details
  seasonId: "",
  terms: false,

  // Recruiter Details (1-3 contacts)
  recName1: "",
  designation1: "",
  email1: "",
  phoneNumber1: "",
  landline1: "",
  recName2: "",
  designation2: "",
  email2: "",
  phoneNumber2: "",
  landline2: "",
  recName3: "",
  designation3: "",
  email3: "",
  phoneNumber3: "",
  landline3: "",

  // Job Details
  role: "",
  description: "",
  attachments: [],
  skills: [],
  location: "",
  minNoOfHires: "",
  expectedNoOfHires: "",
  offerLetterReleaseDate: null,
  joiningDate: null,
  duration: "",
  selectionMode: "",
  shortlistFromResume: false,
  groupDiscussion: false,
  tests: [],
  interviews: [],
  others: "",
  numberOfMembers: "",
  numberOfRooms: "",
  otherRequirements: "",
  salaries: [],
  jobOthers: "",
};

// API endpoints
export const API_ENDPOINTS = {
  JAF_VALUES: "/api/v1/jaf",
  SUBMIT_JAF: "/api/v1/recruiter-view/jaf",
};

export default {
  VALIDATION_PATTERNS,
  SELECTION_MODE_OPTIONS,
  GENDER_OPTIONS,
  CATEGORY_OPTIONS,
  BACKLOG_OPTIONS,
  PLACEHOLDERS,
  VALIDATION_MESSAGES,
  FIELD_LIMITS,
  DEFAULT_FORM_VALUES,
  API_ENDPOINTS,
  formatCurrency,
  validateFileSize,
  validateFileType,
  generateErrorMessage,
}; 