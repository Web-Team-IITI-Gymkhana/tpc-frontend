"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import HorizontalTimeline from "@/components/HorizontalTimeline";
import {
  Job,
  CustomEvent,
  EventData,
  CalenderEvent,
  StudentEvent,
} from "@/helpers/student/types";
import { GetEventsByJobId, GetJobById } from "@/helpers/student/api";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
import Loader from "@/components/Loader/loader";
import Link from "next/link";
function transformEvents(events: CustomEvent[]): EventData[] {
  const currentDate = new Date();

  const sortedEvents = events.sort(
    (a, b) =>
      new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime(),
  );

  const result: EventData[] = sortedEvents.map((event) => {
    const eventDate = new Date(event.startDateTime);
    let status: string;

    if (eventDate < currentDate) {
      status = "older-event";
    } else {
      status = "newer-event";
    }

    return {
      date: eventDate.toLocaleDateString("en-GB"),
      status,
      title: event.type,
      description: event.metadata,
    };
  });

  const firstFutureEventIndex = result.findIndex(
    (event) =>
      new Date(event.date.split("/").reverse().join("-")) >= currentDate,
  );
  if (firstFutureEventIndex !== -1) {
    result[firstFutureEventIndex].status = "selected";
  } else if (result.length > 0) {
    result[result.length - 1].status = "selected";
  }

  return result;
}

const transformEventsCalender = (jobData: Job): CalenderEvent[] => {
  return jobData.events.map((event) => ({
    day: new Date(event.startDateTime).setHours(0, 0, 0, 0),
    description: event.metadata,
    id: event.id,
    label: "red",
    timeFrom: event.startDateTime,
    timeTo: event.endDateTime,
    title: jobData.company.name,
  }));
};

const storeCalenderEvents = (jobData: Job) => {
  const transformedEvents = transformEventsCalender(jobData);
  localStorage.setItem("savedEvents", JSON.stringify(transformedEvents));
};

function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

function timeAgo(dateString: string): string {
  const date: Date = new Date(dateString);
  const now: Date = new Date();
  const secondsAgo: number = Math.floor(
    (now.getTime() - date.getTime()) / 1000,
  );

  const units: { name: string; seconds: number }[] = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (let unit of units) {
    const interval: number = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return interval === 1
        ? `a ${unit.name} ago`
        : `${interval} ${unit.name}s ago`;
    }
  }

  return "now";
}

function getNextEvent(events: StudentEvent[]) {
  // Sort events by round number to process them in order
  const sortedEvents = events.sort((a, b) => a.roundNumber - b.roundNumber);

  // Look for the first event that is PENDING (next round for the student)
  for (const event of sortedEvents) {
    if (event.studentStatus === "PENDING") {
      return `Upcoming Round ${event.roundNumber}: ${event.type}`;
    }
  }

  // If no PENDING events, check if all events are completed
  const hasAnyPendingOrNotApplied = sortedEvents.some(
    (event) =>
      event.studentStatus === "PENDING" ||
      event.studentStatus === "NOT APPLIED",
  );

  if (!hasAnyPendingOrNotApplied) {
    return "Process Completed";
  }

  return null;
}

function convertDate(date: string) {
  const dateString = new Date(date);
  const formattedDateTime = dateString.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return formattedDateTime;
}

function getStatusClass(status) {
  switch (status) {
    case "PENDING":
      return "text-yellow-500 font-semibold";
    case "CLEARED":
      return "text-green-500 font-semibold";
    case "REJECTED":
      return "text-red-500 font-semibold";
    case "NOT APPLIED":
      return "text-cyan-500 font-semibold";
    default:
      return "";
  }
}

const JobPage = ({ params }: { params: { jobId: string } }) => {
  const [jobData, setJobData] = useState<Job | null>(null);
  const [studentEvents, setStudentEvents] = useState<StudentEvent[]>([]);
  const [closestEvent, setClosestEvent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const data = await GetJobById(params.jobId);
        setJobData(data);
        storeCalenderEvents(data);

        const res = await GetEventsByJobId(params.jobId);
        setStudentEvents(res);
        setClosestEvent(getNextEvent(res));
      } catch (error) {
        toast.error("Error fetching data:");
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [params.jobId]);

  return (
    <>
      <div className="m-10 bg-white p-5 border-2 rounded-xl">
        {loading && (
          <div className="h-screen w-full flex justify-center items-center">
            <Loader />
          </div>
        )}
        {jobData && (
          <>
            {!closestEvent ? (
              <div className="font-semibold text-xl">
                {jobData?.company.name}
              </div>
            ) : (
              <div className="flex justify-between">
                <div className="font-semibold text-xl">
                  {jobData?.company.name}
                </div>
                <div className="text-orange-500 font-bold px-4 py-2 border rounded-full inline-block border-orange-500 text-sm">
                  {closestEvent}
                </div>
              </div>
            )}
            <div className="text-gray-600 font-medium text-sm my-1">
              {jobData?.company.address.city}, {jobData?.company.address.state},{" "}
              {jobData?.company.address.country}
            </div>
            <div className="my-4">
              <Separator />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 text-sm mx-2">
              <div>
                <div className="text-gray-500 font-semibold my-2">Website</div>{" "}
                <a
                  className="text-blue-500"
                  href={jobData?.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">Category</div>{" "}
                <div>{jobData?.company.category}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Company Size
                </div>{" "}
                <div>
                  {jobData?.company.size
                    ? formatNumber(jobData?.company.size)
                    : ""}
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Established
                </div>{" "}
                <div>{jobData?.company.yearOfEstablishment}</div>
              </div>
            </div>
            <div className="my-4">
              <Separator />
            </div>
            {jobData?.company.domains.length > 0 && (
              <>
                <div className="font-semibold text-md"> Domains </div>
                <div className="flex flex-wrap !text-md">
                  {jobData.company.domains.map((domain, index) => (
                    <div key={index} className="mx-2 my-2">
                      <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                        {domain}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="my-4">
                  <Separator />
                </div>
              </>
            )}
            {jobData?.jobCoordinators.length > 0 && (
              <>
                <h1 className="text-lg font-semibold my-2">Job Coordinators</h1>
                <Table className="overflow-hidden">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Mobile Number</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobData.jobCoordinators.map((coordinator, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {coordinator.tpcMember.student.user.name}
                        </TableCell>
                        <TableCell>{coordinator.role}</TableCell>
                        <TableCell>
                          {coordinator.tpcMember.student.program.department}
                        </TableCell>
                        <TableCell>
                          {coordinator.tpcMember.student.user.email}
                        </TableCell>
                        <TableCell>
                          {coordinator.tpcMember.student.user.contact}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="my-4">
                  <Separator />
                </div>
              </>
            )}
            <h1 className="text-lg font-semibold my-2">Events</h1>
            <Table className="overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead>Round</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentEvents.map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>{event.roundNumber}</TableCell>
                    <TableCell>{event.type}</TableCell>
                    <TableCell>{convertDate(event.startDateTime)}</TableCell>
                    <TableCell>{convertDate(event.endDateTime)}</TableCell>
                    <TableCell className={getStatusClass(event.studentStatus)}>
                      {event.studentStatus}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="my-4">
              <Separator />
            </div>
            <div>
              <div className="flex justify-between">
                <div>
                  <Button>
                    <Link
                      href={`/student/job/salary/${params.jobId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Salary
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {jobData && (
        <>
          <div className="m-10 bg-white p-5 border-2 rounded-xl">
            <div className="font-semibold text-xl">FEEDBACKS</div>
            <div className="my-4">
              <Separator />
            </div>
            {jobData.feedbacks.map((feedback, index) => (
              <div
                key={index}
                className="my-4 p-5 bg-gray-500 bg-opacity-20 rounded-md"
              >
                <h1 className="text-lg">
                  {jobData.recruiter.user.name} ({timeAgo(feedback.createdAt)})
                </h1>
                <div className="mx-3">{feedback.remarks}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default JobPage;
