import jsPDF from "jspdf";

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

/* ---------------- Types ---------------- */

export type FeedbackPdfData = any;

/* ---------------- Core renderer ---------------- */

const renderSingleFeedback = (
  doc: jsPDF,
  feedback: FeedbackPdfData,
  isFirstPage: boolean,
) => {
  if (!isFirstPage) {
    doc.addPage();
  }

  let y = 50;
  const left = 60;
  const right = 535;
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
    const colWidth = usableWidth / 2;

    let maxLines = 1;

    items.slice(0, 2).forEach((item, index) => {
      if (!item.label) return;

      const x = left + index * colWidth;

      doc.setFont(undefined, "bold");
      doc.text(`${item.label}:`, x, y);

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
    doc.text(value || "-", left + 240, y);
    y += lineGap;
  };

  /* ---------------- Header ---------------- */

  centerText("TRAINING AND PLACEMENT OFFICE", 18);
  y += 10;
  centerText("INDIAN INSTITUTE OF TECHNOLOGY, INDORE", 18);
  doc.line(left, y, right, y);
  y += 30;

  centerText("Recruiter Feedback", 14);
  y += 10;

  /* ---------------- General Info ---------------- */

  sectionTitle("General Information");

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

  twoColRow([
    {
      label: "Date",
      value: new Date(feedback.createdAt).toLocaleDateString("en-GB"),
    },
    {
      label: "Season",
      value: `${feedback.season.year} ${feedback.season.type}`,
    },
  ]);

  y += 12;

  /* ---------------- Ratings ---------------- */

  sectionTitle("Feedback Ratings");

  singleLine(
    "Communication Promptness",
    getRatingLabel(feedback.communicationPromptness),
  );
  singleLine(
    "Query Handling",
    getRatingLabel(feedback.queryHandling),
  );
  singleLine(
    "Logistics Arrangement",
    getRatingLabel(feedback.logisticsArrangement),
  );
  singleLine(
    "Student Familiarity",
    getRatingLabel(feedback.studentFamiliarity),
  );
  singleLine(
    "Student Communication",
    getRatingLabel(feedback.studentCommunication),
  );
  singleLine(
    "Resume Quality",
    getRatingLabel(feedback.resumeQuality),
  );
  singleLine(
    "Student Preparedness",
    getRatingLabel(feedback.studentPreparedness),
  );
  singleLine(
    "Discipline & Punctuality",
    getRatingLabel(feedback.disciplineAndPunctuality),
  );

  y += 14;

  /* ---------------- Free Text ---------------- */

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
};

/* ---------------- Public API ---------------- */

export const generateFeedbackPdf = (
  input: FeedbackPdfData | FeedbackPdfData[],
  options?: { fileName?: string },
) => {
  const feedbacks = Array.isArray(input) ? input : [input];

  if (feedbacks.length === 0) return;

  const doc = new jsPDF({ unit: "pt", format: "a4" });

  feedbacks.forEach((feedback, index) => {
    renderSingleFeedback(doc, feedback, index === 0);
  });

  const defaultName =
    feedbacks.length === 1
      ? `Feedback_${feedbacks[0].company.name}_${feedbacks[0].season.year}.pdf`
      : `Recruiter_Feedbacks_${feedbacks[0].season.year}.pdf`;

  doc.save(options?.fileName ?? defaultName);
};
