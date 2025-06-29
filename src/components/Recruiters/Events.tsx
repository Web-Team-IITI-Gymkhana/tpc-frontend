"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getEvent, postFeedback } from "@/helpers/recruiter/api";
import { EventFC, ApplicationFC } from "@/helpers/recruiter/types";
import { Modal } from "@mui/material";
import { getResume } from "@/helpers/recruiter/api";
import VerifiedIcon from "@mui/icons-material/Verified";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import generateColumns from "../NewTableComponent/ColumnMapping";
import Table from "../NewTableComponent/Table";
export const JobEvents = ({
  events,
  jobId,
}: {
  events: EventFC[];
  jobId: string;
}) => {
  const [eventId, setEventId] = useState<string>(null);
  const changeApplications = (eventId: string) => {
    setEventId(eventId);
  };

  return (
    <div className="space-y-4">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 md:px-6 py-3">
                Round Number
              </th>
              <th scope="col" className="px-3 md:px-6 py-3">
                Type
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 hidden sm:table-cell"
              >
                Meta Data
              </th>
              <th scope="col" className="px-3 md:px-6 py-3">
                Start Date
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 hidden md:table-cell"
              >
                End Date
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${
                  eventId === event.id
                    ? `bg-blue-200 dark:bg-sky-800 hover:bg-sky-100 dark:hover:bg-sky-700`
                    : `bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600`
                } border-b dark:border-gray-700`}
                onClick={() => {
                  changeApplications(event.id);
                }}
              >
                <th
                  scope="row"
                  className="px-3 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {event.roundNumber}
                </th>
                <td className="px-3 md:px-6 py-4">{event.type}</td>
                <td className="px-3 md:px-6 py-4 hidden sm:table-cell">
                  {event.metadata}
                </td>
                <td className="px-3 md:px-6 py-4">
                  <span className="block sm:hidden">
                    {new Date(event.startDateTime).toLocaleDateString()}
                  </span>
                  <span className="hidden sm:block">
                    {new Date(event.startDateTime).toLocaleString()}
                  </span>
                </td>
                <td className="px-3 md:px-6 py-4 hidden md:table-cell">
                  {new Date(event.endDateTime).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="text-xl md:text-2xl my-4 text-center font-semibold">
        Applications
      </h4>
      {eventId ? (
        <div className="overflow-hidden">
          <Applications eventId={eventId} jobId={jobId} />
        </div>
      ) : (
        <div className="text-center mt-4 p-4 bg-gray-50 rounded-lg">
          Select Event to view more
        </div>
      )}
    </div>
  );
};

export const Applications = ({
  eventId,
  jobId,
}: {
  eventId: string;
  jobId: string;
}) => {
  const [applications, setApplications] = useState<[ApplicationFC]>(null);
  const [loading, setLoading] = useState(true);
  const [seed, setSeed] = useState(0);
  const [open, setOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [studentIds, setStudentIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData: EventFC = await getEvent(eventId);
        jsonData.applications.forEach(async (application) => {
          // Create display filename in format: resumename.pdf
          const resumeName = application.resume.name || "resume";
          const displayName = resumeName.endsWith(".pdf")
            ? resumeName
            : `${resumeName}.pdf`;

          application.resume.resumeFile = (
            <span
              className="cursor-pointer"
              onClick={() => getResume(application.resume.filepath)}
            >
              {displayName} {application.resume.verified && <VerifiedIcon />}
            </span>
          );
        });
        setApplications(jsonData.applications);
      } catch (error) {
        toast.error("Error Fetching Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackText(event.currentTarget.value);
  };
  const handlePostFeedback = async () => {
    const c1 = await postFeedback(jobId, feedbackText, studentIds);
    if (c1) {
      toast.success("Feedback Posted");
    } else {
      toast.error("Error Posting Feedback");
    }
    handleCloseModal();
    setSeed(seed + 1);
  };

  const columns = generateColumns([
    {
      student: {
        rollNo: "string",
        user: {
          name: "string",
          email: "string",
        },
      },
      resume: {
        resumeFile: "string",
      },
    },
  ]);

  const handleFeedback = (applications: any) => {
    const studentIds = applications.map((student) => student.student.id);
    setStudentIds(studentIds);
    handleOpenModal();
  };

  return (
    <div className="w-full">
      <Modal
        open={open}
        onClose={handleCloseModal}
        className="flex justify-center items-center p-4"
      >
        <div className="p-4 md:p-6 w-full max-w-md md:max-w-lg bg-white rounded-xl border-2 border-gray-400 mx-4">
          <h2 className="text-lg md:text-xl font-semibold">Post Feedback</h2>
          <input
            type="text"
            value={feedbackText}
            onChange={handleFeedbackChange}
            placeholder="Enter your feedback"
            className="w-full mt-2 p-2 border border-gray-300 rounded text-black text-sm md:text-base"
          />
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <Button
              onClick={handleCloseModal}
              variant="destructive"
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePostFeedback}
              variant="default"
              className="w-full sm:w-auto"
            >
              Give Feedback
            </Button>
          </div>
        </div>
      </Modal>
      {loading && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
      {applications && (
        <Table
          data={applications}
          columns={columns}
          type={"application"}
          buttonText={"Direct feedback to students"}
          buttonAction={handleFeedback}
          showExport={false}
        />
      )}
    </div>
  );
};
