import React,{useContext, useEffect, useState} from 'react'
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';


let colours = "bg-green-300 bg-red-300 bg-indigo-300 bg-gray-300 bg-blue-300 bg-purple-300 hover:bg-green-400 hover:bg-red-400 hover:bg-indigo-400 hover:bg-gray-400 hover:bg-blue-400 hover:bg-purple-400" 



export default function Day({day,rowIdx}:{day:any,rowIdx:any}) {
  const [dayEvents,setDayEvents] = useState([])
  const{ setShowEventModal , setDaySelected , filteredEvents , setSelectedEvent ,monthIndex }=
  useContext(GlobalContext)

  useEffect(() => {
    const events = filteredEvents.filter((evt) => dayjs(evt.day).format("DD-MM-YY")  === day.format("DD-MM-YY"));
    setDayEvents(events)
  },[filteredEvents,day]);

  function getCurrentDay(){
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") 
    ? 'bg-blue-700 text-white rounded-full w-7'
    :'';
  }
  function getCurrentMonth(){
    return parseInt(day.format("MM"),10) === monthIndex+1
    ? ''
    :'opacity-50';
  }

  useEffect(() => {
    getCurrentMonth()
    console.log(day.format("MM"))
  },[monthIndex]);


  return (
    <div className='border border-gray-300 flex flex-col'>
      <header className='flex flex-col items-center'>
        {rowIdx ===0 && (<p className='text-sm mt-1 '>{day.format('ddd').toUpperCase()}</p>)}
          
          <p className={`text-sm p-1 my-1 font-semibold text-center ${getCurrentDay()} ${getCurrentMonth()}`}>
            {parseInt(day.format('DD'),10) === 1 ? day.format('MMM DD') :day.format('DD') }
          </p>
      </header>
      <div onClick={() => {
        setShowEventModal(true);
        setDaySelected(day);
      }} 
        className='flex-1 cursor-pointer'>
          {dayEvents.map((evt,idx) => (
            <div
            onClick={() => setSelectedEvent(evt)}
            key={idx}
            className={`bg-${evt.label}-300 hover:bg-${evt.label}-400 cursor-pointer p-1 mx-2 text-gray-600 text-sm rounded mb-1 truncate`}>
              {evt.title}
            </div>
          ))}
        {/* <p className='items-center text-gray-400 font-bold text-2xl'>+</p> */}
      </div>
    </div>
  );
}
