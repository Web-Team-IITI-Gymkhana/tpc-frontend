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

const { Step } = Steps;

function JAF() {
  const [finalValues, setFinalValues] = React.useState({});
  return (
    <div className="flex w-full justify-start gap-10 p-10 align-center">
      <div className="w-1/3 justify-center items-center border-2 border-gray-500 hidden lg:flex">
        <p>
          SOME CONTENT ABOUT IIT INDORE
        </p>
      </div>
      <div className="ml-auto mr-auto h-screen">
      <FormikWizard
        initialValues={{
          year:"2024",
          type:"intern",
          name: "",
          website: "",
          domains: [],
          category:"public",          
          addressLine1: "",
          addressLine2: "",
          city:"",
          state:"",
          zipcode:"",
          country:"",
          companySize:"",
          establishmentYear:"",
          annualTurnover:"",
          socialMedia:"",
          recruiterName: "",
          designation: "",
          email: "",          
          phone:"",
          landline:"",
          jobTitle:"",
          description:"",
          attachments:"",
          skills:"",
          location:"",
          vacancies:"",
          basicCriteria:"",
          offerLetterDate:"",
          tentativeJoiningDate:"",
          duration:"",
        }}
        onSubmit={(values: any) => {
          setFinalValues(values);
        }}
        validateOnNext
        activeStepIndex={0}
        steps={[
          {
            component: SeasonDetails,
            validationSchema: Yup.object().shape({
              year: Yup.number().typeError("Please enter a valid Year").required("Required"),
              type: Yup.string().required("Required"),              
            })
          },
          {
            component: CompanyDetails,
            validationSchema: Yup.object().shape({
              name: Yup.string().required("Required"),
              website: Yup.string().url("Enter valid URL").required("Required"),
            })
          },
          {
            component: RecruiterDetails,
            validationSchema: Yup.object().shape({
              designation: Yup.string().required("Required"),
              phone: Yup.number().typeError("Enter a valid number").required("Required"),
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
          isPrevDisabled
        }: RenderProps) => {
          return (
            <Space direction="vertical" size="large">
              <Steps current={currentStepIndex}>
                <Step title="Season Details &nbsp;&nbsp;&nbsp;" description="Season info" />
                <Step title="Company Details" description="Company info" />
                <Step title="Recruiter Details&nbsp;" description="Recruited info" />
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
