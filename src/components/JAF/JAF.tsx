"use client";
import "antd/dist/reset.css";
import * as React from "react";
import { Row, Col, Steps, Space, Button } from "antd";
import * as Yup from "yup";
import { FormikWizard, RenderProps } from "formik-wizard-form";

import JobDetails from "./JobDetails";
import RecruiterDetails from "./RecruiterDetails";
import SeasonDetails from "./SeasonDetails";
import CompanyDetails from "./CompanyDetails";
import axios from "axios"

const { Step } = Steps;

function JAF() {
  const [finalValues, setFinalValues] = React.useState({});
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/  
  

  return (
    <div className="flex w-full justify-start gap-10 p-10 align-center">
      
      <div className="ml-auto mr-auto h-screen">
        <FormikWizard      
          
          initialValues={{
            seasonId: "",
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
            size:"",
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

            tests:[],
            interviews:[],

            others: "",

            numberOfMembers: "",
            numberOfRooms: "",
            otherRequirements: "",

            salaries:[],                        
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
                  zipCode: values.zipCode,//zipcode check
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
                contact: "+91 "+values.phoneNumber,//with country code default +91 8793849280
                landline: values.landline,
              },
              job: {
                role: values.role,
                description: values.description,
                //attachment: values.attachment,//file
                skills: values.skills,
                location: values.location,
                noOfVacancies: values.noOfVacancies,                
                offerLetterReleaseDate: values.offerLetterReleaseDate,//date
                joiningDate: values.joiningDate,//date
                duration: values.duration,
                selectionProcedure: {
                  selectionMode: values.selectionMode,//dropdown - online/offline
                  shortlistFromResume: values.shortlistFromResume,
                  groupDiscussion:values.groupDiscussion,
                  tests: values.tests,// type - dropdown, duration
                  interviews: values.interviews,                  
                  others: values.others,//textarea
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
                others: values.jobOthers,//other textarea
              },
            };
            console.log(submitValues)
            axios.post("http://10.250.9.45:3000/api/v1/jaf",{
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
                  zipCode: values.zipCode,
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
                phoneNumber: "+91 "+values.phoneNumber,
                landline: values.landline,
              },
              job: {
                role: values.role,
                description: values.description,
                //attachment: values.attachment,//file
                skills: values.skills,
                location: values.location,
                noOfVacancies: values.noOfVacancies,                
                offerLetterReleaseDate: values.offerLetterReleaseDate,
                joiningDate: values.joiningDate,
                duration: values.duration,
                selectionProcedure: {
                  selectionMode: values.selectionMode,
                  shortlistFromResume: values.shortlistFromResume,
                  groupDiscussion:values.groupDiscussion,
                  tests: values.tests,
                  interviews: values.interviews,                  
                  others: values.others,
                  requirements: {
                    numberOfMembers: values.numberOfMembers,
                    numberOfRooms: values.numberOfRooms,
                    otherRequirements: values.otherRequirements,
                  },
                },
                salaries: values.salaries,                
                others: values.jobOthers,
              },
            }).then((res) => {
              console.log(res)
            }).catch((err) => console.log(err))
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
                phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Required"),                
                email: Yup.string().email("Enter valid email").required("Required")
              })
            },
            {
              component: JobDetails,
              validationSchema: Yup.object().shape({
                designation: Yup.string().required("Designation is required")
              })
            }
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
                <Row>
                  <Col>
                    <pre>{JSON.stringify(finalValues, null, 2)}</pre>
                  </Col>
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
