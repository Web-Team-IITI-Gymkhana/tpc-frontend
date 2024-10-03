"use client";
import React from "react";
import { useState, useEffect } from "react";
import { EventFC, ApplicationFC, SalaryFC } from "@/helpers/recruiter/types";
import { CircularProgress, Modal, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  addEvent,
  fetchEventById,
  getResumeFile,
  getStudentSalaryOffers,
  postOnCampusOffer,
  promoteStudent,
  updateEvent
} from "@/helpers/api";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import Select from "react-select";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import Table from "../NewTableComponent/Table";
import generateColumns from "../NewTableComponent/ColumnMapping";

const typeOptions = [
  "POLL",
  "PPT",
  "INTERVIEW",
  "TEST",
  "APPLICATION",
  "COMPLETED",
];

const options = typeOptions.map((option) => ({
  value: option,
  label: option,
}));

export const EditEvent = ({
  open,
  setOpen,
  eventId,
  jobId
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  eventId: string;
  jobId: string;
}) => {
  const [formValues, setFormValues] = useState({
    id: "",
    jobId: "",
    roundNumber: 0,
    type: "",
    metadata: "",
    startDateTime: "",
    endDateTime: "",
    visibleToRecruiter: false,
  });
const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (eventId && open) {
      fetchEventData();

    }

  }, [eventId, open]);

  const fetchEventData = async () => {
    try {
      const eventData = await fetchEventById(eventId);
      setFormValues({
        id: eventData.id,
        jobId: jobId,
        roundNumber: eventData.roundNumber,
        type: eventData.type,
        metadata: eventData.metadata,
        startDateTime: new Date(eventData.startDateTime).toISOString().slice(0, 16),
        endDateTime: new Date(eventData.endDateTime).toISOString().slice(0, 16),
        visibleToRecruiter: eventData.visibleToRecruiter,
      });
      setLoading(false);
    } catch {
      toast.error("Failed to fetch event details.");
    }
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.currentTarget;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const convertToISOFormat = (date: string) => {
    return new Date(date).toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const updatedValues = {
        ...formValues,
        startDateTime: convertToISOFormat(formValues.startDateTime),
        endDateTime: convertToISOFormat(formValues.endDateTime),
      };

      await updateEvent([updatedValues]);
      toast.success("Successfully updated the event");
      window.location.reload();
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
    }
    
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="!text-black flex justify-center items-center"
    >
      
      <div className="p-4 bg-white rounded-xl md:w-1/3 w-11/12">
      {loading && (
        <div className="w-full flex justify-center">
          <CircularProgress />
          </div>
          )}

        {!loading &&(  <form className="max-w-sm mx-auto p-8" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="roundNumber"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Round Number
            </label>
            <input
              type="number"
              name="roundNumber"
              value={formValues.roundNumber}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="0"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Type
            </label>
            <Select
              name="type"
              value={{ value: formValues.type, label: formValues.type }}
              options={options} // Add appropriate options here
              onChange={(value: any) => {
                setFormValues({ ...formValues, type: value.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="metadata"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Metadata
            </label>
            <input
              type="text"
              name="metadata"
              value={formValues.metadata}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="startDateTime"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Start Date
            </label>
            <input
              type="datetime-local"
              name="startDateTime"
              value={formValues.startDateTime}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="endDateTime"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              End Date
            </label>
            <input
              type="datetime-local"
              name="endDateTime"
              value={formValues.endDateTime}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <label className="inline-flex items-center mb-5 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                name="visibleToRecruiter"
                checked={formValues.visibleToRecruiter}
                onChange={handleChange}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Visible To Recruiters
              </span>
            </label>
          </div>
          <Button type="submit">Update Event</Button>
        </form>
        )}
      </div>
    </Modal>
  );
};

export const AddEvent = ({
  open,
  setOpen,
  jobId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  jobId: string;
}) => {
  const [formValues, setFormValues] = useState({
    jobId: jobId,
    roundNumber: 0,
    type: "",
    metadata: "",
    startDateTime: "",
    endDateTime: "",
    visibleToRecruiter: false,
  });

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.currentTarget;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEvent([formValues]);
      toast.success("Successfully added");
      window.location.reload();
    } catch {
      toast.error("Some Error Occured");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="!text-black flex justify-center items-center"
    >
      <div className="p-4 bg-white rounded-xl md:w-1/3 w-11/12">
        <form className="max-w-sm mx-auto p-8" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="roundNumber"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Round Number
            </label>
            <input
              type="number"
              name="roundNumber"
              value={formValues.roundNumber}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="0"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Type
            </label>
            <Select
              name="type"
              value={{ value: formValues.type, label: formValues.type }}
              // @ts-ignore
              options={options}
              onChange={(value: any) => {
                setFormValues({ ...formValues, type: value.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            ></Select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="metadata"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Metadata
            </label>
            <input
              type="text"
              name="metadata"
              value={formValues.metadata}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="startDateTime"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Start Date
            </label>
            <input
              type="datetime-local"
              name="startDateTime"
              value={formValues.startDateTime}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="endDateTime"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              End Date
            </label>
            <input
              type="datetime-local"
              name="endDateTime"
              value={formValues.endDateTime}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <label className="inline-flex items-center mb-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                name="visibleToRecruiter"
                checked={formValues.visibleToRecruiter}
                onChange={handleChange}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Visible To Recruiters
              </span>
            </label>
          </div>
          <Button type="submit">Add Event</Button>
        </form>
      </div>
    </Modal>
  );
};

const PromoteStudent = ({
  open,
  students,
  onClose,
  events,
}: {
  open: boolean;
  students: any[];
  onClose: () => void;
  events: EventFC[];
}) => {
  const [roundNumber, setRoundNumber] = useState<number>(0);
  const studentIds = students.map((student) => student.id);
  const [eventId, setEventId] = useState<string>();
  useEffect(() => {
    const setCurrentEvent = events.forEach((event) => {
      if (event.roundNumber == roundNumber) {
        setEventId(event.id);
        return event;
      }
    });
    setCurrentEvent;
  }, [roundNumber]);

  const updateEvent = async () => {
    console.log(studentIds);
    await promoteStudent({ studentIds }, eventId);
    toast.success("Successfully promoted!");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="w-full h-full flex justify-center items-center text-black"
    >
      <div className="bg-white p-8 rounded-xl">
        <div>
          Promote / Demote students :{" "}
          {students.map((student) => `${student.user.name}, `)} to <br />
          <label
            htmlFor="number-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Round Number:
          </label>
          <NumberInput
            id="number-input"
            value={roundNumber}
            onChange={(event, newValue) => {
              setRoundNumber(newValue);
            }}
            max={events.length}
            min={0}
            slotProps={{
              input: {
                className:
                  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              },
            }}
            placeholder="0"
            required
          />
          <Button
            className="w-full mt-4"
            onClick={() => {
              updateEvent();
            }}
          >
            Promote / Demote
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const MakeJobOfferModal = ({
  open,
  students,
  onClose,
  lastEvent,
}: {
  open: boolean;
  students: any[];
  onClose: () => void;
  lastEvent: EventFC;
}) => {
  const studentIds = students.map((student) => student.id);
  const [salaries, setSalaries] = useState<SalaryFC[]>();
  const columns = generateColumns([
    {
      select: "",
      baseSalary: 0,
      totalCTC: 0,
      takeHomeSalary: 0,
      grossSalary: 0,
      otherCompensations: 0,
      salaryPeriod: "string",
      job: {
        role: "string",
        company: {
          name: "string",
        },
      },
    },
  ]);

  const makeOffer = async (salaryId: string) => {
    await postOnCampusOffer([
      {
        salaryId: salaryId,
        studentId: studentIds[0],
        status: "ACCEPTED",
      },
    ]);
    toast.success("Made a successful offer!");
    window.location.reload();
  };

  useEffect(() => {
    const fetchSalaries = async () => {
      const salaries = await getStudentSalaryOffers(
        lastEvent.job.id,
        studentIds[0],
      );
      const newSalaries = salaries.map((salary) => ({
        select: (
          <Button
            onClick={() => {
              makeOffer(salary.id);
            }}
          >
            Select
          </Button>
        ),
        ...salary,
      }));
      setSalaries(newSalaries);
    };
    fetchSalaries();
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="w-full h-full flex justify-center items-center text-black"
    >
      <div className="bg-white p-8 rounded-xl max-w-[90vw]">
        <div>
          <Typography
            variant="h4"
            fontFamily={"inherit"}
            fontWeight={"bold"}
            align="center"
          >
            Select Salary
          </Typography>
          {salaries ? (
            <div className="max-w-full">
              <Table
                data={salaries}
                columns={columns}
                type={"salary"}
                buttonText="Make Offer"
              />
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export const JobEvents = ({ events, editEventID, setEditEventId }: { events: EventFC[], editEventID: string, setEditEventId: (id: string) => void }) => {
  const [eventId, setEventId] = useState<string>(null);

  const changeApplications = (eventId: string) => {
    setEventId(eventId);
  };

  return (
    <div>
      <div className="overflow-y-auto">
        <table className="w-full overflow-y-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Round Number
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Meta Data
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                End Date
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${
                  eventId === event.id
                    ? `bg-blue-200 dark:bg-sky-800 hover:bg-sky-100 dark:hover:bg-sky-700`
                    : `bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600`
                } border-b dark:border-gray-700`}
                onClick={() => {
                  setEditEventId(event.id);
                  changeApplications(event.id);
                }}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {event.roundNumber}
                </th>
                <td className="px-6 py-4">{event.type}</td>
                <td className="px-6 py-4">{event.metadata}</td>
                <td className="px-6 py-4">
                  {new Date(event.startDateTime).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {new Date(event.endDateTime).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="text-2xl my-4 text-center font-semibold">Applications</h4>
      {eventId ? (
        <div className="overflow-y-auto">
          <Applications eventId={eventId} events={events} />
        </div>
      ) : (
        <div className="text-center mt-4">Select Event to view more</div>
      )}
    </div>
  );
};

export const Applications = ({
  eventId,
  events,
}: {
  eventId: string;
  events: EventFC[];
}) => {
  const [applications, setApplications] = useState<ApplicationFC[]>(null);
  var lastEvent: EventFC;
  events.forEach((event) => {
    if (lastEvent) {
      if (lastEvent.roundNumber < event.roundNumber) {
        lastEvent = event;
      }
    } else {
      lastEvent = event;
    }
  });
  const [loading, setLoading] = useState(true);
  const [promoteStudents, setPromoteStudents] = useState<any[]>([]);
  const [seed, setSeed] = useState(0);

  const columns = generateColumns([
    {
      student: {
        rollNo: "string",
        user: {
          name: "string",
          email: "string",
        },
      },
      resume: {
        resumeFile: "string",
      },
    },
  ]);

  useEffect(() => {
    setLoading(true);
    setApplications(null);
    const fetchData = async () => {
      try {
        const jsonData: EventFC = await fetchEventById(eventId);
        const applications = jsonData.applications.map((application) => ({
          ...application,
          resume: {
            ...application.resume,
            resumeFile: (
              <Button
                onClick={async () => {
                  const resume = await getResumeFile(
                    application.resume.filepath,
                  );
                }}
              >
                View Resume{" "}
                {application.resume.verified && (
                  <VerifiedIcon sx={{ marginLeft: "1rem" }} />
                )}
              </Button>
            ),
          },
        }));
        setApplications(applications);
      } catch (error) {
        toast.error("Some error occured");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId, seed]);

  return (
    <div className="w-full">
      {lastEvent.id == eventId && promoteStudents.length > 0 ? (
        <MakeJobOfferModal
          open={promoteStudents.length > 0}
          students={promoteStudents}
          onClose={() => {
            setPromoteStudents([]);
            setSeed(seed + 1);
          }}
          lastEvent={lastEvent}
        />
      ) : (
        <PromoteStudent
          open={promoteStudents.length > 0}
          students={promoteStudents}
          onClose={() => {
            setPromoteStudents([]);
            setSeed(seed + 1);
          }}
          events={events}
        />
      )}
      {loading && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}
      {applications && (
        <Table
          data={applications}
          columns={columns}
          type={"application"}
          buttonText={lastEvent.id == eventId ? "Make Offer" : "Promote"}
          buttonAction={(students) => {
            console.log(students);
            setPromoteStudents(students.map((student) => student.student));
          }}
        />
      )}
    </div>
  );
};
