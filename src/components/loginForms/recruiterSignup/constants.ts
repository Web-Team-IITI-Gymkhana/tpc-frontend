export const VALIDATION_PATTERNS = {
  PHONE: /^(\+?\d{1,4}[\s-]?)?(\(?\d{2,5}\)?[\s-]?)?[\d\s-]{6,}$/,
  LANDLINE: /^[\d\s\-\+\(\)]+$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME: /^[a-zA-Z\s.'-]+$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i,
};

export const FIELD_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 254,
  PHONE_MIN: 10,
  PHONE_MAX: 15,
  LANDLINE_MAX: 20,
  DESIGNATION_MIN: 2,
  DESIGNATION_MAX: 100,
  COMPANY_NAME_MIN: 2,
  COMPANY_NAME_MAX: 200,
  ADDRESS_MIN: 5,
  ADDRESS_MAX: 200,
  CITY_MIN: 2,
  CITY_MAX: 100,
  STATE_MIN: 2,
  STATE_MAX: 100,
  YEAR_MIN: 1800,
  YEAR_MAX: new Date().getFullYear(),
  SIZE_MAX: 10000000,
  TURNOVER_MAX: 500,
};

export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid phone number (10-15 digits)",
  INVALID_LANDLINE: "Please enter a valid landline number",
  INVALID_NAME:
    "Name can only contain letters, spaces, dots, apostrophes, and hyphens",
  INVALID_URL: "Please enter a valid URL (e.g., https://example.com)",
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must not exceed ${max} characters`,
  MIN_VALUE: (min: number) => `Value must be at least ${min}`,
  MAX_VALUE: (max: number) => `Value must not exceed ${max}`,
  INVALID_YEAR: "Please enter a valid year",
  INVALID_SIZE: "Please enter a valid company size",
  DOMAINS_REQUIRED: "Please select at least one domain",
};
