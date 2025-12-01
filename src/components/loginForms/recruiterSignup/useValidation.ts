import { useMemo } from "react";
import { RecruiterSignupValidator } from "./validator";
import { PersonalInfo, CompanyInfo, ValidationErrors } from "./types";

export const useRecruiterSignupValidation = (createCompany: boolean) => {
  const validator = useMemo(
    () => new RecruiterSignupValidator(createCompany),
    [createCompany]
  );

  const validateField = (field: string, value: string): string => {
    return validator.validateField(field, value);
  };

  const validateDomainsField = (domains: string[]): string => {
    return validator.validateDomainsField(domains);
  };

  const validateAllFields = (
    personalInfo: PersonalInfo,
    companyInfo: CompanyInfo
  ): { errors: ValidationErrors; touchedFields: Record<string, boolean>; isValid: boolean } => {
    return validator.validateAllFields(personalInfo, companyInfo);
  };

  return {
    validateField,
    validateDomainsField,
    validateAllFields,
  };
};
