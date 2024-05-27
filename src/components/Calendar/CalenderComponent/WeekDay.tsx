import React,{useContext, useEffect, useState} from 'react'
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';
import { selectedDayEvent } from '../context/GlobalContext';

const generateTimeList = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    let period = hour < 12 ? "AM" : "PM";
    let formattedHour = (hour % 12 === 0 ? 12 : hour % 12).toString().padStart(2, '0');
    times.push(`${formattedHour}:00 ${period}`);
  }
  return times;
};

export let time_list = generateTimeList();

console.log(time_list)


interface Event{
  day:any,
  rowIdx:any,
}

export default function WeekDay({ day }: { day: any }) {
  const [dayEvents,setDayEvents] = useState([])
  const{ setShowEventModal , setDaySelected , filteredEvents , setSelectedEvent , setTimeFrom,setTimeTo }=
  useContext(GlobalContext)

  useEffect(() => {
    const events = filteredEvents.filter((evt:Event) => dayjs(evt.day).format("DD-MM-YY")  === day.format("DD-MM-YY"));
    setDayEvents(events)
  },[filteredEvents,day]);

  function getCurrentDay() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? 'bg-blue-700 text-white rounded-full w-10'
      : '';
  }
  function handleTimeSelected(time:string,i: number) {
    if (time === "11:00 PM") {
        setTimeFrom(time_list[i]);
        setTimeTo(time_list[0]);
    } else {
        setTimeFrom(time_list[i]);
        setTimeTo(time_list[i+1]);
    }
}

  return (
    <div>
      <header className='flex flex-col items-center'>
        <div className='flex flex-col'>
            <p className='text-sm text-center font-semibold mt-1 text-gray-600'>{day.format('ddd').toUpperCase()}</p>
            <p
            className={`text-xl p-1 my-1 font-light text-center hover:cursor-pointer hover:bg-slate-300 hover:rounded-full hover:w-10 hover:text-black ${getCurrentDay()}`}>
            {day.format('DD')}
            </p>
            
        </div>
        
        
      </header>

      <span className='flex flex-col h-10 overflow-y-auto'>
          <div 
            onClick={() => {
              setShowEventModal(true);
              setDaySelected(day);
            }} 
            className='flex-1 cursor-pointer'>
              {dayEvents.map((evt: selectedDayEvent, idx) => (
                (evt.timeFrom === "from" || evt.timeTo === "to") && (
                  <div
                    onClick={() => setSelectedEvent(evt)}
                    key={idx}
                    className={`bg-${evt.label}-300 border border-gray-600 hover:bg-${evt.label}-400 cursor-pointer p-1 mx-2 text-gray-600 text-xs rounded mb-1 truncate`}
                  >
                    {evt.title}
                  </div>
                )
              ))}

          </div>
      </span>

      <div className='flex flex-row w-full'>
          {day.format('ddd').toUpperCase() === 'SUN' &&
            <div className='flex flex-col space-y-10 -mt-2'>
              {time_list.map((time: string, i: number) => (
                <p key={i} className='text-xs text-gray-600 font-extralight w-10 -ml-10'>{time.substring(0,2)+ " "+time.substring(time.length-2)}</p>
              ))}
            </div>
          }
          <div className='flex flex-col flex-grow'>
  {time_list.map((time: string, i: number) => (
    <div
      key={i}
      className='border border-gray-300 h-14 w-full'
      onClick={() => {
        setShowEventModal(true);
        setDaySelected(day);
        handleTimeSelected(time,i);
      }}
    >
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

        </div>
    </div>
  );
}
