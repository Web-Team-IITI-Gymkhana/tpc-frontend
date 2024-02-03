"use client";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";

interface Props {
  jobId: String;
}

export function PasswordlessLogin() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Send Email");
  return (
    <div className="my-2 col-start-3 col-end-11 md:col-start-4 md:col-end-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full min-w-fit">Passwordless Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-black">Enter your Email</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-black">
                Email
              </Label>
              <Input
                id="name"
                onChange={(e) => {
                  if (loading || status == "Email is Required") {
                    setStatus("Send Email");
                    setTimeout(() => {
                      setLoading(false);
                    }, 500);
                  }
                  setEmail(e?.target?.value);
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
                setLoading(true);
                setStatus("Sending ...");
                if (email == null || email.length == 0) {
                  setStatus("Email is Required");
                  setLoading(false);
                  return;
                }
                await axios
                  .post(`${process.env.BACKEND_URL}/api/v1/auth/passwordless`, {
                    email: email,
                  })
                  .then((response) => {
                    console.log(response);
                    setStatus(response?.data.message);
                  })
                  .catch((error) => {
                    console.log(error);
                    setStatus("Error");
                  });
              }}
            >
              {status}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
