import React, { useState, useReducer, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import GlobalContext from "./GlobalContext";
import { selectedDayEvent } from "./GlobalContext";
import { fetchEvents } from "@/helpers/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { fetchStudentEvents } from "@/helpers/student/api";

export const labelsClasses = new Map([
  ["INTERVIEW", "green"],
  ["PPT", "red"],
  ["TEST", "indigo"],
  ["COMPLETED", "blue"],
  ["APPLICATION", "purple"],
]);

function savedEventsReducer(
  state: selectedDayEvent[],
  { type, payload }: { type: string; payload: any },
) {
  switch (type) {
    case "fetch":
      return payload;
    default:
      throw new Error();
  }
}

export default function ContextWrapper(props: any) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [weekOffset, setWeekOffset] = useState(0);
  const [dateOffset, setDateOffset] = useState(0);
  const [Current_view, SetCurrent_view] = useState("Month");
  const [showEventModal, setShowEventModal] = useState(false);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState<selectedDayEvent | null>(
    null,
  );
  const [labels, setLabels] = useState(() => {
    return Array.from(labelsClasses.keys()).map((label) => ({
      label,
      checked: true,
    }));
  });
  const [savedEvents, dispatchCallEvents] = useReducer(savedEventsReducer, []);
  const [timeFrom, setTimeFrom] = useState("from");
  const [timeTo, setTimeTo] = useState("to");

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt: selectedDayEvent) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.type),
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    async function fetchAndSetEvents() {
      try {
        const accessToken = Cookies.get("accessToken");
        let user = null;

        if (accessToken) {
          try {
            const decoded: any = jwtDecode(accessToken);
            user = decoded ? { role: decoded.role } : null;
          } catch (error) {
            console.error("JWT decoding error:", error);
          }
        }

        let data;

        switch (user.role) {
          case "ADMIN":
            data = await fetchEvents();
            break;
          case "RECRUITER":
            data = await fetchStudentEvents();
            break;
          case "STUDENT":
            data = await fetchStudentEvents();
            break;
        }

        dispatchCallEvents({ type: "fetch", payload: data });
      } catch (error) {
        toast.error("Failed to fetch events:");
        console.log(error);
      }
    }
    fetchAndSetEvents();
  }, []);

  useEffect(() => {
    setLabels((prevLabels) => {
      const uniqueEventTypes = [...new Set(savedEvents.map((evt) => evt.type))];

      return uniqueEventTypes.map((label: string) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label: label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  function updateLabel(newLabel: { label: string; checked: boolean }) {
    setLabels((prevLabels) =>
      prevLabels.map((lbl) => (lbl.label === newLabel.label ? newLabel : lbl)),
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        weekOffset,
        setWeekOffset,
        dateOffset,
        setDateOffset,
        Current_view,
        SetCurrent_view,
        showEventModal,
        setShowEventModal,
        daySelected,
        setDaySelected,
        dispatchCallEvents,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        updateLabel,
        filteredEvents,
        timeFrom,
        setTimeFrom,
        timeTo,
        setTimeTo,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
