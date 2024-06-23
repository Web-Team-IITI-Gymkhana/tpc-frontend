"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getEvent, JobDetailFC } from "@/helpers/recruiter/api";
import Cookies from "js-cookie";
import loadingImg from "@/../public/loadingSpinner.svg";
import { EventFC, ApplicationFC } from "@/helpers/recruiter/api";
import { CircularProgress } from "@mui/material";

export const JobEvents = ({ events }: { events: [EventFC] }) => {
  const [eventId, setEventId] = useState<string>(null);

  const changeApplications = (eventId: string) => {
    setEventId(eventId);
  };

  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
      <h4 className="text-2xl my-4 text-center font-semibold">Applications</h4>
      {eventId ? (
        <Applications eventId={eventId} />
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
        const jsonData: EventFC = await getEvent(
          Cookies.get("accessToken"),
          eventId
        );
        setApplications(jsonData.applications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
                Application ID
              </th>
              <th scope="col" className="px-6 py-3">
                Resume
              </th>
              <th scope="col" className="px-6 py-3">
                Verified
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr
                key={index}
                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {application.id}
                </th>
                <td className="px-6 py-4">{application.resume.filepath}</td>
                <td className="px-6 py-4">
                  {application.resume.verified ? "Verified" : "In Process"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};