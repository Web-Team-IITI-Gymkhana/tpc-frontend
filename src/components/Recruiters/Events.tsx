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
export const JobEvents = ({ events, jobId }: { events: [EventFC], jobId: string }) => {
  const [eventId, setEventId] = useState<string>(null);
  const changeApplications = (eventId: string) => {
    setEventId(eventId);
  };

  return (
    <div>
      <div className="overflow-y-auto">
        <table className="w-full overflow-y-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Round Number
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Meta Data
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
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
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {event.roundNumber}
                </th>
                <td className="px-6 py-4">{event.type}</td>
                <td className="px-6 py-4">{event.metadata}</td>
                <td className="px-6 py-4">{new Date(event.startDateTime).toLocaleString()}</td>
                <td className="px-6 py-4">{new Date(event.endDateTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="text-2xl my-4 text-center font-semibold">Applications</h4>
      {eventId ? (
        <div className="overflow-y-auto">
          <Applications eventId={eventId} jobId={jobId} />
        </div>
      ) : (
        <div className="text-center mt-4">Select Event to view more</div>
      )}
    </div>
  );
};

export const Applications = ({
  eventId,
  jobId
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
          application.resume.resumeFile = <span className="cursor-pointer" onClick={() => getResume(application.resume.filepath)}>{application.resume.filepath} {application.resume.verified && <VerifiedIcon />}</span>;
        })
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
    if(c1){
      toast.success("Feedback Posted");
    }
    else{
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
  }

  return (
    <div className="w-full">
      <Modal open={open} onClose={handleCloseModal} className="flex justify-center items-center">
          <div className="p-4 w-full md:w-1/2 bg-white rounded-xl border-2 border-gray-400">
            <h2 className="text-xl font-semibold">Post Feedback</h2>
            <input
              type="text"
              value={feedbackText}
              onChange={handleFeedbackChange}
              placeholder="Enter your feedback"
              className="w-full mt-2 p-2 border border-gray-300 rounded text-black"
            />
            <div className="flex justify-end mt-4">
              <Button onClick={handleCloseModal} variant="destructive">
                Cancel
              </Button>
              <Button onClick={handlePostFeedback} variant="default" className="ml-2">
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
          buttonText={"Give Feedback"}
          buttonAction={handleFeedback}
          showExport={false}
        />
      )}
    </div>
  );
};
