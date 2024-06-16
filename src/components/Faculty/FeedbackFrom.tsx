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
import { updateApproval } from "@/helpers//faculty/api";
import Cookies from "js-cookie";
import tick from "@/../public/tick.svg";
import cross from "@/../public/cross.svg";

interface ButtonProps {
  children?: React.ReactNode;
  rows?: any[];
  remarks?: string;
  finalButton: boolean;
}

const UpdateApprovalPATCH = (rows: any[], remarks: string, status: string) => {
  var allAppArray: any[] = [];
  for (var i = 0; i < rows.length; i++) {
    allAppArray.push({ id: rows[i].id, remarks, status });
  }
  updateApproval(Cookies.get("accessToken"), allAppArray);
  window.location.reload();
};

const AcceptButton: React.FC<ButtonProps> = ({
  rows = [],
  children,
  remarks = "",
  finalButton,
}) => {
  return (
    <Button
      variant={"default"}
      className="bg-sky-600 mx-4 hover:bg-blue-600"
      onClick={() => {
        if (finalButton) {
          UpdateApprovalPATCH(rows, remarks, "APPROVED");
        }
      }}
    >
      Approve
      <img src={tick.src} />
    </Button>
  );
};

const RejectButton: React.FC<ButtonProps> = ({
  rows = [],
  children,
  remarks = "",
  finalButton,
}) => {
  return (
    <Button
      variant={"destructive"}
      className="bg-red-500 hover:bg-red-400"
      onClick={() => {
        if (finalButton) {
          UpdateApprovalPATCH(rows, remarks, "REJECTED");
        }
      }}
    >
      Reject
      <img src={cross.src} alt="" />
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
        className="mb-3 w-full"
        id="feedback"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
      />
      <div className="flex flex-row">
        <Dialog>
          <DialogTrigger asChild>
            <div>
              {isClient ? (
                <AcceptButton finalButton={false} />
              ) : (
                <div>none</div>
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="text-black">
            Are you sure to Accept the Request?
            <DialogClose asChild>
              <div>
                {isClient ? (
                  <AcceptButton
                    rows={checkedRows}
                    remarks={feedbackText}
                    finalButton
                  />
                ) : (
                  <div>none</div>
                )}
              </div>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <div>
              {isClient ? (
                <RejectButton finalButton={false} />
              ) : (
                <div>none</div>
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="text-black">
            Are you sure to Reject the Request?
            <DialogClose asChild>
              <div>
                {isClient ? (
                  <RejectButton
                    rows={checkedRows}
                    remarks={feedbackText}
                    finalButton
                  />
                ) : (
                  <div>none</div>
                )}
              </div>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default FeedbackForm;
