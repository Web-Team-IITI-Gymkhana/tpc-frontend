import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  memberId: string[];
  isDeleteModalOpen: boolean;
}

export default function DeleteStudentModal({
  memberId,
  isDeleteModalOpen,
}: Props) {
  const [answer, setanswer] = React.useState<string | null>(null);
  const { toast } = useToast();
  return (
    <Card className="w-full h-full invert">
      <CardHeader>
        <CardTitle>Delete Student</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <CardDescription>
                Type <b>Delete</b> To Confirm The Delete
              </CardDescription>
              <Input
                onChange={(e) => {
                  if (e.target.value != "Delete") {
                    e.target.classList.add("!ring-cyan-500");
                    e.target.classList.remove("!ring-purple-500");
                  } else {
                    e.target.classList.remove("!ring-cyan-500");
                    e.target.classList.add("!ring-purple-500");
                  }
                  setanswer(e.target.value);
                }}
                id="name"
                placeholder="Name of your project"
                className="mt-2 "
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            isDeleteModalOpen = false;
          }}
        >
          Close
        </Button>
        <Button
          onClick={() => {
            axios.post("", {});
          }}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
