"use client";
import "antd/dist/reset.css";
import * as React from "react";
import { Row, Col, Steps, Space, Button } from "antd";
import * as Yup from "yup";
import { FormikWizard, RenderProps } from "formik-wizard-form";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import JobDetails from "./JobDetails";
import RecruiterDetails from "./RecruiterDetails";
import SeasonDetails from "./SeasonDetails";
import CompanyDetails from "./CompanyDetails";
import axios from "axios";

import Loader from "@/components/Loader/loader";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const { Step } = Steps;

function JAF() {
  const [finalValues, setFinalValues] = React.useState({});
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate a network request or some async operation
    const timer = setTimeout(() => {
      setIsLoading(false);
      // To simulate an error, you could set the error state here
      // setError(true);
    }, 2000); // 2 seconds

    // Cleanup the timer if the component unmounts before the timer finishes
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    //formwikWizars is taking loading time so added loader to avoid raw html preview
    return (
      <div className=" w-[100%] h-[90vh] mx-2 py-4 rounded-md   flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full justify-start gap-20 p-10 align-center">
      <div className="ml-auto mr-auto">
        <FormikWizard
          initialValues={{
            seasonId: "",
            terms: false,
            compName: "",
            website: "",
            domains: [],
            category: "",
            line1: "",
            line2: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            size: "",
            yearOfEstablishment: "",
            annualTurnover: "",
            socialMediaLink: "",

            recName: "",
            designation: "",
            email: "",
            phoneNumber: "",
            landline: "",

            role: "",
            description: "",
            attachment: "",
            skills: "",
            location: "",
            noOfVacancies: "",

            offerLetterReleaseDate: "",
            joiningDate: "",
            duration: "",

            selectionMode: "",
            shortlistFromResume: false,
            groupDiscussion: false,

            tests: [],
            interviews: [],

            others: "",

            numberOfMembers: "",
            numberOfRooms: "",
            otherRequirements: "",

            salaries: [],
            jobOthers: "",
          }}
          onSubmit={(values: any) => {
            const submitValues = {
              seasonId: values.seasonId,
              company: {
                name: values.compName,
                website: values.website,
                domains: values.domains,
                category: values.category,
                address: {
                  line1: values.line1,
                  line2: values.line2,
                  city: values.city,
                  state: values.state,
                  zipCode: values.zipCode, //zipcode check
                  country: values.country,
                },
                size: values.size,
                yearOfEstablishment: values.yearOfEstablishment,
                annualTurnover: values.annualTurnover,
                socialMediaLink: values.socialMediaLink,
              },
              recruiter: {
                name: values.recName,
                designation: values.designation,
                email: values.email,
                contact: "+91 " + values.phoneNumber, //with country code default +91 8793849280
                landline: values.landline,
              },
              job: {
                role: values.role,
                description: values.description,
                //attachment: values.attachment,//file
                skills: values.skills,
                location: values.location,
                noOfVacancies: values.noOfVacancies,
                offerLetterReleaseDate: values.offerLetterReleaseDate, //date
                joiningDate: values.joiningDate, //date
                duration: values.duration,
                selectionProcedure: {
                  selectionMode: values.selectionMode, //dropdown - online/offline
                  shortlistFromResume: values.shortlistFromResume,
                  groupDiscussion: values.groupDiscussion,
                  tests: values.tests, // type - dropdown, duration
                  interviews: values.interviews,
                  others: values.others, //textarea
                  requirements: {
                    numberOfMembers: values.numberOfMembers,
                    numberOfRooms: values.numberOfRooms,
                    otherRequirements: values.otherRequirements,
                  },
                },
                salaries: values.salaries,
                // salaries: [
                //   {
                // salaryPeriod: values.salaryPeriod,//text
                // criteria: {
                //   programs: values.basicProgs,//dropdown from backend
                //   genders: values.basicGenders,//dropdown from backend
                //   categories: values.basicCategories,//dropdown from backend
                //   minCPI: values.basicMinCPI,//number
                //   tenthMarks: values.basicTenth,//number
                //   twelvethMarks: values.basicTwelveth,//number
                // },
                // baseSalary: values.baseSalary,
                // totalCTC: values.totalCTC,
                // takeHomeSalary: values.takeHomeSalary,
                // grossSalary: values.grossSalary,
                // otherCompensations: values.otherCompensations,//textbox
                //},
                // ],
                others: values.jobOthers, //other textarea
              },
            };
            axios
              .post(`${baseUrl}/api/v1/jaf`, {
                job: {
                  role: values.role,
                  seasonId: values.seasonId,
                  description: values.description,
                  companyDetailsFilled: {
                    name: values.compName,
                    website: values.website,
                    domains: values.domains,
                    category: values.category,
                    address: {
                      line1: values.line1,
                      line2: values.line2,
                      city: values.city,
                      state: values.state,
                      country: values.country,
                    },
                    size: values.size,
                    yearOfEstablishment: values.yearOfEstablishment,
                    annualTurnover: values.annualTurnover,
                    socialMediaLink: values.socialMediaLink,
                  },
                  recruiterDetailsFilled: {
                    name: values.recName,
                    designation: values.designation,
                    email: values.email,
                    contact: "+91 " + values.phoneNumber,
                    landline: values.landline,
                  },
                  //attachment: values.attachment,//file
                  others: values.jobOthers,
                  skills: values.skills,
                  location: values.location,
                  noOfVacancies: values.noOfVacancies,
                  offerLetterReleaseDate: values.offerLetterReleaseDate,
                  joiningDate: values.joiningDate,
                  duration: values.duration,
                  selectionProcedure: {
                    selectionMode: values.selectionMode,
                    shortlistFromResume: values.shortlistFromResume,
                    groupDiscussion: values.groupDiscussion,
                    tests: values.tests,
                    interviews: values.interviews,
                    others: values.others,
                    requirements: {
                      numberOfMembers: values.numberOfMembers,
                      numberOfRooms: values.numberOfRooms,
                      otherRequirements: values.otherRequirements,
                    },
                  },
                },
                salaries: values.salaries,
              })
              .then((res) => {
                toast.success("JAF Form filled successfully");
                window.location.reload();
              })
              .catch((err) => {
                toast.error("Cannot Submit");
              });
            setFinalValues(submitValues);
          }}
          validateOnNext
          activeStepIndex={0}
          steps={[
            {
              component: SeasonDetails,
              // validationSchema: Yup.object().shape({
              //   year: Yup.number().typeError("Please enter a valid Year").required("Required"),
              //   type: Yup.string().required("Required"),
              // }),
              validationSchema: Yup.object().shape({
                seasonId: Yup.string().required("Please select a season"),
                terms: Yup.boolean().oneOf(
                  [true],
                  "Please accept the terms and conditions to proceed",
                ),
              }),
            },
            {
              component: CompanyDetails,
              validationSchema: Yup.object().shape({
                compName: Yup.string().required("Required"),
                website: Yup.string()
                  .url("Enter valid URL")
                  .required("Required"),
              }),
            },
            {
              component: RecruiterDetails,
              validationSchema: Yup.object().shape({
                designation: Yup.string().required("Required"),
                phoneNumber: Yup.string()
                  .matches(phoneRegExp, "Phone number is not valid")
                  .required("Required"),
                email: Yup.string()
                  .email("Enter valid email")
                  .required("Required"),
              }),
            },
            {
              component: JobDetails,
              validationSchema: Yup.object().shape({
                designation: Yup.string().required("Designation is required"),
              }),
            },
          ]}
        >
          {({
            currentStepIndex,
            renderComponent,
            handlePrev,
            handleNext,
            isNextDisabled,
            isPrevDisabled,
          }: RenderProps) => {
            return (
              <Space direction="vertical" size="large">
                <Steps current={currentStepIndex}>
                  <Step
                    title="Season Details &nbsp;&nbsp;&nbsp;"
                    description="Season info"
                  />
                  <Step title="Company Details" description="Company info" />
                  <Step
                    title="Recruiter Details&nbsp;"
                    description="Recruited info"
                  />
                  <Step title="Job Details&nbsp;" description="Job info" />
                </Steps>
                {renderComponent()}
                <Row className="gap-20 justify-center">
                  <Button
                    disabled={isPrevDisabled}
                    type="primary"
                    onClick={handlePrev}
                  >
                    Previous
                  </Button>
                  <Button
                    disabled={isNextDisabled}
                    type="primary"
                    onClick={handleNext}
                  >
                    {currentStepIndex === 3 ? "Finish" : "Next"}
                  </Button>
                </Row>
                {/* <Row>
                  <Col>
                    <pre>{JSON.stringify(finalValues, null, 2)}</pre>
                  </Col>
                </Row> */}
              </Space>
            );
          }}
        </FormikWizard>
      </div>
    </div>
  );
}

export default JAF;
