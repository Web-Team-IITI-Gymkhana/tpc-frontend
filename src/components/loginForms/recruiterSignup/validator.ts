import { VALIDATION_PATTERNS, FIELD_LIMITS, VALIDATION_MESSAGES } from "./constants";
import { PersonalInfo, CompanyInfo, ValidationErrors } from "./types";

export class RecruiterSignupValidator {
  private createCompany: boolean;

  constructor(createCompany: boolean) {
    this.createCompany = createCompany;
  }

  validateField(field: string, value: string): string {
    if (!value.trim() && this.isRequiredField(field)) {
      return VALIDATION_MESSAGES.REQUIRED;
    }

    if (!value.trim()) return ""; // Optional fields that are empty are valid

    switch (field) {
      case "name":
        return this.validateName(value);
      case "email":
        return this.validateEmail(value);
      case "contact":
        return this.validateContact(value);
      case "landline":
        return this.validateLandline(value);
      case "designation":
        return this.validateDesignation(value);
      case "companyName":
        return this.validateCompanyName(value);
      case "website":
      case "socialMediaLink":
        return this.validateURL(value);
      case "yearOfEstablishment":
        return this.validateYear(value);
      case "companySize":
        return this.validateCompanySize(value);
      case "line1":
        return this.validateAddressLine(value);
      case "city":
        return this.validateCity(value);
      case "state":
        return this.validateState(value);
      default:
        return "";
    }
  }

  validateDomainsField(domains: string[]): string {
    if (this.createCompany && (!domains || domains.length === 0)) {
      return VALIDATION_MESSAGES.DOMAINS_REQUIRED;
    }
    return "";
  }

  validateAllFields(
    personalInfo: PersonalInfo,
    companyInfo: CompanyInfo
  ): { errors: ValidationErrors; touchedFields: Record<string, boolean>; isValid: boolean } {
    const errors: ValidationErrors = {};
    const touchedFields: Record<string, boolean> = {};
    let isValid = true;

    // Validate personal info
    Object.entries(personalInfo).forEach(([key, value]) => {
      const error = this.validateField(key, value);
      if (error) {
        errors[key] = error;
        touchedFields[key] = true;
        isValid = false;
      }
    });

    // Validate company info
    if (this.createCompany) {
      // Validate string fields only
      const stringFields: (keyof CompanyInfo)[] = [
        "companyName",
        "category",
        "website",
        "yearOfEstablishment",
        "companySize",
        "annualTurnover",
        "socialMediaLink",
      ];

      stringFields.forEach((key) => {
        const value = companyInfo[key] as string;
        const error = this.validateField(key, value);
        if (error) {
          errors[key] = error;
          touchedFields[key] = true;
          isValid = false;
        }
      });

      // Validate address fields
      Object.entries(companyInfo.address).forEach(([key, value]) => {
        const error = this.validateField(key, value);
        if (error) {
          errors[key] = error;
          touchedFields[key] = true;
          isValid = false;
        }
      });

      // Validate domains
      const domainsError = this.validateDomainsField(companyInfo.domains);
      if (domainsError) {
        errors.domains = domainsError;
        touchedFields.domains = true;
        isValid = false;
      }
    } else {
      // Validate company selection
      if (!companyInfo.companyId) {
        errors.companyId = VALIDATION_MESSAGES.REQUIRED;
        touchedFields.companyId = true;
        isValid = false;
      }
    }

    return { errors, touchedFields, isValid };
  }

  private validateName(value: string): string {
    if (value.length < FIELD_LIMITS.NAME_MIN) {
      return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.NAME_MIN);
    }
    if (value.length > FIELD_LIMITS.NAME_MAX) {
      return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.NAME_MAX);
    }
    if (!VALIDATION_PATTERNS.NAME.test(value)) {
      return VALIDATION_MESSAGES.INVALID_NAME;
    }
    return "";
  }

  private validateEmail(value: string): string {
    if (value.length > FIELD_LIMITS.EMAIL_MAX) {
      return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.EMAIL_MAX);
    }
    if (!VALIDATION_PATTERNS.EMAIL.test(value)) {
      return VALIDATION_MESSAGES.INVALID_EMAIL;
    }
    return "";
  }

  private validateContact(value: string): string {
    const contactDigits = value.replace(/\D/g, "");
    if (contactDigits.length < FIELD_LIMITS.PHONE_MIN) {
      return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.PHONE_MIN);
    }
    if (contactDigits.length > FIELD_LIMITS.PHONE_MAX) {
      return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.PHONE_MAX);
    }
    if (!VALIDATION_PATTERNS.PHONE.test(value)) {
      return VALIDATION_MESSAGES.INVALID_PHONE;
    }
    return "";
  }

  private validateLandline(value: string): string {
    if (value && !VALIDATION_PATTERNS.LANDLINE.test(value)) {
      return VALIDATION_MESSAGES.INVALID_LANDLINE;
    }
    if (value.length > FIELD_LIMITS.LANDLINE_MAX) {
      return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.LANDLINE_MAX);
    }
    return "";
  }

  private validateDesignation(value: string): string {
    if (value.length < FIELD_LIMITS.DESIGNATION_MIN) {
      return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.DESIGNATION_MIN);
    }
    if (value.length > FIELD_LIMITS.DESIGNATION_MAX) {
      return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.DESIGNATION_MAX);
    }
    return "";
  }

  private validateCompanyName(value: string): string {
    if (value.length < FIELD_LIMITS.COMPANY_NAME_MIN) {
      return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.COMPANY_NAME_MIN);
    }
    if (value.length > FIELD_LIMITS.COMPANY_NAME_MAX) {
      return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.COMPANY_NAME_MAX);
    }
    return "";
  }

  private validateURL(value: string): string {
    if (value && !VALIDATION_PATTERNS.URL.test(value)) {
      return VALIDATION_MESSAGES.INVALID_URL;
    }
    return "";
  }

  private validateYear(value: string): string {
    const year = parseInt(value);
    if (isNaN(year) || year < FIELD_LIMITS.YEAR_MIN || year > FIELD_LIMITS.YEAR_MAX) {
      return VALIDATION_MESSAGES.INVALID_YEAR;
    }
    return "";
  }

  private validateCompanySize(value: string): string {
    const size = parseInt(value);
    if (isNaN(size) || size < 1 || size > FIELD_LIMITS.SIZE_MAX) {
      return VALIDATION_MESSAGES.INVALID_SIZE;
    }
    return "";
  }

  private validateAddressLine(value: string): string {
    if (value.length < FIELD_LIMITS.ADDRESS_MIN) {
      return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.ADDRESS_MIN);
    }
    if (value.length > FIELD_LIMITS.ADDRESS_MAX) {
      return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.ADDRESS_MAX);
    }
    return "";
  }

  private validateCity(value: string): string {
    if (value.length < FIELD_LIMITS.CITY_MIN) {
      return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.CITY_MIN);
    }
    if (value.length > FIELD_LIMITS.CITY_MAX) {
      return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.CITY_MAX);
    }
    return "";
  }

  private validateState(value: string): string {
    if (value.length < FIELD_LIMITS.STATE_MIN) {
      return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.STATE_MIN);
    }
    if (value.length > FIELD_LIMITS.STATE_MAX) {
      return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.STATE_MAX);
    }
    return "";
  }

  private isRequiredField(field: string): boolean {
    const requiredPersonalFields = ["name", "email", "contact", "designation"];
    const requiredCompanyFields = this.createCompany
      ? ["companyName", "category", "line1", "city", "state", "country", "domains"]
      : ["companyId"];

    return (
      requiredPersonalFields.includes(field) ||
      requiredCompanyFields.includes(field)
    );
  }
}
