export interface ValidationErrors {
  [key: string]: string;
}

export interface PersonalInfo {
  name: string;
  email: string;
  contact: string;
  designation: string;
  landline: string;
}

export interface CompanyInfo {
  companyId: string;
  companyName: string;
  category: string;
  website: string;
  yearOfEstablishment: string;
  companySize: string;
  annualTurnover: string;
  socialMediaLink: string;
  domains: string[];
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
  };
}

export type CompanyStringFields =
  | "companyId"
  | "companyName"
  | "category"
  | "website"
  | "yearOfEstablishment"
  | "companySize"
  | "annualTurnover"
  | "socialMediaLink";
