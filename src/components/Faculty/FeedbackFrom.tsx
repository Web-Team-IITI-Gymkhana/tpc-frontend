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
import TextArea from "antd/es/input/TextArea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { updateApproval } from "@/helpers/api";

interface ButtonProps {
  children?: React.ReactNode;
  rows?: any[];
  remarks?: string;
}

const updateApprovalPATCH = (rows: any[], remarks: string, status: string) => {
  var allAppArray = [];
  for (var i = 0; i < rows.length; i++) {
    allAppArray.push({ id: rows[i].id, remarks, status });
  }
  updateApproval(allAppArray);
};

const AcceptButton: React.FC<ButtonProps> = ({
  rows = [],
  children,
  remarks = "",
}) => {
  return (
    <Button
      variant={"default"}
      className="bg-sky-600 mx-4 hover:bg-blue-600"
      onClick={() => {
        updateApprovalPATCH(rows, remarks, "APPROVED");
      }}
    >
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
          strokeMiterlimit="10"
          strokeWidth="3"
          d="M11 20.053L16.964 26.018 30.385 12.598"
        ></path>
      </svg>
    </Button>
  );
};

const RejectButton: React.FC<ButtonProps> = ({
  rows = [],
  children,
  remarks = "",
}) => {
  return (
    <Button
      variant={"destructive"}
      className="bg-red-500 hover:bg-red-400"
      onClick={() => {
        updateApprovalPATCH(rows, remarks, "REJECTED");
      }}
    >
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

interface Props {
  checkedRows: any[]; // Define the prop type as an array of any type
}

const FeedbackForm: React.FC<Props> = ({ checkedRows }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [feedbackText, setFeedbackText] = useState("");

  return (
    <>
      <h4 className="font-semibold text-base my-3">Write Feedback</h4>
      <TextArea
        placeholder="Write Your Feedback Here"
        name="feedback"
        rows={4}
        className="mb-3"
        id="feedback"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
      />
      <Dialog>
        <DialogTrigger>
          {isClient ? <AcceptButton></AcceptButton> : <div>none</div>}
        </DialogTrigger>
        <DialogContent className="text-black">
          Are you sure to Accept the Request?
          {isClient ? (
            <AcceptButton
              rows={checkedRows}
              remarks={feedbackText}
            ></AcceptButton>
          ) : (
            <div>none</div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger>
          {isClient ? <RejectButton></RejectButton> : <div>none</div>}
        </DialogTrigger>
        <DialogContent className="text-black">
          Are you sure to Reject the Request?
          {isClient ? (
            <RejectButton rows={checkedRows}></RejectButton>
          ) : (
            <div>none</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeedbackForm;
