import React, { useEffect, useState } from "react";
import { ProfileFC, updateProfileFC } from "@/helpers/recruiter/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { patchProfile } from "@/helpers/recruiter/api";
import { getDomains } from "@/helpers/recruiter/api";
import { MultiSelect } from "@/components/ui/multiselect";
import { CompanyDetailsLoader } from "../Loader/loaders";
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Calendar,
  Globe,
  Users,
  Briefcase,
  Edit3,
  Check,
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";

export const EditForm = (params: { profile: ProfileFC }) => {
  const { profile } = params;
  const [loading, setLoading] = useState(false);
  const [email, updateEmail] = useState<string>(
    profile.user.email ? profile.user.email : "",
  );
  const [contact, updateContact] = useState<string>(
    profile.user.contact ? profile.user.contact : "",
  );
  const [name, updateName] = useState<string>(
    profile.user.name ? profile.user.name : "",
  );
  const [designation, setDesignation] = useState<string>(
    profile.designation ? profile.designation : "",
  );
  const [landline, setLandline] = useState<string>(
    profile.landline ? profile.landline : "",
  );

  const updateProfile = async () => {
    setLoading(true);
    try {
      const data: updateProfileFC = {
        designation: designation,
        landline: landline,
        user: {
          name: name,
          email: email,
          contact: contact,
        },
      };
      
      const res = await patchProfile(data);
      if (res) {
        toast.success("Profile updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-full mx-auto space-y-6">
      <Card className="border-slate-300 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Edit Personal Information</h3>
              <p className="text-sm text-slate-600 font-normal">Update your personal details and contact information</p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-slate-600" />
              <h4 className="font-semibold text-slate-800">Basic Information</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => updateName(e.target.value)}
                  placeholder="Enter your full name"
                  className="h-11 border-slate-300 focus:border-slate-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="designation" className="text-sm font-medium text-slate-700">
                  Designation *
                </Label>
                <Input
                  id="designation"
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Enter your designation"
                  className="h-11 border-slate-300 focus:border-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-slate-600" />
              <h4 className="font-semibold text-slate-800">Contact Information</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => updateEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-11 pl-10 border-slate-300 focus:border-slate-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact" className="text-sm font-medium text-slate-700">
                  Mobile Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="contact"
                    type="text"
                    value={contact}
                    onChange={(e) => updateContact(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="h-11 pl-10 border-slate-300 focus:border-slate-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="landline" className="text-sm font-medium text-slate-700">
                Landline Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="landline"
                  type="text"
                  value={landline}
                  onChange={(e) => setLandline(e.target.value)}
                  placeholder="Enter landline number"
                  className="h-11 pl-10 border-slate-300 focus:border-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button
              onClick={updateProfile}
              disabled={loading}
              className="w-full h-12 bg-slate-700 hover:bg-slate-800 text-white font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating Profile...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Update Profile
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const EditCompanyForm = (params: { profile: ProfileFC }) => {
  const { profile } = params;
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>(
    profile.company.name ? profile.company.name : "",
  );
  const [domains, setDomains] = useState(
    profile.company.domains ? profile.company.domains : [],
  );
  const [category, setCategory] = useState<string>(
    profile.company.category ? profile.company.category : "",
  );
  const [address, setAddress] = useState<any>(
    profile.company.address ? profile.company.address : {},
  );
  const [size, setSize] = useState<number>(
    profile.company.size ? profile.company.size : 0,
  );
  const [yearOfEstablishment, setYearOfEstablishment] = useState<string>(
    profile.company.yearOfEstablishment
      ? profile.company.yearOfEstablishment
      : "",
  );
  const [socialMediaLink, setSocialMediaLink] = useState<string>(
    profile.company.socialMediaLink ? profile.company.socialMediaLink : "",
  );

  const [domainOptions, setDomainsOptions] = useState<[string] | []>([]);
  
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const d = await getDomains();
        setDomainsOptions(d.domains);
      } catch (error) {
        toast.error("Failed to load domains");
      } finally {
        setLoading(false);
      }
    };
    fetchDomains();
  }, []);

  const updateCompanyProfile = async () => {
    setUpdating(true);
    try {
      const data: updateProfileFC = {
        company: {
          name: companyName,
          domains: domains,
          category: category,
          address: address,
          size: size,
          yearOfEstablishment: yearOfEstablishment,
          socialMediaLink: socialMediaLink,
        },
      };
      
      const res = await patchProfile(data);
      if (res) {
        toast.success("Company information updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Failed to update company information");
      }
    } catch (error) {
      toast.error("An error occurred while updating company information");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <CompanyDetailsLoader />;
  }

  return (
    <div className="max-full mx-auto space-y-6">
      <Card className="border-slate-300 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Edit Company Information</h3>
              <p className="text-sm text-slate-600 font-normal">Update your company details and business information</p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-8">
          {/* Basic Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Building className="w-5 h-5 text-slate-600" />
              <h4 className="font-semibold text-slate-800">Company Details</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-slate-700">
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  className="h-11 border-slate-300 focus:border-slate-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-slate-700">
                  Category *
                </Label>
                <Input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter company category"
                  className="h-11 border-slate-300 focus:border-slate-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size" className="text-sm font-medium text-slate-700">
                  Company Size *
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="size"
                    type="number"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    placeholder="Number of employees"
                    className="h-11 pl-10 border-slate-300 focus:border-slate-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearOfEstablishment" className="text-sm font-medium text-slate-700">
                  Year of Establishment *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="yearOfEstablishment"
                    type="text"
                    value={yearOfEstablishment}
                    onChange={(e) => setYearOfEstablishment(e.target.value)}
                    placeholder="Enter year"
                    className="h-11 pl-10 border-slate-300 focus:border-slate-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="socialMediaLink" className="text-sm font-medium text-slate-700">
                Website / Social Media Link
              </Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="socialMediaLink"
                  type="url"
                  value={socialMediaLink}
                  onChange={(e) => setSocialMediaLink(e.target.value)}
                  placeholder="https://company-website.com"
                  className="h-11 pl-10 border-slate-300 focus:border-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Domains */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-slate-600" />
              <h4 className="font-semibold text-slate-800">Business Domains</h4>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Select Domains *
              </Label>
              <MultiSelect
                formData={domains}
                setFormData={setDomains}
                givenOptions={domainOptions.map((domain, index) => domain)}
              />
              <p className="text-xs text-slate-500">Select all domains that apply to your company</p>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-slate-600" />
              <h4 className="font-semibold text-slate-800">Company Address</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-slate-700">
                  City *
                </Label>
                <Input
                  id="city"
                  type="text"
                  value={address.city || ""}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="Enter city"
                  className="h-11 border-slate-300 focus:border-slate-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium text-slate-700">
                  State *
                </Label>
                <Input
                  id="state"
                  type="text"
                  value={address.state || ""}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  placeholder="Enter state"
                  className="h-11 border-slate-300 focus:border-slate-500"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="line1" className="text-sm font-medium text-slate-700">
                Address Line 1 *
              </Label>
              <Input
                id="line1"
                type="text"
                value={address.line1 || ""}
                onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                placeholder="Enter address line 1"
                className="h-11 border-slate-300 focus:border-slate-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="line2" className="text-sm font-medium text-slate-700">
                Address Line 2
              </Label>
              <Input
                id="line2"
                type="text"
                value={address.line2 || ""}
                onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                placeholder="Enter address line 2 (optional)"
                className="h-11 border-slate-300 focus:border-slate-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium text-slate-700">
                  Country *
                </Label>
                <Input
                  id="country"
                  type="text"
                  value={address.country || ""}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  placeholder="Enter country"
                  className="h-11 border-slate-300 focus:border-slate-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zipcode" className="text-sm font-medium text-slate-700">
                  Zip Code
                </Label>
                <Input
                  id="zipcode"
                  type="text"
                  value={address.zipcode || ""}
                  onChange={(e) => setAddress({ ...address, zipcode: e.target.value })}
                  placeholder="Enter zip code"
                  className="h-11 border-slate-300 focus:border-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button
              onClick={updateCompanyProfile}
              disabled={updating}
              className="w-full h-12 bg-slate-700 hover:bg-slate-800 text-white font-medium"
            >
              {updating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating Company Information...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Update Company Information
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const EditProfilePage = ({ data }: { data: ProfileFC }) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Edit Profile</h1>
        <p className="text-slate-600">Update your personal and company information</p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <EditForm profile={data} />
        <EditCompanyForm profile={data} />
      </div>
    </div>
  );
};

export default EditProfilePage;
