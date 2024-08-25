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
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Collapsible from "@/components/ui/collapsible";
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
import Loader from "../Loader/loader";

export const RecruiterForm = ({
  formData,
  setFormData,
}: {
  formData: CompanyPostFC;
  setFormData: (data: any) => void;
}) => {
  const [jaf, setjaf] = useState<JAFdetailsFC>(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.currentTarget;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleAdressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.currentTarget;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [id]: value,
      },
    }));
  };

  useEffect(() => {
    getJafDetails().then((data) => {
      setjaf(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && <Loader />}
      {jaf && (
        <div className="p-1">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="name"
                placeholder="Enter company name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(e) => {
                  setFormData((prev) => ({ ...prev, category: e }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {["PUBLIC", "GOVERNMENT", "PSU", "MNC"].map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="yearEstablished">Year of Establishment</Label>
                <Input
                  id="yearOfEstablishment"
                  type="number"
                  placeholder="Enter year"
                  value={formData.yearOfEstablishment}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="Enter website URL"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="companySize">Company Size</Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={handleChange}
                ></Input>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="annualTurnover">Annual Turnover</Label>
                <Input
                  id="annualTurnover"
                  type="number"
                  placeholder="Enter turnover"
                  value={formData.annualTurnover}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="socialMedia">Social Media Link</Label>
                <Input
                  id="socialMediaLink"
                  type="url"
                  placeholder="Enter social media link"
                  value={formData.socialMediaLink}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="domains">Domains</Label>
                <MultiSelect
                  formData={formData.domains}
                  givenOptions={jaf.domains}
                  setFormData={(e) => {
                    setFormData((prev) => ({ ...prev, domains: e }));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input
                id="line1"
                placeholder="Enter address"
                value={formData.address.line1}
                onChange={handleAdressChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="addressLine2">Address Line 2 (optional)</Label>
              <Input
                id="line2"
                placeholder="Enter additional address"
                value={formData.address.line2}
                onChange={handleAdressChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  value={formData.address.city}
                  onChange={handleAdressChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="Enter state"
                  value={formData.address.state}
                  onChange={handleAdressChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.address.country}
                onValueChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    address: { ...prev.address, country: e },
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {jaf.countries.map((country) => (
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
    </>
  );
};

export default function RecruiterSignup() {
  const [companies, setCompanies] = useState([]);
  const [createCompany, setCreateCompany] = useState(false);

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

  const [formData, setFormData] = useState({
    user: { name: "", email: "", contact: "" },
    companyId: "",
    designation: "",
    landline: "",
  });

  useEffect(() => {
    getCompanies().then((data) => {
      setCompanies(data);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      user: { ...prevFormData.user, [name]: value },
    }));
  };

  const handleSubmit = async () => {
    console.log(companyFormData);

    if (createCompany) {
      try {
        const data = await postCompany(companyFormData);
        console.log(data);

        const updatedFormData = { ...formData, companyId: data[0] };
        setFormData(updatedFormData);

        console.log(updatedFormData);
        const signupRes = await signupRecruiter(updatedFormData);
        if (signupRes) {
          toast.success("Recruiter registered successfully");
        } else {
          toast.error("Some error occured");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error creating company or signing up");
      }
      return;
    }

    try {
      console.log(formData);
      const signupRes = await signupRecruiter(formData);
      if (signupRes) {
        toast.success("Recruiter registered successfully");
      } else {
        toast.error("Some error occured");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating company or signing up");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          Recruiter Registration
        </CardTitle>
        <CardDescription>Fill in the details to register.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="recruiter-name">Name</Label>
              <Input
                id="recruiter-name"
                name="name"
                placeholder="Enter name"
                value={formData.user.name}
                onChange={handleUserInputChange}
              />
            </div>
            {createCompany || (
              <div className="grid gap-2">
                <Label htmlFor="recruiter-name">Company</Label>
                <Select
                  defaultValue="Select company"
                  onValueChange={(e) => {
                    setFormData((prev) => ({ ...prev, companyId: e }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {formData.companyId ? (
                        companies.find(
                          (company) => company.id === formData.companyId,
                        )?.name
                      ) : (
                        <span>Select Company</span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    if (formData.companyId) {
                      setFormData((prev) => ({ ...prev, companyId: "" }));
                    } else {
                      setCreateCompany(true);
                    }
                  }}
                  variant={formData.companyId ? "destructive" : "default"}
                >
                  {formData.companyId ? "Clear" : "Create Company"}
                </Button>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="recruiter-email">Email</Label>
              <Input
                id="recruiter-email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.user.email}
                onChange={handleUserInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="recruiter-contact">Contact</Label>
                <Input
                  id="recruiter-contact"
                  name="contact"
                  type="tel"
                  placeholder="Enter contact"
                  value={formData.user.contact}
                  onChange={handleUserInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="recruiter-designation">Designation</Label>
                <Input
                  id="recruiter-designation"
                  name="designation"
                  placeholder="Enter designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="recruiter-landline">Landline (optional)</Label>
              <Input
                id="recruiter-landline"
                name="landline"
                type="tel"
                placeholder="Enter landline"
                value={formData.landline}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            {createCompany && (
              <Collapsible title="Create Company" defaultexpanded={true}>
                <RecruiterForm
                  formData={companyFormData}
                  setFormData={setCompanyFormData}
                />
              </Collapsible>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end">
          <Button type="submit" onClick={handleSubmit}>
            Sign Up
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
