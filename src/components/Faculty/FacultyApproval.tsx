import React, { useState } from "react";
import { Separator } from "../ui/separator";
import TextArea from "antd/es/input/TextArea";
import { Button, buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
interface Props {
  company: {
    id: string;
    name: string;
  };
  jaf: {
    id: string;
    seasonId: string;
    recruiterId: string;
    companyId: string;
    role: string;
    metadata: string;
    docs: string;
    publicAccess: boolean;
    eligibilityCpi: number;
    status: string;
    events: {
      id: string;
      name: string;
      date: string;
    }[];
    tpcCoordinators: {
      id: string;
      name: string;
    }[];
    facultyCoordinatorApprovals: {
      id: string;
      facultyId: string;
      approvalStatus: string;
    }[];
    onCampusOffers: {
      id: string;
      name: string;
      offerStatus: string;
    }[];
    rolesOffered: {
      id: string;
      roleName: string;
    }[];
  };
  children?: React.ReactNode;
}

interface ButtonProps {
  children?: React.ReactNode;
}

const AcceptButton: React.FC<ButtonProps> = ({ children }) => {
  return (
    <Button variant={"default"} className="bg-sky-600 mx-4 hover:bg-blue-600">
      Approve
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="2rem"
        height="2rem"
        viewBox="0 0 40 40"
        className="ml-2"
      >
        <path
          fill="#8bb7f0"
          d="M4.769,37.5c-1.251,0-2.269-1.018-2.269-2.269V4.769C2.5,3.518,3.518,2.5,4.769,2.5h30.462 c1.251,0,2.269,1.018,2.269,2.269v30.462c0,1.251-1.018,2.269-2.269,2.269H4.769z"
        ></path>
        <path
          fill="#4e7ab5"
          d="M35.231,3C36.206,3,37,3.794,37,4.769v30.462C37,36.206,36.206,37,35.231,37H4.769 C3.794,37,3,36.206,3,35.231V4.769C3,3.794,3.794,3,4.769,3H35.231 M35.231,2H4.769C3.24,2,2,3.24,2,4.769v30.462 C2,36.76,3.24,38,4.769,38h30.462C36.76,38,38,36.76,38,35.231V4.769C38,3.24,36.76,2,35.231,2L35.231,2z"
        ></path>
        <path
          fill="none"
          stroke="#fff"
          stroke-miterlimit="10"
          stroke-width="3"
          d="M11 20.053L16.964 26.018 30.385 12.598"
        ></path>
      </svg>
    </Button>
  );
};

const RejectButton: React.FC<ButtonProps> = ({ children }) => {
  return (
    <Button variant={"destructive"} className="bg-red-500 hover:bg-red-400">
      Reject
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="2rem"
        height="2rem"
        viewBox="0 0 48 48"
      >
        <path
          fill="#f44336"
          d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
        ></path>
        <path
          fill="#fff"
          d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
        ></path>
        <path
          fill="#fff"
          d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
        ></path>
      </svg>
    </Button>
  );
};

export default function JAFCard({ company, jaf, children }: Props) {
  let [showDetail, updateShowDetail] = useState(false);

  function onClick() {
    updateShowDetail(!showDetail);
  }

  return (
    <div className="w-full px-4 md:px-8 py-6 border-2 border-gray-200 bg-white rounded-2xl hover:border-blue-200">
      <div onClick={onClick} className="hover:cursor-pointer">
        <h2 className="text-lg sm:text-xl text-gray-900 font-bold title-font mb-2">
          {company.name}
        </h2>
        <h4 className="mb-2"> {jaf.role} </h4>
        <div className="flex md:flex-row flex-col justify-between bg-slate-100 p-4 rounded-xl">
          <div className="flex md:flex-col flex-row md:pr-4 justify-between mb-1">
            <div className="font-semibold">Industry</div>
            <div>IT</div>
          </div>
          <div className="flex md:flex-col flex-row md:pr-4 justify-between mb-1">
            <div className="font-semibold">Job Type</div>
            <div>Full Time</div>
          </div>
          <div className="flex md:flex-col flex-row md:pr-4 justify-between mb-1">
            <div className="font-semibold">Offer Range</div>
            <div>20-50 LPA</div>
          </div>
          <div className="flex md:flex-col flex-row md:pr-4 justify-between mb-1">
            <div className="font-semibold">Placement Drive</div>
            <div>{jaf.events[0].date}</div>
          </div>
          <div className="flex md:flex-col flex-row md:pr-4 justify-between mb-1">
            <div className="font-semibold">Technical Interview</div>
            <div>{jaf.events[0].date}</div>
          </div>
        </div>
      </div>

      {showDetail && (
        <div className="my-4 mx-1">
          <h3 className="font-semibold text-base">About the Offer</h3>
          <div className="my-1">
            <ul className="list-disc ml-8">
              <li>Minimun CPI: {jaf.eligibilityCpi}</li>
              <li>Course: BTech</li>
            </ul>
          </div>
          <Separator />
          <h4 className="font-semibold text-base my-3">Write Feedback</h4>
          <TextArea
            placeholder="Write Your Feedback Here"
            autoFocus={true}
            name="feedback"
            rows={4}
            className="mb-3"
          />
          <Dialog>
            <DialogTrigger>
              <AcceptButton />
            </DialogTrigger>
            <DialogContent className="text-black">
              Are you sure to Accept the Request?
              <AcceptButton />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <RejectButton />
            </DialogTrigger>
            <DialogContent className="text-black">
              Are you sure to Reject the Request?
              <RejectButton />
            </DialogContent>
          </Dialog>
          {children}
        </div>
      )}
    </div>
  );
}
