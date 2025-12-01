import { useState, useCallback } from "react";
import { PersonalInfo, CompanyInfo, ValidationErrors } from "./types";
import { useRecruiterSignupValidation } from "./useValidation";

export const useFormState = (createCompany: boolean) => {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    email: "",
    contact: "",
    designation: "",
    landline: "",
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyId: "",
    companyName: "",
    category: "",
    website: "",
    yearOfEstablishment: "",
    companySize: "",
    annualTurnover: "",
    socialMediaLink: "",
    domains: [],
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const { validateField, validateDomainsField, validateAllFields } =
    useRecruiterSignupValidation(createCompany);

  const handlePersonalInfoChange = useCallback(
    (field: string, value: string) => {
      setPersonalInfo((prev) => ({ ...prev, [field]: value }));

      const error = validateField(field, value);
      setValidationErrors((prev) => ({ ...prev, [field]: error }));
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    [validateField]
  );

  const handleCompanyInfoChange = useCallback(
    (field: string, value: string) => {
      setCompanyInfo((prev) => {
        const updated = { ...prev };
        (updated as any)[field] = value;
        return updated;
      });

      const error = validateField(field, value);
      setValidationErrors((prev) => ({ ...prev, [field]: error }));
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    [validateField]
  );

  const handleDomainsChange = useCallback(
    (value: string[]) => {
      setCompanyInfo((prev) => ({ ...prev, domains: value }));

      const error = validateDomainsField(value);
      setValidationErrors((prev) => ({ ...prev, domains: error }));
      setTouched((prev) => ({ ...prev, domains: true }));
    },
    [validateDomainsField]
  );

  const handleAddressChange = useCallback(
    (field: string, value: string) => {
      setCompanyInfo((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));

      const error = validateField(field, value);
      setValidationErrors((prev) => ({ ...prev, [field]: error }));
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    [validateField]
  );

  const performValidation = useCallback((): boolean => {
    const { errors, touchedFields, isValid } = validateAllFields(
      personalInfo,
      companyInfo
    );
    setValidationErrors(errors);
    setTouched((prev) => ({ ...prev, ...touchedFields }));
    return isValid;
  }, [personalInfo, companyInfo, validateAllFields]);

  const getFieldError = useCallback(
    (field: string): string => {
      return touched[field] ? validationErrors[field] || "" : "";
    },
    [touched, validationErrors]
  );

  const isFieldInvalid = useCallback(
    (field: string): boolean => {
      return touched[field] && !!validationErrors[field];
    },
    [touched, validationErrors]
  );

  const resetForm = useCallback(() => {
    setPersonalInfo({
      name: "",
      email: "",
      contact: "",
      designation: "",
      landline: "",
    });
    setCompanyInfo({
      companyId: "",
      companyName: "",
      category: "",
      website: "",
      yearOfEstablishment: "",
      companySize: "",
      annualTurnover: "",
      socialMediaLink: "",
      domains: [],
      address: { line1: "", line2: "", city: "", state: "", country: "" },
    });
    setValidationErrors({});
    setTouched({});
  }, []);

  const resetValidation = useCallback(() => {
    setValidationErrors({});
    setTouched({});
  }, []);

  return {
    personalInfo,
    companyInfo,
    validationErrors,
    touched,
    handlePersonalInfoChange,
    handleCompanyInfoChange,
    handleDomainsChange,
    handleAddressChange,
    performValidation,
    getFieldError,
    isFieldInvalid,
    resetForm,
    resetValidation,
    setTouched,
  };
};
