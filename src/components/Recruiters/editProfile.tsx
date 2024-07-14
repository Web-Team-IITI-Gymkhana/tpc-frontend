import React, { useEffect, useState } from "react";
import { ProfileFC, updateProfileFC } from "@/helpers/recruiter/types";
import { Button } from "../ui/button";
import { patchProfile } from "@/helpers/recruiter/api";
import { getDomains } from "@/helpers/recruiter/api";

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
    <div className="text-black">
      <div className="mt-8 p-8 rounded-lg bg-gray-100 leading-10 border-2 border-solid border-black">
        <div>
          <span className="font-semibold">Name: </span>
          <input
            className="rounded"
            type="text"
            value={name}
            onChange={(e) => {
              updateName(e.target.value);
            }}
          />
        </div>
        <div>
          <span className="font-semibold">Designation: </span>
          <input
            className="rounded"
            type="text"
            value={designation}
            onChange={(e) => {
              setDesignation(e.target.value);
            }}
          />
        </div>
        <div>
          <span className="font-semibold">Landline: </span>
          <input
            className="rounded"
            type="text"
            value={landline}
            onChange={(e) => {
              setLandline(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-8 mb-2">
          <span className="font-semibold">Email: </span>
          <input
            className="rounded"
            type="email"
            value={email}
            onChange={(e) => {
              updateEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-8">
          <span className="font-semibold">Contact: </span>
          <input
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
    </div>
  );
};

export const EditCompanyForm = (params: { profile: ProfileFC }) => {
  const { profile } = params;
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
      setDomainsOptions(d);
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
      const res = await patchProfile(data);
      window.location.reload();
    };
    triggerUpdate();
  };

  return (
    <div className="text-black rounded-lg">
      <div className="mt-8 p-8 rounded-lg bg-gray-100 leading-10 flex flex-col gap-4 w-max max-w-full border-2 border-black">
        <div>
          <span className="font-semibold">Company Name: </span>
          <input
            className="rounded"
            type="text"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
          />
        </div>
        <div>
          <span className="font-semibold">Domains: </span>
          <select
            value={domains}
            multiple
            onChange={(e) => {
              const options = [...e.target.selectedOptions];
              const values = options.map((option) => option.value);
              setDomains(values);
            }}
          >
            {domainOptions.map((domain, index) => (
              <option key={index}>{domain}</option>
            ))}
          </select>
        </div>
        <div>
          <span className="font-semibold">Category: </span>
          <input
            className="rounded"
            type="text"
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
                City:{" "}
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => {
                    setAddress({ ...address, city: e.target.value });
                  }}
                />
              </span>
            </li>
            <li>
              <span>
                Line 1:{" "}
                <input
                  type="text"
                  value={address.line1}
                  onChange={(e) => {
                    setAddress({ ...address, line1: e.target.value });
                  }}
                />
              </span>
            </li>
            <li>
              <span>
                Line 2:{" "}
                <input
                  type="text"
                  value={address.line2}
                  onChange={(e) => {
                    setAddress({ ...address, line2: e.target.value });
                  }}
                />
              </span>
            </li>
            <li>
              <span>
                State:{" "}
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => {
                    setAddress({ ...address, state: e.target.value });
                  }}
                />
              </span>
            </li>
            <li>
              <span>
                Country:{" "}
                <input
                  type="text"
                  value={address.country}
                  onChange={(e) => {
                    setAddress({ ...address, country: e.target.value });
                  }}
                />
              </span>
            </li>
            <li>
              <span>
                Zip Code:{" "}
                <input
                  type="text"
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
          <span className="font-semibold">Size: </span>
          <input
            className="rounded"
            type="text"
            value={size}
            onChange={(e) => {
              setSize(e.target.valueAsNumber);
            }}
          />
        </div>
        <div>
          <span className="font-semibold">Year of Establishment: </span>
          <input
            className="rounded"
            type="text"
            value={yearOfEstablishment}
            onChange={(e) => {
              setYearOfEstablishment(e.target.value);
            }}
          />
        </div>
        <div>
          <span className="font-semibold">Social Media Link: </span>
          <input
            className="rounded"
            type="text"
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
    </div>
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
