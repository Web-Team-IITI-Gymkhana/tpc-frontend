import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
import { selectedDayEvent } from "../context/GlobalContext";
import { labelsClasses } from "../context/ContextWrapper";

interface Event {
  startDateTime: any;
  endDateTime: any;
  rowIdx: any;
}

let colors =
  "bg-green-300 bg-red-300 bg-indigo-300 bg-gray-300 bg-blue-300 bg-purple-300";
let hover_colors =
  "hover:bg-green-400 hover:bg-red-400 hover:bg-indigo-400 hover:bg-gray-400 hover:bg-blue-400 hover:bg-purple-400";

export default function Day({ day, rowIdx }: { day: any; rowIdx: any }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setShowEventModal,
    setDaySelected,
    setSelectedEvent,
    monthIndex,
    filteredEvents,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt: Event) =>
        dayjs(evt.startDateTime).format("DD-MM-YY") === day.format("DD-MM-YY"),
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDay() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-700 text-white rounded-full w-7"
      : "";
  }
  function getCurrentMonth() {
    return parseInt(day.format("MM"), 10) === monthIndex + 1
      ? ""
      : "opacity-50";
  }

  function displayColor(label: string) {
    return labelsClasses.get(label);
  }

  return (
    <div className="border border-gray-300 flex flex-col max-h-40">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1 ">{day.format("ddd").toUpperCase()}</p>
        )}

        <p
          onClick={() => {
            setDaySelected(day);
          }}
          className={`text-sm p-1 my-1 font-semibold text-center hover:cursor-pointer hover:bg-slate-300 hover:rounded-full hover:text-black ${getCurrentDay()} ${getCurrentMonth()}`}
        >
          {parseInt(day.format("DD"), 10) === 1
            ? day.format("MMM DD")
            : day.format("DD")}
        </p>
      </header>
      <div
        onClick={() => {
          setDaySelected(day);
        }}
        className="flex-1 overflow-y-auto"
      >
        {dayEvents.map((evt: selectedDayEvent, idx) => (
          <div
            onClick={() => {
              setSelectedEvent(evt);
              setShowEventModal(true);
            }}
            key={idx}
            className={`bg-${displayColor(evt.type)}-300 hover:bg-${displayColor(evt.type)}-400 ${getCurrentMonth()} event_block cursor-pointer p-1 mx-2 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.job && evt.job.company && evt.job.company.name
              ? evt.job.company.name
              : evt.id}
          </div>
        ))}
      </div>
    </div>
  );
}
