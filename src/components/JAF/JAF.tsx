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
import Cookies from "js-cookie";

import Loader from "@/components/Loader/loader";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const { Step } = Steps;

function JAF() {
  const accessToken = Cookies.get("accessToken");
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
      <div className="ml-auto mr-auto w-full">
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

            recName1: "",
            designation1: "",
            email1: "",
            phoneNumber1: "",
            landline1: "",
            recName2: "",
            designation2: "",
            email2: "",
            phoneNumber2: "",
            landline2: "",
            recName3: "",
            designation3: "",
            email3: "",
            phoneNumber3: "",
            landline3: "",

            role: "",
            description: "",
            attachments: [],
            skills: [],
            location: "",
            minNoOfHires: "",
            expectedNoOfHires: "",

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
            const recruiters = [1, 2, 3].map((index) => ({
              name: values[`recName${index}`],
              designation: values[`designation${index}`],
              email: values[`email${index}`],
              contact: values[`phoneNumber${index}`] ? "+91 " + values[`phoneNumber${index}`] : "",
              landline: values[`landline${index}`],
            })).filter(recruiter => recruiter.name || recruiter.designation || recruiter.email || recruiter.contact || recruiter.landline);

            const submitValues = {
              seasonId: values.seasonId,
              recruiters,
              job: {
                role: values.role,
                description: values.description,
                attachment: values.attachment,//file
                skills: values.skills,
                location: values.location,
                noOfVacancies: values.noOfVacancies,
                offerLetterReleaseDate: values.offerLetterReleaseDate, //date
                joiningDate: values.joiningDate, //date
                duration: values.duration,
                selectionProcedure: {
                  selectionMode: values.selectionMode, //dropdown - online/offline/hybrid
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
                others: values.jobOthers, //other textarea
              },
            };
            axios
            .post(
              `${baseUrl}/api/v1/recruiter-view/jaf`,
              {
                job: {
                  role: values.role,
                  seasonId: values.seasonId,
                  description: values.description,
                  recruiterDetailsFilled: submitValues.recruiters,
                  attachment: values.attachment,//file
                  others: values.jobOthers,
                  skills: values.skills,
                  location: values.location,
                  // noOfVacancies: values.noOfVacancies,
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
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Replace yourToken with the actual token
                },
              }
            )
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
              component: RecruiterDetails,
              validationSchema: Yup.object().shape({
                designation1: Yup.string().required("Required"),
                phoneNumber1: Yup.string()
                  .matches(phoneRegExp, "Phone number is not valid")
                  .required("Required"),
                email1: Yup.string()
                  .email("Enter valid email")
                  .required("Required"),
                email2: Yup.string().email("Enter valid email"),
                phoneNumber2: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
                email3: Yup.string().email("Enter valid email"),
                phoneNumber3: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
              }),
            },
            {
              component: JobDetails,
              validationSchema: Yup.object().shape({
                // designation: Yup.string().required("Designation is required"),
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
                  {/* <Step title="Company Details" description="Company info" /> */}
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
                    {currentStepIndex === 2 ? "Finish" : "Next"}
                  </Button>
                </Row>
              </Space>
            );
          }}
        </FormikWizard>
      </div>
    </div>
  );
}

export default JAF;
