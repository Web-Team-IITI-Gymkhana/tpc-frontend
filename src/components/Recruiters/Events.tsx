"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getEvent } from "@/helpers/recruiter/api";
import { EventFC, ApplicationFC } from "@/helpers/recruiter/types";
import { CircularProgress } from "@mui/material";
import { getResume } from "@/helpers/recruiter/api";
import VerifiedIcon from "@mui/icons-material/Verified";

export const JobEvents = ({ events }: { events: [EventFC] }) => {
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
                <td className="px-6 py-4">{event.startDateTime}</td>
                <td className="px-6 py-4">{event.endDateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="text-2xl my-4 text-center font-semibold">Applications</h4>
      {eventId ? (
        <div className="overflow-y-auto">
          <Applications eventId={eventId} />
        </div>
      ) : (
        <div className="text-center mt-4">Select Event to view more</div>
      )}
    </div>
  );
};

export const Applications = ({ eventId }: { eventId: string }) => {
  const [applications, setApplications] = useState<[ApplicationFC]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setApplications(null);
    const fetchData = async () => {
      try {
        const jsonData: EventFC = await getEvent(eventId);
        setApplications(jsonData.applications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    console.log(applications);
  }, [eventId]);

  return (
    <div className="w-full">
      {loading && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}
      {applications && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Roll Number
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Resume
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr
                key={index}
                onClick={() =>
                  getResume(application.resume.filepath)
                }
                className={`bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {application.student.rollNo}
                </th>
                <td className="px-6 py-4">{application.student.user.name}</td>
                <td className="px-6 py-4">{application.student.user.email}</td>
                <td className="px-6 py-4">
                  {application.resume.filepath}{" "}
                  {application.resume.verified && <VerifiedIcon />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
