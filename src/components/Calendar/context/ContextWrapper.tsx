import React, { useState, useReducer, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import GlobalContext from './GlobalContext';
import { selectedDayEvent } from './GlobalContext';

export const labelsClasses = new Map([
  ["INTERVIEW", "green"], 
  ["PPT", "red"], 
  ["TEST", "indigo"], 
  ["COMPLETED", "blue"], 
  ["APPLICATION", "purple"]
]);

function savedEventsReducer(state:any, { type, payload }) {
  switch (type) {
    case 'fetch':
      return payload;
    case 'push':
      return [...state, payload];
    case 'update':
      return state.map((evt:selectedDayEvent) => (evt.id === payload.id ? payload : evt));
    case 'delete':
      return state.filter((evt:selectedDayEvent) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

export default function ContextWrapper(props:any) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [weekOffset, setWeekOffset] = useState(0);
  const [dateOffset, setDateOffset] = useState(0);
  const [Current_view, SetCurrent_view] = useState('Month');
  const [showEventModal, setShowEventModal] = useState(false);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState(() => {
    return Array.from(labelsClasses.keys()).map(label => ({
        label,
        checked: true
    }));
});
  const [savedEvents, dispatchCallEvents] = useReducer(savedEventsReducer, []);
  const [timeFrom, setTimeFrom] = useState('from');
  const [timeTo, setTimeTo] = useState('to');


const filteredEvents = useMemo(() => {
  return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.type)
    );
}, [savedEvents, labels]);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`${backendUrl}/api/v1/events`);
        const data = await response.json();
        dispatchCallEvents({ type: 'fetch', payload: data });
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    }
    fetchEvents();
  }, [backendUrl]);


  useEffect(() => {
    setLabels((prevLabels) => {
        const uniqueEventTypes = [...new Set(savedEvents.map((evt) => evt.type))];

        return uniqueEventTypes.map((label:string) => {
            const currentLabel = prevLabels.find((lbl) => lbl.label === label);
            return {
                label:label,
                checked: currentLabel ? currentLabel.checked : true,
            };
        });
    });
}, [savedEvents]);

function updateLabel(newLabel) {
  setLabels((prevLabels) => prevLabels.map((lbl) => (lbl.label === newLabel.label ? newLabel : lbl)));
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
