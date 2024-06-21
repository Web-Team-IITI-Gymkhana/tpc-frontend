import React, { useState, useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';
import { time_list } from './WeekDay';
import { selectedDayEvent } from '../context/GlobalContext';
import { labelsClasses } from '../context/ContextWrapper';

interface Event{
  startDateTime:any,
  endDateTime:any,
  rowIdx:any,
}

let colors = "border-green-400 border-red-400 border-indigo-400 border-gray-400 border-blue-400 border-purple-400"
let hover_colors = "hover:bg-green-400 hover:bg-red-400 hover:bg-indigo-400 hover:bg-gray-400 hover:bg-blue-400 hover:bg-purple-400"
let text_colors = "text-green-400 text--red-400 text-indigo-400 text-gray-400 text-blue-300 text-purple-400"


export default function DailyView({ date }: { date: any }) {
  const [dayEvents, setDayEvents] = useState([]);
  const { setShowEventModal, setDaySelected, filteredEvents, setSelectedEvent, setTimeFrom, setTimeTo } =
    useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter((evt: Event) => dayjs(evt.startDateTime).format("DD-MM-YY") === date.format("DD-MM-YY"));
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
  function displayColor(label:string){
    return labelsClasses.get(label);
  }

  return (
    <div className='flex flex-col w-full space-y-4 '>
      <div className='flex flex-col items-start ml-12'>
        <p className={`text-xs pl-1 text-gray-600 ${getCurrentDay()}`}>{date.format('ddd').toUpperCase()}</p>
        <div className='flex item-center justify-center'>
          <p className={`text-2xl p-1 ${getCurrentDate()}`}>{date.format('DD')}</p>
        </div>
      </div>
      <span className='flex flex-row space-x-2'>
        <div className='flex flex-col space-y-10 -mt-2'>
          {time_list.map((time: string, i: number) => (
            <p key={i} className='text-xs text-gray-600 font-extralight'>{time}</p>
          ))}
        </div>
        <div className='flex flex-col flex-grow relative'>
          
          {time_list.map((time: string, i: number) => (
            <div
              onClick={() => {
                setDaySelected(date);
                handleTimeSelected(time, i);
              }}
              key={i}
              className='h-14 w-full border border-gray-300'>
              <div className='flex-1 pt-1 overflow-y-auto'>
                {dayEvents.map((evt: selectedDayEvent, idx) => (
                  (dayjs(evt.startDateTime).format('hh:00 A')=== time) && (
                    <div
                      key={idx}
                      className={`bg-${displayColor(evt.type)}-300 hover:bg-${displayColor(evt.type)}-400 cursor-pointer p-1 mx-2 text-gray-600 text-xs rounded mb-1 truncate`}
                      onClick={() => {
                        setSelectedEvent(evt)
                        setShowEventModal(true)
                      }}
                    >
                      {evt.job.company.name}
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
