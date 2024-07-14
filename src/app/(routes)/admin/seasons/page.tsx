"use client";
import React from "react";
import { useState, useEffect } from "react";
import { JobEvents } from "@/components/Admin/JobEvents";
import { fetchJobEvents } from "@/helpers/api";
import { EventFC } from "@/helpers/recruiter/types";
import { Button } from "@/components/ui/button";
import { AddEvent } from "@/components/Admin/JobEvents";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";

const EventsPage = ({ params }: { params: { jobId: string } }) => {
  const [events, setData] = useState<[EventFC]>(null);
  const [loading, setLoading] = useState(true);
  const [addEventForm, setAddEventForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await fetchJobEvents(params.jobId);
        setData(jsonData);
      } catch (error) {
        toast.error("Some error occured");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.jobId]);
  return (
    <div className="container my-8">
      <h1 className="text-3xl mb-8 font-bold mx-auto text-center">
        Seasons
      </h1>
      {addEventForm && (
        <AddEvent
          open={addEventForm}
          setOpen={setAddEventForm}
          jobId={params.jobId}
        />
      )}
      <div className="w-full px-4 pb-4 flex justify-end">
        <Button
          onClick={() => {
            setAddEventForm(true);
          }}
        >
          Add Season
        </Button>
      </div>
      {loading && (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      )}
      {events && (
        <div>
          <JobEvents events={events} />
        </div>
      )}
    </div>
  );
};

export default EventsPage;
