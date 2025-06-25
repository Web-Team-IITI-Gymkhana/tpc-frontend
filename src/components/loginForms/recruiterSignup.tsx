"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  getCompanies,
  postCompany,
  signupRecruiter,
} from "@/helpers/recruiter/signup";
import { getJafDetails } from "@/helpers/recruiter/api";
import toast from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import { CompanyPostFC, JAFdetailsFC } from "@/helpers/recruiter/types";
import { MultiSelect } from "../ui/multiselect";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { validateCaptcha } from "@/helpers/api";
import { Combobox } from "../ui/combobox";
import { handleApiError } from "@/utils/errorHandling";
import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Users,
  DollarSign,
  Check,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Building2 } from "lucide-react";

// Validation patterns (consistent with existing codebase)
const VALIDATION_PATTERNS = {
  PHONE: /^(\+?\d{1,4}[\s-]?)?(\(?\d{2,5}\)?[\s-]?)?[\d\s-]{6,}$/,
  LANDLINE: /^[\d\s\-\+\(\)]+$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME: /^[a-zA-Z\s.'-]+$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i,
};

// Field limits
const FIELD_LIMITS = {
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

// Validation error messages
const VALIDATION_MESSAGES = {
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
};

interface ValidationErrors {
  [key: string]: string;
}

export default function RecruiterSignup() {
  const [companies, setCompanies] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [createCompany, setCreateCompany] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [jaf, setJaf] = useState<JAFdetailsFC | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  // Validation states
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    contact: "",
    designation: "",
    landline: "",
  });

  // Company Information
  const [companyInfo, setCompanyInfo] = useState({
    companyId: "",
    companyName: "",
    category: "",
    website: "",
    yearOfEstablishment: "",
    companySize: "",
    annualTurnover: "",
    socialMediaLink: "",
    domains: [] as string[],
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
    },
  });

  type CompanyStringFields =
    | "companyId"
    | "companyName"
    | "category"
    | "website"
    | "yearOfEstablishment"
    | "companySize"
    | "annualTurnover"
    | "socialMediaLink";

  useEffect(() => {
    const loadData = async () => {
      try {
        const [companiesData, jafData] = await Promise.all([
          getCompanies(),
          getJafDetails(),
        ]);

        // Ensure companies is always an array
        setCompanies(Array.isArray(companiesData) ? companiesData : []);
        setJaf(jafData);
      } catch (error) {
        console.error("Failed to load form data:", error);
        toast.error("Failed to load form data. Please refresh the page.");
        // Set fallback values
        setCompanies([]);
        setJaf(null);
      }
    };
    loadData();
  }, []);

  // Real-time validation functions
  const validateField = (field: string, value: string): string => {
    if (!value.trim() && isRequiredField(field)) {
      return VALIDATION_MESSAGES.REQUIRED;
    }

    if (!value.trim()) return ""; // Optional fields that are empty are valid

    switch (field) {
      case "name":
        if (value.length < FIELD_LIMITS.NAME_MIN)
          return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.NAME_MIN);
        if (value.length > FIELD_LIMITS.NAME_MAX)
          return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.NAME_MAX);
        if (!VALIDATION_PATTERNS.NAME.test(value))
          return VALIDATION_MESSAGES.INVALID_NAME;
        break;

      case "email":
        if (value.length > FIELD_LIMITS.EMAIL_MAX)
          return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.EMAIL_MAX);
        if (!VALIDATION_PATTERNS.EMAIL.test(value))
          return VALIDATION_MESSAGES.INVALID_EMAIL;
        break;

      case "contact":
        const contactDigits = value.replace(/\D/g, "");
        if (contactDigits.length < FIELD_LIMITS.PHONE_MIN)
          return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.PHONE_MIN);
        if (contactDigits.length > FIELD_LIMITS.PHONE_MAX)
          return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.PHONE_MAX);
        if (!VALIDATION_PATTERNS.PHONE.test(value))
          return VALIDATION_MESSAGES.INVALID_PHONE;
        break;

      case "landline":
        if (value && !VALIDATION_PATTERNS.LANDLINE.test(value))
          return VALIDATION_MESSAGES.INVALID_LANDLINE;
        if (value.length > FIELD_LIMITS.LANDLINE_MAX)
          return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.LANDLINE_MAX);
        break;

      case "designation":
        if (value.length < FIELD_LIMITS.DESIGNATION_MIN)
          return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.DESIGNATION_MIN);
        if (value.length > FIELD_LIMITS.DESIGNATION_MAX)
          return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.DESIGNATION_MAX);
        break;

      case "companyName":
        if (value.length < FIELD_LIMITS.COMPANY_NAME_MIN)
          return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.COMPANY_NAME_MIN);
        if (value.length > FIELD_LIMITS.COMPANY_NAME_MAX)
          return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.COMPANY_NAME_MAX);
        break;

      case "website":
      case "socialMediaLink":
        if (value && !VALIDATION_PATTERNS.URL.test(value))
          return VALIDATION_MESSAGES.INVALID_URL;
        break;

      case "yearOfEstablishment":
        const year = parseInt(value);
        if (
          isNaN(year) ||
          year < FIELD_LIMITS.YEAR_MIN ||
          year > FIELD_LIMITS.YEAR_MAX
        ) {
          return VALIDATION_MESSAGES.INVALID_YEAR;
        }
        break;

      case "companySize":
        const size = parseInt(value);
        if (isNaN(size) || size < 1 || size > FIELD_LIMITS.SIZE_MAX) {
          return VALIDATION_MESSAGES.INVALID_SIZE;
        }
        break;

      case "line1":
        if (value.length < FIELD_LIMITS.ADDRESS_MIN)
          return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.ADDRESS_MIN);
        if (value.length > FIELD_LIMITS.ADDRESS_MAX)
          return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.ADDRESS_MAX);
        break;

      case "city":
        if (value.length < FIELD_LIMITS.CITY_MIN)
          return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.CITY_MIN);
        if (value.length > FIELD_LIMITS.CITY_MAX)
          return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.CITY_MAX);
        break;

      case "state":
        if (value.length < FIELD_LIMITS.STATE_MIN)
          return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.STATE_MIN);
        if (value.length > FIELD_LIMITS.STATE_MAX)
          return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.STATE_MAX);
        break;
    }

    return "";
  };

  const isRequiredField = (field: string): boolean => {
    const requiredPersonalFields = ["name", "email", "contact", "designation"];
    const requiredCompanyFields = createCompany
      ? ["companyName", "category", "line1", "city", "state", "country"]
      : ["companyId"];

    return (
      requiredPersonalFields.includes(field) ||
      requiredCompanyFields.includes(field)
    );
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));

    // Real-time validation
    const error = validateField(field, value);
    setValidationErrors((prev) => ({ ...prev, [field]: error }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo((prev) => {
      const updated = { ...prev };
      (updated as any)[field] = value;
      return updated;
    });

    // Real-time validation
    const error = validateField(field, value);
    setValidationErrors((prev) => ({ ...prev, [field]: error }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleDomainsChange = (value: string[]) => {
    setCompanyInfo((prev) => ({ ...prev, domains: value }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setCompanyInfo((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));

    // Real-time validation
    const error = validateField(field, value);
    setValidationErrors((prev) => ({ ...prev, [field]: error }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateAllFields = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    // Validate personal info
    Object.entries(personalInfo).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        errors[key] = error;
        isValid = false;
      }
    });

    // Validate company info
    if (createCompany) {
      // Validate string fields only
      const stringFields: (keyof typeof companyInfo)[] = [
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
        const error = validateField(key, value);
        if (error) {
          errors[key] = error;
          isValid = false;
        }
      });

      // Validate address fields
      Object.entries(companyInfo.address).forEach(([key, value]) => {
        const error = validateField(key, value);
        if (error) {
          errors[key] = error;
          isValid = false;
        }
      });
    } else {
      // Validate company selection
      if (!companyInfo.companyId) {
        errors.companyId = VALIDATION_MESSAGES.REQUIRED;
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!captchaToken) {
      toast.error("Please complete the captcha verification");
      return;
    }

    if (!validateAllFields()) {
      toast.error("Please fix all validation errors before submitting");
      return;
    }

    setSubmitting(true);

    try {
      // Verify captcha
      const captchaRes = await validateCaptcha(captchaToken);
      if (!captchaRes) {
        toast.error("Captcha verification failed. Please try again.");
        captchaRef.current?.reset();
        setCaptchaToken("");
        return;
      }

      let finalCompanyId = companyInfo.companyId;

      // Create new company if needed
      if (createCompany) {
        const companyData: CompanyPostFC = {
          name: companyInfo.companyName.trim(),
          category: companyInfo.category,
          website: companyInfo.website.trim() || undefined,
          yearOfEstablishment: companyInfo.yearOfEstablishment,
          size: companyInfo.companySize
            ? Number(companyInfo.companySize)
            : undefined,
          annualTurnover: companyInfo.annualTurnover.trim() || undefined,
          socialMediaLink: companyInfo.socialMediaLink.trim() || undefined,
          domains: companyInfo.domains,
          address: {
            line1: companyInfo.address.line1.trim(),
            line2: companyInfo.address.line2.trim() || undefined,
            city: companyInfo.address.city.trim(),
            state: companyInfo.address.state.trim(),
            country: companyInfo.address.country,
          },
        };

        const newCompany = await postCompany(companyData);
        finalCompanyId = newCompany[0];
        toast.success("Company created successfully!");
      }

      // Create recruiter
      const recruiterData = {
        user: {
          name: personalInfo.name.trim(),
          email: personalInfo.email.trim().toLowerCase(),
          contact: personalInfo.contact.trim(),
        },
        companyId: finalCompanyId,
        designation: personalInfo.designation.trim(),
        landline: personalInfo.landline.trim() || undefined,
      };

      const signupRes = await signupRecruiter(recruiterData);

      if (signupRes.success) {
        toast.success(
          "Registration successful! Please check your email for verification.",
        );

        // Reset form
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

        // Redirect after brief delay
        setTimeout(() => {
          router.push("/recruiter/signin");
        }, 2000);
      } else {
        toast.error(
          signupRes.message || "Registration failed. Please try again.",
        );
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      handleApiError(error, "Registration failed. Please try again.");
    } finally {
      captchaRef.current?.reset();
      setCaptchaToken("");
      setSubmitting(false);
    }
  };

  const getFieldError = (field: string): string => {
    return touched[field] ? validationErrors[field] || "" : "";
  };

  const isFieldInvalid = (field: string): boolean => {
    return touched[field] && !!validationErrors[field];
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-slate-100 rounded-full">
              <Building2 className="h-8 w-8 text-slate-700" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Recruiter Registration
          </h2>
          <p className="text-gray-600">Join our network of top recruiters</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Step 1: Personal Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white rounded-full text-sm font-medium">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Enter your full name"
                  value={personalInfo.name}
                  onChange={(e) =>
                    handlePersonalInfoChange("name", e.target.value)
                  }
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  className={`pl-10 h-11 ${isFieldInvalid("name") ? "border-red-500 focus:border-red-500" : ""}`}
                  maxLength={FIELD_LIMITS.NAME_MAX}
                />
              </div>
              {getFieldError("name") && (
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <AlertCircle className="h-3 w-3" />
                  {getFieldError("name")}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="recruiter@company.com"
                  value={personalInfo.email}
                  onChange={(e) =>
                    handlePersonalInfoChange("email", e.target.value)
                  }
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, email: true }))
                  }
                  className={`pl-10 h-11 ${isFieldInvalid("email") ? "border-red-500 focus:border-red-500" : ""}`}
                  maxLength={FIELD_LIMITS.EMAIL_MAX}
                />
              </div>
              {getFieldError("email") && (
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <AlertCircle className="h-3 w-3" />
                  {getFieldError("email")}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Contact Number *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={personalInfo.contact}
                  onChange={(e) =>
                    handlePersonalInfoChange("contact", e.target.value)
                  }
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, contact: true }))
                  }
                  className={`pl-10 h-11 ${isFieldInvalid("contact") ? "border-red-500 focus:border-red-500" : ""}`}
                  maxLength={FIELD_LIMITS.PHONE_MAX + 5} // Extra space for formatting
                />
              </div>
              {getFieldError("contact") && (
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <AlertCircle className="h-3 w-3" />
                  {getFieldError("contact")}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Designation *
              </Label>
              <Input
                placeholder="HR Manager, Talent Acquisition, etc."
                value={personalInfo.designation}
                onChange={(e) =>
                  handlePersonalInfoChange("designation", e.target.value)
                }
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, designation: true }))
                }
                className={`h-11 ${isFieldInvalid("designation") ? "border-red-500 focus:border-red-500" : ""}`}
                maxLength={FIELD_LIMITS.DESIGNATION_MAX}
              />
              {getFieldError("designation") && (
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <AlertCircle className="h-3 w-3" />
                  {getFieldError("designation")}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Landline (optional)
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="tel"
                placeholder="Office landline number"
                value={personalInfo.landline}
                onChange={(e) =>
                  handlePersonalInfoChange("landline", e.target.value)
                }
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, landline: true }))
                }
                className={`pl-10 h-11 ${isFieldInvalid("landline") ? "border-red-500 focus:border-red-500" : ""}`}
                maxLength={FIELD_LIMITS.LANDLINE_MAX}
              />
            </div>
            {getFieldError("landline") && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertCircle className="h-3 w-3" />
                {getFieldError("landline")}
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Step 2: Company Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white rounded-full text-sm font-medium">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Company Information
            </h3>
          </div>

          <div className="flex gap-4">
            <Button
              variant={!createCompany ? "default" : "outline"}
              onClick={() => {
                setCreateCompany(false);
                setValidationErrors({});
                setTouched({});
              }}
              className="flex-1"
              type="button"
            >
              Select Existing Company
            </Button>
            <Button
              variant={createCompany ? "default" : "outline"}
              onClick={() => {
                setCreateCompany(true);
                setValidationErrors({});
                setTouched({});
              }}
              className="flex-1"
              type="button"
            >
              Create New Company
            </Button>
          </div>

          {!createCompany ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Select Company *
                </Label>
                <Combobox
                  options={(companies || []).map(
                    (company: { id: string; name: string }) => ({
                      value: company.id,
                      label: company.name,
                    }),
                  )}
                  value={companyInfo.companyId}
                  onChange={(value) => {
                    handleCompanyInfoChange("companyId", value);
                    setTouched((prev) => ({ ...prev, companyId: true }));
                  }}
                  placeholder="Select company..."
                  searchPlaceholder="Search companies..."
                  emptyPlaceholder="No company found."
                />
                {getFieldError("companyId") && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("companyId")}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Company Name *
                  </Label>
                  <Input
                    placeholder="Enter company name"
                    value={companyInfo.companyName}
                    onChange={(e) =>
                      handleCompanyInfoChange("companyName", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, companyName: true }))
                    }
                    className={`h-11 ${isFieldInvalid("companyName") ? "border-red-500 focus:border-red-500" : ""}`}
                    maxLength={FIELD_LIMITS.COMPANY_NAME_MAX}
                  />
                  {getFieldError("companyName") && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("companyName")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Category *
                  </Label>
                  <Select
                    value={companyInfo.category}
                    onValueChange={(value) => {
                      handleCompanyInfoChange("category", value);
                      setTouched((prev) => ({ ...prev, category: true }));
                    }}
                  >
                    <SelectTrigger
                      className={`h-11 ${isFieldInvalid("category") ? "border-red-500 focus:border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select company category" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "PRIVATE",
                        "MNC",
                        "PSU/GOVERNMENT",
                        "STARTUP",
                        "OTHER",
                      ].map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {getFieldError("category") && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("category")}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Year of Establishment
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter year"
                    value={companyInfo.yearOfEstablishment}
                    onChange={(e) =>
                      handleCompanyInfoChange(
                        "yearOfEstablishment",
                        e.target.value,
                      )
                    }
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        yearOfEstablishment: true,
                      }))
                    }
                    className={`h-11 ${isFieldInvalid("yearOfEstablishment") ? "border-red-500 focus:border-red-500" : ""}`}
                    min={FIELD_LIMITS.YEAR_MIN}
                    max={FIELD_LIMITS.YEAR_MAX}
                  />
                  {getFieldError("yearOfEstablishment") && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("yearOfEstablishment")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Website
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="https://company.com"
                      value={companyInfo.website}
                      onChange={(e) =>
                        handleCompanyInfoChange("website", e.target.value)
                      }
                      onBlur={() =>
                        setTouched((prev) => ({ ...prev, website: true }))
                      }
                      className={`pl-10 h-11 ${isFieldInvalid("website") ? "border-red-500 focus:border-red-500" : ""}`}
                    />
                  </div>
                  {getFieldError("website") && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("website")}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Company Size
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="Number of employees"
                      value={companyInfo.companySize}
                      onChange={(e) =>
                        handleCompanyInfoChange("companySize", e.target.value)
                      }
                      onBlur={() =>
                        setTouched((prev) => ({ ...prev, companySize: true }))
                      }
                      className={`pl-10 h-11 ${isFieldInvalid("companySize") ? "border-red-500 focus:border-red-500" : ""}`}
                      min="1"
                      max={FIELD_LIMITS.SIZE_MAX}
                    />
                  </div>
                  {getFieldError("companySize") && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("companySize")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Annual Turnover
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="e.g., $10M"
                      value={companyInfo.annualTurnover}
                      onChange={(e) =>
                        handleCompanyInfoChange(
                          "annualTurnover",
                          e.target.value,
                        )
                      }
                      className="pl-10 h-11"
                      maxLength={FIELD_LIMITS.TURNOVER_MAX}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Social Media Link
                  </Label>
                  <Input
                    placeholder="LinkedIn or other profile"
                    value={companyInfo.socialMediaLink}
                    onChange={(e) =>
                      handleCompanyInfoChange("socialMediaLink", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, socialMediaLink: true }))
                    }
                    className={`h-11 ${isFieldInvalid("socialMediaLink") ? "border-red-500 focus:border-red-500" : ""}`}
                  />
                  {getFieldError("socialMediaLink") && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("socialMediaLink")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Domains
                  </Label>
                  <MultiSelect
                    givenOptions={jaf?.domains || []}
                    formData={companyInfo.domains}
                    setFormData={handleDomainsChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Address Line 1 *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="123 Main St"
                    value={companyInfo.address.line1}
                    onChange={(e) =>
                      handleAddressChange("line1", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, line1: true }))
                    }
                    className={`pl-10 h-11 ${isFieldInvalid("line1") ? "border-red-500 focus:border-red-500" : ""}`}
                    maxLength={FIELD_LIMITS.ADDRESS_MAX}
                  />
                </div>
                {getFieldError("line1") && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("line1")}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Address Line 2 (Optional)
                </Label>
                <Input
                  placeholder="Apartment, studio, or floor"
                  value={companyInfo.address.line2}
                  onChange={(e) => handleAddressChange("line2", e.target.value)}
                  className="h-11"
                  maxLength={FIELD_LIMITS.ADDRESS_MAX}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    City *
                  </Label>
                  <Input
                    placeholder="Enter city"
                    value={companyInfo.address.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, city: true }))
                    }
                    className={`h-11 ${isFieldInvalid("city") ? "border-red-500 focus:border-red-500" : ""}`}
                    maxLength={FIELD_LIMITS.CITY_MAX}
                  />
                  {getFieldError("city") && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("city")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    State *
                  </Label>
                  <Input
                    placeholder="Enter state"
                    value={companyInfo.address.state}
                    onChange={(e) =>
                      handleAddressChange("state", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, state: true }))
                    }
                    className={`h-11 ${isFieldInvalid("state") ? "border-red-500 focus:border-red-500" : ""}`}
                    maxLength={FIELD_LIMITS.STATE_MAX}
                  />
                  {getFieldError("state") && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("state")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Country *
                  </Label>
                  <Combobox
                    options={(jaf?.countries || []).map((country) => ({
                      value: country,
                      label: country,
                    }))}
                    value={companyInfo.address.country}
                    onChange={(value) => {
                      handleAddressChange("country", value);
                      setTouched((prev) => ({ ...prev, country: true }));
                    }}
                    placeholder="Select country..."
                    searchPlaceholder="Search countries..."
                    emptyPlaceholder="No country found."
                  />
                  {getFieldError("country") && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("country")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Step 3: Security Verification */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white rounded-full text-sm font-medium">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Security Verification
            </h3>
          </div>

          <div className="flex justify-start">
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={(token) => setCaptchaToken(token || "")}
              onExpired={() => setCaptchaToken("")}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          onClick={handleSubmit}
          disabled={loading || submitting || !captchaToken}
          className="flex-1 h-12 bg-slate-700 hover:bg-slate-800 text-white font-medium disabled:opacity-50"
          type="button"
        >
          {submitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing Registration...
            </div>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Complete Registration
            </>
          )}
        </Button>

        <Link href="/recruiter/signin/" className="flex-1">
          <Button
            variant="outline"
            className="w-full h-12 font-medium"
            type="button"
          >
            Already have an account? Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
