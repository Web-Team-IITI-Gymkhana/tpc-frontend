"use client";
import "antd/dist/reset.css";
import { useEffect, useState, useRef } from "react";
import { Row, Col, Steps, Space, Button, Alert } from "antd";
import { FormikWizard, RenderProps } from "formik-wizard-form";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/loader";
import SeasonDetails from "./SeasonDetails";
import RecruiterDetails from "./RecruiterDetails";
import JobDetails from "./JobDetails";
import { API_ENDPOINTS, DEFAULT_FORM_VALUES } from "../../utils/jaf.constants";
import { JAFFormValues, JafDto } from "../../types/jaf.types";
import {
  seasonDetailsValidationSchema,
  recruiterDetailsValidationSchema,
  jobDetailsValidationSchema,
} from "../../validation/jaf.validation";
import ReCAPTCHA from "react-google-recaptcha";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const { Step } = Steps;

// Helper function to extract user-friendly error messages
const getErrorMessages = (errors: any): string[] => {
  const messages: string[] = [];

  if (!errors || typeof errors !== "object") {
    return messages;
  }

  const traverse = (obj: any, path = "") => {
    if (typeof obj === "string") {
      // Clean up error messages for better user experience
      let cleanMessage = obj;

      // Handle specific error patterns
      if (obj.includes("must be a `number` type")) {
        cleanMessage = "Please enter a valid number";
      } else if (obj.includes("At least one program must be selected")) {
        cleanMessage =
          "Please select at least one program in the eligibility criteria";
      } else if (obj.includes("At least one test must be specified")) {
        cleanMessage =
          "Please add at least one test in the selection procedure";
      } else if (
        obj.includes("At least one interview round must be specified")
      ) {
        cleanMessage =
          "Please add at least one interview round in the selection procedure";
      } else if (obj.includes("At least one salary entry is required")) {
        cleanMessage =
          "Please add at least one salary package in compensation details";
      }

      messages.push(cleanMessage);
    } else if (Array.isArray(obj)) {
      obj.forEach((item, index) => traverse(item, `${path}[${index}]`));
    } else if (typeof obj === "object" && obj !== null) {
      Object.entries(obj).forEach(([key, value]) =>
        traverse(value, path ? `${path}.${key}` : key),
      );
    }
  };

  traverse(errors);

  // Remove duplicates and return
  return [...new Set(messages)];
};

function JAF() {
  const accessToken = Cookies.get("accessToken");
  const [isLoading, setIsLoading] = useState(true);
    const [captchaToken, setCaptchaToken] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);


 useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-[100%] h-[90vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-8 md:gap-20 p-2 md:p-10">
      <FormikWizard
        key="jaf-form-wizard"
        initialValues={DEFAULT_FORM_VALUES}
        onSubmit={async (values: JAFFormValues) => {
          if (!captchaToken) {
            setShowCaptcha(true);
            toast.error("Please complete the CAPTCHA to submit.");
            return;
          }

          const recruiters = [1, 2, 3]
            .map((i) => ({
              name: values[`recName${i}`] || "",
              designation: values[`designation${i}`] || "",
              email: values[`email${i}`] || "",
              contact: values[`phoneNumber${i}`] ? "+91 " + values[`phoneNumber${i}`] : "",
              landline: values[`landline${i}`] || "",
            }))
            .filter(
              (r) =>
                r.name.trim() ||
                r.designation.trim() ||
                r.email.trim() ||
                r.contact.trim() ||
                r.landline.trim(),
            );

          if (recruiters.length === 0) {
            toast.error("At least one recruiter contact is required");
            return;
          }
          const payload: JafDto & { captchaToken: string } = {
            job: {
              seasonId: values.seasonId,
              role: values.role,
              description: values.description || undefined,
              recruiterDetailsFilled: recruiters,
              attachments: values.attachments?.length
                ? values.attachments.map((file) =>
                    typeof file === "string" ? file : file.name,
                  )
                : undefined,
              others: values.jobOthers || undefined,
              skills: values.skills?.length ? values.skills : undefined,
              location: values.location,
              minNoOfHires: values.minNoOfHires
                ? Number(values.minNoOfHires)
                : undefined,
              expectedNoOfHires: values.expectedNoOfHires
                ? Number(values.expectedNoOfHires)
                : undefined,
              offerLetterReleaseDate: values.offerLetterReleaseDate
                ? new Date(values.offerLetterReleaseDate)
                : undefined,
              joiningDate: values.joiningDate
                ? new Date(values.joiningDate)
                : undefined,
              duration: values.duration || undefined,
              selectionProcedure: {
                selectionMode: values.selectionMode,
                shortlistFromResume: values.shortlistFromResume,
                groupDiscussion: values.groupDiscussion,
                tests: values.tests || [],
                interviews: values.interviews || [],
                others: values.others || undefined,
                requirements:
                  values.numberOfMembers ||
                  values.numberOfRooms ||
                  values.otherRequirements
                    ? {
                        numberOfMembers: values.numberOfMembers
                          ? Number(values.numberOfMembers)
                          : undefined,
                        numberOfRooms: values.numberOfRooms
                          ? Number(values.numberOfRooms)
                          : undefined,
                        otherRequirements:
                          values.otherRequirements || undefined,
                      }
                    : undefined,
              },
            },
            salaries: values.salaries || [],
            captchaToken: captchaToken, 
          };

          try {
            await axios.post(`${baseUrl}${API_ENDPOINTS.SUBMIT_JAF}`, payload, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            });

            toast.success("JAF Form submitted successfully! Your application has been received.");
            window.location.reload();
          } catch (error: any) {
            console.error("JAF submission error:", error);

            const errorMessage =
              error.response?.data?.message ||
              error.response?.data?.error ||
              "Failed to submit JAF form. Please try again.";

            toast.error(errorMessage);
          } finally {
            setCaptchaToken("");
            setShowCaptcha(false);
            recaptchaRef.current?.reset();
          }
        }}
        validateOnNext
        activeStepIndex={0}
        steps={[
          {
            component: SeasonDetails,
            validationSchema: seasonDetailsValidationSchema,
          },
          {
            component: RecruiterDetails,
            validationSchema: recruiterDetailsValidationSchema,
          },
          {
            component: JobDetails,
            validationSchema: jobDetailsValidationSchema,
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
          errors,
        }: RenderProps) => {
          const errorMessages = getErrorMessages(errors);

          return (
            <Space direction="vertical" size="large" className="w-full">
              <div className="w-full overflow-x-auto">
                <Steps
                  current={currentStepIndex}
                  size="small"
                  className="min-w-fit"
                  responsive={false}
                >
                  <Step title="Season Details" />
                  <Step title="Recruiter Details" />
                  <Step title="Job Details" />
                </Steps>
              </div>

              {renderComponent()}

              {currentStepIndex === 2 ? (
                <Row justify="center" className="pt-6">
                  <div className="flex flex-col items-center gap-4">
                    {showCaptcha && (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={(token) => setCaptchaToken(token || "")}
                      />
                    )}
                    <div className="flex gap-2">
                      <Button
                        disabled={isPrevDisabled}
                        onClick={handlePrev}
                        className="min-w-20"
                        size="large"
                      >
                        Previous
                      </Button>
                      <Button
                        disabled={isNextDisabled}
                        onClick={handleNext}
                        className="min-w-20"
                        size="large"
                        type="primary"
                      >
                        Finish
                      </Button>
                    </div>
                  </div>
                </Row>
              ) : (
                <Row justify="center" className="px-2 md:px-0">
                  <Space size="large" className="w-full max-w-xs flex justify-center">
                    <Button
                      disabled={isPrevDisabled}
                      onClick={handlePrev}
                      className="flex-1 min-w-20"
                      size="large"
                    >
                      Previous
                    </Button>
                    <Button
                      disabled={isNextDisabled}
                      onClick={handleNext}
                      className="flex-1 min-w-20"
                      size="large"
                      type="primary"
                    >
                      Next
                    </Button>
                  </Space>
                </Row>
              )}
              {currentStepIndex === 2 &&
                isNextDisabled &&
                errorMessages.length > 0 && (
                  <Row justify="center" style={{ marginTop: 20 }}>
                    <Col span={24}>
                      <Alert
                        message="Please complete the following to submit your form:"
                        description={
                          <div style={{ marginTop: 8 }}>
                            {errorMessages.map((error, index) => (
                              <div
                                key={index}
                                style={{
                                  padding: "4px 0",
                                  fontSize: "14px",
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                <span
                                  style={{
                                    color: "#ff4d4f",
                                    marginRight: "8px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  •
                                </span>
                                <span>{error}</span>
                              </div>
                            ))}
                          </div>
                        }
                        type="warning"
                        showIcon
                        style={{
                          borderRadius: "8px",
                          border: "1px solid #faad14",
                        }}
                      />
                    </Col>
                  </Row>
                )}
            </Space>
          );
        }}
      </FormikWizard>
    </div>
  );
}

export default JAF;
