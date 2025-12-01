"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Building2 } from "lucide-react";
import {
  getCompanies,
  postCompany,
  signupRecruiter,
} from "@/helpers/recruiter/signup";
import { getJafDetails } from "@/helpers/recruiter/api";
import { validateCaptcha } from "@/helpers/api";
import { handleApiError } from "@/utils/errorHandling";
import { CompanyPostFC, JAFdetailsFC } from "@/helpers/recruiter/types";
import { useFormState } from "./recruiterSignup/useFormState";
import { PersonalInfoSection } from "./recruiterSignup/PersonalInfoSection";
import { CompanyInfoSection } from "./recruiterSignup/CompanyInfoSection";

export default function RecruiterSignup() {
  const [companies, setCompanies] = useState<Array<{ id: string; name: string }>>([]);
  const [createCompany, setCreateCompany] = useState(true);
  const [captchaToken, setCaptchaToken] = useState("");
  const [jaf, setJaf] = useState<JAFdetailsFC | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const {
    personalInfo,
    companyInfo,
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
  } = useFormState(createCompany);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [companiesData, jafData] = await Promise.all([
          getCompanies(),
          getJafDetails(),
        ]);

        setCompanies(Array.isArray(companiesData) ? companiesData : []);
        setJaf(jafData);
      } catch (error) {
        console.error("Failed to load form data:", error);
        toast.error("Failed to load form data. Please refresh the page.");
        setCompanies([]);
        setJaf(null);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async () => {
    if (!captchaToken) {
      toast.error("Please complete the captcha verification");
      return;
    }

    if (!performValidation()) {
      toast.error("Please fix all validation errors before submitting");
      return;
    }

    setSubmitting(true);

    try {
      const captchaRes = await validateCaptcha(captchaToken);
      if (!captchaRes) {
        toast.error("Captcha verification failed. Please try again.");
        captchaRef.current?.reset();
        setCaptchaToken("");
        return;
      }

      let finalCompanyId = companyInfo.companyId;

      if (createCompany) {
        const companyData: CompanyPostFC = {
          name: companyInfo.companyName.trim(),
          category: companyInfo.category,
          website: companyInfo.website.trim() || undefined,
          yearOfEstablishment: companyInfo.yearOfEstablishment,
          size: companyInfo.companySize ? Number(companyInfo.companySize) : undefined,
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
          "Registration successful! Please check your email for verification."
        );

        resetForm();

        setTimeout(() => {
          router.push("/recruiter/signin");
        }, 2000);
      } else {
        toast.error(signupRes.message || "Registration failed. Please try again.");
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
        <PersonalInfoSection
          personalInfo={personalInfo}
          handleChange={handlePersonalInfoChange}
          setTouched={setTouched}
          getFieldError={getFieldError}
          isFieldInvalid={isFieldInvalid}
        />

        <Separator />

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
              variant={createCompany ? "default" : "outline"}
              onClick={() => {
                setCreateCompany(true);
                resetValidation();
              }}
              className="flex-1"
              type="button"
            >
              Create New Company
            </Button>
          </div>

          {createCompany && (
            <CompanyInfoSection
              companyInfo={companyInfo}
              jaf={jaf}
              handleCompanyChange={handleCompanyInfoChange}
              handleDomainsChange={handleDomainsChange}
              handleAddressChange={handleAddressChange}
              setTouched={setTouched}
              getFieldError={getFieldError}
              isFieldInvalid={isFieldInvalid}
            />
          )}
        </div>

        <Separator />

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
          <Button variant="outline" className="w-full h-12 font-medium" type="button">
            Already have an account? Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

