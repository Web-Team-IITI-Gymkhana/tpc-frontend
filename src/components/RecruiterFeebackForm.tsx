"use client";

import {
  Form,
  Radio,
  Input,
  Button,
  Typography,
  message,
} from "antd";
import { addRecruiterFeedback } from "@/helpers/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface Props {
  seasonId: string;
  seasonTitle?: string;
}

const likertOptions = [
  { label: "Strongly agree", value: 5 },
  { label: "Agree", value: 4 },
  { label: "Neutral", value: 3 },
  { label: "Disagree", value: 2 },
  { label: "Strongly disagree", value: 1 },
];

export default function RecruiterFeedbackForm({
  seasonId,
  seasonTitle,
}: Props) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: any) => {
    try {
      setSubmitting(true);
      await addRecruiterFeedback({ seasonId, ...values });
      message.success("Feedback submitted successfully");
      router.push("/recruiter/feedback");
    } catch (err: any) {
      message.error(
        err?.response?.data?.message ||
          "Feedback already submitted for this season"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderLikert = (name: string, label: string) => (
    <Form.Item
      name={name}
      label={
        <span className="font-semibold text-[16px] md:text-[18px]">
          {label}
        </span>
      }
      rules={[{ required: true, message: "Please select an option" }]}
    >
      <Radio.Group>
        {likertOptions.map((opt) => (
          <Radio
            key={opt.value}
            value={opt.value}
            className="block py-1 text-[14px] md:text-[16px]"
          >
            {opt.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );

  return (
    <div className="bg-gray-100 px-4 md:px-10 py-10">
      <Form layout="vertical" form={form} onFinish={onSubmit} requiredMark={false}>

        {/* ================= HEADER CARD ================= */}
        <div className="relative bg-white rounded-xl p-4 md:p-6 mb-6 shadow-sm border border-gray-200">
          <div className="absolute left-4 top-4 md:left-6 md:top-6">
            <img
              src="/portal/images/iiti.png"
              alt="IIT Indore Logo"
              className="w-10 h-10 md:w-[70px] md:h-[70px] object-contain"
            />
          </div>

          <div className="text-center px-10 md:px-0">
            <Title
              level={3}
              className="!text-[15px] md:!text-[20px]"
            >
              TRAINING & PLACEMENT OFFICE
            </Title>

            <Title
              level={3}
              className="!text-[15px] md:!text-[20px]"
            >
              INDIAN INSTITUTE OF TECHNOLOGY, INDORE
            </Title>
          </div>

          <Paragraph className="text-center text-[14px] md:text-[15px] leading-relaxed mt-4">
            Postal Address: Training and Placement Cell, 3rd Floor,
            <br />
            Abhinandan Bhavan, IIT Indore, Khandwa Road, Simrol, Indore – 453552 (M.P)
            <br />
            Email: placementofficer@iiti.ac.in, apo@iiti.ac.in
            <br />
            Phone: +91-731-660 (Extn. 3572/3431)
            <br />
            Website: placement.iiti.ac.in
          </Paragraph>
        </div>

        {/* ================= INTRO CARD ================= */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
          <Title level={3} className="text-center !text-[18px] md:!text-[22px]">
            {seasonTitle
              ? `Feedback form for ${seasonTitle}`
              : "Feedback form for Placement Process"}
          </Title>

          <Paragraph className="text-[14px] md:text-[16px] leading-relaxed">
            We would like to extend our sincere gratitude for scheduling the
            on-campus hiring at the Indian Institute of Technology, Indore.
            We sincerely hope that your time spent with us during this college
            recruitment drive was positive.
          </Paragraph>

          <Paragraph className="text-[14px] md:text-[16px] leading-relaxed">
            We need your insightful comments on the students' and the placement
            team's performance so that we can keep getting better. Please take
            a moment to answer the following.
          </Paragraph>
        </div>

        {/* ================= QUESTIONS CARD ================= */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
          {renderLikert("communicationPromptness","Initial communication was prompt and effective")}
          {renderLikert("queryHandling","The placement team swiftly handled all queries")}
          {renderLikert("logisticsArrangement","Logistics arrangements were created in accordance with the needs")}
          {renderLikert("studentFamiliarity","Students were familiar with the company and job description")}
          {renderLikert("studentCommunication","Students’ communication skills and confidence were up to the mark")}
          {renderLikert("resumeQuality","The student resumes were professionally composed")}
          {renderLikert("studentPreparedness","The students were well prepared overall")}
          {renderLikert("disciplineAndPunctuality","Students were disciplined and punctual during the process")}
        </div>

        {/* ================= FOOTER CARD ================= */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <Form.Item
            name="rightTimeToContact"
            label={
              <span className="font-semibold text-[16px] md:text-[18px]">
                What is the right time to contact you for Internship & FTE:
              </span>
            }
            rules={[{ required: true }]}
          >
            <Input className="text-[14px] md:text-[16px] rounded-md border-gray-300" />
          </Form.Item>

          <Form.Item
            name="recommendations"
            label={
              <span className="font-semibold text-[16px] md:text-[18px]">
                Any recommendations for improvement:
              </span>
            }
          >
            <TextArea rows={4} className="text-[14px] md:text-[16px]" />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              size="large"
            >
              Submit Feedback
            </Button>
          </Form.Item>
        </div>

      </Form>
    </div>
  );
}
