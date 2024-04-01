"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import submit from "../action";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
interface Props {
  jobId: string;
  eventId: string;
}

export function JobDeleteModal({ jobId, eventId }: Props) {
  const [answer, setanswer] = useState<string | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const [open, setopen] = useState<boolean>(false);
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <div
          onClick={() => {
            setopen(true);
          }}
        >
          <MdDelete className="text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-black">Delete Event</DialogTitle>
          <DialogDescription>
            type in <b>Delete</b> to confirm the delete
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4 justify-center !w-full">
            <Input
              onChange={(e) => {
                if (e.target.value != "Delete") {
                  e.target.classList.add("!ring-red-600");
                  e.target.classList.remove("!ring-green-600");
                } else {
                  e.target.classList.remove("!ring-red-600");
                  e.target.classList.add("!ring-green-600");
                }
                setanswer(e.target.value);
              }}
              id="name"
              className="col-span-3 text-black !w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            type="submit"
            onClick={async () => {
              if (answer != "Delete") {
                toast.error("Input Not Matching");
                return;
              }
              setloading(true);
              await axios
                .delete(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${jobId}/events/${eventId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                  },
                )
                .then((response) => {
                  submit("AllEvents");
                  setloading(false);
                  setopen(false);
                  toast.success("Event Deleted");
                })
                .catch((err) => {
                  console.log(err);
                  setopen(false);
                  toast.error("Error Deleting Event");
                });
            }}
          >
            {loading ? "Deleting..." : "Delete Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
