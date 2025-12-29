"use client";

import { fetchFeedbackById } from "@/helpers/api";
import { useEffect, useRef, useState } from "react";
import Loader from "@/components/Loader/loader";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

const FeedbackDetailPage = ({ params }: any) => {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<any>();
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchFeedbackById(params.id);
      setFeedback(data);
      setLoading(false);
    };
    getData();
  }, [params.id]);

  const downloadPdf = () => {
    const doc = new jsPDF();

    let y = 15;

    const addLine = (label: string, value: string) => {
      doc.text(`${label}: ${value}`, 10, y);
      y += 8;
    };

    doc.setFontSize(16);
    doc.text("Recruiter Feedback", 10, y);
    y += 12;

    doc.setFontSize(11);

    addLine("Recruiter Name", feedback.recruiter.user.name);
    addLine("Recruiter Email", feedback.recruiter.user.email);
    addLine("Designation", feedback.recruiter.designation);
    addLine("Company", feedback.company.name);
    addLine(
      "Season",
      `${feedback.season.year} ${feedback.season.type}`,
    );

    y += 6;
    doc.setFontSize(13);
    doc.text("Feedback Scores", 10, y);
    y += 8;

    doc.setFontSize(11);
    addLine("Communication Promptness", String(feedback.communicationPromptness ?? "-"));
    addLine("Query Handling", String(feedback.queryHandling ?? "-"));
    addLine("Logistics Arrangement", String(feedback.logisticsArrangement ?? "-"));
    addLine("Student Familiarity", String(feedback.studentFamiliarity ?? "-"));
    addLine("Student Communication", String(feedback.studentCommunication ?? "-"));
    addLine("Resume Quality", String(feedback.resumeQuality ?? "-"));
    addLine("Student Preparedness", String(feedback.studentPreparedness ?? "-"));
    addLine("Discipline & Punctuality", String(feedback.disciplineAndPunctuality ?? "-"));

    y += 6;
    doc.setFontSize(13);
    doc.text("Right time to contact", 10, y);
    y += 8;

    doc.setFontSize(11);
    const rightTimeToContact = feedback.rightTimeToContact || "-";
    const wrappedrtcText = doc.splitTextToSize(rightTimeToContact, 180);
    doc.text(wrappedrtcText, 10, y);

    y += 16;
    doc.setFontSize(13);
    doc.text("Recommendations", 10, y);
    y += 8;

    doc.setFontSize(11);
    const recommendations = feedback.recommendations || "-";
    const wrappedText = doc.splitTextToSize(recommendations, 180);
    doc.text(wrappedText, 10, y);

    doc.save(
      `Feedback_${feedback.company.name}_${feedback.season.year}.pdf`,
    );
  };

  if (loading) {
    return (
      <div className="h-64 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="m-6 md:m-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recruiter Feedback</h1>
        <Button onClick={downloadPdf}>Download PDF</Button>
      </div>

      {/* ================= PDF CONTENT ================= */}
      <div ref={pdfRef} className="bg-white p-6 rounded border">
        <Info label="Recruiter Name" value={feedback.recruiter.user.name} />
        <Info label="Recruiter Email" value={feedback.recruiter.user.email} />
        <Info label="Designation" value={feedback.recruiter.designation} />
        <Info label="Company" value={feedback.company.name} />
        <Info
          label="Season"
          value={`${feedback.season.year} ${feedback.season.type}`}
        />

        <h2 className="text-xl font-semibold mt-6 mb-3">
          Feedback Details
        </h2>

        <Rating label="Communication Promptness" value={feedback.communicationPromptness} />
        <Rating label="Query Handling" value={feedback.queryHandling} />
        <Rating label="Logistics Arrangement" value={feedback.logisticsArrangement} />
        <Rating label="Student Familiarity" value={feedback.studentFamiliarity} />
        <Rating label="Student Communication" value={feedback.studentCommunication} />
        <Rating label="Resume Quality" value={feedback.resumeQuality} />
        <Rating label="Student Preparedness" value={feedback.studentPreparedness} />
        <Rating label="Discipline & Punctuality" value={feedback.disciplineAndPunctuality} />

        <div className="mt-4">
          <p className="text-sm text-gray-500">Right time to contact</p>
          <p className="mt-1">{feedback.rightTimeToContact || "-"}</p>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">Recommendations</p>
          <p className="mt-1">{feedback.recommendations || "-"}</p>
        </div>
      </div>
        
    </div>
  );
};

const Info = ({ label, value }: any) => (
  <div className="mb-2">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const Rating = ({ label, value }: any) => (
  <div className="mb-1">
    <span className="font-medium">{label}:</span> {value ?? "-"}
  </div>
);

export default FeedbackDetailPage;
