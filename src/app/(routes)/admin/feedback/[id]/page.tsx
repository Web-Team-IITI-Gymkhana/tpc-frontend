"use client";

import { useRouter } from "next/navigation";
import { fetchFeedbackById } from "@/helpers/api";
import { useEffect, useRef, useState } from "react";
import Loader from "@/components/Loader/loader";
import { Button } from "antd";
import jsPDF from "jspdf";
import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons";

/* ---------------- Rating Mapping ---------------- */

const RATING_LABELS: Record<number, string> = {
  5: "Strongly Agree",
  4: "Agree",
  3: "Neutral",
  2: "Disagree",
  1: "Strongly Disagree",
};

const getRatingLabel = (value?: number) =>
  value ? RATING_LABELS[value] ?? "-" : "-";

/* ---------------- Page ---------------- */

const FeedbackDetailPage = ({ params }: any) => {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<any>();
  const pdfRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchFeedbackById(params.id);
      console.log(data);
      setFeedback(data);
      setLoading(false);
    };
    getData();
  }, [params.id]);

  /* ---------------- PDF ---------------- */

  const downloadPdf = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    let y = 50;
    const left = 60;
    const right = 535;
    const colGap = 260;
    const lineGap = 18;

    const centerText = (text: string, size: number) => {
      doc.setFontSize(size);
      doc.text(text, 297.5, y, { align: "center" });
      y += lineGap;
    };

    const sectionTitle = (text: string) => {
      y += 10;
      doc.setFontSize(13);
      doc.text(text, left, y);
      y += lineGap;
    };

    const twoColRow = (
  items: { label: string; value: string }[],
) => {
  doc.setFontSize(11);

  const pageWidth = doc.internal.pageSize.getWidth();
  const usableWidth = pageWidth - left * 2;

  const colWidth = usableWidth / 2; // EXACTLY 2 columns

  let maxLines = 1;

  items.slice(0, 2).forEach((item, index) => {
    if (!item.label) return;

    const x = left + index * colWidth;

    // label (bold)
    doc.setFont(undefined, "bold");
    doc.text(`${item.label}:`, x, y);

    // value (normal)
    doc.setFont(undefined, "normal");
    const valueX = x + 90;
    const maxValueWidth = colWidth - 95;

    const wrapped = doc.splitTextToSize(
      item.value || "-",
      maxValueWidth,
    );

    doc.text(wrapped, valueX, y);

    maxLines = Math.max(maxLines, wrapped.length);
  });

  y += maxLines * lineGap;
};




    const singleLine = (label: string, value: string) => {
      doc.setFontSize(11);
      doc.text(`${label}:`, left, y);
      doc.text(value || "-", left + 180, y);
      y += lineGap;
    };

    /* Header */
    centerText("TRAINING AND PLACEMENT OFFICE", 18);
    y += 10;

    centerText("INDIAN INSTITUTE OF TECHNOLOGY, INDORE", 18);
    doc.line(left, y, right, y);
    y += 30;

    /* Title */
    centerText("Recruiter Feedback", 14);
    y += 10;

    /* Recruiter Info */
    sectionTitle("General Information");
    y += 4;

    twoColRow([
      {
        label: "Name of official",
        value: feedback.recruiter.user.name,
      },
      {
        label: "Email ID",
        value: feedback.recruiter.user.email,
      },
    ]);
    y += 1;
    twoColRow([
      {
        label: "Designation",
        value: feedback.recruiter.designation,
      },
      {
        label: "Company Name",
        value: feedback.company.name,
      },
    ]);
    y += 1;
    twoColRow([
      {
        label: "Date",
        value: new Date(feedback.createdAt).toLocaleDateString('en-GB'),
      },
      {
        label: "Season",
        value: `${feedback.season.year} ${feedback.season.type}`,
      },
    ]);

    y += 12;

    /* Ratings */
    sectionTitle("Feedback Ratings");
    y += 4;

    singleLine(
      "Communication Promptness",
      getRatingLabel(feedback.communicationPromptness),
    );
    y += 1;
    singleLine(
      "Query Handling",
      getRatingLabel(feedback.queryHandling),
    );
    y += 1;
    singleLine(
      "Logistics Arrangement",
      getRatingLabel(feedback.logisticsArrangement),
    );
    y += 1;
    singleLine(
      "Student Familiarity",
      getRatingLabel(feedback.studentFamiliarity),
    );
    y += 1;
    singleLine(
      "Student Communication",
      getRatingLabel(feedback.studentCommunication),
    );
    y += 1;
    singleLine(
      "Resume Quality",
      getRatingLabel(feedback.resumeQuality),
    );
    y += 1;
    singleLine(
      "Student Preparedness",
      getRatingLabel(feedback.studentPreparedness),
    );
    y += 1;
    singleLine(
      "Discipline & Punctuality",
      getRatingLabel(feedback.disciplineAndPunctuality),
    );

    y += 14;

    /* Free text */
    sectionTitle("Right Time to Contact");
    doc.setFontSize(11);
    const rtc = doc.splitTextToSize(
      feedback.rightTimeToContact || "-",
      420,
    );
    doc.text(rtc, left, y);
    y += rtc.length * lineGap + 10;

    sectionTitle("Recommendations");
    const rec = doc.splitTextToSize(
      feedback.recommendations || "-",
      420,
    );
    doc.text(rec, left, y);

    doc.save(
      `Feedback_${feedback.company.name}_${feedback.season.year}.pdf`,
    );
  };

  /* ---------------- Loading ---------------- */

  if (loading) {
    return (
      <div className="h-64 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="px-8 md:px-20 py-10 text-[17px] leading-relaxed bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => router.push("/admin/feedback")}
          style={{ marginBottom: "16px", paddingLeft: 0 }}
        >
          Go Back
        </Button>
        <h1 className="text-3xl font-semibold">Recruiter Feedback</h1>
        <Button icon={<DownloadOutlined />} onClick={downloadPdf}>Download PDF</Button>
      </div>

      <div ref={pdfRef} className="bg-white p-8 border">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-center">
          TRAINING AND PLACEMENT OFFICE
        </h2>
        <h2 className="text-2xl font-semibold text-center">
          INDIAN INSTITUTE OF TECHNOLOGY, INDORE
        </h2>
        <hr className="my-4" />

        {/* General Info */}
        <h3 className="text-xl font-semibold mb-4">
          General Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16">
          <Info label="Recruiter Name" value={feedback.recruiter.user.name} />
          <Info label="Recruiter Email" value={feedback.recruiter.user.email} />
          <Info label="Designation" value={feedback.recruiter.designation} />
          <Info label="Company Name" value={feedback.company.name} />
          <Info label="Date" value={new Date(feedback.createdAt).toLocaleDateString('en-GB')} />
          <Info label="Season" value={`${feedback.season.year} ${feedback.season.type}`} />
        </div>

        {/* <div className="mt-4">
          <Info
            label="Season"
            value={`${feedback.season.year} ${feedback.season.type}`}
          />
        </div> */}

        {/* Ratings */}
        <h3 className="text-xl font-semibold mt-10 mb-4">
          Feedback Ratings
        </h3>

        <Rating label="Communication Promptness" value={feedback.communicationPromptness} />
        <Rating label="Query Handling" value={feedback.queryHandling} />
        <Rating label="Logistics Arrangement" value={feedback.logisticsArrangement} />
        <Rating label="Student Familiarity" value={feedback.studentFamiliarity} />
        <Rating label="Student Communication" value={feedback.studentCommunication} />
        <Rating label="Resume Quality" value={feedback.resumeQuality} />
        <Rating label="Student Preparedness" value={feedback.studentPreparedness} />
        <Rating label="Discipline & Punctuality" value={feedback.disciplineAndPunctuality} />

        {/* Free text */}
        <div className="mt-8">
          <p className="font-semibold text-lg">
            Right time to contact
          </p>
          <p className="mt-2">{feedback.rightTimeToContact || "-"}</p>
        </div>

        <div className="mt-6">
          <p className="font-semibold text-lg">
            Recommendations
          </p>
          <p className="mt-2 whitespace-pre-wrap">
            {feedback.recommendations || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Helpers ---------------- */

const Info = ({ label, value }: any) => (
  <div>
    <span className="font-semibold text-[18px]">{label}:</span>{" "}
    <span>{value || "-"}</span>
  </div>
);

const Rating = ({ label, value }: any) => (
  <div className="mb-3">
    <span className="font-semibold text-[18px]">{label}:</span>{" "}
    <span>{getRatingLabel(value)}</span>
  </div>
);

export default FeedbackDetailPage;
