import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
import { selectedDayEvent } from "../context/GlobalContext";
import { labelsClasses } from "../context/ContextWrapper";

const generateTimeList = () => {
  const times = [];
  const format = "hh:mm A";

  for (let hour = 0; hour < 24; hour++) {
    const time = dayjs().hour(hour).minute(0).second(0);
    times.push(time.format(format));
  }

  return times;
};

export let time_list = generateTimeList();

let colors =
  "border-green-400 border-red-400 border-indigo-400 border-gray-400 border-blue-400 border-purple-400";
let hover_colors =
  "hover:bg-green-400 hover:bg-red-400 hover:bg-indigo-400 hover:bg-gray-400 hover:bg-blue-400 hover:bg-purple-400";
let text_colors =
  "text-green-400 text--red-400 text-indigo-400 text-gray-400 text-blue-300 text-purple-400";

interface Event {
  startDateTime: any;
  endDateTime: any;
  rowIdx: any;
}

export default function WeekDay({ day }: { day: any }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setShowEventModal,
    setDaySelected,
    filteredEvents,
    setSelectedEvent,
    setTimeFrom,
    setTimeTo,
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
      ? "bg-blue-700 text-white rounded-full w-10"
      : "";
  }
  function handleTimeSelected(time: string, i: number) {
    if (time === "11:00 PM") {
      setTimeFrom(time_list[i]);
      setTimeTo(time_list[0]);
    } else {
      setTimeFrom(time_list[i]);
      setTimeTo(time_list[i + 1]);
    }
  }
  function displayColor(label: string) {
    return labelsClasses.get(label);
  }

  return (
    <div>
      <header className="flex flex-col items-center">
        <div className="flex flex-col">
          <p className="text-sm text-center font-semibold mt-1 text-gray-600">
            {day.format("ddd").toUpperCase()}
          </p>
          <p
            className={`text-xl p-1 my-1 font-light text-center hover:cursor-pointer hover:bg-slate-300 hover:rounded-full hover:w-10 hover:text-black ${getCurrentDay()}`}
          >
            {day.format("DD")}
          </p>
        </div>
      </header>

      <div className="flex flex-row w-full">
        {day.format("ddd").toUpperCase() === "SUN" && (
          <div className="flex flex-col space-y-10 -mt-2">
            {time_list.map((time: string, i: number) => (
              <p
                key={i}
                className="text-xs text-gray-600 font-extralight w-10 -ml-10"
              >
                {time.substring(0, 2) + " " + time.substring(time.length - 2)}
              </p>
            ))}
          </div>
        )}
        <div className="flex flex-col flex-grow">
          {time_list.map((time: string, i: number) => (
            <div
              key={i}
              className="border border-gray-300 h-14 w-full"
              onClick={() => {
                setDaySelected(day);
                handleTimeSelected(time, i);
              }}
            >
              <div className="flex-1 cursor-pointer pt-1 overflow-y-auto">
                {dayEvents.map(
                  (evt: selectedDayEvent, idx) =>
                    dayjs(evt.startDateTime).format("hh:00 A") === time && (
                      <div
                        key={idx}
                        className={`bg-${displayColor(evt.type)}-300 hover:bg-${displayColor(evt.type)}-400 cursor-pointer p-1 mx-2 text-gray-600 text-xs rounded mb-1 `}
                        onClick={() => {
                          setSelectedEvent(evt);
                          setShowEventModal(true);
                        }}
                      >
                        {evt.job.company.name}
                      </div>
                    ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
