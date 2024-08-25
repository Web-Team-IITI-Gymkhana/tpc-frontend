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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import submit from "../action";
import { createJobEvent } from "@/helpers/api";
import toast from "react-hot-toast";
interface Props {
  jobId: String;
}

export function AddEventDialog({ jobId }: Props) {
  const [type, settype] = useState<string | null>(null);
  const [round, setround] = useState<string | null>(null);
  const [date, setdate] = useState<string | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  return (
    <div className="mx-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Event</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-black">Add An Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-black">
                Event Type
              </Label>
              <Input
                id="name"
                onChange={(e) => {
                  settype(e?.target?.value);
                }}
                className="col-span-3 text-black"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="username"
                className="text-right w-full text-black"
              >
                Round
              </Label>
              <Input
                id="username"
                className="col-span-3 text-black"
                onChange={(e) => {
                  setround(e?.target?.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="username"
                className="text-right w-full text-black"
              >
                Start Date and Time
              </Label>
              <Input
                id="username"
                type="datetime-local"
                onChange={(e) => {
                  setdate(e?.target?.value);
                }}
                className="col-span-3 text-black"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              onClick={async () => {
                setloading(true);
                try {
                  const success = await createJobEvent(
                    jobId,
                    type,
                    round,
                    date,
                  );
                  if (success) {
                    submit("AllEvents");
                  }
                } catch (error) {
                  toast.error("Error creating job event:", error);
                } finally {
                  setloading(false);
                }
              }}
            >
              {loading ? "Submitting..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
