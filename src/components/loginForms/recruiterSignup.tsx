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
import { useEffect, useState } from "react";
import { CompanyPostFC, JAFdetailsFC } from "@/helpers/recruiter/types";
import { MultiSelect } from "../ui/multiselect";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { validateCaptcha } from "@/helpers/api";
import { Combobox } from "../ui/combobox";
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
  ArrowRight
} from "lucide-react";

export default function RecruiterSignup() {
  const [companies, setCompanies] = useState([]);
  const [createCompany, setCreateCompany] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [jaf, setJaf] = useState<JAFdetailsFC | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    companySize: 0,
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

  useEffect(() => {
    getCompanies().then((data) => {
      setCompanies(data);
    });
    getJafDetails().then((data) => {
      setJaf(data);
    });
  }, []);

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));
  };

  const handleSubmit = async () => {
    if (!captchaToken) {
      toast.error("Please complete the captcha");
      return;
    }

    // Validation
    if (!personalInfo.name || !personalInfo.email || !personalInfo.contact || !personalInfo.designation) {
      toast.error("Please fill in all required personal information");
      return;
    }

    if (!companyInfo.companyId && !companyInfo.companyName) {
      toast.error("Please select a company or create a new one");
      return;
    }

    if (createCompany && (!companyInfo.companyName || !companyInfo.category || !companyInfo.address.line1 || !companyInfo.address.city || !companyInfo.address.state || !companyInfo.address.country)) {
      toast.error("Please fill in all required company information");
      return;
    }

    setLoading(true);

    try {
      const captchaRes = await validateCaptcha(captchaToken);
      if (!captchaRes) {
        toast.error("Captcha verification failed");
        setLoading(false);
        return;
      }

      let finalCompanyId = companyInfo.companyId;

      // If creating new company
      if (createCompany) {
        const companyData: CompanyPostFC = {
          name: companyInfo.companyName,
          category: companyInfo.category,
          website: companyInfo.website,
          yearOfEstablishment: companyInfo.yearOfEstablishment,
          size: Number(companyInfo.companySize),
          annualTurnover: companyInfo.annualTurnover,
          socialMediaLink: companyInfo.socialMediaLink,
          domains: companyInfo.domains,
          address: companyInfo.address,
        };

        const newCompany = await postCompany(companyData);
        finalCompanyId = newCompany[0];
      }

      // Submit recruiter registration
      const recruiterData = {
        user: {
          name: personalInfo.name,
          email: personalInfo.email,
          contact: personalInfo.contact,
        },
        companyId: finalCompanyId,
        designation: personalInfo.designation,
        landline: personalInfo.landline,
      };

      const signupRes = await signupRecruiter(recruiterData);
      
      if (signupRes.success) {
        toast.success("Registration successful! Please check your email.");
        router.push("/recruiter/signin");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      
      
      <CardContent className="space-y-8">
        {/* Step 1: Personal Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white rounded-full text-sm font-medium">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
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
                  onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
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
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
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
                  onChange={(e) => handlePersonalInfoChange('contact', e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Designation *
              </Label>
              <Input
                placeholder="HR Manager, Talent Acquisition, etc."
                value={personalInfo.designation}
                onChange={(e) => handlePersonalInfoChange('designation', e.target.value)}
                className="h-11"
              />
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
                onChange={(e) => handlePersonalInfoChange('landline', e.target.value)}
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
            <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
          </div>
          
          <div className="flex gap-4">
            <Button
              variant={!createCompany ? "default" : "outline"}
              onClick={() => setCreateCompany(false)}
              className="flex-1"
            >
              Select Existing Company
            </Button>
            <Button
              variant={createCompany ? "default" : "outline"}
              onClick={() => setCreateCompany(true)}
              className="flex-1"
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
                  options={companies.map((company: { id: string; name: string }) => ({
                    value: company.id,
                    label: company.name,
                  }))}
                  value={companyInfo.companyId}
                  onChange={(value) => handleCompanyInfoChange('companyId', value)}
                  placeholder="Select company..."
                  searchPlaceholder="Search companies..."
                  emptyPlaceholder="No company found."
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Company Name *</Label>
                  <Input placeholder="Enter company name" onChange={(e) => handleCompanyInfoChange('companyName', e.target.value)} className="h-11"/>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Category *</Label>
                  <Input placeholder="e.g., Technology, Finance" onChange={(e) => handleCompanyInfoChange('category', e.target.value)} className="h-11"/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Year of Establishment</Label>
                  <Input type="number" placeholder="Enter year" onChange={(e) => handleCompanyInfoChange('yearOfEstablishment', e.target.value)} className="h-11"/>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Website</Label>
                  <Input placeholder="https://company.com" onChange={(e) => handleCompanyInfoChange('website', e.target.value)} className="h-11"/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Company Size</Label>
                  <Input type="number" placeholder="Number of employees" onChange={(e) => handleCompanyInfoChange('companySize', e.target.value)} className="h-11"/>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Annual Turnover</Label>
                  <Input placeholder="e.g., $10M" onChange={(e) => handleCompanyInfoChange('annualTurnover', e.target.value)} className="h-11"/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Social Media Link</Label>
                  <Input placeholder="LinkedIn or other profile" onChange={(e) => handleCompanyInfoChange('socialMediaLink', e.target.value)} className="h-11"/>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Domains</Label>
                  <MultiSelect
                    givenOptions={jaf?.domains || []}
                    formData={companyInfo.domains}
                    setFormData={(value) => handleCompanyInfoChange('domains', value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Address Line 1 *</Label>
                <Input placeholder="123 Main St" onChange={(e) => handleAddressChange('line1', e.target.value)} className="h-11"/>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Address Line 2 (Optional)</Label>
                <Input placeholder="Apartment, studio, or floor" onChange={(e) => handleAddressChange('line2', e.target.value)} className="h-11"/>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">City *</Label>
                  <Input placeholder="Enter city" onChange={(e) => handleAddressChange('city', e.target.value)} className="h-11"/>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">State *</Label>
                  <Input placeholder="Enter state" onChange={(e) => handleAddressChange('state', e.target.value)} className="h-11"/>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Country *</Label>
                  <Combobox
                    options={jaf?.countries.map((country) => ({
                      value: country,
                      label: country,
                    })) || []}
                    value={companyInfo.address.country}
                    onChange={(value) => handleAddressChange('country', value)}
                    placeholder="Select country..."
                    searchPlaceholder="Search countries..."
                    emptyPlaceholder="No country found."
                  />
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
            <h3 className="text-lg font-semibold text-gray-900">Security Verification</h3>
          </div>
          
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={(token) => setCaptchaToken(token)}
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          onClick={handleSubmit}
          disabled={loading || !captchaToken}
          className="flex-1 h-12 bg-slate-700 hover:bg-slate-800 text-white font-medium"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </div>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Complete Registration
            </>
          )}
        </Button>
        
        <Link href="/recruiter/signin/" className="flex-1">
          <Button variant="outline" className="w-full h-12 font-medium">
            Already have an account? Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
