"use client";
import React from "react";
import { useState, useEffect } from "react";
import { JobEvents } from "@/components/Admin/JobEvents";
import { fetchJobEvents } from "@/helpers/api";
import { EventFC } from "@/helpers/recruiter/types";
import { Button } from "@/components/ui/button";
import { AddEvent,EditEvent } from "@/components/Admin/JobEvents";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";

const EventsPage = ({ params }: { params: { jobId: string } }) => {
  const [events, setData] = useState<EventFC[]>(null);
  const [loading, setLoading] = useState(true);
  const [addEventForm, setAddEventForm] = useState(false);
  const [editEventForm, setEditEventForm] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

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
        Events And Applications
      </h1>
      {editEventForm && editEventId && (
        <EditEvent
          open={editEventForm}
          setOpen={setEditEventForm}
          eventId={editEventId}
          jobId={params.jobId}
        />
      )}
      {addEventForm && (
        <AddEvent
          open={addEventForm}
          setOpen={setAddEventForm}
          jobId={params.jobId}
        />
      )}
      <div className="w-full px-4 pb-4 flex flex-col items-end space-y-2">
        <Button
          onClick={() => {
            setAddEventForm(true);
          }}
        >
          Add Event
        </Button>
        {editEventId && (
        <Button
          onClick={() => {
            setEditEventForm(true);
          }}
        >
          Edit Event
        </Button>
        )}

      </div>
      {loading && (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      )}
      {events && (
        <div>
          <JobEvents editEventID={editEventId} setEditEventId={setEditEventId} events={events} />
        </div>
      )}
    </div>
  );
};

export default EventsPage;
