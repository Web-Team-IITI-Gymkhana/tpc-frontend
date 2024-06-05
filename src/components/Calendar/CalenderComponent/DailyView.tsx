import React, { useState, useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';
import { time_list } from './WeekDay';
import { selectedDayEvent } from '../context/GlobalContext';

interface Event {
  day: any;
  rowIdx: any;
}

let colors = "border-green-400 border-red-400 border-indigo-400 border-gray-400 border-blue-400 border-purple-400"
let hover_colors = "hover:bg-green-400 hover:bg-red-400 hover:bg-indigo-400 hover:bg-gray-400 hover:bg-blue-400 hover:bg-purple-400"
let text_colors = "text-green-400 text--red-400 text-indigo-400 text-gray-400 text-blue-300 text-purple-400"


export default function DailyView({ date }: { date: any }) {
  const [dayEvents, setDayEvents] = useState([]);
  const { setShowEventModal, setDaySelected, filteredEvents, setSelectedEvent, setTimeFrom, setTimeTo } =
    useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter((evt: Event) => dayjs(evt.day).format("DD-MM-YY") === date.format("DD-MM-YY"));
    setDayEvents(events);
  }, [filteredEvents, date]);

  function getCurrentDate() {
    return date.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'text-white bg-blue-700 rounded-full ' : '';
  }

  function getCurrentDay() {
    return date.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'text-blue-700' : '';
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

  function getCurrentTimeIndicatorPosition() {
    const currentTime = dayjs();
    if (date.format("DD-MM-YY") === currentTime.format("DD-MM-YY")) {
      const nowInMinutes = currentTime.hour() * 60 + currentTime.minute();
      const closestTimeIndex = time_list.findIndex(time => {
        const [hours, minutes] = time.split(/[: ]/);
        const isPM = time.includes("PM");
        let timeInMinutes = parseInt(hours) % 12 * 60 + (parseInt(minutes) || 0);
        if (isPM) timeInMinutes += 12 * 60;
        return timeInMinutes >= nowInMinutes;
      });

      if (closestTimeIndex > -1 && time_list[closestTimeIndex]) {
        const closestTime = time_list[closestTimeIndex];
        const [hours, minutes] = closestTime.split(/[: ]/);
        const isPM = closestTime.includes("PM");
        let timeInMinutes = parseInt(hours) % 12 * 60 + (parseInt(minutes) || 0);
        if (isPM) timeInMinutes += 12 * 60;
        const offset = nowInMinutes - timeInMinutes;
        const topPosition = closestTimeIndex * 56 + (offset / 60) * 56; 
        return topPosition;
      }
    }
    return null;
  }

  const currentTimeIndicatorPosition = getCurrentTimeIndicatorPosition();

  return (
    <div className='flex flex-col w-full space-y-4'>
      <div className='flex flex-col items-start ml-12'>
        <p className={`text-xs pl-1 text-gray-600 ${getCurrentDay()}`}>{date.format('ddd').toUpperCase()}</p>
        <div className='flex item-center justify-center'>
          <p className={`text-2xl p-1 ${getCurrentDate()}`}>{date.format('DD')}</p>
        </div>
      </div>
      <span className='flex flex-col h-10 overflow-y-auto ml-10'>
        <div
          onClick={() => {
            setShowEventModal(true);
            setDaySelected(date);
          }}
          className='flex-1 cursor-pointer'>
          {dayEvents.map((evt: selectedDayEvent, idx) => (
            (evt.timeFrom === "From" || evt.timeTo === "to") && (
              <div
                onClick={() => setSelectedEvent(evt)}
                key={idx}
                className={`border border-${evt.label}-400 border-2 hover:bg-${evt.label}-400 hover:text-white w-40 cursor-pointer p-1 mx-2 text-gray-600 text-xs rounded mb-1 truncate`}
              >
                {evt.title}
              </div>
            )
          ))}
        </div>
      </span>
      <span className='flex flex-row space-x-2'>
        <div className='flex flex-col space-y-10 -mt-2'>
          {time_list.map((time: string, i: number) => (
            <p key={i} className='text-xs text-gray-600 font-extralight'>{time}</p>
          ))}
        </div>
        <div className='flex flex-col flex-grow relative'>
          {currentTimeIndicatorPosition !== null && (
            <div
              style={{ top: `${currentTimeIndicatorPosition}px` }}
              className='absolute left-0 w-full border-t-2 border-red-500'
            >
              <div
                className='w-3 h-3 bg-red-500 rounded-full absolute'
                style={{ top: '-6px', left: '-6px' }}
              ></div>
            </div>
          )}
          {time_list.map((time: string, i: number) => (
            <div
              onClick={() => {
                setShowEventModal(true);
                setDaySelected(date);
                handleTimeSelected(time, i);
              }}
              key={i}
              className='h-14 w-full border border-gray-300'>
              <div className='flex-1 cursor-pointer pt-1 overflow-y-auto'>
                {dayEvents.map((evt: selectedDayEvent, idx) => (
                  (evt.timeFrom === time) && (
                    <div
                      key={idx}
                      className={`bg-${evt.label}-300 hover:bg-${evt.label}-400 cursor-pointer p-1 mx-2 text-gray-600 text-xs rounded mb-1 truncate`}
                      onClick={() => setSelectedEvent(evt)}
                    >
                      {evt.title}
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </span>
    </div>
  );
}
