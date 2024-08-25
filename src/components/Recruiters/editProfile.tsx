import React, { useEffect, useState } from "react";
import { ProfileFC, updateProfileFC } from "@/helpers/recruiter/types";
import { Button } from "../ui/button";
import { patchProfile } from "@/helpers/recruiter/api";
import { getDomains } from "@/helpers/recruiter/api";
import { MultiSelect } from "@/components/ui/multiselect";
import TextField from "@mui/material/TextField";
import { CompanyDetailsLoader } from "../Loader/loaders";

export const EditForm = (params: { profile: ProfileFC }) => {
  const { profile } = params;
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

  const updateProfile = () => {
    const data: updateProfileFC = {
      designation: designation,
      landline: landline,
      user: {
        name: name,
        email: email,
        contact: contact,
      },
    };
    const triggerUpdate = async () => {
      const res = await patchProfile(data);
      window.location.reload();
    };
    triggerUpdate();
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          value={name}
          onChange={(e) => {
            updateName(e.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="Designation"
          variant="standard"
          value={designation}
          onChange={(e) => {
            setDesignation(e.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="Landline"
          variant="standard"
          value={landline}
          onChange={(e) => {
            setLandline(e.target.value);
          }}
        />
      </div>
      <div className="flex gap-8 mb-2">
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          type="email"
          value={email}
          onChange={(e) => {
            updateEmail(e.target.value);
          }}
        />
      </div>
      <div className="flex gap-8">
        <TextField
          id="standard-basic"
          label="Contact"
          variant="standard"
          type="text"
          value={contact}
          onChange={(e) => {
            updateContact(e.target.value);
          }}
        />
      </div>

      <div className="mt-4">
        <Button
          className="w-full"
          onClick={() => {
            updateProfile();
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export const EditCompanyForm = (params: { profile: ProfileFC }) => {
  const { profile } = params;
  const [loading, setLoading] = useState<boolean>(true);
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
      const d = await getDomains();
      setDomainsOptions(d.domains);
      setLoading(false);
    };
    fetchDomains();
  }, []);

  const updateCompanyProfile = () => {
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
    const triggerUpdate = async () => {
      console.log(data);
      await patchProfile(data);
      window.location.reload();
    };
    triggerUpdate();
  };

  return (
    <>
      {loading ? (
        <CompanyDetailsLoader />
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <TextField
              id="standard-basic"
              label="Company Name"
              variant="standard"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            />
          </div>
          <div>
            <span className="font-semibold">Domains: </span>
            <MultiSelect
              formData={domains}
              setFormData={setDomains}
              givenOptions={domainOptions.map((domain, index) => domain)}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Category"
              variant="standard"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>
          <div>
            <span className="font-semibold">Address: </span>
            <ul className="ml-8">
              <li>
                <span>
                  <TextField
                    id="standard-basic"
                    label="City"
                    variant="standard"
                    value={address.city}
                    onChange={(e) => {
                      setAddress({ ...address, city: e.target.value });
                    }}
                  />
                </span>
              </li>
              <li>
                <span>
                  <TextField
                    id="standard-basic"
                    label="Line 1"
                    variant="standard"
                    value={address.line1}
                    onChange={(e) => {
                      setAddress({ ...address, line1: e.target.value });
                    }}
                  />
                </span>
              </li>
              <li>
                <span>
                  <TextField
                    id="standard-basic"
                    label="Line 2"
                    variant="standard"
                    value={address.line2}
                    onChange={(e) => {
                      setAddress({ ...address, line2: e.target.value });
                    }}
                  />
                </span>
              </li>
              <li>
                <span>
                  <TextField
                    id="standard-basic"
                    label="State"
                    variant="standard"
                    value={address.state}
                    onChange={(e) => {
                      setAddress({ ...address, state: e.target.value });
                    }}
                  />
                </span>
              </li>
              <li>
                <span>
                  <TextField
                    id="standard-basic"
                    label="Country"
                    variant="standard"
                    value={address.country}
                    onChange={(e) => {
                      setAddress({ ...address, country: e.target.value });
                    }}
                  />
                </span>
              </li>
              <li>
                <span>
                  <TextField
                    id="standard-basic"
                    label="Zip Code"
                    variant="standard"
                    value={address.zipcode}
                    onChange={(e) => {
                      setAddress({ ...address, zipcode: e.target.value });
                    }}
                  />
                </span>
              </li>
            </ul>
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Size"
              variant="standard"
              value={size}
              type="number"
              onChange={(e) => {
                // @ts-ignore
                setSize(e.target.valueAsNumber);
              }}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Year of Establishment"
              variant="standard"
              value={yearOfEstablishment}
              onChange={(e) => {
                setYearOfEstablishment(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Social Media Link"
              variant="standard"
              value={socialMediaLink}
              onChange={(e) => {
                setSocialMediaLink(e.target.value);
              }}
            />
          </div>

          <div className="mt-4">
            <Button
              className="w-full"
              onClick={() => {
                updateCompanyProfile();
              }}
            >
              Update
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const EditProfilePage = ({ data }: { data: ProfileFC }) => {
  return (
    <div className="flex md:flex-row flex-col justify-around w-full">
      <div className="">
        <h2 className="text-xl font-bold text-center">Company Details</h2>
        <EditCompanyForm profile={data} />
      </div>
      <div className="">
        <h2 className="text-xl font-bold text-center">Profile Details</h2>
        <EditForm profile={data} />
      </div>
    </div>
  );
};

export default EditProfilePage;
