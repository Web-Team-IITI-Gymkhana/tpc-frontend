"use client";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Row, Col, Steps, Space, Button } from "antd";
import { FormikWizard, RenderProps } from "formik-wizard-form";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/loader";
import SeasonDetails from "./SeasonDetails";
import RecruiterDetails from "./RecruiterDetails";
import JobDetails from "./JobDetails";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const { Step } = Steps;

const iso = (date: any): string | null => {
  return date ? new Date(date).toISOString() : null;
};
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const requiredIfAny = (idx: 2 | 3, base: Yup.StringSchema = Yup.string()) =>
  Yup.lazy((_, { parent }) => {
    const k = (field: string) => `${field}${idx}` as const;

    const essentials = [
      parent[k("recName")],
      parent[k("designation")],
      parent[k("email")],
      parent[k("phoneNumber")],
    ];

    const anyFilled = essentials.some(
      (v) => typeof v === "string" && v.trim() !== "",
    );

    return anyFilled ? base.required("Required") : base.notRequired();
  });

export const recruiterStepSchema = Yup.object({
  recName1: Yup.string().required("Required"),
  designation1: Yup.string().required("Required"),
  email1: Yup.string().email("Invalid email").required("Required"),
  phoneNumber1: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  landline1: Yup.string(),

  recName2: requiredIfAny(2),
  designation2: requiredIfAny(2),
  email2: requiredIfAny(2, Yup.string().email("Invalid email")),
  phoneNumber2: requiredIfAny(
    2,
    Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  ),
  landline2: Yup.string(),

  recName3: requiredIfAny(3),
  designation3: requiredIfAny(3),
  email3: requiredIfAny(3, Yup.string().email("Invalid email")),
  phoneNumber3: requiredIfAny(
    3,
    Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  ),
  landline3: Yup.string(),
});

export const jobDetailsValidationSchema = Yup.object({
  /* ───────────────────────────────── Job core ─────────────────────────── */
  role: Yup.string().required("Job title is required"),
  location: Yup.string().required("Location is required"),

  duration: Yup.string(),

  offerLetterReleaseDate: Yup.date().nullable(),
  joiningDate: Yup.date().nullable(),

  expectedNoOfHires: Yup.number()
    .typeError("Expected hires must be a number")
    .min(0, "Cannot be negative")
    .nullable(),

  minNoOfHires: Yup.number()
    .typeError("Minimum hires must be a number")
    .min(0, "Cannot be negative")
    .nullable(),

  skills: Yup.array().of(Yup.string()), // optional
  description: Yup.string(), // optional
  attachments: Yup.array().of(Yup.mixed<File>()), // optional
  others: Yup.string(),

  /* ────────────────────────────────────────────────────────── */
  /*  Selection procedure                                      */
  /* ────────────────────────────────────────────────────────── */
  selectionMode: Yup.string()
    .oneOf(["ONLINE", "OFFLINE", "HYBRID"])
    .required("Selection mode is required"),

  shortlistFromResume: Yup.boolean().required(),
  groupDiscussion: Yup.boolean().required(),

  tests: Yup.array()
    .of(
      Yup.object({
        type: Yup.string().required("Type is required"),
        duration: Yup.string().required("Duration is required"),
      }),
    )
    .min(1, "Add at least one test"),

  interviews: Yup.array()
    .of(
      Yup.object({
        type: Yup.string().required("Type is required"),
        duration: Yup.string().required("Duration is required"),
      }),
    )
    .min(1, "Add at least one interview"),

  /* requirements object is fully optional */
  numberOfMembers: Yup.number().min(0).nullable(),
  numberOfRooms: Yup.number().min(0).nullable(),
  otherRequirements: Yup.string(),

  /* ────────────────────────────────────────────────────────── */
  /*  Salary slabs                                             */
  /* ────────────────────────────────────────────────────────── */
  salaries: Yup.array()
    .of(
      Yup.object({
        isBacklogAllowed: Yup.string().required(
          "Backlog selection is required",
        ),
      }),
    )
    .min(1, "At least one salary entry is required"),
});

function JAF() {
  const accessToken = Cookies.get("accessToken");
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="flex flex-col w-full gap-20 p-10">
      <FormikWizard
        initialValues={{
          //page1
          seasonId: "",
          terms: false,
          //page2
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
          //page3
          role: "",
          description: "",
          attachments: [],
          skills: [],
          location: "",
          minNoOfHires: "",
          expectedNoOfHires: "",
          offerLetterReleaseDate: null,
          joiningDate: null,
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
          const recruiters = [1, 2, 3]
            .map((i) => ({
              name: values[`recName${i}`],
              designation: values[`designation${i}`],
              email: values[`email${i}`],
              contact: values[`phoneNumber${i}`]
                ? "+91 " + values[`phoneNumber${i}`]
                : "",
              landline: values[`landline${i}`],
            }))
            .filter(
              (r) =>
                r.name || r.designation || r.email || r.contact || r.landline,
            );

          /* ── assemble payload ───────────────────────────────────────────── */
          const payload = {
            job: {
              role: values.role,
              seasonId: values.seasonId,
              description: values.description,
              recruiterDetailsFilled: recruiters,
              attachments: values.attachments,
              others: values.jobOthers,
              skills: values.skills,
              location: values.location,

              /* convert only if present */
              offerLetterReleaseDate: iso(values.offerLetterReleaseDate),
              joiningDate: iso(values.joiningDate),

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
          };

          axios
            .post(`${baseUrl}/api/v1/recruiter-view/jaf`, payload, {
              headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then(() => {
              toast.success("JAF Form filled successfully");
              window.location.reload();
            })
            .catch(() => toast.error("Cannot Submit"));
        }}
        validateOnNext
        activeStepIndex={0}
        steps={[
          {
            component: SeasonDetails,
            validationSchema: Yup.object({
              seasonId: Yup.string().required("Please select a season"),
              terms: Yup.boolean().oneOf(
                [true],
                "Please accept the terms and conditions to proceed",
              ),
            }),
          },
          {
            component: RecruiterDetails,
            validationSchema: recruiterStepSchema,
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
        }: RenderProps) => (
          <Space direction="vertical" size="large">
            <Steps current={currentStepIndex}>
              <Step title="Season Details" />
              <Step title="Recruiter Details" />
              <Step title="Job Details" />
            </Steps>
            {renderComponent()}
            <Row justify="center">
              <Space size="large">
                <Button disabled={isPrevDisabled} onClick={handlePrev}>
                  Previous
                </Button>
                <Button disabled={isNextDisabled} onClick={handleNext}>
                  {currentStepIndex === 2 ? "Finish" : "Next"}
                </Button>
              </Space>
            </Row>
          </Space>
        )}
      </FormikWizard>
    </div>
  );
}

export default JAF;
