"use client";
import React from "react";
import { useState, useEffect } from "react";
import { EventFC, ApplicationFC } from "@/helpers/season/types";
import { CircularProgress, Modal, Typography } from "@mui/material";
import { seasonDTO } from "@/dto/SeasonDto";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  addEvent,
  fetchEventById,
  fetchSeasonData,
  getResumeFile,
  getStudentSalaryOffers,
  postOnCampusOffer,
  promoteStudent,
} from "@/helpers/api";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import Select from "react-select";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import Table from "../NewTableComponent/Table";
import generateColumns from "../NewTableComponent/ColumnMapping";
import { addSeason } from "@/helpers/api";
import { updateRegistrationStatus} from "@/helpers/api";
const hiddenColumns = [
  "id",
  "registered",
  "season.id",
  "student.id",
  "student.program.id",
  "student.user.id",
];
const typeOptions = [
  "INTERN",
  "PLACEMENT"
];

const options = typeOptions.map((option) => ({
  value: option,
  label: option,
  
}));

export const AddSeason = ({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [formValues, setFormValues] = useState({
    year: "",
    type: ""
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
      await addSeason([formValues]);
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
              Year
            </label>
            <input
              type="text"
              name="year"
              value={formValues.year}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
          <Button type="submit">Add Event</Button>
        </form>
      </div>
    </Modal>
  );
};

// const PromoteStudent = ({
//   open,
//   students,
//   onClose,
//   events,
// }: {
//   open: boolean;
//   students: any[];
//   onClose: () => void;
//   events: EventFC[];
// }) => {
//   const [roundNumber, setRoundNumber] = useState<number>(0);
//   const studentIds = students.map((student) => student.id);
//   const [eventId, setEventId] = useState<string>();
//   useEffect(() => {
//     const setCurrentEvent = events.forEach((event) => {
//       if (event.roundNumber == roundNumber) {
//         setEventId(event.id);
//         return event;
//       }
//     });
//     setCurrentEvent;
//   }, [roundNumber]);

//   const updateEvent = async () => {
//     await promoteStudent({ studentIds }, eventId);
//     toast.success("Successfully promoted!");
//     onClose();
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       className="w-full h-full flex justify-center items-center text-black"
//     >
//       <div className="bg-white p-8 rounded-xl">
//         <div>
//           Promote / Demote students :{" "}
//           {students.map((student) => `${student.name}, `)} to <br />
//           <label
//             htmlFor="number-input"
//             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Round Number:
//           </label>
//           <NumberInput
//             id="number-input"
//             value={roundNumber}
//             onChange={(event, newValue) => {
//               setRoundNumber(newValue);
//             }}
//             max={events.length}
//             min={0}
//             slotProps={{
//               input: {
//                 className:
//                   "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
//               },
//             }}
//             placeholder="0"
//             required
//           />
//           <Button
//             className="w-full mt-4"
//             onClick={() => {
//               updateEvent();
//             }}
//           >
//             Promote / Demote
//           </Button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// const MakeJobOfferModal = ({
//   open,
//   students,
//   onClose,
//   events,
//   lastEvent,
// }: {
//   open: boolean;
//   students: any[];
//   onClose: () => void;
//   events: EventFC[];
//   lastEvent: EventFC;
// }) => {
//   const studentIds = students.map((student) => student.id);
//   const [salaries, setSalaries] = useState<SalaryFC[]>();
//   const columns = generateColumns([
//     {
//       select: "",
//       baseSalary: 0,
//       totalCTC: 0,
//       takeHomeSalary: 0,
//       grossSalary: 0,
//       otherCompensations: 0,
//       salaryPeriod: "string",
//       job: {
//         role: "string",
//         company: {
//           name: "string",
//         },
//       },
//     },
//   ]);

//   const makeOffer = async (salaryId: string) => {
//     await postOnCampusOffer([
//       {
//         salaryId: salaryId,
//         studentId: studentIds[0],
//         status: "ACCEPTED",
//       },
//     ]);
//     toast.success("Made a successful offer!");
//     window.location.reload();
//   };

//   useEffect(() => {
//     const fetchSalaries = async () => {
//       const salaries = await getStudentSalaryOffers(
//         lastEvent.job.id,
//         studentIds[0],
//       );
//       const newSalaries = salaries.map((salary) => ({
//         select: (
//           <Button
//             onClick={() => {
//               makeOffer(salary.id);
//             }}
//           >
//             Select
//           </Button>
//         ),
//         ...salary,
//       }));
//       setSalaries(newSalaries);
//     };
//     fetchSalaries();
//   }, []);

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       className="w-full h-full flex justify-center items-center text-black"
//     >
//       <div className="bg-white p-8 rounded-xl max-w-[90vw]">
//         <div>
//           <Typography
//             variant="h4"
//             fontFamily={"inherit"}
//             fontWeight={"bold"}
//             align="center"
//           >
//             Select Salary
//           </Typography>
//           {salaries ? (
//             <div className="max-w-full">
//               <Table data={salaries} columns={columns} type={"salary"} />
//             </div>
//           ) : (
//             <div className="w-full flex justify-center">
//               <CircularProgress />
//             </div>
//           )}
//         </div>
//       </div>
//     </Modal>
//   );
// };

export const AllSeasons = ({ events }: { events: [EventFC] }) => {
  const [eventYear, setEventYear] = useState<string>(null);

  const changeRegistered = (eventYear: string) => {
    setEventYear(eventYear);
  };
  const changeUnRegistered = (eventYear: string) => {
    setEventYear(eventYear);
  };

  return (
    <div>
      <div className="overflow-y-auto">
        <table className="w-full overflow-y-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Year
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${
                  eventYear === event.year
                    ? `bg-blue-200 dark:bg-sky-800 hover:bg-sky-100 dark:hover:bg-sky-700`
                    : `bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600`
                } border-b dark:border-gray-700`}
                onClick={() => {
                  changeRegistered(event.year);
                  changeUnRegistered(event.year);
                }}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {event.type}
                </th>
                <td className="px-6 py-4">{event.year}</td>
               
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="text-2xl my-4 text-center font-semibold">Registered</h4>
      {eventYear ? (
        <div className="overflow-y-auto">
          <Registered eventYear={eventYear} events={events} />
        </div>
      ) : (
        <div className="text-center mt-4">Select Season to view more</div>
      )}
      <h4 className="text-2xl my-4 text-center font-semibold">Not Registered</h4>
      {eventYear ? (
        <div className="overflow-y-auto">
          <UnRegistered eventYear={eventYear} events={events} />
        </div>
      ) : (
        <div className="text-center mt-4">Select Season to view more</div>
      )}
    </div>
  );
};





export const Registered = ({
  eventYear
}: {
  eventYear: string;
  events: EventFC[];
}) => {
  const [Registered, setRegistered] = useState<[ApplicationFC]>(null);
  const [loading, setLoading] = useState(true);
  const columns = generateColumns(seasonDTO);
  const [loadingbutton, setloadingbutton] = useState<boolean>(false);
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );
  useEffect(() => {
    setLoading(true);
    setRegistered(null);
    const fetchData = async () => {
      try {
        const jsonData = await fetchSeasonData(eventYear,true);
        setRegistered(jsonData);
        
      } catch (error) {
        toast.error("Some error occured");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventYear]);

  return (
    <div className="w-full">
      
      {loading && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}
      {Registered && ( 
        <Table data={Registered} columns={visibleColumns} type={"season"} />
      )}
    </div>
  );
};




export const UnRegistered = ({
  eventYear
}: {
  eventYear: string;
  events: EventFC[];
}) => {
  const [UnRegistered, setUnRegistered] = useState<[ApplicationFC]>(null);
  const [loading, setLoading] = useState(true);
  const columns = generateColumns(seasonDTO);
  const [loadingbutton, setloadingbutton] = useState<boolean>(false);
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  useEffect(() => {
    setLoading(true);
    setUnRegistered(null);
    const fetchData = async () => {
      try {
        const jsonData = await fetchSeasonData(eventYear,null);
        setUnRegistered(jsonData);
      } catch (error) {
        toast.error("Some error occured");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventYear]);

  return (
    <div className="w-full">
      
      {loading && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}
      {UnRegistered && ( 
        <Table data={UnRegistered} columns={visibleColumns} type={"season"} />
      )}
    </div>
  );
};


