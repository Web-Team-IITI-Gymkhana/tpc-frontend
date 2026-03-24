import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import TextArea from "antd/es/input/TextArea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { updateApproval } from "@/helpers//faculty/api";
import tick from "@/../public/tick.svg";
import cross from "@/../public/cross.svg";

interface ButtonProps {
  children?: React.ReactNode;
  rows?: any[];
  remarks?: string;
  finalButton: boolean;
}

const UpdateApprovalPATCH = (rows: any[], remarks: string, status: string) => {
  for (var i = 0; i < rows.length; i++) {
    updateApproval({
      id: rows[i].id,
      remarks: remarks,
      status: status,
    });
  }
  window.location.reload();
};

const AcceptButton: React.FC<ButtonProps> = ({
  rows = [],
  remarks = "",
  finalButton,
}) => {
  return (
    <Button
      variant={"default"}
      className={`bg-sky-600 mx-2 md:mx-4 hover:bg-blue-600 text-sm md:text-base ${finalButton ? "w-full" : "w-full sm:w-auto"}`}
      onClick={() => {
        if (finalButton) {
          UpdateApprovalPATCH(rows, remarks, "APPROVED");
        }
      }}
    >
      Approve
      <img src={tick.src} className="ml-1 md:ml-2 w-4 h-4" />
    </Button>
  );
};

const RejectButton: React.FC<ButtonProps> = ({
  rows = [],
  remarks = "",
  finalButton,
}) => {
  return (
    <Button
      variant={"destructive"}
      className={`bg-red-500 hover:bg-red-400 text-sm md:text-base ${finalButton ? "w-full" : "w-full sm:w-auto"}`}
      onClick={() => {
        if (finalButton) {
          UpdateApprovalPATCH(rows, remarks, "REJECTED");
        }
      }}
    >
      Reject
      <img src={cross.src} alt="" className="ml-1 md:ml-2 w-4 h-4" />
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
      <h4 className="font-semibold text-sm md:text-base my-3">
        Write Feedback
      </h4>
      <TextArea
        placeholder="Write Your Feedback Here"
        name="feedback"
        rows={4}
        className="mb-3 w-full text-sm md:text-base"
        id="feedback"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
      />
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
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
              <div className="flex justify-center">
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
            <div className="flex justify-center">
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
