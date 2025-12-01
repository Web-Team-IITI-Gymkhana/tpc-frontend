import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AlertCircle, Globe, Users, DollarSign, MapPin } from "lucide-react";
import { MultiSelect } from "@/components/ui/multiselect";
import { Combobox } from "@/components/ui/combobox";
import { FIELD_LIMITS } from "./constants";
import { JAFdetailsFC } from "@/helpers/recruiter/types";

interface CompanyInfoSectionProps {
  companyInfo: {
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
  };
  jaf: JAFdetailsFC | null;
  handleCompanyChange: (field: string, value: string) => void;
  handleDomainsChange: (value: string[]) => void;
  handleAddressChange: (field: string, value: string) => void;
  setTouched: (update: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
  getFieldError: (field: string) => string;
  isFieldInvalid: (field: string) => boolean;
}

export const CompanyInfoSection = ({
  companyInfo,
  jaf,
  handleCompanyChange,
  handleDomainsChange,
  handleAddressChange,
  setTouched,
  getFieldError,
  isFieldInvalid,
}: CompanyInfoSectionProps) => {
  return (
    <div className="space-y-4 pt-4 border-t">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Company Name *
          </Label>
          <Input
            placeholder="Enter company name"
            value={companyInfo.companyName}
            onChange={(e) => handleCompanyChange("companyName", e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, companyName: true }))}
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
          <Label className="text-sm font-medium text-gray-700">Category *</Label>
          <Select
            value={companyInfo.category}
            onValueChange={(value) => {
              handleCompanyChange("category", value);
              setTouched((prev) => ({ ...prev, category: true }));
            }}
          >
            <SelectTrigger
              className={`h-11 ${isFieldInvalid("category") ? "border-red-500 focus:border-red-500" : ""}`}
            >
              <SelectValue placeholder="Select company category" />
            </SelectTrigger>
            <SelectContent>
              {["PRIVATE", "MNC", "PSU/GOVERNMENT", "STARTUP", "OTHER"].map(
                (category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                )
              )}
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
              handleCompanyChange("yearOfEstablishment", e.target.value)
            }
            onBlur={() =>
              setTouched((prev) => ({ ...prev, yearOfEstablishment: true }))
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
          <Label className="text-sm font-medium text-gray-700">Website</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="https://company.com"
              value={companyInfo.website}
              onChange={(e) => handleCompanyChange("website", e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, website: true }))}
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
              onChange={(e) => handleCompanyChange("companySize", e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, companySize: true }))}
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
                handleCompanyChange("annualTurnover", e.target.value)
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
              handleCompanyChange("socialMediaLink", e.target.value)
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
          <Label className="text-sm font-medium text-gray-700">Domains *</Label>
          <MultiSelect
            givenOptions={jaf?.domains || []}
            formData={companyInfo.domains}
            setFormData={handleDomainsChange}
            hasError={isFieldInvalid("domains")}
          />
          {getFieldError("domains") && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {getFieldError("domains")}
            </div>
          )}
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
            onChange={(e) => handleAddressChange("line1", e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, line1: true }))}
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
          <Label className="text-sm font-medium text-gray-700">City *</Label>
          <Input
            placeholder="Enter city"
            value={companyInfo.address.city}
            onChange={(e) => handleAddressChange("city", e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, city: true }))}
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
          <Label className="text-sm font-medium text-gray-700">State *</Label>
          <Input
            placeholder="Enter state"
            value={companyInfo.address.state}
            onChange={(e) => handleAddressChange("state", e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, state: true }))}
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
          <Label className="text-sm font-medium text-gray-700">Country *</Label>
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
  );
};
