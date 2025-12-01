import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, User, Mail, Phone } from "lucide-react";
import { FIELD_LIMITS } from "./constants";

interface PersonalInfoSectionProps {
  personalInfo: {
    name: string;
    email: string;
    contact: string;
    designation: string;
    landline: string;
  };
  handleChange: (field: string, value: string) => void;
  setTouched: (update: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
  getFieldError: (field: string) => string;
  isFieldInvalid: (field: string) => boolean;
}

export const PersonalInfoSection = ({
  personalInfo,
  handleChange,
  setTouched,
  getFieldError,
  isFieldInvalid,
}: PersonalInfoSectionProps) => {
  return (
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
              onChange={(e) => handleChange("name", e.target.value)}
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
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
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
              onChange={(e) => handleChange("contact", e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, contact: true }))}
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
            placeholder="HR Manager, Talent Acquisition, etc."
            value={personalInfo.designation}
            onChange={(e) => handleChange("designation", e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, designation: true }))}
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
            onChange={(e) => handleChange("landline", e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, landline: true }))}
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
  );
};
