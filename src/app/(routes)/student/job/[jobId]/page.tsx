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
import { Job, CustomEvent, EventData, CalenderEvent } from "@/helpers/student/types";
import { GetJobById } from "@/helpers/student/api";
import Cookies from "js-cookie";

function transformEvents(events: CustomEvent[]): EventData[] {
  

  const currentDate = new Date();


  const sortedEvents = events.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());


  const result: EventData[] = sortedEvents.map(event => {
    const eventDate = new Date(event.startDateTime);
    let status: string;

    if (eventDate < currentDate) {
      status = "older-event";
    } else {
      status = "newer-event";
    }

    return {
      date: eventDate.toLocaleDateString('en-GB'),
      status,
      title: event.type,
    };
  });


  const firstFutureEventIndex = result.findIndex(event => new Date(event.date.split('/').reverse().join('-')) >= currentDate);
  if (firstFutureEventIndex !== -1) {
    result[firstFutureEventIndex].status = "selected";
  } else if (result.length > 0) {

    result[result.length - 1].status = "selected";
  }

  return result;
}

const transformEventsCalender = (jobData: Job): CalenderEvent[] => {
  return jobData.events.map(event => ({
    day: new Date(event.startDateTime).setHours(0, 0, 0, 0),
    description: event.metadata,
    id: event.id,
    label: "red",
    timeFrom: event.startDateTime,
    timeTo: event.endDateTime,
    title: jobData.companyDetailsFilled.name,
  }));
};

const storeCalenderEvents = (jobData: Job) => {
  const transformedEvents = transformEventsCalender(jobData);
  localStorage.setItem('savedEvents', JSON.stringify(transformedEvents));
};

function formatNumber(num: number): string {
  if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

const JobPage = ({ params }: { params: { jobId: string } }) => {

  const [jobData, setJobData] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      const data = await GetJobById(params.jobId, Cookies.get("accessToken"));
      setJobData(data);
      storeCalenderEvents(data);
    };

    fetchJobData();

  }, [params.jobId]);


  return (
    <div className="m-10 bg-white p-5 border-2 rounded-xl">
        {jobData===null? (
          <div>No Data</div>
        ): (
          <>
            <div className="font-semibold text-xl">{jobData?.companyDetailsFilled.name}</div>
            <div className="text-gray-600 font-medium text-sm my-1">
              {jobData?.companyDetailsFilled.address.city}, {jobData?.companyDetailsFilled.address.state}, {jobData?.companyDetailsFilled.address.country}
            </div>
            <div className="my-4">
                <Separator />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 text-sm mx-2">
              <div>
                <div className="text-gray-500 font-semibold my-2">Website</div>{" "}
                <a className="text-blue-500" href={jobData.companyDetailsFilled.website} target="_blank" rel="noopener noreferrer">Link</a>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">Domain</div>{" "}
                <div>
                  {jobData?.companyDetailsFilled.domains.length === 0
                    ? "Not Available"
                    : jobData?.companyDetailsFilled.domains[0]}
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">Category</div>{" "}
                <div>{jobData?.companyDetailsFilled.category}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">Company Size</div>{" "}
                <div>{formatNumber(jobData?.companyDetailsFilled.size ?? 0)}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">Established</div>{" "}
                <div>{jobData?.companyDetailsFilled.yearOfEstablishment}</div>
              </div>
            </div>
            <div className="my-4">
                <Separator />
            </div>
            <h1 className="text-lg font-semibold my-2">Recruiter</h1>
            <Table className="overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{jobData?.recruiterDetailsFilled.name}</TableCell>
                  <TableCell>{jobData?.recruiterDetailsFilled.designation}</TableCell>
                  <TableCell>{jobData?.recruiterDetailsFilled.email}</TableCell>
                  <TableCell>{jobData?.recruiterDetailsFilled.contact}</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
              </TableFooter>
            </Table>
            <div className="my-4">
                <Separator />
            </div>
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
                {jobData?.jobCoordinators.map((coordinator, index) => (
                  <TableRow key={index}>
                    <TableCell>{coordinator.tpcMember.user.name}</TableCell>
                    <TableCell>{coordinator.role}</TableCell>
                    <TableCell>{coordinator.tpcMember.department}</TableCell>
                    <TableCell>{coordinator.tpcMember.user.email}</TableCell>
                    <TableCell>{coordinator.tpcMember.user.contact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
              </TableFooter>
            </Table>
            <div className="my-4">
                <Separator />
            </div>
            <HorizontalTimeline eventsData={transformEvents(jobData.events)} />
            {/* <HorizontalTimeline eventsData={testData} /> */}
            <div className="my-7">
                <Separator />
            </div>
            <div>
              <div className="flex justify-between">
                <div>
                  <Button>
                    <a href={`/student/job/salary/${params.jobId}`} target="_blank" rel="noopener noreferrer">Salary</a>
                  </Button>
                </div>
                <div>
                    <Button>
                      <a href={"/events"} target="_blank" rel="noopener noreferrer">Events</a>
                    </Button>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default JobPage;
