import React,{ useContext } from 'react'
import dayjs from 'dayjs'
import GlobalContext from '../context/GlobalContext'

export default function CalendarHeader() {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  return (
    <header className="px-4 py-2 flex items-center">
      {/* <h1 className="mr-10 text-xl text-gray-500 fond-bold">
        Calendar
      </h1> */}
      <button
        onClick={handleReset}
        className="border border-gray-500 rounded py-2 px-2  mr-5 hover:bg-blue-600 hover:text-white hover:border-blue-950 "
      >
        Today
      </button>
      
      <span className='flex flex-1 items-center justify-center space-x-2'>
        <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined mt-1 cursor-pointer text-gray-600 mx-2 bg-gray-300  hover:bg-gray-400 rounded-full">
          chevron_left
        </span>
      </button>
      <h2 className=" text-xl text-gray-600 font-bold cursor-default">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined mt-1 cursor-pointer text-gray-600 mx-2 bg-gray-300 hover:bg-gray-400 rounded-full">
          chevron_right
        </span>
      </button>
      </span>
      
      
    </header>
  )
}
