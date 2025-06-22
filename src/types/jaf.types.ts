// TypeScript interfaces matching the backend DTO structure exactly

export enum CategoryEnum {
  GENERAL = "GENERAL",
  SC = "SC",
  ST = "ST",
  OBC = "OBC",
  PWD = "PWD"
}

export enum CompanyCategoryEnum {
  GOVERNMENT = "GOVERNMENT",
  PRIVATE = "PRIVATE",
  PSU = "PSU",
  MNC = "MNC",
  STARTUP = "STARTUP",
  NGO = "NGO"
}

export enum DepartmentEnum {
  CSE = "CSE",
  ECE = "ECE",
  EEE = "EEE",
  MECH = "MECH",
  CIVIL = "CIVIL",
  CHEM = "CHEM",
  MME = "MME",
  PIE = "PIE",
  BT = "BT"
}

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}

export enum SeasonTypeEnum {
  PLACEMENT = "PLACEMENT",
  INTERNSHIP = "INTERNSHIP"
}

export enum CountriesEnum {
  INDIA = "INDIA",
  USA = "USA",
  UK = "UK",
  CANADA = "CANADA",
  AUSTRALIA = "AUSTRALIA",
  GERMANY = "GERMANY",
  SINGAPORE = "SINGAPORE",
  JAPAN = "JAPAN",
  SOUTH_KOREA = "SOUTH_KOREA",
  CHINA = "CHINA",
  FRANCE = "FRANCE",
  NETHERLANDS = "NETHERLANDS",
  SWITZERLAND = "SWITZERLAND",
  SWEDEN = "SWEDEN",
  OTHER = "OTHER"
}

export enum IndustryDomainEnum {
  SOFTWARE = "SOFTWARE",
  HARDWARE = "HARDWARE",
  FINANCE = "FINANCE",
  CONSULTING = "CONSULTING",
  ANALYTICS = "ANALYTICS",
  CORE = "CORE",
  RESEARCH = "RESEARCH",
  GOVERNMENT = "GOVERNMENT",
  PSU = "PSU",
  STARTUP = "STARTUP",
  OTHER = "OTHER"
}

export enum InterviewTypesEnum {
  TECHNICAL = "TECHNICAL",
  HR = "HR",
  CASE_STUDY = "CASE_STUDY",
  GROUP_DISCUSSION = "GROUP_DISCUSSION",
  PRESENTATION = "PRESENTATION",
  CODING = "CODING",
  OTHER = "OTHER"
}

export enum SelectionModeEnum {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  HYBRID = "HYBRID"
}

export enum TestTypesEnum {
  APTITUDE = "APTITUDE",
  TECHNICAL = "TECHNICAL",
  CODING = "CODING",
  DOMAIN = "DOMAIN",
  PSYCHOLOGICAL = "PSYCHOLOGICAL",
  OTHER = "OTHER"
}

export enum BacklogEnum {
  ACTIVE = "ACTIVE",
  PREVIOUS = "PREVIOUS", 
  NEVER = "NEVER"
}

export interface AddressDto {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: CountriesEnum;
}

export interface CompanyFilledDto {
  name: string;
  category: CompanyCategoryEnum;
  yearOfEstablishment: string;
  website?: string;
  size?: number;
  annualTurnover?: string;
  socialMediaLink?: string;
  domains: IndustryDomainEnum[];
  address: AddressDto;
}

export interface RecruiterFilledDto {
  name: string;
  email: string;
  contact: string;
  designation: string;
  landline?: string;
}

export interface RequirementsDto {
  numberOfMembers?: number;
  numberOfRooms?: number;
  otherRequirements?: string;
}

export interface TestDto {
  type: TestTypesEnum;
  duration: string;
}

export interface InterviewDto {
  type: InterviewTypesEnum;
  duration: string;
}

export interface SelectionProcedureDto {
  selectionMode: SelectionModeEnum;
  shortlistFromResume: boolean;
  groupDiscussion: boolean;
  tests: TestDto[];
  interviews: InterviewDto[];
  requirements?: RequirementsDto;
  others?: string;
}

export interface SalaryDto {
  genders?: GenderEnum[];
  programs?: string[];
  categories?: CategoryEnum[];
  isBacklogAllowed?: BacklogEnum;
  minCPI?: number;
  tenthMarks?: number;
  twelthMarks?: number;

  // PLACEMENT
  baseSalary?: number;
  totalCTC?: number;
  takeHomeSalary?: number;
  grossSalary?: number;
  joiningBonus?: number;
  performanceBonus?: number;
  relocation?: number;
  bondAmount?: number;
  esopAmount?: number;
  esopVestPeriod?: string;
  firstYearCTC?: number;
  retentionBonus?: number;
  deductions?: number;
  medicalAllowance?: number;
  bondDuration?: string;
  foreignCurrencyCTC?: number;
  foreignCurrencyCode?: string;
  otherCompensations?: number;
  salaryPeriod?: string;
  others?: string;

  // INTERNSHIP
  stipend?: number;
  foreignCurrencyStipend?: string;
  accommodation?: number;
  tentativeCTC?: number;
  PPOConfirmationDate?: Date;
}

export interface JobDto {
  seasonId: string;
  companyId?: string;
  recruiterId?: string;
  role: string;
  others?: string;
  recruiterDetailsFilled: RecruiterFilledDto[];
  selectionProcedure: SelectionProcedureDto;
  description?: string;
  attachments?: string[];
  skills?: string[];
  location: string;
  minNoOfHires?: number;
  expectedNoOfHires?: number;
  offerLetterReleaseDate?: Date;
  joiningDate?: Date;
  duration?: string;
}

export interface JafDto {
  job: JobDto;
  salaries: SalaryDto[];
}

export interface SeasonsDto {
  id: string;
  type: string;
  year: string;
}

export interface ProgramsDto {
  id: string;
  branch: string;
  course: string;
  year: string;
  department: string;
}

export interface GetJafValuesDto {
  seasons: SeasonsDto[];
  programs: ProgramsDto[];
  genders: GenderEnum[];
  categories: CategoryEnum[];
  testTypes: TestTypesEnum[];
  domains: IndustryDomainEnum[];
  interviewTypes: InterviewTypesEnum[];
  countries: CountriesEnum[];
}

// Form interfaces for frontend state management
export interface JAFFormValues {
  // Season Details
  seasonId: string;
  terms: boolean;
  
  // Recruiter Details
  recName1: string;
  designation1: string;
  email1: string;
  phoneNumber1: string;
  landline1: string;
  recName2: string;
  designation2: string;
  email2: string;
  phoneNumber2: string;
  landline2: string;
  recName3: string;
  designation3: string;
  email3: string;
  phoneNumber3: string;
  landline3: string;
  
  // Job Details
  role: string;
  description: string;
  attachments: File[];
  skills: string[];
  location: string;
  minNoOfHires: number;
  expectedNoOfHires: number;
  offerLetterReleaseDate: Date | null;
  joiningDate: Date | null;
  duration: string;
  selectionMode: SelectionModeEnum;
  shortlistFromResume: boolean;
  groupDiscussion: boolean;
  tests: TestDto[];
  interviews: InterviewDto[];
  others: string;
  numberOfMembers: number;
  numberOfRooms: number;
  otherRequirements: string;
  salaries: SalaryDto[];
  jobOthers: string;
} 