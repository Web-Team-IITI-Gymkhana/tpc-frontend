import { Separator } from "@/components/ui/separator";
import { Jobs } from "../../../../../dummyData/job";
import { fetchEachJob, fetchJobEvents } from "@/helpers/api";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/jobs/EventCard";
import { AddEventDialog } from "@/components/jobs/AddEventDialog";

interface Props {
  params: {
    jobId: String;
  };
}

const EachJobPage = async ({ params }: Props) => {
  const EachJob = await fetchEachJob(
    cookies()?.get("accessToken")?.value,
    params.jobId
  );

  const AllEvents = await fetchJobEvents(
    cookies()?.get("accessToken")?.value,
    params.jobId
  );
  return (
    <div className="mx-4 my-6 bg-white p-5 border-2 rounded-xl">
      <div className="font-semibold text-xl">{EachJob?.job?.role}</div>
      <div className="text-gray-600 font-medium text-md my-1">
        {"Bangalore Sahakarnagar 560092 (India,Karnataka)"}
      </div>
      <div className="text-gray-600 font-medium text-md  text-sm mt-4 mb-2">
        {"Work From Home"}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="text-gray-500 font-semibold my-2">Start Date</div>{" "}
          <div>3rd Jan 2024</div>
        </div>
        <div>
          <div className="text-gray-500 font-semibold my-2">Duration</div>{" "}
          <div>3 Months</div>
        </div>
        <div>
          <div className="text-gray-500 font-semibold my-2">Stipend</div>{" "}
          <div>Rs 45000</div>
        </div>
        <div>
          <div className="text-gray-500 font-semibold my-2">Apply By</div>{" "}
          <div>1st Jan 2024</div>
        </div>
      </div>
      <Separator className="my-4" />
      <div>
        <h1 className="text-lg font-semibold my-2">About The Work</h1>
        <ul className="list-disc mx-10">
          <li>
            Build an application in Flutter and connect REST APIs to provide a
            seamless experience to users
          </li>
          <li>
            Take ownership of the application and work alongside backend and
            database engineers to deliver tasks based on timeline
          </li>
          <li>Work with 3rd party services to integrate in app</li>
          <li>
            Attend daily standup calls to discuss team updates and next tasks
          </li>
        </ul>
      </div>

      <div>
        <h1 className="text-lg font-semibold my-2">Skill(s) Required</h1>
        <div className="flex flex-wrap !text-md">
          <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
            Algorithms
          </div>
          <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
            Android
          </div>
          <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
            Data Structures
          </div>
          <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
            Firebase
          </div>
          <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
            iOS
          </div>
          <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
            Flutter
          </div>
          <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
            REST API
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-lg font-semibold my-2">Who can apply</h1>
        <ul className="list-disc mx-10">
          <li> are available for the work from home job/internship</li>
          <li>
            can work from 8:00 pm - 2:00 am Indian Standard Time (as the company
            is based outside of India & their local work timings are 9:30 am -
            3:30 pm Eastern Standard Time)
          </li>
          <li>
            can start the work from home job/internship between 4th Jan24 and
            8th Feb24
          </li>
          <li> are available for duration of 3 months</li>
          <li> have relevant skills and interests</li>
        </ul>
      </div>
      <div>
        <h1 className="text-lg font-semibold my-2">Our Events</h1>
        <div className="mx-10 grid lg:grid-cols-3 grid-cols-1 gap-2">
          {AllEvents?.event?.map((ele: any, index: number) => {
            return (
              <div
                key={index}
                className="flex justify-center items-center my-2"
              >
                <EventCard ele={ele} jobId={params.jobId} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-5 flex justify-between mx-5 items-center">
        <Button>Apply Now</Button>
        <div className="flex justify-center items-center">
          <AddEventDialog jobId={params.jobId} />
          <Button className="mx-2 my-2">Update Job</Button>
          <Button variant={"destructive"} className="mx-2 my-2">
            Delete Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EachJobPage;
