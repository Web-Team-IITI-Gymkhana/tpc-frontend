import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { labelsClasses } from "../context/ContextWrapper";

export default function EventDetails() {
  const { setShowEventModal, daySelected, selectedEvent } =
    useContext(GlobalContext);

  const [description, setDescription] = useState<string>(
    selectedEvent ? selectedEvent.metadata : "",
  );
  const [selectedLabel, setSelectedLabel] = useState<[string, string]>(
    selectedEvent
      ? [selectedEvent.type, labelsClasses.get(selectedEvent.type) || ""]
      : ["", ""],
  );
  const [timeFrom, setTimeFrom] = useState(
    selectedEvent
      ? dayjs(selectedEvent.startDateTime).format("hh:00 A")
      : "from",
  );
  const [timeTo, setTimeTo] = useState(
    selectedEvent ? dayjs(selectedEvent.endDateTime).format("hh:00 A") : "to",
  );
  const [checked, setChecked] = useState(
    selectedEvent ? selectedEvent.visibleToRecruiter : false,
  );
  const [companyName, setCompanyName] = useState(
    selectedEvent ? selectedEvent.job.company.name : "",
  );
  const [role, setRole] = useState(selectedEvent ? selectedEvent.job.role : "");
  const [recruitmentType, setRecruitmentType] = useState(
    selectedEvent ? selectedEvent.job.season.type : "",
  );
  const [roundNumber, setRoundNumber] = useState(
    selectedEvent ? selectedEvent.roundNumber : 1,
  );

  function visibilityStatus(check: boolean) {
    return check ? "Yes" : "No";
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50">
      <form className="bg-white rounded-lg shadow-2xl w-1/4  ">
        <header
          className={"bg-gray-100 px-4 py-2 flex justify-between items-center"}
        >
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <button
            onClick={() => {
              setShowEventModal(false);
            }}
          >
            <span className="material-icons-outlined text-gray-400 hover:text-red-400 p-2">
              close
            </span>
          </button>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-7 items-end gap-y-4">
            <span className="material-icons-outlined col-start-1 col-span-1 text-gray-400">
              schedule
            </span>
            <p className="pl-2 col-start-2 col-span-3 font-medium text-gray-600">
              {daySelected.format("dddd, MMMM DD")}
            </p>
            <div className="col-start-2 col-span-6 flex flex-row ">
              <div className="relative flex flex-col mr-2">
                <p className="rounded text-sm  pl-2 font-medium text-gray-600">
                  {timeFrom}
                </p>
              </div>
              <p className="pt-1 -mt-2">-</p>
              <div className="relative flex flex-col ml-2">
                <p className="rounded text-sm font-medium text-gray-600">
                  {timeTo}
                </p>
              </div>
            </div>
            {description && (
              <span className="material-icons-outlined col-start-1 col-span-1 text-gray-400 ">
                segment
              </span>
            )}

            {description && (
              <span className="col-start-2 col-span-6  border-0 text-gray-600 pb-2 w-full overflow-y-scroll font-medium h-5 ">
                {description}
              </span>
            )}
            <span className="material-icons-outlined col-start-1 col-span-1 text-gray-400">
              visibility
            </span>
            <span className="col-start-2 col-span-3  border-0 w-full font-medium">
              Visible to Recruiter :
            </span>
            <span className="col-start-5 col-span-3 ml-5  border-0 w-full font-medium text-gray-600">
              {visibilityStatus(checked)}
            </span>
            <span className="material-icons-outlined col-start-1 col-span-1 text-gray-400">
              label
            </span>
            <div className="relative w-full col-start-2 col-span-6">
              <span className="col-start-2 col-span-6 font-medium w-full">
                {selectedLabel[0]}
              </span>
            </div>

            <span className="material-icons-outlined col-start-1 col-span-1 text-gray-400">
              work
            </span>
            <div className="col-start-2 col-span-1 font-medium">Type :</div>

            <span className="col-start-3 col-span-5 font-medium w-full text-gray-600">
              {recruitmentType}
            </span>

            <div className="col-start-2 col-span-2 font-medium">Company :</div>
            <span className="col-start-4 col-span-4 font-medium w-full -ml-5 h-7 overflow-y-scroll text-gray-600">
              {companyName}
            </span>
            <div className="col-start-2 col-span-1 font-medium">Role :</div>

            <span className="col-start-3 col-span-5 font-medium w-full text-gray-600">
              {role}
            </span>
            <div className="col-start-2 col-span-2 font-medium">Round :</div>

            <span className="col-start-4 -ml-16 col-span-1 text-center font-medium w-full text-gray-600">
              {roundNumber}
            </span>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5 h-10"></footer>
      </form>
    </div>
  );
}
