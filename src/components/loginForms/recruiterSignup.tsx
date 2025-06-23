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

// Modern validation patterns for better UX
const VALIDATION_PATTERNS = {
  PHONE: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  LANDLINE: /^[\d\s\-\+\(\)]+$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME: /^[a-zA-Z\s.'-]+$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i,
};

// Field limits for better validation
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
};

// Modern validation messages
const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid phone number (10-15 digits)",
  INVALID_LANDLINE: "Please enter a valid landline number",
  INVALID_NAME: "Name can only contain letters, spaces, dots, apostrophes, and hyphens",
  INVALID_URL: "Please enter a valid URL (e.g., https://example.com)",
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must not exceed ${max} characters`,
  INVALID_YEAR: "Please enter a valid year",
  INVALID_SIZE: "Please enter a valid company size",
};

interface ValidationErrors {
  [key: string]: string;
}

export default function RecruiterSignup() {
  const [companies, setCompanies] = useState<Array<{id: string; name: string}>>([]);
  const [createCompany, setCreateCompany] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [jaf, setJaf] = useState<JAFdetailsFC | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  // Modern validation states for better UX
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Original form data structure (working)
  const [formData, setFormData] = useState({
    user: { name: "", email: "", contact: "" },
    companyId: "",
    designation: "",
    landline: "",
  });

  // Company form data for new company creation
  const [companyFormData, setCompanyFormData] = useState<CompanyPostFC>({
    name: "",
    category: "",
    yearOfEstablishment: "",
    website: "",
    size: 0,
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

  // Modern validation function for better UX
  const validateField = (field: string, value: string): string => {
    if (!value.trim() && isRequiredField(field)) {
      return VALIDATION_MESSAGES.REQUIRED;
    }

    if (!value.trim()) return ""; // Optional fields that are empty are valid

    switch (field) {
      case "name":
        if (value.length < FIELD_LIMITS.NAME_MIN) return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.NAME_MIN);
        if (value.length > FIELD_LIMITS.NAME_MAX) return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.NAME_MAX);
        if (!VALIDATION_PATTERNS.NAME.test(value)) return VALIDATION_MESSAGES.INVALID_NAME;
        break;

      case "email":
        if (value.length > FIELD_LIMITS.EMAIL_MAX) return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.EMAIL_MAX);
        if (!VALIDATION_PATTERNS.EMAIL.test(value)) return VALIDATION_MESSAGES.INVALID_EMAIL;
        break;

      case "contact":
        const contactDigits = value.replace(/\D/g, "");
        if (contactDigits.length < FIELD_LIMITS.PHONE_MIN) return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.PHONE_MIN);
        if (contactDigits.length > FIELD_LIMITS.PHONE_MAX) return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.PHONE_MAX);
        if (!VALIDATION_PATTERNS.PHONE.test(value)) return VALIDATION_MESSAGES.INVALID_PHONE;
        break;

      case "landline":
        if (value && !VALIDATION_PATTERNS.LANDLINE.test(value)) return VALIDATION_MESSAGES.INVALID_LANDLINE;
        if (value.length > FIELD_LIMITS.LANDLINE_MAX) return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.LANDLINE_MAX);
        break;

      case "designation":
        if (value.length < FIELD_LIMITS.DESIGNATION_MIN) return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.DESIGNATION_MIN);
        if (value.length > FIELD_LIMITS.DESIGNATION_MAX) return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.DESIGNATION_MAX);
        break;

      case "companyName":
        if (value.length < FIELD_LIMITS.COMPANY_NAME_MIN) return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.COMPANY_NAME_MIN);
        if (value.length > FIELD_LIMITS.COMPANY_NAME_MAX) return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.COMPANY_NAME_MAX);
        break;

      case "website":
      case "socialMediaLink":
        if (value && !VALIDATION_PATTERNS.URL.test(value)) return VALIDATION_MESSAGES.INVALID_URL;
        break;

      case "yearOfEstablishment":
        const year = parseInt(value);
        if (isNaN(year) || year < FIELD_LIMITS.YEAR_MIN || year > FIELD_LIMITS.YEAR_MAX) {
          return VALIDATION_MESSAGES.INVALID_YEAR;
        }
        break;

      case "line1":
        if (value.length < FIELD_LIMITS.ADDRESS_MIN) return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.ADDRESS_MIN);
        if (value.length > FIELD_LIMITS.ADDRESS_MAX) return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.ADDRESS_MAX);
        break;

      case "city":
        if (value.length < FIELD_LIMITS.CITY_MIN) return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.CITY_MIN);
        if (value.length > FIELD_LIMITS.CITY_MAX) return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.CITY_MAX);
        break;

      case "state":
        if (value.length < FIELD_LIMITS.STATE_MIN) return VALIDATION_MESSAGES.MIN_LENGTH(FIELD_LIMITS.STATE_MIN);
        if (value.length > FIELD_LIMITS.STATE_MAX) return VALIDATION_MESSAGES.MAX_LENGTH(FIELD_LIMITS.STATE_MAX);
        break;
    }

    return "";
  };

  const isRequiredField = (field: string): boolean => {
    const requiredPersonalFields = ["name", "email", "contact", "designation"];
    const requiredCompanyFields = createCompany 
      ? ["companyName", "category", "line1", "city", "state", "country"]
      : ["companyId"];
    
    return requiredPersonalFields.includes(field) || requiredCompanyFields.includes(field);
  };

  // Original input handlers (working) with modern validation
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      user: { ...prevFormData.user, [name]: value },
    }));
    
    // Real-time validation for better UX
    const error = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: error }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    
    // Real-time validation for better UX
    const error = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: error }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Company form handlers with modern validation
  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.currentTarget;
    setCompanyFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    
    // Real-time validation for better UX
    const fieldName = id === "name" ? "companyName" : id;
    const error = validateField(fieldName, value);
    setValidationErrors((prev) => ({ ...prev, [fieldName]: error }));
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.currentTarget;
    setCompanyFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [id]: value,
      },
    }));
    
    // Real-time validation for better UX
    const error = validateField(id, value);
    setValidationErrors((prev) => ({ ...prev, [id]: error }));
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  // Helper functions for modern validation display
  const getFieldError = (field: string): string => {
    return touched[field] ? validationErrors[field] || "" : "";
  };

  const isFieldInvalid = (field: string): boolean => {
    return touched[field] && !!validationErrors[field];
  };

  // Simplified submission with modern validation check
  const handleSubmit = async () => {
    if (!captchaToken) {
      return toast.error("Please complete the captcha");
    }

    // Check if there are any validation errors
    const hasErrors = Object.values(validationErrors).some(error => error !== "");
    if (hasErrors) {
      return toast.error("Please fix all validation errors before submitting");
    }

    // Basic required field check (fallback)
    if (!formData.user.name.trim() || !formData.user.email.trim() || 
        !formData.user.contact.trim() || !formData.designation.trim()) {
      return toast.error("Please fill in all required personal information");
    }

    if (createCompany) {
      if (!companyFormData.name.trim() || !companyFormData.category || 
          !companyFormData.address.line1.trim() || !companyFormData.address.city.trim() || 
          !companyFormData.address.state.trim() || !companyFormData.address.country) {
        return toast.error("Please fill in all required company information");
      }
    } else {
      if (!formData.companyId) {
        return toast.error("Please select a company");
      }
    }

    setLoading(true);

    try {
      const captchaRes = await validateCaptcha(captchaToken);
      if (!captchaRes) {
        toast.error("Captcha verification failed");
        setLoading(false);
        return;
      }

      if (createCompany) {
        try {
          const data = await postCompany(companyFormData);
          const updatedFormData = { ...formData, companyId: data[0] };
          setFormData(updatedFormData);

          const signupRes = await signupRecruiter(updatedFormData);
          if (signupRes.success) {
            toast.success("Registration successful! Please check your email.");
            router.push("/recruiter/signin");
          } else {
            toast.error("Some error occurred");
          }
        } catch (error) {
          handleApiError(error, "Error creating company or signing up");
        }
        setLoading(false);
        return;
      }

      try {
        const signupRes = await signupRecruiter(formData);
        if (signupRes) {
          toast.success("Registration successful! Please check your email.");
          router.push("/recruiter/signin");
        } else {
          toast.error("Some error occurred");
        }
      } catch (error) {
        handleApiError(error, "Error signing up");
      }
    } catch (error) {
      toast.error("Captcha verification failed");
    }

    captchaRef.current?.reset();
    setCaptchaToken("");
    setLoading(false);
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
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.user.name}
                  onChange={handleUserInputChange}
                  onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
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
                  name="email"
                  type="email"
                  placeholder="recruiter@company.com"
                  value={formData.user.email}
                  onChange={handleUserInputChange}
                  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
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
                  name="contact"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.user.contact}
                  onChange={handleUserInputChange}
                  onBlur={() => setTouched(prev => ({ ...prev, contact: true }))}
                  className={`pl-10 h-11 ${isFieldInvalid("contact") ? "border-red-500 focus:border-red-500" : ""}`}
                  maxLength={FIELD_LIMITS.PHONE_MAX + 5}
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
                name="designation"
                placeholder="HR Manager, Talent Acquisition, etc."
                value={formData.designation}
                onChange={handleInputChange}
                onBlur={() => setTouched(prev => ({ ...prev, designation: true }))}
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
                name="landline"
                type="tel"
                placeholder="Office landline number"
                value={formData.landline}
                onChange={handleInputChange}
                className="pl-10 h-11"
              />
            </div>
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
              onClick={() => setCreateCompany(false)}
              className="flex-1"
              type="button"
            >
              Select Existing Company
            </Button>
            <Button
              variant={createCompany ? "default" : "outline"}
              onClick={() => setCreateCompany(true)}
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
                <Select
                  value={formData.companyId}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, companyId: value }));
                  }}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select company..." />
                  </SelectTrigger>
                  <SelectContent>
                    {(companies || []).map((company: { id: string; name: string }) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    id="name"
                    placeholder="Enter company name"
                    value={companyFormData.name}
                    onChange={handleCompanyChange}
                    onBlur={() => setTouched(prev => ({ ...prev, companyName: true }))}
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
                    value={companyFormData.category}
                    onValueChange={(value) => {
                      setCompanyFormData((prev) => ({ ...prev, category: value }));
                    }}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select company category" />
                    </SelectTrigger>
                    <SelectContent>
                      {["PRIVATE", "MNC", "PSU/GOVERNMENT", "STARTUP", "OTHER"].map(
                        (category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Year of Establishment
                  </Label>
                  <Input
                    id="yearOfEstablishment"
                    type="number"
                    placeholder="Enter year"
                    value={companyFormData.yearOfEstablishment}
                    onChange={handleCompanyChange}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Website
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="website"
                      placeholder="https://company.com"
                      value={companyFormData.website}
                      onChange={handleCompanyChange}
                      className="pl-10 h-11"
                    />
                  </div>
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
                      id="size"
                      type="number"
                      placeholder="Number of employees"
                      value={companyFormData.size || ""}
                      onChange={handleCompanyChange}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Annual Turnover
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="annualTurnover"
                      placeholder="e.g., $10M"
                      value={companyFormData.annualTurnover}
                      onChange={handleCompanyChange}
                      className="pl-10 h-11"
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
                    id="socialMediaLink"
                    placeholder="LinkedIn or other profile"
                    value={companyFormData.socialMediaLink}
                    onChange={handleCompanyChange}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Domains
                  </Label>
                  <MultiSelect
                    givenOptions={jaf?.domains || []}
                    formData={companyFormData.domains}
                    setFormData={(value) => {
                      setCompanyFormData((prev) => ({ ...prev, domains: value }));
                    }}
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
                    id="line1"
                    placeholder="123 Main St"
                    value={companyFormData.address.line1}
                    onChange={handleAddressChange}
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Address Line 2 (Optional)
                </Label>
                <Input
                  id="line2"
                  placeholder="Apartment, studio, or floor"
                  value={companyFormData.address.line2}
                  onChange={handleAddressChange}
                  className="h-11"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    City *
                  </Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    value={companyFormData.address.city}
                    onChange={handleAddressChange}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    State *
                  </Label>
                  <Input
                    id="state"
                    placeholder="Enter state"
                    value={companyFormData.address.state}
                    onChange={handleAddressChange}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Country *
                  </Label>
                  <Select
                    value={companyFormData.address.country}
                    onValueChange={(value) => {
                      setCompanyFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, country: value },
                      }));
                    }}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select country..." />
                    </SelectTrigger>
                    <SelectContent>
                      {(jaf?.countries || []).map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
          disabled={loading || !captchaToken}
          className="flex-1 h-12 bg-slate-700 hover:bg-slate-800 text-white font-medium disabled:opacity-50"
          type="button"
        >
          {loading ? (
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
          <Button variant="outline" className="w-full h-12 font-medium" type="button">
            Already have an account? Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}